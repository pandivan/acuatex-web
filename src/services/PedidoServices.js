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
    // console.log(JSON.stringify(pedido));
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/pedidos`, pedido, { headers: tokenServices.autenticacionHeader() });

    // console.log("Respuesta API-REST Pedido. ");
    // console.log(JSON.stringify(respuesta));

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
 * Función que permite obtener todos los pedidos
 */
const getAllPedidos = async (token) => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/pedidos/${token}`, { headers: tokenServices.autenticacionHeader() });

    // console.log("Respuesta API-REST Articulos. ");
    // console.log(JSON.stringify(respuesta));

    return { isTokenValido: true, lstPedidosBD: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);

    if(error.response && Constantes.STATUS_ACCESO_DENEGADO === error.response.status)
    {
      return { isTokenValido: false }
    }

    return { isTokenValido: true, lstPedidosBD: null };
  }
}




export default 
{
  registrarPedido,
  // actualizarPedido,
  // actualizarEstadoPedido,
  getAllPedidos
};