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
import {ActionSheetController, AlertController, NavController, LoadingController, NavParams} from 'ionic-angular';
import {ResetPasswordPage} from '../reset-password/reset-password';
import {UserProvider} from '../../providers/user/user';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private username: string;
    private password: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, public actionsheetCtrl: ActionSheetController, public user: UserProvider, private alertCtrl: AlertController) {

    }

    openMenu() {
        let actionSheet = this.actionsheetCtrl.create({
            buttons: [
                {
                    text: 'Sign In',
                    handler: () => {
                        this.login();
                    }
                },
                {
                    text: 'Forgot Your Password',
                    handler: () => {
                        this.navCtrl.push(ResetPasswordPage);
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

    login() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        this.user.login(this.username, this.password).then(() => {
            loading.dismiss();
            this.navCtrl.pop();
            
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
}
