'use strict';

var processInclude = require('./util');

$(document).ready(function () {
  processInclude(require('./checkout/checkout'));
  processInclude(require('./checkout/dropdown-checkout.plugin'));
});
