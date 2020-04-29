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
define(["./when-60b00257","./Check-4274a1fd","./Math-9d37f659","./Cartesian2-2951f601","./AttributeCompression-a0720a96","./createTaskProcessorWorker"],function(a,e,v,y,A,r){"use strict";var M=32767,R=new y.Cartographic,x=new y.Cartesian3,D=new y.Rectangle,E=new y.Ellipsoid,F={min:void 0,max:void 0};return r(function(a,e){var r=new Uint16Array(a.positions);!function(a){a=new Float64Array(a);var e=0;F.min=a[e++],F.max=a[e++],y.Rectangle.unpack(a,e,D),e+=y.Rectangle.packedLength,y.Ellipsoid.unpack(a,e,E)}(a.packedBuffer);var t=D,n=E,i=F.min,s=F.max,o=r.length/3,u=r.subarray(0,o),c=r.subarray(o,2*o),p=r.subarray(2*o,3*o);A.AttributeCompression.zigZagDeltaDecode(u,c,p);for(var f=new Float64Array(r.length),h=0;h<o;++h){var l=u[h],m=c[h],C=p[h],d=v.CesiumMath.lerp(t.west,t.east,l/M),g=v.CesiumMath.lerp(t.south,t.north,m/M),w=v.CesiumMath.lerp(i,s,C/M),b=y.Cartographic.fromRadians(d,g,w,R),k=n.cartographicToCartesian(b,x);y.Cartesian3.pack(k,f,3*h)}return e.push(f.buffer),{positions:f.buffer}})});
