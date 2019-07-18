(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['vue-chat-scroll-image'] = factory());
}(this, (function () { 'use strict';

/**
 * @name VueJS vChatScroll (vue-chat-scroll)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Theodore Messinezis <theo@theomessin.com>
 * @file v-chat-scroll  directive definition
 */

var scrollToBottom = function scrollToBottom(el, smooth) {
  if (typeof el.scroll === "function") {
    el.scroll({
      top: el.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant'
    });
  } else {
    el.scrollTop = el.scrollHeight;
  }
};

var imageLoaded = function imageLoaded(src) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (typeof callback !== 'function' || typeof src !== 'string' || !src) return;
  var image = new Image();
  image.src = src;
  if (image.complete) {
    callback();
  } else {
    image.onload = callback;
  }
};

var emit = function emit(vnode, name, data) {
  var handlers = vnode.data && vnode.data.on || vnode.componentOptions && vnode.componentOptions.listeners;

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
};

var vScrollDown = {
  bind: function bind(el, binding, vnode) {
    var scrolled = false;
    var timeout = void 0;

    el.addEventListener('scroll', function (e) {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(function () {
        scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
        if (el.scrollTop < 10) {
          emit(vnode, 'scroll-top', "123");
        }
      }, 200);
    });

    new MutationObserver(function (e) {
      var config = binding.value || {};
      var pause = config.always === false && scrolled;

      if (config.scrollonremoved) {
        if (pause || e[e.length - 1].addedNodes.length != 1 && e[e.length - 1].removedNodes.length != 1) return;
      } else {
        if (pause || e[e.length - 1].addedNodes.length != 1) return;
      }

      if (config.image) {
        e.forEach(function (mutation) {
          if (mutation.addedNodes.length != 1) return;
          mutation.addedNodes.forEach(function (node) {
            if (typeof node.querySelectorAll !== 'function') return;
            var imgs = node.querySelectorAll('img');
            imgs.forEach(function (img) {
              imageLoaded(img.getAttribute('src'), function () {
                scrollToBottom(el, config.smooth);
              });
            });
          });
        });
      }

      scrollToBottom(el, config.smooth);
    }).observe(el, { childList: true, subtree: true });
  },
  inserted: scrollToBottom
};

/**
 * @name VueJS vChatScroll (vue-chat-scroll)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Theodore Messinezis <theo@theomessin.com>
 * @file vue-chat-scroll plugin definition
 */

var VueChatScroll = {
  install: function install(Vue, options) {
    Vue.directive('chat-scroll', vScrollDown);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueChatScroll);
}

return VueChatScroll;

})));
