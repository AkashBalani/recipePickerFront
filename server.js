const bodyParser = require('body-parser');
const express = require('express');
// const kafka = require('kafka-node');
const { Kafka, logLevel } = require('kafkajs');
// const amqp = require('amqplib/callback_api');
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9093'],
    logLevel: logLevel.INFO,
});

const cors = require('cors');



const app = express();
app.use(cors());
app.use(bodyParser.json());
const producer = kafka.producer();
// const AMQP_URL = 'amqp://rabbitmq-service.app:5672';
// const Producer = kafka.Producer;
// const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9093'});
// const producer = new Producer(client);

// app.use(express.json());

app.post('/django/api/ingredients/', async (req, res) => {
    // const payloads = [
    //     { topic: 'test', messages: JSON.stringify(req.body), partition: 0 }
    // ];
    const message = JSON.stringify(req.body);

    try {
        await producer.connect();
        await producer.send({
            topic: 'test',
            messages: [
                { value: message },
            ],
        });
        await producer.disconnect();
        res.status(200).json({ message: 'Message sent to Kafka' });
    }
    catch (error) { 
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
    // producer.send(payloads, (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).json({ error: 'Failed to send message' });
    //     } else {
    //         res.status(200).json(data);
    //     }
    // });
});

// app.post('/django/api/ingredients/', (req, res) => {
//     amqp.connect(AMQP_URL, (error0, connection) => {
//         if (error0) {
//             console.error(error0);
//             return res.status(500).json({ error: 'Failed to connect to RabbitMQ' });
//         }
//         connection.createChannel((error1, channel) => {
//             if (error1) {
//                 console.error(error1);
//                 return res.status(500).json({ error: 'Failed to create channel' });
//             }
//             const queue = 'test';

//             channel.assertQueue(queue, {
//                 durable: false
//             });

//             const message = JSON.stringify(req.body);

//             channel.sendToQueue(queue, Buffer.from(message));

//             console.log(" [x] Sent %s", message);
//             res.status(200).json({ message: 'Message sent to RabbitMQ' });
//         });
//     });
// });

app.listen(3000, () => console.log('Listening on port 3000'));