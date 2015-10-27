define(["config","services/sulumedia/collection-manager","services/sulumedia/media-manager","services/sulumedia/user-settings-manager","services/sulumedia/overlay-manager","sulusecurity/services/security-checker"],function(a,b,c,d,e,f){"use strict";var g={instanceName:"collection"},h={scrollContainerSelector:".content-column > .wrapper .page",hideToolbarClass:"toolbar-hidden",fixedClass:"fixed",dropzoneSelector:".dropzone-container",toolbarSelector:".list-toolbar-container",datagridSelector:".datagrid-container"};return{layout:{navigation:{collapsed:!0},content:{width:"max"}},templates:["/admin/media/template/collection/files"],initialize:function(){if(this.options=this.sandbox.util.extend(!0,{},g,this.options),this.bindDatagridEvents(),this.bindDropzoneEvents(),this.bindOverlayEvents(),this.bindManagerEvents(),this.bindListToolbarEvents(),this.sandbox.emit("sulu.medias.collection.get-data",function(a){this.data=a,this.render()}.bind(this)),this.sandbox.sulu.viewStates["media-file-edit-id"]){var a=this.sandbox.sulu.viewStates["media-file-edit-id"];e.startEditMediaOverlay.call(this,a,d.getMediaLocale()),delete this.sandbox.sulu.viewStates["media-file-edit-id"]}},bindDatagridEvents:function(){this.sandbox.on("husky.datagrid.number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+this.options.instanceName+".item."+b,"media-move",!1),this.sandbox.emit("husky.toolbar."+this.options.instanceName+".item."+b,"editSelected",!1),this.sandbox.emit("husky.toolbar."+this.options.instanceName+".item."+b,"delete",!1)}.bind(this))},bindDropzoneEvents:function(){this.sandbox.on("husky.dropzone."+this.options.instanceName+".success",function(a,b){this.sandbox.emit("sulu.labels.success.show","labels.success.media-upload-desc","labels.success"),this.sandbox.emit("husky.datagrid.records.add",[b])},this)},bindManagerEvents:function(){this.sandbox.on("sulu.medias.media.deleted",function(a){this.sandbox.emit("husky.datagrid.record.remove",a)}.bind(this)),this.sandbox.on("sulu.medias.media.moved",function(a){this.sandbox.emit("husky.datagrid.record.remove",a),this.sandbox.emit("husky.data-navigation.collections.reload")}.bind(this)),this.sandbox.on("sulu.medias.media.saved",function(a,b){b.locale&&b.locale!==d.getMediaLocale()||this.sandbox.emit("husky.datagrid.records.change",b)}.bind(this))},bindOverlayEvents:function(){this.sandbox.on("sulu.collection-select.move-media.selected",this.moveMedia.bind(this)),this.sandbox.on("sulu.collection-add.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-edit.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-collection.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-media.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.media-edit.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.permission-settings.initialized",this.disableDropzone.bind(this)),this.sandbox.on("sulu.collection-add.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.collection-edit.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-collection.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.collection-select.move-media.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.media-edit.closed",this.enableDropzone.bind(this)),this.sandbox.on("sulu.permission-settings.closed",this.enableDropzone.bind(this))},bindListToolbarEvents:function(){this.sandbox.on("sulu.list-toolbar.add",function(){this.sandbox.emit("husky.dropzone."+this.options.instanceName+".show-popup")}.bind(this)),this.sandbox.on("sulu.list-toolbar.delete",this.deleteMedia.bind(this)),this.sandbox.on("sulu.list-toolbar.edit",this.editMedias.bind(this)),this.sandbox.on("sulu.list-toolbar.media-move",function(){e.startMoveMediaOverlay.call(this,this.options.id,d.getMediaLocale())}.bind(this)),this.sandbox.on("sulu.toolbar.change.table",function(){d.setMediaListView("table"),d.setMediaListPagination("dropdown"),this.sandbox.emit("husky.datagrid.change",1,d.getDropdownPageSize(),"table",[],"dropdown"),this.$el.removeClass(h.fixedClass)}.bind(this)),this.sandbox.on("sulu.toolbar.change.masonry",function(){d.setMediaListView("datagrid/decorators/masonry-view"),d.setMediaListPagination("infinite-scroll"),this.sandbox.emit("husky.datagrid.change",1,d.getInfinityPageSize(),"datagrid/decorators/masonry-view",null,"infinite-scroll"),this.$el.removeClass(h.fixedClass)}.bind(this)),this.sandbox.dom.on(h.scrollContainerSelector,"scroll",this.scrollHandler.bind(this))},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/media/template/collection/files",{title:this.data.title})),f.hasPermission(this.data,"add")&&this.startDropzone(),this.startDatagrid()},startDatagrid:function(){var a=d.getMediaListView(),b=[],c={};f.hasPermission(this.data,"add")&&(c.add={options:{"class":null,callback:function(){this.sandbox.emit("sulu.list-toolbar.add")}.bind(this)}}),f.hasPermission(this.data,"edit")&&(c.editSelected={options:{callback:function(){this.sandbox.emit("sulu.list-toolbar.edit")}.bind(this)}}),f.hasPermission(this.data,"delete")&&(c.deleteSelected={options:{callback:function(){this.sandbox.emit("sulu.list-toolbar.delete")}.bind(this)}}),f.hasPermission(this.data,"edit")&&b.push({id:"media-move",title:this.sandbox.translate("sulu.media.move"),callback:function(){this.sandbox.emit("sulu.list-toolbar.media-move")}.bind(this)}),b.push({type:"columnOptions"}),c.settings={options:{dropdownItems:b}},c.mediaDecoratorDropdown={},this.sandbox.sulu.initListToolbarAndList.call(this,"media","/admin/api/media/fields",{el:this.$find(h.toolbarSelector),instanceName:this.options.instanceName,template:this.sandbox.sulu.buttons.get(c)},{el:this.$find(h.datagridSelector),url:"/admin/api/media?orderBy=media.changed&orderSort=DESC&locale="+d.getMediaLocale()+"&collection="+this.options.id,view:a,pagination:d.getMediaListPagination(),resultKey:"media",sortable:!1,actionCallback:function(a){this.editMedia(a)}.bind(this),viewOptions:{table:{actionIconColumn:"name"}},paginationOptions:{"infinite-scroll":{reachedBottomMessage:"public.reached-list-end",scrollOffset:500}}})},startDropzone:function(){this.sandbox.start([{name:"dropzone@husky",options:{el:this.$find(h.dropzoneSelector),maxFilesize:a.get("sulu-media").maxFilesize,url:"/admin/api/media?collection="+this.options.id,method:"POST",paramName:"fileVersion",instanceName:this.options.instanceName}}])},moveMedia:function(a){this.sandbox.emit("husky.datagrid.items.get-selected",function(b){c.move(b,a.id)}.bind(this))},editMedias:function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){e.startEditMediaOverlay.call(this,a,d.getMediaLocale())}.bind(this))},editMedia:function(a){e.startEditMediaOverlay.call(this,[a],d.getMediaLocale())},deleteMedia:function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.sandbox.sulu.showDeleteDialog(function(b){b&&c["delete"](a)}.bind(this))}.bind(this))},disableDropzone:function(){this.sandbox.emit("husky.dropzone."+this.options.instanceName+".disable")},enableDropzone:function(){this.sandbox.emit("husky.dropzone."+this.options.instanceName+".enable")},loadComponentData:function(){return b.loadOrNew(this.options.id,d.getMediaLocale())},scrollHandler:function(){if("datagrid/decorators/masonry-view"===d.getMediaListView()){var a=this.sandbox.dom.scrollTop(h.scrollContainerSelector);a>90?this.$el.addClass(h.fixedClass):this.$el.removeClass(h.fixedClass)}}}});