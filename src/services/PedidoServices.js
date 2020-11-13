import axios from "axios";
import Constantes from "../Constantes";



/**
 * Función que permite registrar un nuevo pedido
 * @param pedido, Pedido a registrar
 */
const registrarPedido = async (pedido) => 
{
  try
  {
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/pedido`, pedido);

    // console.log("Respuesta API-REST Pedido. ");
    // console.log(JSON.stringify(respuesta));

    return { nroPedido: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    return { success: false};
  }
}



/**
 * Función que permite actualizar un pedido
 * @param pedido, Pedido actualizar
 */
const actualizarPedido = async (pedido) => 
{
  try
  {
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/pedido`, pedido);

    // console.log("Respuesta API-REST Pedido. ");
    // console.log(JSON.stringify(respuesta));

    // if(HttpStatus.INTERNAL_SERVER_ERROR == respuesta.status)
    // {
    //   //TODO: Guardar log BD
    // }

    return { success: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);
    return { success: false};
  }
}



/**
 * Función que permite actualizar el estado un pedido
 * @param pedido, Pedido actualizar
 */
const actualizarEstadoPedido = async (pedido) => 
{
  try
  {
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/estado`, pedido);

    // if(HttpStatus.INTERNAL_SERVER_ERROR == respuesta.status)
    // {
    //   //TODO: Guardar log BD
    // }

    return { success: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);
    return { success: false};
  }
}



/**
 * Función que permite obtener todos los pedidos
 */
const getAllPedidos = async (cedula) => 
{
  try
  {
    console.log(JSON.stringify(cedula));
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/pedido/${cedula}`);

    // console.log("Respuesta API-REST Articulos. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), lstPedidosBD: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);
    return { success: false};
  }
}




export default 
{
  registrarPedido,
  actualizarPedido,
  actualizarEstadoPedido,
  getAllPedidos
};