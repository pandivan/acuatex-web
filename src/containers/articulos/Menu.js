import React, { useState, useEffect } from "react";
// import { Link, useNavigation } from "react-router-dom";

import Header from "../../components/Header";
import Constantes from "../../Constantes";
import loginServices from "../../services/LoginServices";



function Menu() 
{

  const [isLoggedInQlik, setLoggedInQlik] = useState("");
 
  // const navigate = useNavigation();

  useEffect(() => 
  {
    console.log("useEffect Menu");

    /**
     * Metodo que permite cargar los articulos desde el API-REST
     */
    const loguinQlik = async () => 
    {
      try 
      {
        let {status} = await loginServices.loguinQlik();

        switch (status) 
        {
          case Constantes.STATUS_OK:
            console.log("loguinQlikloguinQlikloguinQlikloguinQlik");
            // navigate( , { replace: true });
            setLoggedInQlik(status);
            break;
          
          default:
            setLoggedInQlik(status);
            break;
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
      }
    };

    loguinQlik();
  }, []);


  return (
    <div>
      <Header height={"none"} fondo={""} titulo={""}/>
      <h1>Men</h1>
      <h1>{isLoggedInQlik}</h1>
    </div>
  );
}

export default Menu;

// https://acuatex-web.herokuapp.com

