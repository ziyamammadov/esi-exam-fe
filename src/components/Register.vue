<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input v-model="user.username" v-validate="'required|min:3|max:20'" class="form-control" name="username"
              type="text" />
            <div v-if="submitted && errors.has('username')" class="alert-danger">
              {{ errors.first("username") }}
            </div>
          </div>
          <div class="form-group">
            <label for="firstName">First name</label>
            <input v-model="user.firstName" v-validate="'required|min:3|max:20'" class="form-control" name="firstName"
              type="text" />
            <div v-if="submitted && errors.has('firstName')" class="alert-danger">
              {{ errors.first("firstName") }}
            </div>
          </div>
          <div class="form-group">
            <label for="lastName">Last name</label>
            <input v-model="user.lastName" v-validate="'required|min:3|max:20'" class="form-control" name="lastName"
              type="text" />
            <div v-if="submitted && errors.has('lastName')" class="alert-danger">
              {{ errors.first("lastName") }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="user.email" v-validate="'required|email|max:50'" class="form-control" name="email"
              type="email" />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first("email") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="user.password" v-validate="'required|min:5|max:40'" class="form-control" name="password"
              type="password" />
            <div v-if="submitted && errors.has('password')" class="alert-danger">
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input v-model="user.address" v-validate="'required|min:3|max:20'" class="form-control" name="address"
              type="text" />
            <div v-if="submitted && errors.has('address')" class="alert-danger">
              {{ errors.first("address") }}
            </div>
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone number</label>
            <input v-model="user.phoneNumber" v-validate="'required|min:3|max:20'" class="form-control"
              name="phoneNumber" type="text" />
            <div v-if="submitted && errors.has('phoneNumber')" class="alert-danger">
              {{ errors.first("phoneNumber") }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div v-if="message" :class="successful ? 'alert-success' : 'alert-danger'" class="alert">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Auth = namespace("Auth");

@Component
export default class Register extends Vue {
  private user: any = { username: "", email: "", password: "", firstName: "", lastName: "", address: "", phoneNumber: "" };
  private submitted: boolean = false;
  private successful: boolean = false;
  private message: string = "";

  @Auth.Action
  private register!: (data: any) => Promise<any>;

  handleRegister() {
    this.message = "";
    this.submitted = true;

    this.$validator.validate().then((isValid) => {
      if (isValid) {
        this.register(this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.$router.push("/login");
          },
          (error) => {
            this.message = error;
            this.successful = false;
          }
        );
      }
    });
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
