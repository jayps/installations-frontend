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
        <template #cell(latest_status)="data">
          {{ getPrettyStatus(data.value) }}
        </template>
        <template #cell(appointment_date)="data">
          {{ getPrettyDate(data.value) }}
        </template>
        <template #cell(date_created)="data">
          {{ getPrettyDate(data.value) }}
        </template>
        <template #cell(date_modified)="data">
          {{ getPrettyDate(data.value) }}
        </template>
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
        {key: 'appointment_date', sortable: true},
        {key: 'date_created', sortable: false},
        {key: 'date_modified', sortable: true},
        {key: 'latest_status', sortable: false}
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
        'installation_complete': 'Installation Complete',
        'installation_rejected': 'Installation Rejected'
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