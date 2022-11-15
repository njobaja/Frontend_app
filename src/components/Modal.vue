<template>
  <div>

    <button type="button" class="btn btn-primary m-0" data-bs-toggle="modal" style="float: right;"
      data-bs-target="#exampleModal">
      Add New <i class="bi bi-person-plus"></i>
    </button>
  </div>



 
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="form-title"></div>
          <h5 class="form-group" id="exampleModalLabel">Fil this form with your informations</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="container">
            <form class="vendor-form" @submit.prevent="saveChanges">
              <div class="form-group">
                <label class="form-label" for="typeText" id="form-outline">Vendor name </label>
                <input type="text" id="typeText" v-model="vendorName" class="form-control" maxlength="20"
                  placeholder="Company name" required /><br>
              </div>
              <div class="form-group">Phone number
                <input type="text" placeholder="(387) XX XXX XXX" class="form-control" maxlength="11"
                  v-model="phoneNumber" required>
              </div> <br>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" maxlength="20"
                  aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                  else.</small>
              </div> <br>
              <div class="form-group">
                <label class="form-label" for="typeText" id="form-outline">Contact pearson</label>
                <input type="text" id="typeText" maxlength="15" v-model="contactPerson" class="form-control" /><br>
              </div>
              <div class="form-row">
                <div class="form-group col-md6">
                  <label for="cityTown" class="form-group">City</label>
                  <input id="cityTown" type="text" class="form-control" maxlength="20"
                    placeholder="The headquarters of the company" v-model="city" required>
                </div><br>
                <div class="form-group">
                  <label for="postalCode" class="form-group">Zipcode</label>
                  <input id="postalCode" type="text" class="form-control" maxlength="5" placeholder="88000"
                    v-model="zipCode">
                </div><br>
                <div class="form-group">
                  <label for="address" class="form-group">Address</label>
                  <input id="address" type="text" v-model="address" class="form-control" placeholder="company adress"
                    required>
                </div>
              </div><br>
              <div class="form-group">
                <label for="message" class="form-group"> Additional Comment</label>
                <textarea id="message" rows="2" v-model="additionalComment" cols="50" class="form-control"
                  placeholder="Feel free to leave us a message..."></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" value="submit" @click="saveChanges()" data-bs-dismiss="modal"
                  class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { objectToString } from '@vue/shared';

export default {
  emits: ['save-vendor-clicked', 'update-vendor-clicked'],

  data() {

    return {
      formVaules: {
        vendorID: '',
        vendorName: '',
        phoneNumber: '',
        email: '',
        contactPerson: '',
        city: '',
        zipCode: '',
        address: '',
        additionalComment: '',
      },

      createdObject: {},

      defaultFormValues: {
        vendorID: '',
        vendorName: '',
        phoneNumber: '',
        email: '',
        contactPerson: '',
        city: '',
        zipCode: '',
        address: '',
        additionalComment: '',
      },
    }


  },
  props: {
    vendorObjectProp: {
      type: Object,
      default: null,
    }

  },

  watch: {
    phoneNumber() {
      this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '')
        .replace(/^(\d{3})(\d{2})(\d{3})(\d{3})/g, '($1) $2-$3-$4');
    },
    zipCode() {
      this.zipCode = this.zipCode.replace(/[^0-9]/g, '')
    },

    city() {
      this.city = this.city.replace(/[^A-Za-z]/g, '')
    },

    vendorObjectProp(newVal) {

      if (newVal !== null) {

        this.vendorID = newVal.vendorID;
        this.vendorName = newVal.vendorName;
        this.phoneNumber = newVal.phoneNumber;
        this.email = newVal.email;
        this.contactPerson = newVal.contactPerson;
        this.city = newVal.city;
        this.zipCode = newVal.zipCode;
        this.address = newVal.address;
        this.additionalComment = newVal.additionalComment;
      }
    }
  },
  methods: {


    clearForm() {
      debugger;
      this.vendorID = this.defaultFormValues.vendorID
      this.vendorName = this.defaultFormValues.vendorName
      this.phoneNumber = this.defaultFormValues.phoneNumber
      this.email = this.defaultFormValues.email
      this.contactPerson = this.defaultFormValues.contactPerson
      this.city = this.defaultFormValues.citys
      this.zipCode = this.defaultFormValues.zipCode
      this.address = this.defaultFormValues.address
      this.additionalComment = this.defaultFormValues.additionalComment
    },


    saveChanges() {
      if (!this.vendorID) {
        if (this.vendorName !== '' && this.phoneNumber !== '' && this.email !== '' && this.contactPerson !== '' && this.city !== '' && this.zipCode !== '' && this.address !== '') {
          this.createdObject = {
            vendorID: Math.random().toString(),
            vendorName: this.vendorName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            contactPerson: this.contactPerson,
            city: this.city,
            zipCode: this.zipCode,
            address: this.address,
            additionalComment: this.additionalComment,
          };

          this.$emit('save-vendor-clicked', this.createdObject);

        }

      }

      else {

        if (this.vendorName !== '' && this.phoneNumber !== '' && this.email !== '' && this.contactPerson !== '' && this.city !== '' && this.zipCode !== '' && this.address !== '') {
          this.createdObject = {
            vendorID: this.vendorID,
            vendorName: this.vendorName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            contactPerson: this.contactPerson,
            city: this.city,
            zipCode: this.zipCode,
            address: this.address,
            additionalComment: this.additionalComment,
          };

          this.$emit('update-vendor-clicked', this.createdObject);
        }
      }

      this.clearForm();

    },

  },
  mounted() {


    //this.$root.$on('edit-button-clicked',(value)=>{

    // if(this.vendorObjectProp!==null){
    //   this.id=this.vendorObjectProp.id;
    //    this.name=this.vendorObjectProp.name;
    //    this.number= this.vendorObjectProp.number;
    //    this.email=this.vendorObjectProp.email;
    //    this.contact=this.vendorObjectProp;
    //    this.city=this.vendorObjectProp.city;
    //    this.zipcode=this.vendorObjectProp.zipCode;
    //    this.address=this.vendorObjectProp.address;
    //    this.comment=this.vendorObjectProp.comment;
    // }
    //});

  },
  // beforeDestroy() {
  //   this.$root.$off('edit-button-clicked');
  // }
}
</script>