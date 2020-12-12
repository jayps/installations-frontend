import {shallowMount} from '@vue/test-utils';
import InstallationsList from "@/components/InstallationsList";
import Vue from "vue";
import {BootstrapVue} from "bootstrap-vue";

Vue.use(BootstrapVue)

const setup = () => {
    return shallowMount(InstallationsList, {
        propsData: {
            installations: [{id: 5}],
        }
    });
}

describe('InstallationsList', () => {
    it('has data', () => {
        expect(typeof InstallationsList.data).toBe('function');
    });

    it('should emit showHistory', () => {
        let component = setup();
        jest.spyOn(component.vm, '$emit');
        component.vm.showHistory({item: {id: 5}});
        expect(component.vm.$emit).toHaveBeenCalledWith('showHistory', {id: 5});
    });

    describe('sortDefinition', () => {
        it('should compute descending sortDefinition', () => {
            let component = setup();

            component.setData({
                sortBy: 'appointment_date',
                sortDesc: true
            });

            expect(component.vm.sortDefinition).toBe('-appointment_date');
        });

        it('should compute ascending sortDefinition', () => {
            let component = setup();

            component.setData({
                sortBy: 'appointment_date',
                sortDesc: false
            });

            expect(component.vm.sortDefinition).toBe('appointment_date');
        });

        it('should emit sort from watch', () => {
            let component = setup();

            jest.spyOn(component.vm, '$emit');
            component.setData({
                sortBy: 'appointment_date',
                sortDesc: true
            });

            component.vm.$options.watch.sortDefinition.call(component.vm);
            expect(component.vm.$emit).toHaveBeenCalledWith('sort', '-appointment_date');
        });
    })

})