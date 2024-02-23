require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const log = (message) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
};

(async () => {
    try {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        const sqs = new AWS.SQS();
        const queueUrl = process.env.QueueUrl;

        AWS.config.logger = { log };

        console.log('AWS Credentials:', {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            queueUrl: process.env.QueueUrl
        });
        

        // Test SQS connectivity
        sqs.listQueues((err, data) => {
            if (err) {
                console.error('Error listing SQS queues:', err);
                log(`Error listing SQS queues: ${err.message}`);
            } else {
                log('SQS connectivity test successful');
                console.log('SQS queues:', data.QueueUrls);
            }
        });

        app.post('/django/api/ingredients/', async (req, res) => {
            const message = JSON.stringify(req.body);
            const params = {
                MessageBody: message,
                QueueUrl: queueUrl,
                MessageGroupId: 'messageGroup1',
                MessageDeduplicationId: 'messageDeduplicationId1',
            };

            try {
                await sqs.sendMessage(params).promise();
                log('Message sent to SQS');
                res.status(200).json({ message: 'Message sent to SQS' });
            } catch (error) {
                console.error('Error sending message to SQS:', error);
                log(`Failed to send message: ${error.message}`);
                res.status(500).json({ error: 'Failed to send message' });
            }
        });

        app.listen(3000, () => log('Server is running on port 3000'));
    } catch (error) {
        console.error('Error during initialization:', error);
        log(`Error during initialization: ${error.message}`);
        process.exit(1);
    }
})();
