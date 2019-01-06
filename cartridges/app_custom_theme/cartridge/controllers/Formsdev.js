'use strict';

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.get(
    'Show',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var URLUtils = require('dw/web/URLUtils');
        var Resource = require('dw/web/Resource');

        var target = req.querystring.rurl || 1;

        var rememberMe = false;
        var userName = '';
        var actionUrl = URLUtils.url('Account-Login', 'rurl', target);
        var createAccountUrl = URLUtils.url('Account-SubmitRegistration', 'rurl', target).relative().toString();
        var navTabValue = req.querystring.action;

        if (req.currentCustomer.credentials) {
            rememberMe = true;
            userName = req.currentCustomer.credentials.username;
        }

        var breadcrumbs = [
            {
                htmlValue: Resource.msg('global.home', 'common', null),
                url: URLUtils.home().toString()
            }
        ];

        var profileForm = server.forms.getForm('profile');
        var formBase = profileForm.base;
        profileForm.clear();

        res.render('/forms/login', {
            navTabValue: navTabValue || 'login',
            rememberMe: rememberMe,
            userName: userName,
            actionUrl: actionUrl,
            profileForm: profileForm,
            breadcrumbs: breadcrumbs,
            oAuthReentryEndpoint: 1,
            createAccountUrl: createAccountUrl
        });

        next();
    }
);

module.exports = server.exports();
