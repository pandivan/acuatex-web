import axios from "axios";

// const BACKEND_URL = "https://api-rest-retail.herokuapp.com/api/cliente/barrio";
const BACKEND_URL = "http://192.168.1.8:7788/api/cliente/barrio";


let data = 
{
  id: 1010,
  nombre: "Ivan",
  cedula: "13072207",
  email: "ivan.hernandez.coral@gmail.com",
  razonSocial: "777",
  dirección: "Calle 45 # 99 39",
  telefono: "3014317636"
};

let respuesta = {data};


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
    // console.log(JSON.stringify(cliente));
    // let respuesta = await axios.post(`${BACKEND_URL}`, cliente);
    

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
 * Función que permite cambiar el email del cliente
 * @param cliente, Cliente con el email actualizar
 */
const actualizarEmailCliente = async (cliente) => 
{
  try
  {
    // console.log(JSON.stringify(cliente));
    // let respuesta = await axios.post(`${BACKEND_URL}`, cliente);

    respuesta.data.email = "ivan.hernandez@carvajal.com";

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
 * Función que permite cambiar el password del cliente
 * @param cliente, Cliente con el password actualizar
 */
const actualizarPasswordCliente = async (cliente) => 
{
  try
  {
    // console.log(JSON.stringify(cliente));
    // let respuesta = await axios.post(`${BACKEND_URL}`, cliente);
    respuesta.data.email = "1234";

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
 * Función que permite validar un cliente, según login y password
 * @param cliente, Cliente a consultar
 */
const validarCliente = async (cliente) => 
{
  try
  {
    // let respuesta = await axios.post(`${BACKEND_URL}/validar`, cliente);

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
  actualizarEmailCliente,
  actualizarPasswordCliente,
  validarCliente,
};