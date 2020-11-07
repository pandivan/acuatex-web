import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";




function PagoPSE() 
{

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 


  useEffect(() => 
	{
		console.log("useEffect PSE");


    let cantidadBadge = JSON.parse(localStorage.getItem("@cantidadBadge"));

    if(null === cantidadBadge)
    {
      history.push("/");
    }
  }, [history]);


  return (
    <div>
      <Header height={"none"} fondo={""} titulo={""}/>
      <h1>PagoPSE</h1>
    </div>
  );
}

export default PagoPSE;