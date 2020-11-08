import React, { useState, useEffect } from "react";
import Header from "../../components/Header";





/**
 * Componente funcion que permite renderizar el carrito de compras con los articulos seleccionados
 */
function Pedidos() 
{
	const [mapArticulosPedido, setArticulosPedido] = useState(new Map());
	


	useEffect(() => 
	{
		console.log("useEffect Pedidos");

		try
		{
			let mapArticulosPedidoStorage = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

			setArticulosPedido(mapArticulosPedidoStorage);
		}
		catch(error)
		{
			//TODO: Guardar log del error en BD
		}
  }, []);








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




   return (
	 	<div>
       <Header height={"none"} fondo={""} titulo={""}/>

       <div className="container pt-5 bgg-danger">
        <h2 className="mb-5 font-weight-bolder bgg-danger">MIS PEDIDOS</h2>
        {
          0 === mapArticulosPedido.size ?
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

            <div className="container bgg-danger footer_separacion_pedidos_acuatex mb-4">
              <div className="p-1 bgg-danger">
                <span className="ml-2 descripcion_articulo_acuatex">N° Pedido: 30300101010</span>
              </div>
              <div className="p-1 bgg-danger">
                <span className="ml-2 descripcion_articulo_acuatex">Fecha Pedido: 2020-11-04</span>
              </div>
              <div className="p-1 bgg-danger">
                <span className="ml-2 descripcion_articulo_acuatex">Estado: Pendiente</span>
              </div>
            </div>

            {
              Array.from(mapArticulosPedido.values()).map(articulo =>
              (
                <div key={articulo.codigo} className="container d-flex align-items-center bgg-warning mb-4">
                  <div className="p-2 bgg-info">
                    <img src={require("../../assets/" + articulo.codigo + ".png")} alt={articulo.nombre} style={{height:100, width:100}}/>
                  </div>
                  <div className="bgg-danger" style={{width:"1%"}} />

                  <div className="bgg-warning" style={{width:350}}>
                    <p className="descripcion_articulo_acuatex">{articulo.nombre}</p>
                  </div>
                  
                  <div className="bgg-danger" style={{width:"19%"}} />

                  <div className="p-2 bgg-primary">
                    <span className="titulo_acuatex">{articulo.cantidad}</span>
                  </div>

                  <div className="bgg-danger" style={{width:"23%"}} />
                  
                  <div className="p-2 bgg-primary">
                    <span className="titulo_acuatex">${(articulo.cantidad * articulo.precio).toFixed(2)}</span>
                  </div>
                </div>
              ))
            }

            <div className="container d-flex justify-content-end align-items-center mb-5 bgg-warning">
              <span className="mr-5 titulo_acuatex">TOTAL</span>  
              <span className="mr-5 pr-4 titulo_acuatex">${calcularTotalPedido().toFixed(2)}</span>
            </div>






            <div className="container bgg-danger footer_separacion_pedidos_acuatex mb-4">
              <div className="p-1 bgg-danger">
                <span className="ml-2 descripcion_articulo_acuatex">N° Pedido: 30300101010</span>
              </div>
              <div className="p-1 bgg-danger">
                <span className="ml-2 descripcion_articulo_acuatex">Fecha Pedido: 2020-11-04</span>
              </div>
              <div className="p-1 bgg-danger">
                <span className="ml-2 descripcion_articulo_acuatex">Estado: Pendiente</span>
              </div>
            </div>

            {
              Array.from(mapArticulosPedido.values()).map(articulo =>
              (
                <div key={articulo.codigo} className="container d-flex align-items-center bgg-warning mb-4">
                  <div className="p-2 bgg-info">
                    <img src={require("../../assets/" + articulo.codigo + ".png")} alt={articulo.nombre} style={{height:100, width:100}}/>
                  </div>
                  <div className="bgg-danger" style={{width:"1%"}} />

                  <div className="bgg-warning" style={{width:350}}>
                    <p className="descripcion_articulo_acuatex">{articulo.nombre}</p>
                  </div>
                  
                  <div className="bgg-danger" style={{width:"19%"}} />

                  <div className="p-2 bgg-primary">
                    <span className="titulo_acuatex">{articulo.cantidad}</span>
                  </div>

                  <div className="bgg-danger" style={{width:"23%"}} />
                  
                  <div className="p-2 bgg-primary">
                    <span className="titulo_acuatex">${(articulo.cantidad * articulo.precio).toFixed(2)}</span>
                  </div>
                </div>
              ))
            }

            <div className="container d-flex justify-content-end align-items-center mb-5 bgg-warning">
              <span className="mr-5 titulo_acuatex">TOTAL</span>  
              <span className="mr-5 pr-4 titulo_acuatex">${calcularTotalPedido().toFixed(2)}</span>
            </div>

          </div>
        }
      </div> 
    </div>
   );
}

export default Pedidos;