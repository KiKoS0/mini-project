<template>
  <div class="card msg-style">No news available right now. Please check later.</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NoNewsCard" as string
});
</script>

<style lang="scss">
.msg-style{
    font-size: 25px;
    font-weight: bold;
}
</style>