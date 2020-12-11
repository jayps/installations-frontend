<template>
  <div id="app">
    <template>
      <div class="row">
        <div class="col-xs-12 col-sm-4 offset-sm-1">
          <h1>Installation manager</h1>
        </div>
        <div class="col-xs-12 col-sm-6 text-right">
          <b-button variant="outline-primary">New Installation</b-button>
        </div>
      </div>
    </template>
    <div class="row" v-if="loading">
      <div class="col-xs-12 col-sm-10 offset-sm-1">
        Loading...
      </div>
    </div>
    <div class="row" v-show="!loading">
      <div class="col-xs-12 col-sm-10 offset-sm-1">
        <installations-list :installations="installations" @sort="sort"/>
      </div>
    </div>
  </div>
</template>

<script>
import InstallationsList from "@/components/InstallationsList";
import {API_BASE} from "@/constants";

export default {
  name: 'App',
  components: {
    InstallationsList
  },
  data() {
    return {
      installations: [],
      sorting: '-date_modified',
      loading: false
    }
  },
  methods: {
    fetchInstallations() {
      this.loading = true;
      fetch(`${API_BASE}/installations/?ordering=${this.sortDefinition}`)
          .then(res => res.json())
          .then(res => {
            this.installations = res;
            this.loading = false;
          })
    },
    sort(sortDefinition) {
      this.sortDefinition = sortDefinition;
      this.fetchInstallations();
    }
  },
  created() {
    this.fetchInstallations();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 48px;
}
</style>
