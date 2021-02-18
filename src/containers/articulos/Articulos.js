import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Constantes from "../../Constantes";
import articuloServices from "../../services/ArticuloServices";



/**
 * Componente de función que permite visualizar todos los articulos
 */
function Articulos() 
{
  const [loading, setLoading] = useState(true);
  const [lstArticulos, setLstArticulos] = useState([]);


  

  useEffect(() => 
  {
    console.log("useEffect Articulo");

    /**
     * Metodo que permite cargar los articulos desde el API-REST
     */
    const cargarArticulos = async () => 
    {
      try 
      {
        let {status, lstArticulosBD} = await articuloServices.getAllArticulos();

        switch (status) 
        {
          case Constantes.STATUS_OK:
            setLstArticulos(lstArticulosBD);
            setLoading(false);
            break;
          
          default:
            break;
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
      }
    };

    cargarArticulos();
  }, []);
  



  return (
    <div>
      <Header height={"none"} fondo={""} titulo={"YO AMO ACUATEX"}/>

      <div className="container-fluid bgg-dark">
      {

        loading ? 
          null
        :
          <div className="container d-flex flex-wrap p-0 pt-2 bgg-secondary mt-5">
          {
            lstArticulos.map(articulo => 
            (
              <Link key={articulo.codigo} to=
              {{
                  pathname: "/detallearticulo",
                  state: { articulo }
              }}
              >
                <img className="img_articulo_acuatex mr-4 mb-4" src={require(`../../assets/${articulo.codigo}.png`)} alt={articulo.nombre}/>
              </Link>
            ))
          }
          </div>
      }
      </div>

    </div>
  );
}

export default Articulos;