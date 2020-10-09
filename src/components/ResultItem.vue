<template>
  <div>
    <b-card bg-variant="light">
      <b-card-text>
        <a :href="resultItem.loc"
          ><h4>{{ resultItem.title }}</h4></a
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