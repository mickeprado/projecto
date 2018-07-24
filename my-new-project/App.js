import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { DrawerNavigator} from 'react-navigation'
//export default 
/*
class App extends React.Component{
  render(){
    return(
      <View style={styles.container}>
      <Text> hello bichis</Text>
      
      </View>
    );
  }
}
*/
class App extends React.Component {
  constructor(){
    super();//ejecuta el constructor del component
    this.state ={
      numero:4
    } 
  }
  //funcion para aumentar
  aumentar = () =>{
    //this.state accede a la clase state y toma el valor del numero
    this.setState({
      numero:this.state.numero +1
    })
  }
  //funcion para disminuir
  disminuir = () =>{
    this.setState({
    numero: this.state.numero -1
  })
}

  render() {
    return (
      <View style={styles.container}>
       
      <View style={styles.cajauno} >
      <Text>Contador</Text>
      </View>
      <View style={styles.cajados}>
      <Text>{this.state.numero}</Text>
      
      </View>
      <View style={styles.cajatres}>
      <View style={styles.button1}>
      <Button
      title="Aumentar"
      onPress={ () => { this.aumentar();} }
      >
      </Button>
      </View>
      <View style={styles.button2}>
      <Button
      title="restar"
      onPress={ () => { this.disminuir();}}      
      />


      </View>
  
    
      </View>
        
      </View>
    );
  }
}



const styles = StyleSheet.create({

  /*container hace referencia a cada estilo personalizado. ejemplo
    styles.cajauno se reflejara el cambio a cada estilo.
  */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  cajauno:{
    flex:5,
    backgroundColor: '#00ff00',
     alignItems: 'center',
    justifyContent: 'center',
  },
  cajados:{
    flex:6,
    backgroundColor: '#90ee90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cajatres:{
    flex:1,
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default App;