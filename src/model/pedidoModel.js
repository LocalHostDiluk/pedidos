import { DataTypes } from "sequelize";
import sequelize from "../config/bd.js";

const Pedido = sequelize.define("Pedido", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clienteId: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "pendiente" },
  fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  timestamps: false,
  tableName: "pedidos",
});

export default Pedido;
