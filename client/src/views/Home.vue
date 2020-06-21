<template>
  <div class="home">
    <div class="columns">
      <div class="column is-one-quarter"></div>
      <div class="column">
        <search-bar />
      </div>
      <div class="column is-one-quarter">
        <AuthTestCheck />
      </div>
    </div>
    <News />
  </div>
</template>

<script>
// @ is an alias to /src
import AuthTestCheck from "@/components/authentication/AuthTestCheck.vue";
import SearchBar from "@/components/SearchBar.vue";
import News from '@/components/news/News.vue'

export default {
  name: "Home",
  components: {
    AuthTestCheck,
    SearchBar,
    News
  }
};
</script>
