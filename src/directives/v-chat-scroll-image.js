/**
 * @name VueJS vChatScroll (vue-chat-scroll)
 * @description Monitors an element and scrolls to the bottom if a new child is added
 * @author Theodore Messinezis <theo@theomessin.com>
 * @file v-chat-scroll  directive definition
 */

const scrollToBottom = (el, smooth) => {
  if (typeof el.scroll === "function") {
    el.scroll({
      top: el.scrollHeight,
      behavior: smooth ? 'smooth' : 'instant'
    });
  } else {
    el.scrollTop = el.scrollHeight;
  }
};

const imageLoaded = (src, callback = () => {}) => {
  if (typeof callback !== 'function' || (typeof src !== 'string' || !src)) return;
  const image = new Image();
  image.src = src;
  if (image.complete) {
    callback();
  } else {
    image.onload = callback;
  }
}

const emit = (vnode, name, data) => {
  var handlers = (vnode.data && vnode.data.on) ||
    (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[name]) {
    handlers[name].fns(data);
  }
}

const vScrollDown = {
  bind: (el, binding, vnode) => {
    let scrolled = false;
    let timeout;

    el.addEventListener('scroll', e => {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(function() {
        scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
        if (el.scrollTop < 10) {
          emit(vnode, 'scroll-top', "123");
        }
      }, 200);
    });

    (new MutationObserver(e => {
      let config = binding.value || {};
      let pause = config.always === false && scrolled;

      if (config.scrollonremoved) {
        if (pause || e[e.length - 1].addedNodes.length != 1 && e[e.length - 1].removedNodes.length != 1) 
        return;
      } else {
        if (pause || e[e.length - 1].addedNodes.length != 1) return;
      }

      if (config.image) {
        e.forEach(function(mutation) {
          if (mutation.addedNodes.length != 1) return;
          mutation.addedNodes.forEach(node => {
            if (typeof node.querySelectorAll !== 'function') return;
            const imgs = node.querySelectorAll('img');
            imgs.forEach(img => {
              imageLoaded(img.getAttribute('src'), () => {
                scrollToBottom(el, config.smooth);
              });
            });
          });
        });
      }

      scrollToBottom(el, config.smooth);
    })).observe(el, { childList: true, subtree: true });

  },
  inserted: scrollToBottom
};

export default vScrollDown;