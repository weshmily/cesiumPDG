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
define(["./when-60b00257","./Check-4274a1fd","./Math-9d37f659","./Cartesian2-2951f601","./Transforms-53ff6d12","./RuntimeError-027c380a","./WebGLConstants-779bf0bc","./ComponentDatatype-a29c6075","./GeometryAttribute-2f728681","./GeometryAttributes-130e4d69","./IndexDatatype-527cbd94","./GeometryOffsetAttribute-8756c94a","./VertexFormat-6af5bab1","./EllipsoidGeometry-a1c1e12f"],function(a,e,t,o,r,i,n,s,c,d,l,m,u,p){"use strict";function f(e){var t=a.defaultValue(e.radius,1),r={radii:new o.Cartesian3(t,t,t),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new p.EllipsoidGeometry(r),this._workerName="createSphereGeometry"}f.packedLength=p.EllipsoidGeometry.packedLength,f.pack=function(e,t,r){return p.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};var y=new p.EllipsoidGeometry,G={radius:void 0,radii:new o.Cartesian3,vertexFormat:new u.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return f.unpack=function(e,t,r){var i=p.EllipsoidGeometry.unpack(e,t,y);return G.vertexFormat=u.VertexFormat.clone(i._vertexFormat,G.vertexFormat),G.stackPartitions=i._stackPartitions,G.slicePartitions=i._slicePartitions,a.defined(r)?(o.Cartesian3.clone(i._radii,G.radii),r._ellipsoidGeometry=new p.EllipsoidGeometry(G),r):(G.radius=i._radii.x,new f(G))},f.createGeometry=function(e){return p.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(e,t){return a.defined(t)&&(e=f.unpack(e,t)),f.createGeometry(e)}});
