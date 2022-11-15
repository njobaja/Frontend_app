<template>
  <section>
    <div class="row">
      <div class="col-lg-12">
        <div class="main">
          <div>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th v-for="(header, index) in warrantyHeaders" :key="index" scope="col">{{ header }}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(warranty, index) in warrantyList" :key="index">
                    <th scope="row">{{ warranty.warrantyID }}</th>
                    <td>{{ warranty.assetID }}</td>
                    <td>{{ warranty.priceOfWarranty }}</td>
                    <td>{{ warranty.duration }}</td>
                    <td>{{ warranty.possibilityToExtend }}</td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    
  </section>
</template>

<script>
import { axiosMixin } from "@/mixins/axiosMixin";

export default ({

  name: 'Warranty',

  mixins: [axiosMixin],

  data() {
    return {
      warrantyHeaders: [
        'Warranty',
        'Asset',
        'Price of Warranty',
        'Duration',
        'Possibility to extend',
      ],
      warrantyList: []
    }
  },

  methods: {
    getWarranty() {


      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "GET",

      };

      this.callApi("https://internship2022-warranty.mss.ba/api/GetWarranties", options)
        .then((response) => {
          console.log(response.data);
          response.data.forEach(el => {

            this.warrantyList.push(
              {

                warrantyID: el.warrantyID,
                assetID: el.assetID,
                priceOfWarranty: el.priceOfWarranty,
                duration: el.duration,
                possibilityToExtend: el.possibilityToExtend,

              }
            );


          });
        })
        .catch((error) => {
          //console.log(`There is error in getting data from ${options.url}`);

          console.log(`There is error in getting data from https://internship2022-warranty.mss.ba/api/GetWarranties`);
          console.log(error);
        });
    },
  },

  mounted() {

    this.getWarranty();
  }
})
</script>

<style scoped>
*{
  border: none;
  padding: 0;
  margin: 0;
  font-family:Arial, Helvetica, sans-serif;
}
tr:hover{
background-color: rgba(240, 248, 255, 0.491);
  
}
</style>
