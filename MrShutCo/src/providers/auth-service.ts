import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
    name: string;
    email: string;
    id: number;
    //Maybe, not sure yet
    token: string;

    constructor(name: string, email: string, id: number) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
}

@Injectable()
export class AuthService {
    currentUser: User;

    //TODO: Check against back in and generate OAuth token
    public login(credentials) {
        if (credentials.email === null || credentials.password === null) return Observable.throw("Please insert credentials");
        return Observable.create(observer => {
            let access = (credentials.password === "abc123" && credentials.email === "m1@tiltwire.com");
            //Generate OAuth token
            this.currentUser = new User('Tyler Safaric', 'tyler@email.com', 0);
            observer.next(access);
            observer.complete();
        });
    }

    //TODO: Implement Creating and storing user info in mySQL
    public register(credentials) {
        if (credentials.email === null || credentials.password === null) return Observable.throw("Please insert credentials");
        return Observable.create(observer => {
            observer.next(true);
            observer.complete();
        })
    }

    public getUserInfo() : User {
        return this.currentUser;
    }

    //TODO: destroy auth token
    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }
}