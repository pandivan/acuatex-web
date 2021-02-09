import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../components/Header";
import pedidoServices from "../../services/PedidoServices"; 
import autenticacionServices from "../../services/AutenticacionServices"; 





/**
 * Componente funcion que permite renderizar el carrito de compras con los articulos seleccionados
 */
function Pedidos() 
{
  const [lstPedidos, setLstPedidos] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory();
	


	useEffect(() => 
	{
    console.log("useEffect Pedidoss");
    
    let token = autenticacionServices.getToken();
    

    /**
     * Metodo que permite cargar los articulos desde el API-REST
     */
    const cargarPedidos = async () => 
    {
      try 
      {
        let {isTokenValido, lstPedidosBD} = await pedidoServices.getAllPedidos(token);

        //Se valida si el token es valido
        if (isTokenValido) 
        {
          if (null !== lstPedidosBD) 
          {
            setLstPedidos(lstPedidosBD);
          }
          setLoading(false);
        }
        else
        {
          autenticacionServices.logout();
          // alert("Tu sesión ha expirado");
          history.replace("/");
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD
        console.log(`Error al registrar: ${error}`);
      }
    };

    //Se valida si tiene token
    if(token)
    {
      cargarPedidos();
    }
    else
    {
      history.replace("/");
    }
  }, [history]);








  /**
   * Funcion que permite calcular el total del pedido
   */
  const calcularTotalPedido = (pedido) =>
  {
    let totalPedido = 0;

    pedido.lstPedidoDetalle.forEach( pedidoDetalle => 
    {
      totalPedido += pedidoDetalle.precioVenta * pedidoDetalle.cantidad;
    });

    return totalPedido;
  }



  return (
	 	<div>
       <Header height={"none"} fondo={""} titulo={""}/>

        <div className="container pt-5 bgg-danger">
        <h2 className="mb-5 font-weight-bolder bgg-danger">MIS PEDIDOS</h2>
        {
          isLoading ?
          <span style={{fontSize:13}}>Cargando......</span>
          :
            0 !== lstPedidos.length ?
            <div>
              <div className="container d-flex align-items-center bgg-warning border-top-0 border-right-0 border-left-0 footer_separacion_acuatex mb-4">

                <div className="p-2 bgg-danger">
                  <span className="subtitulo_acuatex">Articulo</span>
                </div>

                <div className="bg-dark" style={{width:"53%"}} />

                <div className="p-2 bgg-danger">
                  <span className="subtitulo_acuatex">Cantidad</span>
                </div>

                <div className="bgg-dark" style={{width:"20%"}} />

                <div className="p-2 bgg-danger">
                  <span className="subtitulo_acuatex">Precio</span>
                </div>
              </div>

              {
                lstPedidos.map(pedido => 
                (
                  <div key={pedido.nroPedido}>
                    <div className="container bgg-danger footer_separacion_pedidos_acuatex mb-4">
                      <div className="p-1 bgg-danger">
                        <span className="ml-2 descripcion_articulo_acuatex">N° Pedido: {pedido.nroPedido}</span>
                      </div>
                      <div className="p-1 bgg-danger">
                        <span className="ml-2 descripcion_articulo_acuatex">Fecha Pedido: {new Date(pedido.fecha).getFullYear()}-{new Date(pedido.fecha).getMonth() + 1}-{new Date(pedido.fecha).getDate()}</span>
                      </div>
                      <div className="p-1 bgg-danger">
                        <span className="ml-2 descripcion_articulo_acuatex">Estado: {pedido.estado}</span>
                      </div>
                    </div>
                    {
                      pedido.lstPedidoDetalle.map(pedidoDetalle => 
                      (
                        <div key={pedidoDetalle.codArticulo} className="container d-flex align-items-center bgg-warning mb-4">
                          <div className="p-2 bgg-info">
                            <img src={require("../../assets/" + pedidoDetalle.codArticulo + ".png")} alt={pedidoDetalle.detalle} style={{height:100, width:100}}/>
                          </div>
                          <div className="bgg-danger" style={{width:"1%"}} />

                          <div className="bgg-warning" style={{width:350}}>
                            <p className="descripcion_articulo_acuatex">{pedidoDetalle.detalle}</p>
                            <p className="titulo_acuatex">Talla: {pedidoDetalle.talla}</p>
                          </div>
                          
                          <div className="bgg-danger" style={{width:"19%"}} />

                          <div className="p-2 bgg-primary">
                            <span className="titulo_acuatex">{pedidoDetalle.cantidad}</span>
                          </div>

                          <div className="bgg-danger" style={{width:"23%"}} />
                          
                          <div className="p-2 bgg-primary">
                            <span className="titulo_acuatex">${(pedidoDetalle.cantidad * pedidoDetalle.precioVenta).toFixed(2)}</span>
                          </div>
                        </div>
                      )) 
                    }

                    <div className="container d-flex align-items-center mb-5 bgg-warning">
                      <div className="bgg-danger" style={{width:"80%"}} />
                      <span className="mr-5 titulo_acuatex">TOTAL</span>  
                      <span className="pr-4 titulo_acuatex">${calcularTotalPedido(pedido).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              }
            </div>
            :
            <div className="bgg-warning">
              <span>Consulta la información y el estado de tus pedidos online.</span>
              <div>
                <i className="fa fa-list fa-2x pr-4 mt-5 bgg-info" />
              </div>
              <div>
                <span style={{fontSize:13}}>NO SE HAN ENCONTRADO PEDIDOS</span>
              </div>
            </div>
        }
      </div> 
    </div>
   );
}

export default Pedidos;
