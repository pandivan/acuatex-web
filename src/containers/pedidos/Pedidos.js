import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
// import pedidoServices from "../../services/PedidoServices"; 





/**
 * Componente funcion que permite renderizar el carrito de compras con los articulos seleccionados
 */
function Pedidos() 
{
  const [lstPedidos, setLstPedidos] = useState([]);
	


	useEffect(() => 
	{
    console.log("useEffect Pedidos");
    

    /**
     * Metodo que permite cargar los articulos desde el API-REST
     */
    const cargarPedidos = async () => 
    {
      try 
      {
        // let {success, lstPedidosBD} = await pedidoServices.getAllPedidos();
        let success=true;

        let lstPedidosBD=  
        [
          {
            nroPedido:"1010",
            fecha:"Hoy",
            estado:"Pendiente",
            lstPedidoDetalle:
            [
              {
                codArticulo:"9",
                cantidad:"3",
                precioVenta:"10",
                detalle:"Pijama Hombre"
              },
              {
                codArticulo:"8",
                cantidad:"2",
                precioVenta:"15",
                detalle:"Pijama Mujer"
              }
            ]
          },
          {
            nroPedido:"1011",
            fecha:"Hoy",
            estado:"Cancelado",
            lstPedidoDetalle:
            [
              {
                codArticulo:"3",
                cantidad:"9",
                precioVenta:"10",
                detalle:"Camisa Hombre"
              },
              {
                codArticulo:"4",
                cantidad:"12",
                precioVenta:"15",
                detalle:"Camisa Mujer"
              }
            ]
          },
          {
            nroPedido:"1012",
            fecha:"Ayer",
            estado:"Enviado",
            lstPedidoDetalle:
            [
              {
                codArticulo:"1",
                cantidad:"5",
                precioVenta:"34",
                detalle:"Pijama Niño"
              },
              {
                codArticulo:"2",
                cantidad:"6",
                precioVenta:"25",
                detalle:"Pijama Niña"
              }
            ]
          }
        ]; 

        if (success) 
        {
          setLstPedidos(lstPedidosBD);
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
      }
    };

    cargarPedidos();
  }, []);








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
          0 === lstPedidos.size ?
          <div className="bgg-warning">
            <span>Consulta la información y el estado de tus pedidos online.</span>
            <div>
              <i className="fa fa-list fa-2x pr-4 mt-5 bgg-info" />
            </div>
            <div>
              <span style={{fontSize:13}}>NO SE HAN ENCONTRADO PEDIDOS</span>
            </div>
          </div>
          :
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
                      <span className="ml-2 descripcion_articulo_acuatex">Fecha Pedido: {pedido.fecha}</span>
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
        }
      </div> 
    </div>
   );
}

export default Pedidos;
