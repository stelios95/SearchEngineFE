<template>
  <div>
    <div>
      <b-card class="header-card rounded-0">
        <h3 class="header-text">
          Results for term : "<b>{{ this.searchConfigs.searchTerm }}</b
          >"
          <b-icon icon="search"></b-icon>
        </h3>
        <p class="header-text">
          Found <b>{{ searchResults.data.length }}</b> results
          <b-icon icon="check"></b-icon>
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
      <b-container v-if="!searchResults.data.length">
        <h3 class="not-found-text">
          Unfortunately we could not find any page containing the term you
          searched for...
        </h3>
        <h1>:(</h1>
        <a class="link-color" href="/"
          ><h4>Click here to search for something else</h4></a
        >
      </b-container>

      <b-pagination
        v-if="searchResults.data.length"
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="searchResults.data.length"
        first-number
        last-number
        aria-controls="resultsList"
        align="center"
        class="custom-pagination"
      ></b-pagination>
      <br />
    </div>
    <div class="footer">
      Asterios Ntinos Bachelor Dissertation 2021 University of Macedonia
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
      perPage: 5,
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
        if (this.searchConfigs.isLucky) this.luckyRedirect(response);
        else this.searchResults = response;
      } catch (err) {
        this.searchResults = null;
        console.log(err);
      } finally {
        console.log("finally");
      }
    },

    luckyRedirect(res) {
      if (res.data.length) {
        const url = res.data[0].loc;
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
.header-card {
  background-color: #455a64;
}
.header-text {
  color: cornsilk;
}

.not-found-text {
  color: #455a64;
}

.page-item.active .page-link {
  background-color: #9e9e9e !important;
}

.page-link {
  color: black;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #455a64;
  color: white;
  text-align: center;
}

.link-color {
  color: #212121 !important;
}
.link-color:hover,
.text-my-own-color:active {
  color: #455a64 !important;
}
</style>