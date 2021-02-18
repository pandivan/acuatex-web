import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

import Header from "../../components/Header";
import PopupMensaje from "../../components/PopupMensaje";
import autenticacionServices from "../../services/AutenticacionServices";
import ciudadServices from "../../services/CiudadServices"; 
import Constantes from "../../Constantes";




/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function Registro() 
{
  const [isTokenValido] = useState(autenticacionServices.getToken());
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  const [sexo, setSexo] = useState("M");
  const [politicas, setPoliticas] = useState(true);
  const [pais, setPais] = useState("EC");
  const [codProvincia, setCodProvincia] = useState("01");
  const [codCiudad, setCodCiudad] = useState("01-001");
  const [isMostrarPopup, setMostrarPopup] = useState(false);
  const [mensajePopup, setMensajePopup] = useState("");
  const [lstProvincias, setLstProvincias] = useState([]);
  const [lstCiudades, setLstCiudades] = useState([]);
  const [lstCiudadesFiltradas, setLstCiudadesFiltradas] = useState([]);
  const [lstDias] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
  const [lstMeses] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
  const [lstAños, setLstAños] = useState([]);


  //Hook de react-router-dom maneja el historial de navegación
  let history = useHistory(); 


  useEffect(() => 
	{
		console.log("useEffect Registro");

    /**
     * Metodo que permite cargar las ciudades desde el API-REST
     */
    const cargarInformacion = async () => 
    {
      try 
      {
        let {status, lstCiudadesBD} = await ciudadServices.getAllCiudades();

        switch (status) 
        {
          case Constantes.STATUS_OK:
            //Si NO tiene token, entra a la web de registro
            if(!autenticacionServices.getToken())
            {
              setLstCiudades(lstCiudadesBD);
              setLstProvincias(lstCiudadesBD.filter(ciudad => "" === ciudad.codigoCiudad));
              setLstCiudadesFiltradas(lstCiudadesBD.filter(ciudad => ciudad.codigoCiudad.includes("01-")));
  
              //Se carga el listado de años desde 1905 al año actual (Referencia de facebook)
              let añoActual = new Date().getFullYear();
  
              const lstAñosPredefinida = []
  
              for (let año = añoActual; año >= 1905; año--) 
              {
                lstAñosPredefinida.push(año);
              }
  
              setLstAños(lstAñosPredefinida);
            }
            break;
          
          default:
            //Valida si hubo un error en el api-rest al obtener las ciudades
            //Si NO tiene token es porque no estoy logueado y debo informar que hubo un error en el backend
            if(!autenticacionServices.getToken())
            {
              setMensajePopup("En el momento, no es posible registrar tus datos,\nfavor intentarlo más tarde.");
              setMostrarPopup(true);
            }
            break;
        }
      } 
      catch (error) 
      {
        //TODO: Guardar log del error en BD 
      }
    };

    cargarInformacion();
  }, [])

  
  
  /**
   * Función que permite abrir o cerrar el popup de mensajes
   */
  const togglePopup = () => 
  {
    setMostrarPopup(!isMostrarPopup);
  }



  /**
   * Función que permite validar si el caracter digitado es numérico
   * @param e evento generado por teclear en un input
   */
  const validarNumero = (e) => 
  {
    let cedula = e.target.value;

    if (!Number(cedula)) 
    {
        return;
    }
   
    setCedula(cedula)
  }


  /**
   * Función que permite validar y registrar un cliente
   * @param e Evento generado por el boton del formulario
   */
  const validarFormulario = async (e) => 
  {
    e.preventDefault();
    e.target.className += " was-validated";

    if (e.target.checkValidity()) 
    {
      //Capturando los datos digitados por el cleinte
      let cliente =
      {
        cedula, nombres, codProvincia, codCiudad: codCiudad.split("-")[1], direccion, correo, telefono, clave, fecha:new Date(año,mes-1,dia), direccionEntrega:direccion, estado:1
      }

      
      //Se validan los datos a traves del api-rest
      let {status} = await autenticacionServices.signup(cliente);

      switch (status) 
      {
        case Constantes.STATUS_OK:
          history.goBack();
          break;

        case Constantes.STATUS_CREATED:
          //Valida si el cliente ya esta registrado en BD a través del correo
          setMensajePopup("Ingresaste una direccion de email que ya esta\nregistrada en Acuatex, Si ya eres miembro,\nhaz clic en Iniciar sesión");
          setMostrarPopup(true);
          break;
        
        default:
          //Valida si hubo un error en el api-rest al crear el cliente
          setMensajePopup("En el momento, no es posible registrar tus datos.");
          setMostrarPopup(true);
          break;
      }
    }
  }





  /**
  * Función que permite cargar las ciudades según la provincia seleccionada
  */
  const cargarCiudadesByProvincia = (e) => 
  {
    let codigoProvinciaSeleccionado = e.target.value;
    let lstCiudadesFiltradas = lstCiudades.filter(ciudad => ciudad.codigoCiudad.includes(codigoProvinciaSeleccionado+"-"));

    setCodProvincia(codigoProvinciaSeleccionado);
    setLstCiudadesFiltradas(lstCiudadesFiltradas);

    //Si el cliente pertenece a la primera ciudad de la lista entonces se coloca por default ese primer codigo ya que el cliente no tendrá la necesidad de interactuar con esta lista
    setCodCiudad(lstCiudadesFiltradas[0].codigoCiudad);
  }




  return (
    isTokenValido ?
    <Redirect to={"/articulos"} />  
    :
    <div className="bgg-success">
      <Header height={"none"} fondo={""} titulo={""}/>

      <div className="container mt-5 pt-5 bgg-dark" style={{width:"42%"}}>
        <h2>ESCRIBE TUS DATOS PERSONALES</h2>
        <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>

          <div className="row form-group">
            <div className="col mt-5 mr-4">
              <label htmlFor="txtCorreo">E-mail:</label>
              <input type="email" className="form-control" id="txtCorreo" placeholderr="E-mail" maxLength="50" required value={correo} onChange={e => setCorreo(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col mt-5 ml-4">
              <label htmlFor="txtClave">Contraseña:</label>
              <input type="password" className="form-control" id="txtClave" placeholderr="Contraseña" maxLength="10" required value={clave} onChange={e => setClave(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>
          

          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtNombres">Nombre completo:</label>
              <input type="text" className="form-control" placeholderr="Enter nombres completos" id="txtNombres" maxLength="150" required value={nombres} onChange={e => setNombres(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="txtCedula">Cedula:</label>
              <input type="text" className="form-control" placeholderr="Enter cedula" id="txtCedula" maxLength="13" required value={cedula} onChange={validarNumero} />
              <div className="invalid-feedback">
                Este campo es obligatorio y numérico.
              </div>
            </div>
          </div>

          
          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="txtTelefono">Número de teléfono:</label>
              <input type="text" className="form-control" placeholderr="Enter teléfono" id="txtTelefono" maxLength="10" required value={telefono} onChange={e => setTelefono(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
            <div className="col ml-4">
              <label htmlFor="txtDireccion">Dirección:</label>
              <input type="text" className="form-control" placeholderr="Enter Dirección" id="txtDireccion" maxLength="100" required value={direccion} onChange={e => setDireccion(e.target.value)} />
              <div className="invalid-feedback">
                Este campo es obligatorio.
              </div>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <span>Fecha de cumpleaños</span>

              <div className="d-flex pt-2 bg-secondaryy text-white">
                <select className="form-control mr-2" id="txtDia" value={dia} onChange={e => setDia(e.target.value)} >
                  <option>Día</option>
                  {
                    lstDias.map(dia => 
                    (
                      <option key={dia} value={dia}>{dia}</option>
                    ))
                  }
                </select>

                <select className="form-control mr-2" id="txtMes" value={mes} onChange={e => setMes(e.target.value)} >
                  <option>Mes</option>
                  {
                    lstMeses.map(mes => 
                    (
                      <option key={mes} value={mes}>{mes}</option>
                    ))
                  }
                </select>

                <select className="form-control" id="txtAño" value={año} onChange={e => setAño(e.target.value)} >
                  <option>Año</option>
                  {
                    lstAños.map(año => 
                    (
                      <option key={año} value={año}>{año}</option>
                    ))
                  }
                </select>
              </div>
              
            </div>
            <div className="col ml-4">
              Sexo
              <div>
                <div className="custom-control-inline custom-radio ml-4 mt-2">
                  <input type="radio" className="custom-control-input" id="rbMujer" name="mujer" checked={sexo === "F" ? true : false} onChange={() => setSexo("F")} />
                  <label className="custom-control-label" htmlFor="rbMujer">Mujer</label>
                </div>
                <div className="custom-control-inline custom-radio ml-4">
                  <input type="radio" className="custom-control-input" id="rbHombre" name="hombre" checked={sexo === "M" ? true : false} onChange={() => setSexo("M")}/>
                  <label className="custom-control-label" htmlFor="rbHombre">Hombre</label>
                </div>
              </div>
            </div>
          </div>
          

          <div className="row form-group mt-5">
            <div className="col mr-4">
                <label htmlFor="cbxPais">País:</label>
                <select className="custom-select" id="cbxPais" value={pais} onChange={e => setPais(e.target.value)} disabled={true}>
                  <option value="EC">Ecuador</option>
                  <option value="CO">Colombia</option>
                </select>
            </div>
            <div className="col ml-4">
              <label htmlFor="cbxCodProvincia">Provincia:</label>
              <select className="custom-select" id="cbxCodProvincia" value={codProvincia} onChange={cargarCiudadesByProvincia} >
              {
                lstProvincias.map(ciudad => 
                (
                  <option key={ciudad.id} value={ciudad.codigoProvincia}>{ciudad.nombre}</option>
                ))
              }
              </select>
            </div>
          </div>


          <div className="row form-group mt-5">
            <div className="col mr-4">
              <label htmlFor="cbxCodCiudad">Ciudad:</label>
              <select className="custom-select" id="cbxCodCiudad" value={codCiudad} onChange={e => setCodCiudad(e.target.value)} >
              {
                lstCiudadesFiltradas.map(ciudad => 
                (
                  <option key={ciudad.id} value={ciudad.codigoCiudad}>{ciudad.nombre}</option>
                ))
              }
              </select>
            </div>
            <div className="col ml-4">
              
            </div>
          </div>
        

          <div className="row form-group mt-5">
            <div className="col">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="txtPoliticas" required value={politicas} onChange={e => setPoliticas(e.target.value)}/>
                <label className="form-check-label" htmlFor="txtPoliticas" style={{fontSize:13}}>
                  He podido leer y entiendo la Política de Privacidad
                </label>
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>
          </div>


          <div className="row form-group mt-3">
            <div className="col">
              <button type="submit" className="btn btn-lg mt-4 btn-dark" style={{width: 220, fontSize:17}}>REGISTRAR</button>
            </div>
          </div>
        </form>
      </div>

      {
        isMostrarPopup && <PopupMensaje togglePopup={togglePopup} mensaje={mensajePopup} titulo={"AVISO"} />
      }
    </div>
  );
}

export default Registro;
