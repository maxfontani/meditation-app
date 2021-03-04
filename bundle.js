"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}var app=function(){var a=Math.floor,b=document.querySelector(".song"),c=document.querySelector("#play"),d=document.querySelector(".moving-outline circle"),e=document.querySelector("video"),f=document.querySelector("#track-circle"),g=document.querySelector("#moving-circle"),h=document.querySelectorAll(".sound-picker button"),i=document.querySelector(".time-display"),j=document.querySelectorAll(".time-select button"),k=d.getTotalLength(),l=120;navigator.serviceWorker?window.addEventListener("load",function(){navigator.serviceWorker.register("./sw.js")}):console.log("No service workers for hire..");var m=function(b){var c=a(b%60),d=a(b/60);return i.textContent="".concat(d.toLocaleString(void 0,{minimumIntegerDigits:2})," : ").concat(c.toLocaleString(void 0,{minimumIntegerDigits:2}))},n=function(a){a.paused?o():p()},o=function(){b.play(),e.play(),c.src="./svg/pause.svg"},p=function(){b.pause(),e.pause(),c.src="./svg/play.svg"},q=function(){d.style.strokeDasharray=k,d.style.strokeDashoffset=k,b.currentTime=0,i.textContent=m(l)};q(),function checkMedia(){1024<=screen.width?(e.setAttribute("poster","./video/poster_rain_large.jpg"),e.setAttribute("src","./video/rain_large.mp4"),document.querySelector("#bv2").setAttribute("data-video","./video/beach_large.mp4"),document.querySelector("#bv1").setAttribute("data-video","./video/rain_large.mp4"),document.querySelector("#bv1").setAttribute("data-poster","./video/poster_rain_large.jpg")):(e.setAttribute("poster","./video/poster_rain.jpg"),e.setAttribute("src","./video/rain.mp4"))}(),c.addEventListener("click",function(){n(b)}),h.forEach(function(a){a.addEventListener("click",function(){p(),q(),b.src=this.getAttribute("data-sound"),e.poster=this.getAttribute("data-poster"),e.src=this.getAttribute("data-video"),a.classList.contains("active")||(h.forEach(function(a){a.classList.remove("active")}),a.classList.add("active")),"bv2"===a.id?[].concat(_toConsumableArray(j),[c,i,d,f,g]).map(function(a){a.classList.add("play-beach")}):[].concat(_toConsumableArray(j),[c,i,d,f,g]).map(function(a){a.classList.remove("play-beach")})})}),j.forEach(function(b){b.addEventListener("click",function(){p(),q(),l=this.getAttribute("data-time"),i.textContent="".concat(a(l/60).toLocaleString(void 0,{minimumIntegerDigits:2}),":").concat(a(l%60).toLocaleString(void 0,{minimumIntegerDigits:2})),b.classList.contains("active")||(j.forEach(function(a){a.classList.remove("active")}),b.classList.toggle("active"))})}),b.ontimeupdate=function(){var a=b.currentTime,f=l-a,g=k-a/l*k;a>=l&&(b.pause(),e.pause(),g=0,b.currentTime=0,c.src="./svg/play.svg"),d.style.strokeDashoffset=g,i.textContent=m(f)}};app();
