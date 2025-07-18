const amqp = require('amqplib');

async function connect() {
  try {
    const conn = await amqp.connect({
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      frameMax: 8192  // ✅ 최소 8192 이상으로 설정!
    });

    const channel = await conn.createChannel();
    console.log('✅ Connected to RabbitMQ');

    // 테스트용 queue
    const queue = 'hello';
    const msg = 'Hello from Node.js with frameMax';

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`[x] Sent: ${msg}`);
    await channel.close();
    await conn.close();
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

connect();
