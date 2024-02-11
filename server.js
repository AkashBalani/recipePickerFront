const express = require('express');
const kafka = require('kafka-node');

const app = express();
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
const producer = new Producer(client);

app.use(express.json());

app.post('/django', (req, res) => {
    const payloads = [
        { topic: 'test', messages: JSON.stringify(req.body), partition: 0 }
    ];
    producer.send(payloads, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to send message' });
        } else {
            res.status(200).json(data);
        }
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));