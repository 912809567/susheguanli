(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f7f529c"],{"1f86":function(e,t,o){"use strict";o("7ecd")},"289a":function(e,t,o){},"39d0":function(e,t,o){"use strict";o("289a")},"7ecd":function(e,t,o){},"9ed6":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[e._v("广东工业大学宿舍管理系统")])]),e._v(" "),o("el-form-item",{attrs:{prop:"account"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),o("el-input",{ref:"account",attrs:{placeholder:"学号/职工号",name:"account",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.account,callback:function(t){e.$set(e.loginForm,"account",t)},expression:"loginForm.account"}})],1),e._v(" "),o("el-tooltip",{attrs:{content:"大写锁定键已开启",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(t){e.capsTooltip=t},expression:"capsTooltip"}},[o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),o("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(t){e.capsTooltip=!1}},nativeOn:{keyup:[function(t){return e.checkCapslock(t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}]},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),o("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),e.registerMode?o("el-form-item",{attrs:{prop:"repassword"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),o("el-input",{ref:"repassword",attrs:{placeholder:"确认密码",name:"repassword",type:"password",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.repassword,callback:function(t){e.$set(e.loginForm,"repassword",t)},expression:"loginForm.repassword"}})],1):e._e(),e._v(" "),e.registerMode?e._e():o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录")]),e._v(" "),e.registerMode?o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px","margin-left":"0"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleRegister(t)}}},[e._v("注册")]):e._e(),e._v(" "),o("a",{staticClass:"toggle",on:{click:function(t){e.registerMode=!e.registerMode}}},[e.registerMode?o("span",[e._v("返回登录")]):o("span",[e._v("学生注册")])])],1)],1)},s=[],n=(o("ac6a"),o("456d"),o("c24f")),i={name:"Login",data:function(){var e=this,t=function(e,t,o){t.length<6?o(new Error("密码需要6位以上")):o()},o=function(t,o,r){o!==e.loginForm.password&&e.registerMode?r(new Error("两次密码不符合")):r()};return{loginForm:{account:"",password:"",repassword:""},loginRules:{account:[{required:!0,trigger:"blur"}],password:[{required:!0,trigger:"blur",validator:t}],repassword:[{validator:o,trigger:"blur"}]},passwordType:"password",registerMode:!1,capsTooltip:!1,loading:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(e){var t=e.query;t&&(this.redirect=t.redirect,this.otherQuery=this.getOtherQuery(t))},immediate:!0}},mounted:function(){""===this.loginForm.account?this.$refs.account.focus():""===this.loginForm.password&&this.$refs.password.focus()},methods:{checkCapslock:function(e){var t=e.key;this.capsTooltip=t&&1===t.length&&t>="A"&&t<="Z"},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then((function(){e.$router.push({path:e.redirect||"/",query:e.otherQuery}),e.loading=!1})).catch((function(){e.loading=!1}))}))},handleRegister:function(){var e=this;this.$refs.loginForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,Object(n["g"])({account:e.loginForm.account,password:e.loginForm.password}).then((function(){e.$message({message:"注册成功",type:"success"}),e.loading=!1,e.registerMode=!1}))}))},getOtherQuery:function(e){return Object.keys(e).reduce((function(t,o){return"redirect"!==o&&(t[o]=e[o]),t}),{})}}},a=i,c=(o("39d0"),o("1f86"),o("2877")),l=Object(c["a"])(a,r,s,!1,null,"24d7134c",null);t["default"]=l.exports}}]);