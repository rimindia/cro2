import { BaseRequestOptions } from '@angular/http';

export class CustomRequestOptions extends BaseRequestOptions {
    public token: string;
    constructor (customOptions?: any) {
    super();
            let user = JSON.parse(localStorage.getItem('user'));
            this.token = user && user.userToken;
            //console.log("token: "+this.token) ;
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Authorization', 'Bearer ' +this.token );
            
        }
}