<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="@/assets/avatar.svg" />
          </figure>
        </div>
        <div v-if="loggedIn" class="media-content">
          <p class="title is-4">{{profile.username}}</p>
          <p class="subtitle is-6">{{profile.email}}</p>
        </div>
        <div v-else class="media-content">
          <p class="title is-4">Not logged in</p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a v-if="loggedIn" @click="logout" class="card-footer-item">Disconnect</a>
      <a v-else @click="goToLogin" class="card-footer-item">Login</a>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserModule } from "../../store/modules/user";

export interface Profile {
  username: string;
  email: string;
}

export default Vue.extend({
  name: "AuthTestCheck" as string,
  data() {
    return {
      profile: {
        username: "loading...",
        email: "loading..."
      } as Profile,
      loggedIn: false
    };
  },
  methods: {
    getUser(): Profile {
      return {
        username: UserModule.username,
        email: UserModule.email
      };
    },
    goToLogin() {
      this.$router.push(`/auth?redirect=${this.$route.fullPath}`);
    },
    logout() {
      UserModule.LogOut();
      this.$router.push(`/auth?redirect=${this.$route.fullPath}`);
    },
    checkLoggedIn(): boolean {
      const token = UserModule.token;
      if (token) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.profile = this.getUser();
    this.loggedIn = this.checkLoggedIn();
  }
});
</script>

<style>
</style>