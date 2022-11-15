<template>
    <div class="card-body"><br><br>
        <div>
            <div id="pieChart"></div>
        </div>
    </div>
</template>

<script>


import ApexCharts from 'apexcharts'


export default {

    mounted() {

            new ApexCharts(document.querySelector("#pieChart"), {
                series: [2, 4, 10],
                chart: {
                    type: 'pie',
                    toolbar: {
                        show: true
                    }
                },
                labels: ['Warranty', 'Assets', 'Vendors']
            }).render();
        }
    }


</script>

<style scoped>

</style>