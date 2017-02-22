// import * as Mqtt from 'mqtt';

export default class {
    mqtt: any;
    protected _subscribeCallback: { [topic: string]: (message: string) => any } = {};

    init(uri: string) {
        // if (this.mqtt) this.mqtt.end();

        // this.mqtt = Mqtt.connect(uri);

        // this.mqtt.on('error', error => console.error);
        // this.mqtt.on('connect', connack => console.log('connected to mqtt: ', connack) );

        // this.mqtt.on('message', this._consume.bind(this));
    }

    protected _consume(topic: string, message: any) {
        // if (topic in this._subscribeCallback) {
        //    this._subscribeCallback[topic](message.toString());
        // }
    }

    subscribe(topic: string, callback: (message: string) => any) {
        // if (this.mqtt) {
        //     this.mqtt.subscribe(topic);
        //     this._subscribeCallback[topic] = callback;            
        // }        
    }

    publish(topic: string, message: string) {
        // if (this.mqtt) {
        //     this.mqtt.publish(topic, message, {qos: 0, retain: true});
        // }
    }

    isConnected() {
        // return this.mqtt ? this.mqtt.connected : false;
    }    
}