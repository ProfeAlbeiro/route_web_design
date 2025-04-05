import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from './api';
import Modal from 'react-native-modal';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    const newProduct = await createProduct({ name, price });
    setProducts([...products, newProduct]);
    setName('');
    setPrice('');
  };

  const handleUpdateProduct = async () => {
    if (selectedProductId !== null) {
      const updatedProduct = await updateProduct(selectedProductId, { name, price });
      setProducts(products.map(product => product.id === selectedProductId ? updatedProduct : product));
      setSelectedProductId(null);
      setName('');
      setPrice('');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const handleSearchProduct = async () => {
    const product = await getProductById(parseInt(searchId));
    setSearchedProduct(product);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productText}>{item.name} - ${item.price}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => {
                setName(item.name);
                setPrice(item.price.toString());
                setSelectedProductId(item.id);
              }}>
                <Text style={styles.buttonText}>Modificar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDeleteProduct(item.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={selectedProductId ? handleUpdateProduct : handleAddProduct}>
        <Text style={styles.addButtonText}>{selectedProductId ? "Modificar Producto" : "Crear Producto"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Numero de ID"
        value={searchId}
        onChangeText={setSearchId}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchProduct}>
        <Text style={styles.searchButtonText}>Buscar Producto</Text>
      </TouchableOpacity>
      {searchedProduct && (
        <View style={styles.productContainer}>
          <Text style={styles.productText}> Producto Buscado: {searchedProduct.name} - ${searchedProduct.price}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.reportButton} onPress={toggleModal}>
        <Text style={styles.reportButtonText}>Generar Reporte</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Reporte de Productos</Text>
          {products.map(product => (
            <Text key={product.id} style={styles.modalText}>{product.name} - ${product.price}</Text>
          ))}
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reportButton: {
    backgroundColor: '#9C27B0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  reportButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductsScreen;