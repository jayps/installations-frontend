import moment from "moment";

export default {
    methods: {
        getPrettyStatus(status) {
            const prettyStatusMap = {
                'installation_request': 'Installation requested',
                'installation_in_progress': 'Installation in progress',
                'installation_complete': 'Installation complete',
                'installation_rejected': 'Installation rejected'
            };
            return prettyStatusMap[status];
        },
        getPrettyDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm')
        }
    }
}