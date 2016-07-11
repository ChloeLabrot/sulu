define(["jquery","underscore","config","app-config","services/husky/mediator","websocket-manager"],function(a,b,c,d,e,f){"use strict";function g(a,b){this.client=a,this.promise=b,this.promise.then(function(a){this.webspace=a,e.on("sulu.preview.webspace",this.setWebspace.bind(this)),e.on("sulu.preview.render",this.render.bind(this))}.bind(this))}var h={WEBSOCKET_APP_NAME:"admin",MESSAGE_HANDLER_NAME:"sulu_preview.preview",MODE_OFF:"off"},i=b.template(['<div style="height: 100%;"','     data-aura-component="preview@sulupreview"',"     data-aura-permissions='<%= JSON.stringify(permissions) %>'",'     data-aura-mode="<%= mode %>"',"<% if (!!webspace) { %>",'     data-aura-webspace="<%= webspace %>"',"<% } %>","/>"].join("")),j=c.get("sulu_preview"),k=function(b,c){var d,e=[],f=b.parents("*[data-mapper-property]"),g=b.parents("*[data-mapper-property-tpl]")[0];for(c&&e.push(c);!b.data("element");){if(0===b.length)return!1;b=b.parent()}return f.length>0?(d=a(f[0]).data("mapperProperty"),e=e.concat([d,a(g).index(),b.data("mapperProperty")])):e.push(b.data("mapperProperty")),e},l=function(a){for(var b=1,c=a.length,d=[a[0]];c>b;b++)d.push("["+a[b]+"]");return d.join("")},m=function(a){for(;!a.data("element");){if(0===a.length)return!1;a=a.parent()}var b=a.data("element");return a.data("elementGroup")&&(b=a.data("elementGroup")),b.getValue()},n=function(a,b,c){return a.send(h.MESSAGE_HANDLER_NAME,{command:"update",webspaceKey:b,data:c}).then(function(a,b){b&&b.data&&e.emit("sulu.preview.update-content",b.data)}.bind(this))},o=function(a,b,c,d){return a.send(h.MESSAGE_HANDLER_NAME,{command:"update-context",webspaceKey:b,context:c,data:d}).then(function(a,b){b&&b.response&&(e.emit("sulu.preview.set-content",""),e.emit("sulu.preview.set-content",b.response))}.bind(this))},p=function(b,c){var d=a.Deferred();return e.emit("sulu.sidebar.set-widget",null,i({permissions:b||{},webspace:c,mode:j.mode})),e.once("sulu.preview.webspace",function(a){d.resolve(a)}),new g(f.getClient(h.WEBSOCKET_APP_NAME),d)};return g.prototype.start=function(a,b,c,f){this.data=f,this.promise.then(function(){this.client.send(h.MESSAGE_HANDLER_NAME,{command:"start","class":a,id:b,user:d.getUser().id,webspaceKey:this.getWebspace(),locale:c,data:this.data}).then(function(a,b){b&&b.response&&e.emit("sulu.preview.set-content",b.response)}).fail(function(a,b){e.emit("sulu.preview.error",b.code,b.message)}.bind(this))}.bind(this))},g.prototype.stop=function(){this.promise.then(function(){this.client.send(h.MESSAGE_HANDLER_NAME,{command:"stop"}).fail(function(a,b){e.emit("sulu.preview.error",b.code,b.message)}.bind(this)),e.off("sulu.preview.webspace"),e.off("sulu.preview.render"),e.off("sulu.preview.update"),this.$element&&(this.$element.off("keyup"),this.$element.off("change"))}.bind(this))},g.prototype.update=function(b,c){this.promise.then(function(){var d={};return b.each(function(){var b=k(a(this),c);d[l(b)]=m(a(this))}),n(this.client,this.getWebspace(),d)}.bind(this))},g.prototype.updateProperty=function(a,b){this.promise.then(function(){var c={};return c[a]=b,n(this.client,this.getWebspace(),c)}.bind(this))},g.prototype.updateContext=function(a,b){this.promise.then(function(){return o(this.client,this.getWebspace(),a,b)}.bind(this))},g.prototype.bindDomEvents=function(c,d){this.$element=c;var f='.preview-change-update, input[type="checkbox"].preview-update, input[type="radio"].preview-update, select.preview-update, div.preview-update',g=".preview-update:not("+f+", .no-preview-update)";c.on("keyup",g,b.debounce(function(b){this.update(a(b.currentTarget),d)}.bind(this),j.delay)),c.on("change",f,b.debounce(function(b){this.update(a(b.currentTarget),d)}.bind(this),10)),e.on("sulu.preview.update",b.debounce(function(a,b){var c=k(a,d),e=l(c),f={};f[e]=b,n(this.client,this.getWebspace(),f)}.bind(this),j.delay))},g.prototype.getWebspace=function(){return this.webspace},g.prototype.setWebspace=function(a){this.webspace=a,this.render()},g.prototype.render=function(){return this.client.send(h.MESSAGE_HANDLER_NAME,{command:"render",webspaceKey:this.getWebspace()}).then(function(a,b){b&&e.emit("sulu.preview.set-content",b.response)}.bind(this)).fail(function(a,b){e.emit("sulu.preview.error",b.code,b.message)}.bind(this))},{initialize:function(b,c){return j.mode===h.MODE_OFF?new g(f.createDummyClient(h.WEBSOCKET_APP_NAME),a.Deferred()):p(b,c)},getSequence:function(a,b){return k(a,b)},destroy:function(a){a.stop(),e.emit("sulu.sidebar.empty")}}});