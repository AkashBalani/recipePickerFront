import { ExampleServiceClient } from '../../../../proto/example_grpc_web_pb';

const client = new ExampleServiceClient('http://localhost:50051');

const request = new SendMessageRequest();
request.setMessage('Hello from Angular!');

client.sendMessage(request, {}, (err, response) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('Response:', response.getResponse());
  }
});
