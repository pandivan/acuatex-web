import axios from "axios";

import tokenServices from "../services/TokenServices"; 
import Constantes from "../Constantes";




/**
 * Función que permite actualizar o registrar un nuevo cliente
 * @param cliente, Cliente actualizar o registrar
 */
const signup = async (cliente) => 
{
  try
  {
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/signup`, cliente);

    if (respuesta.data) 
    {
      setTokenLocalStorage(respuesta.data);
    }

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status };
  }
	catch(error)
  {
    return { status: error.request.status };
  }
}



/**
 * Función que permite validar un cliente, según correo y clave
 * @param cliente, Cliente a consultar
 */
const login = async (cliente) => 
{
  try
  {
    let respuesta = await axios.post(`${Constantes.BACKEND_URL}/login`, cliente);

    if (respuesta.data) 
    {
      //El cliente se registro exitosamente y se guarda token en AsyncStorage
      setTokenLocalStorage(respuesta.data);
    }

    // console.log("Respuesta API-REST Consultar Cliente ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status };
  }
  catch(error)
  {
    return { status: error.request.status };
  }
}


/**
 * Método que permite desloguear el usuario de la web limpiando su local storage
 */
const logout = () =>
{
  localStorage.clear();
}



/**
 * Método que permite remover el token del local storage
 */
const removerToken = () => 
{
  localStorage.removeItem("@token");
}




/**
 * Método que permite obtener el token del local storage
 */
const getToken = () => 
{
  try
  {
    return JSON.parse(localStorage.getItem("@token"));
  }
  catch(error)
  {
    return null;
  }
}


/**
 * Método que permite almacenar el token en el local storage
 * @param token que se va almacenar
 */
const setTokenLocalStorage = (token) => 
{
  localStorage.setItem("@token", JSON.stringify(token));
}



/**
 * Función que permite validar si el token está activo
 */
const validarToken = async () => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/info`, { headers: tokenServices.autenticacionHeader() });

    return { status: respuesta.status };
  }
  catch(error)
  {
    return { status: error.request.status };
  }
}



/**
 * Función que permite restaurar la clave del cliente
 * @param correo al que se enviará las instrucciones para restaurar la clave del cliente
 */
 const restaurarClave = async (correo) => 
 {
   try
   {
     let respuesta = await axios.post(`${Constantes.BACKEND_URL}/restaurar`, correo);
 
     return { status: respuesta.status };
   }
   catch(error)
   {
     return { status: error.request.status };
   }
 }



export default 
{
  signup,
  login,
  logout,
  getToken,
  setTokenLocalStorage,
  validarToken,
  removerToken,
  restaurarClave
};