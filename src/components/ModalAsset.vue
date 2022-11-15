<template>
  <div>
    <button
      type="button"
      class="btn btn-primary m-0"
      data-bs-toggle="modal"
      style="float: right"
      data-bs-target="#exampleModal"
    >
      Add new asset<i class="bi bi-person-plus"></i>
    </button>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <div class="form-title"></div>
          <h5 class="form-group" id="exampleModalLabel">Add new asset</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form class="assets-form" @submit.prevent="saveChanges">
            <input type="hidden" v-model="assetID">
              <div class="form-group">
                <label class="col-sm-2 col-form-label">Asset category</label>
                <select
                  class="form-select"
                  v-model="assetCategoryId"
                  @change="onChangeCategory"
                >
                  <option
                    v-for="(assetCategory, index) in categoryList"
                    :value="assetCategory.name"
                    :key="index"
                  >
                    {{ assetCategory.name }}
                  </option>
                  Asset category
                </select>
                <br />
              <label class="col-sm-2 col-form-label">Asset type</label>
                <select
                  class="form-select"
                  v-model="assetTypeId"
                  @change="onChangeType"
                >
                  <option
                    v-for="(assetType, index) in typeList"
                    
                    :value="assetType.name"
                    :key="index"
                  >
                    {{ assetType.name}}
                  </option>
                  Asset Type
                </select>
                <br />
              <label class="col-sm-2 col-form-label">Vendor</label>
              <select
                class="form-select"
                aria-label="Default select example"
                
                  v-model="vendor"
                @change="onChangeVendor"
              >
                <option
                  v-for="(vendor, index) in vendorList"
                  :value="vendor.vendorName"
                  :key="index"
                >
                  {{ vendor.vendorName }}
                </option>
                Vendor
              </select>
              <br />
              <div class="form-group">
                Asset name
                <input
                  type="text"
                  v-model="assetName"
                  class="form-control"
                  maxlength="40"
        required               />
              </div>
              <br />
              <div class="form-group">
                Serial number
                <input
                  type="text"
                  class="form-control"
                  maxlength="50"
                  v-model="serialNumber"
                  required
                />
                <br />
              </div>
              <div class="form-group">
                Price <br />
                <input
                  type="number"
                  v-model="price"
                  placeholder=""
                  id="youridhere"
                  class="form-control"
                />
              </div>
              <br />
              <div class="form-group">
                <label class="form-group">Location</label>
                <input type="text" class="form-control" v-model="location" required />
              </div>
              <br />
              <div class="row mb-3">
                <label for="inputDate" class="col-sm-2 col-form-label"
                  >Purchase date
                </label>
                <div class="col-sm-10">
                  <input type="datetime-local" class="form-control" v-model="purchaseDate" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="inputDate" class="col-sm-2 col-form-label"
                  >Warranty expiry date
                </label>
                <div class="col-sm-10">
                  <br /><input
                    type="datetime-local"
                    class="form-control"
                    v-model="warrantyExpiryDate"
                  />
                </div>
              </div>
              <br />
               <label class="col-sm-2 col-form-label">Purchase type</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="purchaseType"
                @change="onChangePurchase"
              >
                <option
                  v-for="(asset, index) in purchaseTypeList"
                  :value="asset"
                  :key="index"
                >
                  {{asset}}
                </option>
                  Purchase type
              </select>
              <br/>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  value="submit"
                  @click="saveChanges()"
                  data-bs-dismiss="modal"
                  class="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { axiosMixin } from "../mixins/axiosMixin";
