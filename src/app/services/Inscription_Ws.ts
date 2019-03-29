import {} from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class Inscription_Ws {
    constructor(private http: Http) {}
    public inscription(id: string , mdp: string,profil:string): Promise<any> {
        let url = 'https://wsituhiu.herokuapp.com/api/signup?user='+id+'&mdp='+mdp+'&profil='+profil+'';
        console.log(url);
        /*const formdata = new FormData();
        formdata.append('user', id);
        formdata.append('mdp', mdp);*/
        return this.http.get(url).toPromise().then(this.toJson).catch(this.handleError);
      }
      public toJson(response: any) {
        return response.json() || {};
      }
      public handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
      }
}
