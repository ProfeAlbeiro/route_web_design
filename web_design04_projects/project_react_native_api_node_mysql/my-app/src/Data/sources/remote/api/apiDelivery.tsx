import axios from "axios";

const ApiDelivery = axios.create({
  baseURL: 'http://192.168.137.1:3000/api',
  timeout: 20000, // 20 segundos
  headers: {
    'Content-Type': 'application/json'
  }
});

export { ApiDelivery }