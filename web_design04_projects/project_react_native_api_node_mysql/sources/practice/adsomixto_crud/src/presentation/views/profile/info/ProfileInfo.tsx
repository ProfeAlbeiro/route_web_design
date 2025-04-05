import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../../../../App';
import useViewModel from './ViewModel';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from '../../../../Data/sourse/remote/api/api';
import Modal from 'react-native-modal';
import styles from './Styles';
interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props extends StackScreenProps<RootStackParamList, 'ProfileInfoScreen'> { };

export const ProfileInfoScreen = ({ navigation, route }: Props) => {
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
  
    const { removeSession } = useViewModel();
    return (

      
        //<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end',  }}>
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
            <Button
                onPress={() => {
                    removeSession();
                    navigation.navigate('HomeScreen');
                }}
                title="Cerrar Sesion"
            />
        </View>
        


    )
}
 