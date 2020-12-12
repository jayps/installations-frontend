import TablesMixin from "@/mixins/TablesMixin";

describe('TablesMixin', () => {
   it('should get human readable status', () => {
       const status = TablesMixin.methods.getPrettyStatus('installation_request');
       expect(status).toBe('Installation requested');
   })

    it('should get pretty date and time', () => {
        const result = TablesMixin.methods.getPrettyDate('2021-02-21T09:00:00Z');
        expect(result).toBe('2021-02-21 11:00'); // TODO: Resolve timezone issues
    })
});