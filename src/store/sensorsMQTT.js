import { defineStore } from 'pinia';
import { ref,computed } from "vue";
import mqtt from 'mqtt'



export const useSensorDHTStore = defineStore("sensorDHT", () => {

    const status = ref("Disconnected");
    const temperature = ref(0);
    const humidity = ref(0);
    const door = ref(null);
    const relay_status = ref(null);
    const client = ref(null);

    const url = "ws://5.78.130.1:9001/mqtt";

    const options = {
        // Clean session
        clean: true, // Limpiara clientes desconectados y no retendra informacion
        connectTimeout: 4000,
        // Authentication
        clientId: "esp32-shop-computers",
        username: "userShop",
        password: "qwerty123",
    };

    const connectToBroker = () => {

        // Si ya estamos conectados, no nos volvemos a conectar
        if (client.value) { // recordemos que el .value es porque accedemos al valor de variables ref
            return
        }

        client.value = mqtt.connect(url, options);

        client.value.on("connect", () => {
            status.value = "Connected";

            subscribeTopic(); // Nos suscribimos
        });

        client.value.on("message", (topic, message) => {
            if (topic === "ace_disposal/shop_computer/sensor/temperature") {
                temperature.value = message.toString();
            }
        });

        client.value.on("message", (topic, message) => {
            if (topic === "ace_disposal/shop_computer/sensor/humidity") {
                humidity.value = message.toString();
            }
        });

        client.value.on("message", (topic, message) => {
            if (topic === "ace_disposal/shop_computer/sensor/door") {
                door.value = message.toString();
            }
        });

        client.value.on("message", (topic, message) => {
            if (topic === "ace_disposal/shop_computer/sensor/relay_status") {
                relay_status.value = message.toString();
            }
        });

        client.value.on("reconnect", () => {
            status.value = "Reconnecting...";
        });

        client.value.on("offline", () => {
            status.value = "Offline";
        });

        client.value.on("close", () => {
            status.value = "Disconnected";
        });

        client.value.on("disconnect", function (packet) {
            console.log(packet);
        });

        client.value.on("error", (error) => {
            status.value = error;
        });
    };

    const subscribeTopic = () => {

        client.value.subscribe("ace_disposal/shop_computer/sensor/temperature", { qos: 0 }, (error, granted) => {
            if (error) {
                console.log(error);
            } else {
                //  console.log(`${granted[0].topic} was subscribed`)
            }
        });

        client.value.subscribe("ace_disposal/shop_computer/sensor/humidity", { qos: 0 }, (error, granted) => {
            if (error) {
                console.log(error);
            } else {
                //  console.log(`${granted[0].topic} was subscribed`)
            }
        });

        client.value.subscribe("ace_disposal/shop_computer/sensor/door", { qos: 0 }, (error, granted) => {
            if (error) {
                console.log(error);
            } else {
                //  console.log(`${granted[0].topic} was subscribed`)
            }
        });


        client.value.subscribe("ace_disposal/shop_computer/sensor/relay_status", { qos: 0 }, (error, granted) => {
            if (error) {
                console.log(error);
            } else {
                //  console.log(`${granted[0].topic} was subscribed`)
            }
        });

    };

    const disconnectMQTT= ()=> {
        if (client.value) {
            client.value.end()  // Cerrar la conexión MQTT
            client.value = null
        }
    }

    const turnOnRelay = () => {
        client.value.publish("ace_disposal/shop_computer/sensor/relay", "on",
            { qos: 1, retain: false },
            (error) => {
                if (error) {
                    console.log("No se pudo publicar " + error);
                } else {
                    console.log("Published");
                }
            }
        );
    };
    //
    const turnOffRelay = () => {
        client.value.publish("ace_disposal/shop_computer/sensor/relay", "off",
            { qos: 1, retain: false },
            (error) => {
                if (error) {
                    console.log("No se pudo publicar " + error);
                } else {
                    console.log("Published");
                }
            }
        );
    };
    //



    return {
        status,
        temperature,
        humidity,
        door,
        relay_status,
        client,
        connectToBroker,
        disconnectMQTT,
        turnOnRelay,
        turnOffRelay

    };


});
