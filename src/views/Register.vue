<script>
import { notificationMixin } from "@/mixins/notificationMixin";
import { axiosMixin } from "../mixins/axiosMixin";

export default ({
  name:'Register',
  mixins: [axiosMixin, notificationMixin],

  data() {
    return {
      errors: {},
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      termsChecked: false
    }
  },

  methods: {
    async onSubmit() {
      const isFormValid = this.validateRegistrationForm();

      if (isFormValid) {
        try {
          const response = await this.callApi('https://internship2022-auth-api.mss.ba/api/User/register', {
            method: 'POST',
            data: {
              firstName: this.firstName,
              lastName: this.lastName,
              username: this.username,
              email: this.email,
              password: this.password,
              passwordConfirm: this.passwordConfirm,
            }
          });

          this.$router.push('/login');
        } catch (ex) {
          this.fireNotification({ title: 'Something went wrong', text: ex.message, type: 'error' });
        }
      }
    },

    validateRegistrationForm() {
      this.errors = {};

      if (this.firstName?.length < 2) {
        this.errors.firstName = 'First name is too short';
      } else if (this.firstName?.length > 30) {
        this.errors.firstName = 'First name is too long';
      }

      if (this.lastName?.length < 2 || this.lastName?.length > 30) {
        this.errors.lastName = 'Last name is either too long or too short';
      }

      if (this.username?.length < 2 || this.username?.length > 30) {
        this.errors.username = 'Username is either too long or too short';
      }

      if (!this.email?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.errors.email = 'Email is not valid';
      }

      if (this.password?.length < 2 || this.password?.length > 30) {
        this.errors.password = 'Password is either too long or too short';
      }

      if (this.password !== this.passwordConfirm) {
        this.errors.passwordConfirm = 'Password does not match';
      }

      if (Object.keys(this.errors).length) {
        return false;
      }

      return true;
    }
  }
})     
</script>

<template>
  <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center form">

              <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <!-- <img src="assets/img/logo.png" alt=""> -->
                  <span class="d-none d-lg-block">NiceAdmin</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                    <p class="text-center small">Enter your personal details to create account</p>
                  </div>

                  <form @submit.prevent="onSubmit" class="row g-3 needs-validation" novalidate>
                    <div class="col-12">
                      <label>First Name</label>
                      <input type="text" class="form-control" v-model="firstName" required />
                      <div class="invalid-feedback d-block" v-if="errors.firstName">{{ errors.firstName }}</div>
                    </div>

                     <div class="col-12">
                      <label>Last Name</label>
                      <input type="text" class="form-control" v-model="lastName" required />
                      <div class="invalid-feedback d-block" v-if="errors.lastName">{{ errors.lastName }}</div>
                    </div>

                    <div class="col-12">
                      <label>Username</label>
                      <input type="text" class="form-control" v-model="username" required />
                      <div class="invalid-feedback d-block" v-if="errors.username">{{ errors.username }}</div>
                    </div>

                    <div class="col-12">
                      <label>Your Email</label>
                      <input type="text" class="form-control"  v-model="email" required />
                      <div class="invalid-feedback d-block" v-if="errors.email">{{ errors.email }}</div>
                    </div>

                    <div class="col-12">
                      <label>Password</label>
                      <input type="password" class="form-control"  v-model="password" required />
                      <div class="invalid-feedback d-block" v-if="errors.password">{{ errors.password }}</div>
                    </div>

                    <div class="col-12">
                      <label>Repeat Password</label>
                      <input type="password" class="form-control"  v-model="passwordConfirm" required />
                      <div class="invalid-feedback d-block" v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</div>
                    </div>

                    <div class="col-12">
                      <div class="form-check">
                        <input class="form-check-input" v-model="termsChecked" type="checkbox" value="" required />
                        <label class="form-check-label">I agree and accept the <a href="#">terms and conditions</a></label>
                        <div class="invalid-feedback">You must agree before submitting.</div>
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit" :disabled="!termsChecked">Create Account</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Already have an account? <a href="Login">Log in</a></p>
                    </div>
                  </form>

                </div>
              </div>

              <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>

</template>

<style>
.form{
  position: relative;
  bottom: 50px;
}
</style>