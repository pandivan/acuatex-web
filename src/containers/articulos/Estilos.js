import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import articuloServices from "../../services/ArticuloServices";



/**
 * Componente de función que permite visualizar los articulos según la categoría seleccionada
 */
function Estilos() 
{
  const [loading, setLoading] = useState(true);
  const [lstArticulos, setArticulos] = useState([]);
  const [lstArticulosFiltrados, setArticulosFiltrados] = useState([]);
  const [imagenFondo, setImagenFondo] = useState("Todo");

  


  useEffect(() => 
  {
    console.log("useEffect Estilos");

    /**
     * Metodo que permite cargar los articulos desde el API-REST
     */
    const cargarArticulos = async () => 
    {
      try 
      {
        let {success, lstArticulosBD} = await articuloServices.getAllArticulos();

        if (success) 
        {
          setArticulos(lstArticulosBD);
          setArticulosFiltrados(lstArticulosBD);
          setLoading(false);
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD
      }
    };

    cargarArticulos();
  }, []);




  /**
   * Método que permite buscar un articulo 
   
  const buscarArticulo = (e) => 
  {
    e.preventDefault();

    setArticulosFiltrados(lstArticulos.filter(articulo => articulo.nombre.concat(articulo.grupo).toLowerCase().includes(nombreArticulo.toLowerCase())));
    setLoading(false);
  };
*/



  /**
  * Método que permite buscar un articulo según la grupo seleccionada
  * @param grupo Grupo seleccionada
  */
  const buscarArticuloByGrupo = (grupo, fondo) => 
  {
    setImagenFondo(fondo);
    setArticulosFiltrados(lstArticulos.filter(articulo => articulo.grupo.includes(grupo)));
    setLoading(false);
  };
  



  return (
    <div>
      <Header height={"430px"} fondo={imagenFondo} titulo={"YO AMO ACUATEX"}/>

      <div className="container-fluid mt-5 bgg-dark">

        {/* <div className="d-flex justify-content-center pb-5 mb-5 bgg-info">
          YO AMO ACUATEX
        </div> */}

        {/* <div className="d-flex justify-content-center pt-5 pb-4 bgg-warning">
          <nav className="navbar navbar-expand-sm">
            <form className="form-inline" onSubmit={buscarArticulo} >
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar" value={nombreArticulo} onChange={e => setNombreArticulo(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </nav>
        </div> */}

        <div className="container d-flex flex-wrap justify-content-start p-0 mb-5 bgg-danger">
          <button type="button" className="btn_grupo_acuatex ml-1 mr-4" onClick={() => buscarArticuloByGrupo("NIÑA", "Niña")}>Niña</button>
          <button type="button" className="btn_grupo_acuatex mr-4" onClick={() => buscarArticuloByGrupo("BEBE NIÑA", "BebeNiña")}>Bebé Niña</button>
          <button type="button" className="btn_grupo_acuatex mr-4" onClick={() => buscarArticuloByGrupo("NIÑO", "Niño")}>Niño</button>
          <button type="button" className="btn_grupo_acuatex mr-4" onClick={() => buscarArticuloByGrupo("BEBÉ NIÑO", "BebeNiño")}>Bebé Niño</button>
          <button type="button" className="btn_grupo_acuatex mr-4" onClick={() => buscarArticuloByGrupo("DAMA", "Dama")}>Dama</button>
          <button type="button" className="btn_grupo_acuatex mr-4" onClick={() => buscarArticuloByGrupo("CABALLERO", "Caballero")}>Caballero</button>
        </div>
        {

          loading ? 
            null 
          :
          <div className="container d-flex flex-wrap p-0 bgg-secondary mt-4">
            {
              lstArticulosFiltrados.map(articulo => 
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

export default Estilos;