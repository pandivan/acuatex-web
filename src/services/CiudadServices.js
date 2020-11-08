import axios from "axios";
// import respuesta from "../data.json";

// const BACKEND_URL = "https://api-rest-retail.herokuapp.com/api/articulos";
const BACKEND_URL = "http://192.168.1.8:7788/api/ciudades";




/**
 * Función que permite obtener todas los articulos segun la grupo seleccionada
 */
const getAllCiudades = async () => 
{
  try
  {
    let respuesta = await axios.get(`${BACKEND_URL}`);

    // console.log("Respuesta API-REST Articulos. ");
    // console.log(JSON.stringify(respuesta.data));

    return { success: ("" !== respuesta.data), lstCiudades: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar: ${error}`);
    return { success: false};
  }
}


export default 
{
  getAllCiudades
};