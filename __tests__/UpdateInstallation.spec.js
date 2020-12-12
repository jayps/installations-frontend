import {enableFetchMocks} from 'jest-fetch-mock'
import {shallowMount} from '@vue/test-utils';
import UpdateInstallation from "@/pages/UpdateInstallation";
import Vue from "vue";
import {BootstrapVue} from "bootstrap-vue";
import flushPromises from "flush-promises";

Vue.use(BootstrapVue)

enableFetchMocks();
beforeEach(() => {
    fetch.resetMocks();
});

const setup = () => {
    const $router = {
        push: jest.fn(),
    };
    const $route = {
        params: {id: '8992bf95-7665-4663-8fc9-759df62c6c8e'}
    }
    return shallowMount(UpdateInstallation, {
        mocks: {$router, $route}
    });
}

describe('UpdateInstallation', () => {
    it('has data', () => {
        expect(typeof UpdateInstallation.data).toBe('function');
    });

    it('should fetch installation', async () => {
        const installation = {
            "id": "8992bf95-7665-4663-8fc9-759df62c6c8e",
            "customer_name": "JP Meyer 3 r",
            "appointment_date": "2021-02-21T09:00:00Z",
            "date_created": "2020-12-12T08:06:31.290400Z",
            "date_modified": "2020-12-12T08:06:41.530378Z",
            "latest_status": "installation_rejected"
        };

        fetch.mockResponse(JSON.stringify(installation));

        const component = setup();
        component.vm.fetchInstallation();
        await flushPromises();
        expect(JSON.stringify(component.vm.installation)).toBe(JSON.stringify(installation));
    });

    it('should display an error', async () => {
        fetch.mockReject(new Error('Internal server error'));

        const component = setup();
        component.vm.fetchInstallation();
        await flushPromises();
        expect(component.vm.error).toBeTruthy();
    });

    it('should update an installation', async () => {
        const component = setup();
        component.setData({
            form: {
                status: 'installation_in_progress',
                notes: 'Test note',
            }
        })
        fetch.mockResponse(JSON.stringify({test: 'empty'}));

        jest.spyOn(component.vm.$router, 'push');

        component.vm.updateInstallation();
        await flushPromises();
        expect(component.vm.loading).toBeFalsy();
        expect(component.vm.$router.push).toHaveBeenCalledWith('/');
    })

    it('should fail to update an installation', async () => {
        const component = setup();
        component.setData({
            form: {
                status: 'installation_in_progress',
                notes: 'Test note',
            }
        })
        fetch.mockReject(new Error('Internal server error'));

        jest.spyOn(component.vm.$router, 'push');

        component.vm.updateInstallation();
        await flushPromises();
        expect(component.vm.loading).toBeFalsy();
        expect(component.vm.error).toBeTruthy();
        expect(component.vm.$router.push).not.toHaveBeenCalledWith('/');
    })
});