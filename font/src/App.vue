<template>
  <div id="app">
    <Header />
    <IndexMain :tmpBookmark="tmpBookmark" />
    <Footer />
    <IndexMask v-if="visibleDialog" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer"
import IndexMain from "./components/IndexMain"
import IndexMask from "./components/plugin/IndexMask"


export default {
  name: "App",
  components: {
    Header,
    Footer,
    IndexMain,
    IndexMask
  },
  data() {
    return {
      visibleDialog: false,
      tmpBookmark: {}
    }
  }
};
</script>

<style>
#app {
  width: 100%;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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

input::placeholder {
  color: #999 !important;
}

a {
  background: transparent;
  text-decoration: none;
  color: #555;
}

a:active,
a:hover {
  outline: 0;
  border: 0;
  text-decoration: underline;
}

img {
  width: 100%;
  height: 100%;
  border: 0;
  vertical-align: middle;
}
button,
input,
select,
textarea {
  margin: 0;
  font: inherit;
  color: inherit;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-appearance: textfield;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

textarea {
  overflow: auto;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}

td,
th {
  padding: 0;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
input {
  border: none;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

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
  width: 960px;
  margin: 0 auto;
}

</style>
