/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-60b00257","./Check-4274a1fd","./Math-9d37f659"],function(e,h,t,r){"use strict";var l=r.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,t,r){if(h.defined(e)){r=h.defaultValue(r,!1);var n,f,i,a=e.length;if(a<2)return e;for(n=1;n<a&&!t(f=e[n-1],i=e[n],l);++n);if(n===a)return r&&t(e[0],e[e.length-1],l)?e.slice(1):e;for(var u=e.slice(0,n);n<a;++n)t(f,i=e[n],l)||(u.push(i),f=i);return r&&1<u.length&&t(u[0],u[u.length-1],l)&&u.shift(),u}}});
