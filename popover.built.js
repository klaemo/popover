!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.Popover=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function bodyOffset(e){var t=e.offsetTop,n=e.offsetLeft;return support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(e.style.marginTop||0),n+=parseFloat(e.style.marginLeft||0)),{top:t,left:n}}var support=require("dom-support"),getDocument=require("get-document"),withinElement=require("within-element");module.exports=function(e){var t=getDocument(e);if(t&&withinElement(e,t)){var n=t.body;if(n===e)return bodyOffset(e);var o={top:0,left:0};if("undefined"!=typeof e.getBoundingClientRect&&(o=e.getBoundingClientRect(),e.collapsed&&0===o.left&&0===o.top)){var r=t.createElement("span");r.appendChild(t.createTextNode("​")),e.insertNode(r),o=r.getBoundingClientRect();var i=r.parentNode;i.removeChild(r),i.normalize()}var l=t.documentElement,f=l.clientTop||n.clientTop||0,p=l.clientLeft||n.clientLeft||0,a=window.pageYOffset||l.scrollTop,d=window.pageXOffset||l.scrollLeft;return{top:o.top+a-f,left:o.left+d-p}}};
},{"dom-support":2,"get-document":4,"within-element":5}],2:[function(require,module,exports){
var domready=require("domready");module.exports=function(){var e,t,n,i,o,l,d,a,s,c,r,p=document.createElement("div");if(p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",t=p.getElementsByTagName("*"),n=p.getElementsByTagName("a")[0],!t||!n||!t.length)return{};i=document.createElement("select"),o=i.appendChild(document.createElement("option")),l=p.getElementsByTagName("input")[0],n.style.cssText="top:1px;float:left;opacity:.5",e={leadingWhitespace:3===p.firstChild.nodeType,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(n.getAttribute("style")),hrefNormalized:"/a"===n.getAttribute("href"),opacity:/^0.5/.test(n.style.opacity),cssFloat:!!n.style.cssFloat,checkOn:"on"===l.value,optSelected:o.selected,getSetAttribute:"t"!==p.className,enctype:!!document.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==document.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===document.compatMode,submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},l.checked=!0,e.noCloneChecked=l.cloneNode(!0).checked,i.disabled=!0,e.optDisabled=!o.disabled;try{delete p.test}catch(m){e.deleteExpando=!1}if(!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",r=function(){e.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",r)),l=document.createElement("input"),l.value="t",l.setAttribute("type","radio"),e.radioValue="t"===l.value,l.setAttribute("checked","checked"),l.setAttribute("name","t"),p.appendChild(l),d=document.createDocumentFragment(),d.appendChild(p.lastChild),e.checkClone=d.cloneNode(!0).cloneNode(!0).lastChild.checked,e.appendChecked=l.checked,d.removeChild(l),d.appendChild(p),!p.addEventListener)for(s in{submit:!0,change:!0,focusin:!0})a="on"+s,c=a in p,c||(p.setAttribute(a,"return;"),c="function"==typeof p[a]),e[s+"Bubbles"]=c;return domready(function(){var t,n,i,o,l="padding:0;margin:0;border:0;display:block;overflow:hidden;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",d=document.getElementsByTagName("body")[0];d&&(t=document.createElement("div"),t.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",d.insertBefore(t,d.firstChild),n=document.createElement("div"),t.appendChild(n),n.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=n.getElementsByTagName("td"),i[0].style.cssText="padding:0;margin:0;border:0;display:none",c=0===i[0].offsetHeight,i[0].style.display="",i[1].style.display="none",e.reliableHiddenOffsets=c&&0===i[0].offsetHeight,n.innerHTML="",n.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",e.boxSizing=4===n.offsetWidth,e.doesNotIncludeMarginInBodyOffset=1!==d.offsetTop,window.getComputedStyle&&(e.pixelPosition="1%"!==(window.getComputedStyle(n,null)||{}).top,e.boxSizingReliable="4px"===(window.getComputedStyle(n,null)||{width:"4px"}).width,o=document.createElement("div"),o.style.cssText=n.style.cssText=l,o.style.marginRight=o.style.width="0",n.style.width="1px",n.appendChild(o),e.reliableMarginRight=!parseFloat((window.getComputedStyle(o,null)||{}).marginRight)),"undefined"!=typeof n.style.zoom&&(n.innerHTML="",n.style.cssText=l+"width:1px;padding:1px;display:inline;zoom:1",e.inlineBlockNeedsLayout=3===n.offsetWidth,n.style.display="block",n.style.overflow="visible",n.innerHTML="<div></div>",n.firstChild.style.width="5px",e.shrinkWrapBlocks=3!==n.offsetWidth,t.style.zoom=1),d.removeChild(t),t=n=i=o=null)}),d.removeChild(p),t=n=i=o=l=d=p=null,e}();
},{"domready":3}],3:[function(require,module,exports){
!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==typeof define.amd?define(t):this[e]=t()}("domready",function(){var e,t=[],n=document,o=n.documentElement.doScroll,d="DOMContentLoaded",f=(o?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return f||n.addEventListener(d,e=function(){for(n.removeEventListener(d,e),f=1;e=t.shift();)e()}),function(e){f?e():t.push(e)}});
},{}],4:[function(require,module,exports){
function getDocument(e){return e.nodeType===DOCUMENT_NODE?e:"undefined"!=typeof e.ownerDocument&&e.ownerDocument.nodeType===DOCUMENT_NODE?e.ownerDocument:"undefined"!=typeof e.document&&e.document.nodeType===DOCUMENT_NODE?e.document:e.parentNode?getDocument(e.parentNode):e.commonAncestorContainer?getDocument(e.commonAncestorContainer):e.startContainer?getDocument(e.startContainer):e.baseNode?getDocument(e.baseNode):void 0}module.exports=getDocument;var DOCUMENT_NODE=9;
},{}],5:[function(require,module,exports){
module.exports=function(n,r){if(!n)return!1;n.commonAncestorContainer?n=n.commonAncestorContainer:n.endContainer&&(n=n.endContainer);for(var e=n;e=e.parentNode;)if(e==r)return!0;return!1};
},{}],6:[function(require,module,exports){
function parse(e,t){if("string"!=typeof e)throw new TypeError("String expected");t||(t=document);var a=/<([\w:]+)/.exec(e);if(!a)return t.createTextNode(e);e=e.replace(/^\s+|\s+$/g,"");var r=a[1];if("body"==r){var l=t.createElement("html");return l.innerHTML=e,l.removeChild(l.lastChild)}var i=map[r]||map._default,p=i[0],o=i[1],d=i[2],l=t.createElement("div");for(l.innerHTML=o+e+d;p--;)l=l.lastChild;if(l.firstChild==l.lastChild)return l.removeChild(l.firstChild);for(var n=t.createDocumentFragment();l.firstChild;)n.appendChild(l.removeChild(l.firstChild));return n}module.exports=parse;var div=document.createElement("div");div.innerHTML='  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';var innerHTMLBug=!div.getElementsByTagName("link").length;div=void 0;var map={legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],_default:innerHTMLBug?[1,"X<div>","</div>"]:[0,"",""]};map.td=map.th=[3,"<table><tbody><tr>","</tr></tbody></table>"],map.option=map.optgroup=[1,'<select multiple="multiple">',"</select>"],map.thead=map.tbody=map.colgroup=map.caption=map.tfoot=[1,"<table>","</table>"],map.text=map.circle=map.ellipse=map.line=map.path=map.polygon=map.polyline=map.rect=[1,'<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',"</svg>"];
},{}],7:[function(require,module,exports){
function Emitter(t){return t?mixin(t):void 0}function mixin(t){for(var e in Emitter.prototype)t[e]=Emitter.prototype[e];return t}module.exports=Emitter,Emitter.prototype.on=Emitter.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},Emitter.prototype.once=function(t,e){function i(){r.off(t,i),e.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},i.fn=e,this.on(t,i),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var i=this._callbacks[t];if(!i)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var r,s=0;s<i.length;s++)if(r=i[s],r===e||r.fn===e){i.splice(s,1);break}return this},Emitter.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),i=this._callbacks[t];if(i){i=i.slice(0);for(var r=0,s=i.length;s>r;++r)i[r].apply(this,e)}return this},Emitter.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},Emitter.prototype.hasListeners=function(t){return!!this.listeners(t).length};
},{}],8:[function(require,module,exports){
"use strict";function Popover(t){if(!(this instanceof Popover))return new Popover(t);Emitter.call(this),this.opts=t||{},this.el=domify("string"==typeof t.template?t.template:template);var o=this.opts.className?this.opts.className.split(" "):[];o.forEach(function(t){this.el.classList.add(t)},this),this.button=t.button;var i=this.button.getBoundingClientRect(),e=offset(this.button);this.buttonCoords={top:e.top,left:e.left,height:i.height,width:i.width}}var domify=require("domify"),offset=require("document-offset"),Emitter=require("emitter-component"),template='<div class="popover">\r\n  <div class="popover-arrow"></div>\r\n  <div class="popover-content"></div>\r\n</div>';module.exports=Popover,Emitter(Popover.prototype),Popover.prototype.show=Popover.prototype.render=function(t){var o=this;return document.body.appendChild(this.el),this.opts.position=this.opts.position||"right",this.position(this.opts.position),setTimeout(function(){o.el.classList.add(t||"show")},0),this.emit("show"),this},Popover.prototype.destroy=Popover.prototype.remove=function(){this.button=null,this.el.parentNode.removeChild(this.el),this.emit("remove")},Popover.prototype.setContent=function(t){return t="string"==typeof t?domify(t):t,this.el.querySelector(".popover-content").appendChild(t),this},Popover.prototype.position=function(t){var o,i;return this.el.classList.add("popover-"+t),this._rect=this.el.getBoundingClientRect(),("top"===t||"bottom"===t)&&(o=this._calculateX(),i="top"===t?this.buttonCoords.top-this._rect.height:this.buttonCoords.top+this.buttonCoords.height,this.el.style[this.opts.align||"left"]=o+"px",this.el.style.top=i+"px",this._positionArrow("left",this.el.getBoundingClientRect().left)),("right"===t||"left"===t)&&(o="right"===t?this.buttonCoords.left+this.buttonCoords.width:this.buttonCoords.left-this._rect.width,i=this._calculateY(),this.el.style.left=o+"px",this.el.style.top=i+"px",this._positionArrow("top",i)),this},Popover.prototype._positionArrow=function(t,o){var i=this.el.querySelector(".popover-arrow");if(i){var e="top"===t?"height":"width",s=this.buttonCoords[t]+this.buttonCoords[e]/2-o;i.style[t]=Math.round(s)+"px"}},Popover.prototype._calculateY=function(){this._rect||(this._rect=this.el.getBoundingClientRect());var t=this._rect.height,o=this.buttonCoords.top+(this.buttonCoords.height-t)/2;return this._autoAlign(o),"top"===this.opts.align&&(o=this.buttonCoords.top),o},Popover.prototype._calculateX=function(){this._rect||(this._rect=this.el.getBoundingClientRect());var t=this._rect.width,o=this.buttonCoords.left+(this.buttonCoords.width-t)/2;return this._autoAlign(o),"left"===this.opts.align&&(o=this.buttonCoords.left),"right"===this.opts.align&&(o=window.innerWidth-(this.buttonCoords.left+this.buttonCoords.width)),o},Popover.prototype._autoAlign=function(t){this._rect||(this._rect=this.el.getBoundingClientRect());var o=this._rect.width,i=this.opts.position,e="top"===i||"bottom"===i;return e&&t+o>window.innerWidth&&(this.opts.align="right"),e&&0>t&&(this.opts.align="left"),!e&&0>t&&(this.opts.align="top"),this};
},{"document-offset":1,"domify":6,"emitter-component":7}]},{},[8])(8)
});