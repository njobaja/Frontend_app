<script>
import { mapGetters } from 'vuex';

export default {
    computed: { ...mapGetters(['currentUser']) },
}
</script>

<template>
  <!--  {{JSON.stringify(currentUser)}} -->
   <section class="section">
        <div class="row">
<!--                     <h1>Hello {{currentUser.id}}</h1> -->
                    <div class=" profile-card col-lg-4">
                        <div class="profile-body col-lg-12">
                            <img src="https://ih1.redbubble.net/image.368090865.3337/flat,128x128,075,t-pad,128x128,f8f8f8.u3.jpg" alt="Profile">
                            <h2>{{currentUser.id}}</h2>
                            <h4>Web Designer</h4>
                            <div class="social-links "> 
                                <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="about-card col-lg-8">
                        <div class="about-body">
                            <h3>About</h3>
                            <p>Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, 
                                Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                                Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, </p>
                        </div>
                        <h5>Profile Details</h5>
                            <div class="col-lg-3 col-md-4 label ">Full Name</div>
                            <div class="col-lg-9 col-md-8 info">John Doe</div>

                            <div class="col-lg-3 col-md-4 label ">Company</div>
                            <div class="col-lg-9 col-md-8 info">MSS</div>

                            <div class="col-lg-3 col-md-4 label ">Job</div>
                            <div class="col-lg-9 col-md-8 info">Web Designer</div>

                            <div class="col-lg-3 col-md-4 label ">Country</div>
                            <div class="col-lg-9 col-md-8 info">BiH</div>

                            <div class="col-lg-3 col-md-4 label ">Address</div>
                            <div class="col-lg-9 col-md-8 info">BB</div>

                            <div class="col-lg-3 col-md-4 label ">Email</div>
                            <div class="col-lg-9 col-md-8 info">example@email.com</div>
                    </div>
            </div>
    </section>
</template>


<style>
    
    .profile-body{
        position: relative;
        top: 20px;
        float: right;
        text-align: center;
    }
    .social-links a{
          padding: 5px;
    }
    .label{
        color: darkgrey;
        float: left;
        padding: 10px;
    }
    .info{
        color: black;
            padding: 10px;
        }
</style>