<template>
  <div class="home">
    <HelloWorld msg="hello"/>
    <h1> {{ msgStrapi }} </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/templates/HelloWorld.vue'; // @ is an alias to /src
import DataService from "../services/DataService";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private msgStrapi: any;

  strapiApi() {
    DataService.getAll()
      .then((response) => {
        this.msgStrapi = response.data;
        console.log('response', response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>
