
import MqttService from './mqtt.service';

export default class MqttProvider {
    private static _instance:MqttProvider = new MqttProvider();
 
    private clients: { [uri: string]: MqttService } = {};
 
    constructor() {
        if(MqttProvider._instance){
            throw new Error("Error: Instantiation failed: Use MqttProvider.getInstance() instead of new.");
        }
        MqttProvider._instance = this;
    }
 
    public static getInstance():MqttProvider
    {
        return MqttProvider._instance;
    }

    public static get(uri: string): MqttService{
        if (!MqttProvider._instance.clients[uri]) {
            MqttProvider._instance.clients[uri] = new MqttService;
            // MqttProvider._instance.clients[uri].init(uri);
        }
        return MqttProvider._instance.clients[uri];
    }
}

require('globals'); // necessary to bootstrap tns modules on the new thread

onmessage = function(msg) {
    console.log('onmessage', msg);
    MqttProvider.get('ws://127.0.0.1:3030');
    postMessage('he', 'lo');
}