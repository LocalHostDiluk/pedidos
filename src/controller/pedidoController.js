import Pedido from "../model/pedidoModel.js";
import PedidoProducto from "../model/pedidoProductoModel.js";
import { obtenerProducto, actualizarStock } from "../services/productoService.js";
import { sendStockUpdate } from "../services/rabbitService.js"; 

export const crearPedido = async (req, res) => {
  try {
    const { clienteId, productos } = req.body;
    let total = 0;

    // Validar stock y calcular total
    for (const item of productos) {
      const producto = await obtenerProducto(item.productoId);
      if (!producto || producto.stock < item.cantidad) {
        return res
          .status(400)
          .json({ error: `Producto ${item.productoId} no disponible.` });
      }
      total += producto.precio * item.cantidad;
    }

    // Crear pedido
    const pedido = await Pedido.create({ clienteId, total });

    // Registrar productos y enviar mensaje de stock a restar
    for (const item of productos) {
      await PedidoProducto.create({
        pedidoId: pedido.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
      });

      // 🔁 Enviar mensaje a RabbitMQ
      await sendStockUpdate({
        productoId: item.productoId,
        cantidad: item.cantidad,
      });
    }

    res.status(201).json({
      mensaje: "Pedido creado exitosamente",
      pedidoId: pedido.id,
      total,
    });
  } catch (error) {
    console.error("❌ Error al crear pedido:", error);
    res.status(500).json({ error: "Error al procesar el pedido." });
  }
};

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: "No se pudieron obtener los pedidos." });
  }
};

// Obtener un pedido por ID
export const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error("Error al obtener pedido:", error);
    res.status(500).json({ error: "No se pudo obtener el pedido." });
  }
};

// Actualizar el estado del pedido
export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // "pendiente", "completado" o "cancelado"

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    const estadosValidos = ["pendiente", "completado", "cancelado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido." });
    }

    pedido.estado = estado;
    await pedido.save();

    res.status(200).json({ mensaje: "Estado actualizado.", pedido });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "No se pudo actualizar el estado." });
  }
};

// Cancelar un pedido (cambiar estado a "cancelado")
export const cancelarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    pedido.estado = "cancelado";
    await pedido.save();

    res.status(200).json({ mensaje: "Pedido cancelado.", pedido });
  } catch (error) {
    console.error("Error al cancelar pedido:", error);
    res.status(500).json({ error: "No se pudo cancelar el pedido." });
  }
};
