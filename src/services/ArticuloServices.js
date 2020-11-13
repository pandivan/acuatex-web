import axios from "axios";
import Constantes from "../Constantes";




/**
 * Función que permite obtener todas los articulos segun la grupo seleccionada
 */
const getAllArticulos = async () => 
{
  try
  {
    let respuesta = await axios.get(`${Constantes.BACKEND_URL}/articulos`);

    // console.log("Respuesta API-REST Articulos. ");
    // console.log(JSON.stringify(respuesta.data));

    return { success: ("" !== respuesta.data), lstArticulosBD: respuesta.data };
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
  getAllArticulos
};