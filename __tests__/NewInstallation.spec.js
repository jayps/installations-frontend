import {enableFetchMocks} from 'jest-fetch-mock'
import {shallowMount} from '@vue/test-utils';
import NewInstallation from "@/pages/NewInstallation";
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
    }
    return shallowMount(NewInstallation, {
        mocks: {
            $router
        }
    });
}

describe('NewInstallation', () => {
    it('has data', () => {
        expect(typeof NewInstallation.data).toBe('function');
    });

    it('should create an installation and redirect', async () => {
        const component = setup();
        component.setData({
            form: {
                customerName: 'John Smith',
                appointmentDate: '2021-01-20',
                appointmentTime: '11:30'
            }
        })
        fetch.mockResponse(JSON.stringify({
            "id": "8992bf95-7665-4663-8fc9-759df62c6c8e",
            "customer_name": "John Smith",
            "appointment_date": "2021-01-20T08:00:00Z",
            "date_created": "22021-01-20T08:00:00Z",
            "date_modified": "2021-01-20T08:00:00Z",
            "latest_status": "installation_request"
        }));

        jest.spyOn(component.vm.$router, 'push');

        component.vm.createInstallation();
        await flushPromises();
        expect(component.vm.loading).toBeFalsy();
        expect(component.vm.$router.push).toHaveBeenCalledWith('/');
    });

    it('should show an error when service fails', async () => {
        const component = setup();
        component.setData({
            form: {
                customerName: 'John Smith',
                appointmentDate: '2021-01-20',
                appointmentTime: '11:30'
            }
        })
        fetch.mockReject(new Error('Internal server error'))

        jest.spyOn(component.vm.$router, 'push');

        component.vm.createInstallation();
        await flushPromises();
        expect(component.vm.loading).toBeFalsy();
        expect(component.vm.error).toBeTruthy();
        expect(component.vm.$router.push).not.toHaveBeenCalled();
    });

    it('should show missing date or time message', async () => {
        const component = setup();
        component.setData({
            form: {
                customerName: 'John Smith',
            }
        })

        component.vm.createInstallation();
        expect(component.vm.missingDateTime).toBeTruthy();
    });
});