import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import autenticacionServices from "../../services/AutenticacionServices"; 



/**
 * Componente funcion que permite renderizar el carrito de compras con los articulos seleccionados
 */
function Carrito() 
{
	const [mapArticulosPedido, setArticulosPedido] = useState(new Map());
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  const [isLoading, setLoading] = useState(true);

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 
	



	useEffect(() => 
	{
		console.log("useEffect Carrito");

		try
		{
			let mapArticulosPedidoStorage = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

      setArticulosPedido(mapArticulosPedidoStorage);
      
      setLoading(false);
		}
		catch(error)
		{
			//TODO: Guardar log del error en BD
      setMensajePopup("En el momento, no es posible cargar los articulos del pedido.");
      setMostrarPopup(true);
		}
  }, []);

  // Parece que algo no ha ido bien. Por favor, inténtalo de nuevo más tarde y si el problema persiste ponte en contacto con soporte.




  /**
   * Funcion que permite adicionar y eliminar la cantidad de un articulo seleccionado
   */
  const adicionarEliminarArticulo = (articulo, isAdicionar) =>
  {
    if(isAdicionar)
    {
      articulo.cantidad += 1;
    }
    else
    {
      if(1 !== articulo.cantidad)
      {
          articulo.cantidad -= 1;
      }
    }


    //Se guarda el articulo en el carrito de compras cuando la cantidad pedida es mayor a cero
    if(articulo.cantidad >= 0)
    {
      try
      {
        mapArticulosPedido.set(articulo.codigo, articulo);

        localStorage.setItem("@articulosPedido", JSON.stringify(Array.from(mapArticulosPedido)));
        
        //Se actualiza la nueva cantidad solicitada
        setArticulosPedido(new Map(mapArticulosPedido));
      }
      catch (error) 
      {
          //TODO: Guardar log del error en BD
          setMensajePopup("En el momento, no es posible adicionar articulos.");
          setMostrarPopup(true);
      }
    }
  }




  /**
   * Funcion que permite eliminar del carrito de compras el articulo seleccionado
   */
  const eliminarArticulo = (articulo) =>
  {
    try
    {
      mapArticulosPedido.delete(articulo.codigo);
      
      localStorage.setItem("@articulosPedido", JSON.stringify(Array.from(mapArticulosPedido)));

      if(0 === mapArticulosPedido.size)
      {
        localStorage.setItem("@cantidadBadge", JSON.stringify(0));
      }

      setArticulosPedido(new Map(mapArticulosPedido));
    }
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      setMensajePopup("En el momento, no es posible eliminar el articulo.");
      setMostrarPopup(true);
    }
  }



    /**
   * Funcion que permite calcular el total del pedido
   */
  const calcularTotalPedido = () =>
  {
    let totalPedido = 0;
    let cantidadBadge = 0;

    mapArticulosPedido.forEach((articulo, codigo) => 
    {
      totalPedido += articulo.precio * articulo.cantidad;
      cantidadBadge += articulo.cantidad;
    });

    localStorage.setItem("@cantidadBadge", JSON.stringify(cantidadBadge));

    return totalPedido;
  }



  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }
    

  /**
   * Función que permite validar si el cliente se encuentra logueado
   */
  const validarLogueo = () =>
  {
    let urlSiguiente = "/metodos_pago";
    let token = autenticacionServices.getToken();
      
    if(null === token)
    {
      urlSiguiente = "/login";
    }

    history.push(urlSiguiente);
  }



   return (
	 	<div>
       <Header height={"none"} fondo={""} titulo={""}/>
			{
        isLoading ?
          null
        :
          0 === mapArticulosPedido.size ? 
          <div className="container-fluid pt-4">
            <div className="d-flex justify-content-center p-2 mb-3 mt-5 bgg-danger">
              <img className="" src={require(`../../assets/Dama.png`)} alt="carrio vacio"/>
            </div>
          </div>  
          :
          <div>
            <div className="container-fluid pt-4">
            
              <div className="container d-flex justify-content-center p-2 mb-3 mt-5 bgg-danger">
                <div className="bgg-info" style={{width:"6%"}}></div>
                <span className="titulo_acuatex">CARRITO DE COMPRAS</span>
              </div>

              <div className="container d-flex align-items-center bgg-warning border-top-0 border-right-0 border-left-0 footer_separacion_acuatex mb-4">

                <div className="p-2 bgg-danger">
                  <span className="subtitulo_acuatex">Articulo</span>
                </div>

                <div className="bgg-dark" style={{width:"43%"}} />

                <div className="p-2 bgg-danger">
                  <span className="subtitulo_acuatex">Cantidad</span>
                </div>

                <div className="bgg-dark" style={{width:"21%"}} />

                <div className="p-2 bgg-danger">
                  <span className="subtitulo_acuatex">Precio</span>
                </div>
              </div>

              {
                Array.from(mapArticulosPedido.values()).map(articulo =>
                (
                  <div key={articulo.codigo} className="d-flex justify-content-center align-items-center bgg-secondary mb-4">
                  <div className="p-2 bgg-info">
                    <img src={require("../../assets/" + articulo.codigo + ".png")} alt={articulo.nombre} style={{height:146, width:146}}/>
                  </div>

                  <div className="bgg-danger" style={{width:"1%"}}></div>

                  <div className="bgg-warning" style={{width:150}}>
                    <p className="descripcion_articulo_acuatex">{articulo.nombre}</p>
                    <p className="titulo_acuatex">Talla: {articulo.talla}</p>
                  </div>
                  
                  <div className="bgg-danger" style={{width:"11%"}}></div>
                  
                  <div className="btn-group align-items-center btn_cantidad_acuatex">
                    <button type="button" className="btn btn_add_acuatex" onClick={() => adicionarEliminarArticulo(articulo, false)}><i className="fa fa-minus fa-1x"></i></button>
                    <span className="mx-4">{articulo.cantidad}</span>
                    <button type="button" className="btn btn_add_acuatex" onClick={() => adicionarEliminarArticulo(articulo, true)}><i className="fa fa-plus fa-1x"></i></button>
                  </div>
                  
                  <div className="bgg-danger" style={{width:"11%"}}></div>
                  
                  <div className="p-2 bgg-primary">
                    <span className="titulo_acuatex">${(articulo.cantidad * articulo.precio).toFixed(2)}</span>
                  </div>
                  
                  <div className="bgg-danger" style={{width:"6%"}}></div>
                  
                  <div className="p-2 bgg-primary">
                    <button type="button" className="btn" onClick={() => eliminarArticulo(articulo)}><i className="fa fa-times fa-2x btn_delete_acuatex"></i></button>
                  </div>
                </div>
                ))
              }


              <div className="container d-flex justify-content-end align-items-center bgg-warning border-right-0 border-left-0 footer_separacion_acuatex">
                <span className="mr-5 titulo_acuatex">TOTAL</span>
                <span className="mr-5 titulo_acuatex">${calcularTotalPedido().toFixed(2)}</span>
              </div>

              <div className="container d-flex justify-content-end bgg-success mt-4">
                <button type="button" className="btn btn-dark btn_carrito_acuatex" onClick={validarLogueo} >
                  <h4>Comprar</h4>
                </button>
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
