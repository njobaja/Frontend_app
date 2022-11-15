<template>
  <div class="container">
    <div class="bar">
    <Bar v-if="loaded" :chart-data="chartData" :height="370"/>
      
    </div>
  </div>
  <!-- <button onclick="getAllAssets()">All Assets </button> -->
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import { axiosMixin } from "../../mixins/axiosMixin.js";


export default {
  mixins: [axiosMixin],
  name: 'ChartBar',
  components: { Bar },

  data: () => ({
    
    loaded: false,
    
    chartData: {
      
         
        datasets: [
          
          {  label:['Number of sets'], data: {}, backgroundColor:['rgb(0, 143, 251)', 'rgb(0, 227, 150)', 'rgb(254, 176, 25)']},
      
        //  label:['Number of sets',]
        ]
        

      // datasets: [
      //   {
      //     label: 'Vendors',
      //     backgroundColor: ['#f81132', 'blue', 'yellow'],
      //     data: []
      //   },
      //   {
      //     label: 'Assets',
      //     backgroundColor: ['#f81132', 'blue', 'yellow'],
      //     data: []
      //   },
      //   {
      //     label: 'Warranty',
      //     backgroundColor: ['#f81132', 'blue', 'yellow'],
      //     data: []
      //   }

      //   //  {
      //   //   label: 'Assets',
      //   //   backgroundColor: '#blue',
      //   //   data: []
      //   // },
      // ]
    },
       options: {
         plugins: {
           legend: {
             display: false
                   }
                  }
                },
     
  }),
  methods: {

    getAllVendors() {
      this.loaded = false

      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "GET",
        url: "https://internship2022-reports.mss.ba/api/CountAllVendors",
        auth: true
      };

      this.callApi("https://internship2022-reports.mss.ba/api/CountAllVendors", options)
        .then((response) => {
          console.log(response.data);
          this.chartData.datasets[0].data['Vendors'] = (response.data);
        
          this.loaded = true;
        })
        .catch((error) => {

          console.log(`There is error in getting data from https://internship2022-reports.mss.ba/api/CountAllVendors`);
          console.log(error);
        });
    },
    getAllAssets() {
      // GET request using fetch with error handling
      fetch("https://internship2022-reports.mss.ba/api/CountAllAssets")
        .then(async (response) => {
          const data = await response.json();
         
          this.chartData.datasets[0].data['Assets'] = data;

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          this.totalVuePackages = data.total;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    getAllVaranty() {
      this.loaded = false

      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "GET",
        url: "https://internship2022-reports.mss.ba/api/CountAllWarranties",
        auth: true
      };

      this.callApi("https://internship2022-reports.mss.ba/api/CountAllWarranties", options)
        .then((response) => {
          console.log(response.data);
          this.chartData.datasets[0].data['Warranty'] = (response.data);

          this.loaded = true;
        })
        .catch((error) => {

          console.log(`There is error in getting data from https://internship2022-reports.mss.ba/api/CountAllWarranties`);
          console.log(error);
        });
    },
  },

  mounted() {
    this.getAllVendors();
    this.getAllAssets();
    this.getAllVaranty();

  },
}
</script>
