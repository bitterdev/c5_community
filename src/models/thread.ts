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

import {Post} from '../models/post';
import {HttpClient} from '@angular/common/http';
import {JsonResponse} from "../interfaces/interfaces";
import * as cheerio from 'cheerio';

export class Thread {

    public postCollection: Post[] = [];
    public url: string;
    public ccmToken: string;
    public threadId: string;

    constructor(public http: HttpClient) {

    }

    getLastPost() {
        return this.postCollection[this.postCollection.length - 1];
    }

    reply(replyMessage: string): Promise<any> {
        var replyParams = {
            "ccm_token": this.ccmToken,
            "cDiscussionPostID": this.threadId,
            "cDiscussionPostParentID": "0",
            "message": replyMessage
        }
        
        var formData = new FormData();

        for (var key in replyParams ) {
            formData.append(key, replyParams[key]);
        }

        var replyUrl = "";

        if (this.url.indexOf("#") > 0) {
            replyUrl = this.url.substring(0, this.url.indexOf("#")) + "-/reply/";
        } else {
            replyUrl = this.url + "/-/reply/";
        }
        
        return new Promise((resolve, reject) => {
            if (replyMessage.length === 0) {
                reject("Message can not be empty.");
                return;
            }
        
            this.http.post(replyUrl, formData, { responseType: 'text' }).subscribe(response => {
                let json = <JsonResponse> {};
                var temp = /response((.*)')/g.exec(response)[0];
                
                if (temp.length > 10) {
                    temp = temp.substr(10);
                    json = JSON.parse(temp.substr(0, temp.length - 1));
                }
                
                if (typeof json.errors === "undefined" || json.errors.length === 0) {
                    this.fetchPosts().then(() => {
                        resolve();
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    reject(json.errors[0]);
                }
                
            }, err => {
                reject(err.message);
            });
        });
    }

    fetchPosts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.url, {responseType: 'text'}).subscribe(response => {
                let dom = cheerio.load(response);
                
                this.ccmToken = dom("input[name=ccm_token]").val();
                this.threadId = dom("input[name=cDiscussionPostID]").val();
                this.postCollection = [];

                // init post
                let post = new Post();

                post.title = dom("#discussion-top-post-content h2").text();
                post.message = dom("#discussion-top-post-content .formatted-text").text();
                post.username = dom("#discussion-top-post-user-info .user-info h1").text();
                post.pictureURL = "https://www.concrete5.org/" + dom("#discussion-top-post-user-info .u-avatar").attr("src");
                post.timestamp = new Date(dom("#discussion-top-post-content .details time").text().replace(" at ", ","));

                this.postCollection.push(post);

                dom('#discussion-replies section').each((i, el) => {
                    let post = new Post();

                    post.title = dom("#discussion-top-post-content h2").text();
                    post.message = dom(el).find(".formatted-text").text();
                    post.pictureURL = "https://www.concrete5.org/" + dom(el).find('.u-avatar').attr("src");
                    post.username = dom(el).find('.details > strong').text();
                    post.timestamp = new Date(dom(dom(el).find('time').get(0)).text() + " " + dom(dom(el).find('time').get(1)).text());

                    this.postCollection.push(post);
                });

                resolve();

            }, err => {
                reject(err.message);
            });
        });
    }

}