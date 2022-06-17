import axios from "axios";
import Constantes from "../Constantes";




/**
 * Función que permite la autenticación en Qlik Sense
 */
const loguinQlik = async () => 
{
  try
  {
    console.log("<<<<< Entro login Qlik >>> ");
    let respuesta = await axios.get(Constantes.BACKEND_QLIK_URL, { headers: {"Content-Type": "application/json", "qlik-web-integration-id": Constantes.WEBINTEGRATIONID }, mode: "cors", credentials: "include" });

    console.log("Respuesta login Qlik >>> " + respuesta.status);
    return { status: respuesta.status };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    console.log(`Error al registrar>>>>>>>>>>>>> ${error}`);
    return { status: error.request.status };
  }
}


export default 
{
  loguinQlik
};