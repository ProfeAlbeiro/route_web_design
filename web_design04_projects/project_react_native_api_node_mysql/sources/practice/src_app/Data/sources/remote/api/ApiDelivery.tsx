/**
 * Create a new instance of axios with a custom config
 * Crea una nueva instancia de axios con una configuración personalizada
 * de la url del servidor y el tipo de contenido
 */

import axios from 'axios';

const ApiDelivery = axios.create({
    baseURL: 'http://192.168.0.4:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export { ApiDelivery}
