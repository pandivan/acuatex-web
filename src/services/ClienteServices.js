import axios from "axios";

import Constantes from "../Constantes";
import tokenServices from "../services/TokenServices"; 




/**
 * Función que permite actualizar los datos basicos del cliente
 * @param cliente, Cliente actualizar
 */
const actualizarDatosAccesoCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/clientes/datos_acceso`, cliente, { headers: tokenServices.autenticacionHeader() });

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, isClienteActualizado: respuesta.data };
  }
	catch(error)
  {
    return { status: Constantes.STATUS_ERROR };
  }
}



/**
 * Función que permite actualizar los datos basicos del cliente
 * @param cliente, Cliente actualizar
 */
const actualizarCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/clientes`, cliente, { headers: tokenServices.autenticacionHeader() });
    
    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, isClienteActualizado: respuesta.data };
  }
	catch(error)
  {
    return { status: Constantes.STATUS_ERROR };
  }
}



/**
 * Función que permite validar un cliente, según correo y clave
 * @param token, Cliente a consultar
 */
const getCliente = async (token) => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/info/${token}`, { headers: tokenServices.autenticacionHeader() });

    // console.log("Respuesta API-REST Consultar Cliente ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, clienteBD: respuesta.data };
  }
  catch(error)
  {
    return { status: Constantes.STATUS_ERROR, clienteBD: null };
  }
}


export default 
{
  actualizarDatosAccesoCliente,
  actualizarCliente,
  getCliente
};