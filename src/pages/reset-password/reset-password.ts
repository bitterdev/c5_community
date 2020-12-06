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
import {UserProvider} from '../../providers/user/user';

@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

    private email: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider, private alertCtrl: AlertController) {

    }

    resetPassword() {
        if (this.email == null){
            let alert = this.alertCtrl.create({
                title: 'Error',
                message: 'Please enter your email.',
                buttons: [{
                    text: 'Close'
                }]
            });
            alert.present();
        }else {
            this.user.resetPassword(this.email).then(() => {
                let alert = this.alertCtrl.create({
                    title: 'Successfull',
                    message: 'Your Password has been resetted. Please check your emails.',
                    buttons: [{
                        text: 'Close',
                        handler: data => {
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
    }

}