import {objectToString} from "@vue/shared";
export default {
  emits: ["save-assets-clicked", "update-asset-clicked"],
  data() {
    return {
      vendorList: [],
      vendor: [],
      categoryList: [],
      assetCategory: [],
      typeList: [],
      assetType: [],
      purchaseTypeList: [],
      assetID:"",
      name: "",
      vendorID:"",
      assetCategoryId: "",
      assetTypeId: "",
      assetName: "",
      serialNumber: "",
      price: "",
      location: "",
      purchaseDate: "",
      purchaseType:"",
      warrantyExpiryDate: "",
      createdObject: {},
    };
  },
    props: {
      assetObjectProp: {
        type: Object,
        default: null,
      },
    },
  created() {
    this.loadCategory();
    this.loadVendor();
    this.loadType();
    this.loadPurchaseType();
  },
  watch:{
  assetObjectProp(newVal) {
    console.log("assetmodal")
    if (newVal !== null) {
      this.assetID = newVal.assetID;
      this.assetCategoryId = newVal.assetCategoryId;
      this.assetTypeId = newVal.assetTypeId;
      this.vendor = newVal.vendor;
      this.assetName = newVal.assetName;
      this.serialnumber = newVal.serialnumber;
      this.price = newVal.price;
      this.location = newVal.location;
      this.purchaseDate = newVal.purchaseDate;
      this.warrantyExpiryDate = newVal.warrantyExpiryDate;
      this.purchaseType = newVal.purchaseType;
    }
  },
  },
  methods: {
    saveChanges() 
    {
      console.log("save")
      if (!this.assetID){
      if (
        this.assetCategoryId !== "" &&
        this.assetTypeId !== "" &&
        this.vendor !== "" &&
        this.assetName !== "" &&
        this.serialNumber !== "" &&
        this.price !== "" &&
        this.location !== "" &&
        this.purchaseDate !== "" &&
        this.warrantyExpiryDate !== "" &&
        this.purchaseType !== ""
        
      ) {
        this.createdObject = {
          assetID:"1fa85f64-5717-4562-b3fc-2c963f66afa6",
          depreciationType:"string",
          assetCategoryId: this.assetCategoryId,
          assetTypeId: this.assetTypeId,
          vendor:this.vendor,
          assetName: this.assetName,
          serialNumber: this.serialNumber,
          price: this.price,
          location: this.location,
          purchaseDate: this.purchaseDate,
          warrantyExpiryDate:this.warrantyExpiryDate,
          purchaseType: this.purchaseType,
        };
        this.$emit("save-assets-clicked", this.createdObject);
      }
    } else {if (
this.assetID !== "" &&
        this.assetCategoryId !== "" &&
        this.assetTypeId !== "" &&
        this.vendor !== "" &&
        this.assetName !== "" &&
        this.serialnumber !== "" &&
        this.price !== "" &&
        this.location !== "" &&
        this.purchaseDate !== "" &&
        this.warrantyExpiryDate !== "" &&
        this.purchaseType !== ""
        ) {
        this.createdObject = {
          assetID:this.assetID,
          assetCategoryId: this.assetCategoryId,
          assetTypeId: this.assetTypeId,
          vendor:this.vendor,
          assetName: this.assetName,
          serialNumber: this.serialNumber,
          price: this.price,
          depreciationType:"string",
          location: this.location,
          purchaseDate: this.purchaseDate,
          warrantyExpiryDate:this.warrantyExpiryDate,
          purchaseType: this.purchaseType,
          };
          this.$emit("update-asset-clicked", this.createdObject);
        }
      }
    },
    updateChanges() {},
    loadVendor() {
      axios
        .get("https://internship2022-vendors-api.mss.ba/api/Get", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.vendorList = res.data;
        });
    },
    loadCategory() {
      axios
        .get("https://internship2022-assets-api.mss.ba/api/GetCategories", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.categoryList = res.data;
        });
    },
     loadType() {
      axios
        .get("https://internship2022-assets-api.mss.ba/api/GetTypes", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.typeList = res.data;
        });
    },
    loadPurchaseType() {
      axios
        .get("https://internship2022-assets-api.mss.ba/api/GetPurchaseType", {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.purchaseTypeList = res.data;
        });
    },
    },
    onChangeVendor() {
      axios
        .get(
          `https://internship2022-vendors-api.mss.ba/api/GetById?Id=${this.VendorID}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.vendorList = res.data;
        });
    },
    onChangeCategory() {
      axios
        .get(
          `https://internship2022-assets-api.mss.ba/api/GetCategoryById?id=${this.assetCategoryId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.categoryList = res.data;
        });
    },
    onChangeType() {
      axios
        .get(
          `https://internship2022-assets-api.mss.ba/api/GetById?id=${this.assetTypeId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.typeList = res.data;
        });
    },
 onChangePurchaseType() {
      axios
        .get(
          `https://internship2022-assets-api.mss.ba/api/GetPurchaseType?id=${this.GetPurchaseType}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.purchaseTypeList = res.data;
        });
    },
  beforeDestroy() {
    this.$root.$off("edit-button-clicked");
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
.modal-footer{
  border:none;
}
</style>