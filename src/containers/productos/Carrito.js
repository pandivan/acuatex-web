import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";




/**
 * Componente funcion que permite renderizar el carrito de compras con los productos seleccionados
 */
function Carrito() 
{
	const [mapProductosPedido, setProductosPedido] = useState(new Map());
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
	



	useEffect(() => 
	{
		console.log("useEffect Carrito");

		try
		{
			let mapProductosPedidoStorage = new Map(JSON.parse(localStorage.getItem("@productosPedido")));

			setProductosPedido(mapProductosPedidoStorage);
		}
		catch(error)
		{
			//TODO: Guardar log del error en BD
      setMensajePopup("En el momento, no es posible cargar los productos del pedido.");
      setMostrarPopup(true);
		}
  }, []);

  // Parece que algo no ha ido bien. Por favor, inténtalo de nuevo más tarde y si el problema persiste ponte en contacto con soporte.


  /**
   * Funcion que permite adicionar y eliminar la cantidad de un producto seleccionado
   */
  const adicionarEliminarProducto = (producto, isAdicionar) =>
  {
    if(isAdicionar)
    {
      producto.cantidad += 1;
    }
    else
    {
      if(1 !== producto.cantidad)
      {
          producto.cantidad -= 1;
      }
    }


    //Se guarda el producto en el carrito de compras cuando la cantidad pedida es mayor a cero
    if(producto.cantidad >= 0)
    {
      //Se actualiza la nueva cantidad solicitada
      setProductosPedido(new Map(mapProductosPedido.set(producto.id, producto)));

      try
      {
          localStorage.setItem("@productosPedido", JSON.stringify(Array.from(mapProductosPedido.entries())));
      }
      catch (error) 
      {
          //TODO: Guardar log del error en BD
          setMensajePopup("En el momento, no es posible adicionar productos.");
          setMostrarPopup(true);
      }
    }
  }




  /**
   * Funcion que permite eliminar del carrito de compras el producto seleccionado
   */
  const eliminarProducto = (producto) =>
  {
    try
    {
      mapProductosPedido.delete(producto.id);
      setProductosPedido(new Map(mapProductosPedido));
      localStorage.setItem("@productosPedido", JSON.stringify(Array.from(mapProductosPedido.entries())));
    }
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      setMensajePopup("En el momento, no es posible eliminar el producto.");
      setMostrarPopup(true);
    }
  }



  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }
    



   return (
	 	<div>
			{
				0 === mapProductosPedido.size ? 
				<span>No hay data</span>
        :
        <div>
          <Header height={"none"} fondo={""} titulo={""}/>
          <div className="container-fluid pt-4">
            
            <div className="d-flex justify-content-center p-2 mb-3 mt-5 bgg-danger">
              <span className="titulo_acuatex">CARRITO DE COMPRAS</span>
            </div>

            <div className="container d-flex align-items-center bgg-warning border-top-0 border-right-0 border-left-0 footer_separacion_acuatex mb-4">

              <div className="p-2 bgg-danger">
                <span className="subtitulo_acuatex">Producto</span>
              </div>

              <div className="bgg-dark" style={{width:"36%"}} />

              <div className="p-2 bgg-danger">
                <span className="subtitulo_acuatex">Cantidad</span>
              </div>

              <div className="bgg-dark" style={{width:"20%"}} />

              <div className="p-2 bgg-danger">
                <span className="subtitulo_acuatex">Precio</span>
              </div>
            </div>

            {
              Array.from(mapProductosPedido.values()).map(producto =>
              (
                <div key={producto.id} className="d-flex justify-content-center align-items-center bgg-secondary mb-4">
                <div className="p-2 bgg-info">
                  <img src={require("../../assets/" + producto.id + ".png")} alt={producto.nombre} style={{height:146, width:146}}/>
                </div>
                <div className="bgg-danger" style={{width:"1%"}}></div>
                <div className="bgg-warning" style={{width:100}}>
                  <p style={{color:"#777B7C"}}>{producto.nombre}</p>
                </div>
                <div className="bgg-danger" style={{width:"11%"}}></div>
                <div className="btn-group align-items-center btn_cantidad_acuatex">
                  <button type="button" className="btn btn_add_acuatex" onClick={() => adicionarEliminarProducto(producto, false)}><i className="fa fa-minus fa-1x"></i></button>
                  <span className="mx-4">{producto.cantidad}</span>
                  <button type="button" className="btn btn_add_acuatex" onClick={() => adicionarEliminarProducto(producto, true)}><i className="fa fa-plus fa-1x"></i></button>
                </div>
                <div className="bgg-danger" style={{width:"8%"}}></div>
                <div className="p-2 bgg-primary">
                  <span className="titulo_acuatex">${producto.cantidad * producto.precio}</span>
                </div>
                <div className="bgg-danger" style={{width:"11%"}}></div>
                <div className="p-2 bgg-primary">
                  <button type="button" className="btn" onClick={() => eliminarProducto(producto)}><i className="fa fa-times fa-2x btn_delete_acuatex"></i></button>
                </div>
              </div>
              ))
            }


            <div className="container d-flex justify-content-end align-items-center bgg-warning border-right-0 border-left-0 footer_separacion_acuatex">
              <span className="mr-5 titulo_acuatex">TOTAL</span>
              <span className="mr-5 titulo_acuatex">$290</span>
            </div>

            <div className="container d-flex justify-content-end bgg-success mt-4">
              <Link to="/metodos_pago" className="nav-link p-0">
                <button type="button" className="btn btn-dark btn_carrito_acuatex" >
                  <h4>Comprar</h4>
                </button>
              </Link>
            </div> 

          </div>
       
          {
            isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
          }
        </div>
			}
      </div> 
   );
}

export default Carrito;
