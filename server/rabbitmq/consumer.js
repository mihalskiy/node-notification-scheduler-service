var open = require('amqplib').connect('amqp://localhost');

module.exports = async id => {
    const q = id.toString();
    console.log(q)
    open
    .then((conn) => {
        return conn.createChannel();
    })
    .then((ch) => {
        return ch.assertQueue(q)
            .then((ok) => {
                return ch.consume(q, (msg) => {
                    if (msg !== null) {
                        console.log('message was get', typeof msg.content.toString());
                        const users = JSON.parse(msg.content.toString());
                        for (let user of users) {
                            console.log(`hi ${user.name}, it’s ${new Date().getHours()}:${new Date().getMinutes()}`)
                        }
                        ch.ack(msg);
                    }
                });
        });
    })
    .catch(console.warn);
};