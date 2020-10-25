import axios from "axios";

// const BACKEND_URL = "https://api-rest-retail.herokuapp.com/api/cliente/barrio";
const BACKEND_URL = "http://192.168.1.8:7788/api/cliente";




/**
 * Función que permite actualizar o registrar un nuevo cliente
 * @param cliente, Cliente actualizar o registrar
 */
const registrarCliente = async (cliente) => 
{
  try
  {
    // console.log(JSON.stringify(cliente));
    let respuesta = await axios.post(`${BACKEND_URL}`, cliente);

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log
    console.log(`Error al registrar: ${error}`);
    return { success: false };
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
    let respuesta = await axios.post(`${BACKEND_URL}`, cliente);
    
    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log
    console.log(`Error al registrar: ${error}`);
    return { success: false };
  }
}



/**
 * Función que permite cambiar el correo del cliente
 * @param cliente, Cliente con el correo actualizar
 */
const actualizarCorreoCliente = async (cliente) => 
{
  try
  {
    // console.log(JSON.stringify(cliente));
    let respuesta = await axios.post(`${BACKEND_URL}`, cliente);

    respuesta.data.correo = "ivan.hernandez@carvajal.com";

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log
    console.log(`Error al registrar: ${error}`);
    return { success: false };
  }
}




/**
 * Función que permite cambiar el clave del cliente
 * @param cliente, Cliente con el clave actualizar
 */
const actualizarClaveCliente = async (cliente) => 
{
  try
  {
    // console.log(JSON.stringify(cliente));
    let respuesta = await axios.post(`${BACKEND_URL}`, cliente);
    respuesta.data.correo = "1234";

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log
    console.log(`Error al registrar: ${error}`);
    return { success: false };
  }
}



/**
 * Función que permite validar un cliente, según login y clave
 * @param cliente, Cliente a consultar
 */
const validarCliente = async (cliente) => 
{
  try
  {
    let respuesta = await axios.post(`${BACKEND_URL}/validar`, cliente);

    console.log("Respuesta API-REST Consultar Cliente ");
    console.log(JSON.stringify(respuesta));

    return { success: ("" !== respuesta.data), cliente: respuesta.data };
  }
  catch(error)
  {
    //TODO: Guardar log
    console.log(`Error al validar: ${error}`);
    return { success: false };
  }
}


export default 
{
  registrarCliente,
  actualizarCliente,
  actualizarCorreoCliente,
  actualizarClaveCliente,
  validarCliente,
};