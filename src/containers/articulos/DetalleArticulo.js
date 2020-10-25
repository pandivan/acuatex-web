
import React, { useState } from "react";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";


/**
 * Componente de función que permite visualizar el detalle del articulo
 * @param props Recibe como parametro el articulo
 */
function DetalleArticulo(props) 
{
  const [articulo, setArticulo] = useState(props.location.state.articulo);
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");



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
      let mapArticulosPedido = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

      let articuloPedido = null;

      //Se busca el articulo en la lista de articulos seleccionados por el cliente
      if(mapArticulosPedido.has(articulo.codigo))
      {
        articuloPedido = mapArticulosPedido.get(articulo.codigo);
        articuloPedido.cantidad += articulo.cantidad;
      }
      else
      {
        articuloPedido = {...articulo};
      }

      mapArticulosPedido.set(articuloPedido.codigo, articuloPedido);
      localStorage.setItem("@articulosPedido", JSON.stringify(Array.from(mapArticulosPedido.entries())));


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

      <div className="container-fluid-sm mt-5 pt-3">
        <div className="container d-flex justify-content-center bgg-success mb-5">
          <div className="bgg-info">
            
            <div className="row bgg-danger">
              <div className="col mr-3 bgg-warning">
                <img src={require(`../../assets/${articulo.codigo}.png`)} alt={articulo.nombre} className="align-self-start mr-2" style={{height:630, width:630}}/>
              </div>
              
              <div className="col bgg-dark">
                <div className="card-body bgg-danger">
                  <p className="card-title text-secondary pb-4 bgg-danger" style={{fontSize:40}}>{articulo.nombre}</p>
                  <p className="card-text mt-5" style={{fontSize:30}}>${(articulo.cantidad * articulo.precio).toFixed(2)}</p>
                  <p className="d-flex flex-wrap mt-4 bgg-info">{articulo.descripcion}</p>
             
                  <div className="btn-group mt-5 align-items-center btn_cantidad_acuatex">
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


            <div className="card-deck mt-5 pt-4">
              <div className="card">
                <div className="card-header align-middle">
                  <span className="card-titles">DETALLE DEL ARTICULO</span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header align-middle">
                  <span className="card-title">DIMENSIONES</span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header align-middle">
                  <span className="card-title">ENVÍO</span>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                  <div className="row mt-3">
                    <div className="col bgg-info">.col</div>
                    <div className="col bgg-warning">.col</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    </div>
  );
}

export default DetalleArticulo;