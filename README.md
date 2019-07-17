# vue-chat-scroll-image

Forked from 
  * [theomessin/vue-chat-scroll](https://github.com/theomessin/vue-chat-scroll)
  * [sj82516/vue-chat-scroll-top-load](https://github.com/sj82516/vue-chat-scroll-top-load)

Added new feature trigger scroll down when image messages loaded.

## Installation

- #### NPM / Yarn
  Run `npm install --save vue-chat-scroll-image`, or `yarn add vue-chat-scroll-image`

- #### With Modules

  ``` js
  // ES6
  import Vue from 'vue'
  import VueChatScroll from 'vue-chat-scroll-image'
  Vue.use(VueChatScroll)

  // ES5
  var Vue = require('vue')
  Vue.use(require('vue-chat-scroll-image'))
  ```

- #### `<script>` Include

  Just include `./dist/vue-chat-scroll-image.js` after Vue itself.

## Usage

There's nothing you need to do in JavaScript except for installation. To use the plugin, simply use the `v-chat-scroll` directive.

``` html
<ul class="messages" v-chat-scroll @scroll-top="loadNewData()">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
``` 

#### Prevent scroll down when user has scrolled up

Alternatively, you can pass a config value to the directive:

``` html
<ul class="messages" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
  <li class="message" v-for="n in messages">{{ n }}</li>
</ul>
```

#### Scroll when images loaded

``` html
<ul class="messages" v-chat-scroll={ image: true }>
  <li class="message" v-for="n in messages">
    <img src="IMAGE PATH" />
  </li>
</ul>
```

## License

[MIT](http://opensource.org/licenses/MIT)