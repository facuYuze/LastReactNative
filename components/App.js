import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, TextInput, Modal, Button, StatusBar,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [editedTitle, setEditedTitle] = useState(""); 
  const [editedBody, setEditedBody] = useState(""); 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditedTitle(item.title);
    setEditedBody(item.body);
    setModalVisible(true);
  };

  const saveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editingItem.id
        ? { ...item, title: editedTitle, body: editedBody }
        : item
    );
    setData(updatedData);
    setModalVisible(false);
    setEditingItem(null);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Elemento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nuevo título"
              value={editedTitle}
              onChangeText={setEditedTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva descripción"
              value={editedBody}
              onChangeText={setEditedBody}
              multiline
            />
            <Button title="Guardar Cambios" onPress={saveEdit} />
            <Button
              title="Cancelar"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
