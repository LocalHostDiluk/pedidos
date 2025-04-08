import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const STOCK_QUEUE = "restar_stock";

let channel = null;

const connectRabbitMQ = async () => {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    channel = await conn.createChannel();
    await channel.assertQueue(STOCK_QUEUE, { durable: true });
    console.log("✅ [Pedidos] Conectado a RabbitMQ");
  } catch (err) {
    console.error("❌ [Pedidos] Error al conectar a RabbitMQ:", err);
  }
};

export const sendStockUpdate = async ({ productoId, cantidad }) => {
  if (!channel) {
    await connectRabbitMQ(); // Se asegura de que el canal esté listo
  }

  const payload = { productoId, cantidad };
  channel.sendToQueue(STOCK_QUEUE, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });

  console.log("📤 [Pedidos] Mensaje enviado a 'restar_stock':", payload);
};

// Conexión inicial al cargar el módulo
connectRabbitMQ();
