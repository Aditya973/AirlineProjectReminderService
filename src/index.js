const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const {sendBasicEmail} = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');
const {subscribeMessage,createChannel} = require('./utils/messageQueue');
const {MESSAGE_BROKER_URL, EXCHANGE_NAME,REMINDER_BINDING_KEY} = require('./config/serverConfig')
const jobs = require('./utils/job');
const {subscribeEvents} = require('./services/email-service');
dotenv.config();

const PORT = process.env.PORT || 3003;
const setUpAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
    app.post('/api/v1/tickets',TicketController.create);
    const channel = await createChannel();
    subscribeMessage(channel,subscribeEvents,REMINDER_BINDING_KEY);
    app.listen(PORT,async ()=> {
        console.log('server listening to ',PORT);
        // jobs();

    });
}

setUpAndStartServer();