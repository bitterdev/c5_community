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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Post} from '../../models/post';
import * as cheerio from 'cheerio';
import {JsonResponse} from "../../interfaces/interfaces";

@Injectable()
export class ThreadsProvider {

    public ccmToken: string;
    public threadId: string;

    constructor(public http: HttpClient) {

    }

    createDiscussion(post: Post): Promise<any> {
        return new Promise((resolve, reject) => {
            
            this.http.get("https://www.concrete5.org/community/forums", {responseType: 'text' }).subscribe(response => {
                var dom = cheerio.load(response);
                
                var createParams = {
                    "ccm_token": dom("#discussion-post-form-form input[name=ccm_token]").val(),
                    "cDiscussionPostParentID": "0",
                    "cDiscussionPostID": dom("input[name=cDiscussionPostID]").val(),
                    "discussionID": post.forum,
                    "subject": post.title,
                    "message": post.message,
                    "attachments[]": "",
                    "tags": post.tags,
                    "tags_multiple[]": "",
                    "track": "1",
                    "post": "Add Topic"
                }

                var formData = new FormData();

                for (var key in createParams) {
                    formData.append(key, createParams[key]);
                }

                this.http.post("https://www.concrete5.org/community/forums/-/add/", formData, {responseType: 'text' }).subscribe(response => {
                    let json = <JsonResponse> {};
                    var temp = /response((.*)')/g.exec(response)[0];

                    if (temp.length > 10) {
                        temp = temp.substr(10);
                        json = JSON.parse(temp.substr(0, temp.length - 1));
                    }

                    if (typeof json.errors === "undefined" || json.errors.length === 0) {
                        resolve();
                    } else {
                        reject(json.errors[0]);
                    }
                }, err => {
                    reject(err.message);
                });
                
            }, err => {
                reject(err.message);
            })
        });
    }
}
