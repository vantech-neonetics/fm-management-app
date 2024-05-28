"use strict";(self.webpackChunkone_api_web=self.webpackChunkone_api_web||[]).push([[905],{6853:function(e,t,n){var i=n(5043),a=n(6240),r=n(2110),s=n(9958),o=n(5865),l=n(9336),c=n(6494),d=n(579);const p=(0,i.forwardRef)(((e,t)=>{let{children:n,content:i,contentClass:p,darkTitle:h,secondary:u,sx:x={},contentSX:g={},title:A,subTitle:v,...b}=e;const f=(0,a.A)();return(0,d.jsxs)(r.A,{ref:t,sx:{border:f.typography.SubCard.border,":hover":{boxShadow:"0 2px 14px 0 rgb(32 40 45 / 8%)"},...x},...b,children:[!h&&A&&(0,d.jsx)(s.A,{sx:{p:2.5},title:(0,d.jsx)(o.A,{variant:"h5",children:A}),action:u,subheader:v}),h&&A&&(0,d.jsx)(s.A,{sx:{p:2.5},title:(0,d.jsx)(o.A,{variant:"h4",children:A}),action:u,subheader:v}),A&&(0,d.jsx)(l.A,{sx:{opacity:1}}),i&&(0,d.jsx)(c.A,{sx:{p:2.5,...g},className:p||"",children:n}),!i&&n]})}));p.defaultProps={content:!0},t.A=p},7473:function(e,t,n){n.d(t,{A:function(){return A}});var i=n(1045),a=n(6446),r=n(310),s=n(2110),o=n(5043);var l=n.p+"static/media/shape-avatar.096ea8015d2d14ba4ce707d949a97823.svg",c=n.p+"static/media/cover.ce8466cd4be184bb082b.jpg",d=n(163),p=n(5173),h=n.n(p),u=n(579);const x=(0,o.forwardRef)(((e,t)=>{let{src:n,sx:i,...r}=e;return(0,u.jsx)(a.A,{component:"span",className:"svg-color",ref:t,sx:{width:24,height:24,display:"inline-block",bgcolor:"currentColor",mask:`url(${n}) no-repeat center / contain`,WebkitMask:`url(${n}) no-repeat center / contain`,...i},...r})}));x.propTypes={src:h().string,sx:h().object};var g=x;function A(e){let{children:t}=e;const n=(0,u.jsx)(g,{color:"paper",src:l,sx:{width:"100%",height:62,zIndex:10,bottom:-26,position:"absolute",color:"background.paper"}}),o=(0,u.jsx)(i.A,{src:d.A,sx:{zIndex:11,width:64,height:64,position:"absolute",alignItems:"center",marginLeft:"auto",marginRight:"auto",left:0,right:0,bottom:e=>e.spacing(-4)}}),p=(0,u.jsx)(a.A,{component:"img",src:c,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}});return(0,u.jsxs)(s.A,{children:[(0,u.jsxs)(a.A,{sx:{position:"relative","&:after":{top:0,content:"''",width:"100%",height:"100%",position:"absolute",bgcolor:e=>(0,r.X4)(e.palette.primary.main,.42)},pt:{xs:"calc(100% / 3)",sm:"calc(100% / 4.66)"}},children:[n,o,p]}),(0,u.jsx)(a.A,{sx:{p:e=>e.spacing(4,3,3,3)},children:t})]})}},4611:function(e,t,n){n.r(t),n.d(t,{default:function(){return $}});var i=n(7254),a=n(8911),r=n(2075),s=n(5865),o=n(3193),l=n(9190),c=n(4050),d=n(1787),p=n(2518),h=(0,n(7391).A)("wallet","IconWallet",[["path",{d:"M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12",key:"svg-0"}],["path",{d:"M20 12v4h-4a2 2 0 0 1 0 -4h4",key:"svg-1"}]]),u=n(6240),x=n(6853),g=n(7473),A=n(3862),v=n(5043),b=n(9985),f=n(579);var m=()=>{const e=(0,u.A)(),[t,n]=(0,v.useState)(""),[i,r]=(0,v.useState)(""),[m,j]=(0,v.useState)(0),[y,w]=(0,v.useState)(!1);return(0,v.useEffect)((()=>{let e=localStorage.getItem("siteInfo");e&&(e=JSON.parse(e),e.top_up_link&&r(e.top_up_link)),(async()=>{let e=await A.n.get("/api/user/self");const{success:t,message:n,data:i}=e.data;t?j(i.quota):(0,b.Qg)(n)})().then()}),[]),(0,f.jsxs)(g.A,{children:[(0,f.jsxs)(a.A,{direction:"row",alignItems:"center",justifyContent:"center",spacing:2,paddingTop:"20px",children:[(0,f.jsx)(h,{color:e.palette.primary.main}),(0,f.jsx)(s.A,{variant:"h4",children:"\u5f53\u524d\u989d\u5ea6:"}),(0,f.jsx)(s.A,{variant:"h4",children:(0,b.X8)(m)})]}),(0,f.jsxs)(x.A,{sx:{marginTop:"40px"},children:[(0,f.jsxs)(o.A,{fullWidth:!0,variant:"outlined",children:[(0,f.jsx)(l.A,{htmlFor:"key",children:"\u5151\u6362\u7801"}),(0,f.jsx)(c.A,{id:"key",label:"\u5151\u6362\u7801",type:"text",value:t,onChange:e=>{n(e.target.value)},name:"key",placeholder:"\u8bf7\u8f93\u5165\u5151\u6362\u7801",endAdornment:(0,f.jsx)(d.A,{position:"end",children:(0,f.jsx)(p.A,{variant:"contained",onClick:async()=>{if(""!==t){w(!0);try{const e=await A.n.post("/api/user/topup",{key:t}),{success:i,message:a,data:r}=e.data;i?((0,b.Te)("\u5145\u503c\u6210\u529f\uff01"),j((e=>e+r)),n("")):(0,b.Qg)(a)}catch(e){(0,b.Qg)("\u8bf7\u6c42\u5931\u8d25")}finally{w(!1)}}else(0,b.cf)("\u8bf7\u8f93\u5165\u5145\u503c\u7801\uff01")},disabled:y,children:y?"\u5151\u6362\u4e2d...":"\u5151\u6362"})}),"aria-describedby":"helper-text-channel-quota-label"})]}),(0,f.jsxs)(a.A,{justifyContent:"center",alignItems:"center",spacing:3,paddingTop:"20px",children:[(0,f.jsx)(s.A,{variant:"h4",color:e.palette.grey[700],children:"\u8fd8\u6ca1\u6709\u5151\u6362\u7801\uff1f \u70b9\u51fb\u83b7\u53d6\u5151\u6362\u7801\uff1a"}),(0,f.jsx)(p.A,{variant:"contained",onClick:()=>{i?window.open(i,"_blank"):(0,b.Qg)("\u8d85\u7ea7\u7ba1\u7406\u5458\u672a\u8bbe\u7f6e\u5145\u503c\u94fe\u63a5\uff01")},children:"\u83b7\u53d6\u5151\u6362\u7801"})]})]})]})},j=n(6446),y=n(9252),w=n.p+"static/media/cwok_casual_19.1745e77a5684e8163b32.webp";var k=()=>{const e=(0,u.A)(),[t,n]=(0,v.useState)("");return(0,f.jsxs)(j.A,{component:"div",children:[(0,f.jsx)(x.A,{sx:{background:e.palette.primary.dark},children:(0,f.jsx)(a.A,{justifyContent:"center",alignItems:"flex-start",padding:"40px 24px 0px",spacing:3,children:(0,f.jsx)(y.A,{sx:{display:"flex",justifyContent:"center",alignItems:"center"},children:(0,f.jsx)("img",{src:w,alt:"invite",width:"250px"})})})}),(0,f.jsx)(x.A,{sx:{marginTop:"-20px"},children:(0,f.jsxs)(a.A,{justifyContent:"center",alignItems:"center",spacing:3,children:[(0,f.jsx)(s.A,{variant:"h3",sx:{color:e.palette.primary.dark},children:"\u9080\u8bf7\u5956\u52b1"}),(0,f.jsx)(s.A,{variant:"body",sx:{color:e.palette.primary.dark},children:"\u5206\u4eab\u60a8\u7684\u9080\u8bf7\u94fe\u63a5\uff0c\u9080\u8bf7\u597d\u53cb\u6ce8\u518c\uff0c\u5373\u53ef\u83b7\u5f97\u5956\u52b1\uff01"}),(0,f.jsx)(c.A,{id:"invite-url",label:"\u9080\u8bf7\u94fe\u63a5",type:"text",value:t,name:"invite-url",placeholder:"\u70b9\u51fb\u751f\u6210\u9080\u8bf7\u94fe\u63a5",endAdornment:(0,f.jsx)(d.A,{position:"end",children:(0,f.jsx)(p.A,{variant:"contained",onClick:async()=>{if(t)return void(0,b.C)(t,"\u9080\u8bf7\u94fe\u63a5");const e=await A.n.get("/api/user/aff"),{success:i,message:a,data:r}=e.data;if(i){let e=`${window.location.origin}/register?aff=${r}`;n(e),(0,b.C)(e,"\u9080\u8bf7\u94fe\u63a5")}else(0,b.Qg)(a)},children:t?"\u590d\u5236":"\u751f\u6210"})}),"aria-describedby":"helper-text-channel-quota-label",disabled:!0})]})})]})};var $=()=>(0,f.jsxs)(r.A,{container:!0,spacing:2,children:[(0,f.jsx)(r.A,{xs:12,children:(0,f.jsxs)(i.A,{severity:"warning",children:["\u5145\u503c\u8bb0\u5f55\u4ee5\u53ca\u9080\u8bf7\u8bb0\u5f55\u8bf7\u5728\u65e5\u5fd7\u4e2d\u67e5\u8be2\u3002\u5145\u503c\u8bb0\u5f55\u8bf7\u5728\u65e5\u5fd7\u4e2d\u9009\u62e9\u7c7b\u578b\u3010\u5145\u503c\u3011\u67e5\u8be2\uff1b\u9080\u8bf7\u8bb0\u5f55\u8bf7\u5728\u65e5\u5fd7\u4e2d\u9009\u62e9\u3010\u7cfb\u7edf\u3011\u67e5\u8be2"," "]})}),(0,f.jsx)(r.A,{xs:12,md:6,lg:8,children:(0,f.jsx)(a.A,{spacing:2,children:(0,f.jsx)(m,{})})}),(0,f.jsx)(r.A,{xs:12,md:6,lg:4,children:(0,f.jsx)(k,{})})]})},1787:function(e,t,n){n.d(t,{A:function(){return y}});var i=n(8587),a=n(8168),r=n(5043),s=n(8387),o=n(8606),l=n(6803),c=n(5865),d=n(1053),p=n(5213),h=n(4535),u=n(7056),x=n(2400);function g(e){return(0,x.Ay)("MuiInputAdornment",e)}var A,v=(0,u.A)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),b=n(2876),f=n(579);const m=["children","className","component","disablePointerEvents","disableTypography","position","variant"],j=(0,h.Ay)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${(0,l.A)(n.position)}`],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]}})((e=>{let{theme:t,ownerState:n}=e;return(0,a.A)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active},"filled"===n.variant&&{[`&.${v.positionStart}&:not(.${v.hiddenLabel})`]:{marginTop:16}},"start"===n.position&&{marginRight:8},"end"===n.position&&{marginLeft:8},!0===n.disablePointerEvents&&{pointerEvents:"none"})}));var y=r.forwardRef((function(e,t){const n=(0,b.A)({props:e,name:"MuiInputAdornment"}),{children:h,className:u,component:x="div",disablePointerEvents:v=!1,disableTypography:y=!1,position:w,variant:k}=n,$=(0,i.A)(n,m),I=(0,p.A)()||{};let S=k;k&&I.variant,I&&!S&&(S=I.variant);const C=(0,a.A)({},n,{hiddenLabel:I.hiddenLabel,size:I.size,disablePointerEvents:v,position:w,variant:S}),E=(e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:i,position:a,size:r,variant:s}=e,c={root:["root",n&&"disablePointerEvents",a&&`position${(0,l.A)(a)}`,s,i&&"hiddenLabel",r&&`size${(0,l.A)(r)}`]};return(0,o.A)(c,g,t)})(C);return(0,f.jsx)(d.A.Provider,{value:null,children:(0,f.jsx)(j,(0,a.A)({as:x,ownerState:C,className:(0,s.A)(E.root,u),ref:t},$,{children:"string"!==typeof h||y?(0,f.jsxs)(r.Fragment,{children:["start"===w?A||(A=(0,f.jsx)("span",{className:"notranslate",children:"\u200b"})):null,h]}):(0,f.jsx)(c.A,{color:"text.secondary",children:h})}))})}))},6871:function(e,t,n){n(5043);var i=n(6734),a=n(579);t.A=(0,i.A)((0,a.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},310:function(e,t,n){n.d(t,{X4:function(){return l}});var i=n(6632),a=n(7040);function r(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return(0,a.A)(e,t,n)}function s(e){if(e.type)return e;if("#"===e.charAt(0))return s(function(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&1===n[0].length&&(n=n.map((e=>e+e))),n?`rgb${4===n.length?"a":""}(${n.map(((e,t)=>t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}(e));const t=e.indexOf("("),n=e.substring(0,t);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(n))throw new Error((0,i.A)(9,e));let a,r=e.substring(t+1,e.length-1);if("color"===n){if(r=r.split(" "),a=r.shift(),4===r.length&&"/"===r[3].charAt(0)&&(r[3]=r[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(a))throw new Error((0,i.A)(10,a))}else r=r.split(",");return r=r.map((e=>parseFloat(e))),{type:n,values:r,colorSpace:a}}function o(e){const{type:t,colorSpace:n}=e;let{values:i}=e;return-1!==t.indexOf("rgb")?i=i.map(((e,t)=>t<3?parseInt(e,10):e)):-1!==t.indexOf("hsl")&&(i[1]=`${i[1]}%`,i[2]=`${i[2]}%`),i=-1!==t.indexOf("color")?`${n} ${i.join(" ")}`:`${i.join(", ")}`,`${t}(${i})`}function l(e,t){return e=s(e),t=r(t),"rgb"!==e.type&&"hsl"!==e.type||(e.type+="a"),"color"===e.type?e.values[3]=`/${t}`:e.values[3]=t,o(e)}}}]);
//# sourceMappingURL=905.1a16a57b.chunk.js.map