import axios from "axios";
import Constantes from "../Constantes";




/**
 * Función que permite obtener todas los articulos segun la grupo seleccionada
 */
const getAllCiudades = async () => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/ciudades`);

    // console.log("Respuesta API-REST Articulos. ");
    // console.log(JSON.stringify(respuesta.data));

    return { success: ("" !== respuesta.data), lstCiudadesBD: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);
    return { success: false};
  }
}


export default 
{
  getAllCiudades
};