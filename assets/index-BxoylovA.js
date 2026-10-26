(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`pre-1`,timeRange:`6:00–7:00 AM`,startTime:`06:00`,endTime:`07:00`,activity:`Wake up and morning routine`,category:`routine`},{id:`pre-2`,timeRange:`7:00–9:00 AM`,startTime:`07:00`,endTime:`09:00`,activity:`Theory study using previous-year questions (PYQs)`,category:`theory`},{id:`pre-3`,timeRange:`9:00–10:00 AM`,startTime:`09:00`,endTime:`10:00`,activity:`Breakfast and break`,category:`break`},{id:`pre-4`,timeRange:`10:00 AM–12:00 PM`,startTime:`10:00`,endTime:`12:00`,activity:`Theory study, note preparation, and active recall`,category:`theory`},{id:`pre-5`,timeRange:`12:00–1:30 PM`,startTime:`12:00`,endTime:`13:30`,activity:`Lunch and rest`,category:`break`},{id:`pre-6`,timeRange:`1:30–3:00 PM`,startTime:`13:30`,endTime:`15:00`,activity:`Lab preparation — MAD or Data Science`,category:`lab`},{id:`pre-7`,timeRange:`3:00–3:30 PM`,startTime:`15:00`,endTime:`15:30`,activity:`Break`,category:`break`},{id:`pre-8`,timeRange:`3:30–5:30 PM`,startTime:`15:30`,endTime:`17:30`,activity:`Lab practice, coding, implementation, and debugging`,category:`lab`},{id:`pre-9`,timeRange:`5:30–8:00 PM`,startTime:`17:30`,endTime:`20:00`,activity:`Personal time, bath, chores, and dinner`,category:`routine`},{id:`pre-10`,timeRange:`8:00–8:30 PM`,startTime:`20:00`,endTime:`20:30`,activity:`Family video call`,category:`routine`},{id:`pre-11`,timeRange:`8:30–9:30 PM`,startTime:`20:30`,endTime:`21:30`,activity:`Lab revision and practical practice`,category:`lab`},{id:`pre-12`,timeRange:`9:30–10:00 PM`,startTime:`21:30`,endTime:`22:00`,activity:`Break`,category:`break`},{id:`pre-13`,timeRange:`10:00–10:30 PM`,startTime:`22:00`,endTime:`22:30`,activity:`Analyse PYQs for the next day's theory study and list topics to prepare`,category:`review`},{id:`pre-14`,timeRange:`10:30 PM onwards`,startTime:`22:30`,endTime:`24:00`,activity:`Wind down and sleep`,category:`routine`}],t=[{id:`sprint-1`,timeRange:`6:00–7:00 AM`,startTime:`06:00`,endTime:`07:00`,activity:`Wake up and morning routine`,category:`routine`},{id:`sprint-2`,timeRange:`7:00–9:00 AM`,startTime:`07:00`,endTime:`09:00`,activity:`Lab topics and programs — Session 1`,category:`lab`},{id:`sprint-3`,timeRange:`9:00–10:00 AM`,startTime:`09:00`,endTime:`10:00`,activity:`Breakfast and break`,category:`break`},{id:`sprint-4`,timeRange:`10:00 AM–12:00 PM`,startTime:`10:00`,endTime:`12:00`,activity:`Lab topics and programs — Session 2`,category:`lab`},{id:`sprint-5`,timeRange:`12:00–1:30 PM`,startTime:`12:00`,endTime:`13:30`,activity:`Lunch and rest`,category:`break`},{id:`sprint-6`,timeRange:`1:30–3:00 PM`,startTime:`13:30`,endTime:`15:00`,activity:`Practical implementation and coding`,category:`lab`},{id:`sprint-7`,timeRange:`3:00–3:30 PM`,startTime:`15:00`,endTime:`15:30`,activity:`Break`,category:`break`},{id:`sprint-8`,timeRange:`3:30–5:30 PM`,startTime:`15:30`,endTime:`17:30`,activity:`Lab record, debugging, and timed practical questions`,category:`lab`},{id:`sprint-9`,timeRange:`5:30–8:00 PM`,startTime:`17:30`,endTime:`20:00`,activity:`Personal time, bath, chores, and dinner`,category:`routine`},{id:`sprint-10`,timeRange:`8:00–8:30 PM`,startTime:`20:00`,endTime:`20:30`,activity:`Family video call`,category:`routine`},{id:`sprint-11`,timeRange:`8:30–9:30 PM`,startTime:`20:30`,endTime:`21:30`,activity:`Final lab revision and self-test`,category:`lab`},{id:`sprint-12`,timeRange:`9:30–10:00 PM`,startTime:`21:30`,endTime:`22:00`,activity:`Break`,category:`break`},{id:`sprint-13`,timeRange:`10:00–10:30 PM`,startTime:`22:00`,endTime:`22:30`,activity:`Review unfinished lab topics and prepare the next day's lab checklist`,category:`review`},{id:`sprint-14`,timeRange:`10:30 PM onwards`,startTime:`22:30`,endTime:`24:00`,activity:`Wind down and sleep`,category:`routine`}],n=[{id:`theory-1`,timeRange:`6:00–7:00 AM`,startTime:`06:00`,endTime:`07:00`,activity:`Wake up and morning routine`,category:`routine`},{id:`theory-2`,timeRange:`7:00–9:00 AM`,startTime:`07:00`,endTime:`09:00`,activity:`Theory note preparation — Session 1`,category:`theory`},{id:`theory-3`,timeRange:`9:00–10:00 AM`,startTime:`09:00`,endTime:`10:00`,activity:`Breakfast and break`,category:`break`},{id:`theory-4`,timeRange:`10:00 AM–12:00 PM`,startTime:`10:00`,endTime:`12:00`,activity:`Theory note preparation — Session 2`,category:`theory`},{id:`theory-5`,timeRange:`12:00–1:30 PM`,startTime:`12:00`,endTime:`13:30`,activity:`Lunch and rest`,category:`break`},{id:`theory-6`,timeRange:`1:30–3:00 PM`,startTime:`13:30`,endTime:`15:00`,activity:`Theory study — Session 1`,category:`theory`},{id:`theory-7`,timeRange:`3:00–3:30 PM`,startTime:`15:00`,endTime:`15:30`,activity:`Break`,category:`break`},{id:`theory-8`,timeRange:`3:30–5:30 PM`,startTime:`15:30`,endTime:`17:30`,activity:`Theory study — Session 2`,category:`theory`},{id:`theory-9`,timeRange:`5:30–8:00 PM`,startTime:`17:30`,endTime:`20:00`,activity:`Personal time, bath, chores, and dinner`,category:`routine`},{id:`theory-10`,timeRange:`8:00–8:30 PM`,startTime:`20:00`,endTime:`20:30`,activity:`Family video call`,category:`routine`},{id:`theory-11`,timeRange:`8:30–9:30 PM`,startTime:`20:30`,endTime:`21:30`,activity:`Theory revision and active recall`,category:`theory`},{id:`theory-12`,timeRange:`9:30–9:45 PM`,startTime:`21:30`,endTime:`21:45`,activity:`Short break`,category:`break`},{id:`theory-13`,timeRange:`9:45–10:30 PM`,startTime:`21:45`,endTime:`22:30`,activity:`Analyse PYQs for the next day's theory subject and list tomorrow's topics`,category:`review`},{id:`theory-14`,timeRange:`10:30 PM onwards`,startTime:`22:30`,endTime:`24:00`,activity:`Wind down and sleep`,category:`routine`}],r=`Asia/Kolkata`;function i(){return new Intl.DateTimeFormat(`en-CA`,{timeZone:r,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(new Date)}function a(){return o(i(),1)}function o(e,t){let[n,r,i]=e.split(`-`).map(Number),a=new Date(Date.UTC(n,r-1,i));return a.setUTCDate(a.getUTCDate()+t),a.toISOString().slice(0,10)}function s(e,t){if(!e||!t)return NaN;let[n,r,i]=e.split(`-`).map(Number),[a,o,s]=t.split(`-`).map(Number),c=Date.UTC(n,r-1,i),l=Date.UTC(a,o-1,s);return Math.round((l-c)/864e5)}function c(e){if(!e)return``;let[t,n,r]=e.split(`-`).map(Number),i=new Date(Date.UTC(t,n-1,r,12,0,0));return new Intl.DateTimeFormat(`en-GB`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`,timeZone:`UTC`}).format(i)}function l(e){if(!e)return``;let[t,n,r]=e.split(`-`).map(Number),i=new Date(Date.UTC(t,n-1,r,12,0,0));return new Intl.DateTimeFormat(`en-GB`,{weekday:`short`,day:`numeric`,month:`short`,timeZone:`UTC`}).format(i)}function u(){return new Intl.DateTimeFormat(`en-US`,{timeZone:r,hour:`numeric`,minute:`2-digit`,hour12:!0}).format(new Date)}function d(e,t){try{let[n,i]=new Intl.DateTimeFormat(`en-GB`,{timeZone:r,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(new Date).split(`:`).map(Number),a=n*60+i,[o,s]=e.split(`:`).map(Number),c=o*60+s,[l,u]=t.split(`:`).map(Number),d=l*60+u;return d<c?a>=c||a<d:a>=c&&a<d}catch{return!1}}function f(e,t,n=i()){if(e.labExamsCompleted)return{phase:`theory-only`,badgeLabel:`Phase 2: Theory-Only`,headline:`Post-Lab Theory Intensive`,description:`Lab exams are complete. Full daily timetable is dedicated to Theory Note Preparation and Mastery.`,priorityReason:`User enabled "Lab Exams Completed" toggle.`};if(e.labDatesAnnounced){let e=[],r=t.labExams?.madLab;if(r&&r.date&&!r.isCompleted){let t=s(n,r.date);t>=0&&t<=2&&e.push({labKey:`mad`,name:`Mobile Application Development (MAD) Lab`,date:r.date,diff:t})}let i=t.labExams?.dsLab;if(i&&i.date&&!i.isCompleted){let t=s(n,i.date);t>=0&&t<=2&&e.push({labKey:`ds`,name:`Data Science Lab`,date:i.date,diff:t})}if(e.length>0){e.sort((e,t)=>e.diff-t.diff);let t=e[0],n=``;if(n=t.diff===0?`${t.name} exam is TODAY! Full day focus on final revision and viva.`:t.diff===1?`${t.name} exam is TOMORROW (${l(t.date)}). Priority 2-day sprint active.`:`${t.name} exam is in 2 days (${l(t.date)}). 2-day full lab prep timetable activated.`,e.length>1){let r=e[1];n+=` Nearer exam (${t.labKey.toUpperCase()}) prioritized over ${r.labKey.toUpperCase()} (${r.diff} days away).`}return{phase:`lab-sprint`,badgeLabel:`Phase: Lab Sprint`,headline:`2-Day Sprint — ${t.name}`,description:`Dedicated full-day lab preparation schedule for ${t.name}.`,activeLabTarget:t.labKey,activeLabName:t.name,priorityReason:n,isExamTomorrow:t.diff===1,daysToSprintExam:t.diff}}}return{phase:`pre-lab`,badgeLabel:`Phase 1: Pre-Lab`,headline:`Pre-Lab Balanced Timetable`,description:`Balanced daily preparation combining morning Theory PYQs & notes with afternoon/evening Lab practice.`,priorityReason:e.labDatesAnnounced?`Lab dates announced, but current date is outside the 2-day pre-exam sprint window.`:`Lab dates unconfirmed. Following standard pre-lab timetable.`}}function p(e,t=i()){if(!e)return{text:`Date unconfirmed`,days:NaN,isUrgent:!1,isToday:!1,isTomorrow:!1,isPassed:!1};let n=s(t,e);return n<0?{text:`${Math.abs(n)} day${Math.abs(n)===1?``:`s`} ago`,days:n,isUrgent:!1,isToday:!1,isTomorrow:!1,isPassed:!0}:n===0?{text:`TODAY`,days:0,isUrgent:!0,isToday:!0,isTomorrow:!1,isPassed:!1}:n===1?{text:`TOMORROW`,days:1,isUrgent:!0,isToday:!1,isTomorrow:!0,isPassed:!1}:{text:`In ${n} days`,days:n,isUrgent:n<=5,isToday:!1,isTomorrow:!1,isPassed:!1}}var m=()=>void 0,h=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)==55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)==56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},g=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){let a=e[n++],o=e[n++],s=e[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|s&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let a=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return t.join(``)},_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,get ENCODED_VALS(){return this.ENCODED_VALS_BASE+`+/=`},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+`-_.`},HAS_NATIVE_SUPPORT:typeof atob==`function`,encodeByteArray(e,t){if(!Array.isArray(e))throw Error(`encodeByteArray takes an array as a parameter`);this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],a=t+1<e.length,o=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(i&3)<<4|o>>4,d=(o&15)<<2|c>>6,f=c&63;s||(f=64,a||(d=64)),r.push(n[l],n[u],n[d],n[f])}return r.join(``)},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(h(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):g(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],a=t<e.length?n[e.charAt(t)]:0;++t;let o=t<e.length?n[e.charAt(t)]:64;++t;let s=t<e.length?n[e.charAt(t)]:64;if(++t,i==null||a==null||o==null||s==null)throw new v;let c=i<<2|a>>4;if(r.push(c),o!==64){let e=a<<4&240|o>>2;if(r.push(e),s!==64){let e=o<<6&192|s;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},v=class extends Error{constructor(){super(...arguments),this.name=`DecodeBase64StringError`}},y=function(e){let t=h(e);return _.encodeByteArray(t,!0)},ee=function(e){return y(e).replace(/\./g,``)},te=function(e){try{return _.decodeString(e,!0)}catch(e){console.error(`base64Decode failed: `,e)}return null};function ne(){if(typeof self<`u`)return self;if(typeof window<`u`)return window;if(typeof global<`u`)return global;throw Error(`Unable to locate global object.`)}var re=()=>ne().__FIREBASE_DEFAULTS__,ie=()=>{if(typeof process>`u`)return;let e={}.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},ae=()=>{if(typeof document>`u`)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&te(e[1]);return t&&JSON.parse(t)},oe=()=>{try{return m()||re()||ie()||ae()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},se=e=>oe()?.emulatorHosts?.[e],ce=()=>oe()?.config,le=e=>oe()?.[`_${e}`],ue=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e==`function`&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};function b(){return typeof navigator<`u`&&typeof navigator.userAgent==`string`?navigator.userAgent:``}function de(){return typeof window<`u`&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())}function fe(){return typeof navigator<`u`&&navigator.userAgent===`Cloudflare-Workers`}function pe(){let e=typeof chrome==`object`?chrome.runtime:typeof browser==`object`?browser.runtime:void 0;return typeof e==`object`&&e.id!==void 0}function me(){return typeof navigator==`object`&&navigator.product===`ReactNative`}function he(){let e=b();return e.indexOf(`MSIE `)>=0||e.indexOf(`Trident/`)>=0}function ge(){try{return typeof indexedDB==`object`}catch{return!1}}function _e(){return new Promise((e,t)=>{try{let n=!0,r=`validate-browser-context-for-indexeddb-analytics-module`,i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||``)}}catch(e){t(e)}})}var ve=`FirebaseError`,x=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=ve,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,S.prototype.create)}},S=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?ye(i,n):`Error`;return new x(r,`${this.serviceName}: ${a} (${r}).`,n)}};function ye(e,t){try{let n=0,r=``;for(;n<e.length;){let i=e.indexOf(`{$`,n);if(i===-1){r+=e.substring(n);break}let a=e.indexOf(`}`,i+2);if(a===-1){r+=e.substring(n);break}let o=e.substring(i+2,a),s=t[o];r+=e.substring(n,i)+(s==null?`<${o}?>`:String(s)),n=a+1}return r}catch{return e}}function be(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function C(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let n=e[i],a=t[i];if(xe(n)&&xe(a)){if(!C(n,a))return!1}else if(n!==a)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function xe(e){return typeof e==`object`&&!!e}function Se(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+`=`+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+`=`+encodeURIComponent(r));return t.length?`&`+t.join(`&`):``}function Ce(e,t){let n=new we(e,t);return n.subscribe.bind(n)}var we=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(e===void 0&&t===void 0&&n===void 0)throw Error(`Missing Observer.`);r=Te(e,[`next`,`error`,`complete`])?e:{next:e,error:t,complete:n},r.next===void 0&&(r.next=Ee),r.error===void 0&&(r.error=Ee),r.complete===void 0&&(r.complete=Ee);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers!==void 0&&this.observers[e]!==void 0&&(delete this.observers[e],--this.observerCount,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(e){typeof console<`u`&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Te(e,t){if(typeof e!=`object`||!e)return!1;for(let n of t)if(n in e&&typeof e[n]==`function`)return!0;return!1}function Ee(){}function w(e){return e&&e._delegate?e._delegate:e}function De(e){try{return(e.startsWith(`http://`)||e.startsWith(`https://`)?new URL(e).hostname:e).endsWith(`.cloudworkstations.dev`)}catch{return!1}}async function Oe(e){return(await fetch(e,{credentials:`include`})).ok}var T=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode=`LAZY`,this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}},E=`[DEFAULT]`,ke=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new ue;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(e){if(n)return null;throw e}if(n)return null;throw Error(`Service ${this.name} is not available`)}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(je(e))try{this.getOrInitializeService({instanceIdentifier:E})}catch{}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch{}}}}clearInstance(e=E){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>`INTERNAL`in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>`_delete`in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=E){return this.instances.has(e)}getOptions(e=E){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){let n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);let i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Ae(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=E){return this.component?this.component.multipleInstances?e:E:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!==`EXPLICIT`}};function Ae(e){return e===E?void 0:e}function je(e){return e.instantiationMode===`EAGER`}var Me=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new ke(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}},Ne=[],D;(function(e){e[e.DEBUG=0]=`DEBUG`,e[e.VERBOSE=1]=`VERBOSE`,e[e.INFO=2]=`INFO`,e[e.WARN=3]=`WARN`,e[e.ERROR=4]=`ERROR`,e[e.SILENT=5]=`SILENT`})(D||={});var Pe={debug:D.DEBUG,verbose:D.VERBOSE,info:D.INFO,warn:D.WARN,error:D.ERROR,silent:D.SILENT},Fe=D.INFO,Ie={[D.DEBUG]:`log`,[D.VERBOSE]:`log`,[D.INFO]:`info`,[D.WARN]:`warn`,[D.ERROR]:`error`},Le=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=Ie[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)},Re=class{constructor(e){this.name=e,this._logLevel=Fe,this._logHandler=Le,this._userLogHandler=null,Ne.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in D))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e==`string`?Pe[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!=`function`)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,D.DEBUG,...e),this._logHandler(this,D.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,D.VERBOSE,...e),this._logHandler(this,D.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,D.INFO,...e),this._logHandler(this,D.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,D.WARN,...e),this._logHandler(this,D.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,D.ERROR,...e),this._logHandler(this,D.ERROR,...e)}},ze=(e,t)=>t.some(t=>e instanceof t),Be,Ve;function He(){return Be||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function Ue(){return Ve||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var We=new WeakMap,Ge=new WeakMap,Ke=new WeakMap,qe=new WeakMap,Je=new WeakMap;function Ye(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(O(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return t.then(t=>{t instanceof IDBCursor&&We.set(t,e)}).catch(()=>{}),Je.set(t,e),t}function Xe(e){if(Ge.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});Ge.set(e,t)}var Ze={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return Ge.get(e);if(t===`objectStoreNames`)return e.objectStoreNames||Ke.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return O(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)||t in e}};function Qe(e){Ze=e(Ze)}function $e(e){return e===IDBDatabase.prototype.transaction&&!(`objectStoreNames`in IDBTransaction.prototype)?function(t,...n){let r=e.call(tt(this),t,...n);return Ke.set(r,t.sort?t.sort():[t]),O(r)}:Ue().includes(e)?function(...t){return e.apply(tt(this),t),O(We.get(this))}:function(...t){return O(e.apply(tt(this),t))}}function et(e){return typeof e==`function`?$e(e):(e instanceof IDBTransaction&&Xe(e),ze(e,He())?new Proxy(e,Ze):e)}function O(e){if(e instanceof IDBRequest)return Ye(e);if(qe.has(e))return qe.get(e);let t=et(e);return t!==e&&(qe.set(e,t),Je.set(t,e)),t}var tt=e=>Je.get(e);function nt(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=O(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(O(o.result),e.oldVersion,e.newVersion,O(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var rt=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],it=[`put`,`add`,`delete`,`clear`],at=new Map;function ot(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(at.get(t))return at.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=it.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||rt.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return at.set(t,a),a}Qe(e=>({...e,get:(t,n,r)=>ot(t,n)||e.get(t,n,r),has:(t,n)=>!!ot(t,n)||e.has(t,n)}));var st=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(ct(e)){let t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(` `)}};function ct(e){return e.getComponent()?.type===`VERSION`}var lt=`@firebase/app`,ut=`0.16.4`,k=new Re(`@firebase/app`),dt=`@firebase/app-compat`,ft=`@firebase/analytics-compat`,pt=`@firebase/analytics`,mt=`@firebase/app-check-compat`,ht=`@firebase/app-check`,gt=`@firebase/auth`,_t=`@firebase/auth-compat`,vt=`@firebase/database`,yt=`@firebase/data-connect`,bt=`@firebase/database-compat`,xt=`@firebase/functions`,St=`@firebase/functions-compat`,Ct=`@firebase/installations`,wt=`@firebase/installations-compat`,Tt=`@firebase/messaging`,Et=`@firebase/messaging-compat`,Dt=`@firebase/performance`,Ot=`@firebase/performance-compat`,kt=`@firebase/remote-config`,At=`@firebase/remote-config-compat`,jt=`@firebase/storage`,Mt=`@firebase/storage-compat`,Nt=`@firebase/firestore`,Pt=`@firebase/ai`,Ft=`@firebase/firestore-compat`,It=`firebase`,Lt=`13.1.0`,Rt=`[DEFAULT]`,zt={[lt]:`fire-core`,[dt]:`fire-core-compat`,[pt]:`fire-analytics`,[ft]:`fire-analytics-compat`,[ht]:`fire-app-check`,[mt]:`fire-app-check-compat`,[gt]:`fire-auth`,[_t]:`fire-auth-compat`,[vt]:`fire-rtdb`,[yt]:`fire-data-connect`,[bt]:`fire-rtdb-compat`,[xt]:`fire-fn`,[St]:`fire-fn-compat`,[Ct]:`fire-iid`,[wt]:`fire-iid-compat`,[Tt]:`fire-fcm`,[Et]:`fire-fcm-compat`,[Dt]:`fire-perf`,[Ot]:`fire-perf-compat`,[kt]:`fire-rc`,[At]:`fire-rc-compat`,[jt]:`fire-gcs`,[Mt]:`fire-gcs-compat`,[Nt]:`fire-fst`,[Ft]:`fire-fst-compat`,[Pt]:`fire-vertex`,"fire-js":`fire-js`,[It]:`fire-js-all`},Bt=new Map,Vt=new Map,Ht=new Map;function Ut(e,t){try{e.container.addComponent(t)}catch(n){k.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Wt(e){let t=e.name;if(Ht.has(t))return k.debug(`There were multiple attempts to register component ${t}.`),!1;Ht.set(t,e);for(let t of Bt.values())Ut(t,e);for(let t of Vt.values())Ut(t,e);return!0}function Gt(e,t){let n=e.container.getProvider(`heartbeat`).getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function A(e){return e!=null&&e.settings!==void 0}var j=new S(`app`,`Firebase`,{"no-app":`No Firebase App '{$appName}' has been created - call initializeApp() first`,"bad-app-name":`Illegal App name: '{$appName}'`,"duplicate-app":`Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.`,"app-deleted":`Firebase App named '{$appName}' already deleted`,"server-app-deleted":`Firebase Server App has been deleted`,"no-options":`Need to provide options, when not being deployed to hosting via source.`,"invalid-app-argument":`firebase.{$appName}() takes either no argument or a Firebase App instance.`,"invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":`Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.`,"idb-get":`Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.`,"idb-set":`Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.`,"idb-delete":`Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.`,"finalization-registry-not-supported":`FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.`,"invalid-server-app-environment":`FirebaseServerApp is not for use in browser environments.`}),Kt=class{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new T(`app`,()=>this,`PUBLIC`))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw j.create(`app-deleted`,{appName:this._name})}},qt=Lt;function Jt(e,t={}){let n=e;typeof t!=`object`&&(t={name:t});let r={name:Rt,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!=`string`||!i)throw j.create(`bad-app-name`,{appName:String(i)});if(n||=ce(),!n)throw j.create(`no-options`);let a=Bt.get(i);if(a){if(!C(n,a.options))throw j.create(`duplicate-app`,{appName:i,mismatchedParam:`options`,oldValue:JSON.stringify(a.options),newValue:JSON.stringify(n)});if(C(r,a.config))return a;throw j.create(`duplicate-app`,{appName:i,mismatchedParam:`config`,oldValue:JSON.stringify(a.config),newValue:JSON.stringify(r)})}let o=new Me(i);for(let e of Ht.values())o.addComponent(e);let s=new Kt(n,r,o);return Bt.set(i,s),s}function Yt(e=Rt){let t=Bt.get(e);if(!t&&e===`[DEFAULT]`&&ce())return Jt();if(!t)throw j.create(`no-app`,{appName:e});return t}function M(e,t,n){let r=zt[e]??e;n&&(r+=`-${n}`);let i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){let e=[`Unable to register library "${r}" with version "${t}":`];i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&e.push(`and`),a&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),k.warn(e.join(` `))}else Wt(new T(`${r}-version`,()=>({library:r,version:t}),`VERSION`))}var Xt=`firebase-heartbeat-database`,Zt=1,Qt=`firebase-heartbeat-store`,$t=null;function en(){return $t||=nt(Xt,Zt,{upgrade:(e,t)=>{if(t===0)try{e.createObjectStore(Qt)}catch(e){console.warn(e)}}}).catch(e=>{throw j.create(`idb-open`,{originalErrorMessage:e.message})}),$t}async function tn(e){try{let t=(await en()).transaction(Qt),n=await t.objectStore(Qt).get(rn(e));return await t.done,n}catch(e){if(e instanceof x)k.warn(e.message);else{let t=j.create(`idb-get`,{originalErrorMessage:e?.message});k.warn(t.message)}}}async function nn(e,t){try{let n=(await en()).transaction(Qt,`readwrite`);await n.objectStore(Qt).put(t,rn(e)),await n.done}catch(e){if(e instanceof x)k.warn(e.message);else{let t=j.create(`idb-set`,{originalErrorMessage:e?.message});k.warn(t.message)}}}function rn(e){return`${e.name}!${e.options.appId}`}var an=1024,on=30,sn=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider(`app`).getImmediate();this._storage=new un(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{let e=this.container.getProvider(`platform-logger`).getImmediate().getPlatformInfoString(),t=cn();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>on){let e=fn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){k.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return``;let e=cn(),{heartbeatsToSend:t,unsentEntries:n}=ln(this._heartbeatsCache.heartbeats),r=ee(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return k.warn(e),``}}};function cn(){return new Date().toISOString().substring(0,10)}function ln(e,t=an){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(!e){if(n.push({agent:i.agent,dates:[i.date]}),dn(n)>t){n.pop();break}}else if(e.dates.push(i.date),dn(n)>t){e.dates.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var un=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ge()?_e().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let e=await tn(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return nn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){let t=await this.read();return nn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}};function dn(e){return ee(JSON.stringify({version:2,heartbeats:e})).length}function fn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function pn(e){Wt(new T(`platform-logger`,e=>new st(e),`PRIVATE`)),Wt(new T(`heartbeat`,e=>new sn(e),`PRIVATE`)),M(lt,ut,e),M(lt,ut,`esm2020`),M(`fire-js`,``)}pn(``),M(`firebase`,`13.1.0`,`app`);function mn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var hn=mn,gn=new S(`auth`,`Firebase`,mn()),_n=new Re(`@firebase/auth`);function vn(e,...t){_n.logLevel<=D.WARN&&_n.warn(`Auth (${qt}): ${e}`,...t)}function yn(e,...t){_n.logLevel<=D.ERROR&&_n.error(`Auth (${qt}): ${e}`,...t)}function N(e,...t){throw Sn(e,...t)}function P(e,...t){return Sn(e,...t)}function bn(e,t,n){return new S(`auth`,`Firebase`,{...hn(),[t]:n}).create(t,{appName:e.name})}function F(e){return bn(e,`operation-not-supported-in-this-environment`,`Operations that alter the current user are not supported in conjunction with FirebaseServerApp`)}function xn(e,t,n){let r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&N(e,`argument-error`),bn(e,`argument-error`,`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Sn(e,...t){if(typeof e!=`string`){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return gn.create(e,...t)}function I(e,t,...n){if(!e)throw Sn(t,...n)}function L(e){let t=`INTERNAL ASSERTION FAILED: `+e;throw yn(t),Error(t)}function R(e,t){e||L(t)}function Cn(){return typeof self<`u`&&self.location?.href||``}function wn(){return Tn()===`http:`||Tn()===`https:`}function Tn(){return typeof self<`u`&&self.location?.protocol||null}function En(){return typeof navigator<`u`&&navigator&&`onLine`in navigator&&typeof navigator.onLine==`boolean`&&(wn()||pe()||`connection`in navigator)?navigator.onLine:!0}function Dn(){if(typeof navigator>`u`)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}var z=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,R(t>e,`Short delay should be less than long delay!`),this.isMobile=de()||me()}get(){return En()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function On(e,t){R(e.emulator,`Emulator should always be set here`);let{url:n}=e.emulator;return t?`${n}${t.startsWith(`/`)?t.slice(1):t}`:n}var kn=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<`u`&&`fetch`in self)return self.fetch;if(typeof globalThis<`u`&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<`u`)return fetch;L(`Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<`u`&&`Headers`in self)return self.Headers;if(typeof globalThis<`u`&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<`u`)return Headers;L(`Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<`u`&&`Response`in self)return self.Response;if(typeof globalThis<`u`&&globalThis.Response)return globalThis.Response;if(typeof Response<`u`)return Response;L(`Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}},An={CREDENTIAL_MISMATCH:`custom-token-mismatch`,MISSING_CUSTOM_TOKEN:`internal-error`,INVALID_IDENTIFIER:`invalid-email`,MISSING_CONTINUE_URI:`internal-error`,INVALID_PASSWORD:`wrong-password`,MISSING_PASSWORD:`missing-password`,INVALID_LOGIN_CREDENTIALS:`invalid-credential`,EMAIL_EXISTS:`email-already-in-use`,PASSWORD_LOGIN_DISABLED:`operation-not-allowed`,INVALID_IDP_RESPONSE:`invalid-credential`,INVALID_PENDING_TOKEN:`invalid-credential`,FEDERATED_USER_ID_ALREADY_LINKED:`credential-already-in-use`,MISSING_REQ_TYPE:`internal-error`,EMAIL_NOT_FOUND:`user-not-found`,RESET_PASSWORD_EXCEED_LIMIT:`too-many-requests`,EXPIRED_OOB_CODE:`expired-action-code`,INVALID_OOB_CODE:`invalid-action-code`,MISSING_OOB_CODE:`internal-error`,CREDENTIAL_TOO_OLD_LOGIN_AGAIN:`requires-recent-login`,INVALID_ID_TOKEN:`invalid-user-token`,TOKEN_EXPIRED:`user-token-expired`,USER_NOT_FOUND:`user-token-expired`,TOO_MANY_ATTEMPTS_TRY_LATER:`too-many-requests`,PASSWORD_DOES_NOT_MEET_REQUIREMENTS:`password-does-not-meet-requirements`,INVALID_CODE:`invalid-verification-code`,INVALID_SESSION_INFO:`invalid-verification-id`,INVALID_TEMPORARY_PROOF:`invalid-credential`,MISSING_SESSION_INFO:`missing-verification-id`,SESSION_EXPIRED:`code-expired`,MISSING_ANDROID_PACKAGE_NAME:`missing-android-pkg-name`,UNAUTHORIZED_DOMAIN:`unauthorized-continue-uri`,INVALID_OAUTH_CLIENT_ID:`invalid-oauth-client-id`,ADMIN_ONLY_OPERATION:`admin-restricted-operation`,INVALID_MFA_PENDING_CREDENTIAL:`invalid-multi-factor-session`,MFA_ENROLLMENT_NOT_FOUND:`multi-factor-info-not-found`,MISSING_MFA_ENROLLMENT_ID:`missing-multi-factor-info`,MISSING_MFA_PENDING_CREDENTIAL:`missing-multi-factor-session`,SECOND_FACTOR_EXISTS:`second-factor-already-in-use`,SECOND_FACTOR_LIMIT_EXCEEDED:`maximum-second-factor-count-exceeded`,BLOCKING_FUNCTION_ERROR_RESPONSE:`internal-error`,RECAPTCHA_NOT_ENABLED:`recaptcha-not-enabled`,MISSING_RECAPTCHA_TOKEN:`missing-recaptcha-token`,INVALID_RECAPTCHA_TOKEN:`invalid-recaptcha-token`,INVALID_RECAPTCHA_ACTION:`invalid-recaptcha-action`,MISSING_CLIENT_TYPE:`missing-client-type`,MISSING_RECAPTCHA_VERSION:`missing-recaptcha-version`,INVALID_RECAPTCHA_VERSION:`invalid-recaptcha-version`,INVALID_REQ_TYPE:`invalid-req-type`},jn=[`/v1/accounts:signInWithCustomToken`,`/v1/accounts:signInWithEmailLink`,`/v1/accounts:signInWithIdp`,`/v1/accounts:signInWithPassword`,`/v1/accounts:signInWithPhoneNumber`,`/v1/token`],Mn=new z(3e4,6e4);function Nn(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function B(e,t,n,r,i={}){return Pn(e,i,async()=>{let i={},a={};r&&(t===`GET`?a=r:i={body:JSON.stringify(r)});let o=Se({...a,key:e.config.apiKey}).slice(1),s=await e._getAdditionalHeaders();s[`Content-Type`]=`application/json`,e.languageCode&&(s[`X-Firebase-Locale`]=e.languageCode);let c={method:t,headers:s,...i};return fe()||(c.referrerPolicy=`strict-origin-when-cross-origin`),e.emulatorConfig&&De(e.emulatorConfig.host)&&(c.credentials=`include`),kn.fetch()(await In(e,e.config.apiHost,n,o),c)})}async function Pn(e,t,n){e._canInitEmulator=!1;let r={...An,...t};try{let t=new Ln(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let a=await i.json();if(`needConfirmation`in a)throw Rn(e,`account-exists-with-different-credential`,a);if(i.ok&&!(`errorMessage`in a))return a;{let[t,n]=(i.ok?a.errorMessage:a.error.message).split(` : `);if(t===`FEDERATED_USER_ID_ALREADY_LINKED`)throw Rn(e,`credential-already-in-use`,a);if(t===`EMAIL_EXISTS`)throw Rn(e,`email-already-in-use`,a);if(t===`USER_DISABLED`)throw Rn(e,`user-disabled`,a);let o=r[t]||t.toLowerCase().replace(/[_\s]+/g,`-`);if(n)throw bn(e,o,n);N(e,o)}}catch(t){if(t instanceof x)throw t;N(e,`network-request-failed`,{message:String(t)})}}async function Fn(e,t,n,r,i={}){let a=await B(e,t,n,r,i);return`mfaPendingCredential`in a&&N(e,`multi-factor-auth-required`,{_serverResponse:a}),a}async function In(e,t,n,r){let i=`${t}${n}?${r}`,a=e,o=a.config.emulator?On(e.config,i):`${e.config.apiScheme}://${i}`;return jn.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()===`COOKIE`)?a._getPersistence()._getFinalTarget(o).toString():o}var Ln=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(P(this.auth,`network-request-failed`)),Mn.get())})}};function Rn(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=P(e,t,r);return i.customData._tokenResponse=n,i}async function zn(e,t){return B(e,`POST`,`/v1/accounts:delete`,t)}async function Bn(e,t){return B(e,`POST`,`/v1/accounts:lookup`,t)}function Vn(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Hn(e,t=!1){let n=w(e),r=await n.getIdToken(t),i=Wn(r);I(i&&i.exp&&i.auth_time&&i.iat,n.auth,`internal-error`);let a=typeof i.firebase==`object`?i.firebase:void 0,o=a?.sign_in_provider;return{claims:i,token:r,authTime:Vn(Un(i.auth_time)),issuedAtTime:Vn(Un(i.iat)),expirationTime:Vn(Un(i.exp)),signInProvider:o||null,signInSecondFactor:a?.sign_in_second_factor||null}}function Un(e){return Number(e)*1e3}function Wn(e){let[t,n,r]=e.split(`.`);if(t===void 0||n===void 0||r===void 0)return yn(`JWT malformed, contained fewer than 3 sections`),null;try{let e=te(n);return e?JSON.parse(e):(yn(`Failed to decode base64 JWT payload`),null)}catch(e){return yn(`Caught error parsing JWT payload as JSON`,e?.toString()),null}}function Gn(e){let t=Wn(e);return I(t,`internal-error`),I(t.exp!==void 0,`internal-error`),I(t.iat!==void 0,`internal-error`),Number(t.exp)-Number(t.iat)}async function Kn(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw qn(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}function qn(e){return e instanceof x?e.code===`auth/user-disabled`||e.code===`auth/user-token-expired`:!1}var Jn=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}{this.errorBackoff=3e4;let e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code===`auth/network-request-failed`&&this.schedule(!0);return}this.schedule()}},Yn=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vn(this.lastLoginAt),this.creationTime=Vn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Xn(e){let t=e.auth,n=await Kn(e,Bn(t,{idToken:await e.getIdToken()}));I(n?.users.length,t,`internal-error`);let r=n.users[0];e._notifyReloadListener(r);let i=r.providerUserInfo?.length?$n(r.providerUserInfo):[],a=Qn(e.providerData,i),o=e.isAnonymous,s=!(e.email&&r.passwordHash)&&!a?.length,c=o?s:!1,l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Yn(r.createdAt,r.lastLoginAt),isAnonymous:c};Object.assign(e,l)}async function Zn(e){let t=w(e);await Xn(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Qn(e,t){return[...e.filter(e=>!t.some(t=>t.providerId===e.providerId)),...t]}function $n(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||``,displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function er(e,t){let n=await Pn(e,{},async()=>{let n=Se({grant_type:`refresh_token`,refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,a=await In(e,r,`/v1/token`,`key=${i}`),o=await e._getAdditionalHeaders();o[`Content-Type`]=`application/x-www-form-urlencoded`;let s={method:`POST`,headers:o,body:n};return e.emulatorConfig&&De(e.emulatorConfig.host)&&(s.credentials=`include`),kn.fetch()(a,s)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function tr(e,t){return B(e,`POST`,`/v2/accounts:revokeToken`,Nn(e,t))}var nr=class e{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,`internal-error`),I(e.idToken!==void 0,`internal-error`),I(e.refreshToken!==void 0,`internal-error`);let t=`expiresIn`in e&&e.expiresIn!==void 0?Number(e.expiresIn):Gn(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){I(e.length!==0,`internal-error`);let t=Gn(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,`user-token-expired`),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await er(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(t,n){let{refreshToken:r,accessToken:i,expirationTime:a}=n,o=new e;return r&&(I(typeof r==`string`,`internal-error`,{appName:t}),o.refreshToken=r),i&&(I(typeof i==`string`,`internal-error`,{appName:t}),o.accessToken=i),a&&(I(typeof a==`number`,`internal-error`,{appName:t}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new e,this.toJSON())}_performRefresh(){return L(`not implemented`)}};function V(e,t){I(typeof e==`string`||e===void 0,`internal-error`,{appName:t})}var H=class e{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId=`firebase`,this.proactiveRefresh=new Jn(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Yn(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){let t=await Kn(this,this.stsTokenManager.getToken(this.auth,e));return I(t,this.auth,`internal-error`),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Hn(this,e)}reload(){return Zn(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,`internal-error`),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(t){let n=new e({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){I(!this.reloadListener,this.auth,`internal-error`),this.reloadListener=e,this.reloadUserInfo&&=(this._notifyReloadListener(this.reloadUserInfo),null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Xn(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(A(this.auth.app))return Promise.reject(F(this.auth));let e=await this.getIdToken();return await Kn(this,zn(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||``}static _fromJSON(t,n){let r=n.displayName??void 0,i=n.email??void 0,a=n.phoneNumber??void 0,o=n.photoURL??void 0,s=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:p,providerData:m,stsTokenManager:h}=n;I(d&&h,t,`internal-error`);let g=nr.fromJSON(this.name,h);I(typeof d==`string`,t,`internal-error`),V(r,t.name),V(i,t.name),I(typeof f==`boolean`,t,`internal-error`),I(typeof p==`boolean`,t,`internal-error`),V(a,t.name),V(o,t.name),V(s,t.name),V(c,t.name),V(l,t.name),V(u,t.name);let _=new e({uid:d,auth:t,email:i,emailVerified:f,displayName:r,isAnonymous:p,photoURL:o,phoneNumber:a,tenantId:s,stsTokenManager:g,createdAt:l,lastLoginAt:u});return m&&Array.isArray(m)&&(_.providerData=m.map(e=>({...e}))),c&&(_._redirectEventId=c),_}static async _fromIdTokenResponse(t,n,r=!1){let i=new nr;i.updateFromServerResponse(n);let a=new e({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await Xn(a),a}static async _fromGetAccountInfoResponse(t,n,r){let i=n.users[0];I(i.localId!==void 0,`internal-error`);let a=i.providerUserInfo===void 0?[]:$n(i.providerUserInfo),o=!(i.email&&i.passwordHash)&&!a?.length,s=new nr;s.updateFromIdToken(r);let c=new e({uid:i.localId,auth:t,stsTokenManager:s,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Yn(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!a?.length};return Object.assign(c,l),c}},rr=new Map;function U(e){R(e instanceof Function,`Expected a class definition`);let t=rr.get(e);return t?(R(t instanceof e,`Instance stored in cache mismatched with class`),t):(t=new e,rr.set(e,t),t)}var ir=class{constructor(){this.type=`NONE`,this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};ir.type=`NONE`;var ar=ir;function or(e,t,n){return`firebase:${e}:${t}:${n}`}var sr=class e{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=or(this.userKey,r.apiKey,i),this.fullPersistenceKey=or(`persistence`,r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e==`string`){let t=await Bn(this.auth,{idToken:e}).catch(()=>void 0);return t?H._fromGetAccountInfoResponse(this.auth,t,e):null}return H._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(t,n,r=`authUser`){if(!n.length)return new e(U(ar),t,r);let i=(await Promise.all(n.map(async e=>{try{if(await e._isAvailable())return e}catch{return}}))).filter(e=>e),a=i[0]||U(ar),o=or(r,t.config.apiKey,t.name),s=null;for(let e of n)try{let n=await e._get(o);if(n){let r;if(typeof n==`string`){let e=await Bn(t,{idToken:n}).catch(()=>void 0);if(!e)break;r=await H._fromGetAccountInfoResponse(t,e,n)}else r=H._fromJSON(t,n);e!==a&&(s=r),a=e;break}}catch{}let c=i.filter(e=>e._shouldAllowMigration);return!a._shouldAllowMigration||!c.length||(a=c[0],s&&await a._set(o,s.toJSON()),await Promise.all(n.map(async e=>{if(e!==a)try{await e._remove(o)}catch{}}))),new e(a,t,r)}};function cr(e){let t=e.toLowerCase();if(t.includes(`opera/`)||t.includes(`opr/`)||t.includes(`opios/`))return`Opera`;if(fr(t))return`IEMobile`;if(t.includes(`msie`)||t.includes(`trident/`))return`IE`;if(t.includes(`edge/`))return`Edge`;if(lr(t))return`Firefox`;if(t.includes(`silk/`))return`Silk`;if(mr(t))return`Blackberry`;if(hr(t))return`Webos`;if(ur(t))return`Safari`;if((t.includes(`chrome/`)||dr(t))&&!t.includes(`edge/`))return`Chrome`;if(pr(t))return`Android`;{let t=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(t?.length===2)return t[1]}return`Other`}function lr(e=b()){return/firefox\//i.test(e)}function ur(e=b()){let t=e.toLowerCase();return t.includes(`safari/`)&&!t.includes(`chrome/`)&&!t.includes(`crios/`)&&!t.includes(`android`)}function dr(e=b()){return/crios\//i.test(e)}function fr(e=b()){return/iemobile/i.test(e)}function pr(e=b()){return/android/i.test(e)}function mr(e=b()){return/blackberry/i.test(e)}function hr(e=b()){return/webos/i.test(e)}function gr(e=b()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function _r(e=b()){return gr(e)&&!!window.navigator?.standalone}function vr(){return he()&&document.documentMode===10}function yr(e=b()){return gr(e)||pr(e)||hr(e)||mr(e)||/windows phone/i.test(e)||fr(e)}function br(e,t=[]){let n;switch(e){case`Browser`:n=cr(b());break;case`Worker`:n=`${cr(b())}-${e}`;break;default:n=e}let r=t.length?t.join(`,`):`FirebaseCore-web`;return`${n}/JsCore/${qt}/${r}`}var xr=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{n(e(t))}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(let e of t)try{e()}catch{}throw this.auth._errorFactory.create(`login-blocked`,{originalMessage:e?.message})}}};async function Sr(e,t={}){return B(e,`GET`,`/v2/passwordPolicy`,Nn(e,t))}var Cr=6,wr=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Cr,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState===`ENFORCEMENT_STATE_UNSPECIFIED`&&(this.enforcementState=`OFF`),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join(``)??``,this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&=t.meetsMinPasswordLength??!0,t.isValid&&=t.meetsMaxPasswordLength??!0,t.isValid&&=t.containsLowercaseLetter??!0,t.isValid&&=t.containsUppercaseLetter??!0,t.isValid&&=t.containsNumericCharacter??!0,t.isValid&&=t.containsNonAlphanumericCharacter??!0,t}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>=`a`&&n<=`z`,n>=`A`&&n<=`Z`,n>=`0`&&n<=`9`,this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||=t),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||=n),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||=r),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||=i)}},Tr=class{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Dr(this),this.idTokenSubscription=new Dr(this),this.beforeStateQueue=new xr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=U(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await sr.create(this,e)}catch(e){vn(`Failed to initialize persistence: ${e}`),this.persistenceManager=await sr.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(e){vn(`Failed to initialize current user: ${e}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();(this.currentUser||e)&&(this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),await this.currentUser.getIdToken()):await this._updateCurrentUser(e,!0))}async initializeCurrentUserFromIdToken(e){try{let t=await Bn(this,{idToken:e}),n=await H._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn(`FirebaseServerApp could not login user with provided authIdToken: `,e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(A(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),n=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,a=await this.tryRedirectSignIn(e);(!t||t===i)&&a?.user&&(n=a.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,`argument-error`),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xn(e)}catch(e){if(qn(e))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Dn()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(A(this.app))return Promise.reject(F(this));let t=e?w(e):null;return t&&I(t.auth.config.apiKey===this.config.apiKey,this,`invalid-user-token`),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,`tenant-id-mismatch`),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return A(this.app)?Promise.reject(F(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return A(this.app)?Promise.reject(F(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(U(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion===this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?t.validatePassword(e):Promise.reject(this._errorFactory.create(`unsupported-password-policy-schema-version`,{}))}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new wr(await Sr(this));this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new S(`auth`,`Firebase`,e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:`apple.com`,tokenType:`ACCESS_TOKEN`,token:e,idToken:await this.currentUser.getIdToken()};this.tenantId!=null&&(t.tenantId=this.tenantId),await tr(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&U(e)||this._popupRedirectResolver;I(t,this,`argument-error`),this.redirectPersistenceManager=await sr.create(this,[U(t._redirectPersistence)],`redirectUser`),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i=typeof t==`function`?t:t.next.bind(t),a=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(o,this,`internal-error`),o.then(()=>{a||i(this.currentUser)}).catch(e=>{if(!a){if(typeof t!=`function`&&t.error)t.error(e);else if(n)n(e);else throw e}}),typeof t==`function`){let i=e.addObserver(t,n,r);return()=>{a=!0,i()}}{let n=e.addObserver(t);return()=>{a=!0,n()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(e){let t=e?.message||String(e),n=bn(this,`internal-error`,`An internal AuthError has occurred: ${t}`);throw n.customData={originalError:e},n}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,`internal-error`),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=br(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e[`X-Firebase-gmpid`]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e[`X-Firebase-Client`]=t);let n=await this._getAppCheckToken();return n&&(e[`X-Firebase-AppCheck`]=n),e}async _getAppCheckToken(){if(A(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&vn(`Error while retrieving App Check token: ${e.error}`),e?.token}};function Er(e){return w(e)}var Dr=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ce(e=>this.observer=e)}get next(){return I(this.observer,this.auth,`internal-error`),this.observer.next.bind(this.observer)}},Or={async loadJS(){throw Error(`Unable to load external scripts`)},recaptchaV2Script:``,recaptchaEnterpriseScript:``,gapiScript:``};function kr(e){Or=e}function Ar(e){return Or.loadJS(e)}function jr(){return Or.gapiScript}function Mr(e){return`__${e}${Math.floor(Math.random()*1e6)}`}function Nr(e,t){let n=Gt(e,`auth`);if(n.isInitialized()){let e=n.getImmediate();if(C(n.getOptions(),t??{}))return e;N(e,`already-initialized`)}return n.initialize({options:t})}function Pr(e,t){let n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(U);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function Fr(e,t,n){let r=Er(e);I(/^https?:\/\//.test(t),r,`invalid-emulator-scheme`);let i=!!n?.disableWarnings,a=Ir(t),{host:o,port:s}=Lr(t),c=s===null?``:`:${s}`,l={url:`${a}//${o}${c}/`},u=Object.freeze({host:o,port:s,protocol:a.replace(`:`,``),options:Object.freeze({disableWarnings:i})});r._canInitEmulator?(r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,De(o)?Oe(`${a}//${o}${c}`):i||zr()):(I(r.config.emulator&&r.emulatorConfig,r,`emulator-config-failed`),I(C(l,r.config.emulator)&&C(u,r.emulatorConfig),r,`emulator-config-failed`))}function Ir(e){let t=e.indexOf(`:`);return t<0?``:e.substr(0,t+1)}function Lr(e){let t=Ir(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:``,port:null};let r=n[2].split(`@`).pop()||``,i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:Rr(r.substr(e.length+1))}}{let[e,t]=r.split(`:`);return{host:e,port:Rr(t)}}}function Rr(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}function zr(){function e(){let e=document.createElement(`p`),t=e.style;e.innerText=`Running in emulator mode. Do not use with production credentials.`,t.position=`fixed`,t.width=`100%`,t.backgroundColor=`#ffffff`,t.border=`.1em solid #000000`,t.color=`#b50000`,t.bottom=`0px`,t.left=`0px`,t.margin=`0px`,t.zIndex=`10000`,t.textAlign=`center`,e.classList.add(`firebase-emulator-warning`),document.body.appendChild(e)}typeof console<`u`&&typeof console.info==`function`&&console.info(`WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`),typeof window<`u`&&typeof document<`u`&&(document.readyState===`loading`?window.addEventListener(`DOMContentLoaded`,e):e())}var Br=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return L(`not implemented`)}_getIdTokenResponse(e){return L(`not implemented`)}_linkToIdToken(e,t){return L(`not implemented`)}_getReauthenticationResolver(e){return L(`not implemented`)}};async function W(e,t){return Fn(e,`POST`,`/v1/accounts:signInWithIdp`,Nn(e,t))}var Vr=`http://localhost`,Hr=class e extends Br{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){let n=new e(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):N(`argument-error`),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){let{providerId:n,signInMethod:r,...i}=typeof t==`string`?JSON.parse(t):t;if(!n||!r)return null;let a=new e(n,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){return W(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,W(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,W(e,t)}buildRequest(){let e={requestUri:Vr,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Se(t)}return e}},Ur=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}},Wr=class extends Ur{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}},Gr=class e extends Wr{constructor(){super(`facebook.com`)}static credential(t){return Hr._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};Gr.FACEBOOK_SIGN_IN_METHOD=`facebook.com`,Gr.PROVIDER_ID=`facebook.com`;var Kr=class e extends Wr{constructor(){super(`google.com`),this.addScope(`profile`)}static credential(t,n){return Hr._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return e.credential(n,r)}catch{return null}}};Kr.GOOGLE_SIGN_IN_METHOD=`google.com`,Kr.PROVIDER_ID=`google.com`;var qr=class e extends Wr{constructor(){super(`github.com`)}static credential(t){return Hr._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};qr.GITHUB_SIGN_IN_METHOD=`github.com`,qr.PROVIDER_ID=`github.com`;var Jr=class e extends Wr{constructor(){super(`twitter.com`)}static credential(t,n){return Hr._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return e.credential(n,r)}catch{return null}}};Jr.TWITTER_SIGN_IN_METHOD=`twitter.com`,Jr.PROVIDER_ID=`twitter.com`;var Yr=class e{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){let a=await H._fromIdTokenResponse(t,r,i),o=Xr(r);return new e({user:a,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);let i=Xr(r);return new e({user:t,providerId:i,_tokenResponse:r,operationType:n})}};function Xr(e){return e.providerId?e.providerId:`phoneNumber`in e?`phone`:null}var Zr=class e extends x{constructor(t,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,e.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new e(t,n,r,i)}};function Qr(e,t,n,r){return(t===`reauthenticate`?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{throw n.code===`auth/multi-factor-auth-required`?Zr._fromErrorAndOperation(e,n,t,r):n})}async function $r(e,t,n=!1){let r=await Kn(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Yr._forOperation(e,`link`,r)}async function ei(e,t,n=!1){let{auth:r}=e;if(A(r.app))return Promise.reject(F(r));let i=`reauthenticate`;try{let a=await Kn(e,Qr(r,i,t,e),n);I(a.idToken,r,`internal-error`);let o=Wn(a.idToken);I(o,r,`internal-error`);let{sub:s}=o;return I(e.uid===s,r,`user-mismatch`),Yr._forOperation(e,i,a)}catch(e){throw e?.code===`auth/user-not-found`&&N(r,`user-mismatch`),e}}async function ti(e,t,n=!1){if(A(e.app))return Promise.reject(F(e));let r=`signIn`,i=await Qr(e,r,t),a=await Yr._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(a.user),a}function ni(e,t,n,r){return w(e).onIdTokenChanged(t,n,r)}function ri(e,t,n){return w(e).beforeAuthStateChanged(t,n)}function ii(e,t,n,r){return w(e).onAuthStateChanged(t,n,r)}function ai(e){return w(e).signOut()}var oi=`__sak`,si=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(oi,`1`),this.storage.removeItem(oi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}},ci=1e3,li=10,ui=class extends si{constructor(){super(()=>window.localStorage,`LOCAL`),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=yr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);vr()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,li):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent(`storage`,{key:e,oldValue:t,newValue:n}),!0)})},ci)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}attachListener(){window.addEventListener(`storage`,this.boundEventHandler)}detachListener(){window.removeEventListener(`storage`,this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ui.type=`LOCAL`;var di=ui,fi=class extends si{constructor(){super(()=>window.sessionStorage,`SESSION`)}_addListener(e,t){}_removeListener(e,t){}};fi.type=`SESSION`;var pi=fi;function mi(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}var hi=class e{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){let n=this.receivers.find(e=>e.isListeningto(t));if(n)return n;let r=new e(t);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!a?.size)return;t.ports[0].postMessage({status:`ack`,eventId:n,eventType:r});let o=await mi(Array.from(a).map(async e=>e(t.origin,i)));t.ports[0].postMessage({status:`done`,eventId:n,eventType:r,response:o})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener(`message`,this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&this.handlersMap[e].size!==0||delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener(`message`,this.boundEventHandler)}};hi.receivers=[];function gi(e=``,t=10){let n=``;for(let e=0;e<t;e++)n+=Math.floor(Math.random()*10);return e+n}var _i=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener(`message`,e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r=typeof MessageChannel<`u`?new MessageChannel:null;if(!r)throw Error(`connection_unavailable`);let i,a;return new Promise((o,s)=>{let c=gi(``,20);r.port1.start();let l=setTimeout(()=>{s(Error(`unsupported_event`))},n);a={messageChannel:r,onMessage(e){let t=e;if(t.data.eventId===c)switch(t.data.status){case`ack`:clearTimeout(l),i=setTimeout(()=>{s(Error(`timeout`))},3e3);break;case`done`:clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),s(Error(`invalid_response`))}}},this.handlers.add(a),r.port1.addEventListener(`message`,a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function G(){return window}function vi(e){G().location.href=e}function yi(){return G().WorkerGlobalScope!==void 0&&typeof G().importScripts==`function`}async function bi(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function xi(){return navigator?.serviceWorker?.controller||null}function Si(){return yi()?self:null}var Ci=`firebaseLocalStorageDb`,wi=1,Ti=`firebaseLocalStorage`,Ei=`fbase_key`,Di=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener(`success`,()=>{e(this.request.result)}),this.request.addEventListener(`error`,()=>{t(this.request.error)})})}};function Oi(e,t){return e.transaction([Ti],t?`readwrite`:`readonly`).objectStore(Ti)}function ki(){return new Di(indexedDB.deleteDatabase(Ci)).toPromise()}function Ai(){let e=indexedDB.open(Ci,wi);return new Promise((t,n)=>{e.addEventListener(`error`,()=>{n(e.error)}),e.addEventListener(`upgradeneeded`,()=>{let t=e.result;try{t.createObjectStore(Ti,{keyPath:Ei})}catch(e){n(e)}}),e.addEventListener(`success`,async()=>{let n=e.result;n.objectStoreNames.contains(Ti)?t(n):(n.close(),await ki(),t(await Ai()))})})}async function ji(e,t,n){return new Di(Oi(e,!0).put({[Ei]:t,value:n})).toPromise()}async function Mi(e,t){let n=await new Di(Oi(e,!1).get(t)).toPromise();return n===void 0?null:n.value}function Ni(e,t){return new Di(Oi(e,!0).delete(t)).toPromise()}var Pi=800,Fi=3,Ii=class{registerLifecycleListeners(){typeof window<`u`&&typeof window.addEventListener==`function`&&(window.addEventListener(`pagehide`,this.onPageHide),window.addEventListener(`pageshow`,this.onPageShow))}unregisterLifecycleListeners(){typeof window<`u`&&typeof window.removeEventListener==`function`&&(window.removeEventListener(`pagehide`,this.onPageHide),window.removeEventListener(`pageshow`,this.onPageShow))}constructor(){this.type=`LOCAL`,this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&=(this.dbPromise.then(e=>e.close()).catch(()=>{}),null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise||(this.dbPromise=Ai(),this.dbPromise.catch(()=>{this.dbPromise=null})),this.dbPromise}async _withRetries(e){let t=0;for(;;)try{return await e(await this._openDb())}catch(e){if(t++>Fi)throw e;if(this.dbPromise){let e=this.dbPromise;this.dbPromise=null;try{(await e).close()}catch{}}}}async initializeServiceWorkerMessaging(){return yi()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=hi._getInstance(Si()),this.receiver._subscribe(`keyChanged`,async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe(`ping`,async(e,t)=>[`keyChanged`])}async initializeSender(){if(this.activeServiceWorker=await bi(),!this.activeServiceWorker)return;this.sender=new _i(this.activeServiceWorker);let e=await this.sender._send(`ping`,{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes(`keyChanged`)&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&xi()===this.activeServiceWorker)try{await this.sender._send(`keyChanged`,{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await ji(e,oi,`1`),await Ni(e,oi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ji(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>Mi(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ni(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(e=>new Di(Oi(e,!1).getAll()).toPromise());if(this.isClosing||!e||this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}catch(e){return this.isClosing||vn(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Pi)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};Ii.type=`LOCAL`;var Li=Ii;Mr(`rcb`),new z(3e4,6e4);function Ri(e,t){return t?U(t):(I(e._popupRedirectResolver,e,`argument-error`),e._popupRedirectResolver)}var zi=class extends Br{constructor(e){super(`custom`,`custom`),this.params=e}_getIdTokenResponse(e){return W(e,this._buildIdpRequest())}_linkToIdToken(e,t){return W(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return W(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Bi(e){return ti(e.auth,new zi(e),e.bypassAuthState)}function Vi(e){let{auth:t,user:n}=e;return I(n,t,`internal-error`),ei(n,new zi(e),e.bypassAuthState)}async function Hi(e){let{auth:t,user:n}=e;return I(n,t,`internal-error`),$r(n,new zi(e),e.bypassAuthState)}var Ui=class{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:a,type:o}=e;if(a){this.reject(a);return}let s={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(s))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case`signInViaPopup`:case`signInViaRedirect`:return Bi;case`linkViaPopup`:case`linkViaRedirect`:return Hi;case`reauthViaPopup`:case`reauthViaRedirect`:return Vi;default:N(this.auth,`internal-error`)}}resolve(e){R(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){R(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}},Wi=new z(2e3,1e4);async function Gi(e,t,n){if(A(e.app))return Promise.reject(P(e,`operation-not-supported-in-this-environment`));let r=Er(e);return xn(e,t,Ur),new Ki(r,`signInViaPopup`,t,Ri(r,n)).executeNotNull()}var Ki=class e extends Ui{constructor(t,n,r,i,a){super(t,n,i,a),this.provider=r,this.authWindow=null,this.pollId=null,e.currentPopupAction&&e.currentPopupAction.cancel(),e.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return I(e,this.auth,`internal-error`),e}async onExecution(){R(this.filter.length===1,`Popup operations only handle one event`);let e=gi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(P(this.auth,`web-storage-unsupported`))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(P(this.auth,`cancelled-popup-request`))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,e.currentPopupAction=null}pollUserCancellation(){let e=()=>{this.pollId=this.authWindow?.window?.closed?window.setTimeout(()=>{this.pollId=null,this.reject(P(this.auth,`popup-closed-by-user`))},8e3):window.setTimeout(e,Wi.get())};e()}};Ki.currentPopupAction=null;var qi=`pendingRedirect`,Ji=new Map,Yi=class extends Ui{constructor(e,t,n=!1){super(e,[`signInViaRedirect`,`linkViaRedirect`,`reauthViaRedirect`,`unknown`],t,void 0,n),this.eventId=null}async execute(){let e=Ji.get(this.auth._key());if(!e){try{let t=await Xi(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Ji.set(this.auth._key(),e)}return this.bypassAuthState||Ji.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type===`signInViaRedirect`)return super.onAuthEvent(e);if(e.type===`unknown`)this.resolve(null);else if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Xi(e,t){let n=$i(t),r=Qi(e);if(!await r._isAvailable())return!1;let i=await r._get(n)===`true`;return await r._remove(n),i}function Zi(e,t){Ji.set(e._key(),t)}function Qi(e){return U(e._redirectPersistence)}function $i(e){return or(qi,e.config.apiKey,e.name)}async function ea(e,t,n=!1){if(A(e.app))return Promise.reject(F(e));let r=Er(e),i=await new Yi(r,Ri(r,t),n).execute();return i&&!n&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,t)),i}var ta=6e5,na=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!aa(e)||(this.hasHandledPotentialRedirect=!0,t||=(this.queuedRedirectEvent=e,!0)),t}sendToConsumer(e,t){if(e.error&&!ia(e)){let n=e.error.code?.split(`auth/`)[1]||`internal-error`;t.onError(P(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ta&&this.cachedEventUids.clear(),this.cachedEventUids.has(ra(e))}saveEventToCache(e){this.cachedEventUids.add(ra(e)),this.lastProcessedEventTime=Date.now()}};function ra(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join(`-`)}function ia({type:e,error:t}){return e===`unknown`&&t?.code===`auth/no-auth-event`}function aa(e){switch(e.type){case`signInViaRedirect`:case`linkViaRedirect`:case`reauthViaRedirect`:return!0;case`unknown`:return ia(e);default:return!1}}async function oa(e,t={}){return B(e,`GET`,`/v1/projects`,t)}var sa=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ca=/^https?/;async function la(e){if(e.config.emulator)return;let{authorizedDomains:t}=await oa(e);for(let e of t)try{if(ua(e))return}catch{}N(e,`unauthorized-domain`)}function ua(e){let t=Cn(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith(`chrome-extension://`)){let i=new URL(e);return i.hostname===``&&r===``?n===`chrome-extension:`&&e.replace(`chrome-extension://`,``)===t.replace(`chrome-extension://`,``):n===`chrome-extension:`&&i.hostname===r}if(!ca.test(n))return!1;if(sa.test(e))return r===e;let i=e.replace(/\./g,`\\.`);return RegExp(`^(.+\\.`+i+`|`+i+`)$`,`i`).test(r)}var da=new z(3e4,6e4);function fa(){let e=G().___jsl;if(e?.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}function pa(e){return new Promise((t,n)=>{function r(){fa(),gapi.load(`gapi.iframes`,{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{fa(),n(P(e,`network-request-failed`))},timeout:da.get()})}if(G().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(G().gapi?.load)r();else{let t=Mr(`iframefcb`);return G()[t]=()=>{gapi.load?r():n(P(e,`network-request-failed`))},Ar(`${jr()}?onload=${t}`).catch(e=>n(e))}}).catch(e=>{throw ma=null,e})}var ma=null;function ha(e){return ma||=pa(e),ma}var ga=new z(5e3,15e3),_a=`__/auth/iframe`,va=`emulator/auth/iframe`,ya={style:{position:`absolute`,top:`-100px`,width:`1px`,height:`1px`},"aria-hidden":`true`,tabindex:`-1`},ba=new Map([[`identitytoolkit.googleapis.com`,`p`],[`staging-identitytoolkit.sandbox.googleapis.com`,`s`],[`test-identitytoolkit.sandbox.googleapis.com`,`t`]]);function xa(e){let t=e.config;I(t.authDomain,e,`auth-domain-config-required`);let n=t.emulator?On(t,va):`https://${e.config.authDomain}/${_a}`,r={apiKey:t.apiKey,appName:e.name,v:qt},i=ba.get(e.config.apiHost);i&&(r.eid=i);let a=e._getFrameworks();return a.length&&(r.fw=a.join(`,`)),`${n}?${Se(r).slice(1)}`}async function Sa(e){let t=await ha(e),n=G().gapi;return I(n,e,`internal-error`),t.open({where:document.body,url:xa(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ya,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=P(e,`network-request-failed`),a=G().setTimeout(()=>{r(i)},ga.get());function o(){G().clearTimeout(a),n(t)}t.ping(o).then(o,()=>{r(i)})}))}var Ca={location:`yes`,resizable:`yes`,statusbar:`yes`,toolbar:`no`},wa=500,Ta=600,Ea=`_blank`,Da=`http://localhost`,Oa=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function ka(e,t,n,r=wa,i=Ta){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),s=``,c={...Ca,width:r.toString(),height:i.toString(),top:a,left:o},l=b().toLowerCase();n&&(s=dr(l)?Ea:n),lr(l)&&(t||=Da,c.scrollbars=`yes`);let u=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,``);if(_r(l)&&s!==`_self`)return Aa(t||``,s),new Oa(null);let d=window.open(t||``,s,u);I(d,e,`popup-blocked`);try{d.focus()}catch{}return new Oa(d)}function Aa(e,t){let n=document.createElement(`a`);n.href=e,n.target=t;let r=document.createEvent(`MouseEvent`);r.initMouseEvent(`click`,!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}var ja=`__/auth/handler`,Ma=`emulator/auth/handler`,Na=`fac`;async function Pa(e,t,n,r,i,a){I(e.config.authDomain,e,`auth-domain-config-required`),I(e.config.apiKey,e,`invalid-api-key`);let o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:qt,eventId:i};if(t instanceof Ur){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||``,be(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(let[e,t]of Object.entries(a||{}))o[e]=t}if(t instanceof Wr){let e=t.getScopes().filter(e=>e!==``);e.length>0&&(o.scopes=e.join(`,`))}e.tenantId&&(o.tid=e.tenantId);let s=o;for(let e of Object.keys(s))s[e]===void 0&&delete s[e];let c=await e._getAppCheckToken(),l=c?`#${Na}=${encodeURIComponent(c)}`:``;return`${Fa(e)}?${Se(s).slice(1)}${l}`}function Fa({config:e}){return e.emulator?On(e,Ma):`https://${e.authDomain}/${ja}`}var Ia=`webStorageSupport`,La=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=pi,this._completeRedirectFn=ea,this._overrideRedirectResult=Zi}async _openPopup(e,t,n,r){return R(this.eventManagers[e._key()]?.manager,`_initialize() not called before _openPopup()`),ka(e,await Pa(e,t,n,Cn(),r),gi())}async _openRedirect(e,t,n,r){return await this._originValidation(e),vi(await Pa(e,t,n,Cn(),r)),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(R(n,`If manager is not set, promise should be`),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await Sa(e),n=new na(e);return t.register(`authEvent`,t=>(I(t?.authEvent,e,`invalid-auth-event`),{status:n.onEvent(t.authEvent)?`ACK`:`ERROR`}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ia,{type:Ia},n=>{let r=n?.[0]?.[Ia];r!==void 0&&t(!!r),N(e,`internal-error`)},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=la(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return yr()||ur()||gr()}},Ra=`@firebase/auth`,za=`1.13.8`,Ba=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,`dependent-sdk-initialized-before-auth`)}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Va(e){switch(e){case`Node`:return`node`;case`ReactNative`:return`rn`;case`Worker`:return`webworker`;case`Cordova`:return`cordova`;case`WebExtension`:return`web-extension`;default:return}}function Ha(e){Wt(new T(`auth`,(t,{options:n})=>{let r=t.getProvider(`app`).getImmediate(),i=t.getProvider(`heartbeat`),a=t.getProvider(`app-check-internal`),{apiKey:o,authDomain:s}=r.options;I(o&&!o.includes(`:`),`invalid-api-key`,{appName:r.name});let c=new Tr(r,i,a,{apiKey:o,authDomain:s,clientPlatform:e,apiHost:`identitytoolkit.googleapis.com`,tokenApiHost:`securetoken.googleapis.com`,apiScheme:`https`,sdkClientVersion:br(e)});return Pr(c,n),c},`PUBLIC`).setInstantiationMode(`EXPLICIT`).setInstanceCreatedCallback((e,t,n)=>{e.getProvider(`auth-internal`).initialize()})),Wt(new T(`auth-internal`,e=>(e=>new Ba(e))(Er(e.getProvider(`auth`).getImmediate())),`PRIVATE`).setInstantiationMode(`EXPLICIT`)),M(Ra,za,Va(e)),M(Ra,za,`esm2020`)}var Ua=le(`authIdTokenMaxAge`)||300,Wa=null,Ga=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Ua)return;let i=n?.token;Wa!==i&&(Wa=i,await fetch(e,{method:i?`POST`:`DELETE`,headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Ka(e=Yt()){let t=Gt(e,`auth`);if(t.isInitialized())return t.getImmediate();let n=Nr(e,{popupRedirectResolver:La,persistence:[Li,di,pi]}),r=le(`authTokenSyncURL`);if(r&&typeof isSecureContext==`boolean`&&isSecureContext){let e=new URL(r,location.origin);if(location.origin===e.origin){let t=Ga(e.toString());ri(n,t,()=>t(n.currentUser)),ni(n,e=>t(e))}}let i=se(`auth`);return i&&Fr(n,`http://${i}`),n}function qa(){return document.getElementsByTagName(`head`)?.[0]??document}kr({loadJS(e){return new Promise((t,n)=>{let r=document.createElement(`script`);r.setAttribute(`src`,e),r.onload=t,r.onerror=e=>{let t=P(`internal-error`);t.customData=e,n(t)},r.type=`text/javascript`,r.charset=`UTF-8`,qa().appendChild(r)})},gapiScript:`https://apis.google.com/js/api.js`,recaptchaV2Script:`https://www.google.com/recaptcha/api.js`,recaptchaEnterpriseScript:`https://www.google.com/recaptcha/enterprise.js?render=`}),Ha(`Browser`);var Ja=Ka(Jt({projectId:`gen-lang-client-0743500568`,appId:`1:503347096063:web:af31f1d3a4129eee721fca`,apiKey:`AIzaSyAxuItrA02_xT-Nl5rEFwAgjG7W6e4y8wM`,authDomain:`gen-lang-client-0743500568.firebaseapp.com`,storageBucket:`gen-lang-client-0743500568.firebasestorage.app`,messagingSenderId:`503347096063`,measurementId:``,oAuthClientId:`503347096063-p4648cuiocargq9bar1vde17bnkf0tt5.apps.googleusercontent.com`,recaptchaSiteKey:``})),Ya=new Kr;Ya.addScope(`https://www.googleapis.com/auth/spreadsheets`),Ya.addScope(`https://www.googleapis.com/auth/drive.file`),Ya.setCustomParameters({prompt:`select_account`});var Xa=!1,K=null,Za=(e,t)=>ii(Ja,async n=>{n?K?e&&e(n,K):Xa||t&&t():(K=null,t&&t())}),Qa=async()=>{try{Xa=!0;let e=await Gi(Ja,Ya),t=Kr.credentialFromResult(e);if(!t?.accessToken)throw Error(`Failed to obtain Google Sheets access token.`);return K=t.accessToken,{user:e.user,accessToken:K}}catch(e){throw console.error(`Google Sign-in error:`,e),e}finally{Xa=!1}},$a=async()=>K,eo=async()=>{await ai(Ja),K=null},to=`1x_nnfVAKcBEwqlX8VK5KHNQQzs5y45KB64JvPGqW47A`,no=`https://docs.google.com/spreadsheets/d/${to}/edit`;function ro(e){if(!e)return to;let t=e.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);return t&&t[1]?t[1]:e.trim()}var io=[`Settings`,`TheoryTopics`,`LabTopics`,`TaskCompletions`,`DailySchedule`];async function ao(e,t){let n=`https://sheets.googleapis.com/v4/spreadsheets/${e}?fields=properties.title,sheets.properties`,r=await fetch(n,{headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`}});if(!r.ok){let t=await r.text(),n=``;try{n=JSON.parse(t).error?.message||t}catch{n=t}throw r.status===401?Error(`Authentication expired. Please sign in with Google again.`):r.status===403?Error(`Permission denied: Your Google account does not have write access to this sheet (${n}).`):r.status===404?Error(`Spreadsheet not found (ID: ${e}). Please verify the sheet link.`):Error(`Google Sheets API Error (${r.status}): ${n}`)}return await r.json()}async function oo(e,t,n){let r=io.filter(e=>!n.includes(e));if(r.length>0){let n=r.map(e=>({addSheet:{properties:{title:e}}})),i=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}:batchUpdate`,{method:`POST`,headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`},body:JSON.stringify({requests:n})});i.ok||console.warn(`Failed to add some tabs, continuing:`,await i.text())}await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values:batchUpdate`,{method:`POST`,headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`},body:JSON.stringify({valueInputOption:`RAW`,data:[{range:`Settings!A1:B1`,values:[[`Key`,`Value`]]},{range:`TheoryTopics!A1:N1`,values:[[`ID`,`Name`,`Subject`,`Module/Unit`,`PYQ Reference`,`Priority`,`Task Type`,`Estimated Duration`,`Status`,`Target Date`,`Notes`,`Order`,`Created At`,`Completed At`]]},{range:`LabTopics!A1:M1`,values:[[`ID`,`Lab Name`,`Topic/Program Name`,`Experiment No`,`Tool/Language`,`Priority`,`Prep Type`,`Estimated Duration`,`Status`,`Notes`,`Order`,`Created At`,`Completed At`]]},{range:`TaskCompletions!A1:C1`,values:[[`Date (YYYY-MM-DD)`,`Completed Schedule IDs (JSON)`,`Last Updated`]]}]})})}async function so(e,t){let n=(await ao(e,t)).sheets.map(e=>e.properties.title);if(!io.some(e=>n.includes(e)))return await oo(e,t,n),{};let r=[`Settings!A2:B20`,`TheoryTopics!A2:N500`,`LabTopics!A2:M500`,`TaskCompletions!A2:C500`].filter(e=>n.includes(e.split(`!`)[0]));if(r.length===0)return{};let i=r.map(e=>`ranges=${encodeURIComponent(e)}`).join(`&`),a=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values:batchGet?${i}`,{headers:{Authorization:`Bearer ${t}`}});if(!a.ok)throw Error(`Failed to read data from Google Sheets (${a.status})`);let o=(await a.json()).valueRanges||[],s={};for(let e of o){let t=e.range.split(`!`)[0].replace(/'/g,``),n=e.values||[];if(t===`Settings`){let e={};n.forEach(t=>{t[0]&&(e[t[0]]=t[1]??``)}),s.toggles={labDatesAnnounced:e.ToggleA_LabDatesAnnounced===`true`,labExamsCompleted:e.ToggleB_LabExamsCompleted===`true`},s.examDates={studyLeaveStart:e.StudyLeaveStart||`2026-10-29`,theoryExams:{dataScience:{name:`Data Science and Machine Learning`,code:`DS-ML`,date:e.Theory_DataScience_Date||`2026-11-23`,isConfirmed:!0,isCompleted:e.Theory_DataScience_Completed===`true`},daa:{name:`Design and Analysis of Algorithms (DAA)`,code:`DAA`,date:e.Theory_DAA_Date||`2026-11-26`,isConfirmed:!0,isCompleted:e.Theory_DAA_Completed===`true`},operationsResearch:{name:`Operations Research (OR)`,code:`OR`,date:e.Theory_OR_Date||`2026-11-30`,isConfirmed:!0,isCompleted:e.Theory_OR_Completed===`true`},deepLearning:{name:`Deep Learning`,code:`DL`,date:e.Theory_DeepLearning_Date||`2026-12-03`,isConfirmed:!0,isCompleted:e.Theory_DeepLearning_Completed===`true`}},labExams:{madLab:{name:`Mobile Application Development (MAD) Lab`,code:`MAD-LAB`,date:e.Lab_MAD_Date||``,isConfirmed:!!e.Lab_MAD_Date,isCompleted:e.Lab_MAD_Completed===`true`},dsLab:{name:`Data Science Lab`,code:`DS-LAB`,date:e.Lab_DS_Date||``,isConfirmed:!!e.Lab_DS_Date,isCompleted:e.Lab_DS_Completed===`true`}}}}else if(t===`TheoryTopics`)s.theoryTopics=n.map((e,t)=>({id:e[0]||`theory-${t+1}`,name:e[1]||`Untitled Topic`,subject:e[2]||`Data Science and Machine Learning`,moduleUnit:e[3]||void 0,pyqReference:e[4]||void 0,priority:e[5]||`Medium`,taskType:e[6]||`Learn`,estimatedDuration:e[7]||void 0,status:e[8]||`Not Started`,targetDate:e[9]||``,notes:e[10]||void 0,order:Number(e[11])||t,createdAt:e[12]||new Date().toISOString(),completedAt:e[13]||void 0}));else if(t===`LabTopics`)s.labTopics=n.map((e,t)=>({id:e[0]||`lab-${t+1}`,lab:e[1]||`Mobile Application Development (MAD) Lab`,name:e[2]||`Untitled Program`,experimentNumber:e[3]||void 0,toolOrLanguage:e[4]||void 0,priority:e[5]||`Medium`,prepType:e[6]||`Write Code`,estimatedDuration:e[7]||void 0,status:e[8]||`Not Started`,notes:e[9]||void 0,order:Number(e[10])||t,createdAt:e[11]||new Date().toISOString(),completedAt:e[12]||void 0}));else if(t===`TaskCompletions`){let e={};n.forEach(t=>{let n=t[0];if(n){let r=[];try{r=JSON.parse(t[1]||`[]`)}catch{r=t[1]?t[1].split(`,`):[]}e[n]={date:n,completedScheduleIds:r,lastUpdated:t[2]||new Date().toISOString()}}}),s.dailyCompletions=e}}return s}async function co(e,t,n){await oo(e,t,(await ao(e,t)).sheets.map(e=>e.properties.title));let r=[fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values/Settings!A2:B50:clear`,{method:`POST`,headers:{Authorization:`Bearer ${t}`}}),fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values/TheoryTopics!A2:N500:clear`,{method:`POST`,headers:{Authorization:`Bearer ${t}`}}),fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values/LabTopics!A2:M500:clear`,{method:`POST`,headers:{Authorization:`Bearer ${t}`}}),fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values/TaskCompletions!A2:C500:clear`,{method:`POST`,headers:{Authorization:`Bearer ${t}`}})];await Promise.all(r);let i=[[`ToggleA_LabDatesAnnounced`,String(n.toggles.labDatesAnnounced)],[`ToggleB_LabExamsCompleted`,String(n.toggles.labExamsCompleted)],[`StudyLeaveStart`,n.examDates.studyLeaveStart||`2026-10-29`],[`Theory_DataScience_Date`,n.examDates.theoryExams.dataScience.date],[`Theory_DataScience_Completed`,String(n.examDates.theoryExams.dataScience.isCompleted)],[`Theory_DAA_Date`,n.examDates.theoryExams.daa.date],[`Theory_DAA_Completed`,String(n.examDates.theoryExams.daa.isCompleted)],[`Theory_OR_Date`,n.examDates.theoryExams.operationsResearch.date],[`Theory_OR_Completed`,String(n.examDates.theoryExams.operationsResearch.isCompleted)],[`Theory_DeepLearning_Date`,n.examDates.theoryExams.deepLearning.date],[`Theory_DeepLearning_Completed`,String(n.examDates.theoryExams.deepLearning.isCompleted)],[`Lab_MAD_Date`,n.examDates.labExams.madLab.date||``],[`Lab_MAD_Completed`,String(n.examDates.labExams.madLab.isCompleted)],[`Lab_DS_Date`,n.examDates.labExams.dsLab.date||``],[`Lab_DS_Completed`,String(n.examDates.labExams.dsLab.isCompleted)],[`LastSyncTimestamp`,new Date().toISOString()]],a=(n.theoryTopics||[]).map((e,t)=>[e.id,e.name,e.subject,e.moduleUnit||``,e.pyqReference||``,e.priority,e.taskType,e.estimatedDuration||``,e.status,e.targetDate||``,e.notes||``,String(e.order??t),e.createdAt||new Date().toISOString(),e.completedAt||``]),o=(n.labTopics||[]).map((e,t)=>[e.id,e.lab,e.name,e.experimentNumber||``,e.toolOrLanguage||``,e.priority,e.prepType,e.estimatedDuration||``,e.status,e.notes||``,String(e.order??t),e.createdAt||new Date().toISOString(),e.completedAt||``]),s=Object.values(n.dailyCompletions||{}).map(e=>[e.date,JSON.stringify(e.completedScheduleIds),e.lastUpdated]),c=[{range:`Settings!A2:B`+(i.length+1),values:i}];a.length>0&&c.push({range:`TheoryTopics!A2:N`+(a.length+1),values:a}),o.length>0&&c.push({range:`LabTopics!A2:M`+(o.length+1),values:o}),s.length>0&&c.push({range:`TaskCompletions!A2:C`+(s.length+1),values:s});let l=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${e}/values:batchUpdate`,{method:`POST`,headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`},body:JSON.stringify({valueInputOption:`RAW`,data:c})});if(!l.ok){let e=await l.text();throw Error(`Failed to save to Google Sheets: ${e}`)}}var lo=`mca_study_planner_state_v1`,uo={studyLeaveStart:`2026-10-29`,theoryExams:{dataScience:{name:`Data Science and Machine Learning`,code:`DS-ML`,date:`2026-11-23`,isConfirmed:!0,isCompleted:!1},daa:{name:`Design and Analysis of Algorithms (DAA)`,code:`DAA`,date:`2026-11-26`,isConfirmed:!0,isCompleted:!1},operationsResearch:{name:`Operations Research (OR)`,code:`OR`,date:`2026-11-30`,isConfirmed:!0,isCompleted:!1},deepLearning:{name:`Deep Learning`,code:`DL`,date:`2026-12-03`,isConfirmed:!0,isCompleted:!1}},labExams:{madLab:{name:`Mobile Application Development (MAD) Lab`,code:`MAD-LAB`,date:``,isConfirmed:!1,isCompleted:!1},dsLab:{name:`Data Science Lab`,code:`DS-LAB`,date:``,isConfirmed:!1,isCompleted:!1}}},fo={labDatesAnnounced:!1,labExamsCompleted:!1},q=new class{constructor(){this.state={activeTab:`dashboard`,selectedDate:i(),examDates:JSON.parse(JSON.stringify(uo)),toggles:JSON.parse(JSON.stringify(fo)),theoryTopics:[],labTopics:[],dailyCompletions:{},user:null,syncState:{isConnected:!1,spreadsheetId:to,spreadsheetUrl:no,syncStatus:`idle`},confirmDialog:{isOpen:!1,title:``,message:``,confirmLabel:`Confirm`,cancelLabel:`Cancel`,isDestructive:!1,onConfirm:()=>{},onCancel:()=>{}}},this.listeners=new Set,this.autoSyncTimeout=null,this.isLoaded=!1,this.init()}init(){try{let e=localStorage.getItem(lo);if(e){let t=JSON.parse(e);t.examDates&&(this.state.examDates=t.examDates),t.toggles&&(this.state.toggles=t.toggles),Array.isArray(t.theoryTopics)&&(this.state.theoryTopics=t.theoryTopics),Array.isArray(t.labTopics)&&(this.state.labTopics=t.labTopics),t.dailyCompletions&&(this.state.dailyCompletions=t.dailyCompletions),t.spreadsheetId&&(this.state.syncState.spreadsheetId=t.spreadsheetId,this.state.syncState.spreadsheetUrl=`https://docs.google.com/spreadsheets/d/${t.spreadsheetId}/edit`)}}catch(e){console.warn(`Failed to parse local storage cache:`,e)}finally{this.isLoaded=!0}Za((e,t)=>{this.state.user=e,this.state.syncState.isConnected=!0,this.state.syncState.userEmail=e.email||void 0,this.notify()},()=>{this.state.user=null,this.state.syncState.isConnected=!1,this.state.syncState.userEmail=void 0,this.notify()})}saveToLocalStorage(){if(this.isLoaded)try{let e={examDates:this.state.examDates,toggles:this.state.toggles,theoryTopics:this.state.theoryTopics,labTopics:this.state.labTopics,dailyCompletions:this.state.dailyCompletions,spreadsheetId:this.state.syncState.spreadsheetId};localStorage.setItem(lo,JSON.stringify(e))}catch(e){console.error(`Failed to save to localStorage:`,e)}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.saveToLocalStorage();for(let e of this.listeners)e(this.getState())}getState(){let{state:r}=this,i=f(r.toggles,r.examDates,r.selectedDate),a=i.phase===`theory-only`?n:i.phase===`lab-sprint`?t:e,o=(r.dailyCompletions[r.selectedDate]?.completedScheduleIds||[]).filter(e=>a.some(t=>t.id===e)).length,s=a.length,c={completed:o,total:s,percentage:s>0?Math.round(o/s*100):0},l=r.theoryTopics.filter(e=>e.status===`Done`).length,u=r.theoryTopics.length,d={completed:l,total:u,percentage:u>0?Math.round(l/u*100):0},p=r.labTopics.filter(e=>e.lab===`Mobile Application Development (MAD) Lab`),m=p.filter(e=>e.status===`Done`).length,h=p.length,g={completed:m,total:h,percentage:h>0?Math.round(m/h*100):0},_=r.labTopics.filter(e=>e.lab===`Data Science Lab`),v=_.filter(e=>e.status===`Done`).length,y=_.length,ee={completed:v,total:y,percentage:y>0?Math.round(v/y*100):0};return{...r,activePhase:i,activeSchedule:a,dailyScheduleProgress:c,theoryProgress:d,madLabProgress:g,dsLabProgress:ee}}setActiveTab(e){this.state.activeTab=e,this.notify()}setSelectedDate(e){this.state.selectedDate=e,this.notify()}setToggles(e){this.state.toggles={...this.state.toggles,...e},this.triggerAutoSync(),this.notify()}setExamDates(e){this.state.examDates={...this.state.examDates,...e},this.triggerAutoSync(),this.notify()}updateLabExam(e,t,n){let r=this.state.examDates.labExams[e];this.state.examDates.labExams[e]={...r,date:t,isConfirmed:!!t,isCompleted:n===void 0?r.isCompleted:n},this.triggerAutoSync(),this.notify()}markLabExamCompleted(e,t){let n=this.state.examDates.labExams[e];this.state.examDates.labExams[e]={...n,isCompleted:t},this.triggerAutoSync(),this.notify()}toggleScheduleItem(e,t){let n=this.state.dailyCompletions[e]?.completedScheduleIds||[],r=n.includes(t)?n.filter(e=>e!==t):[...n,t];this.state.dailyCompletions[e]={date:e,completedScheduleIds:r,lastUpdated:new Date().toISOString()},this.triggerAutoSync(),this.notify()}resetDaySchedule(e){this.state.dailyCompletions[e]={date:e,completedScheduleIds:[],lastUpdated:new Date().toISOString()},this.triggerAutoSync(),this.notify()}addTheoryTopic(e){let t={...e,id:`theory-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,createdAt:new Date().toISOString(),order:this.state.theoryTopics.length};this.state.theoryTopics.push(t),this.triggerAutoSync(),this.notify()}updateTheoryTopic(e,t){this.state.theoryTopics=this.state.theoryTopics.map(n=>{if(n.id===e){let e=t.status===`Done`;return{...n,...t,completedAt:e?n.completedAt||new Date().toISOString():void 0}}return n}),this.triggerAutoSync(),this.notify()}deleteTheoryTopic(e){this.state.theoryTopics=this.state.theoryTopics.filter(t=>t.id!==e),this.triggerAutoSync(),this.notify()}reorderTheoryTopics(e){this.state.theoryTopics=e.map((e,t)=>({...e,order:t})),this.triggerAutoSync(),this.notify()}carryUnfinishedTheoryTopics(e,t){let n=0;return this.state.theoryTopics=this.state.theoryTopics.map(r=>r.targetDate===e&&r.status!==`Done`?(n++,{...r,targetDate:t}):r),n>0&&(this.triggerAutoSync(),this.notify()),n}addLabTopic(e){let t={...e,id:`lab-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,createdAt:new Date().toISOString(),order:this.state.labTopics.length};this.state.labTopics.push(t),this.triggerAutoSync(),this.notify()}updateLabTopic(e,t){this.state.labTopics=this.state.labTopics.map(n=>{if(n.id===e){let e=t.status===`Done`;return{...n,...t,completedAt:e?n.completedAt||new Date().toISOString():void 0}}return n}),this.triggerAutoSync(),this.notify()}deleteLabTopic(e){this.state.labTopics=this.state.labTopics.filter(t=>t.id!==e),this.triggerAutoSync(),this.notify()}reorderLabTopics(e){this.state.labTopics=e.map((e,t)=>({...e,order:t})),this.triggerAutoSync(),this.notify()}setCustomSpreadsheetId(e){let t=ro(e);this.state.syncState.spreadsheetId=t,this.state.syncState.spreadsheetUrl=`https://docs.google.com/spreadsheets/d/${t}/edit`,this.state.syncState.syncStatus=`idle`,this.state.syncState.errorMessage=void 0,this.notify()}async triggerAutoSync(){let e=await $a();e&&(this.autoSyncTimeout&&clearTimeout(this.autoSyncTimeout),this.autoSyncTimeout=setTimeout(async()=>{this.state.syncState.syncStatus=`syncing`,this.state.syncState.errorMessage=void 0,this.notify();try{await co(this.state.syncState.spreadsheetId,e,{examDates:this.state.examDates,toggles:this.state.toggles,theoryTopics:this.state.theoryTopics,labTopics:this.state.labTopics,dailyCompletions:this.state.dailyCompletions}),this.state.syncState.syncStatus=`success`,this.state.syncState.lastSyncedAt=new Date().toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`}),this.state.syncState.errorMessage=void 0}catch(e){console.error(`Auto-sync failed:`,e),this.state.syncState.syncStatus=`error`,this.state.syncState.errorMessage=e.message||`Sync failed`}this.notify()},1500))}async syncWithSheets(){let e=await $a();if(!e)try{let t=await Qa();if(t)e=t.accessToken,this.state.user=t.user,this.state.syncState.isConnected=!0,this.state.syncState.userEmail=t.user.email||void 0,this.notify();else return}catch(e){this.state.syncState.syncStatus=`error`,this.state.syncState.errorMessage=e.message||`Sign-in failed`,this.notify();return}if(e){this.state.syncState.syncStatus=`syncing`,this.state.syncState.errorMessage=void 0,this.notify();try{let t=await so(this.state.syncState.spreadsheetId,e);t.examDates&&(this.state.examDates=t.examDates),t.toggles&&(this.state.toggles=t.toggles),t.theoryTopics&&t.theoryTopics.length>0&&(this.state.theoryTopics=t.theoryTopics),t.labTopics&&t.labTopics.length>0&&(this.state.labTopics=t.labTopics),t.dailyCompletions&&Object.keys(t.dailyCompletions).length>0&&(this.state.dailyCompletions=t.dailyCompletions),!t.theoryTopics&&!t.examDates&&await co(this.state.syncState.spreadsheetId,e,{examDates:this.state.examDates,toggles:this.state.toggles,theoryTopics:this.state.theoryTopics,labTopics:this.state.labTopics,dailyCompletions:this.state.dailyCompletions}),this.state.syncState.syncStatus=`success`,this.state.syncState.lastSyncedAt=new Date().toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`}),this.state.syncState.errorMessage=void 0}catch(e){console.error(`Sync failed:`,e),this.state.syncState.syncStatus=`error`,this.state.syncState.errorMessage=e.message||`Failed to connect to Google Sheets`}this.notify()}}async signInWithGoogle(){try{let e=await Qa();e&&(this.state.user=e.user,this.state.syncState.isConnected=!0,this.state.syncState.userEmail=e.user.email||void 0,this.notify(),setTimeout(()=>this.syncWithSheets(),100))}catch(e){this.state.syncState.syncStatus=`error`,this.state.syncState.errorMessage=e.message||`Sign in failed`,this.notify()}}async signOutUser(){await eo(),this.state.user=null,this.state.syncState.isConnected=!1,this.state.syncState.userEmail=void 0,this.state.syncState.syncStatus=`idle`,this.notify()}showConfirmDialog(e){this.state.confirmDialog={isOpen:!0,title:e.title,message:e.message,confirmLabel:e.confirmLabel||`Confirm`,cancelLabel:e.cancelLabel||`Cancel`,isDestructive:!!e.isDestructive,onConfirm:()=>{e.onConfirm(),this.closeConfirmDialog()},onCancel:()=>this.closeConfirmDialog()},this.notify()}closeConfirmDialog(){this.state.confirmDialog.isOpen=!1,this.notify()}};function J(e,t=`w-4 h-4`,n=``){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${t}" ${n}>${{calendar:`<rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />`,checkCircle:`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />`,checkCircle2:`<circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />`,clock:`<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />`,alertCircle:`<circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />`,alertTriangle:`<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" />`,bookOpen:`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />`,flaskConical:`<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" /><path d="M8.5 2h7" /><path d="M7 16h10" />`,chevronRight:`<path d="m9 18 6-6-6-6" />`,plus:`<path d="M5 12h14" /><path d="M12 5v14" />`,rotateCcw:`<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />`,sparkles:`<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4M3 5h4M19 17v4M17 19h4" />`,zap:`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />`,arrowRight:`<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />`,checkSquare:`<polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />`,square:`<rect width="18" height="18" x="3" y="3" rx="2" />`,flame:`<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />`,layoutDashboard:`<rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />`,settings:`<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />`,refreshCw:`<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />`,externalLink:`<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />`,arrowUpDown:`<path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" />`,trash2:`<path d="3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />`,edit2:`<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" />`,moon:`<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />`,database:`<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />`,sliders:`<line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" /><line x1="17" x2="23" y1="16" y2="16" />`,download:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />`,info:`<circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" />`,logOut:`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />`,x:`<path d="M18 6 6 18" /><path d="m6 6 12 12" />`,layers:`<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />`,code2:`<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />`}[e]||`<circle cx="12" cy="12" r="10" />`}</svg>`}var po=null;function mo(e,t,n,r){let{activeTab:i,activePhase:a,syncState:o}=t,s=u(),c=[{id:`dashboard`,label:`Dashboard`,iconName:`layoutDashboard`},{id:`theory`,label:`Theory Planner`,iconName:`bookOpen`},{id:`lab`,label:`Lab Planner`,iconName:`flaskConical`},{id:`settings`,label:`Settings`,iconName:`settings`}],l=``;l=o.syncStatus===`syncing`?`
      <span class="inline-flex items-center gap-1.5 animate-pulse text-white">
        ${J(`refreshCw`,`w-3.5 h-3.5 animate-spin text-white`)}
        <span class="hidden sm:inline">Syncing...</span>
      </span>`:o.syncStatus===`error`?`
      <span class="inline-flex items-center gap-1.5 text-neutral-300">
        ${J(`alertCircle`,`w-3.5 h-3.5 text-neutral-300`)}
        <span class="hidden sm:inline">Sync Issue</span>
      </span>`:o.isConnected?`
      <span class="inline-flex items-center gap-1.5 text-white">
        ${J(`checkCircle2`,`w-3.5 h-3.5 text-white`)}
        <span class="hidden sm:inline">Sheets Synced</span>
      </span>`:`
      <span class="inline-flex items-center gap-1.5 text-neutral-400">
        ${J(`refreshCw`,`w-3.5 h-3.5 text-neutral-500`)}
        <span class="hidden sm:inline">Connect Sheets</span>
      </span>`,e.innerHTML=`
    <!-- Top Header -->
    <header class="sticky top-0 z-40 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-neutral-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-4">
          <!-- Left: Branding & Phase Badge -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 cursor-pointer" id="nav-brand-btn">
              <div class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
              <span class="font-bold text-sm tracking-wider uppercase text-white font-mono">
                MCA STUDY TRACKER
              </span>
            </div>

            <!-- Active Phase Pill -->
            <div class="hidden md:inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium border ${a.phase===`lab-sprint`?`bg-neutral-900 text-white border-neutral-600`:a.phase===`theory-only`?`bg-neutral-900 text-neutral-200 border-neutral-700`:`bg-neutral-950 text-neutral-400 border-neutral-800`}">
              ${a.badgeLabel}
            </div>
          </div>

          <!-- Center: Desktop Navigation Tabs -->
          <nav class="hidden md:flex items-center space-x-1">
            ${c.map(e=>{let t=i===e.id;return`
                  <button
                    data-tab="${e.id}"
                    class="nav-tab-btn flex items-center gap-2 px-3 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${t?`bg-white text-black font-semibold`:`text-neutral-400 hover:text-white hover:bg-neutral-900`}"
                  >
                    ${J(e.iconName,`w-4 h-4`)}
                    <span>${e.label}</span>
                  </button>
                `}).join(``)}
          </nav>

          <!-- Right: Clock & Google Sheets Sync Status -->
          <div class="flex items-center gap-3">
            <!-- Live Asia/Kolkata Clock -->
            <div class="hidden lg:flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-900/60 px-2.5 py-1 rounded border border-neutral-800">
              ${J(`clock`,`w-3.5 h-3.5 text-neutral-400`)}
              <span id="live-ist-clock">${s} IST</span>
            </div>

            <!-- Sheets Sync Pill / Button -->
            <button
              id="nav-sync-btn"
              title="${o.syncStatus===`error`?o.errorMessage||`Click to retry sync`:o.isConnected?`Synced to Google Sheets (${o.lastSyncedAt||`Ready`})`:`Click to connect Google Sheets backend`}"
              class="flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono border transition-all cursor-pointer ${o.syncStatus===`syncing`?`bg-neutral-900 text-neutral-200 border-neutral-700`:o.syncStatus===`error`?`bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-neutral-500`:o.isConnected?`bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700`:`bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
            >
              ${l}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E] border-t border-neutral-800/90 pb-safe">
      <div class="grid grid-cols-4 h-16">
        ${c.map(e=>{let t=i===e.id;return`
              <button
                data-tab="${e.id}"
                class="mobile-nav-btn flex flex-col items-center justify-center gap-1 py-1 transition-colors cursor-pointer ${t?`text-white`:`text-neutral-500 hover:text-neutral-300`}"
              >
                <div class="p-1 rounded-md transition-colors ${t?`bg-neutral-800 text-white`:``}">
                  ${J(e.iconName,`w-5 h-5`)}
                </div>
                <span class="text-[10px] uppercase font-mono tracking-wider">
                  ${e.label.split(` `)[0]}
                </span>
              </button>
            `}).join(``)}
      </div>
    </div>
  `,e.querySelectorAll(`.nav-tab-btn, .mobile-nav-btn`).forEach(e=>{e.addEventListener(`click`,t=>{let r=e.getAttribute(`data-tab`);r&&n(r)})});let d=e.querySelector(`#nav-brand-btn`);d&&d.addEventListener(`click`,()=>n(`dashboard`));let f=e.querySelector(`#nav-sync-btn`);f&&f.addEventListener(`click`,()=>r()),po&&clearInterval(po),po=setInterval(()=>{let t=e.querySelector(`#live-ist-clock`);t&&(t.textContent=`${u()} IST`)},1e4)}function ho(e,t,n){let{activePhase:r,activeSchedule:o,selectedDate:s,toggles:u,examDates:f,dailyCompletions:m,dailyScheduleProgress:h,theoryProgress:g,madLabProgress:_,dsLabProgress:v,theoryTopics:y,labTopics:ee}=t,te=i(),ne=a(),re=m[s]?.completedScheduleIds||[],ie=y.filter(e=>e.targetDate===ne),ae=r.phase===`lab-sprint`&&r.activeLabName?ee.filter(e=>e.lab===r.activeLabName&&e.status!==`Done`).sort((e,t)=>e.priority===`High`?-1:1):[];e.innerHTML=`
    <div class="space-y-6 pb-20">
      <!-- 1. Header Hero Card -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${J(`calendar`,`w-3.5 h-3.5 text-neutral-300`)}
              <span>${c(s)}</span>
              ${s===te?`<span class="bg-neutral-800 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">TODAY</span>`:``}
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ${r.headline}
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              ${r.description}
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              id="dash-night-pyq-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer"
              title="10:00–10:30 PM Night PYQ Analysis Mode"
            >
              ${J(`sparkles`,`w-3.5 h-3.5 text-neutral-300`)}
              <span>Night PYQ Mode</span>
            </button>
            <button
              id="dash-add-tomorrow-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              ${J(`plus`,`w-3.5 h-3.5`)}
              <span>+ Tomorrow Topic</span>
            </button>
          </div>
        </div>

        <!-- Urgent Exam Tomorrow Alert if active -->
        ${r.isExamTomorrow?`
          <div class="mt-4 p-3.5 bg-neutral-900 border-l-4 border-white border border-neutral-800 rounded flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              ${J(`flame`,`w-5 h-5 text-white animate-pulse`)}
              <div>
                <span class="text-xs font-mono font-bold tracking-wider text-white uppercase block">
                  EXAM TOMORROW
                </span>
                <span class="text-xs text-neutral-300">
                  ${r.activeLabName} examination is tomorrow. Finish high-priority programs and final self-test.
                </span>
              </div>
            </div>
            <button
              id="dash-review-lab-btn"
              class="text-xs font-mono underline text-white hover:text-neutral-300 whitespace-nowrap cursor-pointer"
            >
              Review Lab Topics &rarr;
            </button>
          </div>
          `:``}

        <!-- Priority Reason Explanation -->
        ${r.priorityReason&&!r.isExamTomorrow?`
          <div class="mt-4 px-3 py-2 bg-[#0B0B0B] border border-neutral-800/80 rounded text-xs font-mono text-neutral-400 flex items-center gap-2">
            ${J(`zap`,`w-3.5 h-3.5 text-neutral-300 shrink-0`)}
            <span>${r.priorityReason}</span>
          </div>
          `:``}
      </div>

      <!-- 2. Phase Control Toggles Panel -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
          <div>
            <h2 class="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Exam Phase Controllers
            </h2>
            <p class="text-[11px] text-neutral-500 mt-0.5">
              Two independent toggle switches adapt the daily study schedule automatically.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Toggle A: Lab Exam Dates Announced -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-md">
            <div class="flex items-center justify-between gap-3 mb-2">
              <div>
                <span class="text-xs font-mono uppercase font-semibold text-white block">
                  Toggle A: Lab Dates Announced
                </span>
                <span class="text-[11px] text-neutral-400">
                  ${u.labDatesAnnounced?`Dates confirmed. 2-day sprint schedules active when window opens.`:`Dates unconfirmed. Following standard pre-lab timetable.`}
                </span>
              </div>
              <button
                type="button"
                id="toggle-a-switch"
                class="w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${u.labDatesAnnounced?`bg-white`:`bg-neutral-800`}"
              >
                <div class="bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${u.labDatesAnnounced?`translate-x-6`:`translate-x-0`}"></div>
              </button>
            </div>

            ${u.labDatesAnnounced?`
              <div class="mt-3 pt-3 border-t border-neutral-800 space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                      MAD Lab Exam Date
                    </label>
                    <input
                      type="date"
                      id="input-mad-date"
                      value="${f.labExams.madLab.date||``}"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
                    />
                    <div class="text-[10px] font-mono text-neutral-500 mt-1">
                      ${f.labExams.madLab.date?p(f.labExams.madLab.date,s).text:`Enter date`}
                    </div>
                  </div>

                  <div>
                    <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                      Data Science Lab Exam Date
                    </label>
                    <input
                      type="date"
                      id="input-ds-date"
                      value="${f.labExams.dsLab.date||``}"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
                    />
                    <div class="text-[10px] font-mono text-neutral-500 mt-1">
                      ${f.labExams.dsLab.date?p(f.labExams.dsLab.date,s).text:`Enter date`}
                    </div>
                  </div>
                </div>
              </div>
            `:``}
          </div>

          <!-- Toggle B: Lab Exams Completed -->
          <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded-md">
            <div class="flex items-center justify-between gap-3 mb-2">
              <div>
                <span class="text-xs font-mono uppercase font-semibold text-white block">
                  Toggle B: Lab Exams Completed
                </span>
                <span class="text-[11px] text-neutral-400">
                  ${u.labExamsCompleted?`All labs finished. Full-day Theory-Only timetable active.`:`Labs pending. Lab preparation blocks included in schedule.`}
                </span>
              </div>
              <button
                type="button"
                id="toggle-b-switch"
                class="w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer shrink-0 ${u.labExamsCompleted?`bg-white`:`bg-neutral-800`}"
              >
                <div class="bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${u.labExamsCompleted?`translate-x-6`:`translate-x-0`}"></div>
              </button>
            </div>

            <!-- Individual Lab Exam Completion Controls -->
            <div class="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
              <span class="text-[11px] font-mono text-neutral-500 uppercase">
                Individual Status:
              </span>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-neutral-300">
                  <input
                    type="checkbox"
                    id="checkbox-mad-completed"
                    ${f.labExams.madLab.isCompleted?`checked`:``}
                    class="accent-white rounded cursor-pointer"
                  />
                  <span>MAD Lab Done</span>
                </label>
                <label class="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-neutral-300">
                  <input
                    type="checkbox"
                    id="checkbox-ds-completed"
                    ${f.labExams.dsLab.isCompleted?`checked`:``}
                    class="accent-white rounded cursor-pointer"
                  />
                  <span>DS Lab Done</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Four Progress Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <!-- Daily Schedule Progress -->
        <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4">
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">Daily Schedule</span>
            ${J(`clock`,`w-3.5 h-3.5`)}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${h.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${h.completed}/${h.total} blocks
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${h.percentage}%"></div>
          </div>
        </div>

        <!-- Theory Topics Progress -->
        <div
          id="card-nav-theory"
          class="bg-[#151515] border border-neutral-800 rounded-lg p-4 cursor-pointer hover:border-neutral-700 transition-colors"
        >
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">Theory Topics</span>
            ${J(`bookOpen`,`w-3.5 h-3.5`)}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${g.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${g.completed}/${g.total} done
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${g.percentage}%"></div>
          </div>
        </div>

        <!-- MAD Lab Progress -->
        <div
          id="card-nav-mad"
          class="bg-[#151515] border border-neutral-800 rounded-lg p-4 cursor-pointer hover:border-neutral-700 transition-colors"
        >
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">MAD Lab</span>
            ${J(`flaskConical`,`w-3.5 h-3.5`)}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${_.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${_.completed}/${_.total} done
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${_.percentage}%"></div>
          </div>
        </div>

        <!-- Data Science Lab Progress -->
        <div
          id="card-nav-ds"
          class="bg-[#151515] border border-neutral-800 rounded-lg p-4 cursor-pointer hover:border-neutral-700 transition-colors"
        >
          <div class="flex items-center justify-between text-neutral-400 mb-2">
            <span class="text-[11px] font-mono uppercase tracking-wider">DS Lab</span>
            ${J(`flaskConical`,`w-3.5 h-3.5`)}
          </div>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-2xl font-bold font-mono text-white">
              ${v.percentage}%
            </span>
            <span class="text-xs font-mono text-neutral-500">
              ${v.completed}/${v.total} done
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-1.5 rounded-full overflow-hidden border border-neutral-800">
            <div class="bg-white h-full transition-all duration-300" style="width: ${v.percentage}%"></div>
          </div>
        </div>
      </div>

      <!-- 4. Main Two Column Layout: Today's Timetable + Exam Timeline -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left 2 Columns: Today's Timetable Checklist -->
        <div class="lg:col-span-2 bg-[#151515] border border-neutral-800 rounded-lg p-5">
          <div class="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <div class="flex items-center gap-2">
              <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
                Today's Timetable
              </h2>
              <span class="text-xs font-mono text-neutral-400">
                (${r.badgeLabel})
              </span>
            </div>

            <button
              id="dash-reset-schedule-btn"
              class="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded transition-colors cursor-pointer"
              title="Reset checkmarks for today"
            >
              ${J(`rotateCcw`,`w-3 h-3`)}
              <span class="hidden sm:inline">Reset Checkmarks</span>
            </button>
          </div>

          <!-- Schedule List -->
          <div class="space-y-2">
            ${o.map(e=>{let t=re.includes(e.id),n=d(e.startTime,e.endTime);return`
                  <div
                    data-schedule-id="${e.id}"
                    class="schedule-row-item group flex items-center justify-between p-3 rounded border transition-all cursor-pointer ${t?`bg-[#0B0B0B]/60 border-neutral-800/60 opacity-60`:n?`bg-[#0B0B0B] border-neutral-500 shadow-xs`:`bg-[#0B0B0B] border-neutral-800/80 hover:border-neutral-700`}"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="text-neutral-400 group-hover:text-white transition-colors">
                        ${t?J(`checkSquare`,`w-4 h-4 text-white`):J(`square`,`w-4 h-4 text-neutral-600`)}
                      </div>

                      <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-mono text-neutral-400 tracking-tight">
                            ${e.timeRange}
                          </span>
                          ${n?`<span class="bg-white text-black font-mono text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">NOW</span>`:``}
                          <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${e.category===`theory`?`bg-neutral-900 text-neutral-300 border-neutral-700`:e.category===`lab`?`bg-neutral-900 text-neutral-200 border-neutral-600 font-semibold`:e.category===`review`?`bg-neutral-900 text-white border-neutral-500`:`bg-neutral-950 text-neutral-500 border-neutral-800`}">
                            ${e.category}
                          </span>
                        </div>
                        <p class="text-xs sm:text-sm font-sans mt-0.5 truncate ${t?`line-through text-neutral-500`:`text-neutral-200 font-medium`}">
                          ${e.activity}
                        </p>
                      </div>
                    </div>
                  </div>
                `}).join(``)}
          </div>
        </div>

        <!-- Right 1 Column: Upcoming Exam Dates & In-Sprint Topics -->
        <div class="space-y-6">
          <!-- Upcoming Exam Schedule -->
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
            <h2 class="text-xs font-mono uppercase tracking-wider font-semibold text-white mb-3 flex items-center justify-between">
              <span>Exam Schedule</span>
              <span class="text-[10px] text-neutral-500">Semester 2026</span>
            </h2>

            <!-- Study Leave Start -->
            <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded mb-3 flex items-center justify-between">
              <div>
                <span class="text-[11px] font-mono text-neutral-400 block">Study Leave Begins</span>
                <span class="text-xs text-white font-medium">
                  ${l(f.studyLeaveStart)}
                </span>
              </div>
              <span class="text-xs font-mono text-neutral-300">
                ${p(f.studyLeaveStart,s).text}
              </span>
            </div>

            <!-- Theory Exams -->
            <div class="space-y-2 mb-4">
              <span class="text-[10px] font-mono uppercase text-neutral-500 block">Theory Exams:</span>
              ${Object.entries(f.theoryExams).map(([e,t])=>{let n=p(t.date,s);return`
                    <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between">
                      <div class="min-w-0 pr-2">
                        <span class="text-xs text-neutral-200 font-medium block truncate">
                          ${t.name}
                        </span>
                        <span class="text-[10px] font-mono text-neutral-500">
                          ${l(t.date)}
                        </span>
                      </div>
                      <span class="text-[11px] font-mono shrink-0 px-2 py-0.5 rounded border ${n.isUrgent?`bg-neutral-900 text-white border-neutral-600`:`bg-neutral-950 text-neutral-400 border-neutral-800`}">
                        ${n.text}
                      </span>
                    </div>
                  `}).join(``)}
            </div>

            <!-- Lab Practical Exams -->
            <div class="space-y-2">
              <span class="text-[10px] font-mono uppercase text-neutral-500 block">Lab Practical Exams:</span>
              ${Object.entries(f.labExams).map(([e,t])=>{let n=u.labDatesAnnounced&&t.date,r=n?p(t.date,s):null;return`
                    <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between">
                      <div class="min-w-0 pr-2">
                        <div class="flex items-center gap-1.5">
                          <span class="text-xs text-neutral-200 font-medium truncate">
                            ${t.name}
                          </span>
                          ${t.isCompleted?`<span class="text-[9px] font-mono uppercase bg-neutral-800 text-neutral-300 px-1 py-0.2 rounded">Done</span>`:``}
                        </div>
                        <span class="text-[10px] font-mono text-neutral-500">
                          ${n?l(t.date):`Date unconfirmed`}
                        </span>
                      </div>
                      <span class="text-[11px] font-mono text-neutral-400">
                        ${r?r.text:`Pending`}
                      </span>
                    </div>
                  `}).join(``)}
            </div>
          </div>

          <!-- If in Lab Sprint: Surfaced Incomplete Lab Topics -->
          ${r.phase===`lab-sprint`?`
            <div class="bg-[#151515] border border-neutral-700 rounded-lg p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xs font-mono uppercase tracking-wider font-semibold text-white flex items-center gap-1.5">
                  ${J(`flaskConical`,`w-3.5 h-3.5 text-white`)}
                  <span>Sprint Priority Programs</span>
                </h3>
                <button
                  id="dash-add-sprint-lab-btn"
                  class="text-[11px] font-mono text-neutral-300 hover:text-white cursor-pointer"
                >
                  + Add
                </button>
              </div>

              ${ae.length===0?`<div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded text-center text-xs text-neutral-400">
                      All recorded topics for ${r.activeLabName} are marked Done!
                    </div>`:`
                  <div class="space-y-2">
                    ${ae.slice(0,5).map(e=>`
                      <div
                        data-lab-id="${e.id}"
                        class="dash-sprint-lab-item p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded hover:border-neutral-700 cursor-pointer flex items-center justify-between gap-2"
                      >
                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5 mb-0.5">
                            ${e.experimentNumber?`<span class="text-[9px] font-mono text-neutral-400">[${e.experimentNumber}]</span>`:``}
                            <span class="text-[9px] font-mono uppercase px-1 py-0.2 rounded border ${e.priority===`High`?`bg-neutral-900 text-white border-neutral-600 font-bold`:`bg-neutral-950 text-neutral-400 border-neutral-800`}">
                              ${e.priority}
                            </span>
                            <span class="text-[9px] font-mono text-neutral-500 uppercase">
                              ${e.prepType}
                            </span>
                          </div>
                          <p class="text-xs text-neutral-200 truncate font-medium">
                            ${e.name}
                          </p>
                        </div>
                        <div class="text-neutral-600 shrink-0">
                          ${J(`square`,`w-4 h-4 text-neutral-600`)}
                        </div>
                      </div>
                    `).join(``)}
                  </div>
                `}
            </div>
          `:``}

          <!-- Tomorrow's Theory Plan Preview -->
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                Tomorrow's Theory Plan
              </h3>
              <button
                id="dash-view-all-theory-btn"
                class="text-[11px] font-mono text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                ${J(`chevronRight`,`w-3 h-3`)}
              </button>
            </div>

            ${ie.length===0?`
              <div class="p-4 bg-[#0B0B0B] border border-neutral-800 rounded text-center">
                <p class="text-xs text-neutral-400 mb-2">
                  No theory topics planned for tomorrow (${ne}) yet.
                </p>
                <button
                  id="dash-add-tomorrow-empty-btn"
                  class="text-xs font-mono text-white underline hover:text-neutral-300 cursor-pointer"
                >
                  + Add Tomorrow's Topics
                </button>
              </div>
            `:`
              <div class="space-y-2">
                ${ie.slice(0,4).map(e=>`
                  <div
                    data-theory-id="${e.id}"
                    class="dash-tomorrow-topic-item p-2.5 bg-[#0B0B0B] border border-neutral-800 rounded hover:border-neutral-700 cursor-pointer flex items-center justify-between gap-2"
                  >
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="text-[9px] font-mono uppercase px-1 py-0.2 rounded border ${e.priority===`High`?`bg-neutral-900 text-white border-neutral-600`:`bg-neutral-950 text-neutral-400 border-neutral-800`}">
                          ${e.priority}
                        </span>
                        <span class="text-[9px] font-mono text-neutral-500 truncate">
                          ${e.subject.split(` `)[0]}
                        </span>
                      </div>
                      <p class="text-xs truncate ${e.status===`Done`?`line-through text-neutral-500`:`text-neutral-200`}">
                        ${e.name}
                      </p>
                    </div>
                    <div class="shrink-0">
                      ${e.status===`Done`?J(`checkSquare`,`w-4 h-4 text-white`):J(`square`,`w-4 h-4 text-neutral-600`)}
                    </div>
                  </div>
                `).join(``)}
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `,e.querySelector(`#dash-night-pyq-btn`)?.addEventListener(`click`,()=>{n.openNightPYQModal()});let oe=()=>{n.openAddTheoryModal(null,ne)};e.querySelector(`#dash-add-tomorrow-btn`)?.addEventListener(`click`,oe),e.querySelector(`#dash-add-tomorrow-empty-btn`)?.addEventListener(`click`,oe),e.querySelector(`#dash-review-lab-btn`)?.addEventListener(`click`,()=>{n.setActiveTab(`lab`)}),e.querySelector(`#dash-view-all-theory-btn`)?.addEventListener(`click`,()=>{n.setActiveTab(`theory`)}),e.querySelector(`#card-nav-theory`)?.addEventListener(`click`,()=>n.setActiveTab(`theory`)),e.querySelector(`#card-nav-mad`)?.addEventListener(`click`,()=>{n.setActiveTab(`lab`)}),e.querySelector(`#card-nav-ds`)?.addEventListener(`click`,()=>{n.setActiveTab(`lab`)}),e.querySelector(`#toggle-a-switch`)?.addEventListener(`click`,()=>{n.setToggles({labDatesAnnounced:!u.labDatesAnnounced})});let se=e.querySelector(`#input-mad-date`);se&&se.addEventListener(`change`,e=>{n.updateLabExam(`madLab`,e.target.value)});let ce=e.querySelector(`#input-ds-date`);ce&&ce.addEventListener(`change`,e=>{n.updateLabExam(`dsLab`,e.target.value)}),e.querySelector(`#toggle-b-switch`)?.addEventListener(`click`,()=>{u.labExamsCompleted?n.setToggles({labExamsCompleted:!1}):n.showConfirmDialog({title:`Activate Post-Lab Theory-Only Phase?`,message:`Switching "Lab Exams Completed" ON will permanently adjust your active daily timetable to full-day Theory Note Preparation and Revision. You can revert this later if needed.`,confirmLabel:`Activate Theory-Only`,onConfirm:()=>{n.setToggles({labExamsCompleted:!0})}})}),e.querySelector(`#checkbox-mad-completed`)?.addEventListener(`change`,e=>{n.markLabExamCompleted(`madLab`,e.target.checked)}),e.querySelector(`#checkbox-ds-completed`)?.addEventListener(`change`,e=>{n.markLabExamCompleted(`dsLab`,e.target.checked)}),e.querySelector(`#dash-reset-schedule-btn`)?.addEventListener(`click`,()=>{n.showConfirmDialog({title:`Reset Today's Timetable Checkmarks?`,message:`This will reset all checkmarks on today's daily schedule blocks so you can start fresh. Your saved theory and lab topic records will remain intact.`,confirmLabel:`Reset Schedule`,isDestructive:!0,onConfirm:()=>{n.resetDaySchedule(s)}})}),e.querySelectorAll(`.schedule-row-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-schedule-id`);t&&n.toggleScheduleItem(s,t)})}),e.querySelectorAll(`.dash-sprint-lab-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-lab-id`);if(t){let e=ee.find(e=>e.id===t);e&&n.updateLabTopic(t,{status:e.status===`Done`?`Not Started`:`Done`})}})}),e.querySelector(`#dash-add-sprint-lab-btn`)?.addEventListener(`click`,()=>{n.openAddLabModal(null,r.activeLabName||void 0)}),e.querySelectorAll(`.dash-tomorrow-topic-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-theory-id`);if(t){let e=y.find(e=>e.id===t);e&&n.updateTheoryTopic(t,{status:e.status===`Done`?`Not Started`:`Done`})}})})}var go=[`All`,`Data Science and Machine Learning`,`Design and Analysis of Algorithms (DAA)`,`Operations Research (OR)`,`Deep Learning`],Y={subject:`All`,priority:`All`,status:`All`,dateScope:`tomorrow`};function _o(e,t,n){let{theoryTopics:r,theoryProgress:o}=t,s=i(),c=a(),u=r.filter(e=>!(Y.subject!==`All`&&e.subject!==Y.subject||Y.priority!==`All`&&e.priority!==Y.priority||Y.status!==`All`&&e.status!==Y.status||Y.dateScope===`tomorrow`&&e.targetDate!==c||Y.dateScope===`today`&&e.targetDate!==s)).sort((e,t)=>e.order-t.order),d=r.filter(e=>e.targetDate<=s&&e.status!==`Done`);e.innerHTML=`
    <div class="space-y-6 pb-20">
      <!-- 1. Header Card with Stats & Night Planning launcher -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${J(`bookOpen`,`w-3.5 h-3.5 text-neutral-300`)}
              <span>Theory Exam Preparation</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Theory Planner & PYQ Strategy
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Organize note preparation, active recall, and previous-year question analysis for
              MCA semester theory exams.
            </p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button
              id="theory-night-pyq-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded transition-colors cursor-pointer"
            >
              ${J(`sparkles`,`w-3.5 h-3.5 text-neutral-300`)}
              <span>10:00 PM PYQ Review</span>
            </button>
            <button
              id="theory-add-topic-btn"
              class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              ${J(`plus`,`w-3.5 h-3.5`)}
              <span>+ Add Topic</span>
            </button>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="mt-5 pt-4 border-t border-neutral-800">
          <div class="flex items-center justify-between text-xs font-mono mb-2">
            <span class="text-neutral-400">OVERALL THEORY COMPLETION</span>
            <span class="text-white font-bold">
              ${o.completed} of ${o.total} completed (
              ${o.percentage}%)
            </span>
          </div>
          <div class="w-full bg-[#0B0B0B] h-2 rounded-full overflow-hidden border border-neutral-800">
            <div
              class="bg-white h-full transition-all duration-300"
              style="width: ${o.percentage}%"
            ></div>
          </div>
        </div>

        <!-- Carry Forward Unfinished Banner if applicable -->
        ${d.length>0?`
          <div class="mt-4 p-3 bg-[#0B0B0B] border border-neutral-800 rounded flex items-center justify-between gap-3">
            <div class="text-xs text-neutral-300 font-mono">
              You have <span class="text-white font-bold">${d.length}</span> incomplete topic(s) from today or earlier.
            </div>
            <button
              id="theory-carry-forward-btn"
              class="flex items-center gap-1 text-xs font-mono px-3 py-1 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <span>Carry to Tomorrow</span>
              ${J(`arrowRight`,`w-3 h-3`)}
            </button>
          </div>
        `:``}
      </div>

      <!-- 2. Filters & View Controls -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4 space-y-3">
        <!-- Date Scope Pills -->
        <div class="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
          <span class="text-xs font-mono text-neutral-500 uppercase mr-1">View:</span>
          <button
            data-scope="tomorrow"
            class="scope-btn px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${Y.dateScope===`tomorrow`?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
          >
            Tomorrow's Topics (${c})
          </button>
          <button
            data-scope="today"
            class="scope-btn px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${Y.dateScope===`today`?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
          >
            Today's Topics (${s})
          </button>
          <button
            data-scope="all"
            class="scope-btn px-3 py-1 text-xs font-mono rounded border transition-colors cursor-pointer ${Y.dateScope===`all`?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
          >
            All Saved Dates
          </button>
        </div>

        <!-- Subject & Status Filters -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <!-- Subject Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Subject Filter
            </label>
            <select
              id="theory-filter-subject"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              ${go.map(e=>`<option value="${e}" ${Y.subject===e?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Priority Filter
            </label>
            <select
              id="theory-filter-priority"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="All" ${Y.priority===`All`?`selected`:``}>All Priorities</option>
              <option value="High" ${Y.priority===`High`?`selected`:``}>High Priority</option>
              <option value="Medium" ${Y.priority===`Medium`?`selected`:``}>Medium Priority</option>
              <option value="Low" ${Y.priority===`Low`?`selected`:``}>Low Priority</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Status Filter
            </label>
            <select
              id="theory-filter-status"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="All" ${Y.status===`All`?`selected`:``}>All Statuses</option>
              <option value="Not Started" ${Y.status===`Not Started`?`selected`:``}>Not Started</option>
              <option value="In Progress" ${Y.status===`In Progress`?`selected`:``}>In Progress</option>
              <option value="Done" ${Y.status===`Done`?`selected`:``}>Done</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Topics Checklist -->
      <div class="space-y-3">
        ${u.length===0?`
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-10 text-center">
            ${J(`bookOpen`,`w-8 h-8 text-neutral-600 mx-auto mb-3`)}
            <h3 class="text-sm font-semibold text-white mb-1">No Theory Topics Found</h3>
            <p class="text-xs text-neutral-400 mb-4 max-w-sm mx-auto">
              ${Y.dateScope===`tomorrow`?`No topics scheduled for tomorrow (${c}). Use the button below to add high-yield questions.`:`No topics match your current filter selection.`}
            </p>
            <button
              id="theory-empty-add-btn"
              class="px-4 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              + Add Tomorrow's Topic
            </button>
          </div>
        `:u.map((e,t)=>{let n=e.status===`Done`,r=e.targetDate===c;return`
            <div
              class="bg-[#151515] border rounded-lg p-4 transition-all ${n?`border-neutral-800/60 opacity-60`:`border-neutral-800 hover:border-neutral-700`}"
            >
              <div class="flex items-start justify-between gap-3">
                <!-- Left: Checkbox & Content -->
                <div class="flex items-start gap-3 min-w-0">
                  <button
                    data-toggle-id="${e.id}"
                    class="topic-toggle-btn mt-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ${n?J(`checkSquare`,`w-5 h-5 text-white`):J(`square`,`w-5 h-5 text-neutral-600`)}
                  </button>

                  <div class="min-w-0 space-y-1">
                    <!-- Meta Tags -->
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${e.priority===`High`?`bg-neutral-900 text-white border-neutral-600 font-bold`:`bg-neutral-950 text-neutral-400 border-neutral-800`}">
                        ${e.priority}
                      </span>

                      <span class="text-[10px] font-mono text-neutral-300 font-medium bg-neutral-900 px-2 py-0.2 rounded border border-neutral-800">
                        ${e.subject}
                      </span>

                      <span class="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.2 rounded border border-neutral-800">
                        ${e.taskType}
                      </span>

                      ${e.moduleUnit?`<span class="text-[10px] font-mono text-neutral-400">[${e.moduleUnit}]</span>`:``}

                      ${e.estimatedDuration?`<span class="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                              ${J(`clock`,`w-3 h-3`)}
                              ${e.estimatedDuration}
                            </span>`:``}
                    </div>

                    <!-- Topic Name -->
                    <h3 class="text-sm sm:text-base font-semibold ${n?`line-through text-neutral-500`:`text-white`}">
                      ${e.name}
                    </h3>

                    <!-- PYQ Reference -->
                    ${e.pyqReference?`<div class="text-xs font-mono text-neutral-300 bg-[#0B0B0B] inline-block px-2 py-0.5 rounded border border-neutral-800">
                            PYQ: ${e.pyqReference}
                          </div>`:``}

                    <!-- Notes -->
                    ${e.notes?`<p class="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">
                            ${e.notes}
                          </p>`:``}

                    <!-- Planned Date -->
                    <div class="text-[10px] font-mono text-neutral-500 pt-1">
                      Planned Date: ${l(e.targetDate)} ${r?`(Tomorrow)`:e.targetDate===s?`(Today)`:``}
                    </div>
                  </div>
                </div>

                <!-- Right: Actions (Move, Edit, Delete) -->
                <div class="flex items-center gap-1 shrink-0">
                  <div class="hidden sm:flex items-center">
                    <button
                      data-move-up="${t}"
                      ${t===0?`disabled`:``}
                      class="topic-move-up p-1.5 text-neutral-500 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      ${J(`arrowUpDown`,`w-3.5 h-3.5`)}
                    </button>
                  </div>

                  <button
                    data-edit-id="${e.id}"
                    class="topic-edit-btn p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                    title="Edit topic"
                  >
                    ${J(`edit2`,`w-3.5 h-3.5`)}
                  </button>

                  <button
                    data-delete-id="${e.id}"
                    data-topic-name="${encodeURIComponent(e.name)}"
                    class="topic-delete-btn p-1.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    title="Delete topic"
                  >
                    ${J(`trash2`,`w-3.5 h-3.5`)}
                  </button>
                </div>
              </div>
            </div>
          `}).join(``)}
      </div>
    </div>
  `,e.querySelector(`#theory-night-pyq-btn`)?.addEventListener(`click`,()=>{n.openNightPYQModal()});let f=()=>{n.openAddTheoryModal(null,c)};e.querySelector(`#theory-add-topic-btn`)?.addEventListener(`click`,f),e.querySelector(`#theory-empty-add-btn`)?.addEventListener(`click`,f),e.querySelector(`#theory-carry-forward-btn`)?.addEventListener(`click`,()=>{d.length!==0&&n.showConfirmDialog({title:`Carry Forward Unfinished Topics?`,message:`Move ${d.length} incomplete topic(s) to tomorrow's plan (${c})?`,confirmLabel:`Carry Forward`,onConfirm:()=>{n.carryUnfinishedTheoryTopics(s,c)}})}),e.querySelectorAll(`.scope-btn`).forEach(r=>{r.addEventListener(`click`,()=>{Y.dateScope=r.getAttribute(`data-scope`),_o(e,t,n)})}),e.querySelector(`#theory-filter-subject`)?.addEventListener(`change`,r=>{Y.subject=r.target.value,_o(e,t,n)}),e.querySelector(`#theory-filter-priority`)?.addEventListener(`change`,r=>{Y.priority=r.target.value,_o(e,t,n)}),e.querySelector(`#theory-filter-status`)?.addEventListener(`change`,r=>{Y.status=r.target.value,_o(e,t,n)}),e.querySelectorAll(`.topic-toggle-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let i=e.getAttribute(`data-toggle-id`),a=r.find(e=>e.id===i);a&&n.updateTheoryTopic(i,{status:a.status===`Done`?`Not Started`:`Done`})})}),e.querySelectorAll(`.topic-edit-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let i=e.getAttribute(`data-edit-id`),a=r.find(e=>e.id===i);a&&n.openAddTheoryModal(a,a.targetDate)})}),e.querySelectorAll(`.topic-delete-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let r=e.getAttribute(`data-delete-id`),i=decodeURIComponent(e.getAttribute(`data-topic-name`)||``);n.showConfirmDialog({title:`Delete Theory Topic?`,message:`Are you sure you want to permanently delete "${i}"?`,confirmLabel:`Delete`,isDestructive:!0,onConfirm:()=>{n.deleteTheoryTopic(r)}})})}),e.querySelectorAll(`.topic-move-up`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let r=Number(e.getAttribute(`data-move-up`));if(r>0&&r<u.length){let e=[...u],t=e[r];e[r]=e[r-1],e[r-1]=t,n.reorderTheoryTopics(e)}})})}var vo=[`All`,`Write Code`,`Execute`,`Debug`,`Explain Output`,`Viva`,`Read`],X={activeLabTab:`Mobile Application Development (MAD) Lab`,prepType:`All`,priority:`All`,status:`All`};function Z(e,t,n){let{labTopics:r,madLabProgress:a,dsLabProgress:o,examDates:s,toggles:c}=t,u=i(),d=X.activeLabTab===`Mobile Application Development (MAD) Lab`,f=d?s.labExams.madLab:s.labExams.dsLab,m=d?`madLab`:`dsLab`,h=r.filter(e=>e.lab===X.activeLabTab).filter(e=>X.prepType===`All`||e.prepType===X.prepType).filter(e=>X.priority===`All`||e.priority===X.priority).filter(e=>X.status===`All`||e.status===X.status).sort((e,t)=>e.order-t.order);e.innerHTML=`
    <div class="space-y-6 pb-20">
      <!-- 1. Header Card with Per-Lab Switcher and Completion Stats -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              ${J(`flaskConical`,`w-3.5 h-3.5 text-neutral-300`)}
              <span>Lab Practical & Viva Preparation</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Lab Exam Planner
            </h1>
            <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Track coding, compilation, execution, debugging, and viva readiness for MCA practicals.
            </p>
          </div>

          <button
            id="lab-add-program-btn"
            class="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors self-start md:self-auto cursor-pointer"
          >
            ${J(`plus`,`w-3.5 h-3.5`)}
            <span>+ Add Lab Program</span>
          </button>
        </div>

        <!-- Lab Switcher Tabs -->
        <div class="mt-5 grid grid-cols-2 gap-3">
          <button
            id="tab-btn-mad"
            class="p-3 rounded border text-left transition-all cursor-pointer ${d?`bg-neutral-900 border-white text-white shadow-xs`:`bg-[#0B0B0B] border-neutral-800 text-neutral-400 hover:border-neutral-700`}"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold uppercase tracking-wider">
                MAD Lab
              </span>
              <span class="text-xs font-mono text-neutral-300">
                ${a.percentage}%
              </span>
            </div>
            <div class="text-[11px] text-neutral-400 mb-2 truncate">
              Mobile Application Development
            </div>
            <div class="w-full bg-[#151515] h-1.5 rounded-full overflow-hidden border border-neutral-800">
              <div
                class="bg-white h-full transition-all duration-300"
                style="width: ${a.percentage}%"
              ></div>
            </div>
          </button>

          <button
            id="tab-btn-ds"
            class="p-3 rounded border text-left transition-all cursor-pointer ${d?`bg-[#0B0B0B] border-neutral-800 text-neutral-400 hover:border-neutral-700`:`bg-neutral-900 border-white text-white shadow-xs`}"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold uppercase tracking-wider">
                Data Science Lab
              </span>
              <span class="text-xs font-mono text-neutral-300">
                ${o.percentage}%
              </span>
            </div>
            <div class="text-[11px] text-neutral-400 mb-2 truncate">
              Python / NumPy / Pandas / ML Models
            </div>
            <div class="w-full bg-[#151515] h-1.5 rounded-full overflow-hidden border border-neutral-800">
              <div
                class="bg-white h-full transition-all duration-300"
                style="width: ${o.percentage}%"
              ></div>
            </div>
          </button>
        </div>

        <!-- Selected Lab Exam Status Bar -->
        <div class="mt-4 p-3 bg-[#0B0B0B] border border-neutral-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div class="flex items-center gap-3">
            ${J(`calendar`,`w-4 h-4 text-neutral-400`)}
            <div>
              <span class="text-neutral-400">Exam Date: </span>
              ${c.labDatesAnnounced&&f.date?`<span class="text-white font-semibold">
                      ${l(f.date)} (${p(f.date,u).text})
                    </span>`:`<span class="text-neutral-500">Unconfirmed (Turn Toggle A ON in Dashboard to set)</span>`}
            </div>
          </div>

          <label class="flex items-center gap-2 cursor-pointer text-neutral-300">
            <input
              type="checkbox"
              id="lab-mark-completed-checkbox"
              ${f.isCompleted?`checked`:``}
              class="accent-white rounded cursor-pointer"
            />
            <span>Mark ${d?`MAD`:`DS`} Practical Exam Completed</span>
          </label>
        </div>
      </div>

      <!-- 2. Filters -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <!-- Prep Type Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Preparation Stage
            </label>
            <select
              id="lab-filter-prep"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
            >
              ${vo.map(e=>`<option value="${e}" ${X.prepType===e?`selected`:``}>${e===`All`?`All Preparation Stages`:e}</option>`).join(``)}
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Priority Filter
            </label>
            <select
              id="lab-filter-priority"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
            >
              <option value="All" ${X.priority===`All`?`selected`:``}>All Priorities</option>
              <option value="High" ${X.priority===`High`?`selected`:``}>High Priority</option>
              <option value="Medium" ${X.priority===`Medium`?`selected`:``}>Medium Priority</option>
              <option value="Low" ${X.priority===`Low`?`selected`:``}>Low Priority</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
              Status Filter
            </label>
            <select
              id="lab-filter-status"
              class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
            >
              <option value="All" ${X.status===`All`?`selected`:``}>All Statuses</option>
              <option value="Not Started" ${X.status===`Not Started`?`selected`:``}>Not Started</option>
              <option value="In Progress" ${X.status===`In Progress`?`selected`:``}>In Progress</option>
              <option value="Done" ${X.status===`Done`?`selected`:``}>Done</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 3. Lab Topics Checklist -->
      <div class="space-y-3">
        ${h.length===0?`
          <div class="bg-[#151515] border border-neutral-800 rounded-lg p-10 text-center">
            ${J(`flaskConical`,`w-8 h-8 text-neutral-600 mx-auto mb-3`)}
            <h3 class="text-sm font-semibold text-white mb-1">
              No Programs Found for ${d?`MAD Lab`:`Data Science Lab`}
            </h3>
            <p class="text-xs text-neutral-400 mb-4 max-w-sm mx-auto">
              Add your lab syllabus programs, experiment numbers, and viva points to track progress.
            </p>
            <button
              id="lab-empty-add-btn"
              class="px-4 py-2 text-xs font-mono font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              + Add First Program
            </button>
          </div>
        `:h.map((e,t)=>{let n=e.status===`Done`;return`
            <div
              class="bg-[#151515] border rounded-lg p-4 transition-all ${n?`border-neutral-800/60 opacity-60`:`border-neutral-800 hover:border-neutral-700`}"
            >
              <div class="flex items-start justify-between gap-3">
                <!-- Left: Checkbox & Info -->
                <div class="flex items-start gap-3 min-w-0">
                  <button
                    data-toggle-id="${e.id}"
                    class="lab-toggle-btn mt-0.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ${n?J(`checkSquare`,`w-5 h-5 text-white`):J(`square`,`w-5 h-5 text-neutral-600`)}
                  </button>

                  <div class="min-w-0 space-y-1">
                    <!-- Meta Tags -->
                    <div class="flex items-center gap-2 flex-wrap">
                      ${e.experimentNumber?`<span class="text-[10px] font-mono font-bold text-white bg-neutral-900 border border-neutral-700 px-1.5 py-0.2 rounded">
                              ${e.experimentNumber}
                            </span>`:``}

                      <span class="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${e.priority===`High`?`bg-neutral-900 text-white border-neutral-600 font-bold`:`bg-neutral-950 text-neutral-400 border-neutral-800`}">
                        ${e.priority}
                      </span>

                      <span class="text-[10px] font-mono text-neutral-300 bg-neutral-900 px-2 py-0.2 rounded border border-neutral-800 uppercase">
                        Stage: ${e.prepType}
                      </span>

                      ${e.toolOrLanguage?`<span class="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.2 rounded border border-neutral-800">
                              ${e.toolOrLanguage}
                            </span>`:``}

                      ${e.estimatedDuration?`<span class="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                              ${J(`clock`,`w-3 h-3`)}
                              ${e.estimatedDuration}
                            </span>`:``}
                    </div>

                    <!-- Program Title -->
                    <h3 class="text-sm sm:text-base font-semibold ${n?`line-through text-neutral-500`:`text-white`}">
                      ${e.name}
                    </h3>

                    <!-- Notes / Viva points -->
                    ${e.notes?`<p class="text-xs text-neutral-400 font-sans mt-1 leading-relaxed">
                            ${e.notes}
                          </p>`:``}
                  </div>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-1 shrink-0">
                  <div class="hidden sm:flex items-center">
                    <button
                      data-move-up="${t}"
                      ${t===0?`disabled`:``}
                      class="lab-move-up p-1.5 text-neutral-500 hover:text-white disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      ${J(`arrowUpDown`,`w-3.5 h-3.5`)}
                    </button>
                  </div>

                  <button
                    data-edit-id="${e.id}"
                    class="lab-edit-btn p-1.5 text-neutral-400 hover:text-white cursor-pointer"
                    title="Edit program"
                  >
                    ${J(`edit2`,`w-3.5 h-3.5`)}
                  </button>

                  <button
                    data-delete-id="${e.id}"
                    data-topic-name="${encodeURIComponent(e.name)}"
                    class="lab-delete-btn p-1.5 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    title="Delete program"
                  >
                    ${J(`trash2`,`w-3.5 h-3.5`)}
                  </button>
                </div>
              </div>
            </div>
          `}).join(``)}
      </div>
    </div>
  `;let g=()=>{n.openAddLabModal(null,X.activeLabTab)};e.querySelector(`#lab-add-program-btn`)?.addEventListener(`click`,g),e.querySelector(`#lab-empty-add-btn`)?.addEventListener(`click`,g),e.querySelector(`#tab-btn-mad`)?.addEventListener(`click`,()=>{X.activeLabTab=`Mobile Application Development (MAD) Lab`,Z(e,t,n)}),e.querySelector(`#tab-btn-ds`)?.addEventListener(`click`,()=>{X.activeLabTab=`Data Science Lab`,Z(e,t,n)}),e.querySelector(`#lab-mark-completed-checkbox`)?.addEventListener(`change`,e=>{n.markLabExamCompleted(m,e.target.checked)}),e.querySelector(`#lab-filter-prep`)?.addEventListener(`change`,r=>{X.prepType=r.target.value,Z(e,t,n)}),e.querySelector(`#lab-filter-priority`)?.addEventListener(`change`,r=>{X.priority=r.target.value,Z(e,t,n)}),e.querySelector(`#lab-filter-status`)?.addEventListener(`change`,r=>{X.status=r.target.value,Z(e,t,n)}),e.querySelectorAll(`.lab-toggle-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let i=e.getAttribute(`data-toggle-id`),a=r.find(e=>e.id===i);a&&n.updateLabTopic(i,{status:a.status===`Done`?`Not Started`:`Done`})})}),e.querySelectorAll(`.lab-edit-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let i=e.getAttribute(`data-edit-id`),a=r.find(e=>e.id===i);a&&n.openAddLabModal(a,a.lab)})}),e.querySelectorAll(`.lab-delete-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let r=e.getAttribute(`data-delete-id`),i=decodeURIComponent(e.getAttribute(`data-topic-name`)||``);n.showConfirmDialog({title:`Delete Lab Program?`,message:`Are you sure you want to delete "${i}" from ${d?`MAD Lab`:`DS Lab`}?`,confirmLabel:`Delete`,isDestructive:!0,onConfirm:()=>{n.deleteLabTopic(r)}})})}),e.querySelectorAll(`.lab-move-up`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let r=Number(e.getAttribute(`data-move-up`));if(r>0&&r<h.length){let e=[...h],t=e[r];e[r]=e[r-1],e[r-1]=t,n.reorderLabTopics(e)}})})}var Q=`pre-lab`,yo=``;function bo(r,a,o){let{examDates:s,user:c,syncState:l,theoryTopics:u,labTopics:d,dailyCompletions:f}=a,p=i(),m=Q===`pre-lab`?e:Q===`lab-sprint`?t:n;r.innerHTML=`
    <div class="space-y-6 pb-20">
      <!-- 1. Header -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6">
        <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
          ${J(`settings`,`w-3.5 h-3.5 text-neutral-300`)}
          <span>Configuration & Cloud Sync</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Application Settings
        </h1>
        <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          Manage Google Sheets persistence, configurable exam dates, phase transitions, and daily schedule presets.
        </p>
      </div>

      <!-- 2. Google Sheets Backend Integration Card -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div class="flex items-center gap-2.5">
            ${J(`database`,`w-4 h-4 text-white`)}
            <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
              Google Sheets Backend
            </h2>
          </div>
          <a
            href="${l.spreadsheetUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>Open Sheet</span>
            ${J(`externalLink`,`w-3.5 h-3.5`)}
          </a>
        </div>

        <!-- Sync Status Banner -->
        <div class="p-3.5 bg-[#0B0B0B] border border-neutral-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div class="flex items-center gap-2.5">
            ${l.syncStatus===`syncing`?J(`refreshCw`,`w-4 h-4 animate-spin text-white`):l.syncStatus===`error`?J(`alertCircle`,`w-4 h-4 text-neutral-300`):l.isConnected?J(`checkCircle2`,`w-4 h-4 text-white`):J(`info`,`w-4 h-4 text-neutral-500`)}
            <div>
              <span class="text-neutral-400">Connection Status: </span>
              <span class="text-white font-medium">
                ${l.syncStatus===`syncing`?`Saving changes to Google Sheets...`:l.syncStatus===`error`?`Connection Error`:l.isConnected?`Connected (${c?.email||`Signed in`})`:`Local Storage (Sign in to sync)`}
              </span>
              ${l.lastSyncedAt?`<span class="text-neutral-500 ml-2">(Last synced at ${l.lastSyncedAt})</span>`:``}
            </div>
          </div>

          <div class="flex items-center gap-2">
            ${c?`
              <button
                id="settings-sync-now-btn"
                ${l.syncStatus===`syncing`?`disabled`:``}
                class="px-3 py-1.5 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                ${J(`refreshCw`,`w-3.5 h-3.5 ${l.syncStatus===`syncing`?`animate-spin`:``}`)}
                <span>Sync Now</span>
              </button>
              <button
                id="settings-sign-out-btn"
                class="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 rounded cursor-pointer"
                title="Sign out"
              >
                ${J(`logOut`,`w-3.5 h-3.5`)}
              </button>
            `:`
              <button id="settings-google-signin-btn" class="gsi-material-button">
                <div class="gsi-material-button-state"></div>
                <div class="gsi-material-button-content-wrapper">
                  <div class="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="display: block;">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span class="gsi-material-button-contents">Sign in with Google</span>
                </div>
              </button>
            `}
          </div>
        </div>

        ${l.errorMessage?`<div class="p-3 bg-neutral-900 border border-neutral-700 rounded text-xs text-neutral-200 font-mono">
                Error: ${l.errorMessage}
              </div>`:``}

        <!-- Spreadsheet Link Form -->
        <form id="settings-sheet-form" class="space-y-2">
          <label class="block text-xs font-mono uppercase text-neutral-400">
            Connected Spreadsheet ID or URL
          </label>
          <div class="flex gap-2">
            <input
              type="text"
              id="settings-sheet-input"
              value="${l.spreadsheetId}"
              placeholder="Google Spreadsheet ID or URL"
              class="flex-1 bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
            />
            <button
              type="submit"
              class="px-4 py-2 text-xs font-mono uppercase font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
            >
              Update ID
            </button>
          </div>
          ${yo?`<p class="text-xs font-mono text-neutral-300">${yo}</p>`:``}
          <p class="text-[11px] text-neutral-500">
            Default Workbook ID: <code class="text-neutral-400 font-mono">1x_nnfVAKcBEwqlX8VK5KHNQQzs5y45KB64JvPGqW47A</code>.
            Organized into <code class="text-neutral-400 font-mono">Settings</code>, <code class="text-neutral-400 font-mono">TheoryTopics</code>, <code class="text-neutral-400 font-mono">LabTopics</code>, and <code class="text-neutral-400 font-mono">TaskCompletions</code>.
          </p>
        </form>
      </div>

      <!-- 3. Configurable Exam Dates -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${J(`calendar`,`w-4 h-4 text-white`)}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Semester Examination Dates
          </h2>
        </div>

        <!-- Study Leave Start -->
        <div class="max-w-md">
          <label class="block text-xs font-mono uppercase text-neutral-400 mb-1">
            Study Leave Commencement
          </label>
          <input
            type="date"
            id="settings-studyleave-date"
            value="${s.studyLeaveStart}"
            class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
          />
        </div>

        <!-- Theory Exam Dates -->
        <div class="pt-2">
          <span class="text-xs font-mono uppercase text-neutral-500 block mb-2">
            Theory Exams (Configurable):
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Data Science and Machine Learning
              </label>
              <input
                type="date"
                id="settings-date-ds-theory"
                value="${s.theoryExams.dataScience.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Design and Analysis of Algorithms (DAA)
              </label>
              <input
                type="date"
                id="settings-date-daa"
                value="${s.theoryExams.daa.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Operations Research (OR)
              </label>
              <input
                type="date"
                id="settings-date-or"
                value="${s.theoryExams.operationsResearch.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Deep Learning
              </label>
              <input
                type="date"
                id="settings-date-dl"
                value="${s.theoryExams.deepLearning.date}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Lab Practical Dates -->
        <div class="pt-2">
          <span class="text-xs font-mono uppercase text-neutral-500 block mb-2">
            Lab Practical Exams (Editable):
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Mobile Application Development (MAD) Lab
              </label>
              <input
                type="date"
                id="settings-date-mad-lab"
                value="${s.labExams.madLab.date||``}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1">
                Data Science Lab
              </label>
              <input
                type="date"
                id="settings-date-ds-lab"
                value="${s.labExams.dsLab.date||``}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white font-mono focus:border-neutral-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Timetable Presets Reference Viewer -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${J(`clock`,`w-4 h-4 text-white`)}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Daily Timetable Reference
          </h2>
        </div>

        <div class="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <button
            data-preset="pre-lab"
            class="preset-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${Q===`pre-lab`?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800`}"
          >
            Phase 1: Pre-Lab (Mixed)
          </button>
          <button
            data-preset="lab-sprint"
            class="preset-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${Q===`lab-sprint`?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800`}"
          >
            2-Day Lab Sprint
          </button>
          <button
            data-preset="theory-only"
            class="preset-tab-btn px-3 py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${Q===`theory-only`?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800`}"
          >
            Phase 2: Theory-Only
          </button>
        </div>

        <!-- Selected Timetable Display -->
        <div class="space-y-1.5">
          ${m.map(e=>`
            <div class="p-2.5 bg-[#0B0B0B] border border-neutral-800/80 rounded flex items-center justify-between text-xs">
              <div class="flex items-center gap-2 min-w-0">
                <span class="font-mono text-neutral-400 shrink-0 w-28 sm:w-32">
                  ${e.timeRange}
                </span>
                <span class="text-neutral-200 font-medium truncate">
                  ${e.activity}
                </span>
              </div>
              <span class="text-[10px] font-mono uppercase text-neutral-500 shrink-0">
                ${e.category}
              </span>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- 5. Data Management & Reset -->
      <div class="bg-[#151515] border border-neutral-800 rounded-lg p-5 sm:p-6 space-y-4">
        <div class="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
          ${J(`sliders`,`w-4 h-4 text-white`)}
          <h2 class="text-sm font-mono uppercase tracking-wider font-semibold text-white">
            Data Tools & Maintenance
          </h2>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-3">
          <button
            id="settings-reset-checks-btn"
            class="w-full sm:w-auto px-4 py-2 text-xs font-mono uppercase font-medium text-neutral-300 hover:text-white bg-[#0B0B0B] border border-neutral-800 hover:border-neutral-700 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            ${J(`rotateCcw`,`w-3.5 h-3.5`)}
            <span>Reset Today's Checkmarks</span>
          </button>

          <button
            id="settings-export-json-btn"
            class="w-full sm:w-auto px-4 py-2 text-xs font-mono uppercase font-medium text-white bg-[#0B0B0B] border border-neutral-800 hover:border-neutral-700 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            ${J(`download`,`w-3.5 h-3.5`)}
            <span>Export JSON Backup</span>
          </button>
        </div>
      </div>
    </div>
  `,r.querySelector(`#settings-sync-now-btn`)?.addEventListener(`click`,()=>{o.syncWithSheets()}),r.querySelector(`#settings-sign-out-btn`)?.addEventListener(`click`,()=>{o.signOutUser()}),r.querySelector(`#settings-google-signin-btn`)?.addEventListener(`click`,()=>{o.signInWithGoogle()}),r.querySelector(`#settings-sheet-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=r.querySelector(`#settings-sheet-input`)?.value||``;o.setCustomSpreadsheetId(t),yo=`Spreadsheet ID updated. Click "Sync Now" to connect.`,bo(r,a,o),setTimeout(()=>{yo=``},4e3)}),r.querySelector(`#settings-studyleave-date`)?.addEventListener(`change`,e=>{o.setExamDates({studyLeaveStart:e.target.value})}),r.querySelector(`#settings-date-ds-theory`)?.addEventListener(`change`,e=>{o.setExamDates({theoryExams:{...s.theoryExams,dataScience:{...s.theoryExams.dataScience,date:e.target.value}}})}),r.querySelector(`#settings-date-daa`)?.addEventListener(`change`,e=>{o.setExamDates({theoryExams:{...s.theoryExams,daa:{...s.theoryExams.daa,date:e.target.value}}})}),r.querySelector(`#settings-date-or`)?.addEventListener(`change`,e=>{o.setExamDates({theoryExams:{...s.theoryExams,operationsResearch:{...s.theoryExams.operationsResearch,date:e.target.value}}})}),r.querySelector(`#settings-date-dl`)?.addEventListener(`change`,e=>{o.setExamDates({theoryExams:{...s.theoryExams,deepLearning:{...s.theoryExams.deepLearning,date:e.target.value}}})}),r.querySelector(`#settings-date-mad-lab`)?.addEventListener(`change`,e=>{o.updateLabExam(`madLab`,e.target.value)}),r.querySelector(`#settings-date-ds-lab`)?.addEventListener(`change`,e=>{o.updateLabExam(`dsLab`,e.target.value)}),r.querySelectorAll(`.preset-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{Q=e.getAttribute(`data-preset`),bo(r,a,o)})}),r.querySelector(`#settings-reset-checks-btn`)?.addEventListener(`click`,()=>{o.showConfirmDialog({title:`Reset Today's Checkmarks?`,message:`This will clear all daily timetable checkmarks for today without deleting any topics or exam dates.`,confirmLabel:`Reset`,isDestructive:!0,onConfirm:()=>{o.resetDaySchedule(p)}})}),r.querySelector(`#settings-export-json-btn`)?.addEventListener(`click`,()=>{let e={exportTimestamp:new Date().toISOString(),examDates:s,theoryTopics:u,labTopics:d,dailyCompletions:f},t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`mca_study_backup_${p}.json`,r.click(),URL.revokeObjectURL(n)})}var xo=[`Data Science and Machine Learning`,`Design and Analysis of Algorithms (DAA)`,`Operations Research (OR)`,`Deep Learning`],So=[`Learn`,`Prepare Notes`,`Practise Questions`,`Revise`,`Mock Test`],Co=[`Mobile Application Development (MAD) Lab`,`Data Science Lab`],wo=[`Read`,`Write Code`,`Execute`,`Debug`,`Explain Output`,`Viva`];function To(e,t,n){let{confirmDialog:r}=t;r.isOpen?(e.innerHTML=`
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        class="relative w-full max-w-md bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl"
      >
        <button
          id="confirm-modal-close"
          aria-label="Close dialog"
          class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          ${J(`x`,`w-5 h-5`)}
        </button>

        <div class="flex items-start gap-3 mb-4">
          <div
            class="p-2 rounded-md ${r.isDestructive?`bg-neutral-900 border border-neutral-700 text-neutral-200`:`bg-neutral-900 border border-neutral-800 text-white`}"
          >
            ${J(`alertTriangle`,`w-5 h-5`)}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white tracking-tight">
              ${r.title}
            </h3>
          </div>
        </div>

        <p class="text-sm text-neutral-300 leading-relaxed mb-6">
          ${r.message}
        </p>

        <div class="flex items-center justify-end gap-3">
          <button
            id="confirm-modal-cancel-btn"
            class="px-4 py-2 text-xs uppercase tracking-wider font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded transition-colors cursor-pointer"
          >
            ${r.cancelLabel||`Cancel`}
          </button>
          <button
            id="confirm-modal-confirm-btn"
            class="px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer ${r.isDestructive?`bg-neutral-200 text-black hover:bg-white`:`bg-white text-black hover:bg-neutral-200`}"
          >
            ${r.confirmLabel||`Confirm`}
          </button>
        </div>
      </div>
    </div>
  `,e.querySelector(`#confirm-modal-close`)?.addEventListener(`click`,()=>{n.closeConfirmDialog()}),e.querySelector(`#confirm-modal-cancel-btn`)?.addEventListener(`click`,()=>{n.closeConfirmDialog()}),e.querySelector(`#confirm-modal-confirm-btn`)?.addEventListener(`click`,()=>{r.onConfirm()})):e.innerHTML=``}function Eo(e,t=null,n=null,r){let i=t?.name||``,o=t?.subject||`Data Science and Machine Learning`,s=t?.moduleUnit||``,c=t?.pyqReference||``,l=t?.priority||`High`,u=t?.taskType||`Prepare Notes`,d=t?.estimatedDuration||`45m`,f=t?.targetDate||n||a(),p=t?.status||`Not Started`,m=t?.notes||``,h=``,g=()=>{e.innerHTML=`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
        <div class="relative w-full max-w-lg bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl my-8">
          <button
            id="modal-theory-close"
            aria-label="Close"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ${J(`x`,`w-5 h-5`)}
          </button>

          <div class="flex items-center gap-2 mb-5">
            ${J(`bookOpen`,`w-5 h-5 text-neutral-300`)}
            <h3 class="text-base font-semibold uppercase tracking-wider text-white">
              ${t?`Edit Theory Topic`:`Add Theory Topic for Tomorrow`}
            </h3>
          </div>

          <form id="modal-theory-form" class="space-y-4">
            ${h?`<div class="p-2.5 bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded">
                    ${h}
                  </div>`:``}

            <!-- Topic Name -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Topic Name *
              </label>
              <input
                type="text"
                id="modal-theory-name"
                value="${i}"
                placeholder="e.g., Dynamic Programming Matrix Chain Multiplication"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 font-sans"
              />
            </div>

            <!-- Subject -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Subject
              </label>
              <select
                id="modal-theory-subject"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
              >
                ${xo.map(e=>`<option value="${e}" ${o===e?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </div>

            <!-- Module & PYQ Reference -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Module / Unit (Optional)
                </label>
                <input
                  type="text"
                  id="modal-theory-module"
                  value="${s}"
                  placeholder="e.g. Unit 3"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  PYQ Reference / Repeated Count
                </label>
                <input
                  type="text"
                  id="modal-theory-pyq"
                  value="${c}"
                  placeholder="e.g. 2023 Dec (3x repeated)"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <!-- Priority & Task Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Priority
                </label>
                <div class="grid grid-cols-3 gap-1.5">
                  ${[`High`,`Medium`,`Low`].map(e=>`
                    <button
                      type="button"
                      data-prio="${e}"
                      class="modal-prio-btn py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${l===e?`bg-white text-black border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
                    >
                      ${e}
                    </button>
                  `).join(``)}
                </div>
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Task Type
                </label>
                <select
                  id="modal-theory-tasktype"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                >
                  ${So.map(e=>`<option value="${e}" ${u===e?`selected`:``}>${e}</option>`).join(``)}
                </select>
              </div>
            </div>

            <!-- Planned Date & Estimated Duration -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Planned Date (Target)
                </label>
                <input
                  type="date"
                  id="modal-theory-date"
                  value="${f}"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 font-mono"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Est. Duration
                </label>
                <input
                  type="text"
                  id="modal-theory-duration"
                  value="${d}"
                  placeholder="e.g. 45m or 1.5h"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <!-- Status (if editing) -->
            ${t?`
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Status
                </label>
                <div class="grid grid-cols-3 gap-2">
                  ${[`Not Started`,`In Progress`,`Done`].map(e=>`
                    <button
                      type="button"
                      data-status="${e}"
                      class="modal-status-btn py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${p===e?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
                    >
                      ${e}
                    </button>
                  `).join(``)}
                </div>
              </div>
            `:``}

            <!-- Notes -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Study Notes / Key Formulas (Optional)
              </label>
              <textarea
                id="modal-theory-notes"
                rows="2"
                placeholder="Important formulas, page references, or specific questions..."
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              >${m}</textarea>
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                id="modal-theory-cancel-btn"
                class="px-4 py-2 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded hover:border-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
              >
                ${t?`Save Changes`:`Add Topic`}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;let n=()=>{e.innerHTML=``};e.querySelector(`#modal-theory-close`)?.addEventListener(`click`,n),e.querySelector(`#modal-theory-cancel-btn`)?.addEventListener(`click`,n),e.querySelectorAll(`.modal-prio-btn`).forEach(e=>{e.addEventListener(`click`,()=>{l=e.getAttribute(`data-prio`),g()})}),e.querySelectorAll(`.modal-status-btn`).forEach(e=>{e.addEventListener(`click`,()=>{p=e.getAttribute(`data-status`),g()})}),e.querySelector(`#modal-theory-form`)?.addEventListener(`submit`,i=>{i.preventDefault();let a=e.querySelector(`#modal-theory-name`)?.value.trim();if(!a){h=`Topic name is required`,g();return}let s={name:a,subject:e.querySelector(`#modal-theory-subject`)?.value||o,moduleUnit:e.querySelector(`#modal-theory-module`)?.value.trim()||void 0,pyqReference:e.querySelector(`#modal-theory-pyq`)?.value.trim()||void 0,priority:l,taskType:e.querySelector(`#modal-theory-tasktype`)?.value||u,estimatedDuration:e.querySelector(`#modal-theory-duration`)?.value.trim()||void 0,targetDate:e.querySelector(`#modal-theory-date`)?.value||f,status:p,notes:e.querySelector(`#modal-theory-notes`)?.value.trim()||void 0};t?r.updateTheoryTopic(t.id,s):r.addTheoryTopic(s),n()})};g()}function Do(e,t=null,n=`Mobile Application Development (MAD) Lab`,r){let i=t?.lab||n,a=t?.name||``,o=t?.experimentNumber||``,s=t?.toolOrLanguage||(i.includes(`MAD`)?`Kotlin / Android Studio`:`Python / Pandas`),c=t?.priority||`High`,l=t?.prepType||`Write Code`,u=t?.estimatedDuration||`45m`,d=t?.status||`Not Started`,f=t?.notes||``,p=``,m=()=>{e.innerHTML=`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
        <div class="relative w-full max-w-lg bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl my-8">
          <button
            id="modal-lab-close"
            aria-label="Close"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ${J(`x`,`w-5 h-5`)}
          </button>

          <div class="flex items-center gap-2 mb-5">
            ${J(`flaskConical`,`w-5 h-5 text-neutral-300`)}
            <h3 class="text-base font-semibold uppercase tracking-wider text-white">
              ${t?`Edit Lab Program / Topic`:`Add Lab Program / Topic`}
            </h3>
          </div>

          <form id="modal-lab-form" class="space-y-4">
            ${p?`<div class="p-2.5 bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 rounded">
                    ${p}
                  </div>`:``}

            <!-- Lab Selection -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Target Lab *
              </label>
              <div class="grid grid-cols-2 gap-2">
                ${Co.map(e=>`
                  <button
                    type="button"
                    data-lab="${e}"
                    class="modal-lab-btn p-2.5 text-xs text-left font-mono rounded border transition-colors cursor-pointer ${i===e?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
                  >
                    ${e.includes(`MAD`)?`MAD Lab`:`Data Science Lab`}
                  </button>
                `).join(``)}
              </div>
            </div>

            <!-- Program Name -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Topic or Program Name *
              </label>
              <input
                type="text"
                id="modal-lab-name"
                value="${a}"
                placeholder="${i.includes(`MAD`)?`e.g. SQLite CRUD Database App with RecyclerView`:`e.g. Linear Regression on House Prices with MSE`}"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <!-- Experiment Number & Tool / Language -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Experiment # (Optional)
                </label>
                <input
                  type="text"
                  id="modal-lab-expnum"
                  value="${o}"
                  placeholder="e.g. Exp 05 or Prog 3"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Tool / Language
                </label>
                <input
                  type="text"
                  id="modal-lab-tool"
                  value="${s}"
                  placeholder="e.g. Android Studio / Python"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            <!-- Priority & Prep Type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Priority
                </label>
                <div class="grid grid-cols-3 gap-1.5">
                  ${[`High`,`Medium`,`Low`].map(e=>`
                    <button
                      type="button"
                      data-prio="${e}"
                      class="modal-prio-btn py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${c===e?`bg-white text-black border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
                    >
                      ${e}
                    </button>
                  `).join(``)}
                </div>
              </div>

              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Prep Type
                </label>
                <select
                  id="modal-lab-preptype"
                  class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                >
                  ${wo.map(e=>`<option value="${e}" ${l===e?`selected`:``}>${e}</option>`).join(``)}
                </select>
              </div>
            </div>

            <!-- Est. Duration -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Estimated Duration
              </label>
              <input
                type="text"
                id="modal-lab-duration"
                value="${u}"
                placeholder="e.g. 45m, 1h"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              />
            </div>

            <!-- Status (if editing) -->
            ${t?`
              <div>
                <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                  Status
                </label>
                <div class="grid grid-cols-3 gap-2">
                  ${[`Not Started`,`In Progress`,`Done`].map(e=>`
                    <button
                      type="button"
                      data-status="${e}"
                      class="modal-status-btn py-1.5 text-xs font-mono rounded border transition-colors cursor-pointer ${d===e?`bg-white text-black font-semibold border-white`:`bg-[#0B0B0B] text-neutral-400 border-neutral-800 hover:border-neutral-700`}"
                    >
                      ${e}
                    </button>
                  `).join(``)}
                </div>
              </div>
            `:``}

            <!-- Notes -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Lab Record Notes / Viva Points
              </label>
              <textarea
                id="modal-lab-notes"
                rows="2"
                placeholder="Key viva questions, edge cases, error fixes or expected output..."
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
              >${f}</textarea>
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                id="modal-lab-cancel-btn"
                class="px-4 py-2 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded hover:border-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2 text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
              >
                ${t?`Save Changes`:`Add Lab Program`}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;let n=()=>{e.innerHTML=``};e.querySelector(`#modal-lab-close`)?.addEventListener(`click`,n),e.querySelector(`#modal-lab-cancel-btn`)?.addEventListener(`click`,n),e.querySelectorAll(`.modal-lab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{i=e.getAttribute(`data-lab`),(!s||s.includes(`Kotlin`)||s.includes(`Python`))&&(s=i.includes(`MAD`)?`Kotlin / Android Studio`:`Python / Pandas`),m()})}),e.querySelectorAll(`.modal-prio-btn`).forEach(e=>{e.addEventListener(`click`,()=>{c=e.getAttribute(`data-prio`),m()})}),e.querySelectorAll(`.modal-status-btn`).forEach(e=>{e.addEventListener(`click`,()=>{d=e.getAttribute(`data-status`),m()})}),e.querySelector(`#modal-lab-form`)?.addEventListener(`submit`,a=>{a.preventDefault();let o=e.querySelector(`#modal-lab-name`)?.value.trim();if(!o){p=`Topic or program name is required`,m();return}let s={lab:i,name:o,experimentNumber:e.querySelector(`#modal-lab-expnum`)?.value.trim()||void 0,toolOrLanguage:e.querySelector(`#modal-lab-tool`)?.value.trim()||void 0,priority:c,prepType:e.querySelector(`#modal-lab-preptype`)?.value||l,estimatedDuration:e.querySelector(`#modal-lab-duration`)?.value.trim()||void 0,status:d,notes:e.querySelector(`#modal-lab-notes`)?.value.trim()||void 0};t?r.updateLabTopic(t.id,s):r.addLabTopic(s),n()})};m()}function Oo(e,t){let n=a(),r=`Data Science and Machine Learning`,i=[{name:``,pyqRef:`Repeated PYQ (2+ times)`,priority:`High`,taskType:`Prepare Notes`}],o=()=>{e.innerHTML=`
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs overflow-y-auto">
        <div class="relative w-full max-w-2xl bg-[#151515] border border-neutral-800 rounded-lg p-6 shadow-2xl my-8">
          <button
            id="modal-night-close"
            aria-label="Close"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ${J(`x`,`w-5 h-5`)}
          </button>

          <div class="flex items-center gap-2 mb-2">
            ${J(`moon`,`w-5 h-5 text-white`)}
            <h3 class="text-base font-semibold uppercase tracking-wider text-white">
              10:00–10:30 PM Night PYQ Analysis Mode
            </h3>
          </div>
          <p class="text-xs text-neutral-400 mb-6 leading-relaxed">
            Inspect university previous-year question papers for tomorrow's target subject.
            List the highest-yield recurring questions and prepare tomorrow's note-making plan.
          </p>

          <div class="space-y-4">
            <!-- Target Subject Selector -->
            <div>
              <label class="block text-xs uppercase tracking-wider font-mono text-neutral-400 mb-1.5">
                Target Subject for Tomorrow (${n})
              </label>
              <select
                id="modal-night-subject"
                class="w-full bg-[#0B0B0B] border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 font-sans"
              >
                ${xo.map(e=>`<option value="${e}" ${r===e?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </div>

            <!-- Draft Topic Rows -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs uppercase tracking-wider font-mono text-neutral-400">
                  Identified PYQ Topics
                </span>
                <button
                  type="button"
                  id="modal-night-add-row"
                  class="flex items-center gap-1 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded transition-colors cursor-pointer"
                >
                  ${J(`plus`,`w-3.5 h-3.5`)}
                  <span>Add Row</span>
                </button>
              </div>

              ${i.map((e,t)=>`
                <div class="p-3 bg-[#0B0B0B] border border-neutral-800/80 rounded space-y-2.5">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[11px] font-mono text-neutral-500 uppercase">
                      Topic #${t+1}
                    </span>
                    ${i.length>1?`
                      <button
                        type="button"
                        data-remove-row="${t}"
                        class="modal-night-remove-row text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer"
                        title="Remove row"
                      >
                        ${J(`trash2`,`w-3.5 h-3.5`)}
                      </button>
                    `:``}
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      data-draft-name="${t}"
                      value="${e.name}"
                      placeholder="Topic / Question name"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                    <input
                      type="text"
                      data-draft-pyq="${t}"
                      value="${e.pyqRef}"
                      placeholder="PYQ reference e.g., 2023 Dec 7-mark"
                      class="w-full bg-[#151515] border border-neutral-800 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] font-mono text-neutral-500 uppercase mr-1">
                        Priority:
                      </span>
                      ${[`High`,`Medium`,`Low`].map(n=>`
                        <button
                          type="button"
                          data-row-prio="${t}"
                          data-val="${n}"
                          class="modal-draft-prio-btn text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${e.priority===n?`bg-white text-black font-semibold border-white`:`bg-[#151515] text-neutral-400 border-neutral-800`}"
                        >
                          ${n}
                        </button>
                      `).join(``)}
                    </div>

                    <select
                      data-row-task="${t}"
                      class="modal-draft-task-select bg-[#151515] border border-neutral-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-neutral-500 font-mono"
                    >
                      <option value="Prepare Notes" ${e.taskType===`Prepare Notes`?`selected`:``}>Prepare Notes</option>
                      <option value="Learn" ${e.taskType===`Learn`?`selected`:``}>Learn</option>
                      <option value="Practise Questions" ${e.taskType===`Practise Questions`?`selected`:``}>Practise Questions</option>
                      <option value="Revise" ${e.taskType===`Revise`?`selected`:``}>Revise</option>
                      <option value="Mock Test" ${e.taskType===`Mock Test`?`selected`:``}>Mock Test</option>
                    </select>
                  </div>
                </div>
              `).join(``)}
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-neutral-800">
              <button
                type="button"
                id="modal-night-add-row-bottom"
                class="text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
              >
                + Add another question
              </button>
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  id="modal-night-cancel-btn"
                  class="px-4 py-2 text-xs uppercase font-mono tracking-wider text-neutral-400 hover:text-white bg-transparent border border-neutral-800 rounded hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="modal-night-commit-btn"
                  class="flex items-center gap-2 px-5 py-2 text-xs uppercase font-mono tracking-wider font-semibold text-black bg-white hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                >
                  <span>Commit to Tomorrow's Plan</span>
                  ${J(`arrowRight`,`w-3.5 h-3.5`)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;let a=()=>{e.innerHTML=``};e.querySelector(`#modal-night-close`)?.addEventListener(`click`,a),e.querySelector(`#modal-night-cancel-btn`)?.addEventListener(`click`,a),e.querySelector(`#modal-night-subject`)?.addEventListener(`change`,e=>{r=e.target.value}),e.querySelectorAll(`input[data-draft-name]`).forEach(e=>{e.addEventListener(`input`,t=>{let n=Number(e.getAttribute(`data-draft-name`));i[n].name=t.target.value})}),e.querySelectorAll(`input[data-draft-pyq]`).forEach(e=>{e.addEventListener(`input`,t=>{let n=Number(e.getAttribute(`data-draft-pyq`));i[n].pyqRef=t.target.value})}),e.querySelectorAll(`.modal-draft-prio-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.getAttribute(`data-row-prio`));i[t].priority=e.getAttribute(`data-val`),o()})}),e.querySelectorAll(`.modal-draft-task-select`).forEach(e=>{e.addEventListener(`change`,t=>{let n=Number(e.getAttribute(`data-row-task`));i[n].taskType=t.target.value})});let s=()=>{i.push({name:``,pyqRef:``,priority:`High`,taskType:`Prepare Notes`}),o()};e.querySelector(`#modal-night-add-row`)?.addEventListener(`click`,s),e.querySelector(`#modal-night-add-row-bottom`)?.addEventListener(`click`,s),e.querySelectorAll(`.modal-night-remove-row`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.getAttribute(`data-remove-row`));i=i.filter((e,n)=>n!==t),o()})}),e.querySelector(`#modal-night-commit-btn`)?.addEventListener(`click`,()=>{let e=i.filter(e=>e.name.trim().length>0);e.length===0?a():(e.forEach(e=>{t.addTheoryTopic({name:e.name.trim(),subject:r,pyqReference:e.pyqRef.trim()||void 0,priority:e.priority,taskType:e.taskType,targetDate:n,status:`Not Started`,estimatedDuration:`45m`})}),a(),t.setActiveTab(`theory`))})};o()}var ko=document.getElementById(`root`);if(!ko)throw Error(`Root element #root not found in document.`);ko.innerHTML=`
  <div class="min-h-screen bg-[#0B0B0B] text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
    <div id="navbar-container"></div>
    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 w-full"></main>
    <div id="modal-container"></div>
    <div id="confirm-modal-container"></div>
  </div>
`;var Ao=document.getElementById(`navbar-container`),jo=document.getElementById(`main-content`),Mo=document.getElementById(`modal-container`),No=document.getElementById(`confirm-modal-container`),$={setActiveTab:e=>q.setActiveTab(e),setSelectedDate:e=>q.setSelectedDate(e),setToggles:e=>q.setToggles(e),setExamDates:e=>q.setExamDates(e),updateLabExam:(e,t,n)=>q.updateLabExam(e,t,n),markLabExamCompleted:(e,t)=>q.markLabExamCompleted(e,t),toggleScheduleItem:(e,t)=>q.toggleScheduleItem(e,t),resetDaySchedule:e=>q.resetDaySchedule(e),addTheoryTopic:e=>q.addTheoryTopic(e),updateTheoryTopic:(e,t)=>q.updateTheoryTopic(e,t),deleteTheoryTopic:e=>q.deleteTheoryTopic(e),reorderTheoryTopics:e=>q.reorderTheoryTopics(e),carryUnfinishedTheoryTopics:(e,t)=>q.carryUnfinishedTheoryTopics(e,t),addLabTopic:e=>q.addLabTopic(e),updateLabTopic:(e,t)=>q.updateLabTopic(e,t),deleteLabTopic:e=>q.deleteLabTopic(e),reorderLabTopics:e=>q.reorderLabTopics(e),syncWithSheets:()=>q.syncWithSheets(),signInWithGoogle:()=>q.signInWithGoogle(),signOutUser:()=>q.signOutUser(),setCustomSpreadsheetId:e=>q.setCustomSpreadsheetId(e),showConfirmDialog:e=>q.showConfirmDialog(e),closeConfirmDialog:()=>q.closeConfirmDialog(),openAddTheoryModal:(e=null,t=null)=>{Eo(Mo,e,t,$)},openAddLabModal:(e=null,t=void 0)=>{Do(Mo,e,t,$)},openNightPYQModal:()=>{Oo(Mo,$)}};function Po(){let e=q.getState();mo(Ao,e,e=>q.setActiveTab(e),()=>q.syncWithSheets()),e.activeTab===`dashboard`?ho(jo,e,$):e.activeTab===`theory`?_o(jo,e,$):e.activeTab===`lab`?Z(jo,e,$):e.activeTab===`settings`&&bo(jo,e,$),To(No,e,$)}Po(),q.subscribe(()=>{Po()});