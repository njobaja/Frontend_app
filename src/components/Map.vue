<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { deviceMixin } from "../mixins/deviceMixin";
import { axiosMixin } from "../mixins/axiosMixin";

export default {
  mixins: [deviceMixin, axiosMixin],

  components: {
    LMap,
    LPopup,
    LTileLayer,
    LMarker,

  },

  created: function() {
        this.devices = this.getDevices();
    },

    data() {
        return {
            devices: []
        };
    },

    methods: {
        onBtnClick: function() {
            this.fireNotification({ title: "Test Notification" });
             

            this.callApi('https://internship2022-iotgw.mss.ba/api/IoT?id=rule', {}).then((response) => {
                this.devices.push({ id: response.data.rowKey, name: response.data.deviceName, lat: response.data.lat, lng: response.data.lon });
                console.log(response.data);
             }); 
        },
     
    }
};

</script>

<template>

  <div style= "height: 500px; width: 100%">
        <l-map :zoom="3" :center="[33.306750, 17.821452]">
       
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
            <template v-for='device in devices' :key="device.id">
                <l-marker :lat-lng="[device.lat, device.lng]" draggable>
                    <l-popup class="tip">ID: {{device.id}} <br/>Name: {{ device.name }} Meta Software solutions <br> Mostar 88000 <br>Contact info: rule@rule.rule</l-popup>
                </l-marker>
            </template>
        </l-map>
      <button  @click="onBtnClick()" id="btn" type="button" class="btn btn-primary">Add devices </button>
  
   </div>  
</template>

<style>

#btn{
  position: absolute;
  left: 15px;
  padding: 4px;

}

.tips {
    display: inline-block;
    background-color: white;
    position: absolute;
    bottom: 100%;
    left: calc(50%);
    transform: translateX(-50%);
    padding: 3px;
}
</style>