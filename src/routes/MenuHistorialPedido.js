import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistorialPedidos from "../containers/tiendas/HistorialPedidos";
import ArticulosPedido from "../containers/tiendas/ArticulosPedido";


const Stack = createStackNavigator();


function MenuHistorialPedido() 
{
  return (
    <Stack.Navigator initialRouteName="Pedidos">
      <Stack.Screen name="HistorialPedidos" component={HistorialPedidos} options={{headerShown: false}}/>
      <Stack.Screen name="ArticulosPedido" component={ArticulosPedido} options={{headerTitle: "Información del Pedido"}}/>
    </Stack.Navigator>
  );
}

export default MenuHistorialPedido;