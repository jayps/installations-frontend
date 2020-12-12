<template>
  <div id="app">
    <template>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <h1>Installation manager</h1>
        </div>
        <div class="col-xs-12 col-sm-6 text-right">
          <b-button variant="outline-primary" href="#/new-installation">New Installation</b-button>
        </div>
      </div>
    </template>
    <div class="row" v-if="loading">
      <div class="col">
        Loading...
      </div>
    </div>
    <div class="row" v-show="!loading">
      <div class="col">
        <div class="my-3">
          Filter status: <b-form-select v-model="statusFilter" :options="statusOptions" size="sm" class="mt-3"></b-form-select>
        </div>
        <installations-list :installations="installations" @sort="sort" @showHistory="fetchInstallationHistory"/>
      </div>
    </div>
    <b-modal ref="history-modal" hide-footer title="History" size="lg">
      <div class="d-block text-center">
        <h3>Installation history</h3>
        <p v-if="this.historyLoading">Loading...</p>
        <installation-history :history="history" />
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button>
    </b-modal>
  </div>
</template>

<script>

import InstallationsList from "@/components/InstallationsList";
import {API_BASE} from "@/constants";
import InstallationHistory from "@/components/InstallationHistory";
export default {
  name: "InstallationList",
  components: {
    InstallationHistory,
    InstallationsList
  },
  data() {
    return {
      installations: [],
      sortDefinition: '-date_modified',
      loading: false,
      historyLoading: false,
      history: [],
      currentInstallation: null,
      statusFilter: null,
      statusOptions: [
        {value: null, text: 'No filter'},
        {value: 'installation_request', text: 'Installation requested'},
        {value: 'installation_in_progress', text: 'Installation in progress'},
        {value: 'installation_complete', text: 'Installation Complete'},
        {value: 'installation_rejected', text: 'Installation Rejected'}
      ],
    }
  },
  methods: {
    fetchInstallations() {
      this.loading = true;
      let url = `${API_BASE}/installations/?ordering=${this.sortDefinition}`;
      if (this.statusFilter) {
        url += `&latest_status=${this.statusFilter}`;
      }

      fetch(url)
          .then(res => res.json())
          .then(res => {
            this.installations = res;
            this.loading = false;
          })
    },
    fetchInstallationHistory({id}) {
      this.historyLoading = true;
      this.showModal();
      this.history = [];
      fetch(`${API_BASE}/installations/${id}/history`)
          .then(res => res.json())
          .then(res => {
            this.history = res;
            this.historyLoading = false;
          })
    },
    sort(sortDefinition) {
      this.sortDefinition = sortDefinition;
      this.fetchInstallations();
    },
    showModal() {
      this.$refs['history-modal'].show()
    },
    hideModal() {
      this.$refs['history-modal'].hide()
    },
  },
  created() {
    this.fetchInstallations();
  },
  watch: {
    statusFilter() {
      this.fetchInstallations();
    }
  }
}
</script>

<style scoped>

</style>