import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
//import { CoreHttpClientPut } from 'src/core/http/services/core-http-client-put.service'; // Assuming you have a CoreHttpClientPut service
import { CoreHttpClientDelete } from 'src/core/http/services/core-http-client-delete.service'; // Assuming you have a CoreHttpClientDelete service
import { CoreHttpClientPatch } from 'src/core/http/services/core-http-client-patch.service'; // Assuming you have a CoreHttpClientPatch service

export interface Category {
  id: number;
  name: string;
  description?: string;  // Add more fields as per your database structure
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  constructor(
    private httpGet: CoreHttpClientGet,
    private httpPost: CoreHttpClientPost,
    //private httpPut: CoreHttpClientPut,
    private httpDelete: CoreHttpClientDelete,
    private httpPatch: CoreHttpClientPatch
  ) {}

  // GET /api/categories - Fetch all categories
  listAll(): Observable<Category[]> {
    return this.httpGet.list('categories'); // Adjust API route as necessary
  }

  // GET /api/categories/{id} - Fetch a specific category by ID
  getOne(id: number): Observable<Category> {
    return this.httpGet.one(`categories/${id}`);
  }

  // POST /api/categories - Create a new category
  createCategory(categoryData: any): Observable<any> {
    return this.httpPost.post('categories', categoryData);
  }

  // PUT /api/categories/{id} - Replace an existing category
  //updateCategory(id: number, categoryData: any): Observable<any> {
    //return this.httpPut.put(`categories/${id}`, categoryData);
 // }

  // DELETE /api/categories/{id} - Remove a category
  deleteCategory(id: number): Observable<any> {
    return this.httpDelete.delete(`categories/${id}`);
  }

  // PATCH /api/categories/{id} - Partially update a category
  patchCategory(id: number, categoryData: any): Observable<any> {
    return this.httpPatch.patch(`categories/${id}`, categoryData);
  }
}
