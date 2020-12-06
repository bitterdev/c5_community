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

import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
         * Check if app is in production mode.
         * If not use ionic proxy to avoid CURS problems.
         */
        if (!document.URL.startsWith('file:///')) {
            const dupReq = req.clone({url: req.url.replace("https://www.concrete5.org", "")});
            return next.handle(dupReq);
        } else {
            const dupReq = req.clone();
            return next.handle(dupReq);
        }
    }
};

@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
    ]
})
export class InterceptorModule {}