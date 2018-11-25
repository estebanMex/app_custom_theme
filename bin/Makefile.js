'use strict';

/* global cat, cd, cp, echo, exec, exit, find, ls, mkdir, pwd, rm, target, test */

require('shelljs/make');

target.compileFonts = function () {
    var fontsDir = 'cartridges/app_custom_theme/cartridge/static/default/fonts';
    mkdir('-p', fontsDir);
    cp('-r', 'node_modules/font-awesome/fonts/', 'cartridges/app_custom_theme/cartridge/static/default');
    cp('-r', 'node_modules/flag-icon-css/flags', fontsDir + '/flags');
};
