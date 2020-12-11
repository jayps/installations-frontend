<template>
  <div class="row">
    <div class="col-sm-12">
      <b-table striped hover
               :items="installations"
               :fields="fields"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :no-local-sorting="true"
               sort-icon-left>
      </b-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "InstallationsList",
  props: {
    installations: {
      type: Array,
      required: true,
    }
  },
  computed: {
    sortDefinition() {
      const sortDirection = this.sortDesc ? '-' : '';

      return `${sortDirection}${this.sortBy}`;
    }
  },
  data() {
    return {
      sortBy: 'date_modified',
      sortDesc: true,
      fields: [
        {key: 'customer_name', sortable: false},
        {
          key: 'appointment_date', sortable: true, formatter: (value) => {
            return this.getPrettyDate(value)
          }
        },
        {
          key: 'date_created', sortable: false, formatter: (value) => {
            return this.getPrettyDate(value)
          }
        },
        {
          key: 'date_modified', sortable: true, formatter: (value) => {
            return this.getPrettyDate(value)
          }
        },
        {
          key: 'latest_status', sortable: false, formatter: (value) => {
            return this.getPrettyStatus(value)
          }
        }
      ]
    }
  },
  watch: {
    sortDefinition() {
      this.$emit('sort', this.sortDefinition);
    },
  },
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
</script>

<style scoped>

</style>