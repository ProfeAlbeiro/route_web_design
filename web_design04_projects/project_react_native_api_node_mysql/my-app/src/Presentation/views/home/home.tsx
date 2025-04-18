import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../componentes/RoundedButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from '../../componentes/CustomTextInput';
import  useViewModel  from './ViewModel';
import styles from './Styles';

export const HomeScreen = () => {

  const {email, password, errorMessage, user, onChange, login} = useViewModel();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (errorMessage !== '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);
  
  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined) {
      navigation.replace('ProfileInfoScreen');
    }
  }, [user]);

  return (
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/chef.jpg')}
          style={styles.imageBackground}
        />
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../../assets/logo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>FOOD APP</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formText}>INGRESAR</Text>
          <CustomTextInput
            image = {require('../../../../assets/email.png')}
            placeholder = 'Correo Electrónico'
            keyboardType = 'email-address'
            property = 'email'
            onChangeText = { onChange }
            value = {email}
          />
          <CustomTextInput
            image = {require('../../../../assets/password.png')}
            placeholder = 'Contraseña'
            keyboardType = 'default'
            property = 'password'
            onChangeText = { onChange }
            value = {password}
            secureTextEntry = { true }
          />
          <View style={{ marginTop: 30 }}>
            <RoundedButton text='ENVIAR' onPress={ () => login() } />
          </View>
          <View style={styles.formRegister}>
            <Text>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={ () => navigation.navigate('RegisterScreen') }>
              <Text style={styles.formRegisterText}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}