import {enableFetchMocks} from 'jest-fetch-mock'
import {shallowMount} from '@vue/test-utils';
import InstallationList from "@/pages/InstallationList";
import Vue from "vue";
import {BootstrapVue} from "bootstrap-vue";
import flushPromises from "flush-promises";

Vue.use(BootstrapVue)

enableFetchMocks();
beforeEach(() => {
    fetch.resetMocks();
});

const historyModalMock = {
    render: () => {
    },
    methods: {
        show: () => {
        }
    }
}

const setup = () => {
    return shallowMount(InstallationList, {
        stubs: {
            'b-modal': historyModalMock
        }
    });
}

describe('InstallationsList', () => {
    it('has data', () => {
        expect(typeof InstallationList.data).toBe('function');
    });

    it('should fetch installations', async () => {
        const installations = [
            {
                "id": "8992bf95-7665-4663-8fc9-759df62c6c8e",
                "customer_name": "JP Meyer 3 r",
                "appointment_date": "2021-02-21T09:00:00Z",
                "date_created": "2020-12-12T08:06:31.290400Z",
                "date_modified": "2020-12-12T08:06:41.530378Z",
                "latest_status": "installation_rejected"
            },
            {
                "id": "417ecda7-f1e5-4af4-aaf4-37d53da4286f",
                "customer_name": "JP Meyer 2",
                "appointment_date": "2021-02-21T09:00:00Z",
                "date_created": "2020-12-12T08:06:23.996991Z",
                "date_modified": "2020-12-12T08:06:23.997010Z",
                "latest_status": "installation_request"
            }
        ];

        fetch.mockResponse(JSON.stringify(installations));

        const component = setup();
        component.vm.fetchInstallations();
        await flushPromises();
        expect(JSON.stringify(component.vm.installations)).toBe(JSON.stringify(installations));
    });

    it('should fetch history', async () => {
        const history = [
            {
                "status": "installation_in_progress",
                "notes": "Test",
                "date": "2020-12-11T11:43:20.612072Z"
            },
            {
                "status": "installation_requested",
                "notes": "Test",
                "date": "2020-12-11T11:43:07.511173Z"
            }
        ];

        fetch.mockResponse(JSON.stringify(history));

        const component = setup();
        component.vm.fetchInstallationHistory({id: 1});
        await flushPromises();
        expect(JSON.stringify(component.vm.history)).toBe(JSON.stringify(history));
    });

    it('should fetch installations when sorting changes', () => {
        const component = setup();
        jest.spyOn(component.vm, 'fetchInstallations');

        component.vm.sort('-appointment_date');
        expect(component.vm.sortDefinition).toBe('-appointment_date');
        expect(component.vm.fetchInstallations).toHaveBeenCalled();
    })
});