import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpClientGet } from 'src/core/http/services/core-http-client-get.service';
import { CoreHttpClientPost } from 'src/core/http/services/core-http-client-post.service';
//import { CoreHttpClientPut } from 'src/core/http/services/core-http-client-put.service'; // Assuming you have a CoreHttpClientPut service
import { CoreHttpClientDelete } from 'src/core/http/services/core-http-client-delete.service'; // Assuming you have a CoreHttpClientDelete service
import { CoreHttpClientPatch } from 'src/core/http/services/core-http-client-patch.service'; // Assuming you have a CoreHttpClientPatch service


export interface Tasks {
    name: string;
    taskTime: string;
  }

  @Injectable({
    providedIn: 'root'
  })

  export class TaskService {
     }
   