<template>
  <div id="app" v-bind:style="{ backgroundImage: bgrdImageUrl }">
    <b-container
      class="vh-100 text-center justify-content-center align-items-center"
      style="display: flex"
    >
      <div id="content" style="width: 100%">
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
                  v-model="searchRequest.searchTerm"
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
        <!-- CUSTOMIZATION SIDEBAR -->
        <b-sidebar id="sidebar-1" title="Customize search" shadow>
          <div class="px-3 py-2">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="input-group-1"
                label="Select Background:"
                label-for="input-1"
              >
                <b-form-select
                  id="input-1"
                  v-model="form.bgrdImage"
                  :options="bgrdImageOptions"
                  required
                ></b-form-select>
              </b-form-group>
              <b-button
                class="mr-4"
                type="submit"
                name="submitCustomization"
                variant="primary"
                >Submit</b-button
              >
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </div>
        </b-sidebar>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasBackground: false,
      form: {
        bgrdImage: 0,
      },
      bgrdImageOptions: [
        { value: 0, text: "None" },
        { value: 1, text: "Theme 1" },
        { value: 2, text: "Theme 2" },
      ],
      show: true,
      bgrdImageUrl: "",
      isLucky: false,
      searchRequest: {
        searchTerm: "",
      },
      searchResults: null,
    };
  },
  methods: {
    onSearchSubmit(ev) {
      ev.preventDefault();
      this.isLucky = false;
      this.performSearch();
    },

    onSubmit(ev) {
      ev.preventDefault();
      this.hasBackground = this.form.bgrdImage ? true : false;
      this.changeBackgroundImage();
    },

    onReset(ev) {
      ev.preventDefault();
      this.form.bgrdImage = 0;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    changeBackgroundImage() {
      if (this.form.bgrdImage === 0) this.bgrdImageUrl = "";
      if (this.form.bgrdImage === 1)
        this.bgrdImageUrl = `url(${require("./assets/landscape1.jpg")})`;
      if (this.form.bgrdImage === 2)
        this.bgrdImageUrl = `url(${require("./assets/landscape2.jpg")})`;
      localStorage.bgrdImageUrl = this.bgrdImageUrl;
    },

    luckySearch() {
      this.isLucky = true;
      this.performSearch();
    },

    luckyRedirect() {
      if (this.searchResults.data.length) {
        const url = this.searchResults.data[0].loc;
        window.location.href = url;
      }
    },

    async performSearch() {
      try {
        const response = await this.axios.post(
          "http://localhost:5000/searchApi/search",
          this.searchRequest
        );
        this.searchResults = response;
        console.log(JSON.stringify(response));
        if (this.isLucky) this.luckyRedirect();
      } catch (err) {
        this.searchResults = null;
        console.log(err);
      }
    },
  },

  computed: {
    textStyle() {
      return this.hasBackground ? "#f5f6f7" : "#141414";
    },
  },

  mounted() {
    if (localStorage.bgrdImageUrl) {
      this.bgrdImageUrl = localStorage.bgrdImageUrl;
      this.hasBackground = true;
    }
  },
};
</script>

<style>
</style>
