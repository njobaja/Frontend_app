import { notify } from '@kyvg/vue3-notification';

export const notificationMixin = {

    methods: {

        fireNotification: async function( params ) {
            let settings = {};

            "group" in params ? settings.group = params.group : settings.group = "default"; 
            "type" in params ? settings.type = params.type : settings.type = "success"; 
            "title" in params ? settings.title = params.title : settings.title = "";
            "text" in params ? settings.text = params.text : settings.text = "default text"; 
            "duration" in params ? settings.duration = params.duration : settings.duration = 3000; 

            switch (settings.type) {
                case "success":
                    settings.data = { icon: "circle-check" };
                    break;

                case "error":
                    settings.data = { icon: "circle-xmark" };
                    break;

                case "info":
                    settings.data = { icon: "circle-info" };
                    break;

                default:
                    settings.data = { icon: "circle-check" }
                    break;
            }

            notify(settings);
        }
    }
  };