import { Injectable } from '@angular/core';
import { appConstants } from '../app.constants';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private data: {currentLocale: any, i18n: any};
  private http = HttpService;
  constructor() {}

  public get configData() {
    if (!this.data) {
      return this.getConfig().then((response: any) => {
        this.data = response.data;
      }).catch(console.log);
    }
    return this.data;

  }

  public get i18n() {
    if (!this.data) {
      return this.getConfig().then((response: any) => {
        this.data = response.data;
      }).catch(console.log);
    }
    return this.data.i18n[this.data.currentLocale];

  }
  private getConfig(): Promise<any> {
    return this.http.get(appConstants.apiUrls.config);
  }

}
