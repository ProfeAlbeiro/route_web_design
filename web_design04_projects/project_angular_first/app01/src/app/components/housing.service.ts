import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor() { }
  
  url = 'http://localhost/api_php_angular/backend/controllers/Locations.php';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const data = await fetch(this.url);
      if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
      }
      const response = await data.json();
      return response.datos; // Devuelve el arreglo de datos
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return []; // Devuelve un arreglo vacío en caso de error
    }
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const url = `${this.url}/${id}`;
    console.log('URL de la API:', url);
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Error HTTP: ${data.status}`);
      }
      const response = await data.json();
      return response.datos.find((item: HousingLocation) => item.id === id); // Busca el elemento por id
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return undefined;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`FirstName: ${firstName} - LastName: ${lastName} - Email: ${email}`);
  }
}
