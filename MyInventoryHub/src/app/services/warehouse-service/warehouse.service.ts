import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private baseUrl = 'http://localhost:3000/warehouses'; // Cambia al URL de tu backend

  constructor(private http: HttpClient) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Crear un almacén (solo dueños)
  createWarehouse(token: string, data: { name: string; location: string }): Observable<any> {
    return this.http.post(this.baseUrl, data, { headers: this.getHeaders(token) });
  }

  // Asignar empleado al almacén (solo dueños)
  assignEmployee(
    token: string,
    warehouseId: string,
    data: { username: string; permissions: string[] }
  ): Observable<any> {
    return this.http.post(`${this.baseUrl}/${warehouseId}/employees`, data, {
      headers: this.getHeaders(token),
    });
  }

  // Editar un almacén (solo dueños)
  updateWarehouse(
    token: string,
    warehouseId: string,
    data: { name?: string; location?: string }
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${warehouseId}`, data, {
      headers: this.getHeaders(token),
    });
  }

  // Eliminar un almacén (solo dueños)
  deleteWarehouse(token: string, warehouseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${warehouseId}`, {
      headers: this.getHeaders(token),
    });
  }

  // Eliminar un empleado de un almacén
  removeEmployee(
    token: string,
    warehouseId: string,
    employeeId: string
  ): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${warehouseId}/employees/${employeeId}`, {
      headers: this.getHeaders(token),
    });
  }

  // Listar empleados asignados a un almacén
  getWarehouseEmployees(token: string, warehouseId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${warehouseId}/employees`, {
      headers: this.getHeaders(token),
    });
  }

  // Obtener almacenes del usuario (dueño o empleado)
  getUserWarehouses(token: string): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders(token) });
  }
}