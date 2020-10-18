import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import FooterPagos from "../../components/FooterPagos";



/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function MetodosPago() 
{
  const [tipoPago, setTipoPago] = useState("TC");


  

  useEffect(() => 
  {
    console.log("useEffect Producto");

    /**
     * Metodo que permite visualizar el resumen de la compra
     */
    const cargarResumenCompra = async () => 
    {
      try 
      {
        // let {success, productos} = await productoServices.getAllProductos();

        // if (success) 
        // {
        //   setProductos(productos);
        //   setLoading(false);
        // }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
        console.log(error)
      }
    };

    cargarResumenCompra();
  }, []);
  





  return (
    <div>
      <Header height={"none"}/>

      <div className="container d-flex flex-column pt-4 bgg-info">
       
        {/* <h3 className="font-weight-boldR" stye={{fontFamily:"Titillium Web, sans-serif"}} >ELIGE UN MÉTODO DE PAGO</h3> */}
        <h3 className="font-weight-bolder" >ELIGE UN MÉTODO DE PAGO</h3>
       
        <div className="my-5 bgg-warning" style={{height:450}}>
          <img className="mr-4 mb-4 img_border_acuatex" src={require("../../assets/mastercard.png")} alt={"Master Card"} style={{height:100, width:100}} onClick={() => setTipoPago("TC")}/>
          <img className="mr-4 mb-4 img_border_acuatex" src={require("../../assets/visa.png")} alt={"Visa"} style={{height:100, width:100}} onClick={() => setTipoPago("TC")}/>
          <img className="mr-4 mb-4 img_border_acuatex" src={require("../../assets/pse.png")} alt={"PSE"} style={{height:100, width:100}} onClick={() => setTipoPago("PSE")}/>
        </div>

        <FooterPagos paginaSiguiente={tipoPago === "TC" ? "/pago_tarjeta_credito" : "/pago_pse"} paginaAnterior={"/carrito"}/>
      </div>
    </div>
  );
}

export default MetodosPago;