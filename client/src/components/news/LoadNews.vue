<template>
  <b-button
    class="is-info is-medium"
    :loading="state"
    @click="loadMoreNews"
  >
    More
  </b-button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "LoadNews" as string,
  props: ["loading"],
  computed: {
    state(): boolean {
      return this.loading ? true : false
    }
  },
  methods: {
    loadMoreNews() {
      this.$emit("loadMoreNews")
    }
  }
})
</script>

<style lang="scss">
</style>