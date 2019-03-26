import {} from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class Login_ws {
    constructor(private http: Http) {}
    public connecter(id: string , mdp: string): Promise<any> {
        const url = 'http://thawing-tor-95959.herokuapp.com/ws/client/login';
        const formdata = new FormData();
        formdata.append('identifiant', id);
        formdata.append('password', mdp);
        return this.http.post(url, formdata).toPromise().then(this.toJson).catch(this.handleError);
      }
      public toJson(response: any) {
        return response.json() || {};
      }
      public handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
      }
}
