const express = require('express');
const amqp = require('amqplib/callback_api');
const app = express();


const http_port = 3001;

amqp.connect('amqp://localhost', (err, connection) => {
    connection.createChannel((err, channel) => {
        let queue = 'First';

        channel.assertQueue(queue, { durable: false });
        console.log(`Waiting for massage in ${queue}`)
        channel.consume(queue, (message) => {
            console.log(`Received ${message.content}`);
        }, {noAck: true})
    })
    setTimeout(() => {
        connection.close();
        process.exit()
    }, 500)
})


app.listen(http_port , () => console.log(`Listen port ${http_port}`))