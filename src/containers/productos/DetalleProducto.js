
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";


/**
 * Componente de función que permite visualizar el detalle del producto
 * @param props Recibe como parametro el producto
 */
function DetalleProducto(props) 
{
  const [producto, setProducto] = useState(props.location.state.producto);
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  const [cantidadBadge, setCantidadBadge] = useState(0);



  //Este useEffect es temporal mientras llamo desde el api a los productos y le pongo cantidad = 1
  useEffect(() => 
  {
    setProducto(prevState => 
    {
      return {...prevState, cantidad: 1}; 
    });
  }, []);



  /**
   * Funcion que permite adicionar y eliminar la cantidad de un producto seleccionado
   */
  const adicionarEliminarProducto = (isAdicionar) =>
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
      setProducto(prevState => 
      {
        return {...prevState, cantidad: producto.cantidad}; 
      });
    }
  }





  /**
   * Método que permite agregar al local storage el producto con la cantidad seleccionada
   */
  const adicionarProductoCarrito = () =>
  {
    try 
    {
      let mapProductosPedido = new Map(JSON.parse(localStorage.getItem("@productosPedido")));

      let productoPedido = null;

      //Se busca el producto en la lista de productos seleccionados por el cliente
      if(mapProductosPedido.has(producto.id))
      {
        productoPedido = mapProductosPedido.get(producto.id);
        productoPedido.cantidad += producto.cantidad;
      }
      else
      {
        productoPedido = {...producto};
      }

      mapProductosPedido.set(productoPedido.id, productoPedido);
      localStorage.setItem("@productosPedido", JSON.stringify(Array.from(mapProductosPedido.entries())));

      let cantidadBadge_ = productoPedido.cantidad + cantidadBadge;
      setCantidadBadge(cantidadBadge_); 
    } 
    catch (error) 
    {
      //TODO: Guardar log del error en BD
      setMensajePopup("En el momento, no es posible adicionar productos\nal carrito de compras.");
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
      <Header height={"none"} fondo={""} titulo={"YO AMO ACUATEX"} cantidad={cantidadBadge}/>

      <div className="container-fluid-sm mt-5 pt-3">
        <div className="container d-flex justify-content-center bgg-success mb-5">
          <div className="bgg-info">
            
            <div className="row bgg-danger">
              <div className="col mr-3 bgg-warning">
                <img src={require(`../../assets/${producto.id}.png`)} alt={producto.nombre} className="align-self-start mr-2" style={{height:630, width:630}}/>
              </div>
              
              <div className="col bgg-dark">
                <div className="card-body bgg-danger">
                  <p className="card-title text-secondary pb-4 bgg-danger" style={{fontSize:40}}>{producto.nombre}</p>
                  <p className="card-text mt-5" style={{fontSize:30}}>${producto.cantidad * producto.precio}</p>
                  <p className="d-flex flex-wrap mt-4 bgg-info">{producto.descripcion}</p>
             
                  <div className="btn-group mt-5 align-items-center btn_cantidad_acuatex">
                    <button className="btn btn_add_acuatex" onClick={() => adicionarEliminarProducto(false)}><i className="fa fa-minus"></i></button>
                    <span className="mx-4 px-2">{producto.cantidad}</span>
                    <button className="btn btn_add_acuatex" onClick={() => adicionarEliminarProducto(true)}><i className="fa fa-plus"></i></button>
                  </div>

                  <div className="my-4 pt-2">
                    <button type="button" className="btn btn-dark btn_carrito_acuatex" onClick={adicionarProductoCarrito}>
                      Adicionar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div className="card-deck mt-5 pt-4">
              <div className="card">
                <div className="card-header align-middle">
                  <span className="card-titles">DETALLE DEL PRODUCTO</span>
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

export default DetalleProducto;