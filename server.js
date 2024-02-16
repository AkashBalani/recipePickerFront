const express = require('express');
const kafka = require('kafka-node');
const amqp = require('amqplib/callback_api');

const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());

const AMQP_URL = 'amqp://rabbitmq-service.app:5672';
// const Producer = kafka.Producer;
// const client = new kafka.KafkaClient({kafkaHost: 'kafka-service.app:9093'});
// const producer = new Producer(client);

app.use(express.json());

// app.post('/django/api/ingredients/', (req, res) => {
//     const payloads = [
//         { topic: 'test', messages: JSON.stringify(req.body), partition: 0 }
//     ];
//     producer.send(payloads, (err, data) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Failed to send message' });
//         } else {
//             res.status(200).json(data);
//         }
//     });
// });

app.post('/django/api/ingredients/', (req, res) => {
    amqp.connect(AMQP_URL, (error0, connection) => {
        if (error0) {
            console.error(error0);
            return res.status(500).json({ error: 'Failed to connect to RabbitMQ' });
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                console.error(error1);
                return res.status(500).json({ error: 'Failed to create channel' });
            }
            const queue = 'test';

            channel.assertQueue(queue, {
                durable: false
            });

            const message = JSON.stringify(req.body);

            channel.sendToQueue(queue, Buffer.from(message));

            console.log(" [x] Sent %s", message);
            res.status(200).json({ message: 'Message sent to RabbitMQ' });
        });
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));