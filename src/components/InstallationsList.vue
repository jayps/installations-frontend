<template>
  <div class="row">
    <div class="col-sm-12">
      <b-table striped hover
               :items="installations"
               :fields="fields"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :no-local-sorting="true"
               sort-icon-left></b-table>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>

</style>