(function definePlugin($) {
  'use strict';
    // ======= END PRIVATE METHODS  ==============

    // ======= INIT PLUGIN   ==============
  var pluginName = 'dropdowncheckout';
    // if need to define default options
  var defaults = {
    propertyName: 'value'
  };

    /**
     *
     * @param {element} element where plugin is attached
     * @param {Object} options object to override defaults
     */
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.defaults = defaults;
    this.name = pluginName;

        // start plugin
    this.init();
  }

    // === PROTOTYPE OF PLUGIN
  Plugin.prototype = {
    init: function init() {
      this.prepareElements()
                .addDataAttributes()
                .createToggleBtns()
                .bindEvents();

      return this;
    },
    prepareElements: function () {
      this.$loCheckout = $(this.element).find('.lo-checkout__steps');
      this.$cards = this.$loCheckout.find('.card').not('.ghost, [class*="-summary"]');
      this.$cardsHeaders = this.$cards.find('.card-header');
      this.$cardsBodys = this.$cards.find('.card-body');

      return this;
    },
    addDataAttributes: function () {
            // by default expanded
      this.$cards.not('[aria-expanded]').attr('aria-expanded', 'true');

      return this;
    },
    createToggleBtns: function (params) {
      this.$cardsHeaders.each(function () {
        var $currentCardHeader = $(this);
        var $btnEdit = $currentCardHeader.find('.edit-button');
        var hasEditBtn = $btnEdit.length;

        if (hasEditBtn) {
          $btnEdit.addClass('btn-toggle js-btn-toggle');
        } else {
          $currentCardHeader.append('<span class="edit-button pull-right btn-toggle js-btn-toggle"></span>');
        }
      });

      return this;
    },
    bindEvents: function () {
      this.$loCheckout.on('click', '.card:not([class*="-summary"]) .card-header', function (evt) {
        var $card = $(this).closest('.card');
        var $header = $card.find('.card-header');
        var $btnToggle = $header.find('.btn-toggle');
        var $content = $card.find('.card-body');

                // @TODO find another condition to verify is open or closed
        if ($content.is(':hidden')) {
          $btnToggle.removeClass('btn-toggle--plus').addClass('btn-toggle--minus');
          $card.attr('aria-expanded', true);
          $content.slideDown('slow', function () {
            console.log('slideDown');
          });
        } else {
          $btnToggle.removeClass('btn-toggle--minus').addClass('btn-toggle--plus');
          $card.attr('aria-expanded', false);
          $content.slideUp('slow', function () {
            console.log('slideUp');
          });
        }
      });
    }
  };

  $.fn[pluginName] = function (options) { // eslint-disable-line no-param-reassign
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
      }
    });
  };
}(jQuery));


var exports = {
  initialize: function () {
    console.count('initalize dropdowncheckout 2');
    $('.js-lo-checkout').dropdowncheckout();
  }
};

module.exports = exports;
