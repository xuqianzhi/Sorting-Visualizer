(this.webpackJsonpsorting_visualizer=this.webpackJsonpsorting_visualizer||[]).push([[0],{13:function(t,n,e){},14:function(t,n,e){},15:function(t,n,e){},17:function(t,n,e){"use strict";e.r(n);var a=e(1),i=e.n(a),s=e(3),o=e.n(s),r=(e(13),e.p,e(14),e(4)),u=e(5),l=e(6),c=e(8),h=e(7);e(15);function d(t,n,e,a){if(!(n+1>=e)){var i=Math.floor((n+e)/2);d(t,n,i,a),d(t,i,e,a);for(var s=n,o=i,r=n,u=t.slice();s<i||o<e;){if(s===i){for(;r<e;)a.push([r,t[o],o]),u[r]=t[o],r+=1,o+=1;break}if(o===e){for(;r<e;)a.push([r,t[s],s]),u[r]=t[s],r+=1,s+=1;break}var l=t[s],c=t[o];u[r],l<c?(a.push([r,l,o]),u[r]=l,s+=1):(a.push([r,c,s]),u[r]=c,o+=1),r+=1}for(var h=n;h<e;h++)t[h]=u[h]}}function b(t,n,e,a){if(!(n+1>=e)){for(var i,s,o=(i=n,s=e-1,Math.floor(Math.random()*(s-i+1)+i)),r=t[o],u=[],l=[],c=n;c<e;c++)if(c!=o){var h=t[c];h<=r?u.push(h):l.push(h)}var d=u.length+n;u.push(r);for(var p=u.concat(l),g=n;g<e;g++)t[g]=p[g-n],a.push([g,t[g],d]);b(t,n,d,a),b(t,d+1,e,a)}}function p(){this.data=[]}function g(t,n){return Math.floor(Math.random()*(n-t+1)+t)}p.prototype.insert=function(t){this.data.push(t),this.bubbleUp(this.data.length-1)},p.prototype.bubbleUp=function(t){for(;t>0;){var n=Math.floor((t+1)/2)-1;if(this.data[n]>this.data[t]){var e=this.data[n];this.data[n]=this.data[t],this.data[t]=e}t=n}},p.prototype.extractMin=function(){var t=this.data[0];return this.data[0]=this.data.pop(),this.bubbleDown(0),t},p.prototype.bubbleDown=function(t){for(;;){var n=2*(t+1),e=n-1,a=null;if(this.data[t]>this.data[n]&&(a=n),this.data[t]>this.data[e]&&(null==this.data[n]||null!==this.data[n]&&this.data[e]<this.data[n])&&(a=e),null==a)break;var i=this.data[a];this.data[a]=this.data[t],this.data[t]=i,t=a}p.prototype.clear=function(){this.data=[]}};var f=e(0),m="rgb(187, 145, 248)",y="darkorange",v="mediumaquamarine",_=Object.freeze({running:"running",pausing:"pausing",not_running:"not_running"}),k=function(t){Object(c.a)(e,t);var n=Object(h.a)(e);function e(t){var a;return Object(u.a)(this,e),(a=n.call(this,t)).state={bars:[],bar_num:100,running_status:_.not_running,animation_speed:2,timeoutIDs:[],bar_change_animation:[],animation_begin_at:0},a}return Object(l.a)(e,[{key:"componentDidMount",value:function(){this.resetBars()}},{key:"resetBars",value:function(){for(var t=[],n=document.getElementsByClassName("bar"),e=0;e<this.state.bar_num;e++)t.push(g(5,300)),n[e]&&(n[e].style.backgroundColor=m);this.setState({bars:t})}},{key:"displayAnimation",value:function(t,n){for(var e=this,a=document.getElementsByClassName("bar"),i=1/Math.pow(2,this.state.animation_speed),s=[],o=function(o){var r=t[o][0],u=t[o][1],l=null;3==t[o].length&&(l=t[o][2]);var c=setTimeout((function(){if(e.setState({running_status:_.running}),0!=o){var n=t[o-1][0];if(a[n].style.backgroundColor=m,3==t[o-1].length){var i=t[o-1][2];a[i].style.backgroundColor=m}}var s=e.state.bars;s[r]=u,e.setState({bars:s}),l&&(a[l].style.backgroundColor=y),a[r].style.backgroundColor="rgb(252, 242, 81)",e.setState({animation_begin_at:o})}),50*i*(o-n));s.push(c)},u=n;u<t.length;u++)o(u);var l=setTimeout((function(){e.setState({animation_begin_at:0,bar_change_animation:[]}),document.getElementById("pause-button").style.display="none";for(var t=0;t<e.state.bar_num;t++)a[t].style.backgroundColor=v}),50*i*(t.length-n)),c=setTimeout((function(){e.setState({running_status:_.not_running})}),50*i*(t.length-n)+1e3),h=setTimeout((function(){e.resetBars()}),50*i*(t.length-n)+1500);s.push(l),s.push(c),s.push(h),this.setState(Object(r.a)({timeoutIDs:s},"timeoutIDs",s))}},{key:"sortAndDisplay",value:function(t){var n=this.state.bars.slice(),e=[];if("merge"===t)d(n,0,n.length,e);else if("quick"===t)b(n,0,n.length,e);else if("insertion"===t)!function(t,n){for(var e=1;e<t.length;e++){for(var a=t[e],i=e-1,s=[];i>=0&&a<t[i];)t[i+1]=t[i],s.push([i+1,t[i]]),s.push([i,a]),i-=1;for(var o=0;o<s.length;o++){var r=s[o];r.push([i+1]),n.push(r)}t[i+1]=a,n.push([i+1,t[i+1],i+1])}}(n,e);else if("bubble"===t)!function(t,n){if(!(t.length<=1))for(;;){for(var e=!1,a=0;a<t.length-1;a++){var i=t[a],s=t[a+1];i>s&&(t[a]=s,t[a+1]=i,e=!0,n.push([a,s]),n.push([a+1,i]))}if(!e)break}}(n,e);else{if("heap"!==t)return;!function(t,n){for(var e=new p,a=0;a<t.length;a++)n.push([a,t[a]]),e.insert(t[a]);for(var i=0;i<t.length;i++){var s=e.extractMin();t[i]=s,n.push([i,s])}}(n,e)}this.displayAnimation(e,0),this.setState({bar_change_animation:e})}},{key:"barNumSliderChanged",value:function(t){for(var n=parseInt(t.target.value),e=[],a=document.getElementsByClassName("bar"),i=0;i<n;i++)e.push(g(5,300)),a[i]&&(a[i].style.backgroundColor=m);this.setState({bar_num:n,bars:e})}},{key:"speedSliderChanged",value:function(t){var n=parseInt(t.target.value);this.setState({animation_speed:n})}},{key:"clearOngoingAnimation",value:function(){var t=this.state.timeoutIDs;if(0!=t.length)for(var n=0;n<t.length;n++){var e=t[n];clearTimeout(e)}}},{key:"pauseAnimation",value:function(){this.clearOngoingAnimation(),this.setState({running_status:_.pausing,timeoutIDs:[]})}},{key:"continueAnimation",value:function(){this.displayAnimation(this.state.bar_change_animation,this.state.animation_begin_at)}},{key:"stopAndResetAnimation",value:function(){this.clearOngoingAnimation(),this.setState({timeoutIDs:[],bar_change_animation:[],animation_begin_at:0,running_status:_.not_running}),this.resetBars()}},{key:"render",value:function(){var t=this,n=this.state.bars.slice(),e=this.state.bar_num,a=this.state.running_status,i=Math.pow(2,this.state.animation_speed);return Object(f.jsxs)("div",{children:[Object(f.jsxs)("div",{className:"button-container",children:[Object(f.jsx)("button",{className:"button",onClick:function(){return t.sortAndDisplay("merge")},style:"not_running"==a?{display:"inline-block",left:"".concat(7,"%")}:{display:"none"},children:"Merge Sort"}),Object(f.jsx)("button",{className:"button",onClick:function(){return t.sortAndDisplay("quick")},style:"not_running"==a?{display:"inline-block",left:"".concat(22,"%")}:{display:"none"},children:"Quick Sort"}),Object(f.jsx)("button",{className:"button",onClick:function(){return t.sortAndDisplay("insertion")},style:"not_running"==a?{display:"inline-block",left:"".concat(37,"%")}:{display:"none"},children:"Insertion Sort"}),Object(f.jsx)("button",{className:"button",onClick:function(){return t.sortAndDisplay("bubble")},style:"not_running"==a?{display:"inline-block",left:"".concat(52,"%")}:{display:"none"},children:"Bubble Sort"}),Object(f.jsx)("button",{className:"button",onClick:function(){return t.sortAndDisplay("heap")},style:"not_running"==a?{display:"inline-block",left:"".concat(67,"%")}:{display:"none"},children:"Heap Sort"}),Object(f.jsxs)("div",{className:"side-container",style:"not_running"==a?{display:"inline-block"}:{display:"none"},children:[Object(f.jsxs)("label",{style:{position:"absolute",top:"0%",right:"10px",fontSize:"21px",color:"white",fontWeight:"bold"},children:[" Animation Speed: ",i,"X "]}),Object(f.jsx)("input",{type:"range",min:0,max:4,value:this.state.animation_speed,id:"speedSlider",className:"speed-slider",style:"not_running"==a?{display:"inline-block"}:{display:"none"},onChange:function(n){return t.speedSliderChanged(n)}})]}),Object(f.jsx)("button",{className:"button",id:"pause-button",onClick:function(){return t.pauseAnimation()},style:"running"==a?{display:"inline-block",left:"38%",backgroundColor:y}:{display:"none"},children:" Pause "}),Object(f.jsx)("button",{className:"button",onClick:function(){return t.continueAnimation()},style:"pausing"==a?{display:"inline-block",left:"38%",backgroundColor:v}:{display:"none"},children:" Continue "}),Object(f.jsx)("button",{className:"button",onClick:function(){return t.stopAndResetAnimation()},style:"not_running"==a?{display:"none"}:{display:"inline-block",left:"53%",backgroundColor:"crimson"},children:" Stop and Reset "})]}),Object(f.jsxs)("div",{className:"bar-container",children:[n.map((function(t,n){return Object(f.jsx)("div",{className:"bar",style:{height:"".concat(t,"px"),left:"".concat(n/(e+2)*1e3+(1e3/(e+2)-2),"px"),backgroundColor:m,width:"".concat(1e3/(e+2)-2,"px")}},n)})),Object(f.jsx)("input",{type:"range",min:8,max:200,value:this.state.bar_num,id:"barNumSlider",className:"barnum-slider",style:"not_running"==a?{display:"inline-block"}:{display:"none"},onChange:function(n){return t.barNumSliderChanged(n)}})]})]})}}]),e}(a.Component);var j=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsx)(k,{})})},C=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,18)).then((function(n){var e=n.getCLS,a=n.getFID,i=n.getFCP,s=n.getLCP,o=n.getTTFB;e(t),a(t),i(t),s(t),o(t)}))};o.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(j,{})}),document.getElementById("root")),C()}},[[17,1,2]]]);
//# sourceMappingURL=main.730c232a.chunk.js.map