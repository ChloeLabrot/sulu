define(["services/sulumedia/collection-manager","services/sulumedia/user-settings-manager","services/sulumedia/media-router","services/sulumedia/overlay-manager"],function(a,b,c,d){"use strict";var e={};return{header:function(){return{noBack:!0,title:this.data.title,tabs:{url:"/admin/content-navigations?alias=media"},toolbar:{buttons:{editCollection:{},moveCollection:{},deleteCollection:{}},languageChanger:{url:"/admin/api/localizations",resultKey:"localizations",titleAttribute:"localization",preSelected:b.getMediaLocale()}}}},loadComponentData:function(){var c=this.sandbox.data.deferred();return a.loadOrNew(this.options.id,b.getMediaLocale()).then(function(a){c.resolve(a)}),c},initialize:function(){this.options=this.sandbox.util.extend(!0,{},e,this.options),b.setLastVisitedCollection(this.data.id),this.updateDataNavigation(),this.bindCustomEvents(),this.bindOverlayEvents(),this.bindManagerEvents()},updateDataNavigation:function(){var a="/admin/api/collections/"+this.data.id+"?depth=1&sortBy=title";this.sandbox.emit("husky.data-navigation.collections.set-url",a),this.sandbox.emit("husky.navigation.select-id","collections-edit",{dataNavigation:{url:a}})},bindCustomEvents:function(){this.sandbox.on("sulu.header.language-changed",function(a){b.setMediaLocale(a.id),c.toCollection(this.data.id)}.bind(this)),this.sandbox.on("sulu.toolbar.edit-collection",function(){d.startEditCollectionOverlay.call(this,this.data.id,b.getMediaLocale())}.bind(this)),this.sandbox.on("sulu.toolbar.move-collection",function(){d.startMoveCollectionOverlay.call(this,this.data.id,b.getMediaLocale())}.bind(this)),this.sandbox.on("sulu.toolbar.delete-collection",function(){this.deleteCollection()}.bind(this))},bindOverlayEvents:function(){this.sandbox.on("sulu.collection-select.move-collection.selected",this.moveCollection.bind(this))},bindManagerEvents:function(){this.sandbox.on("sulu.medias.collection.saved",function(a,c){c.locale&&c.locale!==b.getMediaLocale()||(this.data=c,this.sandbox.emit("sulu.header.set-title",this.data.title),this.sandbox.emit("husky.data-navigation.collections.reload"))}.bind(this)),this.sandbox.on("sulu.medias.collection.deleted",function(){var a=this.data._embedded.parent?this.data._embedded.parent.id:null;c.toCollection(a)}.bind(this))},deleteCollection:function(){this.sandbox.sulu.showDeleteDialog(function(b){b&&a["delete"](this.data.id)}.bind(this))},moveCollection:function(b){a.move(this.data.id,b.id).then(function(){c.toCollection(this.data.id)}.bind(this))}}});