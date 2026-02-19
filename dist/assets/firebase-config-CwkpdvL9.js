const bt=()=>{};var he={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},yt=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],a=t[n++],o=t[n++],c=((s&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],a=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},$e={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],a=s+1<t.length,o=a?t[s+1]:0,c=s+2<t.length,d=c?t[s+2]:0,h=i>>2,p=(i&3)<<4|o>>4;let l=(o&15)<<2|d>>6,f=d&63;c||(f=64,a||(l=64)),r.push(n[h],n[p],n[l],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ke(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):yt(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],o=s<t.length?n[t.charAt(s)]:0;++s;const d=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||o==null||d==null||p==null)throw new wt;const l=i<<2|o>>4;if(r.push(l),d!==64){const f=o<<4&240|d>>2;if(r.push(f),p!==64){const D=d<<6&192|p;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class wt extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const It=function(t){const e=ke(t);return $e.encodeByteArray(e,!0)},$=function(t){return It(t).replace(/\./g,"")},vt=function(t){try{return $e.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=()=>_t().__FIREBASE_DEFAULTS__,Ct=()=>{if(typeof process>"u"||typeof he>"u")return;const t=he.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},At=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&vt(t[1]);return e&&JSON.parse(e)},H=()=>{try{return bt()||Et()||Ct()||At()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},St=t=>{var e,n;return(n=(e=H())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Is=t=>{const e=St(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Pe=()=>{var t;return(t=H())===null||t===void 0?void 0:t.config},vs=t=>{var e;return(e=H())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function _s(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[$(JSON.stringify(n)),$(JSON.stringify(a)),""].join(".")}const O={};function Ot(){const t={prod:[],emulator:[]};for(const e of Object.keys(O))O[e]?t.emulator.push(e):t.prod.push(e);return t}function Rt(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let pe=!1;function Cs(t,e){if(typeof window>"u"||typeof document>"u"||!Dt(window.location.host)||O[t]===e||O[t]||pe)return;O[t]=e;function n(l){return`__firebase__banner__${l}`}const r="__firebase__banner",i=Ot().prod.length>0;function a(){const l=document.getElementById(r);l&&l.remove()}function o(l){l.style.display="flex",l.style.background="#7faaf0",l.style.position="fixed",l.style.bottom="5px",l.style.left="5px",l.style.padding=".5em",l.style.borderRadius="5px",l.style.alignItems="center"}function c(l,f){l.setAttribute("width","24"),l.setAttribute("id",f),l.setAttribute("height","24"),l.setAttribute("viewBox","0 0 24 24"),l.setAttribute("fill","none"),l.style.marginLeft="-6px"}function d(){const l=document.createElement("span");return l.style.cursor="pointer",l.style.marginLeft="16px",l.style.fontSize="24px",l.innerHTML=" &times;",l.onclick=()=>{pe=!0,a()},l}function h(l,f){l.setAttribute("id",f),l.innerText="Learn more",l.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",l.setAttribute("target","__blank"),l.style.paddingLeft="5px",l.style.textDecoration="underline"}function p(){const l=Rt(r),f=n("text"),D=document.getElementById(f)||document.createElement("span"),de=n("learnmore"),ue=document.getElementById(de)||document.createElement("a"),fe=n("preprendIcon"),k=document.getElementById(fe)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(l.created){const z=l.element;o(z),h(ue,de);const mt=d();c(k,fe),z.append(k,D,ue,mt),document.body.appendChild(z)}i?(D.innerText="Preview backend disconnected.",k.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(k.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function As(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function xe(){var t;const e=(t=H())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ss(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Bt(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ts(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ds(){const t=Ne();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Os(){return!xe()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Rs(){return!xe()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Le(){try{return typeof indexedDB=="object"}catch{return!1}}function Fe(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function Mt(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt="FirebaseError";class T extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=kt,Object.setPrototypeOf(this,T.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,j.prototype.create)}}class j{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?$t(i,r):"Error",o=`${this.serviceName}: ${a} (${s}).`;return new T(s,o,r)}}function $t(t,e){return t.replace(Pt,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Pt=/\{\$([^}]+)}/g;function Bs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function P(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],a=e[s];if(ge(i)&&ge(a)){if(!P(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ge(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ks(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function $s(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Ps(t,e){const n=new Nt(t,e);return n.subscribe.bind(n)}class Nt{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");xt(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=W),s.error===void 0&&(s.error=W),s.complete===void 0&&(s.complete=W);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xt(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function W(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=1e3,Ft=2,Ht=4*60*60*1e3,jt=.5;function me(t,e=Lt,n=Ft){const r=e*Math.pow(n,t),s=Math.round(jt*r*(Math.random()-.5)*2);return Math.min(Ht,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(t){return t&&t._delegate?t._delegate:t}class v{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Tt;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(zt(e))try{this.getOrInitializeService({instanceIdentifier:_})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=_){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_){return this.instances.has(e)}getOptions(e=_){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(i);r===o&&a.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&e(a,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Vt(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=_){return this.component?this.component.multipleInstances?e:_:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Vt(t){return t===_?void 0:t}function zt(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ut(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var u;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(u||(u={}));const qt={debug:u.DEBUG,verbose:u.VERBOSE,info:u.INFO,warn:u.WARN,error:u.ERROR,silent:u.SILENT},Gt=u.INFO,Kt={[u.DEBUG]:"log",[u.VERBOSE]:"log",[u.INFO]:"info",[u.WARN]:"warn",[u.ERROR]:"error"},Jt=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Kt[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class je{constructor(e){this.name=e,this._logLevel=Gt,this._logHandler=Jt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in u))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,u.DEBUG,...e),this._logHandler(this,u.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,u.VERBOSE,...e),this._logHandler(this,u.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,u.INFO,...e),this._logHandler(this,u.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,u.WARN,...e),this._logHandler(this,u.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,u.ERROR,...e),this._logHandler(this,u.ERROR,...e)}}const Yt=(t,e)=>e.some(n=>t instanceof n);let be,ye;function Zt(){return be||(be=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Xt(){return ye||(ye=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ue=new WeakMap,Q=new WeakMap,Ve=new WeakMap,q=new WeakMap,se=new WeakMap;function Qt(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",a)},i=()=>{n(y(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&Ue.set(n,t)}).catch(()=>{}),se.set(e,t),e}function en(t){if(Q.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",a),t.removeEventListener("abort",a)},i=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",a),t.addEventListener("abort",a)});Q.set(t,e)}let ee={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Q.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ve.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return y(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function tn(t){ee=t(ee)}function nn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(G(this),e,...n);return Ve.set(r,e.sort?e.sort():[e]),y(r)}:Xt().includes(t)?function(...e){return t.apply(G(this),e),y(Ue.get(this))}:function(...e){return y(t.apply(G(this),e))}}function rn(t){return typeof t=="function"?nn(t):(t instanceof IDBTransaction&&en(t),Yt(t,Zt())?new Proxy(t,ee):t)}function y(t){if(t instanceof IDBRequest)return Qt(t);if(q.has(t))return q.get(t);const e=rn(t);return e!==t&&(q.set(t,e),se.set(e,t)),e}const G=t=>se.get(t);function ze(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(t,e),o=y(a);return r&&a.addEventListener("upgradeneeded",c=>{r(y(a.result),c.oldVersion,c.newVersion,y(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),o.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),o}const sn=["get","getKey","getAll","getAllKeys","count"],an=["put","add","delete","clear"],K=new Map;function we(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(K.get(e))return K.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=an.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||sn.includes(n)))return;const i=async function(a,...o){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(o.shift())),(await Promise.all([d[n](...o),s&&c.done]))[0]};return K.set(e,i),i}tn(t=>({...t,get:(e,n,r)=>we(e,n)||t.get(e,n,r),has:(e,n)=>!!we(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(cn(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function cn(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const te="@firebase/app",Ie="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b=new je("@firebase/app"),ln="@firebase/app-compat",dn="@firebase/analytics-compat",un="@firebase/analytics",fn="@firebase/app-check-compat",hn="@firebase/app-check",pn="@firebase/auth",gn="@firebase/auth-compat",mn="@firebase/database",bn="@firebase/data-connect",yn="@firebase/database-compat",wn="@firebase/functions",In="@firebase/functions-compat",vn="@firebase/installations",_n="@firebase/installations-compat",En="@firebase/messaging",Cn="@firebase/messaging-compat",An="@firebase/performance",Sn="@firebase/performance-compat",Tn="@firebase/remote-config",Dn="@firebase/remote-config-compat",On="@firebase/storage",Rn="@firebase/storage-compat",Bn="@firebase/firestore",Mn="@firebase/ai",kn="@firebase/firestore-compat",$n="firebase",Pn="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N="[DEFAULT]",Nn={[te]:"fire-core",[ln]:"fire-core-compat",[un]:"fire-analytics",[dn]:"fire-analytics-compat",[hn]:"fire-app-check",[fn]:"fire-app-check-compat",[pn]:"fire-auth",[gn]:"fire-auth-compat",[mn]:"fire-rtdb",[bn]:"fire-data-connect",[yn]:"fire-rtdb-compat",[wn]:"fire-fn",[In]:"fire-fn-compat",[vn]:"fire-iid",[_n]:"fire-iid-compat",[En]:"fire-fcm",[Cn]:"fire-fcm-compat",[An]:"fire-perf",[Sn]:"fire-perf-compat",[Tn]:"fire-rc",[Dn]:"fire-rc-compat",[On]:"fire-gcs",[Rn]:"fire-gcs-compat",[Bn]:"fire-fst",[kn]:"fire-fst-compat",[Mn]:"fire-vertex","fire-js":"fire-js",[$n]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=new Map,xn=new Map,ne=new Map;function ve(t,e){try{t.container.addComponent(e)}catch(n){b.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function C(t){const e=t.name;if(ne.has(e))return b.debug(`There were multiple attempts to register component ${e}.`),!1;ne.set(e,t);for(const n of x.values())ve(n,t);for(const n of xn.values())ve(n,t);return!0}function M(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ns(t,e,n=N){M(t,e).clearInstance(n)}function xs(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},w=new j("app","Firebase",Ln);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new v("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw w.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=Pn;function We(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:N,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw w.create("bad-app-name",{appName:String(s)});if(n||(n=Pe()),!n)throw w.create("no-options");const i=x.get(s);if(i){if(P(n,i.options)&&P(r,i.config))return i;throw w.create("duplicate-app",{appName:s})}const a=new Wt(s);for(const c of ne.values())a.addComponent(c);const o=new Fn(n,r,a);return x.set(s,o),o}function Hn(t=N){const e=x.get(t);if(!e&&t===N&&Pe())return We();if(!e)throw w.create("no-app",{appName:t});return e}function I(t,e,n){var r;let s=(r=Nn[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&o.push("and"),a&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),b.warn(o.join(" "));return}C(new v(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn="firebase-heartbeat-database",Un=1,B="firebase-heartbeat-store";let J=null;function qe(){return J||(J=ze(jn,Un,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(B)}catch(n){console.warn(n)}}}}).catch(t=>{throw w.create("idb-open",{originalErrorMessage:t.message})})),J}async function Vn(t){try{const n=(await qe()).transaction(B),r=await n.objectStore(B).get(Ge(t));return await n.done,r}catch(e){if(e instanceof T)b.warn(e.message);else{const n=w.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});b.warn(n.message)}}}async function _e(t,e){try{const r=(await qe()).transaction(B,"readwrite");await r.objectStore(B).put(e,Ge(t)),await r.done}catch(n){if(n instanceof T)b.warn(n.message);else{const r=w.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});b.warn(r.message)}}}function Ge(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn=1024,Wn=30;class qn{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Kn(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ee();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Wn){const a=Jn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){b.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ee(),{heartbeatsToSend:r,unsentEntries:s}=Gn(this._heartbeatsCache.heartbeats),i=$(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return b.warn(n),""}}}function Ee(){return new Date().toISOString().substring(0,10)}function Gn(t,e=zn){const n=[];let r=t.slice();for(const s of t){const i=n.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Ce(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ce(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Kn{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Le()?Fe().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Vn(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return _e(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return _e(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ce(t){return $(JSON.stringify({version:2,heartbeats:t})).length}function Jn(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(t){C(new v("platform-logger",e=>new on(e),"PRIVATE")),C(new v("heartbeat",e=>new qn(e),"PRIVATE")),I(te,Ie,t),I(te,Ie,"esm2017"),I("fire-js","")}Yn("");var Zn="firebase",Xn="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */I(Zn,Xn,"app");const Ke="@firebase/installations",ie="0.6.18";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=1e4,Ye=`w:${ie}`,Ze="FIS_v2",Qn="https://firebaseinstallations.googleapis.com/v1",er=60*60*1e3,tr="installations",nr="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},A=new j(tr,nr,rr);function Xe(t){return t instanceof T&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe({projectId:t}){return`${Qn}/projects/${t}/installations`}function et(t){return{token:t.token,requestStatus:2,expiresIn:ir(t.expiresIn),creationTime:Date.now()}}async function tt(t,e){const r=(await e.json()).error;return A.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function nt({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function sr(t,{refreshToken:e}){const n=nt(t);return n.append("Authorization",ar(e)),n}async function rt(t){const e=await t();return e.status>=500&&e.status<600?t():e}function ir(t){return Number(t.replace("s","000"))}function ar(t){return`${Ze} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function or({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Qe(t),s=nt(t),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={fid:n,authVersion:Ze,appId:t.appId,sdkVersion:Ye},o={method:"POST",headers:s,body:JSON.stringify(a)},c=await rt(()=>fetch(r,o));if(c.ok){const d=await c.json();return{fid:d.fid||n,registrationStatus:2,refreshToken:d.refreshToken,authToken:et(d.authToken)}}else throw await tt("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lr=/^[cdef][\w-]{21}$/,re="";function dr(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=ur(t);return lr.test(n)?n:re}catch{return re}}function ur(t){return cr(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it=new Map;function at(t,e){const n=U(t);ot(n,e),fr(n,e)}function ot(t,e){const n=it.get(t);if(n)for(const r of n)r(e)}function fr(t,e){const n=hr();n&&n.postMessage({key:t,fid:e}),pr()}let E=null;function hr(){return!E&&"BroadcastChannel"in self&&(E=new BroadcastChannel("[Firebase] FID Change"),E.onmessage=t=>{ot(t.data.key,t.data.fid)}),E}function pr(){it.size===0&&E&&(E.close(),E=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="firebase-installations-database",mr=1,S="firebase-installations-store";let Y=null;function ae(){return Y||(Y=ze(gr,mr,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(S)}}})),Y}async function L(t,e){const n=U(t),s=(await ae()).transaction(S,"readwrite"),i=s.objectStore(S),a=await i.get(n);return await i.put(e,n),await s.done,(!a||a.fid!==e.fid)&&at(t,e.fid),e}async function ct(t){const e=U(t),r=(await ae()).transaction(S,"readwrite");await r.objectStore(S).delete(e),await r.done}async function V(t,e){const n=U(t),s=(await ae()).transaction(S,"readwrite"),i=s.objectStore(S),a=await i.get(n),o=e(a);return o===void 0?await i.delete(n):await i.put(o,n),await s.done,o&&(!a||a.fid!==o.fid)&&at(t,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oe(t){let e;const n=await V(t.appConfig,r=>{const s=br(r),i=yr(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===re?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function br(t){const e=t||{fid:dr(),registrationStatus:0};return lt(e)}function yr(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(A.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=wr(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Ir(t)}:{installationEntry:e}}async function wr(t,e){try{const n=await or(t,e);return L(t.appConfig,n)}catch(n){throw Xe(n)&&n.customData.serverCode===409?await ct(t.appConfig):await L(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Ir(t){let e=await Ae(t.appConfig);for(;e.registrationStatus===1;)await st(100),e=await Ae(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await oe(t);return r||n}return e}function Ae(t){return V(t,e=>{if(!e)throw A.create("installation-not-found");return lt(e)})}function lt(t){return vr(t)?{fid:t.fid,registrationStatus:0}:t}function vr(t){return t.registrationStatus===1&&t.registrationTime+Je<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _r({appConfig:t,heartbeatServiceProvider:e},n){const r=Er(t,n),s=sr(t,n),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={installation:{sdkVersion:Ye,appId:t.appId}},o={method:"POST",headers:s,body:JSON.stringify(a)},c=await rt(()=>fetch(r,o));if(c.ok){const d=await c.json();return et(d)}else throw await tt("Generate Auth Token",c)}function Er(t,{fid:e}){return`${Qe(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ce(t,e=!1){let n;const r=await V(t.appConfig,i=>{if(!dt(i))throw A.create("not-registered");const a=i.authToken;if(!e&&Sr(a))return i;if(a.requestStatus===1)return n=Cr(t,e),i;{if(!navigator.onLine)throw A.create("app-offline");const o=Dr(i);return n=Ar(t,o),o}});return n?await n:r.authToken}async function Cr(t,e){let n=await Se(t.appConfig);for(;n.authToken.requestStatus===1;)await st(100),n=await Se(t.appConfig);const r=n.authToken;return r.requestStatus===0?ce(t,e):r}function Se(t){return V(t,e=>{if(!dt(e))throw A.create("not-registered");const n=e.authToken;return Or(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Ar(t,e){try{const n=await _r(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await L(t.appConfig,r),n}catch(n){if(Xe(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ct(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await L(t.appConfig,r)}throw n}}function dt(t){return t!==void 0&&t.registrationStatus===2}function Sr(t){return t.requestStatus===2&&!Tr(t)}function Tr(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+er}function Dr(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Or(t){return t.requestStatus===1&&t.requestTime+Je<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rr(t){const e=t,{installationEntry:n,registrationPromise:r}=await oe(e);return r?r.catch(console.error):ce(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Br(t,e=!1){const n=t;return await Mr(n),(await ce(n,e)).token}async function Mr(t){const{registrationPromise:e}=await oe(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(t){if(!t||!t.options)throw Z("App Configuration");if(!t.name)throw Z("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Z(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Z(t){return A.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="installations",$r="installations-internal",Pr=t=>{const e=t.getProvider("app").getImmediate(),n=kr(e),r=M(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Nr=t=>{const e=t.getProvider("app").getImmediate(),n=M(e,ut).getImmediate();return{getId:()=>Rr(n),getToken:s=>Br(n,s)}};function xr(){C(new v(ut,Pr,"PUBLIC")),C(new v($r,Nr,"PRIVATE"))}xr();I(Ke,ie);I(Ke,ie,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F="analytics",Lr="firebase_id",Fr="origin",Hr=60*1e3,jr="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",le="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=new je("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},m=new j("analytics","Analytics",Ur);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(t){if(!t.startsWith(le)){const e=m.create("invalid-gtag-resource",{gtagURL:t});return g.warn(e.message),""}return t}function ft(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function zr(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Wr(t,e){const n=zr("firebase-js-sdk-policy",{createScriptURL:Vr}),r=document.createElement("script"),s=`${le}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function qr(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Gr(t,e,n,r,s,i){const a=r[s];try{if(a)await e[a];else{const c=(await ft(n)).find(d=>d.measurementId===s);c&&await e[c.appId]}}catch(o){g.error(o)}t("config",s,i)}async function Kr(t,e,n,r,s){try{let i=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const o=await ft(n);for(const c of a){const d=o.find(p=>p.measurementId===c),h=d&&e[d.appId];if(h)i.push(h);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),t("event",r,s||{})}catch(i){g.error(i)}}function Jr(t,e,n,r){async function s(i,...a){try{if(i==="event"){const[o,c]=a;await Kr(t,e,n,o,c)}else if(i==="config"){const[o,c]=a;await Gr(t,e,n,r,o,c)}else if(i==="consent"){const[o,c]=a;t("consent",o,c)}else if(i==="get"){const[o,c,d]=a;t("get",o,c,d)}else if(i==="set"){const[o]=a;t("set",o)}else t(i,...a)}catch(o){g.error(o)}}return s}function Yr(t,e,n,r,s){let i=function(...a){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=Jr(i,t,e,n),{gtagCore:i,wrappedGtag:window[s]}}function Zr(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(le)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=30,Qr=1e3;class es{constructor(e={},n=Qr){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const ht=new es;function ts(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function ns(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:ts(r)},i=jr.replace("{app-id}",n),a=await fetch(i,s);if(a.status!==200&&a.status!==304){let o="";try{const c=await a.json();!((e=c.error)===null||e===void 0)&&e.message&&(o=c.error.message)}catch{}throw m.create("config-fetch-failed",{httpStatus:a.status,responseMessage:o})}return a.json()}async function rs(t,e=ht,n){const{appId:r,apiKey:s,measurementId:i}=t.options;if(!r)throw m.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw m.create("no-api-key")}const a=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new as;return setTimeout(async()=>{o.abort()},Hr),pt({appId:r,apiKey:s,measurementId:i},a,o,e)}async function pt(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=ht){var i;const{appId:a,measurementId:o}=t;try{await ss(r,e)}catch(c){if(o)return g.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:a,measurementId:o};throw c}try{const c=await ns(t);return s.deleteThrottleMetadata(a),c}catch(c){const d=c;if(!is(d)){if(s.deleteThrottleMetadata(a),o)return g.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:a,measurementId:o};throw c}const h=Number((i=d==null?void 0:d.customData)===null||i===void 0?void 0:i.httpStatus)===503?me(n,s.intervalMillis,Xr):me(n,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+h,backoffCount:n+1};return s.setThrottleMetadata(a,p),g.debug(`Calling attemptFetch again in ${h} millis`),pt(t,p,r,s)}}function ss(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(i),r(m.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function is(t){if(!(t instanceof T)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class as{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function os(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const i=await e,a=Object.assign(Object.assign({},r),{send_to:i});t("event",n,a)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(){if(Le())try{await Fe()}catch(t){return g.warn(m.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return g.warn(m.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ls(t,e,n,r,s,i,a){var o;const c=rs(t);c.then(f=>{n[f.measurementId]=f.appId,t.options.measurementId&&f.measurementId!==t.options.measurementId&&g.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>g.error(f)),e.push(c);const d=cs().then(f=>{if(f)return r.getId()}),[h,p]=await Promise.all([c,d]);Zr(i)||Wr(i,h.measurementId),s("js",new Date);const l=(o=a==null?void 0:a.config)!==null&&o!==void 0?o:{};return l[Fr]="firebase",l.update=!0,p!=null&&(l[Lr]=p),s("config",h.measurementId,l),h.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e){this.app=e}_delete(){return delete R[this.app.options.appId],Promise.resolve()}}let R={},Te=[];const De={};let X="dataLayer",us="gtag",Oe,gt,Re=!1;function fs(){const t=[];if(Bt()&&t.push("This is a browser extension environment."),Mt()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=m.create("invalid-analytics-context",{errorInfo:e});g.warn(n.message)}}function hs(t,e,n){fs();const r=t.options.appId;if(!r)throw m.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)g.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw m.create("no-api-key");if(R[r]!=null)throw m.create("already-exists",{id:r});if(!Re){qr(X);const{wrappedGtag:i,gtagCore:a}=Yr(R,Te,De,X,us);gt=i,Oe=a,Re=!0}return R[r]=ls(t,Te,De,e,Oe,X,n),new ds(t)}function ps(t=Hn()){t=He(t);const e=M(t,F);return e.isInitialized()?e.getImmediate():gs(t)}function gs(t,e={}){const n=M(t,F);if(n.isInitialized()){const s=n.getImmediate();if(P(e,n.getOptions()))return s;throw m.create("already-initialized")}return n.initialize({options:e})}function ms(t,e,n,r){t=He(t),os(gt,R[t.app.options.appId],e,n,r).catch(s=>g.error(s))}const Be="@firebase/analytics",Me="0.10.17";function bs(){C(new v(F,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return hs(r,s,n)},"PUBLIC")),C(new v("analytics-internal",t,"PRIVATE")),I(Be,Me),I(Be,Me,"esm2017");function t(e){try{const n=e.getProvider(F).getImmediate();return{logEvent:(r,s,i)=>ms(n,r,s,i)}}catch(n){throw m.create("interop-component-reg-failed",{reason:n})}}}bs();const ys={apiKey:"AIzaSyA3x-CZApUgkWHCjlwvFtOQhYQeY6lDwpI",authDomain:"twenty-forth-fifth.firebaseapp.com",projectId:"twenty-forth-fifth",storageBucket:"twenty-forth-fifth.firebasestorage.app",messagingSenderId:"228269383587",appId:"1:228269383587:web:0d6f063f221f388cd2c416",measurementId:"G-3X9DT5MBV4"},ws=We(ys);typeof window<"u"&&ps(ws);export{Es as A,Ns as B,v as C,_t as D,j as E,T as F,Le as G,Os as H,Rs as I,ws as J,je as L,Ls as S,M as _,vs as a,St as b,He as c,P as d,Ne as e,ys as f,Hn as g,Ds as h,Dt as i,xs as j,Bs as k,As as l,Ts as m,u as n,Bt as o,_s as p,Ms as q,vt as r,Ss as s,C as t,Cs as u,I as v,Ps as w,ks as x,$s as y,Is as z};
