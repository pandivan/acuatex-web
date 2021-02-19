import axios from "axios";
import Constantes from "../Constantes";
import tokenServices from "../services/TokenServices"; 




/**
 * Función que permite registrar un nuevo pedido
 * @param pedido, Pedido a registrar
 */
const registrarPedido = async (pedido) => 
{
  try
  {
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/pedidos`, pedido, { headers: tokenServices.autenticacionHeader() });

    return { nroPedido: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    return { nroPedido: ""};
  }
}



/**
 * Función que permite actualizar un pedido
 * @param pedido, Pedido actualizar
 */
// const actualizarPedido = async (pedido) => 
// {
//   try
//   {
//     // console.log(JSON.stringify(pedido));
//     let respuesta = await axios.put(`${Constantes.BACKEND_URL}/pedido`, pedido, { headers: tokenServices.autenticacionHeader() });

//     // console.log("Respuesta API-REST Pedido. ");
//     // console.log(JSON.stringify(respuesta));

//     // if(HttpStatus.STATUS_INTERNAL_SERVER_ERROR == respuesta.status)
//     // {
//     //   //TODO: Guardar log BD
//     // }

//     return { success: respuesta.data };
//   }
// 	catch(error)
//   {
//     //TODO: Guardar log en BD
//     // console.log(`Error al registrar: ${error}`);
//     return { success: false};
//   }
// }



// /**
//  * Función que permite actualizar el estado un pedido
//  * @param pedido, Pedido actualizar
//  */
// const actualizarEstadoPedido = async (pedido) => 
// {
//   try
//   {
//     // console.log(JSON.stringify(pedido));
//     let respuesta = await axios.put(`${Constantes.BACKEND_URL}/estado`, pedido, { headers: tokenServices.autenticacionHeader() });

//     // if(HttpStatus.STATUS_INTERNAL_SERVER_ERROR == respuesta.status)
//     // {
//     //   //TODO: Guardar log BD
//     // }

//     return { success: respuesta.data };
//   }
// 	catch(error)
//   {
//     //TODO: Guardar log en BD
//     // console.log(`Error al registrar: ${error}`);
//     return { success: false};
//   }
// }



/**
 * Función que permite obtener todos los pedidos del cliente
 */
const getAllPedidos = async () => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/pedidos`, { headers: tokenServices.autenticacionHeader() });

    return { status: respuesta.status, lstPedidosBD: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);

    return { status: error.request.status };
  }
}




export default 
{
  registrarPedido,
  // actualizarPedido,
  // actualizarEstadoPedido,
  getAllPedidos
};