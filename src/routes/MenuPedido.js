import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Pedidos from "../containers/tiendas/Pedidos";
import ArticulosPedido from "../containers/tiendas/ArticulosPedido";


const Stack = createStackNavigator();


function MenuPedido() 
{
  return (
    <Stack.Navigator initialRouteName="Pedidos">
      <Stack.Screen name="Pedidos" component={Pedidos} options={{headerShown: false}}/>
      <Stack.Screen name="ArticulosPedido" component={ArticulosPedido} options={{headerTitle: "Información del Pedido"}}/>
    </Stack.Navigator>
  );
}

export default MenuPedido;