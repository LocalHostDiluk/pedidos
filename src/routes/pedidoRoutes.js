import express from "express";
import { crearPedido, obtenerPedidos, obtenerPedidoPorId, actualizarEstadoPedido, cancelarPedido, obtenerPedidosPorCliente  } from "../controller/pedidoController.js";

const router = express.Router();

router.post("/crear", crearPedido);
router.get('/all', obtenerPedidos); 
router.get('/pedido/:id', obtenerPedidoPorId); 
router.delete('/cancelar/:id', cancelarPedido); 
router.patch('/actualizar/:id', actualizarEstadoPedido);
router.get('/pedido/cliente/:clienteId', obtenerPedidosPorCliente); // Define la nueva ruta

export default router;
