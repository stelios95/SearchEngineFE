<template>
  <div>
    <div v-if="loading" class="spinner">
      <b-spinner></b-spinner>
    </div>
    <div v-else-if="error">
      <h3 style="color: red">Error: {{ error.message }}</h3>
    </div>
    <div v-else>
      <div class="header-card p-3">
        <b-container>
          <b-row class="vh-10" align-v="center">
            <b-col cols="6">
              <h3 class="header-text">
                Results for term : "<b>{{ this.searchConfigs.searchTerm }}</b
                >"
                <b-icon icon="search"></b-icon>
              </h3>
              <p class="header-text">
                Found <b>{{ searchResults.data.length }}</b> results
                <b-icon icon="check"></b-icon>
              </p>
            </b-col>
            <b-col cols="6">
              <b-form class="text-right" @submit="onSearchSubmit">
                <b-input-group style="margin: auto; width: 80%">
                  <b-form-input
                    v-model="newSearchTerm"
                    id="searchInput"
                    type="text"
                    required
                    placeholder="Search again..."
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button type="submit" name="search" variant="primary"
                      >Go!</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <br />
      <div>
        <div v-if="loading" class="spinner">
          <b-spinner></b-spinner>
        </div>
        <ul style="list-style-type: none; padding: 0" id="resultsList">
          <li v-for="item in itemsForList" :key="item.title">
            <ResultItem class="m-4" v-bind:search-item="item"></ResultItem>
          </li>
        </ul>
        <b-container v-if="!searchResults.data.length">
          <h3 class="not-found-text">
            Unfortunately we could not find any page containing the term you
            searched for...
          </h3>
          <h1>:(</h1>
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
          class="custom-pagination mb-5"
        ></b-pagination>
      </div>
    </div>

    <div class="footer mt-2">
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
      newSearchTerm: "",
      loading: true,
      error: null,
    };
  },
  methods: {
    async performSearch() {
      try {
        this.loading = true;
        const response = await this.axios.post(
          "http://localhost:5000/searchApi/search",
          this.searchConfigs
        );
        if (this.searchConfigs.isLucky) this.luckyRedirect(response);
        else this.searchResults = response;
      } catch (err) {
        this.searchResults = null;
        this.error = err;
      } finally {
        console.log("finaly");
        this.loading = false;
      }
    },

    onSearchSubmit(ev) {
      ev.preventDefault();
      this.searchConfigs.searchTerm = this.newSearchTerm;
      this.performSearch();
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
      return this.searchResults
        ? this.searchResults.data.slice(
            (this.currentPage - 1) * this.perPage,
            this.currentPage * this.perPage
          )
        : [];
    },
    isLoading() {
      return this.loading;
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

.spinner {
  position: absolute;
  height: 100px;
  width: 100px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  background-size: 100%;
}
</style>