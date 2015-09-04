define(["services/sulumedia/collection-manager"],function(a){"use strict";var b="sulu.collection-add.",c={parent:null,instanceName:""},d={newFormSelector:"#collection-new"},e=function(){return g.call(this,"closed")},f=function(){return g.call(this,"initialized")},g=function(a){return b+(this.options.instanceName?this.options.instanceName+".":"")+a};return{templates:["/admin/media/template/collection/new"],initialize:function(){this.options=this.sandbox.util.extend(!0,{},c,this.options),this.openOverlay(),this.sandbox.emit(f.call(this))},openOverlay:function(){var a=this.sandbox.dom.createElement('<div class="overlay-element"/>');this.sandbox.dom.append(this.$el,a),this.sandbox.once("husky.overlay.add-collection.opened",function(){this.sandbox.start(d.newFormSelector),this.sandbox.form.create(d.newFormSelector)}.bind(this)),this.sandbox.start([{name:"overlay@husky",options:{el:a,title:this.sandbox.translate("sulu.media.add-collection"),instanceName:"add-collection",data:this.renderTemplate("/admin/media/template/collection/new"),okCallback:this.addCollection.bind(this),cancelCallback:function(){this.sandbox.stop()}.bind(this),openOnStart:!0,removeOnClose:!0,propagateEvents:!1}}])},addCollection:function(){if(this.sandbox.form.validate(d.newFormSelector)){var b=this.sandbox.form.getData(d.newFormSelector);return b.parent=this.options.parent,a.save(b).then(function(a){this.sandbox.emit("sulu.media.collection-create.created",a),this.sandbox.stop()}.bind(this)).fail(function(){this.sandbox.stop()}.bind(this)),!0}return!1},destroy:function(){this.sandbox.emit(e.call(this))}}});