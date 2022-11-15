<template>
   
          <div class="card">
            <div class="card-body">
            

              <!-- Line Chart -->
              <div id="lineChart"></div>

              

            </div>
          </div>
        
</template>
<script>
import ApexCharts from 'apexcharts'

export default {

   


    mounted(){

              
                  new ApexCharts(document.querySelector("#lineChart"), {
                    series: [{
                      name: "Vendors",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                     
                    },
                    {
                      name: "Assets",
                      data: [30, 71, 75, 81, 79, 92, 99, 135, 188],
                    },
                    {
                      name: "Warranty",
                      data: [5, 21, 55, 31, 56, 72, 109, 75, 148],
                    }
                    ],
                    chart: {
                      height: 350,      
                      type: 'line',
                      zoom: {
                        enabled: false
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    stroke: {
                      curve: 'straight'
                    },
                    grid: {
                      row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                      }
                    },
                    xaxis: {
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    }
                  }).render();
                }
    }
          

</script>>
<style scoped>
#lineChart{
    box-sizing: border-box;
    width: 100%;
}
</style>


      