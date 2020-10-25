import React, { useState } from "react";

import Header from "../../components/Header";




/**
 * Componente funcion que permite registrar un nuevo cliente en la plataforma
 */
function Registro() 
{
  const [correo, setCorreo] = useState("ivan.hernandez.coral@gmail.com");
  const [clave, setClave] = useState("12345");
  const [nombres, setNombres] = useState("ivan hernandez");
  const [cedula, setCedula] = useState("13072207");
  const [telefono, setTelefono] = useState("3014317636");
  const [direccion, setDireccion] = useState("valle lili");
  const [razonSocial, setRazonSocial] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("M");
  const [politicas, setPoliticas] = useState("");
  const [pais, setPais] = useState("EC");
  const [provincia, setProvincia] = useState("20");
  const [ciudad, setCiudad] = useState("002");

  

  const validarFormulario = event => 
  {
    event.preventDefault();
    event.target.className += " was-validated";

    if (event.target.checkValidity()) 
    {
      console.log(correo);
      console.log(clave);
      console.log(nombres);
      console.log(cedula);
      console.log(telefono);
      console.log(direccion);
      console.log(razonSocial);
      console.log(fechaNacimiento);
      console.log(sexo);
      console.log(politicas);
      console.log(pais);
      console.log(provincia);
      console.log(ciudad);
    }
  };



    return (
      <div className="bgg-success">
        <Header height={"none"} fondo={""} titulo={""}/>

        <div className="container mt-5 pt-5 bgg-dark" style={{width:"42%"}}>
          <h2>ESCRIBE TUS DATOS PERSONALES</h2>
          <form className="needs-validation bgg-warning" onSubmit={validarFormulario} noValidate>
            
            <div className="row form-group">
              <div className="col mt-5 mr-4">
                <label htmlFor="correo">E-mail:</label>
                <input type="correo" className="form-control" id="correo" placeholderr="E-mail" name="correo" required value={correo} onChange={e => setCorreo(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col mt-5 ml-4">
                <label htmlFor="pwd">Contraseña:</label>
                <input type="clave" className="form-control" id="pwd" placeholderr="Contraseña" name="pswd" required value={clave} onChange={e => setClave(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>


            <div className="row form-group mt-5">
              <div className="col mr-4">
                <label htmlFor="nombres">Nombre completo:</label>
                <input type="text" className="form-control" placeholderr="Enter nombres completos" id="nombres" required value={nombres} onChange={e => setNombres(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col ml-4">
                <label htmlFor="cedula">Cedula:</label>
                <input type="text" className="form-control" placeholderr="Enter cedula" id="cedula" required value={cedula} onChange={e => setCedula(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>

            
            <div className="row form-group mt-5">
              <div className="col mr-4">
                <label htmlFor="telefono">Número de teléfono:</label>
                <input type="text" className="form-control" placeholderr="Enter teléfono" id="telefono" required value={telefono} onChange={e => setTelefono(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col ml-4">
                <label htmlFor="direccion">Dirección:</label>
                <input type="text" className="form-control" placeholderr="Enter Dirección" id="direccion" required value={direccion} onChange={e => setDireccion(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>


            <div className="row form-group mt-5">
              <div className="col mr-4">
                <label htmlFor="razonSocial">Razón Social:</label>
                <input type="text" className="form-control" placeholderr="Enter Dirección" id="razonSocial" required value={razonSocial} onChange={e => setRazonSocial(e.target.value)} />
                <div className="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
              <div className="col ml-4">
                <label htmlFor="fechaCumpleaños">Fecha cumpleaños:</label>
                <input type="date" className="form-control" placeholderr="Enter fecha cumpleaños" id="fechaCumpleaños" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
              </div>
            </div>
            

            <div className="row form-group mt-5">
              <div className="col mr-4">
                  <label htmlFor="pais">País:</label>
                  <select className="custom-select" id="pais" value={pais} onChange={e => setPais(e.target.value)} >
                    <option value="EC">Ecuador</option>
                    <option value="CO">Colombia</option>
                  </select>
              </div>
              <div className="col ml-4">
                <label htmlFor="provincia">Provincia:</label>
                <select className="custom-select" id="provincia" value={provincia} onChange={e => setProvincia(e.target.value)} >
                    <option value="01">AZUAY</option>
                    <option value="02">BOLIVAR</option>
                  </select>
              </div>
            </div>


            <div className="row form-group mt-5">
              <div className="col mr-4">
                <label htmlFor="ciudad">Ciudad:</label>
                <select className="custom-select" id="ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)} >
                  <option value="001">CUENCA</option>
                  <option value="001">GUARANDA</option>
                </select>
              </div>
              <div className="col ml-4">
                Sexo
                <div>
                  <div className="custom-control-inline custom-radio ml-4 mt-2">
                    <input type="radio" className="custom-control-input" id="mujer" name="mujer" checked={sexo === "F" ? true : false} onChange={() => setSexo("F")} />
                    <label className="custom-control-label" htmlFor="mujer">Mujer</label>
                  </div>
                  <div className="custom-control-inline custom-radio ml-4">
                    <input type="radio" className="custom-control-input" id="hombre" name="hombre" checked={sexo === "M" ? true : false} onChange={() => setSexo("M")}/>
                    <label className="custom-control-label" htmlFor="hombre">Hombre</label>
                  </div>
                </div>
              </div>
            </div>
          

            <div className="row form-group mt-5">
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="politicas" required value={politicas} onChange={e => setPoliticas(e.target.value)}/>
                  <label className="form-check-label" htmlFor="politicas" style={{fontSize:13}}>
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
                <button type="submit" className="btn btn-lg mt-4 btn-dark" style={{width:190}}>REGISTRAR</button>
              </div>
            </div>
          </form>
        </div>
      
      </div>
    );
}

export default Registro;
