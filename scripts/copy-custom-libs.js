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

const existingConfig = require('../node_modules/@ionic/app-scripts/config/copy.config');

module.exports = Object.assign(existingConfig, {
    copyFontawesomeFonts: {
        src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
        dest: '{{WWW}}/assets/fonts'
    },
    copyFontawesomeCss: {
        src: ['{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
        dest: '{{WWW}}/assets/css'
    }
}
);