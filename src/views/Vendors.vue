
<template>

  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>
  <section>


    <div class="row">
      <div class="col-lg-12">
        <div class="main">
         <div id="kocka"><div class="opposites">
         <div class="opposites bl"></div>
         <div class="opposites tr"></div>
         <div class="opposites br"></div>
         <div class="opposites tl"></div>


   
</div></div>
  <h2>Vendors</h2>
          <div>
           
            <div class="topright">
              <Modal :vendor-object-prop="vendorToEdit" @save-vendor-clicked="addVendor"
                @update-vendor-clicked="updateVendor"></Modal>
            </div>
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th v-for="(header, index) in vendorsHeaders" :key="index" scope="col">{{ header }} </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(vendor, index) in vendorList" :key="index">
                    <th scope="row">{{ vendor.vendorID }}</th>
                    <td>{{ vendor.vendorName }}</td>
                    <td>{{ vendor.phoneNumber }}</td>
                    <td>{{ vendor.email }}</td>
                    <td>{{ vendor.contactPerson }}</td>
                    <td>{{ vendor.city }}</td>
                    <td>{{ vendor.zipCode }}</td>
                    <td>{{ vendor.address }}</td>
                    <td>{{ vendor.additionalComment }}</td>
                    <td>

                      <button class="btn btn-primary btn-sm m-0" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="editForm(vendor.vendorID)">Edit<i class="bi bi-pencil-square"></i></button>
                      <button class="btn btn-danger btn-sm m-0"
                        @click="deleteVendor(vendor.vendorID, vendor.vendorName)">Delete<i
                          class="bi bi-trash"></i></button>


                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>




  </section>


  <a href="#" class="back-to-top d-flex align-items-center justify-content-center active"><i
      class="bi bi-arrow-up-short"></i></a>
</template>

<script>
import Modal from '@/components/Modal.vue';
import { axiosMixin } from "../mixins/axiosMixin";
import { notify } from "@kyvg/vue3-notification";



export default ({
  emits: ['edit-button-clicked'],
  name: 'Vendors',
  mixins: [axiosMixin],
  components: {
    Modal,
  },
  data() {
    return {

      vendorToEdit: null,
      vendorsHeaders: [
        '#',
        'Name',
        'Phone Number',
        'Email',
        'Contact person',
        'City',
        'Zip Code',
        'Address',
        'Additional Comment',
        'Action'
      ],
      vendorList: [],
    }
  },
  methods: {
    deleteVendor: function (VendorId) {
      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "DELETE",
        url: 'https://internship2022-vendors-api.mss.ba/api/Delete'

      };

      if (confirm('are you sure?')) {
        this.callApi(`https://internship2022-vendors-api.mss.ba/api/Delete?VendorId=${VendorId}`, options)
          .then((response) => {
            if (response.status === 200) {
              this.vendorList = [];
              this.getVendors();
              notify({
                title: "Vendor succesfuly deleted",
                type: 'success',
              });

            }
          })
          .catch((error) => {
            console.log(`There is error in deleting data from ${options.url}`);
            console.log(error);
          });
      }
    },
    getVendors() {
      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "GET",
        url: 'https://internship2022-vendors-api.mss.ba/api/Get'
      };
      this.callApi("https://internship2022-vendors-api.mss.ba/api/Get", options)
        .then((response) => {
          console.log(response.data);
          response.data.forEach(el => {
            this.vendorList.push(
              {
                vendorID: el.vendorId,
                vendorName: el.vendorName,
                phoneNumber: el.phoneNumber,
                email: el.email,
                contactPerson: el.contactPerson,
                city: el.city,
                zipCode: el.zipCode,
                address: el.address,
                additionalComment: el.additionalComment,
              }
            );


          });
        })
        .catch((error) => {
          console.log(`There is error in getting data from ${options.url}`);
          console.log(error);
        });
    },
    addVendor(createdObject) {
      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "POST",
        data: createdObject,
        url: "https://internship2022-vendors-api.mss.ba/api/Post"
      };

      this.callApi("https://internship2022-vendors-api.mss.ba/api/Post", options)


        .then((response) => {

          if (response.status === 200) {
            this.vendorList = [];
            this.getVendors();
            notify({
              title: "Vendors successfully created",
              type: 'success',
            });

          }
        })
        .catch((error) => {
          console.log(`There is error in getting data from ${options.url}`);
          console.log(error);
          notify({
            title: `${error}`,
            type: 'error'
          })
        });
    },
    updateVendor(updatedObject) {
      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8"
        },
        method: "PUT",
        data: updatedObject
      };



      this.callApi('https://internship2022-vendors-api.mss.ba/api/Put', options)
        .then((response) => {
          if (response.status === 200) {
            this.vendorList = [];
            this.getVendors();
            notify({
              title: "Vendors successfully edited",
              type: 'success',
            });

          }
        })
        .catch((error) => {
          //console.log(`There is error in getting data from ${options.url}`);

          console.log(`There is error in getting data from 'https://internship2022-vendors-api.mss.ba/api/Put'`);
          console.log(error);
          notify({
            title: `${error}`,
            type: 'error'
          })
        });
    },
    editForm(vendorId) {
      this.vendorList.forEach(el => {
        if (el.vendorID === vendorId) {
          this.vendorToEdit = {
            vendorID: el.vendorID,
            vendorName: el.vendorName,
            phoneNumber: el.phoneNumber,
            email: el.email,
            contactPerson: el.contactPerson,
            city: el.city,
            zipCode: el.zipCode,
            address: el.address,
            additionalComment: el.additionalComment,
          };
        }
      });

    },

  },
  mounted() {
    this.getVendors();


  }

})
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");

