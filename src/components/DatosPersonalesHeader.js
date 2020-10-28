import React from "react";



function DatosPersonalesHeader(props)
{

  return (
    <div className="row form-group">
      <div className="col mt-5 mr-4">
        <label htmlFor="correo">E-mail:</label>
        <input type="correo" className="form-control" id="txtCorreo" placeholderr="E-mail" name="correo" required value={props.valorCorreo} onChange={props.onChange} />
        <div className="invalid-feedback">
          Este campo es obligatorio.
        </div>
      </div>
      <div className="col mt-5 ml-4">
        <label htmlFor="pwd">Contraseña:</label>
        <input type="password" className="form-control" id="txtClave" placeholderr="Contraseña" name="pswd" required value={props.valorClave} onChange={props.onChange} />
        <div className="invalid-feedback">
          Este campo es obligatorio.
        </div>
      </div>
    </div>
  );
};
 
export default DatosPersonalesHeader;