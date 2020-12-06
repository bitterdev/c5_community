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

import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {SearchProvider} from '../providers/search/search';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {AddNewDiscussionPage} from '../pages/add-new-discussion/add-new-discussion';
import {SearchFilterPage} from '../pages/search-filter/search-filter';
import {DiscussionThreadPage} from '../pages/discussion-thread/discussion-thread';
import {UserProvider} from '../providers/user/user';
import {HttpClientModule} from '@angular/common/http';
import {InterceptorModule} from '../modules/http-request-interceptor';
import {ThreadsProvider} from '../providers/threads/threads';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Push} from '@ionic-native/push';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        ResetPasswordPage,
        AddNewDiscussionPage,
        SearchFilterPage,
        DiscussionThreadPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        InterceptorModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        ResetPasswordPage,
        AddNewDiscussionPage,
        SearchFilterPage,
        DiscussionThreadPage
    ],
    providers: [
        StatusBar,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        SearchProvider,
        UserProvider,
        ThreadsProvider,
        InAppBrowser,
        SplashScreen,
        Push
    ]
})
export class AppModule {}
