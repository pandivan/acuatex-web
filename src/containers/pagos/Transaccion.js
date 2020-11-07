import React, { useState, useEffect } from "react";

import pedidoServices from "../../services/PedidoServices"; 

// import Header from "../../components/Header";



function Transaccion(props) 
{
  const [transaccion] = useState(props.location.state);
  const [isTransaccionOK, setTransaccionOK] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const ESTADO_PEDIDO_PENDIENTE = 100;

  
  useEffect(() => 
	{
    console.log("useEffect Transaccion");
    
    const registrarPedido = async () => 
    {
      try
      {
        /**
         * Se llama a la pasarela de pago STRIPE
         * transaccion.numeroTarjeta, transaccion.mesCaducidad, transaccion.añoCaducidad, transaccion.titularTarjeta, transaccion.numeroCVV
         */
        let respuestaStripe = true;
  
        if(respuestaStripe)
        {
          let cliente = JSON.parse(localStorage.getItem("@cliente"));
          let fechaActual = new Date();
  
          
          let lstPedidoDetalle = [];
          let mapArticulosPedido = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

          let i = 1;
  
          mapArticulosPedido.forEach((articulo, codigo) => 
          {
            //Creando entity ProductoPedido
            let pedidoDetalle = 
            {
              nro_pedido: "1010",
              secuencia: i++,
              codArticulo: articulo.codigo.concat("L"), //articulo.codigoa.concat(articulo.talla),
              codPromo: null,
              umedida: null,
              cantidad: articulo.cantidad,
              bonificacion: null,
              precioVenta: articulo.precio.toFixed(2),
              porcDescuento: null,
              ice: null,
              iva: 19,
              detalle: "prenda"
            }
  
            lstPedidoDetalle.push(pedidoDetalle);
          });
  
  
          //Creando entity Pedido...
          let pedido = 
          {
            nroPedido: "1010",
            fecha: fechaActual,
            hora: fechaActual.getHours(),
            fechaEnvio: null,
            horaEnvio: null,
            cliente: cliente.cedula,
            sucursal: 1,
            ruc: null,
            nombre: cliente.nombres,
            direccion: cliente.direccion,
            correo: cliente.correo,
            telefono: cliente.telefono,
            codProvincia: cliente.codProvincia,
            codCiudad: cliente.codCiudad,
            direccionEntrega: cliente.direccion,
            telefonoEntrega: cliente.telefono,
            codProvinciaEntrega: cliente.codProvincia,
            codCiudad_entrega: cliente.codCiudad,
            diasPlazo: 3,
            detalle: "primera compra XL",
            estado: ESTADO_PEDIDO_PENDIENTE,
            vendedor: "WEB",
            fechaDespacho: null,
            lstPedidoDetalle
          };
  
          console.log(pedido);
          //Enviando el pedido al servidor via api-res para registrarlo en BD
          let {success} = await pedidoServices.registrarPedido(pedido);

          if(success)
          {
            localStorage.removeItem("@articulosPedido");
            localStorage.removeItem("@cantidadBadge");

            setMensaje("Información... Su pedido fue registrado. Dentro de poco será informado de su estado.");

            setTransaccionOK(true);

            // this.props.navigation.navigate("Productos");

          }
          else
          {
            setMensaje("Información.... El pedido no pudo registrarse correctamente, por favor vuelva a intentar.");
          }
        }
        else
        {
          setMensaje("Malangas con la pasarela...");
        }
      }
      catch(error)
      {
        //Alert.alert("Información", "No es posible registrar el pedido");
        console.log(error);
      }
    };

    registrarPedido();

  }, [])
  



  return (
    isTransaccionOK ?
      <div>
        <h1>Transaccion  </h1>
        <h1>numeroTarjeta {transaccion.numeroTarjeta} </h1>
        <h1>mesCaducidad {transaccion.mesCaducidad} </h1>
        <h1>añoCaducidad {transaccion.añoCaducidad} </h1>
        <h1>titularTarjeta {transaccion.titularTarjeta} </h1>
        <h1>numeroCVV {transaccion.numeroCVV} </h1>

        <h2>{mensaje}</h2>
      </div>
    :
      <span>Pagango....{mensaje||''}</span>
  );
}

export default Transaccion;