h2{
  position: absolute;
  top: 50px;
  left:100px;
  color: black;
  
}
.opposites {
  margin-bottom: 5px;
  position: relative;
  width: 60px;
  height: 60px;
}
.opposites {
  animation: opposites 2.5s ease-out 0s infinite;  
}
.tl, .tr, .br, .bl {
  width: 30px;
  height: 30px;
  position: absolute;
}
.tl, .tr {
  top: 0; 
}
.tr, .br {
  left: 30px; 
}
.tl, .br {
  animation: tlbr 2.5s ease-out 0s infinite;
}
.br, .bl {
  top: 30px; 
}
.tl, .bl {
  left: 0; 
}
.tr, .bl {
  animation: trbl 2.5s ease-out 0s infinite;
}
.tl {
  background: red;
  transform-origin: bottom right;
}
.tr {
  background: green; 
  transform-origin: bottom left;
}
.br {
  background: dodgerblue; 
  transform-origin: top left;
}
.bl {
  background: gold; 
  transform-origin: top right;
}

@keyframes tlbr {
  0% {transform: rotate(0);}
  20% {transform: rotate(90deg);}
  40% {transform: rotate(90deg);}
  60% {transform: rotate(0);}
}
@keyframes trbl {
  20% {transform: rotate(0);}
  40% {transform: rotate(90deg);}
  60% {transform: rotate(90deg);}
  80% {transform: rotate(0);}
}
@keyframes opposites {
  80% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}


body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #262626;
}
* {
  margin: 0; 
  padding: 0;
  box-sizing: border-box;
}
.topright {
  position: absolute;
  top: 37px;
  right: 20px;
  font-size: 18px;
}

thead {
  white-space: nowrap;
}

button {

  width: 100%;
  margin: 5px;
}

tr:hover {
  background-color: hwb(240 90% 0% / 0.297);
}

.table {
  text-align: left;
  border: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;


}

h5 {
  font-family: Arial, Helvetica, sans-serif;
}

table,
tbody,
th,
td,
tr {
  text-align: left;
  border: none;

}


@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px) {
  * {
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;


  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    white-space: wrap;
  }

  .topright {
    position: absolute;
    top: 3px;
    right: 6px;

  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {

    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  td:nth-of-type(1):before {
    content: "Name";
  }

  td:nth-of-type(2):before {
    content: "Phone number";
  }

  td:nth-of-type(3):before {
    content: "Email";
  }

  td:nth-of-type(4):before {
    content: "contactPerson";
  }

  td:nth-of-type(5):before {
    content: "City";
  }

  td:nth-of-type(6):before {
    content: "ZipCode";
  }

  td:nth-of-type(7):before {
    content: "Address";
  }

  td:nth-of-type(8):before {
    content: "comment";
  }
}
</style>
