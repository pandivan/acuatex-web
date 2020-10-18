import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Container, Content } from "native-base";

var {height, width } = Dimensions.get("window");


class PlantillaUI extends Component 
{
  
  constructor(props) 
  {
     super(props);
     this.state = 
     {
       arrayCategorias: []
     };
  }


  /**
   * Función que permite hacer una solicitud a un API REST
   */
  componentDidMount()
  {
    const url = "http://tutofox.com/foodapp/api.json"
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => 
    {
      this.setState(
      {
        arrayCategorias: responseJson.categories,
      });
    })
    .catch((error) =>
    {
      console.error(error);
    });
  }
  
  
  render() 
  {
    return (
        <View style={styles.contentUI}>
          <Text>
            Esto es una plantilla
            {"\n"}
            { JSON.stringify(this.state.arrayCategorias) }
          </Text>
        </View>
    );
  }
}


const styles = StyleSheet.create(
{
  contentUI: 
  {
    backgroundColor: "blue"
  }
});


export default PlantillaUI;