import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import productoServices from "../../services/ProductoServices";



/**
 * Componente de función que permite visualizar todos los productos
 */
function Productos() 
{
  const [loading, setLoading] = useState(true);
  const [lstProductos, setProductos] = useState([]);


  

  useEffect(() => 
  {
    console.log("useEffect Producto");

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
  



  return (
    <div>
      <Header height={"none"} fondo={""} titulo={"YO AMO ACUATEX"}/>

      <div className="container-fluid bgg-dark">
        {
  
          loading ? 
          <div className="loader" />
          :
          <div className="container d-flex flex-wrap p-0 pt-2 bgg-secondary mt-5">
            {
              lstProductos.map(producto => 
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

export default Productos;