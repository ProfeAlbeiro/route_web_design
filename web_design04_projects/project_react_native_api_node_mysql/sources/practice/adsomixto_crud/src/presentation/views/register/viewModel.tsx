import React, { useState} from 'react'
import { ApiDelivery } from '../../../Data/sourse/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';

const RegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }
     const register = async() => {
        if (!isValidForm()){
        const  response  = await RegisterAuthUseCase(values);
        console.log('result' + JSON.stringify(response));
        }
        
     }

     const isValidForm =(): boolean => {
      if (values.name === '') {
        setErrorMessage('El nombres es requerido');
        return false;
      }

      if (values.lastname === '') {
        setErrorMessage('El apellido es requerido');
        return false;
      }

      if (values.email === '') {
        setErrorMessage('El email es requerido');
        return false;
      }

      if (values.phone === '') {
        setErrorMessage('El telefono es requerido');
        return false;
      }

      if (values.password === '') {
        setErrorMessage('la contraseña es requerida');
        return false;
      }

      if (values.confirmPassword === '') {
        setErrorMessage('la confirmacion de la contraseña  es requerida');
        return false;
      }

      if (values.password === values.confirmPassword) {
        return false;
      }else{
        setErrorMessage('Las contraseñas no coinciden');
      return true;
     };
    }

  return {
    ...values,
    onChange,
    register,
    errorMessage
  }
}

export default RegisterViewModel;