<template>
  <b-table striped hover
           :fields="fields"
           :items="history" />
</template>

<script>
import TablesMixin from "@/mixins/TablesMixin";

export default {
  name: "InstallationHistory",
  mixins: [TablesMixin],
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fields: [
        {
          key: 'status', sortable: false, formatter: (value) => {
            return this.getPrettyStatus(value)
          }
        },
        {key: 'notes', sortable: false},
        {
          key: 'date', sortable: true, formatter: (value) => {
            return this.getPrettyDate(value)
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>