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
import {Injectable} from '@angular/core';
import {Filter} from '../../models/filter';
import {Thread} from '../../models/thread';
import {Post} from '../../models/post';
import {JsonResponse} from "../../interfaces/interfaces";
import * as cheerio from 'cheerio';

@Injectable()
export class SearchProvider {

    public results: Thread[] = [];
    public filter: Filter;
    public pageNumber: number = 1;

    constructor(public http: HttpClient) {
        this.filter = new Filter();
    }

    refreshResults(): Promise<any> {
        this.pageNumber = 1;
        this.results = [];
        return this.fetchResults();
    }

    fetchResults(): Promise<any> {
        return new Promise((resolve, reject) => {
            var filterParams = {
                "ccm_paging_p": this.pageNumber.toString(),
                "mode": "json",
                "search_keywords": this.filter.searchTerm,
                "forum[]": this.filter.filterByForum,
                "sort": this.filter.sortBy,
                "answerFilter": this.filter.filterByAnswer,
                "submit_search": [1, 1].toString(),
                "forumSelectAll": "0",
                "poster": "",
                "posterUser": ""
            }

            let params = new HttpParams({
                fromObject: filterParams
            });
            
            this.http.get<JsonResponse>("https://www.concrete5.org/community/forums/-/view/", {params: params}).subscribe(response => {
                if (typeof response.html !== "undefined") {
                    let dom = cheerio.load(response.html);

                    dom(".discussion-post-topic .discussion-post").each((i, el) => {
                        let thread = new Thread(this.http);

                        thread.url = "https://www.concrete5.org/" + dom(el).find("h1 a").attr("href").substr(1) + "?displayStyle=flat";

                        let post = new Post();

                        post.title = dom(el).find("h1").text();
                        post.message = dom(el).find(".formatted-text").text();
                        post.username = dom(el).next().find("a[rel='author']").text();

                        var unparsedDate = dom(el).next().find(".discussion-post-by").text().trim();

                        post.timestamp = new Date([
                            /( on )(.*)( at )/g.exec(unparsedDate)[2].trim(),
                            /( at )(.*) (am|pm)/g.exec(unparsedDate)[2].trim(),
                            /( at )(.*) (am|pm)/g.exec(unparsedDate)[3].trim()
                        ].join(" "));

                        thread.postCollection.push(post);

                        this.results.push(thread);
                    });
                    resolve();
                } else {
                    resolve();
                }
            }, err => {
                reject(err.message);
            });
        });

    }
}
