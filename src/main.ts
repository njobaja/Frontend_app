import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";
import { VueSignalR } from "@dreamonkey/vue-signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { notify } from "@kyvg/vue3-notification";
import FontAwesomeIcon from "./font-awesome";
import { notificationMixin } from "./mixins/notificationMixin";
import { authStore } from "./stores/authStore";

const app = createApp(App);

const connection = new HubConnectionBuilder()
  .withUrl("https://internship2022-ws.mss.ba/chathub")
  .build();

connection
  .start()
  .then((res) => {
    connection.invoke("JoinGroup", "Rule").catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
connection.onclose(function (e) {
  connection.invoke("LeaveGroup", "Rule").catch(function (err) {
    return console.error(err.toString);
  });
});

connection.on("Message", function (message) {
  var msg = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  notify({
    title: msg,
  });
});

app.component("fa-icon", FontAwesomeIcon);
app.mixin(notificationMixin);

app.use(authStore);
app.use(router);
app.use(Notifications);
app.use(VueSignalR, { connection });

app.mount("#app");
