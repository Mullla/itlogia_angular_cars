import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  sendQuery(data: any) {
    return this.http.post('https://testologia.site/intensive-price', data);
  }

  getData(category: string) {
    return this.http.get('https://testologia.site/intensive-data', {params: {category: category}});
  }
}
