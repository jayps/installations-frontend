<template>
  <div>
    <div>
      <h1>New Installation</h1>
    </div>
    <div class="row">
      <div class="col">
        <b-form @submit="onSubmit" v-if="!loading">
          <b-form-group
              id="customer_name"
              label="Customer name:"
              label-for="customer_name"
          >
            <b-form-input
                id="customer_name"
                v-model="form.customerName"
                type="text"
                required
                placeholder="Customer name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="appointment_date" label="Appointment date:" label-for="appointment_date">
            <b-form-datepicker id="appointment_date" v-model="form.appointmentDate" class="mb-2"
                               :min="minInstallationDate" required="true"></b-form-datepicker>
          </b-form-group>
          <b-form-group id="appointment_time" label="Appointment time:" label-for="appointment_time">
            <b-form-timepicker id="appointment_time" v-model="form.appointmentTime" locale="en"
                               required="true"></b-form-timepicker>
          </b-form-group>

          <b-button type="submit" variant="primary" class="btn-block">Submit</b-button>
        </b-form>
      </div>
    </div>
    {{ form }}
  </div>
</template>

<script>
import {API_BASE} from "@/constants";

export default {
  name: "NewInstallation",
  data() {
    return {
      form: {
        customerName: '',
        appointmentDate: '',
        appointmentTime: ''
      },
      minInstallationDate: new Date(),
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.createInstallation();
    },
    createInstallation() {
      this.loading = true;
      fetch(`${API_BASE}/create/installation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_name: this.form.customerName,
          appointment_date: `${this.form.appointmentDate}T${this.form.appointmentTime}`
        })
      }).then(res => res.json()).then(() => {
        this.loading = false;
        this.$bvToast.toast(`Installation created`, {
          title: 'Success',
          autoHideDelay: 5000,
          variant: 'success'
        });
        this.$router.push('/');
      })
    }
  }
}
</script>

<style scoped>

</style>