import React, { createContext, useState } from "react";
// import axios from "axios";
import respuesta from "./data.json";

export const Contexto = createContext();

const ContextoProvider = (props) => 
{
  const [lstArticulos, setLstArticulos] = useState([]);
  const [loading, setLoading] = useState(true);


  /**
   * Función que permite obtener todas los articulos segun la grupo seleccionada
   */
  const getAllArticulos = async () => 
  {
    try 
    {
        console.log("getAllArticulos....");
        // let respuesta = await axios.get(`${BACKEND_URL}`);

        // console.log("Respuesta API-REST Articulos. ");
        // console.log(JSON.stringify(respuesta.data));

        setLstArticulos(respuesta.data);
        setLoading(false);

        return { success: "" !== respuesta.data, articulos: respuesta.data };
    } 
    catch (error) 
    {
      //TODO: Guardar log en BD
      console.log(`Error al registrar: ${error}`);
      return { success: false };
    }
  };


  return (
    <Contexto.Provider value={{ lstArticulos, loading, getAllArticulos }}>
      {props.children}
    </Contexto.Provider>
  );
};

export default ContextoProvider;
