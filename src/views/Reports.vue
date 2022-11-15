<template>
<section class="section">
    <div class="row">
                 <div class="col-lg-6">
                     <div class="card-body">
                         <h3 class="card-title">Number of units</h3>
                         <ChartBar></ChartBar>
                     </div>
                 </div>
                 <div class="col-lg-6">
                     <div class="card-body">
                         <h5 class="card-title">Percentage of units</h5>
                         <ChartPie></ChartPie>
                     </div>
                 </div>
                  <div class="desno">
                     <div class="card-body">
                         <h5 class="card-title">Line scale of units</h5>
                         <ChartGauge></ChartGauge>
                     </div>
                 </div>
    </div>
</section>
</template>

<script>
import ChartPie from '@/components/Charts/ChartPie.vue'
import ChartBar from '../components/Charts/ChartBar.vue'
import ChartGauge from '@/components/Charts/ChartGauge.vue'
export default {
     name: 'Reports',
     components: {
     ChartPie,
     ChartBar,
     ChartGauge
    } 
}
</script>

<style scoped>
h3{
margin-left: 40px;
}
h5{
   margin-left: 40px; 
}
</style>