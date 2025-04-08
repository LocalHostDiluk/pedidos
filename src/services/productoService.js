import axios from "axios";
const PRODUCTOS_SERVICE_URL = "https://productos-production-7f37.up.railway.app/app/products/producto/;

export const obtenerProducto = async (productoId) => {
  try {
    const response = await axios.get(`${PRODUCTOS_SERVICE_URL}${productoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener producto ${productoId}:`, error);
    return null;
  }
};

export const actualizarStock = async (productoId, cantidad) => {
  try {
    await axios.patch(`${PRODUCTOS_SERVICE_URL}${productoId}/stock`, { cantidad });
  } catch (error) {
    console.error(`Error al actualizar stock del producto ${productoId}:`, error);
  }
};
