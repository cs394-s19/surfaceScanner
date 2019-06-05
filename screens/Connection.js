// const SERVER_ADDRESS = "ws://10.105.8.140:5000/"
// const SERVER_ADDRESS = "ws://10.105.169.37:5000/"
const SERVER_ADDRESS = "ws://boiling-harbor-73257.herokuapp.com/";

export default class Connection {
    constructor(device_type, msg_callback, uuid = null) {
        this._wscon = new WebSocket(SERVER_ADDRESS);
        this.msg_callback = msg_callback;
        this._device_type = device_type;

        this.uuid = uuid;

        if (uuid == null && device_type == "control") {
            console.error("UUID cannot be null if device_type is control!");
            return;
        }

        if (this._device_type == "control")
            this._wscon.onopen = this.setup_control;

        if (this._device_type == "scan")
            this._wscon.onopen = this.setup_scan;

        this._wscon.onmessage = this.wrap_onmessage;
    }

    wrap_onmessage = raw_data => {
        const { action, data } = JSON.parse(raw_data.data);

        if (action === "set_uuid" && this._device_type === "scan")
            this.uuid = data.uuid;

        this.msg_callback(action, data);
    };

    setup_scan = () => {
        this._wscon.send(JSON.stringify({
            action: "set_party",
            data: {
                party: "scan"
            }
        }));
    };

    setup_control = () => {
        this._wscon.send(JSON.stringify({
            action: "set_party",
            data: {
                party: "control",
                uuid: this.uuid
            }
        }));
    };

    send = (object) => {
        this._wscon.send(JSON.stringify(object));
    };
}