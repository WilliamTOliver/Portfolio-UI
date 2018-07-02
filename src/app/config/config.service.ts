import { Injectable } from '@angular/core';
import { appConstants } from '../app.constants';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private data: {currentLocale: any, i18n: any};
  private http = HttpService;
  constructor() {
    const config = localStorage.getItem('config');
    if (config == null) {
      this.getConfig().then((response: any) => {
        localStorage.setItem('config', JSON.stringify(response.data));
        this.data = response.data;
      });
    } else {
      this.data = JSON.parse(localStorage.getItem('config'));
    }
  }

  public geti18n() {
    if (!this.data) {
      return this.getConfig().then((response: any) => {
        return response.i18n[response.currentLocale];
      }).catch(console.log);
    } else {
      return this.data.i18n[this.data.currentLocale];
    }
  }
  private getConfig(): Promise<any> {
    return this.http.get(appConstants.apiUrls.config);
  }

}
