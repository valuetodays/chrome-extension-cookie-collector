!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).wcmatch=e()}(this,(function(){"use strict";function t(t){return"-"===t||"^"===t||"$"===t||"+"===t||"."===t||"("===t||")"===t||"|"===t||"["===t||"]"===t||"{"===t||"}"===t||"*"===t||"?"===t||"\\"===t?"\\".concat(t):t}function e(n,r){if(void 0===r&&(r=!0),Array.isArray(n)){var o=n.map((function(t){return"^".concat(e(t,r),"$")}));return"(?:".concat(o.join("|"),")")}var a="",i="",c=".";!0===r?(a="/",i="[/\\\\]",c="[^/\\\\]"):r&&(i=function(e){for(var n="",r=0;r<e.length;r++)n+=t(e[r]);return n}(a=r),i.length>1?(i="(?:".concat(i,")"),c="((?!".concat(i,").)")):c="[^".concat(i,"]"));for(var s=r?"".concat(i,"+?"):"",f=r?"".concat(i,"*?"):"",u=r?n.split(a):[n],p="",g=0;g<u.length;g++){var l=u[g],y=u[g+1],h="";if(l||!(g>0))if(r&&(h=g===u.length-1?f:"**"!==y?s:""),r&&"**"===l)h&&(p+=0===g?"":g===u.length-1?"(?:".concat(s,"|$)"):s,p+="(?:".concat(c,"*?").concat(h,")*?"));else{for(var d=0;d<l.length;d++){var b=l[d];"\\"===b?d<l.length-1&&(p+=t(l[d+1]),d++):p+="?"===b?c:"*"===b?"".concat(c,"*?"):t(b)}p+=h}}return p}function n(t,e){if("string"!=typeof e)throw new TypeError("Sample must be a string, but ".concat(typeof e," given"));return t.test(e)}return function(t,r){if("string"!=typeof t&&!Array.isArray(t))throw new TypeError("The first argument must be a single pattern string or an array of patterns, but ".concat(typeof t," given"));if("string"!=typeof r&&"boolean"!=typeof r||(r={separator:r}),2===arguments.length&&void 0!==r&&("object"!=typeof r||null===r||Array.isArray(r)))throw new TypeError("The second argument must be an options object or a string/boolean separator, but ".concat(typeof r," given"));if("\\"===(r=r||{}).separator)throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");var o=e(t,r.separator),a=new RegExp("^".concat(o,"$"),r.flags),i=n.bind(null,a);return i.options=r,i.pattern=t,i.regexp=a,i}}));
//# sourceMappingURL=index.umd.js.map
