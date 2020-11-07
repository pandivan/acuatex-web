import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./containers/seguridad/Login";
import Registro from "./containers/seguridad/Registro";
import InformacionPersonal from "./containers/seguridad/InformacionPersonal";
import Ajustes from "./containers/seguridad/Ajustes";
import DatosAcceso from "./containers/seguridad/DatosAcceso";
import Menu from "./containers/articulos/Menu";
import Estilos from "./containers/articulos/Estilos";
import Articulos from "./containers/articulos/Articulos";
import DetalleArticulo from "./containers/articulos/DetalleArticulo";
import Carrito from "./containers/articulos/Carrito";
import MetodosPago from "./containers/pagos/MetodosPago";
import PagoTarjetaCredito from "./containers/pagos/PagoTarjetaCredito";
import PagoPSE from "./containers/pagos/PagoPSE";
import Pedidos from "./containers/pedidos/Pedidos";
import Transaccion from "./containers/pagos/Transaccion";

import "bootstrap/dist/css/bootstrap.min.css";



/**
 * Funcion principal que se encarga de redireccionar a las diferentes pantallas
 */
function App() 
{
  return (
    <Switch>
      <Route exact path="/">
        <Menu />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/registro/">
        <Registro/>
      </Route>

      <Route path="/articulos">
        <Articulos />
      </Route>

      <Route path="/estilos">
        <Estilos />
      </Route>

      <Route path="/detallearticulo" component={DetalleArticulo} />

      <Route path="/carrito">
        <Carrito />
      </Route>

      <Route path="/ajustes">
        <Ajustes />
      </Route>

      <Route path="/usuario/cuenta/datos-acceso">
        <DatosAcceso />
      </Route>

      <Route path="/usuario/informacion-personal">
        <InformacionPersonal/>
      </Route>

      <Route path="/metodos_pago">
        < MetodosPago/>
      </Route>

      <Route path="/pago_tarjeta_credito">
        < PagoTarjetaCredito/>
      </Route>

      <Route path="/pago_pse">
        < PagoPSE/>
      </Route>

      <Route path="/pedidos">
        <Pedidos />
      </Route>

      <Route path="/transaccion">
        <Transaccion />
      </Route>

    </Switch>
  );
}

export default App;
