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
define(["exports","./when-60b00257","./Check-4274a1fd","./Math-9d37f659","./Cartesian2-2951f601","./Transforms-53ff6d12","./GeometryAttribute-2f728681"],function(t,m,n,O,b,a,G){"use strict";var p=Math.cos,v=Math.sin,x=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,g=t.nwCorner,h=t.boundingRectangle,u=g.latitude-t.granYCos*r+e*t.granXSin,C=p(u),c=v(u),l=i.z*c,S=g.longitude+r*t.granYSin+e*t.granXCos,d=C*p(S),w=C*v(S),M=i.x*d,f=i.y*w,X=x(M*d+f*w+l*c);if(o.x=M/X,o.y=f/X,o.z=l/X,a){var Y=t.stNwCorner;m.defined(Y)?(u=Y.latitude-t.stGranYCos*r+e*t.stGranXSin,S=Y.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(S-t.stWest)*t.lonScalar,s.y=(u-t.stSouth)*t.latScalar):(s.x=(S-h.west)*t.lonScalar,s.y=(u-h.south)*t.latScalar)}}},R=new G.Matrix2,y=new b.Cartesian3,P=new b.Cartographic,W=new b.Cartesian3,_=new a.GeographicProjection;function T(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,h=a*i,u=Math.sin(n),C=r*u,c=a*u;y=_.project(t,y),y=b.Cartesian3.subtract(y,W,y);var l=G.Matrix2.fromRotation(n,R);y=G.Matrix2.multiplyByVector(l,y,y),y=b.Cartesian3.add(y,W,y),--o,--s;var S=(t=_.unproject(y,t)).latitude,d=S+o*c,w=S-g*s,M=S-g*s+o*c,f=Math.max(S,d,w,M),X=Math.min(S,d,w,M),Y=t.longitude,m=Y+o*h,p=Y+s*C,v=Y+s*C+o*h;return{north:f,south:X,east:Math.max(Y,m,p,v),west:Math.min(Y,m,p,v),granYCos:g,granYSin:C,granXCos:h,granXSin:c,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i,g,h,u,C,c=t.east,l=t.west,S=t.north,d=t.south,w=!1,M=!1;S===O.CesiumMath.PI_OVER_TWO&&(w=!0),d===-O.CesiumMath.PI_OVER_TWO&&(M=!0);var f=S-d;h=(C=c<l?O.CesiumMath.TWO_PI-l+c:c-l)/((i=Math.ceil(C/n)+1)-1),u=f/((g=Math.ceil(f/n)+1)-1);var X=b.Rectangle.northwest(t,o),Y=b.Rectangle.center(t,P);0===a&&0===r||(Y.longitude<X.longitude&&(Y.longitude+=O.CesiumMath.TWO_PI),W=_.project(Y,W));var m=u,p=h,v=b.Rectangle.clone(t,e),G={granYCos:m,granYSin:0,granXCos:p,granXSin:0,nwCorner:X,boundingRectangle:v,width:i,height:g,northCap:w,southCap:M};if(0!==a){var x=T(X,a,h,u,0,i,g);S=x.north,d=x.south,c=x.east,l=x.west,G.granYCos=x.granYCos,G.granYSin=x.granYSin,G.granXCos=x.granXCos,G.granXSin=x.granXSin,v.north=S,v.south=d,v.east=c,v.west=l}if(0!==r){a-=r;var R=b.Rectangle.northwest(v,s),y=T(R,a,h,u,0,i,g);G.stGranYCos=y.granYCos,G.stGranXCos=y.granXCos,G.stGranYSin=y.granYSin,G.stGranXSin=y.granXSin,G.stNwCorner=R,G.stWest=y.west,G.stSouth=y.south}return G},t.RectangleGeometryLibrary=r});
