<script>
import Vue from "vue";
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import merkleTree from "../plugins/merkle-tree";

const accounts = [
  "0xaDF00CafB65ab94642dAeaeE9269522dd997E276",
  "0xD730bDacff4df8b31FE1CdfE5AAb72a9Cd74a6bD",
  "0xf84DCC8A50fE6C49EF68726eE976629Bef9665f5",
  "0xd9F36B0a4a75Ffed97Bdb29B9c4030edCBF8Be9c"
];

export default {
  data() {
    return {
      accounts,
      tree: [],
      nodesGroup: [],
      currentLevelLeavesAmount: 0,
      colors: ['text-success', 'text-danger', 'text-success', 'text-danger'],
    };
  },
  created() {
  },
  methods: {
    calculateTree() {
      this.tree = merkleTree;
      this.tree.init();
      this.tree.setLeaves(this.accounts);
      this.tree.growTree();

      this.nodesGroup = this.tree.tree;
    },
  },
  watch: {
    accounts: {
      handler: function() {
        this.calculateTree();
      },
      deep: true,
      immediate: true,
    }
  },
}
</script>

<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-start">
        <div class="col">
          LEVEL
        </div>
        <div class="col">
          NODE
        </div>
      </div>
      <div v-for="(nodes, key) in nodesGroup" :key="key" class="row align-items-center mt-5">
        <div class="col-1">{{key}}</div>
        <div v-for="(node, key) in nodes" :key="node" class="col text-truncate" :class="[colors[key]]">
          {{node}}
        </div>
      </div>
      <div class="row mt-5">
        <div v-for="account in accounts" :key="account" class="col text-truncate">
          {{account}}
        </div>
      </div>
      <hr/>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">白名單帳號</span>
        </div>
        <input v-for="(account, key) in accounts" v-model="accounts[key]" :key="account" type="text" class="form-control">
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
