<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(document.documentElement.clientHeight);
  }
};
</script>

<style lang="scss">
$base-color: #212121;
$hover-color: #00a1d6;
$select-color: #73c9e5;
html {
  width: 100%;
  height: 100%;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

body {
  font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  line-height: 1.5;
  color: $base-color;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

* ::selection {
  background: $select-color;
  color: inherit;
}

img {
  vertical-align: middle;
  border-style: none;
}

a {
  color: $base-color;
  background-color: transparent;
  text-decoration: none;
  outline: none;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
  &:hover {
    color: $hover-color;
  }
}

ol,
ul {
  list-style: none;
}

li {
  text-align: -webkit-match-parent;
}

:focus,
a:focus {
  outline: none;
}

a,
area,
button,
input:not([type="range"]),
label,
select,
summary,
textarea {
  -ms-touch-action: manipulation;
  touch-action: manipulation;
}

input {
  padding: 0 10px;
  border-radius: 4px;
  outline: none;
  transition: 0.3s;
  border: 1px solid #e5e5e5;
  &:focus {
    border: 1px solid $hover-color;
  }
}

input[type="number"],
input[type="password"],
input[type="text"],
textarea {
  -webkit-appearance: none;
}

input[type="checkbox"] {
  -webkit-appearance: checkbox;
}

button {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
input[type="button"],
input[type="checkbox"] input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
  &:hover {
    color: $hover-color;
  }
}

button[disabled],
input[disabled] {
  cursor: default;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(50, 50, 50, 0.25);
  border: 2px solid transparent;
  border-radius: 10px;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(50, 50, 50, 0.5);
}

::-webkit-scrollbar-track {
  background-color: rgba(50, 50, 50, 0.05);
}

::-ms-clear,
::-ms-reveal {
  display: none;
}

.cursor {
  cursor: pointer;
  &:hover {
    color: $hover-color;
  }
}
</style>

<style lang="scss">
.clearfix::before,
.clearfix::after {
  clear: both;
  content: " ";
  display: table;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.container {
  max-width: 960px;
  padding: 0 15px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .col-xs {
    display: none;
  }
}

.slide {
  position: relative;
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.45s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%) !important;
}

.toast {
  position: fixed;
  z-index: 99999;
  min-width: 400px;
  padding: 15px;
  border-radius: 4px;
  white-space: nowrap;
  background-color: #f3f3f3;
  text-align: center;
  color: red;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
}
</style>
