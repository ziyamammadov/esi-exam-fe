<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-white bg-white">
      <a class="navbar-brand" href @click.prevent>
        <img src="./assets/logo.png" class="image-responsive" style="height:50px">
        Library
        </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item" v-if="currentUser">
          <router-link class="nav-link" to="/books">
            <font-awesome-icon icon="book" />
            Books
          </router-link>
        </li>
        <li v-if="isLibrarian()" class="nav-item">
          <router-link class="nav-link" to="/customers">
            <font-awesome-icon icon="users" />
            Customers
          </router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/register">
            <font-awesome-icon icon="user-plus" />
            Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">
            <font-awesome-icon icon="sign-in-alt" />
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />
            Log out
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class App extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  isLibrarian(): boolean {
    if (this.currentUser && this.currentUser.authorities) {
      return this.currentUser.authorities.includes("LIBRARIAN");
    }
    return false;
  }

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }
}
</script>
