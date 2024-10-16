import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from './task.interface';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
//import { CoreHttpClientPut } from 'src/core/http/services/core-http-client-put.service'; // Assuming you have a CoreHttpClientPut service
import { CoreHttpClientDelete } from 'src/core/http/services/core-http-client-delete.service'; // Assuming you have a CoreHttpClientDelete service
import { CoreHttpClientPatch } from 'src/core/http/services/core-http-client-patch.service'; // Assuming you have a CoreHttpClientPatch service


  @Injectable({
    providedIn: 'root'
  })

  export class TaskService {
  private baseUrl = 'http://127.0.0.1:8000/api/tasks';
    constructor(
      private httpGet: CoreHttpClientGet,
      private httpPost: CoreHttpClientPost,
      //private httpPut: CoreHttpClientPut,
      private httpDelete: CoreHttpClientDelete,
      private httpPatch: CoreHttpClientPatch,
      

    ){}

    getTasks(): Observable<Tasks[]> {
      return this.httpGet.list(`${this.baseUrl}/list`);
    }

    getTaskById(id: number): Observable<Tasks> {
      return this.httpGet.one(`${this.baseUrl}/${id}`);
    }

    addTask(task: Tasks): Observable<Tasks> {
      return this.httpPost.post(`${this.baseUrl}`,task);
    }

    updateTask(id:number, task: Partial<Tasks>): Observable<Tasks> {
      return this.httpPatch.patch(`${this.baseUrl}/${id}`,task); 
    }

    deleteTask(id:number): Observable<void> {
      return this.httpDelete.delete(`${this.baseUrl}/${id}`);
    }

   
}