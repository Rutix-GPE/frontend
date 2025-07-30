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
    constructor(
      private httpGet: CoreHttpClientGet,
      private httpPost: CoreHttpClientPost,
      private httpDelete: CoreHttpClientDelete,
      private httpPatch: CoreHttpClientPatch,
    ){}

    getTasksByUser(): Observable<Tasks[]> {
      return this.httpGet.list(`task/get-by-user`);
    }

    addTask(task: Tasks): Observable<Tasks> {
      task.description = "vide";
      return this.httpPost.post(`user-task/create`,task);
    }

    updateTask(id:number, task: Partial<Tasks>): Observable<Tasks> {
      return this.httpPatch.patch(`user-task/update/${id}`,task);
    }

    getTasksByUserAndTime(time: string): Observable<Tasks[]> {
      return this.httpGet.list(`task/get-by-user-and-time/${time}`);
    }

    getTasksByUserForToday(): Observable<Tasks[]> {
      const today = new Date().toISOString().split('T')[0]; // Obtenir la date du jour au format 'YYYY-MM-DD'
      return this.httpGet.list(`user-task/get-by-user-and-date/${today}`);
    }

    deleteTask(id: number): Observable<any> {
      return this.httpDelete.delete(`user-task/delete/${id}`);
    }

}
