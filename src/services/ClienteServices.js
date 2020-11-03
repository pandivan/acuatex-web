import axios from "axios";

import Constantes from "../Constantes";




/**
 * Función que permite actualizar o registrar un nuevo cliente
 * @param cliente, Cliente actualizar o registrar
 */
const registrarCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/cliente`, cliente);

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, clienteBD: respuesta.data };
  }
	catch(error)
  {
    return { status: Constantes.STATUS_ERROR, cliente: null };
  }
}



/**
 * Función que permite validar un cliente, según correo y clave
 * @param cliente, Cliente a consultar
 */
const validarCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/cliente/info`, cliente);

    // console.log("Respuesta API-REST Consultar Cliente ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, clienteBD: respuesta.data };
  }
  catch(error)
  {
    return { status: Constantes.STATUS_ERROR, cliente: null };
  }
}



/**
 * Función que permite actualizar los datos basicos del cliente
 * @param cliente, Cliente actualizar
 */
const actualizarDatosAccesoCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/cliente/datos_acceso`, cliente);
    
    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, clienteBD: respuesta.data };
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
    let respuesta = await axios.put(`${Constantes.BACKEND_URL}/cliente`, cliente);
    
    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status, isClienteActualizado: respuesta.data };
  }
	catch(error)
  {
    return { status: Constantes.STATUS_ERROR };
  }
}





export default 
{
  registrarCliente,
  actualizarDatosAccesoCliente,
  actualizarCliente,
  validarCliente,
};