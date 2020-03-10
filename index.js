const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const PubSub = require('./app/pubsub');


const app = express();
// const pubsub = new PubSub({message: "message"});

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

app.use(bodyParser.json());

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT +  Math.ceil(Math.random()*1000);
}


const PORT = PEER_PORT 