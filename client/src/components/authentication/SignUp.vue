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
            <h2 class="title">Sign Up</h2>
          </div>
          <div class="field">
            <form @keyup.enter="signUp">
              <div class="field">
                <b-field label="Username" label-position="on-border">
                  <b-input v-model="signupForm.username"></b-input>
                </b-field>
              </div>
              <div class="field">
                <b-field :type="emailState.state" label="Email" label-position="on-border" :message="emailState.msg">
                  <b-input v-model="signupForm.email"></b-input>
                </b-field>
              </div>
              <div class="field">
                <b-field label="Password" label-position="on-border">
                  <b-input type="password" v-model="signupForm.password" password-reveal></b-input>
                </b-field>
              </div>
            </form>
          </div>
          <div class="field">
            <b-button
              style="background-color:#1e235c;color:white"
              expanded
              rounded
              @click="signUp"
            >Sign Up</b-button>
          </div>
          <div class="field">
            <p>
              Already a member ?
              <span @click="$emit('clicked')" class="hover-effect">Log In</span>
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
      signupForm: {
        email: "",
        password: "",
        username: ""
      }
    };
  },
  methods: {
    signUp(): void {
      if (
        this.signupForm.email &&
        this.signupForm.password &&
        this.signupForm.username &&
        this.validEmail
      ) {
        UserModule.Register(this.signupForm).then(() => {
          // TODO: Redirect to initial visited page (redirect in query)
          this.$router.push({
            path: "/"
          });
        });
      }
    }
  },
  computed: {
    emailState(): {state: string;msg: string} {
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.signupForm.email) {
        if (emailRegEx.test(this.signupForm.email)) {
          return { state: "is-success", msg: "" };
        } else {
          return { state: "is-danger", msg: "This email is invalid" };
        }
      }
      return { state: "", msg: "" };
    },
    validEmail(): boolean {
      switch (this.emailState.state) {
        case "is-success":
          return true;
        default:
          return false;
      }
    }
  }
});
</script>
