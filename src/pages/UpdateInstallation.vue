<template>
  <div>
    <div>
      <h1>Update Installation</h1>
    </div>
    <div class="row" v-if="installation">
      <div class="col">
        <strong>Customer name: </strong>{{ installation.customer_name }}
      </div>
      <div class="col">
        <strong>Appointment date: </strong>{{ getPrettyDate(installation.appointment_date) }}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <strong>Created at: </strong>{{ getPrettyDate(installation.date_created) }}
      </div>
      <div class="col">
        <strong>Last updated: </strong>{{ getPrettyDate(installation.date_modified) }}
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <strong>Current status: </strong>{{ getPrettyStatus(installation.latest_status) }}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-alert variant="error" :show="error">An error occurred, please try again.</b-alert>

        <b-form @submit="onSubmit" v-if="!loading" ref="status-form">
          <b-form-group
              id="status"
              label="Status:"
              label-for="status"
          >
            <b-form-select v-model="form.status" :options="statusOptions" required></b-form-select>
          </b-form-group>

          <b-form-group id="notes" label="Notes:" label-for="notes">
            <b-form-textarea
                id="notes"
                v-model="form.notes"
                placeholder="Enter notes here"
                rows="3"
                max-rows="6"
                required
            ></b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary" class="btn-block">Submit</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import {API_BASE} from "@/constants";
import TablesMixin from "@/mixins/TablesMixin";

export default {
  name: "UpdateInstallation",
  mixins: [TablesMixin],
  data() {
    return {
      statusOptions: [
        {value: null, text: 'Please select an option'},
        {value: 'installation_request', text: 'Installation requested'},
        {value: 'installation_in_progress', text: 'Installation in progress'},
        {value: 'installation_complete', text: 'Installation Complete'},
        {value: 'installation_rejected', text: 'Installation Rejected'}
      ],
      form: {
        status: '',
        notes: ''
      },
      loading: false,
      error: false,
      installation: null
    }
  },
  methods: {
    onSubmit() {
      this.updateInstallation();
    },
    fetchInstallation(id) {
      this.loading = true;
      fetch(`${API_BASE}/installations/${id}/`)
          .then(res => {
            if (res.ok) {
              res.json()
            } else {
              throw new Error()
            }
          })
          .then(res => {
            this.installation = res;
            this.loading = false;
          });
    },
    updateInstallation() {
      this.loading = true;
      fetch(`${API_BASE}/create/installation/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          installation: this.$route.params.id,
          status: this.form.status,
          notes: this.form.notes
        })
      })
          .then(() => {
            this.loading = false;
            this.$router.push('/')
          })
          .catch(() => {
            this.error = true;
            this.loading = false;
          });
    }
  },
  created() {
    this.fetchInstallation(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>