(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(10),s=n.n(a),i=n(2),o=n.n(i),u=n(4),j=n(3),l={HOST:""},d=n(0),b=function(){var e=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(l.HOST,"/api/users").concat(t?"/?filters="+t:""));case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.useState)([]),t=Object(j.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(""),s=Object(j.a)(a,2),i=s[0],f=s[1];Object(c.useEffect)((function(){(function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,b();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{class:"row input-group",children:Object(d.jsx)("input",{type:"text",class:"form-control",placeholder:"Enter user's name ...",value:i,onChange:function(e){f(e.target.value),setTimeout(Object(u.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=r,t.next=3,b(e.target.value);case 3:t.t1=t.sent,(0,t.t0)(t.t1);case 5:case"end":return t.stop()}}),t)}))),300)}})}),n?Object(d.jsx)("div",{className:"row",children:n.map((function(e){return Object(d.jsxs)("div",{children:[Object(d.jsx)("a",{href:"".concat(l.HOST,"/users/").concat(e.username),children:Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(e.profile_picture_path),alt:e.profile_picture_path,width:"150",className:"m-1"})}),Object(d.jsx)("div",{children:e.full_name})]},e.user_id)}))}):Object(d.jsx)("span",{children:"Loading.."})]})},O=n(6),m=n(5),h=n.n(m),p=function(e){var t=e.user,n=Object(c.useState)("".concat(l.HOST,"/").concat(t.profile_picture_path)),r=Object(j.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(!1),b=Object(j.a)(i,2),f=b[0],O=b[1],m=Object(c.useState)(null),p=Object(j.a)(m,2),x=p[0],v=p[1],g=Object(c.useState)(!1),w=Object(j.a)(g,2),S=w[0],N=w[1],k=function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!x){e.next=7;break}return(t=new FormData).append("file",x),e.next=5,fetch("".concat(l.HOST,"/api/me/avatar"),{method:"PATCH",headers:{"X-CSRFToken":h.a.load("csrftoken")},body:t});case 5:e.sent.ok?(O(!1),N(!1)):N(!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"col-sm-4",children:[Object(d.jsx)("img",{src:a,alt:"profile_picture",width:"200"}),f?Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("input",{type:"file",accept:".gif,.jpg,.jpeg,.png",onChange:function(e){var t=Object(j.a)(e.target.files,1)[0];t&&(v(t),s(URL.createObjectURL(t)))}}),Object(d.jsx)("button",{title:"Save image",className:"btn-basic",onClick:k,children:Object(d.jsx)("i",{className:"fas fa-lg fa-save"})}),Object(d.jsx)("button",{className:"btn-basic",title:"Cancel",onClick:function(){s("".concat(l.HOST,"/").concat(t.profile_picture_path)),O(!1),N(!1)},children:Object(d.jsx)("i",{className:"fas fa-lg fa-times"})}),S&&Object(d.jsx)("div",{className:"text-danger",children:"Error saving the picture"})]}):Object(d.jsx)("button",{className:"btn-basic",onClick:function(e){e.preventDefault(),O(!0)},children:"Change profile picture"})]})},x=function(e){var t=e.statuses,n=e.addStatus,r=Object(c.useState)(!1),a=Object(j.a)(r,2),s=a[0],i=a[1],b=Object(c.useState)(t.length?t[0][0]:""),f=Object(j.a)(b,2),O=f[0],m=f[1],p=Object(c.useState)(!1),x=Object(j.a)(p,2),v=x[0],g=x[1],w=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(l.HOST,"/api/me/status"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRFToken":h.a.load("csrftoken")},body:JSON.stringify({status:O})});case 2:e.sent.ok?(n(O),i(!1),g(!1)):g(!0);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsx)("div",{children:s?Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("textarea",{className:"mr-1",rows:"1",cols:"40",value:O,onChange:function(e){return m(e.target.value)},onKeyPress:function(e){13===e.charCode&&w(e)}}),Object(d.jsx)("button",{className:"btn-basic",title:"Save interests",onClick:w,children:Object(d.jsx)("i",{className:"fas fa-lg fa-save"})}),Object(d.jsx)("button",{className:"btn-basic",title:"Cancel",onClick:function(){m(t.length?t[0][0]:""),i(!1),g(!1)},children:Object(d.jsx)("i",{className:"fas fa-lg fa-times"})}),v&&Object(d.jsx)("div",{className:"text-danger",children:"Error updating status"})]}):Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("span",{children:O}),Object(d.jsx)("button",{className:"btn-basic",title:"Edit interests",onClick:function(){i(!0)},children:Object(d.jsx)("i",{className:"fas fa-edit"})})]})})},v=function(e){var t=e.user,n=Object(c.useState)(!1),r=Object(j.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(t.interests),b=Object(j.a)(i,2),f=b[0],O=b[1],m=Object(c.useState)(!1),p=Object(j.a)(m,2),x=p[0],v=p[1],g=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(l.HOST,"/api/me/interests"),{method:"PATCH",headers:{"Content-Type":"application/json","X-CSRFToken":h.a.load("csrftoken")},body:JSON.stringify({interests:f})});case 2:e.sent.ok?(s(!1),v(!1)):v(!0);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{children:[Object(d.jsx)("h5",{children:"Interests:"}),a?Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("textarea",{className:"mr-1",rows:"1",cols:"40",value:f,onChange:function(e){return O(e.target.value)},onKeyPress:function(e){13===e.charCode&&g(e)}}),Object(d.jsx)("button",{className:"btn-basic",title:"Save interests",onClick:g,children:Object(d.jsx)("i",{className:"fas fa-lg fa-save"})}),Object(d.jsx)("button",{className:"btn-basic",title:"Cancel",onClick:function(){O(t.interests),s(!1),v(!1)},children:Object(d.jsx)("i",{className:"fas fa-lg fa-times"})}),x&&Object(d.jsx)("div",{className:"text-danger",children:"Error updating interests"})]}):Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("span",{children:f}),Object(d.jsx)("button",{className:"btn-basic",title:"Edit interests",onClick:function(){s(!0)},children:Object(d.jsx)("i",{className:"fas fa-edit"})})]})]})},g={overflowY:"scroll",height:"10rem",width:"25rem",resize:"none",border:"1px solid grey",padding:"5px"},w=function(e){var t=e.statuses;return Object(d.jsxs)("div",{className:"my-2",children:[Object(d.jsx)("h5",{children:"Status updates:"}),Object(d.jsx)("div",{style:g,children:t.map((function(e){var t=new Date(e[1]);return Object(d.jsx)("div",{children:"".concat(t.toLocaleDateString()," ").concat(t.toLocaleTimeString(),": ").concat(e[0],"\n")},e[1])}))})]})},S=function(e){var t=e.user,n=Object(c.useState)(t.friends),r=Object(j.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(t.requests),b=Object(j.a)(i,2),f=b[0],m=b[1],p=Object(c.useState)(!1),x=Object(j.a)(p,2),v=x[0],g=x[1],w=function(){var e=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Accept friend request?")){e.next=5;break}return e.next=3,fetch("".concat(l.HOST,"/api/me/friend/").concat(t),{method:"PUT",headers:{"X-CSRFToken":h.a.load("csrftoken")}});case 3:e.sent.ok?(n=f.filter((function(e){return e.user_id===t}))[0],m(f.filter((function(e){return e.user_id!==t}))),s([n].concat(Object(O.a)(a))),g(!1)):g(!0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("div",{className:"row mt-4",children:Object(d.jsx)("h4",{children:"Friends"})}),a.length?Object(d.jsx)("div",{children:a.map((function(e){return Object(d.jsxs)("div",{className:"mx-1",children:[Object(d.jsx)("a",{href:"".concat(l.HOST,"/users/").concat(e.username),children:Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(e.profile_picture_path),style:{width:"5rem"},alt:"".concat(e.full_name)})}),Object(d.jsx)("div",{style:{width:"5rem"},children:e.full_name})]},e.username)}))}):Object(d.jsx)("div",{className:"row",children:"No friends :("}),Object(d.jsx)("div",{className:"row mt-4",children:Object(d.jsx)("h4",{children:"Friend requests"})}),f.length?Object(d.jsx)("div",{children:f.map((function(e){return Object(d.jsxs)("div",{className:"mx-1",children:[Object(d.jsx)("a",{href:"".concat(l.HOST,"/users/").concat(e.username),children:Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(e.profile_picture_path),style:{width:"5rem"},alt:"".concat(e.full_name)})}),Object(d.jsx)("div",{style:{width:"5rem"},children:e.full_name}),Object(d.jsx)("button",{className:"btn btn-primary",onClick:function(){return w(e.user_id)},children:"Accept"})]},e.username)}))}):Object(d.jsx)("div",{className:"row",children:"No new friend requests"}),v&&Object(d.jsx)("div",{className:"text-danger",children:"Error accepting friend request"})]})},N=function(e){var t=e.user,n=Object(c.useState)(t.media.filter((function(e){return"photo"===e.media_type}))),r=Object(j.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(t.media.filter((function(e){return"video"===e.media_type}))),b=Object(j.a)(i,2),f=b[0],m=b[1],p=Object(c.useState)(null),x=Object(j.a)(p,2),v=x[0],g=x[1],w=Object(c.useState)(null),S=Object(j.a)(w,2),N=S[0],k=S[1],y=function(){var e=Object(u.a)(o.a.mark((function e(t){var n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("file","photo"===t?v:N),e.next=4,fetch("".concat(l.HOST,"/api/me/media/").concat(t),{method:"POST",headers:{"X-CSRFToken":h.a.load("csrftoken")},body:n});case 4:if(!(c=e.sent).ok){e.next=22;break}if("photo"!==t){e.next=15;break}return e.t0=s,e.next=10,c.json();case 10:e.t1=e.sent,e.t2=[e.t1].concat(Object(O.a)(a)),(0,e.t0)(e.t2),e.next=22;break;case 15:if("video"!==t){e.next=22;break}return e.t3=m,e.next=19,c.json();case 19:e.t4=e.sent,e.t5=[e.t4].concat(Object(O.a)(f)),(0,e.t3)(e.t5);case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(u.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Delete this file?")){e.next=5;break}return e.next=3,fetch("".concat(l.HOST,"/api/me/media/").concat(t),{method:"DELETE",headers:{"X-CSRFToken":h.a.load("csrftoken")}});case 3:e.sent.ok&&("photo"===n?s(a.filter((function(e){return e.id!==t}))):"video"===n&&m(f.filter((function(e){return e.id!==t}))));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(d.jsxs)(c.Fragment,{children:[Object(d.jsxs)("div",{className:"row mt-4",children:[Object(d.jsx)("h4",{children:"Photos"}),Object(d.jsx)("input",{type:"file",className:"mx-2",accept:".gif,.jpg,.jpeg,.png",style:{width:"12rem"},onChange:function(e){return g(e.target.files[0])}}),Object(d.jsx)("button",{title:"Upload photo",className:"btn-basic",onClick:function(){return y("photo")},children:Object(d.jsx)("i",{className:"fas fa-lg fa-upload"})})]}),Object(d.jsx)("div",{className:"row",children:a?a.map((function(e){return Object(d.jsxs)("div",{className:"mx-1",children:[Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(e.data_path),width:150,alt:"".concat(e.data_path)}),Object(d.jsx)("button",{className:"btn-basic",style:{display:"block"},onClick:function(){return T(e.id,"photo")},children:"Delete"})]},"".concat(e.id))})):Object(d.jsx)(c.Fragment,{})}),Object(d.jsxs)("div",{className:"row my-2",children:[Object(d.jsx)("h4",{children:"Videos"}),Object(d.jsx)("input",{type:"file",className:"mx-2",accept:".mp4,.mov,.wmv,.flv",style:{width:"12rem"},onChange:function(e){return k(e.target.files[0])}}),Object(d.jsx)("button",{title:"Upload video",className:"btn-basic",onClick:function(){return y("video")},children:Object(d.jsx)("i",{className:"fas fa-lg fa-upload"})})]}),Object(d.jsx)("div",{className:"row",children:f?f.map((function(e){return Object(d.jsxs)("div",{children:[Object(d.jsx)("video",{className:"m-1",controls:!0,src:"".concat(l.HOST,"/").concat(e.data_path),style:{cursor:"pointer"},width:300}),Object(d.jsx)("button",{className:"btn-basic",style:{display:"block"},onClick:function(){return T(e.id,"video")},children:"Delete"})]},"".concat(e.id))})):Object(d.jsx)(c.Fragment,{})})]})},k=function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(l.HOST,"/api/me/info"));case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(c.useState)(null),t=Object(j.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)([]),s=Object(j.a)(a,2),i=s[0],l=s[1];Object(c.useEffect)((function(){(function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k();case 2:t=e.sent,l(t.statuses.map((function(e){return[e.status,e.timestamp]}))),r(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);return Object(d.jsx)(c.Fragment,{children:n?Object(d.jsxs)(c.Fragment,{children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)(p,{user:n}),Object(d.jsxs)("div",{className:"col-sm-4 ml-2",children:[Object(d.jsx)("h3",{children:n.full_name}),Object(d.jsx)(x,{statuses:i,addStatus:function(e){l([[e,(new Date).toISOString()]].concat(Object(O.a)(i)))}}),Object(d.jsx)("hr",{}),Object(d.jsx)(v,{user:n}),Object(d.jsx)(w,{statuses:i})]})]}),Object(d.jsx)(S,{user:n}),Object(d.jsx)(N,{user:n})]}):Object(d.jsx)("span",{children:"Loading..."})})},T={overflowY:"scroll",height:"10rem",width:"25rem",resize:"none",border:"1px solid grey",padding:"5px"},_=function(e){var t=e.statuses;return Object(d.jsxs)("div",{className:"my-2",children:[Object(d.jsx)("h5",{children:"Status updates:"}),Object(d.jsx)("div",{style:T,children:t.map((function(e){var t=new Date(e[1]);return Object(d.jsx)("div",{children:"".concat(t.toLocaleDateString()," ").concat(t.toLocaleTimeString(),": ").concat(e[0],"\n")},e[1])}))})]})},C="NONE",F="SENT",H="PENDING",E="ACTIVE",D=function(e){var t=e.user,n=e.statuses,r=e.me,a=e.removeMeFromFriends,s=e.addMeToFriends,i=Object(c.useState)(!1),b=Object(j.a)(i,2),f=b[0],O=b[1],m=Object(c.useState)(null),p=Object(j.a)(m,2),x=p[0],v=p[1];Object(c.useEffect)((function(){t&&r&&(t.friends.filter((function(e){return e.user_id===r.user_id})).length?v(E):r.requests.filter((function(e){return e.user_id===t.user_id})).length?v(H):t.requests.filter((function(e){return e.user_id===r.user_id})).length?v(F):v(C))}),[t,r]);var g=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Add this user as a friend?")){e.next=5;break}return e.next=3,fetch("".concat(l.HOST,"/api/me/friend/").concat(t.user_id),{method:"PUT",headers:{"X-CSRFToken":h.a.load("csrftoken")}});case 3:e.sent.ok?(O(!1),v(F)):O(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Accept friend request?")){e.next=5;break}return e.next=3,fetch("".concat(l.HOST,"/api/me/friend/").concat(t.user_id),{method:"PUT",headers:{"X-CSRFToken":h.a.load("csrftoken")}});case 3:e.sent.ok?(O(!1),v(E),s()):O(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Remove from friends?")){e.next=5;break}return e.next=3,fetch("".concat(l.HOST,"/api/me/friend/").concat(t.user_id),{method:"DELETE",headers:{"X-CSRFToken":h.a.load("csrftoken")}});case 3:e.sent.ok?(O(!1),v(C),a()):O(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"col-sm-4",children:[Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(t.profile_picture_path),alt:"profile_picture",width:"200"}),x===C&&Object(d.jsx)("button",{className:"btn btn-sm btn-primary m-1",onClick:g,children:"Add as a friend"}),x===F&&Object(d.jsx)("button",{className:"btn btn-sm btn-success m-1",disabled:!0,children:"Friend request sent"}),x===H&&Object(d.jsx)("button",{className:"btn btn-sm btn-success m-1",onClick:w,children:"Accept friend request"}),x===E&&Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("button",{className:"btn btn-sm btn-danger m-1",onClick:S,children:"Remove from friends"}),Object(d.jsxs)("a",{href:"".concat(l.HOST,"/users/").concat(t.username,"/chat"),className:"btn btn-sm btn-primary",children:["Open chat with ",t.full_name]})]}),f&&Object(d.jsx)("div",{className:"text-danger",children:"Error occured"})]}),Object(d.jsxs)("div",{className:"col-sm-4 ml-2",children:[Object(d.jsx)("h3",{children:t.full_name}),Object(d.jsx)("span",{children:n.length?n[0][0]:""}),Object(d.jsx)("hr",{}),Object(d.jsxs)("div",{children:[Object(d.jsx)("h5",{children:"Interests:"}),Object(d.jsx)("span",{children:t.interests})]}),Object(d.jsx)(_,{statuses:n})]})]})},R=function(e){var t=e.friends;return Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("div",{className:"row mt-4",children:Object(d.jsx)("h4",{children:"Friends"})}),t.length?Object(d.jsx)("div",{children:t.map((function(e){return Object(d.jsxs)("div",{className:"mx-1",children:[Object(d.jsx)("a",{href:"".concat(l.HOST,"/users/").concat(e.username),children:Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(e.profile_picture_path),style:{width:"5rem"},alt:"".concat(e.full_name)})}),Object(d.jsx)("div",{style:{width:"5rem"},children:e.full_name})]},e.username)}))}):Object(d.jsx)("div",{className:"row",children:"No friends :("})]})},I=function(e){var t=e.user,n=t.media.filter((function(e){return"photo"===e.media_type})),r=t.media.filter((function(e){return"video"===e.media_type}));return Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)("div",{className:"row mt-4",children:Object(d.jsx)("h4",{children:"Photos"})}),Object(d.jsx)("div",{className:"row",children:n?n.map((function(e){return Object(d.jsx)("div",{className:"mx-1",children:Object(d.jsx)("img",{src:"".concat(l.HOST,"/").concat(e.data_path),width:150,alt:"".concat(e.data_path)})},"".concat(e.id))})):Object(d.jsx)(c.Fragment,{})}),Object(d.jsx)("div",{className:"row my-2",children:Object(d.jsx)("h4",{children:"Videos"})}),Object(d.jsx)("div",{className:"row",children:r?r.map((function(e){return Object(d.jsx)("div",{children:Object(d.jsx)("video",{className:"m-1",controls:!0,src:"".concat(l.HOST,"/").concat(e.data_path),style:{cursor:"pointer"},width:300})},"".concat(e.id))})):Object(d.jsx)(c.Fragment,{})})]})},P=function(){var e=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(l.HOST,"/api/users/").concat(t));case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(l.HOST,"/api/me/info"));case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(e){var t=e.username,n=Object(c.useState)(null),r=Object(j.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)(null),l=Object(j.a)(i,2),b=l[0],f=l[1],m=Object(c.useState)([]),h=Object(j.a)(m,2),p=h[0],x=h[1],v=Object(c.useState)([]),g=Object(j.a)(v,2),w=g[0],S=g[1],N=function(){var e=Object(u.a)(o.a.mark((function e(){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(t);case 2:return n=e.sent,x(n.statuses.map((function(e){return[e.status,e.timestamp]}))),S(n.friends),s(n),e.t0=f,e.next=9,L();case 9:e.t1=e.sent,(0,e.t0)(e.t1);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){N()}),[]);return Object(d.jsx)(c.Fragment,{children:a?Object(d.jsxs)(c.Fragment,{children:[Object(d.jsx)(D,{user:a,statuses:p,me:b,removeMeFromFriends:function(){S(w.filter((function(e){return e.user_id!==b.user_id})))},addMeToFriends:function(){S([b].concat(Object(O.a)(w)))}}),Object(d.jsx)(R,{friends:w}),Object(d.jsx)(I,{user:a})]}):Object(d.jsx)("span",{children:"Loading..."})})};n(19);if(document.getElementById("root-search-app")&&s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(f,{})}),document.getElementById("root-search-app")),document.getElementById("root-home-app")&&s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(y,{})}),document.getElementById("root-home-app")),document.getElementById("root-user-app")){var A=JSON.parse(document.getElementById("id_user_name").textContent);s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(q,{username:A})}),document.getElementById("root-user-app"))}}},[[20,1,2]]]);
//# sourceMappingURL=main.1b7b9061.chunk.js.map