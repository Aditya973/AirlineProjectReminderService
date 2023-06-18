const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {sendBasicEmail} = require('./services/email-service');
const cron = require('node-cron');
dotenv.config();

const PORT = process.env.PORT || 3003;
const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=> {
        console.log('server listening to ',PORT);

        sendBasicEmail(
            'tiwariaditya973@gmail.com',
            'tiwaririshab9261@gmail.com',
            'this is a testing email',
            'Hi how high are you hope you like the support'
        );
        cron.schedule('* * * * *',()=>{
            console.log('running a task every minute')
        })
    });
}

setUpAndStartServer();