<template>
  <div class="row">
    <div class="col-sm-12">
      <b-table hover
               :items="installations"
               :fields="fields"
               :sort-by.sync="sortBy"
               :sort-desc.sync="sortDesc"
               :no-local-sorting="true"
               sort-icon-left>
        <template #cell(history)="data">
          <b-button variant="outline-primary" @click="showHistory(data)">History</b-button>
          <b-button variant="outline-primary" :href="`#/installations/${data.item.id}`">Update</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import TablesMixin from "@/mixins/TablesMixin";

export default {
  name: "InstallationsList",
  mixins: [TablesMixin],
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
        },
        {
          key: 'history'
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
    showHistory({item}) {
      this.$emit('showHistory', item);
    }
  }
}
</script>

<style scoped>

</style>