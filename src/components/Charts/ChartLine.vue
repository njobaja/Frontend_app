<!-- <template>
              <canvas id="lineChart" style="max-height: 400px; display: block; box-sizing: border-box; height: 248px; width: 496.8px;" width="621" height="500"></canvas>
                        
</template>
<script>
import Chart from 'chart.js/auto';
  export default {
      name: 'ChartLine',

       mounted(){
            
                  new Chart(document.querySelector('#lineChart'), {
                    type: 'line',
                    data: {
                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                      datasets: [{
                        label: 'Vendors', 
                        data: [20,45,32,88,41,55],
                        
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.2,
                        
                      }]
                    },
                    options: {
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }
                  });
       
       }
  }
              </script> -->