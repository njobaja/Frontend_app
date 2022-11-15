import axios from 'axios';
import { authStore } from '@/stores/authStore';

export const axiosMixin = {
    data() {
      return {
        
      };
      
    },

    methods: {

        callApi: async function( url, params ) {
            var requestConfig = {
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    "Accept": "application/json;charset=UTF-8",
                    "X-Correlation-Id": localStorage.getItem("user_id")
                },
                method: "GET"
            };

            requestConfig.url = url;
            "method" in params ? requestConfig.method = params.method : null;
            "data" in params ? requestConfig.data = params.data : null;
            "headers" in params ? requestConfig.headers = params.headers : null;
            
            if (params.auth !== false && authStore.state.isLoggedIn) {
                requestConfig.headers.Authorization = "Bearer " + authStore.state.token;
            }

            return await axios(requestConfig);
        }
    }

  };