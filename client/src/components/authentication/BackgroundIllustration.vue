<template>
  <div class="section">
    <img class="wave" src="@/assets/wave.png" />
      <div class="img">
        <img src="@/assets/bg.svg" />
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BackgroundIllustration" as string
});
</script>

<style lang="scss">
.img {
  width: 500px;
  height: 100px;
  position: absolute;
  bottom: 45%;
  left:10%
}
.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}
</style>