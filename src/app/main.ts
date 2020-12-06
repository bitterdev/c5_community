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

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {enableProdMode} from '@angular/core';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
