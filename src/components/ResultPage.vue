<template>
  <div>
    <div>
      <b-card bg-variant="light">
        <h3>
          Results for term : "<b>{{ this.searchConfigs.searchTerm }}</b
          >"
        </h3>
        <p>
          Found <b>{{ searchResults.data.length }}</b> results
        </p>
      </b-card>
      <br />
    </div>
    <div>
      <ul id="resultsList">
        <li
          style="list-style-type: none"
          v-for="item in itemsForList"
          :key="item.title"
        >
          <ResultItem v-bind:search-item="item"></ResultItem>
          <br />
        </li>
      </ul>
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="searchResults.data.length"
        first-number
        last-number
        aria-controls="resultsList"
        align="center"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import ResultItem from "./ResultItem";
export default {
  components: { ResultItem },
  props: ["searchConfigs"],
  data() {
    return {
      searchResults: null,
      perPage: 10,
      currentPage: 1,
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
  computed: {
    itemsForList() {
      return this.searchResults.data.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
  },
};
</script>

<style>
</style>