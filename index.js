'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const helmet 	    = require('helmet');
const cors	        = require('cors');

const PORT              = process.env.PORT || 9000;
const MICROSERVICE_NAME = 'integrator';

const app = express();

const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/healthcheck', (req, res) => {
    res.json({status: 200});
});

app.get('/integration', (req, res) => {
    getPerson()
        .then(person => {
            res.json(person)
        })
})

app.listen(PORT, err => {
    if (err) throw err;
    console.log('%s listening at 0.0.0.0:%s', MICROSERVICE_NAME, PORT);
});


const getPerson = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://demo-service-faker.demo.local/faker')
        .then(person => {
            resolve(person.data);
        })
        .catch(err => reject(err.err))
    });
}