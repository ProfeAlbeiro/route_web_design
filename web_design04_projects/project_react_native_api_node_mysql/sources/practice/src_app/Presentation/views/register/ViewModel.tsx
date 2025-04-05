/**
 * View model for the register view
 * It handles the logic of the view and the state of the input values
 * values: State variable to handle the input values
 * setValues: Function to update the state values
 * onChange: Function to handle the change of the input values
 * register: Function to handle the register of the user
 * @returns {Object} - Object with the values and functions to handle the view
 */

import React, { useState } from "react"
import { ApiDelivery } from "../../../Data/sources/remote/api/ApiDelivery";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";

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

    const register = async () => {
        if (!isValidForm()) {
            const response = await RegisterAuthUseCase(values);
            console.log('Result' + JSON.stringify(response));
        }
    }

    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('El nombre es requerido');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('El apellido es requerido');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('El correo es requerido');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('El teléfono es requerido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('La confirmación de contraseña es requerida');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    return {
        ...values,
        onChange,
        register,
        errorMessage
    }
}

export default RegisterViewModel;

