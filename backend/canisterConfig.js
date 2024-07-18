const { HttpAgent, Actor } = require('@dfinity/agent');
const { idlFactory } = require('./idlFactory');
require('dotenv').config();

const DFINITY_CANISTER_ID = process.env.DFINITY_CANISTER_ID;

const agent = new HttpAgent({ host: 'https://icp0.io' });

const canisterActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: DFINITY_CANISTER_ID
});

module.exports = canisterActor;