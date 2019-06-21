var open = require('amqplib').connect('amqp://localhost');

module.exports = (id, content) => {
    const queue = ''+id;
    open
    .then(function(conn) {
        return conn.createChannel();
    })
    .then(function(ch) {
        return ch.assertQueue(queue).then(function(ok) {
            console.log('massage was sent' + id)
            return ch.sendToQueue(queue, Buffer.from(content));
        });
    })
    .catch(console.warn);
};