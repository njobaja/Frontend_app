<template>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
  </head>
  <section>
    <div class="row">
      <div class="col-lg-12">
        <div class="main">
          <div>
            <h5>Asset management</h5>
            <div class="topright">
              <Modal-asset
                :asset-object-prop="assetToEdit"
                @save-assets-clicked="addAsset"
                @update-asset-clicked="updateAsset"
              ></Modal-asset>
            </div>
            <div style="overflow-x:auto;">
              <table class="table datatable dataTable-table"> 
                <thead>
                  <tr>
                    <th
                      v-for="(header, index) in Headers"
                      :key="index"
                      scope="col"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(asset, index,) in assetList" :key="index">
                    <th scope="row">{{ asset.assetID }}</th>
                    <td>{{ asset.assetCategoryId }}</td>
                    <td>{{ asset.assetTypeId }}</td>
                    <td>{{ asset.vendorName }}</td>
                    <td>{{ asset.assetName }}</td>
                    <td>{{ asset.serialNumber }}</td>
                    <td>{{ asset.price }}</td>
                    <td>{{ asset.location }}</td>
                    <td>{{ asset.purchaseDate }}</td>
                    <td>{{ asset.warrantyExpiryDate }}</td>
                    <td>{{ asset.purchaseType }}</td>
                    <td>
                      <button
                        class="btn btn-primary btn-sm m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="editForm(asset.assetID, asset.name)"
                      >
                        Edit<i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        class="btn btn-danger btn-sm m-1"
                        @click="deleteAssets(asset.assetID, asset.name)"
                      >
                        Delete<i class="bi bi-trash"></i>
                      </button>
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
  <a
    href="#"
    class="back-to-top d-flex align-items-center justify-content-center active"
    ><i class="bi bi-arrow-up-short"></i
  ></a>
</template>
<script>
import ModalAsset from "@/components/ModalAsset.vue";
import { axiosMixin } from "../mixins/axiosMixin";
import { notify } from "@kyvg/vue3-notification";
export default {
  emits: ["edit-button-clicked"],
  name: "asset",
  mixins: [axiosMixin],
  components: {
    ModalAsset,
  },
  data() {
    return {
      assetToEdit: null,
      Headers: [
        "ID",
        "Asset category",
        "Asset type",
        "Vendor",
        "Asset name",
        "Serial number",
        "Price",
        "Location",
        "Purchase date",
        "Warranty expiry date",
        "Purchase type",
        "Action",
      ],
      assetList: []
    }
  },
  methods: {
    deleteAssets: function (assetID, assetName) {
      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        method: "DELETE",
      };
      if (confirm("Are you sure?")) {
        this.callApi(
          `https://internship2022-assets-api.mss.ba/api/DeleteAssets?ID=${assetID}&Name=${assetName}`,
          options
        )
          .then((response) => {
            if (response.status === 200) {
              this.assetList = [];
              this.getAsset();
              notify({
                title: "Asset succesfuly deleted",
                type: "success",
              });
            }
          })
          .catch((error) => {
            //console.log(`There is error in deleting data from ${options.url}`);
            console.log(
              `There is error in deleting data from https://internship2022-assets-api.mss.ba/api/DeleteAssets`
            );
            console.log(error);
          });
      }
    },
    getAsset() {
      let options = {
        headers: {
          "Content-type": "application/json; charset=utf-8 ",
          Accept: "application/json; charset=utf-8 ",
        },
        method: "GET",
      };
      this.callApi("https://internship2022-assets-api.mss.ba/api/GetAssets", options)
        .then((response) => {
          console.log(response.data);
          response.data.forEach((el) => {
            this.assetList.push({
            assetID: el.assetID,
            assetCategoryId: el.assetCategoryId,
            assetTypeId: el.assetTypeId,
            vendorName: el.vendorName,
            assetName: el.assetName,
            serialNumber: el.serialNumber,
            price: el.price,
            despreciationType: el.despreciationType,
            location: el.location,
            purchaseDate: el.purchaseDate,
            warrantyExpiryDate: el.warrantyExpiryDate,
            purchaseType: el.purchaseType,
            });
          });
        })
        .catch((error) => {
          //console.log(`There is error in getting data from ${options.url}`);
          console.log(
            `There is error in getting data from https://internship2022-assets-api.mss.ba/api/GetAssets`
          );
          console.log(error);
        });
    },
    addAsset(createdObject) {
      console.log("postanje")
      let options = {
        headers: {
          "Content-type": "application/json; charset=utf-8 ",
          Accept: "application/json; charset=utf-8 ",
        },
        method: "POST",
        data: createdObject,
      };
      this.callApi(
        "https://internship2022-assets-api.mss.ba/api/PostAssets",
        options
      )
        .then((response) => {
          if (response.status === 200) {
            this.assetList = [];
            this.getAsset();
            notify({
              title: "successfully created",
              type: 'success',
            });
          }
        })
        .catch((error) => {
          //console.log(`There is error in getting data from ${options.url}`);
          console.log(
            `There is error in getting data from ""https://internship2022-assets-api.mss.ba/api/PostAssets""`
          );
          console.log(error);
          notify({
            title: `${error}`,
            type: "error",
          });
        });
    },
    updateAsset(updatedObject) {
      let options = {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        },
        method: "PUT",
        data: updatedObject,
      };
      this.callApi("https://internship2022-assets-api.mss.ba/api/PutAssets", options)
        .then((response) => {
          if (response.status === 200) {
            this.assetList = [];
            this.getAsset();
            notify({
              title: "Asset successfully edited",
              type: "success",
            });
          }
        })
        .catch((error) => {
          //console.log(`There is error in getting data from ${options.url}`);
          console.log(
            `There is error in getting data from 'https://internship2022-assets-api.mss.ba/api/PutAssets'`
          );
          console.log(error);
          notify({
            title: `${error}`,
            type: "error",
          });
        });
    },
    editForm(assetID) {
      console.log("edit")
      this.assetList.forEach((el) => {
        if (el.assetID === assetID) {
          this.assetToEdit = {
            assetID: el.assetID,
            assetCategoryId: el.assetCategoryId,
            assetTypeId: el.assetTypeId,
            vendor:el.vendorId,
            assetName: el.assetName,
            serialNumber: el.serialNumber,
            price: el.price,
            location: el.location,
            purchaseDate: el.purchaseDate,
            warrantyExpiryDate: el.warrantyExpiryDate,
            purchaseType: el.purchaseType,
          };
        }
      });
    },
  },
  mounted() {
    this.getAsset();
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
thead {
  white-space: nowrap;
}
button {
  width: 100%;
  margin: 5px;
}
table,
tbody,
th,
td,
tr {
  text-align: left;
  
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    white-space: wrap;
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
    content: "ID";
  }
  td:nth-of-type(2):before {
    content: "Asset category";
  }
  td:nth-of-type(3):before {
    content: "Asset type";
  }
  td:nth-of-type(4):before {
    content: "Vendor";
  }
  td:nth-of-type(5):before {
    content: "Asset name";
  }
  td:nth-of-type(6):before {
    content: "Serial number";
  }
  td:nth-of-type(7):before {
    content: "Price";
  }
  td:nth-of-type(9):before {
    content: "Location";
  }
   td:nth-of-type(10):before {
    content: "Purchase date";
  }
   td:nth-of-type(11):before {
    content: "Warranty expiry date";
  }
   td:nth-of-type(12):before {
    content: "Purchase type";
  }
}
.topright {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
}
</style>
