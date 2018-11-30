!function (win, lib) {
  function init() {
      var rootFontSize = htmlEle.getBoundingClientRect().width / 10;
      htmlEle.style.fontSize = rootFontSize + "px";
      libFlexible.rem = win.rem = rootFontSize;
  }

  var timeOut = null;
  var document = win.document;
  var htmlEle = document.documentElement;
  var viewport = document.querySelector('meta[name="viewport"]');
  var flexible = document.querySelector('meta[name="flexible"]');
  var flexibleInX5 = document.querySelector('meta[name="flexible-in-x5"]');
  var bool1 = !0;
  var dpr = 0;
  var scale = 0;
  var libFlexible = lib.flexible || (lib.flexible = {});
  if (viewport) {
      console.warn("将根据已有的meta标签来设置缩放比例");
      var initialScale = viewport.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
      initialScale && (scale = parseFloat(initialScale[1]), dpr = parseInt(1 / scale));
  } else if (flexible) {
      var flexibleContent = flexible.getAttribute("content");
      if (flexibleContent) {
          var initialDpr = flexibleContent.match(/initial\-dpr=([\d\.]+)/);
          var maximumDpr = flexibleContent.match(/maximum\-dpr=([\d\.]+)/);
          initialDpr && (dpr = parseFloat(initialDpr[1]), scale = parseFloat((1 / dpr).toFixed(2)));
          maximumDpr && (dpr = parseFloat(maximumDpr[1]), scale = parseFloat((1 / dpr).toFixed(2)));
      }
  }
  if (flexibleInX5 && (bool1 = "false" !== flexibleInX5.getAttribute("content")), !dpr && !scale) {
      var chrome = win.chrome;
      var iphone = win.navigator.appVersion.match(/iphone/gi);
      var dpr2 = win.devicePixelRatio;
      var isTBS = /TBS\/\d+/.test(win.navigator.userAgent);
      var inWhiteList = !1;
      try {
          inWhiteList = "true" === localStorage.getItem("IN_FLEXIBLE_WHITE_LIST");
      } catch (e) {
          inWhiteList = !1;
      }
      scale = 1 / (dpr = iphone || chrome || isTBS && bool1 && inWhiteList ? dpr2 >= 3 && (!dpr || dpr >= 3) ? 3 : dpr2 >= 2 && (!dpr || dpr >= 2) ? 2 : 1 : 1)
  }
  if (htmlEle.setAttribute("data-dpr", dpr), !viewport) if ((viewport = document.createElement("meta")).setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no"), htmlEle.firstElementChild) htmlEle.firstElementChild.appendChild(viewport); else {
      var Eel = document.createElement("div");
      Eel.appendChild(viewport);
      document.write(Eel.innerHTML);
  }
  win.addEventListener("resize", function () {
      clearTimeout(timeOut);
      timeOut = setTimeout(init, 300);
  }, !1);
  win.addEventListener("pageshow", function (event) {
      if (event.persisted) {
          clearTimeout(timeOut);
          timeOut = setTimeout(init, 300);
      }
  }, !1);
  "complete" === document.readyState ? document.body.style.fontSize = 12 * dpr + "px" : document.addEventListener("DOMContentLoaded", function (e) {
      document.body.style.fontSize = 12 * dpr + "px"
  }, !1);
  init();
  libFlexible.dpr = win.dpr = dpr;
  libFlexible.refreshRem = init;
  libFlexible.rem2px = function (num) {
      var temp = parseFloat(num) * this.rem;
      "string" == typeof num && num.match(/rem$/) && (temp += "px");
      return temp;
  };
  libFlexible.px2rem = function (num) {
      var temp = parseFloat(num) / this.rem;
      "string" == typeof num && num.match(/px$/) && (temp += "rem");
      return temp;
  }
}(window, window.lib || (window.lib = {}));
