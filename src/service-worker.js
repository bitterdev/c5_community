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

'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
    name: 'ionic-cache'
};

self.toolbox.precache(
    [
        './build/main.js',
        './build/vendor.js',
        './build/main.css',
        './build/polyfills.js',
        'index.html',
        'manifest.json'
    ]
);

self.toolbox.router.any('/*', self.toolbox.fastest);
self.toolbox.router.default = self.toolbox.networkFirst;
