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

import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ActionSheetController, AlertController, Content} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import {Thread} from '../../models/thread';
import {HttpClient} from '@angular/common/http';
import {LoginPage} from '../login/login';

@Component({
    selector: 'page-discussion-thread',
    templateUrl: 'discussion-thread.html',
})
export class DiscussionThreadPage {

    @ViewChild(Content) content: Content;
    private thread: Thread;
    public replyMessage: string = '';

    constructor(public navCtrl: NavController, public actionsheetCtrl: ActionSheetController, public navParams: NavParams, private alertCtrl: AlertController, public user: UserProvider, public http: HttpClient) {
        this.thread = navParams.get('thread');
    }

    ionViewDidEnter() {
        this.content.scrollToBottom(0);
    }

    replyPost() {
        if (this.user.isLogin) {
            this.thread.reply(this.replyMessage).then(() => {
                this.replyMessage = "";
                this.content.scrollToBottom(0);
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
        } else {
            let alert = this.alertCtrl.create({
                title: "Please Login",
                message: "You have to login to continue.",
                buttons: [{
                    text: 'Abort',
                    role: 'cancel'
                }, {
                    text: 'Login',
                    handler: () => {
                        this.navCtrl.popToRoot().then(() => {
                            this.navCtrl.push(LoginPage);
                        }).catch(() => {
                            // Do nothing
                        });
                    }
                }]
            });
            
            alert.present();
        }
    }
    
}
