<template>
  <a
    class="link-color"
    style="display: block; max-width: 50rem"
    :href="resultItem.loc"
  >
    <b-card bg-variant="light" border-variant="dark" style="max-width: 50rem">
      <b-card-text>
        <h6>{{ resultItem.title }}</h6>
        <p><b-icon icon="link45deg"></b-icon> {{ resultItem.loc }}</p>
        <p>
          <b-icon icon="calendar-date"></b-icon>
          {{ resultItem.lastmod ? resultItem.lastmod.substring(0, 10) : "N/A" }}
        </p>
        <p>Relevance Score: {{ resultItem.score }}</p>
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