import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import FooterPagos from "../../components/FooterPagos";




/**
 * Componente de función que permite visualizar los diferentes tipos de pago
 */
function Pagos() 
{
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mesCaducidad, setMesCaducidad] = useState("");
  const [añoCaducidad, setAñoCaducidad] = useState("");
  const [titularTarjeta, setTitularTarjeta] = useState("");
  const [numeroCVV, setNumeroCVV] = useState("");


  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 


  

  useEffect(() => 
  {
    console.log("useEffect Pagos");

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
        <h3 className="font-weight-bolder">INTRODUCE LOS DATOS DE TU TARJETA</h3>

        <img className="mt-5 img_border_acuatex" src={require("../../assets/mastercard.png")} alt={"Master Card"} style={{height:55, width:72}}/>

        <div className="my-5 bgg-warning" style={{height:347}}>
          <form className="needs-validation bgg-warning" style={{width:"60%"}} noValidate>
            <div className="row form-group">
              <div className="col mt-3">
                <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
                <input type="text" className="form-control" id="numeroTarjeta" placeholderr="Número de tarjeta" required value={numeroTarjeta} onChange={e => setNumeroTarjeta(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-3">
                <label htmlFor="titularTarjeta">Titular de la tarjeta:</label>
                <input type="text" className="form-control" id="titularTarjeta" placeholderr="Titular de la tarjeta" required value={titularTarjeta} onChange={e => setTitularTarjeta(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              
            </div>

            <div className="row form-group mt-5">
              <div className="col mt-4 bgg-danger">
                <label htmlFor="mesCaducidad">Mes:</label>
                <select className="custom-select" id="mesCaducidad" value={mesCaducidad} onChange={e => setMesCaducidad(e.target.value)} stylee={{width:"60%"}}>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                </select>
              </div>
              <div className="col mt-4 bgg-info">
                <label htmlFor="añoCaducidad">Año:</label>
                <select className="custom-select" id="añoCaducidad" value={añoCaducidad} onChange={e => setAñoCaducidad(e.target.value)} stylee={{width:"60%"}}>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="col-sm mt-4 bgg-success">
                <label htmlFor="numeroCVV">Número de CVV:</label>
                <input type="text" className="form-control" id="numeroCVV" placeholderr="Número de CVV" required value={numeroCVV} onChange={e => setNumeroCVV(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>
          </form>
        </div>
      
        <FooterPagos paginaSiguiente={"/"} paginaAnterior={"/metodos_pago"}/>
      </div>
      
    </div>
  );
}

export default Pagos;