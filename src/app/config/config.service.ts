import { Injectable } from '@angular/core';
import { appConstants } from '../app.constants';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private data: any;
  private http = HttpService;
  constructor() { }

  public get configData() {
    if (!this.data) {
      return this.getConfig().then((response: any) => {
        this.data = response.data;
        return response.data;
      }).catch(console.log);
    } else {
      return this.data;
    }
  }
  private getConfig(): Promise<any> {
    return this.http.get(appConstants.apiUrls.config);
  }

}
