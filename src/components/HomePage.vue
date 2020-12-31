<template>
  <div v-bind:style="{ backgroundImage: bgrdImageUrl }">
    <b-container
      class="vh-100 text-center justify-content-center align-items-center"
      style="display: flex"
    >
      <div v-if="isMobile" style="width: 100%">
        <b-row class="justify-content-center">
          <b-col>
            <h1 v-bind:style="{ color: textStyle }">Search anything :)</h1>
          </b-col>
        </b-row>
        <b-row class="justify-content-center"
          ><b-form @submit="onSearchSubmit">
            <b-input-group style="margin: auto; width: 100%">
              <b-form-input
                v-model="searchConfigs.searchTerm"
                id="searchInput"
                type="text"
                required
                placeholder="Something interesting..."
              ></b-form-input>
              <b-input-group-append>
                <b-button type="submit" name="search" variant="primary"
                  >Go!</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-row>
        <b-row class="justify-content-center mt-3"
          ><b-button class="mt-2" v-b-toggle.sidebar-1 variant="info"
            >Customize search</b-button
          >
        </b-row>
        <b-row class="justify-content-center mt-3"
          ><b-button class="mt-2" variant="info" v-on:click="luckySearch"
            >I'm feeling lucky</b-button
          >
        </b-row>
      </div>
      <div v-else style="width: 100%">
        <b-row class="justify-content-center">
          <b-col>
            <h1 v-bind:style="{ color: textStyle }">Search anything :)</h1>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col>
            <b-form @submit="onSearchSubmit">
              <b-input-group style="margin: auto; width: 50%">
                <b-form-input
                  v-model="searchConfigs.searchTerm"
                  id="searchInput"
                  type="text"
                  required
                  placeholder="Type your search term here..."
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
        <b-row class="justify-content-center mt-3">
          <b-col>
            <b-button class="mr-2" v-b-toggle.sidebar-1 variant="info"
              >Customize search</b-button
            >
            <b-button variant="info" v-on:click="luckySearch"
              >I'm feeling lucky</b-button
            >
          </b-col>
        </b-row>
      </div>
      <!-- CUSTOMIZATION SIDEBAR -->
      <b-sidebar id="sidebar-1" title="Customize search" shadow>
        <div class="px-3 py-2">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              label-cols-sm="4"
              label="Background:"
              label-align-sm="left"
              label-for="input-1"
            >
              <b-form-select
                label="label"
                id="input-1"
                v-model="form.bgrdImage"
                :options="bgrdImageOptions"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="Sort By:"
              label-align-sm="left"
              label-for="input-2"
            >
              <b-form-select
                class="mt-2"
                id="input-2"
                v-model="searchConfigs.sortBy"
                :options="sortByOptions"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              label-cols-sm="4"
              label="Timeframe:"
              label-align-sm="left"
              label-for="input-2"
            >
              <b-form-select
                class="mt-2"
                id="input-3"
                v-model="searchConfigs.timeframe"
                :options="timeframeOptions"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-checkbox
              style="text-align: left"
              class="mt-2 mb-5"
              id="checkbox-1"
              v-model="searchConfigs.isExactTermSearch"
              name="checkbox-1"
              value="true"
              unchecked-value="false"
            >
              Search for Exact Term
            </b-form-checkbox>
            <div class="mt-2">
              <b-button
                v-b-toggle.sidebar-1
                class="mr-4"
                type="submit"
                name="submitCustomization"
                variant="primary"
                >Submit</b-button
              >
              <b-button type="reset" variant="danger">Reset</b-button>
            </div>
          </b-form>
        </div>
      </b-sidebar>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesMapping: {
        "": 0,
        landscape1: 1,
        landscape2: 2,
        landscape3: 3,
        landscape4: 4,
        landscape5: 5,
      },
      hasBackground: false,
      imageToBeReseted: 0,
      form: {
        bgrdImage: 0,
      },
      bgrdImageOptions: [
        { value: 0, text: "None" },
        { value: 1, text: "Fields" },
        { value: 2, text: "Mountain Coast" },
        { value: 3, text: "Abstract" },
        { value: 4, text: "Purple" },
        { value: 5, text: "Full Moon" },
      ],
      sortByOptions: [
        { value: "relevance", text: "Relevance" },
        { value: "dateOld", text: "Date (Old First)" },
        { value: "dateNew", text: "Date (New First)" },
      ],
      timeframeOptions: [
        { value: "today", text: "Today" },
        { value: "lastMonth", text: "Last Month" },
        { value: "lastYear", text: "Last Year" },
        { value: "allTime", text: "All Time" },
      ],
      show: true,
      bgrdImageUrl: "",
      isLucky: false,
      searchConfigs: {
        searchTerm: "",
        isExactTermSearch: "false",
        sortBy: "relevance",
        timeframe: "allTime",
      },
      searchResults: null,
    };
  },
  methods: {
    onSearchSubmit(ev) {
      ev.preventDefault();
      this.redirectToSearchResults(false);
    },

    luckySearch() {
      if (this.searchConfigs.searchTerm) this.redirectToSearchResults(true);
    },

    onSubmit(ev) {
      ev.preventDefault();
      this.hasBackground = this.form.bgrdImage ? true : false;
      this.imageToBeReseted = this.form.bgrdImage;
      this.changeBackgroundImage();
    },

    onReset(ev) {
      ev.preventDefault();
      this.form.bgrdImage = this.imageToBeReseted;
      this.searchConfigs.isExactTermSearch = "isNotExactTerm";
      this.searchConfigs.sortBy = "relevance";
      this.searchConfigs.timeframe = "allTime";
      this.$nextTick(() => {
        this.show = true;
      });
    },

    changeBackgroundImage() {
      if (this.form.bgrdImage === 0) this.bgrdImageUrl = "";
      if (this.form.bgrdImage === 1)
        this.bgrdImageUrl = `url(${require("../assets/landscape1.jpg")})`;
      if (this.form.bgrdImage === 2)
        this.bgrdImageUrl = `url(${require("../assets/landscape2.jpg")})`;
      if (this.form.bgrdImage === 3)
        this.bgrdImageUrl = `url(${require("../assets/landscape3.jpg")})`;
      if (this.form.bgrdImage === 4)
        this.bgrdImageUrl = `url(${require("../assets/landscape4.jpg")})`;
      if (this.form.bgrdImage === 5)
        this.bgrdImageUrl = `url(${require("../assets/landscape5.jpg")})`;
      localStorage.bgrdImageUrl = this.bgrdImageUrl;
    },

    redirectToSearchResults(isLucky) {
      this.searchConfigs.isLucky = isLucky;
      this.$router.push({
        name: "search",
        params: { searchConfigs: this.searchConfigs },
      });
    },
  },

  computed: {
    textStyle() {
      return this.hasBackground ? "#f5f6f7" : "#141414";
    },
    isMobile() {
      return navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
        ? true
        : false;
    },
  },

  mounted() {
    if (localStorage.bgrdImageUrl) {
      this.bgrdImageUrl = localStorage.bgrdImageUrl;
      this.hasBackground = true;
      this.form.bgrdImage = this.imagesMapping[
        this.bgrdImageUrl.substring(9, 19)
      ];
      this.imageToBeReseted = this.form.bgrdImage;
    }
  },
};
</script>

<style>
</style>