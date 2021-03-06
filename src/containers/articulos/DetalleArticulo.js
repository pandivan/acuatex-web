
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";







/**
 * Componente de función que permite visualizar el detalle del articulo
 */
function DetalleArticulo() 
{
  const [articulo, setArticulo] = useState(null);
  const [talla, setTalla] = useState("");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");

  //Hook de react-router-dom maneja los parametros que se pasan por url, el nombre del parametro {articuloCodigo} debe ser igual al que esta en App.js
  let { articuloCodigo: articuloCodigoSinTalla } = useParams();



    
  useEffect(() =>
  {
    let lstArticulos = JSON.parse(localStorage.getItem("@articulos"));
    
    setArticulo(lstArticulos.find(articulo => articulo.codigo === articuloCodigoSinTalla));

  }, [articuloCodigoSinTalla]); //Solo si cambia el articuloCodigo vuelve a renderizar

  




  /**
   * Funcion que permite adicionar y eliminar la cantidad de un articulo seleccionado
   */
  const adicionarEliminarArticulo = (isAdicionar) =>
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
      //Se actualiza la nueva cantidad solicitada
      setArticulo(prevState => 
      {
        return {...prevState, cantidad: articulo.cantidad}; 
      });
    }
  }



  /**
   * Método que permite agregar al local storage el articulo con la cantidad seleccionada
   */
  const adicionarArticuloCarrito = () =>
  {
    try 
    {
      if("" === talla)
      {
        setMensajePopup("TIENES QUE SELECCIONAR UNA TALLA");
        setMostrarPopup(true);

        return;
      }


      let mapArticulosPedido = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

      let articuloPedido = null;
      let codigoTalla = articulo.codigo.concat(talla);

      //Se busca el articulo en la lista de articulos seleccionados por el cliente
      if(mapArticulosPedido.has(codigoTalla))
      {
        articuloPedido = mapArticulosPedido.get(codigoTalla);

        articuloPedido.cantidad += articulo.cantidad;
      }
      else
      {
        articuloPedido = {...articulo};
        articuloPedido.codigoTalla = codigoTalla;
        articuloPedido.talla = talla;
      }

      mapArticulosPedido.set(articuloPedido.codigoTalla, articuloPedido);
      localStorage.setItem("@articulosPedido", JSON.stringify(Array.from(mapArticulosPedido)));


      //Calculando badges
      let cantidadBadge = 0;

      mapArticulosPedido.forEach((articulo, codigo) => 
      {
        cantidadBadge += articulo.cantidad;
      });

      localStorage.setItem("@cantidadBadge", JSON.stringify(cantidadBadge));

      //Se actualiza el articulo para pintar el badges
      setArticulo(prevState => { return {...prevState};});
    } 
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      setMensajePopup("En el momento, no es posible adicionar articulos\nal carrito de compras.");
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
      <Header height={"none"} fondo={""} titulo={"YO AMO ACUATEX"}/>
      {
        articulo ?
        <div className="container-fluid-sm mt-5 pt-3">
          <div className="container d-flex justify-content-center bgg-success mb-5">
            <div className="bgg-info">
              
              <div className="row mb-5 pb-5 bgg-danger">
                <div className="col mr-3 bgg-warning">
                  <img src={require(`../../assets/${articulo.codigo}.png`)} alt={articulo.nombre} className="align-self-start mr-2" style={{height:630, width:630}}/>
                </div>
                
                <div className="col bgg-dark">
                  <div className="card-body bgg-danger">
                    <p className="card-title text-secondary pb-4 bgg-danger" style={{fontSize:35}}>{articulo.nombre}</p>
                    <p className="card-text mt-5" style={{fontSize:30}}>${(articulo.cantidad * articulo.precio).toFixed(2)}</p>
                    <p className="d-flex flex-wrap mt-4 bgg-info">{articulo.descripcion}</p>

                    <div className="d-flex text-center py-2 bgg-dark">
                      <span className="py-1 pr-2 bgg-danger">Talla: </span>
                      <ul className="flex-grow-1 list-group list-group-horizontal pb-4">
                      {
                        articulo.lstTallas.map(tallaBD => 
                        (
                          <li key={tallaBD} id={tallaBD} onClick={(e) => setTalla(e.target.id)} className={(tallaBD === talla) ? "list-group-item list-group-item-action active p-1" : "list-group-item list-group-item-action p-1 bgg-warning"}>
                            {tallaBD}
                          </li>
                        ))
                      }
                      </ul>
                    </div>
              
                    <div className="btn-group mt-4 align-items-center btn_cantidad_acuatex">
                      <button className="btn btn_add_acuatex" onClick={() => adicionarEliminarArticulo(false)}><i className="fa fa-minus"></i></button>
                      <span className="mx-4 px-2">{articulo.cantidad}</span>
                      <button className="btn btn_add_acuatex" onClick={() => adicionarEliminarArticulo(true)}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="my-4 pt-2">
                      <button type="button" className="btn btn-dark btn_carrito_acuatex" onClick={adicionarArticuloCarrito}>
                        Adicionar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 bgg-info">
                <h2 className="mt-4 pt-4">
                  COMPLETAR LOOK
                </h2>
              </div>

              <div className="container d-flex flex-wrap p-0 pt-2 mt-2 bgg-secondary">
              {
                articulo.lstArticulosLook.map(articuloLook => 
                (
                  <Link key={articuloLook} to={"/detallearticulo/" + articuloLook}>
                    <img className="img_articulo_acuatex mr-2 mb-4" src={require(`../../assets/${articuloLook}.png`)} alt={articuloLook}/>
                  </Link>
                ))
              }
              </div>
            
            </div>
          </div>
        </div>
        :
        null
      }
      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    </div>
  );
}

export default DetalleArticulo;