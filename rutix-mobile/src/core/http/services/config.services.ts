import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpCoreConfig {
  param = {
    backend_url: environment.backend_url,
  };

  getBackendUrl() {
    return this.param.backend_url;
  }
}
