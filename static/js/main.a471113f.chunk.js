(this.webpackJsonpsnail=this.webpackJsonpsnail||[]).push([[0],{14:function(t,e,r){},16:function(t,e,r){},17:function(t,e,r){"use strict";r.r(e);var n=r(1),o=r.n(n),c=r(6),a=r.n(c),i=(r(14),r(3)),l=r(8),u=r(7),f=(r(2),r(0)),s=r.n(f);function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(r,!0).forEach((function(e){Object(i.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var m=function(t,e){switch(e){case"N":return p({},t,{row:t.row-1});case"NE":return{col:t.col+1,row:t.row-1};case"E":return p({},t,{col:t.col+1});case"SE":return{col:t.col+1,row:t.row+1};case"S":return p({},t,{row:t.row+1});case"SW":return{col:t.col-1,row:t.row+1};case"W":return p({},t,{col:t.col-1});case"NW":return{col:t.col-1,row:t.row-1};default:return t}},b=function(t,e){return{col:Math.min(t.col,e.col),row:Math.min(t.row,e.row)}},h=function(t,e){return{col:Math.max(t.col,e.col),row:Math.max(t.row,e.row)}},g=function(t){return"".concat(t.col,",").concat(t.row)},v=function(t){var e=t.split(",");return{col:parseInt(e[0],10),row:parseInt(e[1],10)}},O=function(t,e){for(var r=b(t,e),n=h(t,e),o=[],c=r.col;c<=n.col;)o.push({col:c,row:r.row}),c+=1;return Object(f.keyBy)(o,g)},d=function(t,e){var r=b(t,e),n=h(t,e),o={},c=function(t,e){for(var r=b(t,e),n=h(t,e),o=[],c=r.row;c<=n.row;)o.push({col:r.col,row:c}),c+=1;return Object(f.keyBy)(o,g)}(r,n);return Object(f.each)(c,(function(t){return o=p({},o,{},O(t,n))})),Object(f.keyBy)(o,g)},y=60,j=40,S=20*j,E=20*y,k=function(t){var e=v(t);return!(e.col<0)&&(!(e.col>=y)&&(!(e.row<0)&&!(e.row>=j)))},P=function(t){var e=t.current.getContext("2d");return e.font="".concat(20,"px serif"),e.textBaseline="top",e},M=function(t,e,r,n){Object.keys(function(t,e){var r={col:t.col-e,row:t.row-e},n={col:t.col+e,row:t.row+e};return d(r,n)}(e.loc,8)).forEach((function(r){var o=n[r];if(o&&o.open){var c=-1*(function(t,e){var r=v(t),n=v(e),o=Math.pow(n.col-r.col,2),c=Math.pow(n.row-r.row,2);return Math.floor(Math.sqrt(o+c))}(g(e.loc),r)-8)/7;t.fillStyle="rgb(230,180,59,".concat(c,")"),t.fillRect(20*o.col,20*o.row,20,20)}}))},x=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=function(t){return t.open=!0},o=["N","E","S","W"],c=r?s.a.sample(t):"".concat(Math.ceil(y/2),",").concat(Math.ceil(j/2));n(e[c]);var a=function(){var t=g(m(e[c],s.a.sample(o)));k(t)&&(e[t].open||(n(e[t]),c=t))};s.a.times(2500,a)},D=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=function(t){return t.open=!0},o=["N","E","S","W"],c=r?s.a.sample(t):"".concat(Math.ceil(y/2),",").concat(Math.ceil(j/2));n(e[c]);var a=function(){var t=g(m(e[c],s.a.sample(o)));k(t)&&(n(e[t]),c=t)};s.a.times(1500,a)};r(16);function N(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var A=d({col:0,row:0,open:!1},{col:y,row:j}),L=Object.keys(A);D(L,A);var W,R={loc:s.a.find(A,(function(t){return t.open}))},B=function(t){t.clearRect(0,0,E,S),function(t,e,r,n,o){e.forEach((function(e){var n=r[e];t.fillStyle=n.open?"rgb(10,10,10)":"rgb(100,100,100)",t.fillRect(20*n.col,20*n.row,20,20),o&&(t.fillStyle="rgb(255,255,255, .5)",t.font="8px serif",t.fillText(e,20*n.col,20*n.row))}))}(t,L,A),M(t,R,0,A),function(t,e){t.fillStyle="rgb(50,50,50,1)",t.fillText("@",20*e.loc.col,20*e.loc.row,20)}(t,R)};a.a.render(o.a.createElement((function(){var t=Object(n.useRef)(null),e=Object(n.useState)({algorithm:"dw2",iterations:1,startingLocation:"30,20",randomStartingLocation:!1}),r=Object(l.a)(e,2),c=r[0],a=r[1],f=function(t,e){var r=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?N(r,!0).forEach((function(e){Object(i.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):N(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},c);r[t]=e,a(r)};Object(n.useEffect)((function(){W=P(t),B(W)}));var w=function(t){var e=m(R.loc,t),r=g(e);k(r)&&A[r].open&&(R.loc=e,B(W))};return Object(u.a)("keydown",(function(t){var e=t.key;["ArrowUp","8","w"].includes(String(e))&&w("N"),["ArrowRight","6","d"].includes(String(e))&&w("E"),["ArrowDown","2","s"].includes(String(e))&&w("S"),["ArrowLeft","4","a"].includes(String(e))&&w("W")})),o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"settings"},"SETTINGS:",o.a.createElement("label",{htmlFor:"Algorithm"},"Algorithm:"),o.a.createElement("select",{name:"Algorithm",value:c.algorithm,onChange:function(t){f("algorithm",t.target.value)}},o.a.createElement("option",{value:"dw"},"Drunkards Walk"),o.a.createElement("option",{value:"dw2"},"Drunkards Walk 2")),o.a.createElement("label",{htmlFor:"iterations"},"Iterations:"),o.a.createElement("input",{name:"iterations",type:"number",min:"1",max:"1000",value:c.iterations,onChange:function(t){f("iterations",t.target.value)}}),o.a.createElement("label",{htmlFor:"randomStart"},"Random Starting Location"),o.a.createElement("input",{type:"checkbox",name:"randomStart",checked:c.randomStartingLocation,onChange:function(t){f("randomStartingLocation","on"===c.randomStartingLocation?"":"on")}}),o.a.createElement("button",{onClick:function(){A=d({col:0,row:0,open:!1},{col:y,row:j});var t={dw:x,dw2:D};s.a.times(c.iterations,(function(){return t[c.algorithm](L,A,"on"===c.randomStartingLocation)})),R={loc:s.a.find(A,(function(t){return t.open}))},B(W)}},"Rebuild Map")),o.a.createElement("canvas",{width:E,height:S,className:"canvas",ref:t}))}),null),document.getElementById("root"))},9:function(t,e,r){t.exports=r(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.a471113f.chunk.js.map