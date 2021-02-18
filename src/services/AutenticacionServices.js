import axios from "axios";

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




export default 
{
  signup,
  login,
  logout,
  getToken,
  setTokenLocalStorage
};