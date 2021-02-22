import pedidoServices from "../services/PedidoServices"; 


const ESTADO_PEDIDO_PENDIENTE = 100;





/**
 * Función que permite registrar un nuevo pedido
 * @param pedido, Pedido a registrar
 */
const registrarPagoTC = async (transaccion) => 
{
  let estadoTransaccion = "TRANSACCIÓN RECHAZADA";
  let mensaje = "El pedido no pudo registrarse correctamente";

  try
  {
    console.log("registrarPagoTC >>> " + transaccion);

    /**
     * Se llama a la pasarela de pago STRIPE
     * transaccion.numeroTarjeta, transaccion.mesCaducidad, transaccion.añoCaducidad, transaccion.titularTarjeta, transaccion.numeroCVV
     */
    //let respuesta = await axios.post(`${Constantes.BACKEND_URL}/pedido`, pedido);

    let respuesta = {data:true};

    let isTransaccionAceptada = respuesta.data;

    //Se valida que la transacción fue aceptada por la pasarela de pago
    if(isTransaccionAceptada)
    {
      //Se registra el pedido en BD
      let {resultadoTransaccion} = await registrarPedido(transaccion.clienteBD);
      
      return { resultadoTransaccion };
    }

    // console.log("Respuesta API-REST Pedido. ");
    // console.log(JSON.stringify(respuesta));

    return { resultadoTransaccion: { nroPedido: null, mensaje, estadoTransaccion } };
  }
	catch(error)
  {
    //TODO: Guardar log en BD
    // console.log(`Error al registrar: ${error}`);
    return { resultadoTransaccion: { nroPedido: null, mensaje, estadoTransaccion} };
  }
}




/**
 * Función que permite registrar un pedio en BD
 * @param cliente que hizo el pedido
 */
const registrarPedido = async (cliente) => 
{
  let estadoTransaccion = "TRANSACCIÓN RECHAZADA";
  let mensaje = "El pedido no pudo registrarse correctamente";

  try
  {
    let fechaActual = new Date();
    let lstPedidoDetalle = [];
    let mapArticulosPedido = new Map(JSON.parse(localStorage.getItem("@articulosPedido")));

    let i = 1;

    mapArticulosPedido.forEach((articulo, codigo) => 
    {
      //Creando entity ProductoPedido
      let pedidoDetalle = 
      {
        secuencia: i++,
        codArticulo: articulo.codigo.concat(articulo.talla),
        codPromo: null,
        umedida: null,
        cantidad: articulo.cantidad,
        bonificacion: null,
        precioVenta: (articulo.cantidad * articulo.precio).toFixed(2),
        porcDescuento: null,
        ice: null,
        iva: 19,
        detalle: articulo.nombre
      }

      lstPedidoDetalle.push(pedidoDetalle);
    });


    //Creando entity Pedido...
    let pedido = 
    {
      nroPedido: null,
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
      detalle: "WEB",
      estado: ESTADO_PEDIDO_PENDIENTE,
      vendedor: "WEB",
      fechaDespacho: null,
      lstPedidoDetalle
    };


    //Enviando el pedido al servidor via api-res para registrarlo en BD
    let {nroPedido} = await pedidoServices.registrarPedido(pedido);


    if(undefined !== nroPedido && "" !== nroPedido)
    {
      localStorage.removeItem("@articulosPedido");
      localStorage.removeItem("@cantidadBadge");

      estadoTransaccion = "SU PEDIDO FUE REGISTRADO";
      mensaje = "Dentro de poco será informado de su estado";
    }

    return { resultadoTransaccion: { nroPedido, mensaje, estadoTransaccion } };
  }
  catch(error)
  {
    return { resultadoTransaccion: { nroPedido: null, mensaje, estadoTransaccion} };
  }
};




export default 
{
  registrarPagoTC
};