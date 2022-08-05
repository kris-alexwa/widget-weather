<template>
  <div id="app">
    <main-page />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainPage from './components/MainPage.vue';

@Component({
  components: {
    MainPage,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
$primary-color: black;
$font-stack: Avenir, Helvetica, Arial, sans-serif;
#app {
  font-family: $font-stack;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary-color;
  margin: 60px 0;
}
</style>
