const open = require('amqplib').connect('amqp://localhost');

module.exports = async (id, content) => {
    const queue = id.toString();
    const data = JSON.stringify(content);
    open
    .then((conn) => {
        return conn.createChannel();
    })
    .then((ch) => {
        return ch.assertQueue(queue).then(function(ok) {
            console.log('massage was sent' + id);
            return ch.sendToQueue(queue, Buffer.from(data));
        });
    })
    .catch(console.warn);
};
