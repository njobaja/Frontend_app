import axios from 'axios';

export const deviceMixin = {
    data() {
      return {

      };
    },
    methods: {

      getDevices: function() {
        return [
          { id: 2, name: 'samsung s10', lat: 43.306966, lng: 17.821657 },
        ];
      }
    }
  };