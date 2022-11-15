<template>

<div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel"  data-bs-interval="5000">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="d-block w-100" src="../assets/backgroundImages/Screenshot_55.png" alt="First slide" >
            <div class="carousel-caption d-none d-md-block">
                <h3>Welcome to Asset Management</h3>
                <h5>Feel free to look around and explore our webpage</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src="../assets/backgroundImages/Screenshot_2.png" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
            </div>
        </div>                               
        <div class="carousel-item">
            <img class="d-block w-100" src="../assets/backgroundImages/stock5.png" alt="Third slide">
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only"></span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only"></span>
    </a>
   
</div>

 <Map></Map>
<div><br></div>
</template>

<script>

import Map  from '@/components/Map.vue'; 


export default{
 
    components:{
      Map
    }
    
  
}
</script>


<style>
h5{
    color:white;
}
.d-block{
height: 850px;


}.carousel-fade .carousel-item {
 opacity: 0;
 transition-duration: .6s;
 transition-property: opacity;
}

.carousel-fade  .carousel-item.active,
.carousel-fade  .carousel-item-next.carousel-item-left,
.carousel-fade  .carousel-item-prev.carousel-item-right {
  opacity: 1;
}

.carousel-fade .active.carousel-item-left,
.carousel-fade  .active.carousel-item-right {
 opacity: 0;
}

.carousel-fade  .carousel-item-next,
.carousel-fade .carousel-item-prev,
.carousel-fade .carousel-item.active,
.carousel-fade .active.carousel-item-left,
.carousel-fade  .active.carousel-item-prev {
 transform: translateX(0);
 transform: translate3d(0, 0, 0);
}
</style>




<!-- <template>

<div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel"  data-bs-interval="5000">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="d-block w-100 h-700" src="../assets/backgroundImages/pexels-quintin-gellar-313782.jpg" alt="First slide" >
            <div class="carousel-caption d-none d-md-block">
                <h3>Welcome to Asset Management</h3>
                <h5>Feel free to look around and explore our webpage</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100 h-700" src="../assets/backgroundImages/pexels-photo-2451568.webp" alt="Second slide">
            <div class="carousel-caption d-none d-md-block">
                
                
            </div>
        </div>                               
        <div class="carousel-item">
            <img class="d-block w-100 h-700" src="../assets/backgroundImages/pexels-s-migaj-747964.jpg" alt="Third slide">
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
</template>
<<<<<<< Updated upstream

<style>
.h-700 {
    height: 700px;
    width: 100%;
    background-color: black;
=======
<style>
.d-block{
height: 850px;

}.carousel-fade .carousel-item {
 opacity: 0;
 transition-duration: .6s;
 transition-property: opacity;
}

.carousel-fade  .carousel-item.active,
.carousel-fade  .carousel-item-next.carousel-item-left,
.carousel-fade  .carousel-item-prev.carousel-item-right {
  opacity: 1;
>>>>>>> Stashed changes
}

.carousel-fade .active.carousel-item-left,
.carousel-fade  .active.carousel-item-right {
 opacity: 0;
}

.carousel-fade  .carousel-item-next,
.carousel-fade .carousel-item-prev,
.carousel-fade .carousel-item.active,
.carousel-fade .active.carousel-item-left,
.carousel-fade  .active.carousel-item-prev {
 transform: translateX(0);
 transform: translate3d(0, 0, 0);
}
</style>
 -->


