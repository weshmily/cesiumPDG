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
define(["./when-60b00257","./Check-4274a1fd","./Math-9d37f659","./Cartesian2-2951f601","./Transforms-53ff6d12","./RuntimeError-027c380a","./WebGLConstants-779bf0bc","./ComponentDatatype-a29c6075","./GeometryAttribute-2f728681","./GeometryAttributes-130e4d69","./Plane-df4a621e","./VertexFormat-6af5bab1","./FrustumGeometry-75a8b87a"],function(c,e,t,p,h,r,n,d,g,_,a,u,k){"use strict";var m=0,o=1;function f(e){var t,r,n=e.frustum,a=e.orientation,u=e.origin,i=c.defaultValue(e._drawNearPlane,!0);n instanceof k.PerspectiveFrustum?(t=m,r=k.PerspectiveFrustum.packedLength):n instanceof k.OrthographicFrustum&&(t=o,r=k.OrthographicFrustum.packedLength),this._frustumType=t,this._frustum=n.clone(),this._origin=p.Cartesian3.clone(u),this._orientation=h.Quaternion.clone(a),this._drawNearPlane=i,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+r+p.Cartesian3.packedLength+h.Quaternion.packedLength}f.pack=function(e,t,r){r=c.defaultValue(r,0);var n=e._frustumType,a=e._frustum;return(t[r++]=n)===m?(k.PerspectiveFrustum.pack(a,t,r),r+=k.PerspectiveFrustum.packedLength):(k.OrthographicFrustum.pack(a,t,r),r+=k.OrthographicFrustum.packedLength),p.Cartesian3.pack(e._origin,t,r),r+=p.Cartesian3.packedLength,h.Quaternion.pack(e._orientation,t,r),t[r+=h.Quaternion.packedLength]=e._drawNearPlane?1:0,t};var l=new k.PerspectiveFrustum,y=new k.OrthographicFrustum,v=new h.Quaternion,F=new p.Cartesian3;return f.unpack=function(e,t,r){t=c.defaultValue(t,0);var n,a=e[t++];a===m?(n=k.PerspectiveFrustum.unpack(e,t,l),t+=k.PerspectiveFrustum.packedLength):(n=k.OrthographicFrustum.unpack(e,t,y),t+=k.OrthographicFrustum.packedLength);var u=p.Cartesian3.unpack(e,t,F);t+=p.Cartesian3.packedLength;var i=h.Quaternion.unpack(e,t,v),o=1===e[t+=h.Quaternion.packedLength];if(!c.defined(r))return new f({frustum:n,origin:u,orientation:i,_drawNearPlane:o});var s=a===r._frustumType?r._frustum:void 0;return r._frustum=n.clone(s),r._frustumType=a,r._origin=p.Cartesian3.clone(u,r._origin),r._orientation=h.Quaternion.clone(i,r._orientation),r._drawNearPlane=o,r},f.createGeometry=function(e){var t=e._frustumType,r=e._frustum,n=e._origin,a=e._orientation,u=e._drawNearPlane,i=new Float64Array(24);k.FrustumGeometry._computeNearFarPlanes(n,a,t,r,i);for(var o,s,c=new _.GeometryAttributes({position:new g.GeometryAttribute({componentDatatype:d.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:i})}),p=u?2:1,m=new Uint16Array(8*(1+p)),f=u?0:1;f<2;++f)s=4*f,m[o=u?8*f:0]=s,m[o+1]=s+1,m[o+2]=s+1,m[o+3]=s+2,m[o+4]=s+2,m[o+5]=s+3,m[o+6]=s+3,m[o+7]=s;for(f=0;f<2;++f)s=4*f,m[o=8*(p+f)]=s,m[o+1]=s+4,m[o+2]=s+1,m[o+3]=s+5,m[o+4]=s+2,m[o+5]=s+6,m[o+6]=s+3,m[o+7]=s+7;return new g.Geometry({attributes:c,indices:m,primitiveType:g.PrimitiveType.LINES,boundingSphere:h.BoundingSphere.fromVertices(i)})},function(e,t){return c.defined(t)&&(e=f.unpack(e,t)),f.createGeometry(e)}});
