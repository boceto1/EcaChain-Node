const redis = require('redis');

const CHANNELS = {
    TEST: 'TEST',
    TEST2: 'TEST2',
};

class PubSub {

    constructor () {

        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscribeToChannels();

        this.subscriber.on('subscribe',(channel,count)=> {
            console.log(`client1 subscribe to ${channel} with ${count} total subscriptions`);
        })

        this.subscriber.on(
            'message',
            (channel, message) => this.handleMessage(channel,message)
        )
    }

    handleMessage(channel, message){
        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
    }

    subscribeToChannels(){
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel);
        });
    }

    publish({ channel, message}){
        this.subscriber.unsubscribe(channel, ()=>{
            this.publisher.publish(channel, message, ()=>{
                this.subscriber.subscribe(channel);
            });
        });
    }
}    

const testPubSub = new PubSub();

testPubSub.publisher.publish(CHANNELS.TEST, 'foo');

// module.exports = PubSub;
