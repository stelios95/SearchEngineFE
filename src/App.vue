<template>
  <div id="app">
    <b-container
      class="vh-100 text-center justify-content-center align-items-center"
      style="display: flex"
    >
      <div id="content" style="width:100%">
        <b-row class="justify-content-center">
          <b-col>
            <h1>Search anything :)</h1>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col>
            <b-form>
              <b-input-group style="margin : auto; width : 50%">
                <b-form-input id="searchInput" type="text" required placeholder="Search here..."></b-form-input>
                <b-input-group-append>
                  <b-button type="submit" variant="primary">Go!</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
