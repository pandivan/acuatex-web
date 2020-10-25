import * as React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Articulos from "../containers/articulos/Articulos";
import Carrito from "../containers/articulos/Carrito";
import MenuHistorialPedido from "../routes/MenuHistorialPedido";
import Ajustes from "../containers/login/Ajustes";


function IconWithBadge({ name, badgeCount, color, size }) 
{
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Ionicons name={name} size={size} color={color} />
      {
        badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MenuCliente() 
{
  return (
    <Tab.Navigator 
      initialRouteName="Articulos" 
      headerMode ="none"
      screenOptions={({ route }) => (
      {
          tabBarIcon: ({ focused, color, size }) => 
          {
            switch (route.name) 
            {
              case "Articulos": 
                return (
                  <Ionicons
                    name={focused ? "ios-restaurant" : "ios-restaurant"}
                    size={size}
                    color={color}
                  />
                );

              case "Carrito":
                return (
                  <IconWithBadge
                    name={focused ? "md-cart" : "md-cart"}
                    size={size}
                    color={color}
                    badgeCount={0}
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
            // if (route.name === "Carrito") 
            // {
            //   return (
            //     <IconWithBadge
            //       name={focused ? "md-cart" : "md-cart"}
            //       size={size}
            //       color={color}
            //       badgeCount={0}
            //     />
            //   );
            // } 
            // else if (route.name === "Articulos") 
            // {
            //   return (
            //     <Ionicons
            //       name={focused ? "ios-list-box" : "ios-list"}
            //       size={size}
            //       color={color}
            //     />
            //   );
            // }
          },
        })}
        tabBarOptions=
        {{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStyle: {fontSize: 16},
        }}
    >
      <Tab.Screen name="Articulos" component={Articulos} />
      <Tab.Screen name="Carrito" component={Carrito} />
      <Tab.Screen name="Historial" component={MenuHistorialPedido} />
      <Tab.Screen name="Más" component={Ajustes} />
    </Tab.Navigator>
  );
}

export default MenuCliente;