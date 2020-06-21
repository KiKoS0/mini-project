<template>
  <section class="columns">
    <BackgroundIllustration class="column is-half" />
    <div class="column">
      <div class="container margin">
        <div class="block">
          <div class="field">
            <img style="height:150px" src="@/assets/avatar.svg" />
          </div>
          <div class="field">
            <h2 class="title">Log In</h2>
          </div>
          <form @keyup.enter="logIn">
          <div class="field">
            <b-field label="Username" label-position="on-border">
              <b-input v-model="loginForm.username"></b-input>
            </b-field>
          </div>
          <div class="field">
            <b-field label="Password" label-position="on-border">
              <b-input type="password" v-model="loginForm.password" password-reveal></b-input>
            </b-field>
          </div>
          </form>
          <div class="field">
            <p href="#" class="hover-effect">Forgot Password?</p>
          </div>
          <div class="field">
            <b-button
              style="background-color:#1e235c;color:white"
              expanded
              rounded
              @click="logIn"
            >Log In</b-button>
          </div>
          <div class="field">
            <p>
              Not a member ?
              <span @click="$emit('clicked')" class="hover-effect">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { UserModule } from "../../store/modules/user";
import BackgroundIllustration from "./BackgroundIllustration.vue";
export default Vue.extend({
  name: "LogIn" as string,
  components: {
    BackgroundIllustration
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    logIn() {
      // TODO: username and password validation
      if (this.loginForm.username && this.loginForm.password) {
        UserModule.Login(this.loginForm).then(() => {
          // TODO: Redirect to initial visited page (redirect in query)
          this.$router.push({
            path: "/"
          });
        });
      }
    }
  }
});
</script>

