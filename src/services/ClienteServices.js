import axios from "axios";

import Constantes from "../Constantes";
import tokenServices from "../services/TokenServices"; 




/**
 * Función que permite actualizar los datos de acceso del cliente
 * @param cliente actualizar
 */
const actualizarDatosAccesoCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/clientes/datos_acceso`, cliente, { headers: tokenServices.autenticacionHeader() });

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, clienteBD: respuesta.data };
  }
	catch(error)
  {
    return { status: error.request.status };
  }
}



/**
 * Función que permite actualizar los datos basicos del cliente
 * @param cliente actualizar
 */
const actualizarCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/clientes`, cliente, { headers: tokenServices.autenticacionHeader() });
   
    return { status: respuesta.status };
  }
	catch(error)
  {
    return { status: error.request.status };
  }
}



/**
 * Función que permite obtener los datos del cliente
 */
const getCliente = async () => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/clientes`, { headers: tokenServices.autenticacionHeader() });

    // console.log("Respuesta API-REST Consultar Cliente ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, clienteBD: respuesta.data };
  }
  catch(error)
  {
    return { status: error.request.status };
  }
}



/**
 * Función que permite obtener el correo del cliente
 */
const getCorreoCliente = async () => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/clientes/mail`, { headers: tokenServices.autenticacionHeader() });

    return { status: respuesta.status, correoBD: respuesta.data };
  }
  catch(error)
  {
    return { status: error.request.status };
  }
}


export default 
{
  actualizarDatosAccesoCliente,
  actualizarCliente,
  getCliente,
  getCorreoCliente
};