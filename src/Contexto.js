import React, { createContext, useState } from "react";
// import axios from "axios";
import respuesta from "./data.json";

export const Contexto = createContext();

const ContextoProvider = (props) => 
{
  const [lstProductos, setLstProductos] = useState([]);
  const [loading, setLoading] = useState(true);


  /**
   * Función que permite obtener todas los productos segun la categoria seleccionada
   */
  const getAllProductos = async () => 
  {
    try 
    {
        console.log("getAllProductos....");
        // let respuesta = await axios.get(`${BACKEND_URL}`);

        // console.log("Respuesta API-REST Productos. ");
        // console.log(JSON.stringify(respuesta.data));

        setLstProductos(respuesta.data);
        setLoading(false);

        return { success: "" !== respuesta.data, productos: respuesta.data };
    } 
    catch (error) 
    {
      //TODO: Guardar log en BD
      console.log(`Error al registrar: ${error}`);
      return { success: false };
    }
  };


  return (
    <Contexto.Provider value={{ lstProductos, loading, getAllProductos }}>
      {props.children}
    </Contexto.Provider>
  );
};

export default ContextoProvider;
