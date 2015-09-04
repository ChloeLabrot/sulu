define(["services/sulumedia/media-manager","services/sulumedia/user-settings-manager","services/sulumedia/media-router"],function(a,b,c){"use strict";var d={toolbarSelector:".list-toolbar-container",datagridSelector:".datagrid-container"},e={};return{header:{noBack:!0,toolbar:{template:"empty",languageChanger:{url:"/admin/api/localizations",resultKey:"localizations",titleAttribute:"localization",preSelected:b.getMediaLocale()}}},layout:{navigation:{collapsed:!0},content:{width:"max"}},templates:["/admin/media/template/collection/files"],initialize:function(){this.options=this.sandbox.util.extend(!0,{},e,this.options),this.updateDataNavigation(),this.bindCustomEvents(),this.render()},updateDataNavigation:function(){var a="/admin/api/collections?sortBy=title";this.sandbox.emit("husky.data-navigation.collections.set-url",a),this.sandbox.emit("husky.navigation.select-id","collections-edit",{dataNavigation:{url:a}})},bindCustomEvents:function(){this.sandbox.on("sulu.toolbar.change.table",function(){b.setMediaListView("table"),this.sandbox.emit("husky.datagrid.view.change","table")}.bind(this)),this.sandbox.on("sulu.toolbar.change.masonry",function(){b.setMediaListView("decorators/masonry"),this.sandbox.emit("husky.datagrid.view.change","decorators/masonry")}.bind(this)),this.sandbox.on("husky.datagrid.download-clicked",function(b){a.loadOrNew(b).then(function(a){this.sandbox.dom.window.location.href=a.versions[a.version].url}.bind(this))}.bind(this)),this.sandbox.on("sulu.header.language-changed",function(a){b.setMediaLocale(a.id),this.sandbox.emit("husky.datagrid.url.update",{locale:a.id})}.bind(this))},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/media/template/collection/files")),this.startDatagrid()},actionCallback:function(a,b){this.sandbox.sulu.viewStates["media-file-edit-id"]=a,c.toCollection(b.collection)},startDatagrid:function(){this.sandbox.sulu.initListToolbarAndList.call(this,"media","/admin/api/media/fields",{el:this.$find(d.toolbarSelector),instanceName:this.options.instanceName,template:this.sandbox.sulu.buttons.get({mediaDecoratorDropdown:{}})},{el:this.$find(d.datagridSelector),url:"/admin/api/media?orderBy=media.changed&orderSort=desc&locale="+b.getMediaLocale(),view:b.getMediaListView(),resultKey:"media",sortable:!1,actionCallback:this.actionCallback.bind(this),viewOptions:{table:{selectItem:!0,actionIconColumn:"name"},"decorators/masonry":{selectable:!1}}})}}});