import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cep: '',
      dataEndereco: { }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Exemplo Prático</Text>
        <Text>"Desenvolvimento para dispositivos móveis" (IMD0148)</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Digite aqui o CEP"
          onChangeText={(cep) => this.setState({cep})}
          value={this.state.cep}
        />
        <TouchableOpacity onPress={ () => this.saveData(this.state)}>
          <Text>Clique aqui para salvar as informações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.displayData}>
          <Text>Clique aqui para mostrar as informações</Text>
        </TouchableOpacity>
      </View>
    );
  }

  saveData(state) {
    let file = axios({
      method: "GET",
      url: "https://viacep.com.br/ws/"+state.cep+"/json/"
    })
    
    file.then(async (res) => {
      await AsyncStorage.setItem('endereco', JSON.stringify(res.data));
      alert("CEP ok");
    }).catch((error => {
      alert(error);
    }))
  }

  displayData = async () => {
    try {
      let endereco = await AsyncStorage.getItem('endereco');
      let rawEndereco = JSON.parse(endereco);
      alert(rawEndereco.logradouro + '' +
            rawEndereco.complemento + " " +
            rawEndereco.bairro + " " +
            rawEndereco.localidade + " " +
            rawEndereco.uf +  " " +
            rawEndereco.unidade + " " +
            rawEndereco.ibge);
    } catch (error) {
      alert(error);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});