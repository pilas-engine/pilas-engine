!function(e,t){"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document")
return t(e)}:t(e)}("undefined"!=typeof window?window:this,(function(e,t){function n(e){var t=e.length,n=J.type(e)
return"function"!==n&&!J.isWindow(e)&&(!(1!==e.nodeType||!t)||"array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function i(e,t,n){if(J.isFunction(t))return J.grep(e,(function(e,i){return!!t.call(e,i,e)!==n}))
if(t.nodeType)return J.grep(e,(function(e){return e===t!==n}))
if("string"==typeof t){if(Z.test(t))return J.filter(t,e,n)
t=J.filter(t,e)}return J.grep(e,(function(e){return I.call(t,e)>=0!==n}))}function r(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function o(){V.removeEventListener("DOMContentLoaded",o,!1),e.removeEventListener("load",o,!1),J.ready()}function s(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=J.expando+Math.random()}function a(e,t,n){var i
if(void 0===n&&1===e.nodeType)if(i="data-"+t.replace(fe,"-$1").toLowerCase(),"string"==typeof(n=e.getAttribute(i))){try{n="true"===n||"false"!==n&&("null"===n?null:+n+""===n?+n:le.test(n)?J.parseJSON(n):n)}catch(M){}ce.set(e,t,n)}else n=void 0
return n}function u(){return!0}function c(){return!1}function l(){try{return V.activeElement}catch(e){}}function f(e,t){return J.nodeName(e,"table")&&J.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function h(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function p(e){var t=_e.exec(e.type)
return t?e.type=t[1]:e.removeAttribute("type"),e}function d(e,t){for(var n=0,i=e.length;i>n;n++)ue.set(e[n],"globalEval",!t||ue.get(t[n],"globalEval"))}function g(e,t){var n,i,r,o,s,a,u,c
if(1===t.nodeType){if(ue.hasData(e)&&(o=ue.access(e),s=ue.set(t,o),c=o.events))for(r in delete s.handle,s.events={},c)for(n=0,i=c[r].length;i>n;n++)J.event.add(t,r,c[r][n])
ce.hasData(e)&&(a=ce.access(e),u=J.extend({},a),ce.set(t,u))}}function v(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[]
return void 0===t||t&&J.nodeName(e,t)?J.merge([e],n):n}function y(e,t){var n=t.nodeName.toLowerCase()
"input"===n&&ge.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function m(t,n){var i,r=J(n.createElement(t)).appendTo(n.body),o=e.getDefaultComputedStyle&&(i=e.getDefaultComputedStyle(r[0]))?i.display:J.css(r[0],"display")
return r.detach(),o}function x(e){var t=V,n=Ae[e]
return n||("none"!==(n=m(e,t))&&n||((t=(Ne=(Ne||J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(),t.close(),n=m(e,t),Ne.detach()),Ae[e]=n),n}function w(e,t,n){var i,r,o,s,a=e.style
return(n=n||Oe(e))&&(s=n.getPropertyValue(t)||n[t]),n&&(""!==s||J.contains(e.ownerDocument,e)||(s=J.style(e,t)),De.test(s)&&je.test(t)&&(i=a.width,r=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=s,s=n.width,a.width=i,a.minWidth=r,a.maxWidth=o)),void 0!==s?s+"":s}function b(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function S(e,t){if(t in e)return t
for(var n=t[0].toUpperCase()+t.slice(1),i=t,r=Me.length;r--;)if((t=Me[r]+n)in e)return t
return i}function k(e,t,n){var i=Le.exec(t)
return i?Math.max(0,i[1]-(n||0))+(i[2]||"px"):t}function C(e,t,n,i,r){for(var o=n===(i?"border":"content")?4:"width"===t?1:0,s=0;4>o;o+=2)"margin"===n&&(s+=J.css(e,n+pe[o],!0,r)),i?("content"===n&&(s-=J.css(e,"padding"+pe[o],!0,r)),"margin"!==n&&(s-=J.css(e,"border"+pe[o]+"Width",!0,r))):(s+=J.css(e,"padding"+pe[o],!0,r),"padding"!==n&&(s+=J.css(e,"border"+pe[o]+"Width",!0,r)))
return s}function T(e,t,n){var i=!0,r="width"===t?e.offsetWidth:e.offsetHeight,o=Oe(e),s="border-box"===J.css(e,"boxSizing",!1,o)
if(0>=r||null==r){if((0>(r=w(e,t,o))||null==r)&&(r=e.style[t]),De.test(r))return r
i=s&&(U.boxSizingReliable()||r===e.style[t]),r=parseFloat(r)||0}return r+C(e,t,n||(s?"border":"content"),i,o)+"px"}function E(e,t){for(var n,i,r,o=[],s=0,a=e.length;a>s;s++)(i=e[s]).style&&(o[s]=ue.get(i,"olddisplay"),n=i.style.display,t?(o[s]||"none"!==n||(i.style.display=""),""===i.style.display&&de(i)&&(o[s]=ue.access(i,"olddisplay",x(i.nodeName)))):(r=de(i),"none"===n&&r||ue.set(i,"olddisplay",r?n:J.css(i,"display"))))
for(s=0;a>s;s++)(i=e[s]).style&&(t&&"none"!==i.style.display&&""!==i.style.display||(i.style.display=t?o[s]||"":"none"))
return e}function _(e,t,n,i,r){return new _.prototype.init(e,t,n,i,r)}function $(){return setTimeout((function(){qe=void 0})),qe=J.now()}function N(e,t){var n,i=0,r={height:e}
for(t=t?1:0;4>i;i+=2-t)r["margin"+(n=pe[i])]=r["padding"+n]=e
return t&&(r.opacity=r.width=e),r}function A(e,t,n){for(var i,r=(Ve[t]||[]).concat(Ve["*"]),o=0,s=r.length;s>o;o++)if(i=r[o].call(n,t,e))return i}function j(e,t,n){var i,r,o=0,s=Ue.length,a=J.Deferred().always((function(){delete u.elem})),u=function(){if(r)return!1
for(var t=qe||$(),n=Math.max(0,c.startTime+c.duration-t),i=1-(n/c.duration||0),o=0,s=c.tweens.length;s>o;o++)c.tweens[o].run(i)
return a.notifyWith(e,[c,i,n]),1>i&&s?n:(a.resolveWith(e,[c]),!1)},c=a.promise({elem:e,props:J.extend({},t),opts:J.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qe||$(),duration:n.duration,tweens:[],createTween:function(t,n){var i=J.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing)
return c.tweens.push(i),i},stop:function(t){var n=0,i=t?c.tweens.length:0
if(r)return this
for(r=!0;i>n;n++)c.tweens[n].run(1)
return t?a.resolveWith(e,[c,t]):a.rejectWith(e,[c,t]),this}}),l=c.props
for(function(e,t){var n,i,r,o,s
for(n in e)if(r=t[i=J.camelCase(n)],o=e[n],J.isArray(o)&&(r=o[1],o=e[n]=o[0]),n!==i&&(e[i]=o,delete e[n]),(s=J.cssHooks[i])&&"expand"in s)for(n in o=s.expand(o),delete e[i],o)n in e||(e[n]=o[n],t[n]=r)
else t[i]=r}(l,c.opts.specialEasing);s>o;o++)if(i=Ue[o].call(c,e,l,c.opts))return i
return J.map(l,A,c),J.isFunction(c.opts.start)&&c.opts.start.call(e,c),J.fx.timer(J.extend(u,{elem:e,anim:c,queue:c.opts.queue})),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always)}function D(e){return function(t,n){"string"!=typeof t&&(n=t,t="*")
var i,r=0,o=t.toLowerCase().match(oe)||[]
if(J.isFunction(n))for(;i=o[r++];)"+"===i[0]?(i=i.slice(1)||"*",(e[i]=e[i]||[]).unshift(n)):(e[i]=e[i]||[]).push(n)}}function O(e,t,n,i){function r(a){var u
return o[a]=!0,J.each(e[a]||[],(function(e,a){var c=a(t,n,i)
return"string"!=typeof c||s||o[c]?s?!(u=c):void 0:(t.dataTypes.unshift(c),r(c),!1)})),u}var o={},s=e===st
return r(t.dataTypes[0])||!o["*"]&&r("*")}function P(e,t){var n,i,r=J.ajaxSettings.flatOptions||{}
for(n in t)void 0!==t[n]&&((r[n]?e:i||(i={}))[n]=t[n])
return i&&J.extend(!0,e,i),e}function L(e,t,n,i){var r
if(J.isArray(t))J.each(t,(function(t,r){n||ut.test(e)?i(e,r):L(e+"["+("object"==typeof r?t:"")+"]",r,n,i)}))
else if(n||"object"!==J.type(t))i(e,t)
else for(r in t)L(e+"["+r+"]",t[r],n,i)}function R(e){return J.isWindow(e)?e:9===e.nodeType&&e.defaultView}var F=[],H=F.slice,M=F.concat,q=F.push,I=F.indexOf,B={},z=B.toString,W=B.hasOwnProperty,U={},V=e.document,X="2.1.1",J=function(e,t){return new J.fn.init(e,t)},Y=function(e,t){return t.toUpperCase()}
J.fn=J.prototype={jquery:X,constructor:J,selector:"",length:0,toArray:function(){return H.call(this)},get:function(e){return null!=e?0>e?this[e+this.length]:this[e]:H.call(this)},pushStack:function(e){var t=J.merge(this.constructor(),e)
return t.prevObject=this,t.context=this.context,t},each:function(e,t){return J.each(this,e,t)},map:function(e){return this.pushStack(J.map(this,(function(t,n){return e.call(t,n,t)})))},slice:function(){return this.pushStack(H.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0)
return this.pushStack(n>=0&&t>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:q,sort:F.sort,splice:F.splice},J.extend=J.fn.extend=function(){var e,t,n,i,r,o,s=arguments[0]||{},a=1,u=arguments.length,c=!1
for("boolean"==typeof s&&(c=s,s=arguments[a]||{},a++),"object"==typeof s||J.isFunction(s)||(s={}),a===u&&(s=this,a--);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],s!==(i=e[t])&&(c&&i&&(J.isPlainObject(i)||(r=J.isArray(i)))?(r?(r=!1,o=n&&J.isArray(n)?n:[]):o=n&&J.isPlainObject(n)?n:{},s[t]=J.extend(c,o,i)):void 0!==i&&(s[t]=i))
return s},J.extend({expando:"jQuery"+(X+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===J.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!J.isArray(e)&&e-parseFloat(e)>=0},isPlainObject:function(e){return!("object"!==J.type(e)||e.nodeType||J.isWindow(e)||e.constructor&&!W.call(e.constructor.prototype,"isPrototypeOf"))},isEmptyObject:function(e){var t
for(t in e)return!1
return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?B[z.call(e)]||"object":typeof e},globalEval:function(e){var t,n=eval;(e=J.trim(e))&&(1===e.indexOf("use strict")?((t=V.createElement("script")).text=e,V.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,Y)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,i){var r=0,o=e.length,s=n(e)
if(i){if(s)for(;o>r&&!1!==t.apply(e[r],i);r++);else for(r in e)if(!1===t.apply(e[r],i))break}else if(s)for(;o>r&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break
return e},trim:function(e){return null==e?"":(e+"").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},makeArray:function(e,t){var i=t||[]
return null!=e&&(n(Object(e))?J.merge(i,"string"==typeof e?[e]:e):q.call(i,e)),i},inArray:function(e,t,n){return null==t?-1:I.call(t,e,n)},merge:function(e,t){for(var n=+t.length,i=0,r=e.length;n>i;i++)e[r++]=t[i]
return e.length=r,e},grep:function(e,t,n){for(var i=[],r=0,o=e.length,s=!n;o>r;r++)!t(e[r],r)!==s&&i.push(e[r])
return i},map:function(e,t,i){var r,o=0,s=e.length,a=[]
if(n(e))for(;s>o;o++)null!=(r=t(e[o],o,i))&&a.push(r)
else for(o in e)null!=(r=t(e[o],o,i))&&a.push(r)
return M.apply([],a)},guid:1,proxy:function(e,t){var n,i,r
return"string"==typeof t&&(n=e[t],t=e,e=n),J.isFunction(e)?(i=H.call(arguments,2),(r=function(){return e.apply(t||this,i.concat(H.call(arguments)))}).guid=e.guid=e.guid||J.guid++,r):void 0},now:Date.now,support:U}),J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),(function(e,t){B["[object "+t+"]"]=t.toLowerCase()}))
var G=function(e){function t(e,t,n,i){var r,o,s,a,c,f,h,p,d,g
if((t?t.ownerDocument||t:F)!==N&&$(t),n=n||[],!e||"string"!=typeof e)return n
if(1!==(a=(t=t||N).nodeType)&&9!==a)return[]
if(j&&!i){if(r=ge.exec(e))if(s=r[1]){if(9===a){if(!(o=t.getElementById(s))||!o.parentNode)return n
if(o.id===s)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(s))&&L(t,o)&&o.id===s)return n.push(o),n}else{if(r[2])return G.apply(n,t.getElementsByTagName(e)),n
if((s=r[3])&&m.getElementsByClassName&&t.getElementsByClassName)return G.apply(n,t.getElementsByClassName(s)),n}if(m.qsa&&(!D||!D.test(e))){if(p=h=R,d=t,g=9===a&&e,1===a&&"object"!==t.nodeName.toLowerCase()){for(f=S(e),(h=t.getAttribute("id"))?p=h.replace(ye,"\\$&"):t.setAttribute("id",p),p="[id='"+p+"'] ",c=f.length;c--;)f[c]=p+l(f[c])
d=ve.test(e)&&u(t.parentNode)||t,g=f.join(",")}if(g)try{return G.apply(n,d.querySelectorAll(g)),n}catch(q){}finally{h||t.removeAttribute("id")}}}return C(e.replace(oe,"$1"),t,n,i)}function n(){var e=[]
return function t(n,i){return e.push(n+" ")>x.cacheLength&&delete t[e.shift()],t[n+" "]=i}}function i(e){return e[R]=!0,e}function r(e){var t=N.createElement("div")
try{return!!e(t)}catch(m){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function o(e,t){for(var n=e.split("|"),i=e.length;i--;)x.attrHandle[n[i]]=t}function s(e,t){var n=t&&e,i=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||U)-(~e.sourceIndex||U)
if(i)return i
if(n)for(;n=n.nextSibling;)if(n===t)return-1
return e?1:-1}function a(e){return i((function(t){return t=+t,i((function(n,i){for(var r,o=e([],n.length,t),s=o.length;s--;)n[r=o[s]]&&(n[r]=!(i[r]=n[r]))}))}))}function u(e){return e&&typeof e.getElementsByTagName!==W&&e}function c(){}function l(e){for(var t=0,n=e.length,i="";n>t;t++)i+=e[t].value
return i}function f(e,t,n){var i=t.dir,r=n&&"parentNode"===i,o=M++
return t.first?function(t,n,o){for(;t=t[i];)if(1===t.nodeType||r)return e(t,n,o)}:function(t,n,s){var a,u,c=[H,o]
if(s){for(;t=t[i];)if((1===t.nodeType||r)&&e(t,n,s))return!0}else for(;t=t[i];)if(1===t.nodeType||r){if((a=(u=t[R]||(t[R]={}))[i])&&a[0]===H&&a[1]===o)return c[2]=a[2]
if(u[i]=c,c[2]=e(t,n,s))return!0}}}function h(e){return e.length>1?function(t,n,i){for(var r=e.length;r--;)if(!e[r](t,n,i))return!1
return!0}:e[0]}function p(e,t,n,i,r){for(var o,s=[],a=0,u=e.length,c=null!=t;u>a;a++)(o=e[a])&&(!n||n(o,i,r))&&(s.push(o),c&&t.push(a))
return s}function d(e,n,r,o,s,a){return o&&!o[R]&&(o=d(o)),s&&!s[R]&&(s=d(s,a)),i((function(i,a,u,c){var l,f,h,d=[],g=[],v=a.length,y=i||function(e,n,i){for(var r=0,o=n.length;o>r;r++)t(e,n[r],i)
return i}(n||"*",u.nodeType?[u]:u,[]),m=!e||!i&&n?y:p(y,d,e,u,c),x=r?s||(i?e:v||o)?[]:a:m
if(r&&r(m,x,u,c),o)for(l=p(x,g),o(l,[],u,c),f=l.length;f--;)(h=l[f])&&(x[g[f]]=!(m[g[f]]=h))
if(i){if(s||e){if(s){for(l=[],f=x.length;f--;)(h=x[f])&&l.push(m[f]=h)
s(null,x=[],l,c)}for(f=x.length;f--;)(h=x[f])&&(l=s?K.call(i,h):d[f])>-1&&(i[l]=!(a[l]=h))}}else x=p(x===a?x.splice(v,x.length):x),s?s(null,a,x,c):G.apply(a,x)}))}function g(e){for(var t,n,i,r=e.length,o=x.relative[e[0].type],s=o||x.relative[" "],a=o?1:0,u=f((function(e){return e===t}),s,!0),c=f((function(e){return K.call(t,e)>-1}),s,!0),p=[function(e,n,i){return!o&&(i||n!==T)||((t=n).nodeType?u(e,n,i):c(e,n,i))}];r>a;a++)if(n=x.relative[e[a].type])p=[f(h(p),n)]
else{if((n=x.filter[e[a].type].apply(null,e[a].matches))[R]){for(i=++a;r>i&&!x.relative[e[i].type];i++);return d(a>1&&h(p),a>1&&l(e.slice(0,a-1).concat({value:" "===e[a-2].type?"*":""})).replace(oe,"$1"),n,i>a&&g(e.slice(a,i)),r>i&&g(e=e.slice(i)),r>i&&l(e))}p.push(n)}return h(p)}function v(e,n){var r=n.length>0,o=e.length>0,s=function(i,s,a,u,c){var l,f,h,d=0,g="0",v=i&&[],y=[],m=T,w=i||o&&x.find.TAG("*",c),b=H+=null==m?1:Math.random()||.1,S=w.length
for(c&&(T=s!==N&&s);g!==S&&null!=(l=w[g]);g++){if(o&&l){for(f=0;h=e[f++];)if(h(l,s,a)){u.push(l)
break}c&&(H=b)}r&&((l=!h&&l)&&d--,i&&v.push(l))}if(d+=g,r&&g!==d){for(f=0;h=n[f++];)h(v,y,s,a)
if(i){if(d>0)for(;g--;)v[g]||y[g]||(y[g]=J.call(u))
y=p(y)}G.apply(u,y),c&&!i&&y.length>0&&d+n.length>1&&t.uniqueSort(u)}return c&&(H=b,T=m),v}
return r?i(s):s}var y,m,x,w,b,S,k,C,T,E,_,$,N,A,j,D,O,P,L,R="sizzle"+-new Date,F=e.document,H=0,M=0,q=n(),I=n(),B=n(),z=function(e,t){return e===t&&(_=!0),0},W="undefined",U=1<<31,V={}.hasOwnProperty,X=[],J=X.pop,Y=X.push,G=X.push,Q=X.slice,K=X.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t
return-1},Z="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ee="[\\x20\\t\\r\\n\\f]",te="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ne=te.replace("w","w#"),ie="\\["+ee+"*("+te+")(?:"+ee+"*([*^$|!~]?=)"+ee+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ne+"))|)"+ee+"*\\]",re=":("+te+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ie+")*)|.*)\\)|)",oe=new RegExp("^"+ee+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ee+"+$","g"),se=new RegExp("^"+ee+"*,"+ee+"*"),ae=new RegExp("^"+ee+"*([>+~]|"+ee+")"+ee+"*"),ue=new RegExp("="+ee+"*([^\\]'\"]*?)"+ee+"*\\]","g"),ce=new RegExp(re),le=new RegExp("^"+ne+"$"),fe={ID:new RegExp("^#("+te+")"),CLASS:new RegExp("^\\.("+te+")"),TAG:new RegExp("^("+te.replace("w","w*")+")"),ATTR:new RegExp("^"+ie),PSEUDO:new RegExp("^"+re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ee+"*(even|odd|(([+-]|)(\\d*)n|)"+ee+"*(?:([+-]|)"+ee+"*(\\d+)|))"+ee+"*\\)|)","i"),bool:new RegExp("^(?:"+Z+")$","i"),needsContext:new RegExp("^"+ee+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ee+"*((?:-\\d)?\\d*)"+ee+"*\\)|)(?=[^-]|$)","i")},he=/^(?:input|select|textarea|button)$/i,pe=/^h\d$/i,de=/^[^{]+\{\s*\[native \w/,ge=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ve=/[+~]/,ye=/'|\\/g,me=new RegExp("\\\\([\\da-f]{1,6}"+ee+"?|("+ee+")|.)","ig"),xe=function(e,t,n){var i="0x"+t-65536
return i!=i||n?t:0>i?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)}
try{G.apply(X=Q.call(F.childNodes),F.childNodes),X[F.childNodes.length].nodeType}catch(Te){G={apply:X.length?function(e,t){Y.apply(e,Q.call(t))}:function(e,t){for(var n=e.length,i=0;e[n++]=t[i++];);e.length=n-1}}}for(y in m=t.support={},b=t.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement
return!!t&&"HTML"!==t.nodeName},$=t.setDocument=function(e){var t,n=e?e.ownerDocument||e:F,i=n.defaultView
return n!==N&&9===n.nodeType&&n.documentElement?(N=n,A=n.documentElement,j=!b(n),i&&i!==i.top&&(i.addEventListener?i.addEventListener("unload",(function(){$()}),!1):i.attachEvent&&i.attachEvent("onunload",(function(){$()}))),m.attributes=r((function(e){return e.className="i",!e.getAttribute("className")})),m.getElementsByTagName=r((function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length})),m.getElementsByClassName=de.test(n.getElementsByClassName)&&r((function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length})),m.getById=r((function(e){return A.appendChild(e).id=R,!n.getElementsByName||!n.getElementsByName(R).length})),m.getById?(x.find.ID=function(e,t){if(typeof t.getElementById!==W&&j){var n=t.getElementById(e)
return n&&n.parentNode?[n]:[]}},x.filter.ID=function(e){var t=e.replace(me,xe)
return function(e){return e.getAttribute("id")===t}}):(delete x.find.ID,x.filter.ID=function(e){var t=e.replace(me,xe)
return function(e){var n=typeof e.getAttributeNode!==W&&e.getAttributeNode("id")
return n&&n.value===t}}),x.find.TAG=m.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==W?t.getElementsByTagName(e):void 0}:function(e,t){var n,i=[],r=0,o=t.getElementsByTagName(e)
if("*"===e){for(;n=o[r++];)1===n.nodeType&&i.push(n)
return i}return o},x.find.CLASS=m.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==W&&j?t.getElementsByClassName(e):void 0},O=[],D=[],(m.qsa=de.test(n.querySelectorAll))&&(r((function(e){e.innerHTML="<select msallowclip=''><option selected=''></option></select>",e.querySelectorAll("[msallowclip^='']").length&&D.push("[*^$]="+ee+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||D.push("\\["+ee+"*(?:value|"+Z+")"),e.querySelectorAll(":checked").length||D.push(":checked")})),r((function(e){var t=n.createElement("input")
t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&D.push("name"+ee+"*[*^$|!~]?="),e.querySelectorAll(":enabled").length||D.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),D.push(",.*:")}))),(m.matchesSelector=de.test(P=A.matches||A.webkitMatchesSelector||A.mozMatchesSelector||A.oMatchesSelector||A.msMatchesSelector))&&r((function(e){m.disconnectedMatch=P.call(e,"div"),P.call(e,"[s!='']:x"),O.push("!=",re)})),D=D.length&&new RegExp(D.join("|")),O=O.length&&new RegExp(O.join("|")),t=de.test(A.compareDocumentPosition),L=t||de.test(A.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,i=t&&t.parentNode
return e===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):e.compareDocumentPosition&&16&e.compareDocumentPosition(i)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0
return!1},z=t?function(e,t){if(e===t)return _=!0,0
var i=!e.compareDocumentPosition-!t.compareDocumentPosition
return i||(1&(i=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!m.sortDetached&&t.compareDocumentPosition(e)===i?e===n||e.ownerDocument===F&&L(F,e)?-1:t===n||t.ownerDocument===F&&L(F,t)?1:E?K.call(E,e)-K.call(E,t):0:4&i?-1:1)}:function(e,t){if(e===t)return _=!0,0
var i,r=0,o=e.parentNode,a=t.parentNode,u=[e],c=[t]
if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:E?K.call(E,e)-K.call(E,t):0
if(o===a)return s(e,t)
for(i=e;i=i.parentNode;)u.unshift(i)
for(i=t;i=i.parentNode;)c.unshift(i)
for(;u[r]===c[r];)r++
return r?s(u[r],c[r]):u[r]===F?-1:c[r]===F?1:0},n):N},t.matches=function(e,n){return t(e,null,null,n)},t.matchesSelector=function(e,n){if((e.ownerDocument||e)!==N&&$(e),n=n.replace(ue,"='$1']"),!(!m.matchesSelector||!j||O&&O.test(n)||D&&D.test(n)))try{var i=P.call(e,n)
if(i||m.disconnectedMatch||e.document&&11!==e.document.nodeType)return i}catch(w){}return t(n,N,null,[e]).length>0},t.contains=function(e,t){return(e.ownerDocument||e)!==N&&$(e),L(e,t)},t.attr=function(e,t){(e.ownerDocument||e)!==N&&$(e)
var n=x.attrHandle[t.toLowerCase()],i=n&&V.call(x.attrHandle,t.toLowerCase())?n(e,t,!j):void 0
return void 0!==i?i:m.attributes||!j?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null},t.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},t.uniqueSort=function(e){var t,n=[],i=0,r=0
if(_=!m.detectDuplicates,E=!m.sortStable&&e.slice(0),e.sort(z),_){for(;t=e[r++];)t===e[r]&&(i=n.push(r))
for(;i--;)e.splice(n[i],1)}return E=null,e},w=t.getText=function(e){var t,n="",i=0,r=e.nodeType
if(r){if(1===r||9===r||11===r){if("string"==typeof e.textContent)return e.textContent
for(e=e.firstChild;e;e=e.nextSibling)n+=w(e)}else if(3===r||4===r)return e.nodeValue}else for(;t=e[i++];)n+=w(t)
return n},(x=t.selectors={cacheLength:50,createPseudo:i,match:fe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(me,xe),e[3]=(e[3]||e[4]||e[5]||"").replace(me,xe),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||t.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&t.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2]
return fe.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&ce.test(n)&&(t=S(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(me,xe).toLowerCase()
return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=q[e+" "]
return t||(t=new RegExp("(^|"+ee+")"+e+"("+ee+"|$)"))&&q(e,(function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==W&&e.getAttribute("class")||"")}))},ATTR:function(e,n,i){return function(r){var o=t.attr(r,e)
return null==o?"!="===n:!n||(o+="","="===n?o===i:"!="===n?o!==i:"^="===n?i&&0===o.indexOf(i):"*="===n?i&&o.indexOf(i)>-1:"$="===n?i&&o.slice(-i.length)===i:"~="===n?(" "+o+" ").indexOf(i)>-1:"|="===n&&(o===i||o.slice(0,i.length+1)===i+"-"))}},CHILD:function(e,t,n,i,r){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t
return 1===i&&0===r?function(e){return!!e.parentNode}:function(t,n,u){var c,l,f,h,p,d,g=o!==s?"nextSibling":"previousSibling",v=t.parentNode,y=a&&t.nodeName.toLowerCase(),m=!u&&!a
if(v){if(o){for(;g;){for(f=t;f=f[g];)if(a?f.nodeName.toLowerCase()===y:1===f.nodeType)return!1
d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?v.firstChild:v.lastChild],s&&m){for(p=(c=(l=v[R]||(v[R]={}))[e]||[])[0]===H&&c[1],h=c[0]===H&&c[2],f=p&&v.childNodes[p];f=++p&&f&&f[g]||(h=p=0)||d.pop();)if(1===f.nodeType&&++h&&f===t){l[e]=[H,p,h]
break}}else if(m&&(c=(t[R]||(t[R]={}))[e])&&c[0]===H)h=c[1]
else for(;(f=++p&&f&&f[g]||(h=p=0)||d.pop())&&((a?f.nodeName.toLowerCase()!==y:1!==f.nodeType)||!++h||(m&&((f[R]||(f[R]={}))[e]=[H,h]),f!==t)););return(h-=r)===i||h%i==0&&h/i>=0}}},PSEUDO:function(e,n){var r,o=x.pseudos[e]||x.setFilters[e.toLowerCase()]||t.error("unsupported pseudo: "+e)
return o[R]?o(n):o.length>1?(r=[e,e,"",n],x.setFilters.hasOwnProperty(e.toLowerCase())?i((function(e,t){for(var i,r=o(e,n),s=r.length;s--;)e[i=K.call(e,r[s])]=!(t[i]=r[s])})):function(e){return o(e,0,r)}):o}},pseudos:{not:i((function(e){var t=[],n=[],r=k(e.replace(oe,"$1"))
return r[R]?i((function(e,t,n,i){for(var o,s=r(e,null,i,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))})):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}})),has:i((function(e){return function(n){return t(e,n).length>0}})),contains:i((function(e){return function(t){return(t.textContent||t.innerText||w(t)).indexOf(e)>-1}})),lang:i((function(e){return le.test(e||"")||t.error("unsupported lang: "+e),e=e.replace(me,xe).toLowerCase(),function(t){var n
do{if(n=j?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType)
return!1}})),target:function(t){var n=e.location&&e.location.hash
return n&&n.slice(1)===t.id},root:function(e){return e===A},focus:function(e){return e===N.activeElement&&(!N.hasFocus||N.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return!1===e.disabled},disabled:function(e){return!0===e.disabled},checked:function(e){var t=e.nodeName.toLowerCase()
return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1
return!0},parent:function(e){return!x.pseudos.empty(e)},header:function(e){return pe.test(e.nodeName)},input:function(e){return he.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase()
return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t
return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:a((function(){return[0]})),last:a((function(e,t){return[t-1]})),eq:a((function(e,t,n){return[0>n?n+t:n]})),even:a((function(e,t){for(var n=0;t>n;n+=2)e.push(n)
return e})),odd:a((function(e,t){for(var n=1;t>n;n+=2)e.push(n)
return e})),lt:a((function(e,t,n){for(var i=0>n?n+t:n;--i>=0;)e.push(i)
return e})),gt:a((function(e,t,n){for(var i=0>n?n+t:n;++i<t;)e.push(i)
return e}))}}).pseudos.nth=x.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})x.pseudos[y]=function(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}(y)
for(y in{submit:!0,reset:!0})x.pseudos[y]=function(e){return function(t){var n=t.nodeName.toLowerCase()
return("input"===n||"button"===n)&&t.type===e}}(y)
return c.prototype=x.filters=x.pseudos,x.setFilters=new c,S=t.tokenize=function(e,n){var i,r,o,s,a,u,c,l=I[e+" "]
if(l)return n?0:l.slice(0)
for(a=e,u=[],c=x.preFilter;a;){for(s in(!i||(r=se.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),i=!1,(r=ae.exec(a))&&(i=r.shift(),o.push({value:i,type:r[0].replace(oe," ")}),a=a.slice(i.length)),x.filter)!(r=fe[s].exec(a))||c[s]&&!(r=c[s](r))||(i=r.shift(),o.push({value:i,type:s,matches:r}),a=a.slice(i.length))
if(!i)break}return n?a.length:a?t.error(e):I(e,u).slice(0)},k=t.compile=function(e,t){var n,i=[],r=[],o=B[e+" "]
if(!o){for(t||(t=S(e)),n=t.length;n--;)(o=g(t[n]))[R]?i.push(o):r.push(o);(o=B(e,v(r,i))).selector=e}return o},C=t.select=function(e,t,n,i){var r,o,s,a,c,f="function"==typeof e&&e,h=!i&&S(e=f.selector||e)
if(n=n||[],1===h.length){if((o=h[0]=h[0].slice(0)).length>2&&"ID"===(s=o[0]).type&&m.getById&&9===t.nodeType&&j&&x.relative[o[1].type]){if(!(t=(x.find.ID(s.matches[0].replace(me,xe),t)||[])[0]))return n
f&&(t=t.parentNode),e=e.slice(o.shift().value.length)}for(r=fe.needsContext.test(e)?0:o.length;r--&&(s=o[r],!x.relative[a=s.type]);)if((c=x.find[a])&&(i=c(s.matches[0].replace(me,xe),ve.test(o[0].type)&&u(t.parentNode)||t))){if(o.splice(r,1),!(e=i.length&&l(o)))return G.apply(n,i),n
break}}return(f||k(e,h))(i,t,!j,n,ve.test(e)&&u(t.parentNode)||t),n},m.sortStable=R.split("").sort(z).join("")===R,m.detectDuplicates=!!_,$(),m.sortDetached=r((function(e){return 1&e.compareDocumentPosition(N.createElement("div"))})),r((function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")}))||o("type|href|height|width",(function(e,t,n){return n?void 0:e.getAttribute(t,"type"===t.toLowerCase()?1:2)})),m.attributes&&r((function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}))||o("value",(function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?void 0:e.defaultValue})),r((function(e){return null==e.getAttribute("disabled")}))||o(Z,(function(e,t,n){var i
return n?void 0:!0===e[t]?t.toLowerCase():(i=e.getAttributeNode(t))&&i.specified?i.value:null})),t}(e)
J.find=G,J.expr=G.selectors,J.expr[":"]=J.expr.pseudos,J.unique=G.uniqueSort,J.text=G.getText,J.isXMLDoc=G.isXML,J.contains=G.contains
var Q=J.expr.match.needsContext,K=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Z=/^.[^:#\[\.,]*$/
J.filter=function(e,t,n){var i=t[0]
return n&&(e=":not("+e+")"),1===t.length&&1===i.nodeType?J.find.matchesSelector(i,e)?[i]:[]:J.find.matches(e,J.grep(t,(function(e){return 1===e.nodeType})))},J.fn.extend({find:function(e){var t,n=this.length,i=[],r=this
if("string"!=typeof e)return this.pushStack(J(e).filter((function(){for(t=0;n>t;t++)if(J.contains(r[t],this))return!0})))
for(t=0;n>t;t++)J.find(e,r[t],i)
return(i=this.pushStack(n>1?J.unique(i):i)).selector=this.selector?this.selector+" "+e:e,i},filter:function(e){return this.pushStack(i(this,e||[],!1))},not:function(e){return this.pushStack(i(this,e||[],!0))},is:function(e){return!!i(this,"string"==typeof e&&Q.test(e)?J(e):e||[],!1).length}})
var ee,te=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;(J.fn.init=function(e,t){var n,i
if(!e)return this
if("string"==typeof e){if(!(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:te.exec(e))||!n[1]&&t)return!t||t.jquery?(t||ee).find(e):this.constructor(t).find(e)
if(n[1]){if(t=t instanceof J?t[0]:t,J.merge(this,J.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:V,!0)),K.test(n[1])&&J.isPlainObject(t))for(n in t)J.isFunction(this[n])?this[n](t[n]):this.attr(n,t[n])
return this}return(i=V.getElementById(n[2]))&&i.parentNode&&(this.length=1,this[0]=i),this.context=V,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):J.isFunction(e)?void 0!==ee.ready?ee.ready(e):e(J):(void 0!==e.selector&&(this.selector=e.selector,this.context=e.context),J.makeArray(e,this))}).prototype=J.fn,ee=J(V)
var ne=/^(?:parents|prev(?:Until|All))/,ie={children:!0,contents:!0,next:!0,prev:!0}
J.extend({dir:function(e,t,n){for(var i=[],r=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(r&&J(e).is(n))break
i.push(e)}return i},sibling:function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e)
return n}}),J.fn.extend({has:function(e){var t=J(e,this),n=t.length
return this.filter((function(){for(var e=0;n>e;e++)if(J.contains(this,t[e]))return!0}))},closest:function(e,t){for(var n,i=0,r=this.length,o=[],s=Q.test(e)||"string"!=typeof e?J(e,t||this.context):0;r>i;i++)for(n=this[i];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&J.find.matchesSelector(n,e))){o.push(n)
break}return this.pushStack(o.length>1?J.unique(o):o)},index:function(e){return e?"string"==typeof e?I.call(J(e),this[0]):I.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(J.unique(J.merge(this.get(),J(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),J.each({parent:function(e){var t=e.parentNode
return t&&11!==t.nodeType?t:null},parents:function(e){return J.dir(e,"parentNode")},parentsUntil:function(e,t,n){return J.dir(e,"parentNode",n)},next:function(e){return r(e,"nextSibling")},prev:function(e){return r(e,"previousSibling")},nextAll:function(e){return J.dir(e,"nextSibling")},prevAll:function(e){return J.dir(e,"previousSibling")},nextUntil:function(e,t,n){return J.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return J.dir(e,"previousSibling",n)},siblings:function(e){return J.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return J.sibling(e.firstChild)},contents:function(e){return e.contentDocument||J.merge([],e.childNodes)}},(function(e,t){J.fn[e]=function(n,i){var r=J.map(this,t,n)
return"Until"!==e.slice(-5)&&(i=n),i&&"string"==typeof i&&(r=J.filter(i,r)),this.length>1&&(ie[e]||J.unique(r),ne.test(e)&&r.reverse()),this.pushStack(r)}}))
var re,oe=/\S+/g,se={}
J.Callbacks=function(e){e="string"==typeof e?se[e]||function(e){var t=se[e]={}
return J.each(e.match(oe)||[],(function(e,n){t[n]=!0})),t}(e):J.extend({},e)
var t,n,i,r,o,s,a=[],u=!e.once&&[],c=function(f){for(t=e.memory&&f,n=!0,s=r||0,r=0,o=a.length,i=!0;a&&o>s;s++)if(!1===a[s].apply(f[0],f[1])&&e.stopOnFalse){t=!1
break}i=!1,a&&(u?u.length&&c(u.shift()):t?a=[]:l.disable())},l={add:function(){if(a){var n=a.length
!function t(n){J.each(n,(function(n,i){var r=J.type(i)
"function"===r?e.unique&&l.has(i)||a.push(i):i&&i.length&&"string"!==r&&t(i)}))}(arguments),i?o=a.length:t&&(r=n,c(t))}return this},remove:function(){return a&&J.each(arguments,(function(e,t){for(var n;(n=J.inArray(t,a,n))>-1;)a.splice(n,1),i&&(o>=n&&o--,s>=n&&s--)})),this},has:function(e){return e?J.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=void 0,this},disabled:function(){return!a},lock:function(){return u=void 0,t||l.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=[e,(t=t||[]).slice?t.slice():t],i?u.push(t):c(t)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!n}}
return l},J.extend({Deferred:function(e){var t=[["resolve","done",J.Callbacks("once memory"),"resolved"],["reject","fail",J.Callbacks("once memory"),"rejected"],["notify","progress",J.Callbacks("memory")]],n="pending",i={state:function(){return n},always:function(){return r.done(arguments).fail(arguments),this},then:function(){var e=arguments
return J.Deferred((function(n){J.each(t,(function(t,o){var s=J.isFunction(e[t])&&e[t]
r[o[1]]((function(){var e=s&&s.apply(this,arguments)
e&&J.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[o[0]+"With"](this===i?n.promise():this,s?[e]:arguments)}))})),e=null})).promise()},promise:function(e){return null!=e?J.extend(e,i):i}},r={}
return i.pipe=i.then,J.each(t,(function(e,o){var s=o[2],a=o[3]
i[o[1]]=s.add,a&&s.add((function(){n=a}),t[1^e][2].disable,t[2][2].lock),r[o[0]]=function(){return r[o[0]+"With"](this===r?i:this,arguments),this},r[o[0]+"With"]=s.fireWith})),i.promise(r),e&&e.call(r,r),r},when:function(e){var t,n,i,r=0,o=H.call(arguments),s=o.length,a=1!==s||e&&J.isFunction(e.promise)?s:0,u=1===a?e:J.Deferred(),c=function(e,n,i){return function(r){n[e]=this,i[e]=arguments.length>1?H.call(arguments):r,i===t?u.notifyWith(n,i):--a||u.resolveWith(n,i)}}
if(s>1)for(t=new Array(s),n=new Array(s),i=new Array(s);s>r;r++)o[r]&&J.isFunction(o[r].promise)?o[r].promise().done(c(r,i,o)).fail(u.reject).progress(c(r,n,t)):--a
return a||u.resolveWith(i,o),u.promise()}}),J.fn.ready=function(e){return J.ready.promise().done(e),this},J.extend({isReady:!1,readyWait:1,holdReady:function(e){e?J.readyWait++:J.ready(!0)},ready:function(e){(!0===e?--J.readyWait:J.isReady)||(J.isReady=!0,!0!==e&&--J.readyWait>0||(re.resolveWith(V,[J]),J.fn.triggerHandler&&(J(V).triggerHandler("ready"),J(V).off("ready"))))}}),J.ready.promise=function(t){return re||(re=J.Deferred(),"complete"===V.readyState?setTimeout(J.ready):(V.addEventListener("DOMContentLoaded",o,!1),e.addEventListener("load",o,!1))),re.promise(t)},J.ready.promise()
var ae=J.access=function(e,t,n,i,r,o,s){var a=0,u=e.length,c=null==n
if("object"===J.type(n))for(a in r=!0,n)J.access(e,t,a,n[a],!0,o,s)
else if(void 0!==i&&(r=!0,J.isFunction(i)||(s=!0),c&&(s?(t.call(e,i),t=null):(c=t,t=function(e,t,n){return c.call(J(e),n)})),t))for(;u>a;a++)t(e[a],n,s?i:i.call(e[a],a,t(e[a],n)))
return r?e:c?t.call(e):u?t(e[0],n):o}
J.acceptData=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType},s.uid=1,s.accepts=J.acceptData,s.prototype={key:function(e){if(!s.accepts(e))return 0
var t={},n=e[this.expando]
if(!n){n=s.uid++
try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(H){t[this.expando]=n,J.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var i,r=this.key(e),o=this.cache[r]
if("string"==typeof t)o[t]=n
else if(J.isEmptyObject(o))J.extend(this.cache[r],t)
else for(i in t)o[i]=t[i]
return o},get:function(e,t){var n=this.cache[this.key(e)]
return void 0===t?n:n[t]},access:function(e,t,n){var i
return void 0===t||t&&"string"==typeof t&&void 0===n?void 0!==(i=this.get(e,t))?i:this.get(e,J.camelCase(t)):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,i,r,o=this.key(e),s=this.cache[o]
if(void 0===t)this.cache[o]={}
else{J.isArray(t)?i=t.concat(t.map(J.camelCase)):(r=J.camelCase(t),t in s?i=[t,r]:i=(i=r)in s?[i]:i.match(oe)||[]),n=i.length
for(;n--;)delete s[i[n]]}},hasData:function(e){return!J.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}}
var ue=new s,ce=new s,le=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,fe=/([A-Z])/g
J.extend({hasData:function(e){return ce.hasData(e)||ue.hasData(e)},data:function(e,t,n){return ce.access(e,t,n)},removeData:function(e,t){ce.remove(e,t)},_data:function(e,t,n){return ue.access(e,t,n)},_removeData:function(e,t){ue.remove(e,t)}}),J.fn.extend({data:function(e,t){var n,i,r,o=this[0],s=o&&o.attributes
if(void 0===e){if(this.length&&(r=ce.get(o),1===o.nodeType&&!ue.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(0===(i=s[n].name).indexOf("data-")&&(i=J.camelCase(i.slice(5)),a(o,i,r[i])))
ue.set(o,"hasDataAttrs",!0)}return r}return"object"==typeof e?this.each((function(){ce.set(this,e)})):ae(this,(function(t){var n,i=J.camelCase(e)
if(o&&void 0===t){if(void 0!==(n=ce.get(o,e)))return n
if(void 0!==(n=ce.get(o,i)))return n
if(void 0!==(n=a(o,i,void 0)))return n}else this.each((function(){var n=ce.get(this,i)
ce.set(this,i,t),-1!==e.indexOf("-")&&void 0!==n&&ce.set(this,e,t)}))}),null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each((function(){ce.remove(this,e)}))}}),J.extend({queue:function(e,t,n){var i
return e?(t=(t||"fx")+"queue",i=ue.get(e,t),n&&(!i||J.isArray(n)?i=ue.access(e,t,J.makeArray(n)):i.push(n)),i||[]):void 0},dequeue:function(e,t){t=t||"fx"
var n=J.queue(e,t),i=n.length,r=n.shift(),o=J._queueHooks(e,t)
"inprogress"===r&&(r=n.shift(),i--),r&&("fx"===t&&n.unshift("inprogress"),delete o.stop,r.call(e,(function(){J.dequeue(e,t)}),o)),!i&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks"
return ue.get(e,n)||ue.access(e,n,{empty:J.Callbacks("once memory").add((function(){ue.remove(e,[t+"queue",n])}))})}}),J.fn.extend({queue:function(e,t){var n=2
return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?J.queue(this[0],e):void 0===t?this:this.each((function(){var n=J.queue(this,e,t)
J._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&J.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){J.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,i=1,r=J.Deferred(),o=this,s=this.length,a=function(){--i||r.resolveWith(o,[o])}
for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)(n=ue.get(o[s],e+"queueHooks"))&&n.empty&&(i++,n.empty.add(a))
return a(),r.promise(t)}})
var he=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,pe=["Top","Right","Bottom","Left"],de=function(e,t){return e=t||e,"none"===J.css(e,"display")||!J.contains(e.ownerDocument,e)},ge=/^(?:checkbox|radio)$/i
!function(){var e=V.createDocumentFragment().appendChild(V.createElement("div")),t=V.createElement("input")
t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),U.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",U.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}()
var ve="undefined"
U.focusinBubbles="onfocusin"in e
var ye=/^key/,me=/^(?:mouse|pointer|contextmenu)|click/,xe=/^(?:focusinfocus|focusoutblur)$/,we=/^([^.]*)(?:\.(.+)|)$/
J.event={global:{},add:function(e,t,n,i,r){var o,s,a,u,c,l,f,h,p,d,g,v=ue.get(e)
if(v)for(n.handler&&(n=(o=n).handler,r=o.selector),n.guid||(n.guid=J.guid++),(u=v.events)||(u=v.events={}),(s=v.handle)||(s=v.handle=function(t){return typeof J!==ve&&J.event.triggered!==t.type?J.event.dispatch.apply(e,arguments):void 0}),c=(t=(t||"").match(oe)||[""]).length;c--;)p=g=(a=we.exec(t[c])||[])[1],d=(a[2]||"").split(".").sort(),p&&(f=J.event.special[p]||{},p=(r?f.delegateType:f.bindType)||p,f=J.event.special[p]||{},l=J.extend({type:p,origType:g,data:i,handler:n,guid:n.guid,selector:r,needsContext:r&&J.expr.match.needsContext.test(r),namespace:d.join(".")},o),(h=u[p])||((h=u[p]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,i,d,s)||e.addEventListener&&e.addEventListener(p,s,!1)),f.add&&(f.add.call(e,l),l.handler.guid||(l.handler.guid=n.guid)),r?h.splice(h.delegateCount++,0,l):h.push(l),J.event.global[p]=!0)},remove:function(e,t,n,i,r){var o,s,a,u,c,l,f,h,p,d,g,v=ue.hasData(e)&&ue.get(e)
if(v&&(u=v.events)){for(c=(t=(t||"").match(oe)||[""]).length;c--;)if(p=g=(a=we.exec(t[c])||[])[1],d=(a[2]||"").split(".").sort(),p){for(f=J.event.special[p]||{},h=u[p=(i?f.delegateType:f.bindType)||p]||[],a=a[2]&&new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=h.length;o--;)l=h[o],!r&&g!==l.origType||n&&n.guid!==l.guid||a&&!a.test(l.namespace)||i&&i!==l.selector&&("**"!==i||!l.selector)||(h.splice(o,1),l.selector&&h.delegateCount--,f.remove&&f.remove.call(e,l))
s&&!h.length&&(f.teardown&&!1!==f.teardown.call(e,d,v.handle)||J.removeEvent(e,p,v.handle),delete u[p])}else for(p in u)J.event.remove(e,p+t[c],n,i,!0)
J.isEmptyObject(u)&&(delete v.handle,ue.remove(e,"events"))}},trigger:function(t,n,i,r){var o,s,a,u,c,l,f,h=[i||V],p=W.call(t,"type")?t.type:t,d=W.call(t,"namespace")?t.namespace.split("."):[]
if(s=a=i=i||V,3!==i.nodeType&&8!==i.nodeType&&!xe.test(p+J.event.triggered)&&(p.indexOf(".")>=0&&(d=p.split("."),p=d.shift(),d.sort()),c=p.indexOf(":")<0&&"on"+p,(t=t[J.expando]?t:new J.Event(p,"object"==typeof t&&t)).isTrigger=r?2:3,t.namespace=d.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:J.makeArray(n,[t]),f=J.event.special[p]||{},r||!f.trigger||!1!==f.trigger.apply(i,n))){if(!r&&!f.noBubble&&!J.isWindow(i)){for(u=f.delegateType||p,xe.test(u+p)||(s=s.parentNode);s;s=s.parentNode)h.push(s),a=s
a===(i.ownerDocument||V)&&h.push(a.defaultView||a.parentWindow||e)}for(o=0;(s=h[o++])&&!t.isPropagationStopped();)t.type=o>1?u:f.bindType||p,(l=(ue.get(s,"events")||{})[t.type]&&ue.get(s,"handle"))&&l.apply(s,n),(l=c&&s[c])&&l.apply&&J.acceptData(s)&&(t.result=l.apply(s,n),!1===t.result&&t.preventDefault())
return t.type=p,r||t.isDefaultPrevented()||f._default&&!1!==f._default.apply(h.pop(),n)||!J.acceptData(i)||c&&J.isFunction(i[p])&&!J.isWindow(i)&&((a=i[c])&&(i[c]=null),J.event.triggered=p,i[p](),J.event.triggered=void 0,a&&(i[c]=a)),t.result}},dispatch:function(e){e=J.event.fix(e)
var t,n,i,r,o,s=[],a=H.call(arguments),u=(ue.get(this,"events")||{})[e.type]||[],c=J.event.special[e.type]||{}
if(a[0]=e,e.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,e)){for(s=J.event.handlers.call(this,e,u),t=0;(r=s[t++])&&!e.isPropagationStopped();)for(e.currentTarget=r.elem,n=0;(o=r.handlers[n++])&&!e.isImmediatePropagationStopped();)(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,void 0!==(i=((J.event.special[o.origType]||{}).handle||o.handler).apply(r.elem,a))&&!1===(e.result=i)&&(e.preventDefault(),e.stopPropagation()))
return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,i,r,o,s=[],a=t.delegateCount,u=e.target
if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(!0!==u.disabled||"click"!==e.type){for(i=[],n=0;a>n;n++)void 0===i[r=(o=t[n]).selector+" "]&&(i[r]=o.needsContext?J(r,this).index(u)>=0:J.find(r,this,null,[u]).length),i[r]&&i.push(o)
i.length&&s.push({elem:u,handlers:i})}return a<t.length&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,i,r,o=t.button
return null==e.pageX&&null!=t.clientX&&(i=(n=e.target.ownerDocument||V).documentElement,r=n.body,e.pageX=t.clientX+(i&&i.scrollLeft||r&&r.scrollLeft||0)-(i&&i.clientLeft||r&&r.clientLeft||0),e.pageY=t.clientY+(i&&i.scrollTop||r&&r.scrollTop||0)-(i&&i.clientTop||r&&r.clientTop||0)),e.which||void 0===o||(e.which=1&o?1:2&o?3:4&o?2:0),e}},fix:function(e){if(e[J.expando])return e
var t,n,i,r=e.type,o=e,s=this.fixHooks[r]
for(s||(this.fixHooks[r]=s=me.test(r)?this.mouseHooks:ye.test(r)?this.keyHooks:{}),i=s.props?this.props.concat(s.props):this.props,e=new J.Event(o),t=i.length;t--;)e[n=i[t]]=o[n]
return e.target||(e.target=V),3===e.target.nodeType&&(e.target=e.target.parentNode),s.filter?s.filter(e,o):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==l()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===l()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&J.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(e){return J.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,i){var r=J.extend(new J.Event,n,{type:e,isSimulated:!0,originalEvent:{}})
i?J.event.trigger(r,null,t):J.event.dispatch.call(t,r),r.isDefaultPrevented()&&n.preventDefault()}},J.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},J.Event=function(e,t){return this instanceof J.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?u:c):this.type=e,t&&J.extend(this,t),this.timeStamp=e&&e.timeStamp||J.now(),void(this[J.expando]=!0)):new J.Event(e,t)},J.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var e=this.originalEvent
this.isDefaultPrevented=u,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent
this.isPropagationStopped=u,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent
this.isImmediatePropagationStopped=u,e&&e.stopImmediatePropagation&&e.stopImmediatePropagation(),this.stopPropagation()}},J.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){J.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,i=this,r=e.relatedTarget,o=e.handleObj
return(!r||r!==i&&!J.contains(i,r))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}})),U.focusinBubbles||J.each({focus:"focusin",blur:"focusout"},(function(e,t){var n=function(e){J.event.simulate(t,e.target,J.event.fix(e),!0)}
J.event.special[t]={setup:function(){var i=this.ownerDocument||this,r=ue.access(i,t)
r||i.addEventListener(e,n,!0),ue.access(i,t,(r||0)+1)},teardown:function(){var i=this.ownerDocument||this,r=ue.access(i,t)-1
r?ue.access(i,t,r):(i.removeEventListener(e,n,!0),ue.remove(i,t))}}})),J.fn.extend({on:function(e,t,n,i,r){var o,s
if("object"==typeof e){for(s in"string"!=typeof t&&(n=n||t,t=void 0),e)this.on(s,t,n,e[s],r)
return this}if(null==n&&null==i?(i=t,n=t=void 0):null==i&&("string"==typeof t?(i=n,n=void 0):(i=n,n=t,t=void 0)),!1===i)i=c
else if(!i)return this
return 1===r&&(o=i,(i=function(e){return J().off(e),o.apply(this,arguments)}).guid=o.guid||(o.guid=J.guid++)),this.each((function(){J.event.add(this,e,i,n,t)}))},one:function(e,t,n,i){return this.on(e,t,n,i,1)},off:function(e,t,n){var i,r
if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,J(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this
if("object"==typeof e){for(r in e)this.off(r,t,e[r])
return this}return(!1===t||"function"==typeof t)&&(n=t,t=void 0),!1===n&&(n=c),this.each((function(){J.event.remove(this,e,n,t)}))},trigger:function(e,t){return this.each((function(){J.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var n=this[0]
return n?J.event.trigger(e,t,n,!0):void 0}})
var be=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Se=/<([\w:]+)/,ke=/<|&#?\w+;/,Ce=/<(?:script|style|link)/i,Te=/checked\s*(?:[^=]|=\s*.checked.)/i,Ee=/^$|\/(?:java|ecma)script/i,_e=/^true\/(.*)/,$e={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}
$e.optgroup=$e.option,$e.tbody=$e.tfoot=$e.colgroup=$e.caption=$e.thead,$e.th=$e.td,J.extend({clone:function(e,t,n){var i,r,o,s,a=e.cloneNode(!0),u=J.contains(e.ownerDocument,e)
if(!(U.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||J.isXMLDoc(e)))for(s=v(a),i=0,r=(o=v(e)).length;r>i;i++)y(o[i],s[i])
if(t)if(n)for(o=o||v(e),s=s||v(a),i=0,r=o.length;r>i;i++)g(o[i],s[i])
else g(e,a)
return(s=v(a,"script")).length>0&&d(s,!u&&v(e,"script")),a},buildFragment:function(e,t,n,i){for(var r,o,s,a,u,c,l=t.createDocumentFragment(),f=[],h=0,p=e.length;p>h;h++)if((r=e[h])||0===r)if("object"===J.type(r))J.merge(f,r.nodeType?[r]:r)
else if(ke.test(r)){for(o=o||l.appendChild(t.createElement("div")),s=(Se.exec(r)||["",""])[1].toLowerCase(),a=$e[s]||$e._default,o.innerHTML=a[1]+r.replace(be,"<$1></$2>")+a[2],c=a[0];c--;)o=o.lastChild
J.merge(f,o.childNodes),(o=l.firstChild).textContent=""}else f.push(t.createTextNode(r))
for(l.textContent="",h=0;r=f[h++];)if((!i||-1===J.inArray(r,i))&&(u=J.contains(r.ownerDocument,r),o=v(l.appendChild(r),"script"),u&&d(o),n))for(c=0;r=o[c++];)Ee.test(r.type||"")&&n.push(r)
return l},cleanData:function(e){for(var t,n,i,r,o=J.event.special,s=0;void 0!==(n=e[s]);s++){if(J.acceptData(n)&&(r=n[ue.expando])&&(t=ue.cache[r])){if(t.events)for(i in t.events)o[i]?J.event.remove(n,i):J.removeEvent(n,i,t.handle)
ue.cache[r]&&delete ue.cache[r]}delete ce.cache[n[ce.expando]]}}}),J.fn.extend({text:function(e){return ae(this,(function(e){return void 0===e?J.text(this):this.empty().each((function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return this.domManip(arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||f(this,e).appendChild(e)}))},prepend:function(){return this.domManip(arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=f(this,e)
t.insertBefore(e,t.firstChild)}}))},before:function(){return this.domManip(arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return this.domManip(arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},remove:function(e,t){for(var n,i=e?J.filter(e,this):this,r=0;null!=(n=i[r]);r++)t||1!==n.nodeType||J.cleanData(v(n)),n.parentNode&&(t&&J.contains(n.ownerDocument,n)&&d(v(n,"script")),n.parentNode.removeChild(n))
return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(J.cleanData(v(e,!1)),e.textContent="")
return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return J.clone(this,e,t)}))},html:function(e){return ae(this,(function(e){var t=this[0]||{},n=0,i=this.length
if(void 0===e&&1===t.nodeType)return t.innerHTML
if("string"==typeof e&&!Ce.test(e)&&!$e[(Se.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(be,"<$1></$2>")
try{for(;i>n;n++)1===(t=this[n]||{}).nodeType&&(J.cleanData(v(t,!1)),t.innerHTML=e)
t=0}catch(M){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=arguments[0]
return this.domManip(arguments,(function(t){e=this.parentNode,J.cleanData(v(this)),e&&e.replaceChild(t,this)})),e&&(e.length||e.nodeType)?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t){e=M.apply([],e)
var n,i,r,o,s,a,u=0,c=this.length,l=this,f=c-1,d=e[0],g=J.isFunction(d)
if(g||c>1&&"string"==typeof d&&!U.checkClone&&Te.test(d))return this.each((function(n){var i=l.eq(n)
g&&(e[0]=d.call(this,n,i.html())),i.domManip(e,t)}))
if(c&&(i=(n=J.buildFragment(e,this[0].ownerDocument,!1,this)).firstChild,1===n.childNodes.length&&(n=i),i)){for(o=(r=J.map(v(n,"script"),h)).length;c>u;u++)s=n,u!==f&&(s=J.clone(s,!0,!0),o&&J.merge(r,v(s,"script"))),t.call(this[u],s,u)
if(o)for(a=r[r.length-1].ownerDocument,J.map(r,p),u=0;o>u;u++)s=r[u],Ee.test(s.type||"")&&!ue.access(s,"globalEval")&&J.contains(a,s)&&(s.src?J._evalUrl&&J._evalUrl(s.src):J.globalEval(s.textContent.replace(/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,"")))}return this}}),J.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){J.fn[e]=function(e){for(var n,i=[],r=J(e),o=r.length-1,s=0;o>=s;s++)n=s===o?this:this.clone(!0),J(r[s])[t](n),q.apply(i,n.get())
return this.pushStack(i)}}))
var Ne,Ae={},je=/^margin/,De=new RegExp("^("+he+")(?!px)[a-z%]+$","i"),Oe=function(e){return e.ownerDocument.defaultView.getComputedStyle(e,null)}
!function(){function t(){s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s.innerHTML="",r.appendChild(o)
var t=e.getComputedStyle(s,null)
n="1%"!==t.top,i="4px"===t.width,r.removeChild(o)}var n,i,r=V.documentElement,o=V.createElement("div"),s=V.createElement("div")
s.style&&(s.style.backgroundClip="content-box",s.cloneNode(!0).style.backgroundClip="",U.clearCloneStyle="content-box"===s.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(s),e.getComputedStyle&&J.extend(U,{pixelPosition:function(){return t(),n},boxSizingReliable:function(){return null==i&&t(),i},reliableMarginRight:function(){var t,n=s.appendChild(V.createElement("div"))
return n.style.cssText=s.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",n.style.marginRight=n.style.width="0",s.style.width="1px",r.appendChild(o),t=!parseFloat(e.getComputedStyle(n,null).marginRight),r.removeChild(o),t}}))}(),J.swap=function(e,t,n,i){var r,o,s={}
for(o in t)s[o]=e.style[o],e.style[o]=t[o]
for(o in r=n.apply(e,i||[]),t)e.style[o]=s[o]
return r}
var Pe=/^(none|table(?!-c[ea]).+)/,Le=new RegExp("^("+he+")(.*)$","i"),Re=new RegExp("^([+-])=("+he+")","i"),Fe={position:"absolute",visibility:"hidden",display:"block"},He={letterSpacing:"0",fontWeight:"400"},Me=["Webkit","O","Moz","ms"]
J.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=w(e,"opacity")
return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function(e,t,n,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var r,o,s,a=J.camelCase(t),u=e.style
return t=J.cssProps[a]||(J.cssProps[a]=S(u,a)),s=J.cssHooks[t]||J.cssHooks[a],void 0===n?s&&"get"in s&&void 0!==(r=s.get(e,!1,i))?r:u[t]:("string"===(o=typeof n)&&(r=Re.exec(n))&&(n=(r[1]+1)*r[2]+parseFloat(J.css(e,t)),o="number"),void(null!=n&&n==n&&("number"!==o||J.cssNumber[a]||(n+="px"),U.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,i))||(u[t]=n))))}},css:function(e,t,n,i){var r,o,s,a=J.camelCase(t)
return t=J.cssProps[a]||(J.cssProps[a]=S(e.style,a)),(s=J.cssHooks[t]||J.cssHooks[a])&&"get"in s&&(r=s.get(e,!0,n)),void 0===r&&(r=w(e,t,i)),"normal"===r&&t in He&&(r=He[t]),""===n||n?(o=parseFloat(r),!0===n||J.isNumeric(o)?o||0:r):r}}),J.each(["height","width"],(function(e,t){J.cssHooks[t]={get:function(e,n,i){return n?Pe.test(J.css(e,"display"))&&0===e.offsetWidth?J.swap(e,Fe,(function(){return T(e,t,i)})):T(e,t,i):void 0},set:function(e,n,i){var r=i&&Oe(e)
return k(0,n,i?C(e,t,i,"border-box"===J.css(e,"boxSizing",!1,r),r):0)}}})),J.cssHooks.marginRight=b(U.reliableMarginRight,(function(e,t){return t?J.swap(e,{display:"inline-block"},w,[e,"marginRight"]):void 0})),J.each({margin:"",padding:"",border:"Width"},(function(e,t){J.cssHooks[e+t]={expand:function(n){for(var i=0,r={},o="string"==typeof n?n.split(" "):[n];4>i;i++)r[e+pe[i]+t]=o[i]||o[i-2]||o[0]
return r}},je.test(e)||(J.cssHooks[e+t].set=k)})),J.fn.extend({css:function(e,t){return ae(this,(function(e,t,n){var i,r,o={},s=0
if(J.isArray(t)){for(i=Oe(e),r=t.length;r>s;s++)o[t[s]]=J.css(e,t[s],!1,i)
return o}return void 0!==n?J.style(e,t,n):J.css(e,t)}),e,t,arguments.length>1)},show:function(){return E(this,!0)},hide:function(){return E(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){de(this)?J(this).show():J(this).hide()}))}}),J.Tween=_,_.prototype={constructor:_,init:function(e,t,n,i,r,o){this.elem=e,this.prop=n,this.easing=r||"swing",this.options=t,this.start=this.now=this.cur(),this.end=i,this.unit=o||(J.cssNumber[n]?"":"px")},cur:function(){var e=_.propHooks[this.prop]
return e&&e.get?e.get(this):_.propHooks._default.get(this)},run:function(e){var t,n=_.propHooks[this.prop]
return this.pos=t=this.options.duration?J.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):_.propHooks._default.set(this),this}},_.prototype.init.prototype=_.prototype,_.propHooks={_default:{get:function(e){var t
return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=J.css(e.elem,e.prop,""))&&"auto"!==t?t:0:e.elem[e.prop]},set:function(e){J.fx.step[e.prop]?J.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[J.cssProps[e.prop]]||J.cssHooks[e.prop])?J.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},_.propHooks.scrollTop=_.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},J.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},J.fx=_.prototype.init,J.fx.step={}
var qe,Ie,Be=/^(?:toggle|show|hide)$/,ze=new RegExp("^(?:([+-])=|)("+he+")([a-z%]*)$","i"),We=/queueHooks$/,Ue=[function(e,t,n){var i,r,o,s,a,u,c,l=this,f={},h=e.style,p=e.nodeType&&de(e),d=ue.get(e,"fxshow")
for(i in n.queue||(null==(a=J._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always((function(){l.always((function(){a.unqueued--,J.queue(e,"fx").length||a.empty.fire()}))}))),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],"inline"===("none"===(c=J.css(e,"display"))?ue.get(e,"olddisplay")||x(e.nodeName):c)&&"none"===J.css(e,"float")&&(h.display="inline-block")),n.overflow&&(h.overflow="hidden",l.always((function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]}))),t)if(r=t[i],Be.exec(r)){if(delete t[i],o=o||"toggle"===r,r===(p?"hide":"show")){if("show"!==r||!d||void 0===d[i])continue
p=!0}f[i]=d&&d[i]||J.style(e,i)}else c=void 0
if(J.isEmptyObject(f))"inline"===("none"===c?x(e.nodeName):c)&&(h.display=c)
else for(i in d?"hidden"in d&&(p=d.hidden):d=ue.access(e,"fxshow",{}),o&&(d.hidden=!p),p?J(e).show():l.done((function(){J(e).hide()})),l.done((function(){var t
for(t in ue.remove(e,"fxshow"),f)J.style(e,t,f[t])})),f)s=A(p?d[i]:0,i,l),i in d||(d[i]=s.start,p&&(s.end=s.start,s.start="width"===i||"height"===i?1:0))}],Ve={"*":[function(e,t){var n=this.createTween(e,t),i=n.cur(),r=ze.exec(t),o=r&&r[3]||(J.cssNumber[e]?"":"px"),s=(J.cssNumber[e]||"px"!==o&&+i)&&ze.exec(J.css(n.elem,e)),a=1,u=20
if(s&&s[3]!==o){o=o||s[3],r=r||[],s=+i||1
do{s/=a=a||".5",J.style(n.elem,e,s+o)}while(a!==(a=n.cur()/i)&&1!==a&&--u)}return r&&(s=n.start=+s||+i||0,n.unit=o,n.end=r[1]?s+(r[1]+1)*r[2]:+r[2]),n}]}
J.Animation=J.extend(j,{tweener:function(e,t){J.isFunction(e)?(t=e,e=["*"]):e=e.split(" ")
for(var n,i=0,r=e.length;r>i;i++)n=e[i],Ve[n]=Ve[n]||[],Ve[n].unshift(t)},prefilter:function(e,t){t?Ue.unshift(e):Ue.push(e)}}),J.speed=function(e,t,n){var i=e&&"object"==typeof e?J.extend({},e):{complete:n||!n&&t||J.isFunction(e)&&e,duration:e,easing:n&&t||t&&!J.isFunction(t)&&t}
return i.duration=J.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in J.fx.speeds?J.fx.speeds[i.duration]:J.fx.speeds._default,(null==i.queue||!0===i.queue)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){J.isFunction(i.old)&&i.old.call(this),i.queue&&J.dequeue(this,i.queue)},i},J.fn.extend({fadeTo:function(e,t,n,i){return this.filter(de).css("opacity",0).show().end().animate({opacity:t},e,n,i)},animate:function(e,t,n,i){var r=J.isEmptyObject(e),o=J.speed(t,n,i),s=function(){var t=j(this,J.extend({},e),o);(r||ue.get(this,"finish"))&&t.stop(!0)}
return s.finish=s,r||!1===o.queue?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var i=function(e){var t=e.stop
delete e.stop,t(n)}
return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each((function(){var t=!0,r=null!=e&&e+"queueHooks",o=J.timers,s=ue.get(this)
if(r)s[r]&&s[r].stop&&i(s[r])
else for(r in s)s[r]&&s[r].stop&&We.test(r)&&i(s[r])
for(r=o.length;r--;)o[r].elem!==this||null!=e&&o[r].queue!==e||(o[r].anim.stop(n),t=!1,o.splice(r,1));(t||!n)&&J.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,n=ue.get(this),i=n[e+"queue"],r=n[e+"queueHooks"],o=J.timers,s=i?i.length:0
for(n.finish=!0,J.queue(this,e,[]),r&&r.stop&&r.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1))
for(t=0;s>t;t++)i[t]&&i[t].finish&&i[t].finish.call(this)
delete n.finish}))}}),J.each(["toggle","show","hide"],(function(e,t){var n=J.fn[t]
J.fn[t]=function(e,i,r){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(N(t,!0),e,i,r)}})),J.each({slideDown:N("show"),slideUp:N("hide"),slideToggle:N("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){J.fn[e]=function(e,n,i){return this.animate(t,e,n,i)}})),J.timers=[],J.fx.tick=function(){var e,t=0,n=J.timers
for(qe=J.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1)
n.length||J.fx.stop(),qe=void 0},J.fx.timer=function(e){J.timers.push(e),e()?J.fx.start():J.timers.pop()},J.fx.interval=13,J.fx.start=function(){Ie||(Ie=setInterval(J.fx.tick,J.fx.interval))},J.fx.stop=function(){clearInterval(Ie),Ie=null},J.fx.speeds={slow:600,fast:200,_default:400},J.fn.delay=function(e,t){return e=J.fx&&J.fx.speeds[e]||e,t=t||"fx",this.queue(t,(function(t,n){var i=setTimeout(t,e)
n.stop=function(){clearTimeout(i)}}))},function(){var e=V.createElement("input"),t=V.createElement("select"),n=t.appendChild(V.createElement("option"))
e.type="checkbox",U.checkOn=""!==e.value,U.optSelected=n.selected,t.disabled=!0,U.optDisabled=!n.disabled,(e=V.createElement("input")).value="t",e.type="radio",U.radioValue="t"===e.value}()
var Xe,Je=J.expr.attrHandle
J.fn.extend({attr:function(e,t){return ae(this,J.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each((function(){J.removeAttr(this,e)}))}}),J.extend({attr:function(e,t,n){var i,r,o=e.nodeType
if(e&&3!==o&&8!==o&&2!==o)return typeof e.getAttribute===ve?J.prop(e,t,n):(1===o&&J.isXMLDoc(e)||(t=t.toLowerCase(),i=J.attrHooks[t]||(J.expr.match.bool.test(t)?Xe:void 0)),void 0===n?i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=J.find.attr(e,t))?void 0:r:null!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):void J.removeAttr(e,t))},removeAttr:function(e,t){var n,i,r=0,o=t&&t.match(oe)
if(o&&1===e.nodeType)for(;n=o[r++];)i=J.propFix[n]||n,J.expr.match.bool.test(n)&&(e[i]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!U.radioValue&&"radio"===t&&J.nodeName(e,"input")){var n=e.value
return e.setAttribute("type",t),n&&(e.value=n),t}}}}}),Xe={set:function(e,t,n){return!1===t?J.removeAttr(e,n):e.setAttribute(n,n),n}},J.each(J.expr.match.bool.source.match(/\w+/g),(function(e,t){var n=Je[t]||J.find.attr
Je[t]=function(e,t,i){var r,o
return i||(o=Je[t],Je[t]=r,r=null!=n(e,t,i)?t.toLowerCase():null,Je[t]=o),r}}))
var Ye=/^(?:input|select|textarea|button)$/i
J.fn.extend({prop:function(e,t){return ae(this,J.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each((function(){delete this[J.propFix[e]||e]}))}}),J.extend({propFix:{for:"htmlFor",class:"className"},prop:function(e,t,n){var i,r,o=e.nodeType
if(e&&3!==o&&8!==o&&2!==o)return(1!==o||!J.isXMLDoc(e))&&(t=J.propFix[t]||t,r=J.propHooks[t]),void 0!==n?r&&"set"in r&&void 0!==(i=r.set(e,n,t))?i:e[t]=n:r&&"get"in r&&null!==(i=r.get(e,t))?i:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||Ye.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),U.optSelected||(J.propHooks.selected={get:function(e){var t=e.parentNode
return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),J.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){J.propFix[this.toLowerCase()]=this}))
var Ge=/[\t\r\n\f]/g
J.fn.extend({addClass:function(e){var t,n,i,r,o,s,a="string"==typeof e&&e,u=0,c=this.length
if(J.isFunction(e))return this.each((function(t){J(this).addClass(e.call(this,t,this.className))}))
if(a)for(t=(e||"").match(oe)||[];c>u;u++)if(i=1===(n=this[u]).nodeType&&(n.className?(" "+n.className+" ").replace(Ge," "):" ")){for(o=0;r=t[o++];)i.indexOf(" "+r+" ")<0&&(i+=r+" ")
s=J.trim(i),n.className!==s&&(n.className=s)}return this},removeClass:function(e){var t,n,i,r,o,s,a=0===arguments.length||"string"==typeof e&&e,u=0,c=this.length
if(J.isFunction(e))return this.each((function(t){J(this).removeClass(e.call(this,t,this.className))}))
if(a)for(t=(e||"").match(oe)||[];c>u;u++)if(i=1===(n=this[u]).nodeType&&(n.className?(" "+n.className+" ").replace(Ge," "):"")){for(o=0;r=t[o++];)for(;i.indexOf(" "+r+" ")>=0;)i=i.replace(" "+r+" "," ")
s=e?J.trim(i):"",n.className!==s&&(n.className=s)}return this},toggleClass:function(e,t){var n=typeof e
return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):this.each(J.isFunction(e)?function(n){J(this).toggleClass(e.call(this,n,this.className,t),t)}:function(){if("string"===n)for(var t,i=0,r=J(this),o=e.match(oe)||[];t=o[i++];)r.hasClass(t)?r.removeClass(t):r.addClass(t)
else(n===ve||"boolean"===n)&&(this.className&&ue.set(this,"__className__",this.className),this.className=this.className||!1===e?"":ue.get(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",n=0,i=this.length;i>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Ge," ").indexOf(t)>=0)return!0
return!1}}),J.fn.extend({val:function(e){var t,n,i,r=this[0]
return arguments.length?(i=J.isFunction(e),this.each((function(n){var r
1===this.nodeType&&(null==(r=i?e.call(this,n,J(this).val()):e)?r="":"number"==typeof r?r+="":J.isArray(r)&&(r=J.map(r,(function(e){return null==e?"":e+""}))),(t=J.valHooks[this.type]||J.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,r,"value")||(this.value=r))}))):r?(t=J.valHooks[r.type]||J.valHooks[r.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(r,"value"))?n:"string"==typeof(n=r.value)?n.replace(/\r/g,""):null==n?"":n:void 0}}),J.extend({valHooks:{option:{get:function(e){var t=J.find.attr(e,"value")
return null!=t?t:J.trim(J.text(e))}},select:{get:function(e){for(var t,n,i=e.options,r=e.selectedIndex,o="select-one"===e.type||0>r,s=o?null:[],a=o?r+1:i.length,u=0>r?a:o?r:0;a>u;u++)if(!(!(n=i[u]).selected&&u!==r||(U.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&J.nodeName(n.parentNode,"optgroup"))){if(t=J(n).val(),o)return t
s.push(t)}return s},set:function(e,t){for(var n,i,r=e.options,o=J.makeArray(t),s=r.length;s--;)((i=r[s]).selected=J.inArray(i.value,o)>=0)&&(n=!0)
return n||(e.selectedIndex=-1),o}}}}),J.each(["radio","checkbox"],(function(){J.valHooks[this]={set:function(e,t){return J.isArray(t)?e.checked=J.inArray(J(e).val(),t)>=0:void 0}},U.checkOn||(J.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})),J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),(function(e,t){J.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}})),J.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,i){return this.on(t,e,n,i)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}})
var Qe=J.now(),Ke=/\?/
J.parseJSON=function(e){return JSON.parse(e+"")},J.parseXML=function(e){var t
if(!e||"string"!=typeof e)return null
try{t=(new DOMParser).parseFromString(e,"text/xml")}catch(H){t=void 0}return(!t||t.getElementsByTagName("parsererror").length)&&J.error("Invalid XML: "+e),t}
var Ze,et,tt=/([?&])_=[^&]*/,nt=/^(.*?):[ \t]*([^\r\n]*)$/gm,it=/^(?:GET|HEAD)$/,rt=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,ot={},st={},at="*/".concat("*")
try{et=location.href}catch(bt){(et=V.createElement("a")).href="",et=et.href}Ze=rt.exec(et.toLowerCase())||[],J.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:et,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ze[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":at,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":J.parseJSON,"text xml":J.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?P(P(e,J.ajaxSettings),t):P(J.ajaxSettings,e)},ajaxPrefilter:D(ot),ajaxTransport:D(st),ajax:function(e,t){function n(e,t,n,s){var u,l,y,m,w,S=t
2!==x&&(x=2,a&&clearTimeout(a),i=void 0,o=s||"",b.readyState=e>0?4:0,u=e>=200&&300>e||304===e,n&&(m=function(e,t,n){for(var i,r,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===i&&(i=e.mimeType||t.getResponseHeader("Content-Type"))
if(i)for(r in a)if(a[r]&&a[r].test(i)){u.unshift(r)
break}if(u[0]in n)o=u[0]
else{for(r in n){if(!u[0]||e.converters[r+" "+u[0]]){o=r
break}s||(s=r)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):void 0}(f,b,n)),m=function(e,t,n,i){var r,o,s,a,u,c={},l=e.dataTypes.slice()
if(l[1])for(s in e.converters)c[s.toLowerCase()]=e.converters[s]
for(o=l.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&i&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=l.shift())if("*"===o)o=u
else if("*"!==u&&u!==o){if(!(s=c[u+" "+o]||c["* "+o]))for(r in c)if((a=r.split(" "))[1]===o&&(s=c[u+" "+a[0]]||c["* "+a[0]])){!0===s?s=c[r]:!0!==c[r]&&(o=a[0],l.unshift(a[1]))
break}if(!0!==s)if(s&&e.throws)t=s(t)
else try{t=s(t)}catch(h){return{state:"parsererror",error:s?h:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(f,m,b,u),u?(f.ifModified&&((w=b.getResponseHeader("Last-Modified"))&&(J.lastModified[r]=w),(w=b.getResponseHeader("etag"))&&(J.etag[r]=w)),204===e||"HEAD"===f.type?S="nocontent":304===e?S="notmodified":(S=m.loadingState,l=m.data,u=!(y=m.error))):(y=S,(e||!S)&&(S="error",0>e&&(e=0))),b.status=e,b.statusText=(t||S)+"",u?d.resolveWith(h,[l,S,b]):d.rejectWith(h,[b,S,y]),b.statusCode(v),v=void 0,c&&p.trigger(u?"ajaxSuccess":"ajaxError",[b,f,u?l:y]),g.fireWith(h,[b,S]),c&&(p.trigger("ajaxComplete",[b,f]),--J.active||J.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{}
var i,r,o,s,a,u,c,l,f=J.ajaxSetup({},t),h=f.context||f,p=f.context&&(h.nodeType||h.jquery)?J(h):J.event,d=J.Deferred(),g=J.Callbacks("once memory"),v=f.statusCode||{},y={},m={},x=0,w="canceled",b={readyState:0,getResponseHeader:function(e){var t
if(2===x){if(!s)for(s={};t=nt.exec(o);)s[t[1].toLowerCase()]=t[2]
t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?o:null},setRequestHeader:function(e,t){var n=e.toLowerCase()
return x||(e=m[n]=m[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(f.mimeType=e),this},statusCode:function(e){var t
if(e)if(2>x)for(t in e)v[t]=[v[t],e[t]]
else b.always(e[b.status])
return this},abort:function(e){var t=e||w
return i&&i.abort(t),n(0,t),this}}
if(d.promise(b).complete=g.add,b.success=b.done,b.error=b.fail,f.url=((e||f.url||et)+"").replace(/#.*$/,"").replace(/^\/\//,Ze[1]+"//"),f.type=t.method||t.type||f.method||f.type,f.dataTypes=J.trim(f.dataType||"*").toLowerCase().match(oe)||[""],null==f.crossDomain&&(u=rt.exec(f.url.toLowerCase()),f.crossDomain=!(!u||u[1]===Ze[1]&&u[2]===Ze[2]&&(u[3]||("http:"===u[1]?"80":"443"))===(Ze[3]||("http:"===Ze[1]?"80":"443")))),f.data&&f.processData&&"string"!=typeof f.data&&(f.data=J.param(f.data,f.traditional)),O(ot,f,t,b),2===x)return b
for(l in(c=f.global)&&0==J.active++&&J.event.trigger("ajaxStart"),f.type=f.type.toUpperCase(),f.hasContent=!it.test(f.type),r=f.url,f.hasContent||(f.data&&(r=f.url+=(Ke.test(r)?"&":"?")+f.data,delete f.data),!1===f.cache&&(f.url=tt.test(r)?r.replace(tt,"$1_="+Qe++):r+(Ke.test(r)?"&":"?")+"_="+Qe++)),f.ifModified&&(J.lastModified[r]&&b.setRequestHeader("If-Modified-Since",J.lastModified[r]),J.etag[r]&&b.setRequestHeader("If-None-Match",J.etag[r])),(f.data&&f.hasContent&&!1!==f.contentType||t.contentType)&&b.setRequestHeader("Content-Type",f.contentType),b.setRequestHeader("Accept",f.dataTypes[0]&&f.accepts[f.dataTypes[0]]?f.accepts[f.dataTypes[0]]+("*"!==f.dataTypes[0]?", "+at+"; q=0.01":""):f.accepts["*"]),f.headers)b.setRequestHeader(l,f.headers[l])
if(f.beforeSend&&(!1===f.beforeSend.call(h,b,f)||2===x))return b.abort()
for(l in w="abort",{success:1,error:1,complete:1})b[l](f[l])
if(i=O(st,f,t,b)){b.readyState=1,c&&p.trigger("ajaxSend",[b,f]),f.async&&f.timeout>0&&(a=setTimeout((function(){b.abort("timeout")}),f.timeout))
try{x=1,i.send(y,n)}catch(Z){if(!(2>x))throw Z
n(-1,Z)}}else n(-1,"No Transport")
return b},getJSON:function(e,t,n){return J.get(e,t,n,"json")},getScript:function(e,t){return J.get(e,void 0,t,"script")}}),J.each(["get","post"],(function(e,t){J[t]=function(e,n,i,r){return J.isFunction(n)&&(r=r||i,i=n,n=void 0),J.ajax({url:e,type:t,dataType:r,data:n,success:i})}})),J.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){J.fn[t]=function(e){return this.on(t,e)}})),J._evalUrl=function(e){return J.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,throws:!0})},J.fn.extend({wrapAll:function(e){var t
return J.isFunction(e)?this.each((function(t){J(this).wrapAll(e.call(this,t))})):(this[0]&&(t=J(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild
return e})).append(this)),this)},wrapInner:function(e){return this.each(J.isFunction(e)?function(t){J(this).wrapInner(e.call(this,t))}:function(){var t=J(this),n=t.contents()
n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=J.isFunction(e)
return this.each((function(n){J(this).wrapAll(t?e.call(this,n):e)}))},unwrap:function(){return this.parent().each((function(){J.nodeName(this,"body")||J(this).replaceWith(this.childNodes)})).end()}}),J.expr.filters.hidden=function(e){return e.offsetWidth<=0&&e.offsetHeight<=0},J.expr.filters.visible=function(e){return!J.expr.filters.hidden(e)}
var ut=/\[\]$/,ct=/^(?:submit|button|image|reset|file)$/i,lt=/^(?:input|select|textarea|keygen)/i
J.param=function(e,t){var n,i=[],r=function(e,t){t=J.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)}
if(void 0===t&&(t=J.ajaxSettings&&J.ajaxSettings.traditional),J.isArray(e)||e.jquery&&!J.isPlainObject(e))J.each(e,(function(){r(this.name,this.value)}))
else for(n in e)L(n,e[n],t,r)
return i.join("&").replace(/%20/g,"+")},J.fn.extend({serialize:function(){return J.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=J.prop(this,"elements")
return e?J.makeArray(e):this})).filter((function(){var e=this.type
return this.name&&!J(this).is(":disabled")&&lt.test(this.nodeName)&&!ct.test(e)&&(this.checked||!ge.test(e))})).map((function(e,t){var n=J(this).val()
return null==n?null:J.isArray(n)?J.map(n,(function(e){return{name:t.name,value:e.replace(/\r?\n/g,"\r\n")}})):{name:t.name,value:n.replace(/\r?\n/g,"\r\n")}})).get()}}),J.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}}
var ft=0,ht={},pt={0:200,1223:204},dt=J.ajaxSettings.xhr()
e.ActiveXObject&&J(e).on("unload",(function(){for(var e in ht)ht[e]()})),U.cors=!!dt&&"withCredentials"in dt,U.ajax=dt=!!dt,J.ajaxTransport((function(e){var t
return U.cors||dt&&!e.crossDomain?{send:function(n,i){var r,o=e.xhr(),s=++ft
if(o.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(r in e.xhrFields)o[r]=e.xhrFields[r]
for(r in e.mimeType&&o.overrideMimeType&&o.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest"),n)o.setRequestHeader(r,n[r])
t=function(e){return function(){t&&(delete ht[s],t=o.onload=o.onerror=null,"abort"===e?o.abort():"error"===e?i(o.status,o.statusText):i(pt[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=t(),o.onerror=t("error"),t=ht[s]=t("abort")
try{o.send(e.hasContent&&e.data||null)}catch(B){if(t)throw B}},abort:function(){t&&t()}}:void 0})),J.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return J.globalEval(e),e}}}),J.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),J.ajaxTransport("script",(function(e){var t,n
if(e.crossDomain)return{send:function(i,r){t=J("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&r("error"===e.type?404:200,e.type)}),V.head.appendChild(t[0])},abort:function(){n&&n()}}}))
var gt=[],vt=/(=)\?(?=&|$)|\?\?/
J.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=gt.pop()||J.expando+"_"+Qe++
return this[e]=!0,e}}),J.ajaxPrefilter("json jsonp",(function(t,n,i){var r,o,s,a=!1!==t.jsonp&&(vt.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&vt.test(t.data)&&"data")
return a||"jsonp"===t.dataTypes[0]?(r=t.jsonpCallback=J.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(vt,"$1"+r):!1!==t.jsonp&&(t.url+=(Ke.test(t.url)?"&":"?")+t.jsonp+"="+r),t.converters["script json"]=function(){return s||J.error(r+" was not called"),s[0]},t.dataTypes[0]="json",o=e[r],e[r]=function(){s=arguments},i.always((function(){e[r]=o,t[r]&&(t.jsonpCallback=n.jsonpCallback,gt.push(r)),s&&J.isFunction(o)&&o(s[0]),s=o=void 0})),"script"):void 0})),J.parseHTML=function(e,t,n){if(!e||"string"!=typeof e)return null
"boolean"==typeof t&&(n=t,t=!1),t=t||V
var i=K.exec(e),r=!n&&[]
return i?[t.createElement(i[1])]:(i=J.buildFragment([e],t,r),r&&r.length&&J(r).remove(),J.merge([],i.childNodes))}
var yt=J.fn.load
J.fn.load=function(e,t,n){if("string"!=typeof e&&yt)return yt.apply(this,arguments)
var i,r,o,s=this,a=e.indexOf(" ")
return a>=0&&(i=J.trim(e.slice(a)),e=e.slice(0,a)),J.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(r="POST"),s.length>0&&J.ajax({url:e,type:r,dataType:"html",data:t}).done((function(e){o=arguments,s.html(i?J("<div>").append(J.parseHTML(e)).find(i):e)})).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},J.expr.filters.animated=function(e){return J.grep(J.timers,(function(t){return e===t.elem})).length}
var mt=e.document.documentElement
J.offset={setOffset:function(e,t,n){var i,r,o,s,a,u,c=J.css(e,"position"),l=J(e),f={}
"static"===c&&(e.style.position="relative"),a=l.offset(),o=J.css(e,"top"),u=J.css(e,"left"),("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1?(s=(i=l.position()).top,r=i.left):(s=parseFloat(o)||0,r=parseFloat(u)||0),J.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+r),"using"in t?t.using.call(e,f):l.css(f)}},J.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){J.offset.setOffset(this,e,t)}))
var t,n,i=this[0],r={top:0,left:0},o=i&&i.ownerDocument
return o?(t=o.documentElement,J.contains(t,i)?(typeof i.getBoundingClientRect!==ve&&(r=i.getBoundingClientRect()),n=R(o),{top:r.top+n.pageYOffset-t.clientTop,left:r.left+n.pageXOffset-t.clientLeft}):r):void 0},position:function(){if(this[0]){var e,t,n=this[0],i={top:0,left:0}
return"fixed"===J.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),J.nodeName(e[0],"html")||(i=e.offset()),i.top+=J.css(e[0],"borderTopWidth",!0),i.left+=J.css(e[0],"borderLeftWidth",!0)),{top:t.top-i.top-J.css(n,"marginTop",!0),left:t.left-i.left-J.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){for(var e=this.offsetParent||mt;e&&!J.nodeName(e,"html")&&"static"===J.css(e,"position");)e=e.offsetParent
return e||mt}))}}),J.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(t,n){var i="pageYOffset"===n
J.fn[t]=function(r){return ae(this,(function(t,r,o){var s=R(t)
return void 0===o?s?s[n]:t[r]:void(s?s.scrollTo(i?e.pageXOffset:o,i?o:e.pageYOffset):t[r]=o)}),t,r,arguments.length,null)}})),J.each(["top","left"],(function(e,t){J.cssHooks[t]=b(U.pixelPosition,(function(e,n){return n?(n=w(e,t),De.test(n)?J(e).position()[t]+"px":n):void 0}))})),J.each({Height:"height",Width:"width"},(function(e,t){J.each({padding:"inner"+e,content:t,"":"outer"+e},(function(n,i){J.fn[i]=function(i,r){var o=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===r?"margin":"border")
return ae(this,(function(t,n,i){var r
return J.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(r=t.documentElement,Math.max(t.body["scroll"+e],r["scroll"+e],t.body["offset"+e],r["offset"+e],r["client"+e])):void 0===i?J.css(t,n,s):J.style(t,n,i,s)}),t,o?i:void 0,o,null)}}))})),J.fn.size=function(){return this.length},J.fn.andSelf=J.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],(function(){return J}))
var xt=e.jQuery,wt=e.$
return J.noConflict=function(t){return e.$===J&&(e.$=wt),t&&e.jQuery===J&&(e.jQuery=xt),J},typeof t===ve&&(e.jQuery=e.$=J),J})),function(){var e=this,t=e._,n={},i=Array.prototype,r=Object.prototype,o=Function.prototype,s=i.push,a=i.slice,u=i.concat,c=r.toString,l=r.hasOwnProperty,f=i.forEach,h=i.map,p=i.reduce,d=i.reduceRight,g=i.filter,v=i.every,y=i.some,m=i.indexOf,x=i.lastIndexOf,w=Array.isArray,b=Object.keys,S=o.bind,k=function(e){return e instanceof k?e:this instanceof k?void(this._wrapped=e):new k(e)}
"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=k),exports._=k):e._=k,k.VERSION="1.6.0"
var C=k.each=k.forEach=function(e,t,i){if(null==e)return e
if(f&&e.forEach===f)e.forEach(t,i)
else if(e.length===+e.length){for(var r=0,o=e.length;o>r;r++)if(t.call(i,e[r],r,e)===n)return}else{var s=k.keys(e)
for(r=0,o=s.length;o>r;r++)if(t.call(i,e[s[r]],s[r],e)===n)return}return e}
k.map=k.collect=function(e,t,n){var i=[]
return null==e?i:h&&e.map===h?e.map(t,n):(C(e,(function(e,r,o){i.push(t.call(n,e,r,o))})),i)}
var T="Reduce of empty array with no initial value"
k.reduce=k.foldl=k.inject=function(e,t,n,i){var r=arguments.length>2
if(null==e&&(e=[]),p&&e.reduce===p)return i&&(t=k.bind(t,i)),r?e.reduce(t,n):e.reduce(t)
if(C(e,(function(e,o,s){r?n=t.call(i,n,e,o,s):(n=e,r=!0)})),!r)throw new TypeError(T)
return n},k.reduceRight=k.foldr=function(e,t,n,i){var r=arguments.length>2
if(null==e&&(e=[]),d&&e.reduceRight===d)return i&&(t=k.bind(t,i)),r?e.reduceRight(t,n):e.reduceRight(t)
var o=e.length
if(o!==+o){var s=k.keys(e)
o=s.length}if(C(e,(function(a,u,c){u=s?s[--o]:--o,r?n=t.call(i,n,e[u],u,c):(n=e[u],r=!0)})),!r)throw new TypeError(T)
return n},k.find=k.detect=function(e,t,n){var i
return E(e,(function(e,r,o){return t.call(n,e,r,o)?(i=e,!0):void 0})),i},k.filter=k.select=function(e,t,n){var i=[]
return null==e?i:g&&e.filter===g?e.filter(t,n):(C(e,(function(e,r,o){t.call(n,e,r,o)&&i.push(e)})),i)},k.reject=function(e,t,n){return k.filter(e,(function(e,i,r){return!t.call(n,e,i,r)}),n)},k.every=k.all=function(e,t,i){t||(t=k.identity)
var r=!0
return null==e?r:v&&e.every===v?e.every(t,i):(C(e,(function(e,o,s){return(r=r&&t.call(i,e,o,s))?void 0:n})),!!r)}
var E=k.some=k.any=function(e,t,i){t||(t=k.identity)
var r=!1
return null==e?r:y&&e.some===y?e.some(t,i):(C(e,(function(e,o,s){return r||(r=t.call(i,e,o,s))?n:void 0})),!!r)}
k.contains=k.include=function(e,t){return null!=e&&(m&&e.indexOf===m?-1!=e.indexOf(t):E(e,(function(e){return e===t})))},k.invoke=function(e,t){var n=a.call(arguments,2),i=k.isFunction(t)
return k.map(e,(function(e){return(i?t:e[t]).apply(e,n)}))},k.pluck=function(e,t){return k.map(e,k.property(t))},k.where=function(e,t){return k.filter(e,k.matches(t))},k.findWhere=function(e,t){return k.find(e,k.matches(t))},k.max=function(e,t,n){if(!t&&k.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e)
var i=-1/0,r=-1/0
return C(e,(function(e,o,s){var a=t?t.call(n,e,o,s):e
a>r&&(i=e,r=a)})),i},k.min=function(e,t,n){if(!t&&k.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e)
var i=1/0,r=1/0
return C(e,(function(e,o,s){var a=t?t.call(n,e,o,s):e
r>a&&(i=e,r=a)})),i},k.shuffle=function(e){var t,n=0,i=[]
return C(e,(function(e){t=k.random(n++),i[n-1]=i[t],i[t]=e})),i},k.sample=function(e,t,n){return null==t||n?(e.length!==+e.length&&(e=k.values(e)),e[k.random(e.length-1)]):k.shuffle(e).slice(0,Math.max(0,t))}
var _=function(e){return null==e?k.identity:k.isFunction(e)?e:k.property(e)}
k.sortBy=function(e,t,n){return t=_(t),k.pluck(k.map(e,(function(e,i,r){return{value:e,index:i,criteria:t.call(n,e,i,r)}})).sort((function(e,t){var n=e.criteria,i=t.criteria
if(n!==i){if(n>i||void 0===n)return 1
if(i>n||void 0===i)return-1}return e.index-t.index})),"value")}
var $=function(e){return function(t,n,i){var r={}
return n=_(n),C(t,(function(o,s){var a=n.call(i,o,s,t)
e(r,a,o)})),r}}
k.groupBy=$((function(e,t,n){k.has(e,t)?e[t].push(n):e[t]=[n]})),k.indexBy=$((function(e,t,n){e[t]=n})),k.countBy=$((function(e,t){k.has(e,t)?e[t]++:e[t]=1})),k.sortedIndex=function(e,t,n,i){for(var r=(n=_(n)).call(i,t),o=0,s=e.length;s>o;){var a=o+s>>>1
n.call(i,e[a])<r?o=a+1:s=a}return o},k.toArray=function(e){return e?k.isArray(e)?a.call(e):e.length===+e.length?k.map(e,k.identity):k.values(e):[]},k.size=function(e){return null==e?0:e.length===+e.length?e.length:k.keys(e).length},k.first=k.head=k.take=function(e,t,n){return null==e?void 0:null==t||n?e[0]:0>t?[]:a.call(e,0,t)},k.initial=function(e,t,n){return a.call(e,0,e.length-(null==t||n?1:t))},k.last=function(e,t,n){return null==e?void 0:null==t||n?e[e.length-1]:a.call(e,Math.max(e.length-t,0))},k.rest=k.tail=k.drop=function(e,t,n){return a.call(e,null==t||n?1:t)},k.compact=function(e){return k.filter(e,k.identity)}
var N=function(e,t,n){return t&&k.every(e,k.isArray)?u.apply(n,e):(C(e,(function(e){k.isArray(e)||k.isArguments(e)?t?s.apply(n,e):N(e,t,n):n.push(e)})),n)}
k.flatten=function(e,t){return N(e,t,[])},k.without=function(e){return k.difference(e,a.call(arguments,1))},k.partition=function(e,t){var n=[],i=[]
return C(e,(function(e){(t(e)?n:i).push(e)})),[n,i]},k.uniq=k.unique=function(e,t,n,i){k.isFunction(t)&&(i=n,n=t,t=!1)
var r=n?k.map(e,n,i):e,o=[],s=[]
return C(r,(function(n,i){(t?i&&s[s.length-1]===n:k.contains(s,n))||(s.push(n),o.push(e[i]))})),o},k.union=function(){return k.uniq(k.flatten(arguments,!0))},k.intersection=function(e){var t=a.call(arguments,1)
return k.filter(k.uniq(e),(function(e){return k.every(t,(function(t){return k.contains(t,e)}))}))},k.difference=function(e){var t=u.apply(i,a.call(arguments,1))
return k.filter(e,(function(e){return!k.contains(t,e)}))},k.zip=function(){for(var e=k.max(k.pluck(arguments,"length").concat(0)),t=new Array(e),n=0;e>n;n++)t[n]=k.pluck(arguments,""+n)
return t},k.object=function(e,t){if(null==e)return{}
for(var n={},i=0,r=e.length;r>i;i++)t?n[e[i]]=t[i]:n[e[i][0]]=e[i][1]
return n},k.indexOf=function(e,t,n){if(null==e)return-1
var i=0,r=e.length
if(n){if("number"!=typeof n)return e[i=k.sortedIndex(e,t)]===t?i:-1
i=0>n?Math.max(0,r+n):n}if(m&&e.indexOf===m)return e.indexOf(t,n)
for(;r>i;i++)if(e[i]===t)return i
return-1},k.lastIndexOf=function(e,t,n){if(null==e)return-1
var i=null!=n
if(x&&e.lastIndexOf===x)return i?e.lastIndexOf(t,n):e.lastIndexOf(t)
for(var r=i?n:e.length;r--;)if(e[r]===t)return r
return-1},k.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1
for(var i=Math.max(Math.ceil((t-e)/n),0),r=0,o=new Array(i);i>r;)o[r++]=e,e+=n
return o}
var A=function(){}
k.bind=function(e,t){var n,i
if(S&&e.bind===S)return S.apply(e,a.call(arguments,1))
if(!k.isFunction(e))throw new TypeError
return n=a.call(arguments,2),i=function(){if(!(this instanceof i))return e.apply(t,n.concat(a.call(arguments)))
A.prototype=e.prototype
var r=new A
A.prototype=null
var o=e.apply(r,n.concat(a.call(arguments)))
return Object(o)===o?o:r}},k.partial=function(e){var t=a.call(arguments,1)
return function(){for(var n=0,i=t.slice(),r=0,o=i.length;o>r;r++)i[r]===k&&(i[r]=arguments[n++])
for(;n<arguments.length;)i.push(arguments[n++])
return e.apply(this,i)}},k.bindAll=function(e){var t=a.call(arguments,1)
if(0===t.length)throw new Error("bindAll must be passed function names")
return C(t,(function(t){e[t]=k.bind(e[t],e)})),e},k.memoize=function(e,t){var n={}
return t||(t=k.identity),function(){var i=t.apply(this,arguments)
return k.has(n,i)?n[i]:n[i]=e.apply(this,arguments)}},k.delay=function(e,t){var n=a.call(arguments,2)
return setTimeout((function(){return e.apply(null,n)}),t)},k.defer=function(e){return k.delay.apply(k,[e,1].concat(a.call(arguments,1)))},k.throttle=function(e,t,n){var i,r,o,s=null,a=0
n||(n={})
var u=function(){a=!1===n.leading?0:k.now(),s=null,o=e.apply(i,r),i=r=null}
return function(){var c=k.now()
a||!1!==n.leading||(a=c)
var l=t-(c-a)
return i=this,r=arguments,0>=l?(clearTimeout(s),s=null,a=c,o=e.apply(i,r),i=r=null):s||!1===n.trailing||(s=setTimeout(u,l)),o}},k.debounce=function(e,t,n){var i,r,o,s,a,u=function(){var c=k.now()-s
t>c?i=setTimeout(u,t-c):(i=null,n||(a=e.apply(o,r),o=r=null))}
return function(){o=this,r=arguments,s=k.now()
var c=n&&!i
return i||(i=setTimeout(u,t)),c&&(a=e.apply(o,r),o=r=null),a}},k.once=function(e){var t,n=!1
return function(){return n||(n=!0,t=e.apply(this,arguments),e=null),t}},k.wrap=function(e,t){return k.partial(t,e)},k.compose=function(){var e=arguments
return function(){for(var t=arguments,n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)]
return t[0]}},k.after=function(e,t){return function(){return--e<1?t.apply(this,arguments):void 0}},k.keys=function(e){if(!k.isObject(e))return[]
if(b)return b(e)
var t=[]
for(var n in e)k.has(e,n)&&t.push(n)
return t},k.values=function(e){for(var t=k.keys(e),n=t.length,i=new Array(n),r=0;n>r;r++)i[r]=e[t[r]]
return i},k.pairs=function(e){for(var t=k.keys(e),n=t.length,i=new Array(n),r=0;n>r;r++)i[r]=[t[r],e[t[r]]]
return i},k.invert=function(e){for(var t={},n=k.keys(e),i=0,r=n.length;r>i;i++)t[e[n[i]]]=n[i]
return t},k.functions=k.methods=function(e){var t=[]
for(var n in e)k.isFunction(e[n])&&t.push(n)
return t.sort()},k.extend=function(e){return C(a.call(arguments,1),(function(t){if(t)for(var n in t)e[n]=t[n]})),e},k.pick=function(e){var t={},n=u.apply(i,a.call(arguments,1))
return C(n,(function(n){n in e&&(t[n]=e[n])})),t},k.omit=function(e){var t={},n=u.apply(i,a.call(arguments,1))
for(var r in e)k.contains(n,r)||(t[r]=e[r])
return t},k.defaults=function(e){return C(a.call(arguments,1),(function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])})),e},k.clone=function(e){return k.isObject(e)?k.isArray(e)?e.slice():k.extend({},e):e},k.tap=function(e,t){return t(e),e}
var j=function(e,t,n,i){if(e===t)return 0!==e||1/e==1/t
if(null==e||null==t)return e===t
e instanceof k&&(e=e._wrapped),t instanceof k&&(t=t._wrapped)
var r=c.call(e)
if(r!=c.call(t))return!1
switch(r){case"[object String]":return e==String(t)
case"[object Number]":return e!=+e?t!=+t:0==e?1/e==1/t:e==+t
case"[object Date]":case"[object Boolean]":return+e==+t
case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if("object"!=typeof e||"object"!=typeof t)return!1
for(var o=n.length;o--;)if(n[o]==e)return i[o]==t
var s=e.constructor,a=t.constructor
if(s!==a&&!(k.isFunction(s)&&s instanceof s&&k.isFunction(a)&&a instanceof a)&&"constructor"in e&&"constructor"in t)return!1
n.push(e),i.push(t)
var u=0,l=!0
if("[object Array]"==r){if(l=(u=e.length)==t.length)for(;u--&&(l=j(e[u],t[u],n,i)););}else{for(var f in e)if(k.has(e,f)&&(u++,!(l=k.has(t,f)&&j(e[f],t[f],n,i))))break
if(l){for(f in t)if(k.has(t,f)&&!u--)break
l=!u}}return n.pop(),i.pop(),l}
k.isEqual=function(e,t){return j(e,t,[],[])},k.isEmpty=function(e){if(null==e)return!0
if(k.isArray(e)||k.isString(e))return 0===e.length
for(var t in e)if(k.has(e,t))return!1
return!0},k.isElement=function(e){return!(!e||1!==e.nodeType)},k.isArray=w||function(e){return"[object Array]"==c.call(e)},k.isObject=function(e){return e===Object(e)},C(["Arguments","Function","String","Number","Date","RegExp"],(function(e){k["is"+e]=function(t){return c.call(t)=="[object "+e+"]"}})),k.isArguments(arguments)||(k.isArguments=function(e){return!(!e||!k.has(e,"callee"))}),"function"!=typeof/./&&(k.isFunction=function(e){return"function"==typeof e}),k.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},k.isNaN=function(e){return k.isNumber(e)&&e!=+e},k.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"==c.call(e)},k.isNull=function(e){return null===e},k.isUndefined=function(e){return void 0===e},k.has=function(e,t){return l.call(e,t)},k.noConflict=function(){return e._=t,this},k.identity=function(e){return e},k.constant=function(e){return function(){return e}},k.property=function(e){return function(t){return t[e]}},k.matches=function(e){return function(t){if(t===e)return!0
for(var n in e)if(e[n]!==t[n])return!1
return!0}},k.times=function(e,t,n){for(var i=Array(Math.max(0,e)),r=0;e>r;r++)i[r]=t.call(n,r)
return i},k.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},k.now=Date.now||function(){return(new Date).getTime()}
var D={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}}
D.unescape=k.invert(D.escape)
var O={escape:new RegExp("["+k.keys(D.escape).join("")+"]","g"),unescape:new RegExp("("+k.keys(D.unescape).join("|")+")","g")}
k.each(["escape","unescape"],(function(e){k[e]=function(t){return null==t?"":(""+t).replace(O[e],(function(t){return D[e][t]}))}})),k.result=function(e,t){if(null!=e){var n=e[t]
return k.isFunction(n)?n.call(e):n}},k.mixin=function(e){C(k.functions(e),(function(t){var n=k[t]=e[t]
k.prototype[t]=function(){var e=[this._wrapped]
return s.apply(e,arguments),F.call(this,n.apply(k,e))}}))}
var P=0
k.uniqueId=function(e){var t=++P+""
return e?e+t:t},k.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g}
var L=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"}
k.template=function(e,t,n){var i
n=k.defaults({},n,k.templateSettings)
var r=new RegExp([(n.escape||L).source,(n.interpolate||L).source,(n.evaluate||L).source].join("|")+"|$","g"),o=0,s="__p+='"
e.replace(r,(function(t,n,i,r,a){return s+=e.slice(o,a).replace(/\\|'|\r|\n|\t|\u2028|\u2029/g,(function(e){return"\\"+R[e]})),n&&(s+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),i&&(s+="'+\n((__t=("+i+"))==null?'':__t)+\n'"),r&&(s+="';\n"+r+"\n__p+='"),o=a+t.length,t})),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n"
try{i=new Function(n.variable||"obj","_",s)}catch(a){throw a.source=s,a}if(t)return i(t,k)
var u=function(e){return i.call(this,e,k)}
return u.source="function("+(n.variable||"obj")+"){\n"+s+"}",u},k.chain=function(e){return k(e).chain()}
var F=function(e){return this._chain?k(e).chain():e}
k.mixin(k),C(["pop","push","reverse","shift","sort","splice","unshift"],(function(e){var t=i[e]
k.prototype[e]=function(){var n=this._wrapped
return t.apply(n,arguments),"shift"!=e&&"splice"!=e||0!==n.length||delete n[0],F.call(this,n)}})),C(["concat","join","slice"],(function(e){var t=i[e]
k.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}})),k.extend(k.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],(function(){return k}))}.call(this),function(e,t){if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],(function(n,i,r){e.Backbone=t(e,r,n,i)}))
else if("undefined"!=typeof exports){var n=require("underscore")
t(e,exports,n)}else e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}(this,(function(e,t,n,i){var r=e.Backbone,o=[].slice
t.VERSION="1.1.2",t.$=i,t.noConflict=function(){return e.Backbone=r,this},t.emulateHTTP=!1,t.emulateJSON=!1
var s=t.Events={on:function(e,t,n){return u(this,"on",e,[t,n])&&t?(this._events||(this._events={}),(this._events[e]||(this._events[e]=[])).push({callback:t,context:n,ctx:n||this}),this):this},once:function(e,t,i){if(!u(this,"once",e,[t,i])||!t)return this
var r=this,o=n.once((function(){r.off(e,o),t.apply(this,arguments)}))
return o._callback=t,this.on(e,o,i)},off:function(e,t,i){var r,o,s,a,c,l,f,h
if(!this._events||!u(this,"off",e,[t,i]))return this
if(!e&&!t&&!i)return this._events=void 0,this
for(c=0,l=(a=e?[e]:n.keys(this._events)).length;c<l;c++)if(e=a[c],s=this._events[e]){if(this._events[e]=r=[],t||i)for(f=0,h=s.length;f<h;f++)o=s[f],(t&&t!==o.callback&&t!==o.callback._callback||i&&i!==o.context)&&r.push(o)
r.length||delete this._events[e]}return this},trigger:function(e){if(!this._events)return this
var t=o.call(arguments,1)
if(!u(this,"trigger",e,t))return this
var n=this._events[e],i=this._events.all
return n&&c(n,t),i&&c(i,arguments),this},stopListening:function(e,t,i){var r=this._listeningTo
if(!r)return this
var o=!t&&!i
for(var s in i||"object"!=typeof t||(i=this),e&&((r={})[e._listenId]=e),r)(e=r[s]).off(t,i,this),(o||n.isEmpty(e._events))&&delete this._listeningTo[s]
return this}},a=/\s+/,u=function(e,t,n,i){if(!n)return!0
if("object"==typeof n){for(var r in n)e[t].apply(e,[r,n[r]].concat(i))
return!1}if(a.test(n)){for(var o=n.split(a),s=0,u=o.length;s<u;s++)e[t].apply(e,[o[s]].concat(i))
return!1}return!0},c=function(e,t){var n,i=-1,r=e.length,o=t[0],s=t[1],a=t[2]
switch(t.length){case 0:for(;++i<r;)(n=e[i]).callback.call(n.ctx)
return
case 1:for(;++i<r;)(n=e[i]).callback.call(n.ctx,o)
return
case 2:for(;++i<r;)(n=e[i]).callback.call(n.ctx,o,s)
return
case 3:for(;++i<r;)(n=e[i]).callback.call(n.ctx,o,s,a)
return
default:for(;++i<r;)(n=e[i]).callback.apply(n.ctx,t)
return}}
n.each({listenTo:"on",listenToOnce:"once"},(function(e,t){s[t]=function(t,i,r){return(this._listeningTo||(this._listeningTo={}))[t._listenId||(t._listenId=n.uniqueId("l"))]=t,r||"object"!=typeof i||(r=this),t[e](i,r,this),this}})),s.bind=s.on,s.unbind=s.off,n.extend(t,s)
var l=t.Model=function(e,t){var i=e||{}
t||(t={}),this.cid=n.uniqueId("c"),this.attributes={},t.collection&&(this.collection=t.collection),t.parse&&(i=this.parse(i,t)||{}),i=n.defaults({},i,n.result(this,"defaults")),this.set(i,t),this.changed={},this.initialize.apply(this,arguments)}
n.extend(l.prototype,s,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(e){return n.clone(this.attributes)},sync:function(){return t.sync.apply(this,arguments)},get:function(e){return this.attributes[e]},escape:function(e){return n.escape(this.get(e))},has:function(e){return null!=this.get(e)},set:function(e,t,i){var r,o,s,a,u,c,l,f
if(null==e)return this
if("object"==typeof e?(o=e,i=t):(o={})[e]=t,i||(i={}),!this._validate(o,i))return!1
for(r in s=i.unset,u=i.silent,a=[],c=this._changing,this._changing=!0,c||(this._previousAttributes=n.clone(this.attributes),this.changed={}),f=this.attributes,l=this._previousAttributes,this.idAttribute in o&&(this.id=o[this.idAttribute]),o)t=o[r],n.isEqual(f[r],t)||a.push(r),n.isEqual(l[r],t)?delete this.changed[r]:this.changed[r]=t,s?delete f[r]:f[r]=t
if(!u){a.length&&(this._pending=i)
for(var h=0,p=a.length;h<p;h++)this.trigger("change:"+a[h],this,f[a[h]],i)}if(c)return this
if(!u)for(;this._pending;)i=this._pending,this._pending=!1,this.trigger("change",this,i)
return this._pending=!1,this._changing=!1,this},unset:function(e,t){return this.set(e,void 0,n.extend({},t,{unset:!0}))},clear:function(e){var t={}
for(var i in this.attributes)t[i]=void 0
return this.set(t,n.extend({},e,{unset:!0}))},hasChanged:function(e){return null==e?!n.isEmpty(this.changed):n.has(this.changed,e)},changedAttributes:function(e){if(!e)return!!this.hasChanged()&&n.clone(this.changed)
var t,i=!1,r=this._changing?this._previousAttributes:this.attributes
for(var o in e)n.isEqual(r[o],t=e[o])||((i||(i={}))[o]=t)
return i},previous:function(e){return null!=e&&this._previousAttributes?this._previousAttributes[e]:null},previousAttributes:function(){return n.clone(this._previousAttributes)},fetch:function(e){void 0===(e=e?n.clone(e):{}).parse&&(e.parse=!0)
var t=this,i=e.success
return e.success=function(n){if(!t.set(t.parse(n,e),e))return!1
i&&i(t,n,e),t.trigger("sync",t,n,e)},k(this,e),this.sync("read",this,e)},save:function(e,t,i){var r,o,s,a=this.attributes
if(null==e||"object"==typeof e?(r=e,i=t):(r={})[e]=t,i=n.extend({validate:!0},i),r&&!i.wait){if(!this.set(r,i))return!1}else if(!this._validate(r,i))return!1
r&&i.wait&&(this.attributes=n.extend({},a,r)),void 0===i.parse&&(i.parse=!0)
var u=this,c=i.success
return i.success=function(e){u.attributes=a
var t=u.parse(e,i)
if(i.wait&&(t=n.extend(r||{},t)),n.isObject(t)&&!u.set(t,i))return!1
c&&c(u,e,i),u.trigger("sync",u,e,i)},k(this,i),"patch"===(o=this.isNew()?"create":i.patch?"patch":"update")&&(i.attrs=r),s=this.sync(o,this,i),r&&i.wait&&(this.attributes=a),s},destroy:function(e){e=e?n.clone(e):{}
var t=this,i=e.success,r=function(){t.trigger("destroy",t,t.collection,e)}
if(e.success=function(n){(e.wait||t.isNew())&&r(),i&&i(t,n,e),t.isNew()||t.trigger("sync",t,n,e)},this.isNew())return e.success(),!1
k(this,e)
var o=this.sync("delete",this,e)
return e.wait||r(),o},url:function(){var e=n.result(this,"urlRoot")||n.result(this.collection,"url")||S()
return this.isNew()?e:e.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(e,t){return e},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(e){return this._validate({},n.extend(e||{},{validate:!0}))},_validate:function(e,t){if(!t.validate||!this.validate)return!0
e=n.extend({},this.attributes,e)
var i=this.validationError=this.validate(e,t)||null
return!i||(this.trigger("invalid",this,i,n.extend(t,{validationError:i})),!1)}})
n.each(["keys","values","pairs","invert","pick","omit"],(function(e){l.prototype[e]=function(){var t=o.call(arguments)
return t.unshift(this.attributes),n[e].apply(n,t)}}))
var f=t.Collection=function(e,t){t||(t={}),t.model&&(this.model=t.model),void 0!==t.comparator&&(this.comparator=t.comparator),this._reset(),this.initialize.apply(this,arguments),e&&this.reset(e,n.extend({silent:!0},t))},h={add:!0,remove:!0,merge:!0},p={add:!0,remove:!1}
n.extend(f.prototype,s,{model:l,initialize:function(){},toJSON:function(e){return this.map((function(t){return t.toJSON(e)}))},sync:function(){return t.sync.apply(this,arguments)},add:function(e,t){return this.set(e,n.extend({merge:!1},t,p))},remove:function(e,t){var i,r,o,s,a=!n.isArray(e)
for(t||(t={}),i=0,r=(e=a?[e]:n.clone(e)).length;i<r;i++)(s=e[i]=this.get(e[i]))&&(delete this._byId[s.id],delete this._byId[s.cid],o=this.indexOf(s),this.models.splice(o,1),this.length--,t.silent||(t.index=o,s.trigger("remove",s,this,t)),this._removeReference(s,t))
return a?e[0]:e},set:function(e,t){(t=n.defaults({},t,h)).parse&&(e=this.parse(e,t))
var i=!n.isArray(e)
e=i?e?[e]:[]:n.clone(e)
var r,o,s,a,u,c,f,p=t.at,d=this.model,g=this.comparator&&null==p&&!1!==t.sort,v=n.isString(this.comparator)?this.comparator:null,y=[],m=[],x={},w=t.add,b=t.merge,S=t.remove,k=!(g||!w||!S)&&[]
for(r=0,o=e.length;r<o;r++){if(s=(u=e[r]||{})instanceof l?a=u:u[d.prototype.idAttribute||"id"],c=this.get(s))S&&(x[c.cid]=!0),b&&(u=u===a?a.attributes:u,t.parse&&(u=c.parse(u,t)),c.set(u,t),g&&!f&&c.hasChanged(v)&&(f=!0)),e[r]=c
else if(w){if(!(a=e[r]=this._prepareModel(u,t)))continue
y.push(a),this._addReference(a,t)}a=c||a,!k||!a.isNew()&&x[a.id]||k.push(a),x[a.id]=!0}if(S){for(r=0,o=this.length;r<o;++r)x[(a=this.models[r]).cid]||m.push(a)
m.length&&this.remove(m,t)}if(y.length||k&&k.length)if(g&&(f=!0),this.length+=y.length,null!=p)for(r=0,o=y.length;r<o;r++)this.models.splice(p+r,0,y[r])
else{k&&(this.models.length=0)
var C=k||y
for(r=0,o=C.length;r<o;r++)this.models.push(C[r])}if(f&&this.sort({silent:!0}),!t.silent){for(r=0,o=y.length;r<o;r++)(a=y[r]).trigger("add",a,this,t);(f||k&&k.length)&&this.trigger("sort",this,t)}return i?e[0]:e},reset:function(e,t){t||(t={})
for(var i=0,r=this.models.length;i<r;i++)this._removeReference(this.models[i],t)
return t.previousModels=this.models,this._reset(),e=this.add(e,n.extend({silent:!0},t)),t.silent||this.trigger("reset",this,t),e},push:function(e,t){return this.add(e,n.extend({at:this.length},t))},pop:function(e){var t=this.at(this.length-1)
return this.remove(t,e),t},unshift:function(e,t){return this.add(e,n.extend({at:0},t))},shift:function(e){var t=this.at(0)
return this.remove(t,e),t},slice:function(){return o.apply(this.models,arguments)},get:function(e){if(null!=e)return this._byId[e]||this._byId[e.id]||this._byId[e.cid]},at:function(e){return this.models[e]},where:function(e,t){return n.isEmpty(e)?t?void 0:[]:this[t?"find":"filter"]((function(t){for(var n in e)if(e[n]!==t.get(n))return!1
return!0}))},findWhere:function(e){return this.where(e,!0)},sort:function(e){if(!this.comparator)throw new Error("Cannot sort a set without a comparator")
return e||(e={}),n.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(n.bind(this.comparator,this)),e.silent||this.trigger("sort",this,e),this},pluck:function(e){return n.invoke(this.models,"get",e)},fetch:function(e){void 0===(e=e?n.clone(e):{}).parse&&(e.parse=!0)
var t=e.success,i=this
return e.success=function(n){var r=e.reset?"reset":"set"
i[r](n,e),t&&t(i,n,e),i.trigger("sync",i,n,e)},k(this,e),this.sync("read",this,e)},create:function(e,t){if(t=t?n.clone(t):{},!(e=this._prepareModel(e,t)))return!1
t.wait||this.add(e,t)
var i=this,r=t.success
return t.success=function(e,n){t.wait&&i.add(e,t),r&&r(e,n,t)},e.save(null,t),e},parse:function(e,t){return e},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(e,t){if(e instanceof l)return e;(t=t?n.clone(t):{}).collection=this
var i=new this.model(e,t)
return i.validationError?(this.trigger("invalid",this,i.validationError,t),!1):i},_addReference:function(e,t){this._byId[e.cid]=e,null!=e.id&&(this._byId[e.id]=e),e.collection||(e.collection=this),e.on("all",this._onModelEvent,this)},_removeReference:function(e,t){this===e.collection&&delete e.collection,e.off("all",this._onModelEvent,this)},_onModelEvent:function(e,t,n,i){("add"!==e&&"remove"!==e||n===this)&&("destroy"===e&&this.remove(t,i),t&&e==="change:"+t.idAttribute&&(delete this._byId[t.previous(t.idAttribute)],null!=t.id&&(this._byId[t.id]=t)),this.trigger.apply(this,arguments))}})
n.each(["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"],(function(e){f.prototype[e]=function(){var t=o.call(arguments)
return t.unshift(this.models),n[e].apply(n,t)}}))
n.each(["groupBy","countBy","sortBy","indexBy"],(function(e){f.prototype[e]=function(t,i){var r=n.isFunction(t)?t:function(e){return e.get(t)}
return n[e](this.models,r,i)}}))
var d=t.View=function(e){this.cid=n.uniqueId("view"),e||(e={}),n.extend(this,n.pick(e,g)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},g=["model","collection","el","id","attributes","className","tagName","events"]
n.extend(d.prototype,s,{tagName:"div",$:function(e){return this.$el.find(e)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(e,n){return this.$el&&this.undelegateEvents(),this.$el=e instanceof t.$?e:t.$(e),this.el=this.$el[0],!1!==n&&this.delegateEvents(),this},delegateEvents:function(e){if(!e&&!(e=n.result(this,"events")))return this
for(var t in this.undelegateEvents(),e){var i=e[t]
if(n.isFunction(i)||(i=this[e[t]]),i){var r=t.match(/^(\S+)\s*(.*)$/),o=r[1],s=r[2]
i=n.bind(i,this),o+=".delegateEvents"+this.cid,""===s?this.$el.on(o,i):this.$el.on(o,s,i)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){if(this.el)this.setElement(n.result(this,"el"),!1)
else{var e=n.extend({},n.result(this,"attributes"))
this.id&&(e.id=n.result(this,"id")),this.className&&(e.class=n.result(this,"className"))
var i=t.$("<"+n.result(this,"tagName")+">").attr(e)
this.setElement(i,!1)}}}),t.sync=function(e,i,r){var o=y[e]
n.defaults(r||(r={}),{emulateHTTP:t.emulateHTTP,emulateJSON:t.emulateJSON})
var s={type:o,dataType:"json"}
if(r.url||(s.url=n.result(i,"url")||S()),null!=r.data||!i||"create"!==e&&"update"!==e&&"patch"!==e||(s.contentType="application/json",s.data=JSON.stringify(r.attrs||i.toJSON(r))),r.emulateJSON&&(s.contentType="application/x-www-form-urlencoded",s.data=s.data?{model:s.data}:{}),r.emulateHTTP&&("PUT"===o||"DELETE"===o||"PATCH"===o)){s.type="POST",r.emulateJSON&&(s.data._method=o)
var a=r.beforeSend
r.beforeSend=function(e){if(e.setRequestHeader("X-HTTP-Method-Override",o),a)return a.apply(this,arguments)}}"GET"===s.type||r.emulateJSON||(s.processData=!1),"PATCH"===s.type&&v&&(s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")})
var u=r.xhr=t.ajax(n.extend(s,r))
return i.trigger("request",i,u,r),u}
var v=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),y={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"}
t.ajax=function(){return t.$.ajax.apply(t.$,arguments)}
var m=t.Router=function(e){e||(e={}),e.routes&&(this.routes=e.routes),this._bindRoutes(),this.initialize.apply(this,arguments)}
n.extend(m.prototype,s,{initialize:function(){},route:function(e,i,r){n.isRegExp(e)||(e=this._routeToRegExp(e)),n.isFunction(i)&&(r=i,i=""),r||(r=this[i])
var o=this
return t.history.route(e,(function(n){var s=o._extractParameters(e,n)
o.execute(r,s),o.trigger.apply(o,["route:"+i].concat(s)),o.trigger("route",i,s),t.history.trigger("route",o,i,s)})),this},execute:function(e,t){e&&e.apply(this,t)},navigate:function(e,n){return t.history.navigate(e,n),this},_bindRoutes:function(){if(this.routes){this.routes=n.result(this,"routes")
for(var e,t=n.keys(this.routes);null!=(e=t.pop());)this.route(e,this.routes[e])}},_routeToRegExp:function(e){return e=e.replace(/[\-{}\[\]+?.,\\\^$|#\s]/g,"\\$&").replace(/\((.*?)\)/g,"(?:$1)?").replace(/(\(\?)?:\w+/g,(function(e,t){return t?e:"([^/?]+)"})).replace(/\*\w+/g,"([^?]*?)"),new RegExp("^"+e+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(e,t){var i=e.exec(t).slice(1)
return n.map(i,(function(e,t){return t===i.length-1?e||null:e?decodeURIComponent(e):null}))}})
var x=t.History=function(){this.handlers=[],n.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},w=/^[#\/]|\s+$/g,b=/msie [\w.]+/
x.started=!1,n.extend(x.prototype,s,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(e){var t=(e||this).location.href.match(/#(.*)$/)
return t?t[1]:""},getFragment:function(e,t){if(null==e)if(this._hasPushState||!this._wantsHashChange||t){e=decodeURI(this.location.pathname+this.location.search)
var n=this.root.replace(/\/$/,"")
e.indexOf(n)||(e=e.slice(n.length))}else e=this.getHash()
return e.replace(w,"")},start:function(e){if(x.started)throw new Error("Backbone.history has already been started")
x.started=!0,this.options=n.extend({root:"/"},this.options,e),this.root=this.options.root,this._wantsHashChange=!1!==this.options.hashChange,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState)
var i=this.getFragment(),r=document.documentMode,o=b.exec(navigator.userAgent.toLowerCase())&&(!r||r<=7)
if(this.root=("/"+this.root+"/").replace(/^\/+|\/+$/g,"/"),o&&this._wantsHashChange){var s=t.$('<iframe src="javascript:0" tabindex="-1">')
this.iframe=s.hide().appendTo("body")[0].contentWindow,this.navigate(i)}this._hasPushState?t.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!o?t.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=i
var a=this.location
if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0
this._hasPushState&&this.atRoot()&&a.hash&&(this.fragment=this.getHash().replace(w,""),this.history.replaceState({},document.title,this.root+this.fragment))}if(!this.options.silent)return this.loadUrl()},stop:function(){t.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),x.started=!1},route:function(e,t){this.handlers.unshift({route:e,callback:t})},checkUrl:function(e){var t=this.getFragment()
if(t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment)return!1
this.iframe&&this.navigate(t),this.loadUrl()},loadUrl:function(e){return e=this.fragment=this.getFragment(e),n.any(this.handlers,(function(t){if(t.route.test(e))return t.callback(e),!0}))},navigate:function(e,t){if(!x.started)return!1
t&&!0!==t||(t={trigger:!!t})
var n=this.root+(e=this.getFragment(e||""))
if(e=e.replace(/#.*$/,""),this.fragment!==e){if(this.fragment=e,""===e&&"/"!==n&&(n=n.slice(0,-1)),this._hasPushState)this.history[t.replace?"replaceState":"pushState"]({},document.title,n)
else{if(!this._wantsHashChange)return this.location.assign(n)
this._updateHash(this.location,e,t.replace),this.iframe&&e!==this.getFragment(this.getHash(this.iframe))&&(t.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,e,t.replace))}return t.trigger?this.loadUrl(e):void 0}},_updateHash:function(e,t,n){if(n){var i=e.href.replace(/(javascript:|#).*$/,"")
e.replace(i+"#"+t)}else e.hash="#"+t}}),t.history=new x
l.extend=f.extend=m.extend=d.extend=x.extend=function(e,t){var i,r=this
i=e&&n.has(e,"constructor")?e.constructor:function(){return r.apply(this,arguments)},n.extend(i,r,t)
var o=function(){this.constructor=i}
return o.prototype=r.prototype,i.prototype=new o,e&&n.extend(i.prototype,e),i.__super__=r.prototype,i}
var S=function(){throw new Error('A "url" property or function must be specified')},k=function(e,t){var n=t.error
t.error=function(i){n&&n(e,i,t),e.trigger("error",e,i,t)}}
return t})),function(){var e=function(t){var n=new e.Index
return n.pipeline.add(e.trimmer,e.stopWordFilter,e.stemmer),t&&t.call(n,n),n}
e.version="0.5.3",e.utils={},e.utils.warn=function(e){return function(t){e.console&&console.warn&&console.warn(t)}}(this),e.EventEmitter=function(){this.events={}},e.EventEmitter.prototype.addListener=function(){var e=Array.prototype.slice.call(arguments),t=e.pop(),n=e
if("function"!=typeof t)throw new TypeError("last argument must be a function")
n.forEach((function(e){this.hasHandler(e)||(this.events[e]=[]),this.events[e].push(t)}),this)},e.EventEmitter.prototype.removeListener=function(e,t){if(this.hasHandler(e)){var n=this.events[e].indexOf(t)
this.events[e].splice(n,1),this.events[e].length||delete this.events[e]}},e.EventEmitter.prototype.emit=function(e){if(this.hasHandler(e)){var t=Array.prototype.slice.call(arguments,1)
this.events[e].forEach((function(e){e.apply(void 0,t)}))}},e.EventEmitter.prototype.hasHandler=function(e){return e in this.events},e.tokenizer=function(e){if(!arguments.length||null==e||null==e)return[]
if(Array.isArray(e))return e.map((function(e){return e.toLowerCase()}))
for(var t=e.toString().replace(/^\s+/,""),n=t.length-1;n>=0;n--)if(/\S/.test(t.charAt(n))){t=t.substring(0,n+1)
break}return t.split(/\s+/).map((function(e){return e.toLowerCase()}))},e.Pipeline=function(){this._stack=[]},e.Pipeline.registeredFunctions={},e.Pipeline.registerFunction=function(t,n){n in this.registeredFunctions&&e.utils.warn("Overwriting existing registered function: "+n),t.label=n,e.Pipeline.registeredFunctions[t.label]=t},e.Pipeline.warnIfFunctionNotRegistered=function(t){t.label&&t.label in this.registeredFunctions||e.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",t)},e.Pipeline.load=function(t){var n=new e.Pipeline
return t.forEach((function(t){var i=e.Pipeline.registeredFunctions[t]
if(!i)throw new Error("Cannot load un-registered function: "+t)
n.add(i)})),n},e.Pipeline.prototype.add=function(){Array.prototype.slice.call(arguments).forEach((function(t){e.Pipeline.warnIfFunctionNotRegistered(t),this._stack.push(t)}),this)},e.Pipeline.prototype.after=function(t,n){e.Pipeline.warnIfFunctionNotRegistered(n)
var i=this._stack.indexOf(t)+1
this._stack.splice(i,0,n)},e.Pipeline.prototype.before=function(t,n){e.Pipeline.warnIfFunctionNotRegistered(n)
var i=this._stack.indexOf(t)
this._stack.splice(i,0,n)},e.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e)
this._stack.splice(t,1)},e.Pipeline.prototype.run=function(e){for(var t=[],n=e.length,i=this._stack.length,r=0;n>r;r++){for(var o=e[r],s=0;i>s&&void 0!==(o=this._stack[s](o,r,e));s++);void 0!==o&&t.push(o)}return t},e.Pipeline.prototype.reset=function(){this._stack=[]},e.Pipeline.prototype.toJSON=function(){return this._stack.map((function(t){return e.Pipeline.warnIfFunctionNotRegistered(t),t.label}))},e.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},e.Vector.Node=function(e,t,n){this.idx=e,this.val=t,this.next=n},e.Vector.prototype.insert=function(t,n){var i=this.list
if(!i)return this.list=new e.Vector.Node(t,n,i),this.length++
for(var r=i,o=i.next;null!=o;){if(t<o.idx)return r.next=new e.Vector.Node(t,n,o),this.length++
r=o,o=o.next}return r.next=new e.Vector.Node(t,n,o),this.length++},e.Vector.prototype.magnitude=function(){if(this._magniture)return this._magnitude
for(var e,t=this.list,n=0;t;)n+=(e=t.val)*e,t=t.next
return this._magnitude=Math.sqrt(n)},e.Vector.prototype.dot=function(e){for(var t=this.list,n=e.list,i=0;t&&n;)t.idx<n.idx?t=t.next:(t.idx>n.idx||(i+=t.val*n.val,t=t.next),n=n.next)
return i},e.Vector.prototype.similarity=function(e){return this.dot(e)/(this.magnitude()*e.magnitude())},e.SortedSet=function(){this.length=0,this.elements=[]},e.SortedSet.load=function(e){var t=new this
return t.elements=e,t.length=e.length,t},e.SortedSet.prototype.add=function(){Array.prototype.slice.call(arguments).forEach((function(e){~this.indexOf(e)||this.elements.splice(this.locationFor(e),0,e)}),this),this.length=this.elements.length},e.SortedSet.prototype.toArray=function(){return this.elements.slice()},e.SortedSet.prototype.map=function(e,t){return this.elements.map(e,t)},e.SortedSet.prototype.forEach=function(e,t){return this.elements.forEach(e,t)},e.SortedSet.prototype.indexOf=function(e,t,n){t=t||0
var i=(n=n||this.elements.length)-t,r=t+Math.floor(i/2),o=this.elements[r]
return 1>=i?o===e?r:-1:e>o?this.indexOf(e,r,n):o>e?this.indexOf(e,t,r):o===e?r:void 0},e.SortedSet.prototype.locationFor=function(e,t,n){t=t||0
var i=(n=n||this.elements.length)-t,r=t+Math.floor(i/2),o=this.elements[r]
if(1>=i){if(o>e)return r
if(e>o)return r+1}return e>o?this.locationFor(e,r,n):o>e?this.locationFor(e,t,r):void 0},e.SortedSet.prototype.intersect=function(t){for(var n=new e.SortedSet,i=0,r=0,o=this.length,s=t.length,a=this.elements,u=t.elements;!(i>o-1||r>s-1);)a[i]!==u[r]?a[i]<u[r]?i++:a[i]>u[r]&&r++:(n.add(a[i]),i++,r++)
return n},e.SortedSet.prototype.clone=function(){var t=new e.SortedSet
return t.elements=this.toArray(),t.length=t.elements.length,t},e.SortedSet.prototype.union=function(e){var t,n,i
return this.length>=e.length?(t=this,n=e):(t=e,n=this),(i=t.clone()).add.apply(i,n.toArray()),i},e.SortedSet.prototype.toJSON=function(){return this.toArray()},e.Index=function(){this._fields=[],this._ref="id",this.pipeline=new e.Pipeline,this.documentStore=new e.Store,this.tokenStore=new e.TokenStore,this.corpusTokens=new e.SortedSet,this.eventEmitter=new e.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},e.Index.prototype.on=function(){var e=Array.prototype.slice.call(arguments)
return this.eventEmitter.addListener.apply(this.eventEmitter,e)},e.Index.prototype.off=function(e,t){return this.eventEmitter.removeListener(e,t)},e.Index.load=function(t){t.version!==e.version&&e.utils.warn("version mismatch: current "+e.version+" importing "+t.version)
var n=new this
return n._fields=t.fields,n._ref=t.ref,n.documentStore=e.Store.load(t.documentStore),n.tokenStore=e.TokenStore.load(t.tokenStore),n.corpusTokens=e.SortedSet.load(t.corpusTokens),n.pipeline=e.Pipeline.load(t.pipeline),n},e.Index.prototype.field=function(e,t){var n={name:e,boost:(t=t||{}).boost||1}
return this._fields.push(n),this},e.Index.prototype.ref=function(e){return this._ref=e,this},e.Index.prototype.add=function(t,n){var i={},r=new e.SortedSet,o=t[this._ref]
n=void 0===n||n
this._fields.forEach((function(n){var o=this.pipeline.run(e.tokenizer(t[n.name]))
i[n.name]=o,e.SortedSet.prototype.add.apply(r,o)}),this),this.documentStore.set(o,r),e.SortedSet.prototype.add.apply(this.corpusTokens,r.toArray())
for(var s=0;s<r.length;s++){var a=r.elements[s],u=this._fields.reduce((function(e,t){var n=i[t.name].length
return n?e+i[t.name].filter((function(e){return e===a})).length/n*t.boost:e}),0)
this.tokenStore.add(a,{ref:o,tf:u})}n&&this.eventEmitter.emit("add",t,this)},e.Index.prototype.remove=function(e,t){var n=e[this._ref]
t=void 0===t||t
if(this.documentStore.has(n)){var i=this.documentStore.get(n)
this.documentStore.remove(n),i.forEach((function(e){this.tokenStore.remove(e,n)}),this),t&&this.eventEmitter.emit("remove",e,this)}},e.Index.prototype.update=function(e,t){t=void 0===t||t
this.remove(e,!1),this.add(e,!1),t&&this.eventEmitter.emit("update",e,this)},e.Index.prototype.idf=function(e){var t="@"+e
if(Object.prototype.hasOwnProperty.call(this._idfCache,t))return this._idfCache[t]
var n=this.tokenStore.count(e),i=1
return n>0&&(i=1+Math.log(this.tokenStore.length/n)),this._idfCache[t]=i},e.Index.prototype.search=function(t){var n=this.pipeline.run(e.tokenizer(t)),i=new e.Vector,r=[],o=this._fields.reduce((function(e,t){return e+t.boost}),0)
return n.some((function(e){return this.tokenStore.has(e)}),this)?(n.forEach((function(t,n,s){var a=1/s.length*this._fields.length*o,u=this,c=this.tokenStore.expand(t).reduce((function(n,r){var o=u.corpusTokens.indexOf(r),s=u.idf(r),c=1,l=new e.SortedSet
if(r!==t){var f=Math.max(3,r.length-t.length)
c=1/Math.log(f)}return o>-1&&i.insert(o,a*s*c),Object.keys(u.tokenStore.get(r)).forEach((function(e){l.add(e)})),n.union(l)}),new e.SortedSet)
r.push(c)}),this),r.reduce((function(e,t){return e.intersect(t)})).map((function(e){return{ref:e,score:i.similarity(this.documentVector(e))}}),this).sort((function(e,t){return t.score-e.score}))):[]},e.Index.prototype.documentVector=function(t){for(var n=this.documentStore.get(t),i=n.length,r=new e.Vector,o=0;i>o;o++){var s=n.elements[o],a=this.tokenStore.get(s)[t].tf,u=this.idf(s)
r.insert(this.corpusTokens.indexOf(s),a*u)}return r},e.Index.prototype.toJSON=function(){return{version:e.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},e.Index.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1)
t.unshift(this),e.apply(this,t)},e.Store=function(){this.store={},this.length=0},e.Store.load=function(t){var n=new this
return n.length=t.length,n.store=Object.keys(t.store).reduce((function(n,i){return n[i]=e.SortedSet.load(t.store[i]),n}),{}),n},e.Store.prototype.set=function(e,t){this.store[e]=t,this.length=Object.keys(this.store).length},e.Store.prototype.get=function(e){return this.store[e]},e.Store.prototype.has=function(e){return e in this.store},e.Store.prototype.remove=function(e){this.has(e)&&(delete this.store[e],this.length--)},e.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},e.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},t={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[aeiouy]",i="[^aeiou][^aeiouy]*",r=n+"[aeiou]*",o="^("+i+")?"+r+i,s="^("+i+")?"+r+i+r+i
return function(r){var a,u,c,l,f,h,p
if(r.length<3)return r
if("y"==(c=r.substr(0,1))&&(r=c.toUpperCase()+r.substr(1)),f=/^(.+?)([^s])s$/,(l=/^(.+?)(ss|i)es$/).test(r)?r=r.replace(l,"$1$2"):f.test(r)&&(r=r.replace(f,"$1$2")),f=/^(.+?)(ed|ing)$/,(l=/^(.+?)eed$/).test(r)){var d=l.exec(r);(l=new RegExp(o)).test(d[1])&&(l=/.$/,r=r.replace(l,""))}else if(f.test(r)){a=(d=f.exec(r))[1],(f=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy]")).test(a)&&(r=a,f=/(at|bl|iz)$/,h=new RegExp("([^aeiouylsz])\\1$"),p=new RegExp("^"+i+n+"[^aeiouwxy]$"),f.test(r)?r+="e":h.test(r)?(l=/.$/,r=r.replace(l,"")):p.test(r)&&(r+="e"))}(l=/^(.+?[^aeiou])y$/).test(r)&&(r=(a=(d=l.exec(r))[1])+"i");(l=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/).test(r)&&(a=(d=l.exec(r))[1],u=d[2],(l=new RegExp(o)).test(a)&&(r=a+e[u]));(l=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/).test(r)&&(a=(d=l.exec(r))[1],u=d[2],(l=new RegExp(o)).test(a)&&(r=a+t[u]))
if(f=/^(.+?)(s|t)(ion)$/,(l=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/).test(r))a=(d=l.exec(r))[1],(l=new RegExp(s)).test(a)&&(r=a)
else if(f.test(r)){a=(d=f.exec(r))[1]+d[2],(f=new RegExp(s)).test(a)&&(r=a)}(l=/^(.+?)e$/).test(r)&&(a=(d=l.exec(r))[1],l=new RegExp(s),f=new RegExp("^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$"),h=new RegExp("^"+i+n+"[^aeiouwxy]$"),(l.test(a)||f.test(a)&&!h.test(a))&&(r=a))
return l=/ll$/,f=new RegExp(s),l.test(r)&&f.test(r)&&(l=/.$/,r=r.replace(l,"")),"y"==c&&(r=c.toLowerCase()+r.substr(1)),r}}(),e.Pipeline.registerFunction(e.stemmer,"stemmer"),e.stopWordFilter=function(t){return-1===e.stopWordFilter.stopWords.indexOf(t)?t:void 0},e.stopWordFilter.stopWords=new e.SortedSet,e.stopWordFilter.stopWords.length=119,e.stopWordFilter.stopWords.elements=["","a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"],e.Pipeline.registerFunction(e.stopWordFilter,"stopWordFilter"),e.trimmer=function(e){return e.replace(/^\W+/,"").replace(/\W+$/,"")},e.Pipeline.registerFunction(e.trimmer,"trimmer"),e.TokenStore=function(){this.root={docs:{}},this.length=0},e.TokenStore.load=function(e){var t=new this
return t.root=e.root,t.length=e.length,t},e.TokenStore.prototype.add=function(e,t,n){n=n||this.root
var i=e[0],r=e.slice(1)
return i in n||(n[i]={docs:{}}),0===r.length?(n[i].docs[t.ref]=t,void(this.length+=1)):this.add(r,t,n[i])},e.TokenStore.prototype.has=function(e){if(!e)return!1
for(var t=this.root,n=0;n<e.length;n++){if(!t[e[n]])return!1
t=t[e[n]]}return!0},e.TokenStore.prototype.getNode=function(e){if(!e)return{}
for(var t=this.root,n=0;n<e.length;n++){if(!t[e[n]])return{}
t=t[e[n]]}return t},e.TokenStore.prototype.get=function(e,t){return this.getNode(e,t).docs||{}},e.TokenStore.prototype.count=function(e,t){return Object.keys(this.get(e,t)).length},e.TokenStore.prototype.remove=function(e,t){if(e){for(var n=this.root,i=0;i<e.length;i++){if(!(e[i]in n))return
n=n[e[i]]}delete n.docs[t]}},e.TokenStore.prototype.expand=function(e,t){var n=this.getNode(e),i=n.docs||{}
t=t||[]
return Object.keys(i).length&&t.push(e),Object.keys(n).forEach((function(n){"docs"!==n&&t.concat(this.expand(e+n,t))}),this),t},e.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.lunr=t()}(this,(function(){return e}))}()
var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}
return function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),typedoc,typedoc,typedoc,typedoc,typedoc,typedoc,typedoc,typedoc,typedoc,typedoc,typedoc
!function(e){e.$html=$("html")
var t,n=[],i=[]
e.$document=$(document),e.$window=$(window),e.$body=$("body"),e.registerService=function(e,t,i){void 0===i&&(i=0),n.push({constructor:e,name:t,priority:i,instance:null}),n.sort((function(e,t){return e.priority-t.priority}))},e.registerComponent=function(e,t,n,r){void 0===n&&(n=0),void 0===r&&(r="*"),i.push({selector:t,constructor:e,priority:n,namespace:r}),i.sort((function(e,t){return e.priority-t.priority}))},"undefined"!=typeof Backbone&&(e.Events=(t=function(){},_.extend(t.prototype,Backbone.Events),t))
var r=function(t){function r(){var n=t.call(this)||this
return n.createServices(),n.createComponents(e.$body),n}return __extends(r,t),r.prototype.createServices=function(){_(n).forEach((function(t){t.instance=new t.constructor,e[t.name]=t.instance}))},r.prototype.createComponents=function(e,t){void 0===t&&(t="default")
var n=[]
return _(i).forEach((function(i){i.namespace!=t&&"*"!=i.namespace||e.find(i.selector).each((function(e,t){var r,o=$(t);(r=o.data("component"))?-1==_(n).indexOf(r)&&n.push(r):(r=new i.constructor({el:t}),o.data("component",r),n.push(r))}))})),n},r}(e.Events)
e.Application=r}(typedoc||(typedoc={})),function(e){var t=function(){function e(e,t){this.key=e,this.value=t,this.defaultValue=t,this.initialize(),window.localStorage[this.key]&&this.setValue(this.fromLocalStorage(window.localStorage[this.key]))}return e.prototype.initialize=function(){},e.prototype.handleValueChange=function(e,t){},e.prototype.fromLocalStorage=function(e){return e},e.prototype.toLocalStorage=function(e){return e},e.prototype.setValue=function(e){if(this.value!=e){var t=this.value
this.value=e,window.localStorage[this.key]=this.toLocalStorage(e),this.handleValueChange(t,e)}},e}(),n=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype.initialize=function(){var e=this
this.$checkbox=$("#tsd-filter-"+this.key),this.$checkbox.on("change",(function(){e.setValue(e.$checkbox.prop("checked"))}))},n.prototype.handleValueChange=function(t,n){this.$checkbox.prop("checked",this.value),e.$html.toggleClass("toggle-"+this.key,this.value!=this.defaultValue)},n.prototype.fromLocalStorage=function(e){return"true"==e},n.prototype.toLocalStorage=function(e){return e?"true":"false"},n}(t),i=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype.initialize=function(){var t=this
e.$html.addClass("toggle-"+this.key+this.value),this.$select=$("#tsd-filter-"+this.key),this.$select.on(e.pointerDown+" mouseover",(function(){t.$select.addClass("active")})).on("mouseleave",(function(){t.$select.removeClass("active")})).on(e.pointerUp,"li",(function(e){t.$select.removeClass("active"),t.setValue($(e.target).attr("data-value"))})),e.$document.on(e.pointerDown,(function(e){$(e.target).parents().addBack().is(t.$select)||t.$select.removeClass("active")}))},n.prototype.handleValueChange=function(t,n){this.$select.find("li.selected").removeClass("selected"),this.$select.find(".tsd-select-label").text(this.$select.find('li[data-value="'+n+'"]').addClass("selected").text()),e.$html.removeClass("toggle-"+t),e.$html.addClass("toggle-"+n)},n}(t),r=function(e){function t(t){var r=e.call(this,t)||this
return r.optionVisibility=new i("visibility","private"),r.optionInherited=new n("inherited",!0),r.optionExternals=new n("externals",!0),r.optionOnlyExported=new n("only-exported",!1),r}return __extends(t,e),t.isSupported=function(){try{return void 0!==window.localStorage}catch(e){return!1}},t}(Backbone.View)
r.isSupported()?e.registerComponent(r,"#tsd-filter"):e.$html.addClass("no-filter")}(typedoc||(typedoc={})),function(e){var t=function(t){function n(n){var i=t.call(this,n)||this
return i.index=0,i.listenTo(e.viewport,"resize",i.onResize),i.listenTo(e.viewport,"scroll",i.onScroll),i.createAnchors(),i}return __extends(n,t),n.prototype.createAnchors=function(){var e=this
this.index=0,this.anchors=[{position:0}]
var t=window.location.href;-1!=t.indexOf("#")&&(t=t.substr(0,t.indexOf("#"))),this.$el.find("a").each((function(n,i){var r=i.href
if(-1!=r.indexOf("#")&&r.substr(0,t.length)==t){var o=r.substr(r.indexOf("#")+1),s=$("a.tsd-anchor[name="+o+"]")
0!=s.length&&e.anchors.push({$link:$(i.parentNode),$anchor:s,position:0})}})),this.onResize()},n.prototype.onResize=function(){for(var t,n=1,i=this.anchors.length;n<i;n++)(t=this.anchors[n]).position=t.$anchor.offset().top
this.anchors.sort((function(e,t){return e.position-t.position})),this.onScroll(e.viewport.scrollTop)},n.prototype.onScroll=function(e){var t=this.anchors,n=this.index,i=t.length-1
for(e+=5;n>0&&t[n].position>e;)n-=1
for(;n<i&&t[n+1].position<e;)n+=1
this.index!=n&&(this.index>0&&this.anchors[this.index].$link.removeClass("focus"),this.index=n,this.index>0&&this.anchors[this.index].$link.addClass("focus"))},n}(Backbone.View)
e.MenuHighlight=t,e.registerComponent(t,".menu-highlight")}(typedoc||(typedoc={})),function(e){var t,n=e.$html.hasClass("csspositionsticky")
!function(e){e[e.None=0]="None",e[e.Secondary=1]="Secondary",e[e.Current=2]="Current"}(t||(t={}))
var i=function(i){function r(r){var o=i.call(this,r)||this
return o.state="",o.stickyMode=t.None,o.$current=o.$el.find("> ul.current"),o.$navigation=o.$el.parents(".menu-sticky-wrap"),o.$container=o.$el.parents(".row"),o.listenTo(e.viewport,"resize",o.onResize),n||o.listenTo(e.viewport,"scroll",o.onScroll),o.onResize(e.viewport.width,e.viewport.height),o}return __extends(r,i),r.prototype.setState=function(e){this.state!=e&&(""!=this.state&&this.$navigation.removeClass(this.state),this.state=e,""!=this.state&&this.$navigation.addClass(this.state))},r.prototype.onResize=function(i,r){this.stickyMode=t.None,this.setState("")
var o=this.$container.offset().top,s=this.$container.height(),a=o+s
if(this.$navigation.height()<s){var u=this.$el.height(),c=this.$el.offset().top
if(this.$current.length){var l=this.$current.height(),f=this.$current.offset().top
this.$navigation.css("top",o-f+20),l<r&&(this.stickyMode=t.Current,this.stickyTop=f,this.stickyBottom=a-u+(f-c)-20)}u<r&&(this.$navigation.css("top",o-c+20),this.stickyMode=t.Secondary,this.stickyTop=c,this.stickyBottom=a-u-20)}n?this.stickyMode==t.Current?this.setState("sticky-current"):this.stickyMode==t.Secondary?this.setState("sticky"):this.setState(""):(this.$navigation.css("left",this.$navigation.offset().left),this.onScroll(e.viewport.scrollTop))},r.prototype.onScroll=function(e){this.stickyMode==t.Current?e>this.stickyBottom?this.setState("sticky-bottom"):this.setState(e+20>this.stickyTop?"sticky-current":""):this.stickyMode==t.Secondary&&(e>this.stickyBottom?this.setState("sticky-bottom"):this.setState(e+20>this.stickyTop?"sticky":""))},r}(Backbone.View)
e.MenuSticky=i,e.registerComponent(i,".menu-sticky")}(typedoc||(typedoc={})),function(typedoc){var search
!function(search){function createIndex(){(index=new lunr.Index).pipeline.add(lunr.trimmer),index.field("name",{boost:10}),index.field("parent"),index.ref("id")
var e=search.data.rows,t=0,n=e.length;(function i(){for(var r=0;r++<100;)if(index.add(e[t]),++t==n)return setLoadingState(SearchLoadingState.Ready)
setTimeout(i,10)})()}function loadIndex(){loadingState==SearchLoadingState.Idle&&(setTimeout((function(){loadingState==SearchLoadingState.Idle&&setLoadingState(SearchLoadingState.Loading)}),500),void 0!==search.data?createIndex():$.get($el.attr("data-index")).done((function(source){eval(source),createIndex()})).fail((function(){setLoadingState(SearchLoadingState.Failure)})))}function updateResults(){if(loadingState==SearchLoadingState.Ready){$results.empty()
for(var e=index.search(query),t=0,n=Math.min(10,e.length);t<n;t++){var i=search.data.rows[e[t].ref],r=i.name
i.parent&&(r='<span class="parent">'+i.parent+".</span>"+r),$results.append('<li class="'+i.classes+'"><a href="'+base+i.url+'" class="tsd-kind-icon">'+r+"</li>")}}}function setLoadingState(e){loadingState!=e&&($el.removeClass(SearchLoadingState[loadingState].toLowerCase()),loadingState=e,$el.addClass(SearchLoadingState[loadingState].toLowerCase()),e==SearchLoadingState.Ready&&updateResults())}function setHasFocus(e){hasFocus!=e&&(hasFocus=e,$el.toggleClass("has-focus"),e?(setQuery(""),$field.val("")):$field.val(query))}function setQuery(e){query=$.trim(e),updateResults()}function setCurrentResult(e){var t=$results.find(".current")
if(0==t.length)$results.find(1==e?"li:first-child":"li:last-child").addClass("current")
else{var n=1==e?t.next("li"):t.prev("li")
n.length>0&&(t.removeClass("current"),n.addClass("current"))}}function gotoCurrentResult(){var e=$results.find(".current")
0==e.length&&(e=$results.find("li:first-child")),e.length>0&&(window.location.href=e.find("a").prop("href"),$field.blur())}var SearchLoadingState
!function(e){e[e.Idle=0]="Idle",e[e.Loading=1]="Loading",e[e.Ready=2]="Ready",e[e.Failure=3]="Failure"}(SearchLoadingState||(SearchLoadingState={}))
var $el=$("#tsd-search"),$field=$("#tsd-search-field"),$results=$(".results"),base=$el.attr("data-base")+"/",query="",loadingState=SearchLoadingState.Idle,hasFocus=!1,preventPress=!1,index
$field.on("focusin",(function(){setHasFocus(!0),loadIndex()})).on("focusout",(function(){setTimeout((function(){return setHasFocus(!1)}),100)})).on("input",(function(){setQuery($.trim($field.val()))})).on("keydown",(function(e){13==e.keyCode||27==e.keyCode||38==e.keyCode||40==e.keyCode?(preventPress=!0,e.preventDefault(),13==e.keyCode?gotoCurrentResult():27==e.keyCode?$field.blur():38==e.keyCode?setCurrentResult(-1):40==e.keyCode&&setCurrentResult(1)):preventPress=!1})).on("keypress",(function(e){preventPress&&e.preventDefault()})),$("body").on("keydown",(function(e){e.altKey||e.ctrlKey||e.metaKey||!hasFocus&&e.keyCode>47&&e.keyCode<112&&$field.focus()}))}(search=typedoc.search||(typedoc.search={}))}(typedoc||(typedoc={})),function(e){var t=function(){function e(e,t){this.$signature=e,this.$description=t}return e.prototype.addClass=function(e){return this.$signature.addClass(e),this.$description.addClass(e),this},e.prototype.removeClass=function(e){return this.$signature.removeClass(e),this.$description.removeClass(e),this},e}(),n=function(n){function i(e){var t=n.call(this,e)||this
return t.index=-1,t.createGroups(),t.groups&&(t.$el.addClass("active").on("touchstart",".tsd-signature",(function(e){return t.onClick(e)})).on("click",".tsd-signature",(function(e){return t.onClick(e)})),t.$container.addClass("active"),t.setIndex(0)),t}return __extends(i,n),i.prototype.setIndex=function(t){if(t<0&&(t=0),t>this.groups.length-1&&(t=this.groups.length-1),this.index!=t){var n=this.groups[t]
if(this.index>-1){var i=this.groups[this.index]
e.animateHeight(this.$container,(function(){i.removeClass("current").addClass("fade-out"),n.addClass("current fade-in"),e.viewport.triggerResize()})),setTimeout((function(){i.removeClass("fade-out"),n.removeClass("fade-in")}),300)}else n.addClass("current"),e.viewport.triggerResize()
this.index=t}},i.prototype.createGroups=function(){var e=this,n=this.$el.find("> .tsd-signature")
if(!(n.length<2)){this.$container=this.$el.siblings(".tsd-descriptions")
var i=this.$container.find("> .tsd-description")
this.groups=[],n.each((function(n,r){e.groups.push(new t($(r),i.eq(n)))}))}},i.prototype.onClick=function(e){var t=this
e.preventDefault(),_(this.groups).forEach((function(n,i){n.$signature.is(e.currentTarget)&&t.setIndex(i)}))},i}(Backbone.View)
e.registerComponent(n,".tsd-signatures")}(typedoc||(typedoc={})),function(e){var t=function(t){function n(n){var i=t.call(this,n)||this
return i.className=i.$el.attr("data-toggle"),i.$el.on(e.pointerUp,(function(e){return i.onPointerUp(e)})),i.$el.on("click",(function(e){return e.preventDefault()})),e.$document.on(e.pointerDown,(function(e){return i.onDocumentPointerDown(e)})),e.$document.on(e.pointerUp,(function(e){return i.onDocumentPointerUp(e)})),i}return __extends(n,t),n.prototype.setActive=function(t){if(this.active!=t){this.active=t,e.$html.toggleClass("has-"+this.className,t),this.$el.toggleClass("active",t)
var n=(this.active?"to-has-":"from-has-")+this.className
e.$html.addClass(n),setTimeout((function(){return e.$html.removeClass(n)}),500)}},n.prototype.onPointerUp=function(t){e.hasPointerMoved||(this.setActive(!0),t.preventDefault())},n.prototype.onDocumentPointerDown=function(e){if(this.active){var t=$(e.target).parents().addBack()
if(t.hasClass("col-menu"))return
if(t.hasClass("tsd-filter-group"))return
this.setActive(!1)}},n.prototype.onDocumentPointerUp=function(t){var n=this
if(!e.hasPointerMoved&&this.active){var i=$(t.target).parents().addBack()
if(i.hasClass("col-menu")){var r=i.filter("a")
if(r.length){var o=window.location.href;-1!=o.indexOf("#")&&(o=o.substr(0,o.indexOf("#"))),r.prop("href").substr(0,o.length)==o&&setTimeout((function(){return n.setActive(!1)}),250)}}}},n}(Backbone.View)
e.registerComponent(t,"a[data-toggle]")}(typedoc||(typedoc={})),function(e){var t=function(t){function n(){var n=t.call(this)||this
return n.scrollTop=0,n.width=0,n.height=0,e.$window.on("scroll",_((function(){return n.onScroll()})).throttle(10)),e.$window.on("resize",_((function(){return n.onResize()})).throttle(10)),n.onResize(),n.onScroll(),n}return __extends(n,t),n.prototype.triggerResize=function(){this.trigger("resize",this.width,this.height)},n.prototype.onResize=function(){this.width=e.$window.width(),this.height=e.$window.height(),this.trigger("resize",this.width,this.height)},n.prototype.onScroll=function(){this.scrollTop=e.$window.scrollTop(),this.trigger("scroll",this.scrollTop)},n}(e.Events)
e.Viewport=t,e.registerService(t,"viewport")}(typedoc||(typedoc={})),function(e){e.pointerDown="mousedown",e.pointerMove="mousemove",e.pointerUp="mouseup",e.pointerDownPosition={x:0,y:0},e.preventNextClick=!1,e.isPointerDown=!1,e.isPointerTouch=!1,e.hasPointerMoved=!1,e.isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),e.$html.addClass(e.isMobile?"is-mobile":"not-mobile"),e.isMobile&&"ontouchstart"in document.documentElement&&(e.isPointerTouch=!0,e.pointerDown="touchstart",e.pointerMove="touchmove",e.pointerUp="touchend"),e.$document.on(e.pointerDown,(function(t){e.isPointerDown=!0,e.hasPointerMoved=!1
var n="touchstart"==e.pointerDown?t.originalEvent.targetTouches[0]:t
e.pointerDownPosition.x=n.pageX,e.pointerDownPosition.y=n.pageY})).on(e.pointerMove,(function(t){if(e.isPointerDown&&!e.hasPointerMoved){var n="touchstart"==e.pointerDown?t.originalEvent.targetTouches[0]:t,i=e.pointerDownPosition.x-n.pageX,r=e.pointerDownPosition.y-n.pageY
e.hasPointerMoved=Math.sqrt(i*i+r*r)>10}})).on(e.pointerUp,(function(t){e.isPointerDown=!1})).on("click",(function(t){e.preventNextClick&&(t.preventDefault(),t.stopImmediatePropagation(),e.preventNextClick=!1)}))}(typedoc||(typedoc={})),function(e){function t(e,t){e.addClass("no-transition"),t(),e.offset(),e.removeClass("no-transition")}e.transition=function(e){for(var t in e)if(e.hasOwnProperty(t)&&void 0!==document.body.style[t])return{name:t,endEvent:e[t]}
return null}({transition:"transitionend",OTransition:"oTransitionEnd",msTransition:"msTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"}),e.noTransition=t,e.animateHeight=function(n,i,r){var o,s=n.height()
t(n,(function(){i(),n.css("height",""),o=n.height(),s!=o&&e.transition&&n.css("height",s)})),s!=o&&e.transition?(n.css("height",o),n.on(e.transition.endEvent,(function(){t(n,(function(){n.off(e.transition.endEvent).css("height",""),r&&r()}))}))):r&&r()}}(typedoc||(typedoc={})),function(e){e.app=new e.Application}(typedoc||(typedoc={}))
