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
import {Component} from '@angular/core';
import {NavController, Events, ActionSheetController, AlertController, LoadingController, Platform} from 'ionic-angular';
import {Thread} from '../../models/thread';
import {LoginPage} from '../login/login';
import {AddNewDiscussionPage} from '../add-new-discussion/add-new-discussion';
import {SearchFilterPage} from '../search-filter/search-filter';
import {DiscussionThreadPage} from '../discussion-thread/discussion-thread';
import {UserProvider} from '../../providers/user/user';
import {SearchProvider} from '../../providers/search/search';
import {Push, PushObject, PushOptions} from '@ionic-native/push';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private events: Events, private loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController, public user: UserProvider, public searchProvider: SearchProvider, private alertCtrl: AlertController, private http: HttpClient, private push: Push, private platform: Platform) {
        this.refreshResults();
        
        this.platform.ready().then(() => {
            this.initPushService();
            this.user.checkLoginState();
        });
        
        this.events.subscribe('refreshResults', () => {
            this.refreshResults();
        });
    }

    initPushService() {
        const options: PushOptions = {
            android: {
                senderID: '493644354091'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);
        
        pushObject.on('notification').subscribe((notification: any) => {
            if (notification.additionalData.foreground) {
                let thread = new Thread(this.http);
                thread.url = notification.additionalData.threadUrl;
                this.showThreadPage(thread);
            }
        });
        
        pushObject.on('registration').subscribe((registration: any) => {
            localStorage.setItem("deviceToken", registration.registrationId);
            
            this.user.checkLoginState().then(() => {
                this.user.commitDeviceToken();
            });
        });

        pushObject.on('error').subscribe((error) => {
            let alert = this.alertCtrl.create({
                title: 'Error',
                message: error.message,
                buttons: [{
                    text: 'Close'
                }]
            });

            alert.present();
        });
    }
    
    refreshResults(): Promise<any> {
        return new Promise((resolve, reject) => {
            let loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });

            loading.present();

            this.searchProvider.refreshResults().then(() => {
                loading.dismiss();
                resolve();

            }).catch((errorMessage) => {
                loading.dismiss();

                let alert = this.alertCtrl.create({
                    title: 'Error',
                    message: errorMessage,
                    buttons: [{
                        text: 'Close'
                    }]
                });

                alert.present();

                reject(errorMessage);
            });
        });
    }

    showLoginPage() {
        this.navCtrl.push(LoginPage);
    }

    openMenu() {
        let actionSheet = this.actionsheetCtrl.create({
            buttons: [
                {
                    text: 'Start New Discussion',
                    handler: () => {
                        if (this.user.isLogin) {
                            this.navCtrl.push(AddNewDiscussionPage);
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
                                        this.navCtrl.push(LoginPage);
                                    }
                                }]
                            });

                            alert.present();
                        }
                    }
                },
                {
                    text: 'Search Filter',
                    handler: () => {
                        this.navCtrl.push(SearchFilterPage);
                    }
                },
                {
                    text: 'Refresh',
                    handler: () => {
                        this.refreshResults();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ]
        });
        
        actionSheet.present();
    }

    showThreadPage(thread: Thread) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        thread.fetchPosts().then(() => {
            loading.dismiss();
            
            this.navCtrl.push(DiscussionThreadPage, {
                thread: thread
            });
            
        }).catch((errorMessage) => {
            loading.dismiss();
        
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

    toggleLogin() {
        if (this.user.isLogin) {
            let alert = this.alertCtrl.create({
                title: "Logout",
                message: "Are you sure?",
                buttons: [{
                    text: 'No',
                    role: 'cancel'
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.user.logout();
                    }
                }]
            });
            
            alert.present();
        } else {
            this.showLoginPage();
        }
    }

    refresh(refresher) {
        this.refreshResults().then(() => {
            refresher.complete();
        }).catch(() => {
            refresher.complete();
        });
    }

    infinite(infiniteScroll) {
        this.searchProvider.pageNumber++;

        this.searchProvider.fetchResults().then(() => {
            infiniteScroll.complete();
        }).catch((errorMessage) => {
            infiniteScroll.complete();
            
            let alert = this.alertCtrl.create({
                title: 'Error',
                message: errorMessage,
                buttons: [{
                    text: 'Close',
                    handler: data => {
                        this.navCtrl.pop();
                    }
                }]
            });

            alert.present();
        });
    }

}
