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
define(["exports","./Check-4274a1fd","./Cartesian2-2951f601","./Transforms-53ff6d12","./OrientedBoundingBox-23288f54"],function(n,t,l,x,B){"use strict";var e={},s=new l.Cartesian3,P=new l.Cartesian3,M=new l.Cartesian3,h=new l.Cartesian3,v=new B.OrientedBoundingBox;function o(n,t,e,r,a){var i=l.Cartesian3.subtract(n,t,s),o=l.Cartesian3.dot(e,i),u=l.Cartesian3.dot(r,i);return l.Cartesian2.fromElements(o,u,a)}e.validOutline=function(n){var t=B.OrientedBoundingBox.fromPoints(n,v).halfAxes,e=x.Matrix3.getColumn(t,0,P),r=x.Matrix3.getColumn(t,1,M),a=x.Matrix3.getColumn(t,2,h),i=l.Cartesian3.magnitude(e),o=l.Cartesian3.magnitude(r),u=l.Cartesian3.magnitude(a);return!(0===i&&(0===o||0===u)||0===o&&0===u)},e.computeProjectTo2DArguments=function(n,t,e,r){var a,i,o=B.OrientedBoundingBox.fromPoints(n,v),u=o.halfAxes,s=x.Matrix3.getColumn(u,0,P),C=x.Matrix3.getColumn(u,1,M),m=x.Matrix3.getColumn(u,2,h),c=l.Cartesian3.magnitude(s),f=l.Cartesian3.magnitude(C),d=l.Cartesian3.magnitude(m),g=Math.min(c,f,d);return(0!==c||0!==f&&0!==d)&&(0!==f||0!==d)&&(g!==f&&g!==d||(a=s),g===c?a=C:g===d&&(i=C),g!==c&&g!==f||(i=m),l.Cartesian3.normalize(a,e),l.Cartesian3.normalize(i,r),l.Cartesian3.clone(o.center,t),!0)},e.createProjectPointsTo2DFunction=function(r,a,i){return function(n){for(var t=new Array(n.length),e=0;e<n.length;e++)t[e]=o(n[e],r,a,i);return t}},e.createProjectPointTo2DFunction=function(e,r,a){return function(n,t){return o(n,e,r,a,t)}},n.CoplanarPolygonGeometryLibrary=e});
