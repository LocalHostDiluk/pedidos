import express from "express";
import { crearPedido, obtenerPedidos, obtenerPedidoPorId, actualizarEstadoPedido, cancelarPedido  } from "../controller/pedidoController.js";

const router = express.Router();

router.post("/crear", crearPedido);
router.get('/', obtenerPedidos); 
router.get('/:id', obtenerPedidoPorId); 
router.patch('/:id/estado', actualizarEstadoPedido); 
router.delete('/:id', cancelarPedido); 


export default router;
