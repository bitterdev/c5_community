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

import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Post} from '../../models/post';
import {Forum} from '../../enums/enums'
import {ThreadsProvider} from '../../providers/threads/threads';
import {SearchProvider} from '../../providers/search/search';

@Component({
    selector: 'page-add-new-discussion',
    templateUrl: 'add-new-discussion.html',
})
export class AddNewDiscussionPage {

    public title: string = '';
    public message: string = '';
    public forums: any[] = [];
    public selectedForum: string = '';
    public tags: string = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, private threadsProvider: ThreadsProvider, private alertCtrl: AlertController, public searchProvider: SearchProvider) {
        this.prepareForumArray();
    }

    createDiscussion() {
        let post = new Post;

        post.title = this.title;
        post.message = this.message;
        post.tags = this.tags;
        post.forum = this.selectedForum;
        post.timestamp = new Date;

        this.threadsProvider.createDiscussion(post).then(() => {
            let alert = this.alertCtrl.create({
                title: 'Successful',
                message: 'Your post has been successfully created.',
                buttons: [{
                    text: 'Close',
                    handler: data => {
                        this.searchProvider.refreshResults();
                        this.navCtrl.pop();
                    }
                }]
            });
            alert.present();
        }).catch((errorMessage) => {
            let alert = this.alertCtrl.create({
                title: 'Error',
                message: errorMessage,
                buttons: [{
                    text: 'Close'
                }]
            });
            alert.present();
        });
    }

    prepareForumArray() {
        this.forums.push({
            value: Forum.ChitChat,
            label: "Chit Chat"
        });

        this.forums.push({
            value: Forum.Editing,
            label: "Editing (v7+)"
        });

        this.forums.push({
            value: Forum.Developing,
            label: "Developing (v7+)"
        });

        this.forums.push({
            value: Forum.Jobs,
            label: "Jobs"
        });

        this.forums.push({
            value: Forum.Installation,
            label: "Installation Help"
        });

        this.forums.push({
            value: Forum.International,
            label: "Internationalization"
        });

        this.forums.push({
            value: Forum.Theme,
            label: "Themes"
        });

        this.forums.push({
            value: Forum.BlockRequests,
            label: "Block Requests"
        });

        this.forums.push({
            value: Forum.Marketplace,
            label: "Submit to Marketplace"
        });

        this.forums.push({
            value: Forum.Legacy,
            label: "Legacy (version 5.6.x-)"
        });

        this.forums.push({
            value: Forum.Old,
            label: "(OLD 5.7 Discussion)"
        });
    }
}
