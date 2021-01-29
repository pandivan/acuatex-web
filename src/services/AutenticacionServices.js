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

    if ("" !== respuesta.data) 
    {
      setClienteLocalStorage(respuesta.data);
    }

    // console.log("Respuesta API-REST Cliente. ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status };
  }
	catch(error)
  {
    return { status: Constantes.STATUS_ERROR, clienteBD: null };
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

    if (respuesta.data.token) 
    {
      //El cliente se registro exitosamente y se guarda token en AsyncStorage
      setClienteLocalStorage(respuesta.data);
    }


    // console.log("Respuesta API-REST Consultar Cliente ");
    // console.log(JSON.stringify(respuesta));

    return { status: respuesta.status };
  }
  catch(error)
  {
    return { status: Constantes.STATUS_ERROR, clienteBD: null };
  }
}


/**
 * 
 */
const logout = () =>
{
  localStorage.clear();
}


/**
 * Método que permite obtener el cliente del local storage
 */
const getClienteActual = () => 
{
  try
  {
    return JSON.parse(localStorage.getItem("@cliente"));
  }
  catch(error)
  {
    return null;
  }
}


/**
 * Método que permite almacenar el cliente en el local storage
 * @param cliente que se va almacenar
 */
const setClienteLocalStorage = (cliente) => 
{
  localStorage.setItem("@cliente", JSON.stringify(cliente));
}




export default 
{
  signup,
  login,
  logout,
  getClienteActual,
  setClienteLocalStorage
};