<script>
import { RouterLink, RouterView } from 'vue-router'
import MssNotification from './components/MssNotification.vue'
import AuthService from "@/services/AuthService"
import { mapGetters } from 'vuex';

export default {
    computed: { ...mapGetters(['isLoggedIn']) },

    methods: {
      signout() {
        AuthService.logout();
        this.$router.push('/login');
      }
    }
}
</script>

<template>

  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">

    <div>

      <a href="/" class="logo d-flex align-items-center">
        <a  href="#">
          <img src="./assets/logos/skrati.png"
          width="50"
          
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
          >
        </a>
            <span class="d-none d-lg-block" font="Arial" >MSS Internship</span>
       
      </a>
    </div><!-- End Logo -->
<!-- 
    <div class="search-bar p-0">
      <form class="search-form d-flex align-items-center" method="POST" action="#">
        <input type="text" name="query" placeholder="Search" title="Enter search keyword">
        <button type="submit" title="Search"><i class="bi bi-search"></i></button>
      </form>
    </div>  End Search Bar --> 
    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

        <li class="nav-item d-block d-lg-none">
          <a class="nav-link nav-icon search-bar-toggle " href="#">
            <i class="bi bi-search"></i>
          </a>
        </li><!-- End Search Icon-->

        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink to="/Login" class="nav-link collapsed">Login</RouterLink>
        </li>

        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink to="/Register" class="nav-link collapsed">Register</RouterLink>
        </li>

        <li class="nav-item" v-if="isLoggedIn">
          <RouterLink to="/Profile" class="nav-link collapsed">Profile</RouterLink>
        </li>

        <li class="nav-item" v-if="isLoggedIn">
          <a href="#" @click="signout()" class="nav-link collapsed">Logout</a>
        </li>

      </ul>
    </nav><!-- End Icons Navigation -->

  </header><!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" v-if="isLoggedIn" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
      <RouterLink to="/" class="nav-link collapsed">Home</RouterLink>
      </li><!-- End Home Nav -->

      <!-- <li class="nav-item">
        <RouterLink to="/about" class="nav-link collapsed">About</RouterLink>
      </li>End Home Nav -->

      <li class="nav-item">
      <RouterLink to="/Vendors" class="nav-link collapsed">Vendors</RouterLink>
      </li>
  
        <li class="nav-item">

         <RouterLink to="/Reports" class="nav-link collapsed">Reports</RouterLink>
             </li>
      

      <li class="nav-item">
      <RouterLink to="/Assets" class="nav-link collapsed">Assets</RouterLink>
      </li>   

  
    </ul>

  </aside><!-- End Sidebar-->

  <main id="main" class="main" :class="{ 'ms-0': !isLoggedIn }">

    <section class="section faq">
      <div class="row">
        <div class="col-12">

          <div class="card basic">
            <div class="card-body mt-3">
              <MssNotification />
              <notifications /> 
              <RouterView />
            </div>
          </div>


        </div>
      </div>
    </section>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->

  <footer id="footer" class="footer" :class="{ 'ms-0': !isLoggedIn }">
  
  </footer><!-- End Footer -->

</template>



<style>
@import '@/assets/bootstrap.min.css';
@import '@/assets/niceadmin.css';

.card{
 width: 100%;
}

</style>