// consumer.js
const amqp = require('amqplib');

async function receiveMessage() {
  try {
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      frameMax: 8192  // ✅ 최소 8192 이상
    });

    const channel = await conn.createChannel();

    const queue = 'hello';

    await channel.assertQueue(queue, { durable: false });
    console.log('[*] Waiting for messages. To exit press CTRL+C');

    channel.consume(queue, msg => {
      console.log(`[x] Received: ${msg.content.toString()}`);
    }, { noAck: true });

  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

receiveMessage();
