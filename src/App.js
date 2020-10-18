import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./containers/seguridad/Login";
import Registro from "./containers/seguridad/Registro";
import Ajustes from "./containers/seguridad/Ajustes";
import ActualizarDatos from "./containers/seguridad/ActualizarDatos";
import Menu from "./containers/productos/Menu";
import Estilos from "./containers/productos/Estilos";
import Productos from "./containers/productos/Productos";
import DetalleProducto from "./containers/productos/DetalleProducto";
import Carrito from "./containers/productos/Carrito";
import MetodosPago from "./containers/pagos/MetodosPago";
import PagoTarjetaCredito from "./containers/pagos/PagoTarjetaCredito";
import PagoPSE from "./containers/pagos/PagoPSE";

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

      <Route path="/registro">
        <Registro />
      </Route>

      <Route path="/productos">
        <Productos />
      </Route>

      <Route path="/estilos">
        <Estilos />
      </Route>

      <Route path="/detalleproducto" component={DetalleProducto} />

      <Route path="/carrito">
        <Carrito />
      </Route>

      <Route path="/ajustes">
        <Ajustes />
      </Route>

      <Route path="/actualizar_datos">
        <ActualizarDatos />
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

    </Switch>
  );
}

export default App;
