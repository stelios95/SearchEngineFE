<template>
  <div>
    <h1>Result Page and {{ param }}</h1>
    <p>Results: {{ searchResults }}</p>
    <ResultItem></ResultItem>
  </div>
</template>

<script>
import ResultItem from "./ResultItem";
export default {
  components: { ResultItem },
  props: ["searchConfigs"],
  data() {
    return {
      param: this.searchConfigs,
      searchResults: null,
    };
  },
  methods: {
    async performSearch() {
      try {
        const response = await this.axios.post(
          "http://localhost:5000/searchApi/search",
          this.searchConfigs
        );
        this.searchResults = response;
        console.log(JSON.stringify(response));
        if (this.searchConfigs.isLucky) this.luckyRedirect();
      } catch (err) {
        this.searchResults = null;
        console.log(err);
      } finally {
        console.log("finally");
      }
    },

    luckyRedirect() {
      if (this.searchResults.data.length) {
        const url = this.searchResults.data[0].loc;
        window.location.href = url;
      }
    },
  },
  mounted() {
    if (!this.searchConfigs.searchTerm) this.$router.go(-1);
    else this.performSearch();
  },
};
</script>

<style>
</style>