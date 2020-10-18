import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import productoServices from "../../services/ProductoServices";



/**
 * Componente de función que permite visualizar los productos según la categoría seleccionada
 */
function Estilos() 
{
  const [loading, setLoading] = useState(true);
  const [lstProductos, setProductos] = useState([]);
  const [lstProductosFiltrados, setProductosFiltrados] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [imagenFondo, setImagenFondo] = useState("Todo");

  


  useEffect(() => 
  {
    console.log("useEffect Estilos");

    /**
     * Metodo que permite cargar los productos desde el API-REST
     */
    const cargarProductos = async () => 
    {
      try 
      {
        let {success, productos} = await productoServices.getAllProductos();

        if (success) 
        {
          setProductos(productos);
          setProductosFiltrados(productos);
          setLoading(false);
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD
        console.log(error)
      }
    };

    cargarProductos();
  }, []);




  /**
   * Método que permite buscar un producto 
   */
  const buscarProducto = (e) => 
  {
    e.preventDefault();

    setProductosFiltrados(lstProductos.filter(producto => producto.nombre.concat(producto.categoria).toLowerCase().includes(nombreProducto.toLowerCase())));
    setLoading(false);
  };




  /**
  * Método que permite buscar un producto según la categoria seleccionada
  * @param categoria Categoria seleccionada
  */
  const buscarProductoByCategoria = (categoria, fondo) => 
  {
    setImagenFondo(fondo);
    setProductosFiltrados(lstProductos.filter(producto => producto.categoria.includes(categoria)));
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
            <form className="form-inline" onSubmit={buscarProducto} >
              <input className="form-control mr-sm-2" type="search" placeholder="Buscar" value={nombreProducto} onChange={e => setNombreProducto(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </nav>
        </div> */}

        <div className="container d-flex flex-wrap justify-content-start p-0 mb-5 bgg-danger">
          <button type="button" className="btn_categoria_acuatex ml-1 mr-4" onClick={() => buscarProductoByCategoria("Niña", "Niña")}>Niña</button>
          <button type="button" className="btn_categoria_acuatex mr-4" onClick={() => buscarProductoByCategoria("Bebe Niña", "BebeNiña")}>Bebé Niña</button>
          <button type="button" className="btn_categoria_acuatex mr-4" onClick={() => buscarProductoByCategoria("Niño", "Niño")}>Niño</button>
          <button type="button" className="btn_categoria_acuatex mr-4" onClick={() => buscarProductoByCategoria("Bebe Niño", "BebeNiño")}>Bebé Niño</button>
          <button type="button" className="btn_categoria_acuatex mr-4" onClick={() => buscarProductoByCategoria("Dama", "Dama")}>Dama</button>
          <button type="button" className="btn_categoria_acuatex mr-4" onClick={() => buscarProductoByCategoria("Caballero", "Caballero")}>Caballero</button>
        </div>
        {

          loading ? 
          <div className="loader" />
          :
          <div className="container d-flex flex-wrap p-0 bgg-secondary mt-4">
            {
              lstProductosFiltrados.map(producto => 
              (
                <Link key={producto.id} to=
                    {{
                        pathname: "/detalleproducto",
                        state: { producto }
                    }}
                >
                  <img className="img_producto_acuatex mr-4 mb-4" src={require(`../../assets/${producto.id}.png`)} alt={producto.nombre}/>
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