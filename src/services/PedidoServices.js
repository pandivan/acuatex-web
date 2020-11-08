import axios from "axios";


// const BACKEND_URL = "https://api-rest-retail.herokuapp.com/api/pedido";
const BACKEND_URL = "http://192.168.1.8:7788/api/pedido";


/**
 * Función que permite registrar un nuevo pedido
 * @param pedido, Pedido a registrar
 */
const registrarPedido = async (pedido) => 
{
  try
  {
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.post(`${BACKEND_URL}`, pedido);

    // console.log("Respuesta API-REST Pedido. ");
    // console.log(JSON.stringify(respuesta));

    return { success: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar: ${error}`);
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
    let respuesta = await axios.put(`${BACKEND_URL}`, pedido);

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
    console.log(`Error al registrar: ${error}`);
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
    let respuesta = await axios.put(`${BACKEND_URL}/estado`, pedido);

    // if(HttpStatus.INTERNAL_SERVER_ERROR == respuesta.status)
    // {
    //   //TODO: Guardar log BD
    // }

    return { success: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar: ${error}`);
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
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.get(`${BACKEND_URL}/${cedula}`);

    // console.log("Respuesta API-REST Articulos. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), lstPedidosBD: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar: ${error}`);
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