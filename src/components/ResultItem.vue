<template>
  <a class="link-color" :href="resultItem.loc">
    <b-card bg-variant="light" style="max-width: 60rem">
      <b-card-text>
        <h6>{{ resultItem.title }}</h6>
        <p>{{ resultItem.loc }}</p>
        <p>Date : {{ resultItem.lastmod.substring(0, 10) }}</p>
      </b-card-text>
    </b-card>
  </a>
</template>

<script>
export default {
  props: ["searchItem"],
  data() {
    return {
      resultItem: this.searchItem,
    };
  },
};
</script>

<style>
.link-color {
  color: #212121 !important;
}
.link-color:hover,
.text-my-own-color:active {
  color: #455a64 !important;
}
</style>