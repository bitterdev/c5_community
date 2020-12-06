/**
 * Project:     c5 community
 *
 * @copyright 2018 Fabian Bitter
 * 
 * @author Adrian Tillmann Geist (a.t.geist@gmx.de)
 * @author Fabian Bitter (fabian@bitter.de)
 * 
 * @version 1.0.0
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Platform} from 'ionic-angular';
import {Injectable} from '@angular/core';
import * as cheerio from 'cheerio';

@Injectable()
export class UserProvider {

    constructor(public http: HttpClient, private platform: Platform) {

    }

    public isLogin: Boolean = false;
    public username: string = "";

    public logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get("https://www.concrete5.org/login/-/logout/", {responseType: 'text'}).subscribe(response => {
                this.isLogin = false;
                this.username = "";
                resolve();
            }, err => {
                reject(err.message);
            });
        });
    }

    public checkLoginState(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get("https://www.concrete5.org/profile", {responseType: 'text'}).subscribe(response => {
                var dom = cheerio.load(response);
                
                this.isLogin = dom("a[href*=logout]").length >= 1;

                if (this.isLogin) {
                    this.determinateUsername(dom);
                }
                
                resolve();
            }, err => {
                reject(err);
            });
        });
    }

    private determinateUsername(dom: any) {
        this.username = dom(".profile-link").text();
    }

    public commitDeviceToken() {
        return new Promise((resolve, reject) => {
            let params = new HttpParams({
                fromObject: {
                    "username": this.username,
                    "uuid": localStorage.getItem("deviceToken"),
                    "platform": this.platform.is('ios') ? "ios" : "android"
                }
            });
            console.log(JSON.stringify({
                    "username": this.username,
                    "uuid": localStorage.getItem("deviceToken"),
                    "platform": this.platform.is('ios') ? "ios" : "android"
                }));
            this.http.get("https://c5community.bitter.de/index.php/register", {params: params}).subscribe(response => {
                resolve();
            }, err => {
                reject(err);
            });
        });
    }
    
    public login(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get("https://www.concrete5.org/login", {responseType: 'text'}).subscribe(response => {
                var dom = cheerio.load(response);
                var token = dom("input[name=ccm_token]").val();

                let params = new HttpParams({
                    fromObject: {
                        "uName": username,
                        "uPassword": password,
                        "ccm_token": token
                    }
                });

                this.http.post("https://www.concrete5.org/login/-/do_login", params, {
                    responseType: 'text'
                }).subscribe(response => {
                    dom = cheerio.load(response);

                    if (dom(".alert-error").length === 0) {
                        this.isLogin = true;
                        this.determinateUsername(dom);
                        
                        this.commitDeviceToken().then(() => {
                            resolve();
                        }).catch((err) => {
                            reject(err.message);
                        });
                    } else {
                        reject(dom(".alert-error").text().trim());
                    }
                }, err => {
                    reject(err.message);
                });
            }, err => {
                reject(err.message);
            });
        });
    }

    public resetPassword(email: string): Promise<any> {
         return new Promise((resolve, reject) => {
            this.http.get("https://www.concrete5.org/login", {responseType: 'text'}).subscribe(response => {
                var dom = cheerio.load(response);
                var token = dom("input[name=ccm_token]").val();

                let params = new HttpParams({
                    fromObject: {
                        "uEmail": email,
                        "ccm_token": token
                    }
                });

                this.http.post("https://www.concrete5.org/login/-/forgot_password/", params, {
                    responseType: 'text'
                }).subscribe(response => {
                    dom = cheerio.load(response);

                    if (dom(".alert-error").length === 0) {
                        resolve();
                    } else {
                        reject(dom(".alert-error").text().trim());
                    }
                }, err => {
                    reject(err.message);
                });
            }, err => {
                reject(err.message);
            });
        });
    }

}
