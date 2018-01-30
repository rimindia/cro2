import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AccessPolicy} from './access-policy';
import { AuthService } from '../+auth/auth.service';
import { SessionStorageService } from 'app/services/session-storage.service';
import { Config } from '../shared/config/env.config';

@Injectable()
export class AccessPolicyService {

    /*allAccessUrl = "http://localhost:8080/accessPolicy/getAllAccessPolicies";*/
    constructor(private http:HttpClient, private auth: AuthService, private session: SessionStorageService) { }

    getAllAccess(): Observable<AccessPolicy[]> {
        return this.http.get(Config.BaseEndpoint +'accessPolicy/getAllAccessPolicies')
            .map(this.extractData)
            .catch(this.handleError);

    }

    createAccess(access: AccessPolicy): any {
        let cpHeaders= {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'})};

        return this.http.post(Config.BaseEndpoint +'accessPolicy/saveAccessPolicy', JSON.stringify(access), cpHeaders)
            .toPromise()
            .then((response: any) => {
                console.log("successfully saved");
                alert("successfully saved");
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);

            });
    }

    getAccessById(accessId: string): Observable<AccessPolicy> {
        let cpHeaders ={headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'})};
        return this.http.get(Config.BaseEndpoint+'accessPolicy/getAccessPolicyDetailsById/{id}', cpHeaders)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateAccess(access: AccessPolicy): any {
        let cpHeaders ={headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'})};
        return this.http.put(Config.BaseEndpoint +'accessPolicy/updateAccessPolicyDetails', JSON.stringify(access), cpHeaders)
            .toPromise()
            .then((response: any) => {
                console.log("successfully saved");
                alert("successfully saved");
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);

            });
    }

    deleteAccessById(accessId: string): any {
        let cpHeaders ={headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'})};
        return this.http.delete(Config.BaseEndpoint +'accessPolicy/deleteAccessPolicyDetails/{id}', cpHeaders)
            .toPromise()
            .then((response: any) => {
                console.log("successfully saved");
                alert("successfully saved");
                return response;
            })
            .catch((error) => {
                return Promise.reject(error);

            });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }

}
