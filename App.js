import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, FlatList, CheckBox } from 'react-native';
import { CheckBox as CheckBoxNative } from 'react-native-elements';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [inputElement, setInputElement] = useState('');

  const handleAddTask = () => {
    if (inputElement.trim() === '') {
      alert('Digite um item por favor');
      return;
    }

    setTarefas([...tarefas, { text: inputElement, checked: false }]);
    setInputElement('');
  };

  const deletar = (posicao) => {
    setTarefas(tarefas.filter((_, index) => index !== posicao));
  };

  const handleCheckboxChange = (posicao) => {
    setTarefas(
      tarefas.map((task, index) =>
        index === posicao ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20,marginBottom: 15 , width: '100%', backgroundColor: '#4c913e', alignItems: 'center'}}>
        <Text style={styles.titulo}>Lista de Tarefas</Text>
      </View>
      <View id='tarefa' style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center'}}>
          <TextInput
            placeholder="Adicione uma tarefa 🔎"
            style={styles.tarefa}
            value={inputElement}
            onChangeText={setInputElement}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <Text style={styles.btnAdd}>Adicionar tarefa</Text>
          </TouchableOpacity>
        </View>
        <View id='lista'>
          <FlatList
            data={tarefas}
            renderItem={({item, index}) => (
              <View style={styles.listItem}>
                <CheckBoxNative
                  center
                  checked={item.checked}
                  onPress={() => handleCheckboxChange(index)}
                />
                <Text style={{ textDecorationLine: item.checked ? 'line-through' : 'none', paddingRight: "35%" }}>{item.text}</Text>
                <Button title="Deletar" color="red" onPress={() => deletar(index)} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo:{
    fontSize: 25,
    color: '#fff'
  },
  tarefa:{
   borderWidth: 1,
   margin: 10,
   width: '50%',
   textAlign: 'center',
   borderRadius: 20
  },
  btnAdd:{
    backgroundColor: '#4c913e',
    width: '100%',
    height: 30,
    margin: 10,
    textAlign: 'center',
    borderRadius: 20, 
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
    paddingTop: 5
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
});