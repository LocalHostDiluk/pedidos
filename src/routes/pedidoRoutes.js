import express from "express";
import { crearPedido, obtenerPedidos, obtenerPedidoPorId, actualizarEstadoPedido, cancelarPedido  } from "../controller/pedidoController.js";

const router = express.Router();

router.post("/crear", crearPedido);
router.get('/all', obtenerPedidos); 
router.get('/pedido/:id', obtenerPedidoPorId); 
router.delete('/cancelar/:id', cancelarPedido); 
router.patch('/:id/estado', actualizarEstadoPedido); 


export default router;
