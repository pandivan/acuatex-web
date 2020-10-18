import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MenuPedido from "../routes/MenuPedido";
import MenuHistorialPedido from "../routes/MenuHistorialPedido";
import Ajustes from "../containers/login/Ajustes";



const Tab = createBottomTabNavigator();

function MenuTienda() 
{
  return (
    <Tab.Navigator 
      initialRouteName="Productos" 
      headerMode ="none"
      screenOptions={({ route }) => (
      {
          tabBarIcon: ({ focused, color, size }) => 
          {
            switch (route.name) 
            {   
              case "Pedidos": 
                return (
                  <Ionicons
                    name={focused ? "ios-restaurant" : "ios-restaurant"}
                    size={size}
                    color={color}
                  />
                );

                case "Historial": 
                return (
                  <Ionicons
                    name={focused ? "ios-time" : "md-time"}
                    size={size}
                    color={color}
                  />
                );

              case "Más": 
                return (
                  <Ionicons
                    name={focused ? "ios-list-box" : "ios-list"}
                    size={size}
                    color={color}
                  />
                );

              default:
                console.log("default");
            }
          },
        })}
        tabBarOptions=
        {{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStyle: {fontSize: 16},
        }}
    >
      <Tab.Screen name="Pedidos" component={MenuPedido} />
      <Tab.Screen name="Historial" component={MenuHistorialPedido} />
      <Tab.Screen name="Más" component={Ajustes} />
    </Tab.Navigator>
  );
}

export default MenuTienda;