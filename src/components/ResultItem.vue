<template>
  <div>
    <b-card bg-variant="light" style="max-width: 60rem">
      <b-card-text>
        <a :href="resultItem.loc"
          ><h6>{{ resultItem.title }}</h6></a
        >
      </b-card-text>
    </b-card>
  </div>
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