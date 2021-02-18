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

    return { status: respuesta.status, lstArticulosBD: respuesta.data };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);
    return { status: error.request.status };
  }
}


export default 
{
  getAllArticulos
};