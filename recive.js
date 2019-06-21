const open = require('amqplib').connect('amqp://localhost');

module.exports = async (id) => {
    const q = '1';

    open.then(function(conn) {
        return conn.createChannel();
    })
    .then(function(ch) {
        return ch.assertQueue(q).then(function(ok) {
            return ch.consume(q, function(msg) {
                if (msg !== null) {
                    console.log('msg',msg.content.toString());
                    ch.ack(msg);
                }
            });
        });
    })
    .catch(console.warn);
}