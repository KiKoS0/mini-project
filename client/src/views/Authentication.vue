<template>
  <div>
    <LogIn
      v-if="member"
      @clicked="member=!member"
    />
    <SignUp
      v-else
      @clicked="member=!member"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LogIn from '@/components/authentication/LogIn.vue';
import SignUp from '@/components/authentication/SignUp.vue';

export default Vue.extend({
  name: 'Authentication',
  data() {
    return {
      member: true as boolean
    }
  },
  components: {
    LogIn,
    SignUp
  }
})
</script>

<style>
.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.margin {
  margin-top: 10%;
  margin-right: 10%;
}
.hover-effect:hover {
  color: #38d39f;
  cursor: pointer;
}
p {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}
@media screen and (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
  }
  .img {
    display: none;
  }
  .wave {
    display: none;
  }
  .login-content {
    justify-content: center;
  }
}
</style>