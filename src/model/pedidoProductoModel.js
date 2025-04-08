import { DataTypes } from "sequelize";
import sequelize from "../config/bd.js";
import Pedido from "./pedidoModel.js";

const PedidoProducto = sequelize.define("PedidoProducto", {
  pedidoId: { type: DataTypes.INTEGER, references: { model: Pedido, key: "id" } },
  productoId: { type: DataTypes.INTEGER, allowNull: false }, // Se conecta con servicio de productos
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: false,
  tableName: "pedidos_productos",
});

export default PedidoProducto;
