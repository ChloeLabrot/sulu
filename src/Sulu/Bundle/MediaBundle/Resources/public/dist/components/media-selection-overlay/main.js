define(["config","sulumedia/collections/collections","sulumedia/models/collection","services/sulumedia/user-settings-manager"],function(a,b,c,d){"use strict";var e={eventNamespace:"sulu.media-selection-overlay",preselectedIds:[],instanceName:null,types:null},f={lastVisitedCollectionKey:"last-visited-collection",listViewStorageKey:"mediaOverlayListView"},g=function(){return l.call(this,"open")},h=function(){return l.call(this,"close")},i=function(){return l.call(this,"set-selected")},j=function(){return l.call(this,"record-selected")},k=function(){return l.call(this,"record-deselected")},l=function(a){return this.options.eventNamespace+"."+(this.options.instanceName?this.options.instanceName+".":"")+a},m={overlayContent:['<div class="media-selection-overlay">','   <div class="media-selection-overlay-navigation-container pull-left"></div>','   <div class="media-selection-overlay-content">','       <div class="fa-times media-selection-overlay-close"></div>','       <div class="media-selection-overlay-dropzone-container"></div>','       <h2 class="media-selection-overlay-content-title content-title"><%= title %></h2>','       <div class="media-selection-overlay-content-area" ondragstart="return false;">','           <div class="media-selection-overlay-datagrid-header" ondragstart="return false;">','               <div class="media-selection-overlay-toolbar-container"></div>','               <div id="selected-images-count" class="media-selection-overlay-selected-info"></div>',"           </div>",'           <div class="media-selection-overlay-datagrid-container"></div>',"       </div>","   </div>","</div>"].join(""),mediaSelectedInfo:"<%= selectedCounter %> <%= selectedImagesLabel %>"},n=function(){this.sandbox.dom.scrollAnimate(this.sandbox.dom.height(".media-selection-overlay-content-area"),".media-selection-overlay-content-area")},o=function(a){for(var b=-1,c=a.length;++b<c;)a[b].selected=!0;this.sandbox.emit("husky.datagrid.media-selection-overlay."+this.options.instanceName+".records.add",a,n.bind(this)),this.sandbox.emit("husky.data-navigation."+this.options.instanceName+".collections.reload")},p=function(a){var b,c=this.sandbox.translate("media-selection.overlay.all-medias");a?(b=a.id,c=a.title,this.sandbox.emit("husky.toolbar.media-selection-overlay."+this.options.instanceName+".item.show","add"),this.sandbox.emit("husky.dropzone.media-selection-overlay."+this.options.instanceName+".enable")):(this.sandbox.emit("husky.toolbar.media-selection-overlay."+this.options.instanceName+".item.hide","add"),this.sandbox.emit("husky.dropzone.media-selection-overlay."+this.options.instanceName+".disable")),this.sandbox.emit("husky.datagrid.media-selection-overlay."+this.options.instanceName+".url.update",{collection:b,page:1}),s.call(this,b),this.$el.find(".media-selection-overlay-content-title").html(c)},q=function(a){var b="",c="";a&&(c=1===a?this.sandbox.translate("media-selection.overlay.selected-image-label"):this.sandbox.translate("media-selection.overlay.selected-images-label"),b=this.sandbox.util.template(m.mediaSelectedInfo,{selectedCounter:a,selectedImagesLabel:c})),this.$el.find("#selected-images-count").html(b)},r=function(){this.sandbox.on(g.call(this),function(){this.sandbox.emit("husky.overlay."+this.options.instanceName+".open")}.bind(this)),this.sandbox.on(h.call(this),function(){this.sandbox.emit("husky.overlay."+this.options.instanceName+".close")}.bind(this)),this.sandbox.on(i.call(this),function(a){a=a||[],this.options.preselectedIds=a,this.sandbox.emit("husky.datagrid.media-selection-overlay."+this.options.instanceName+".selected.update",a),q.call(this,(a||[]).length)}.bind(this)),this.sandbox.on("husky.datagrid.media-selection-overlay."+this.options.instanceName+".item.select",function(a,b){this.sandbox.emit(j.call(this),a,b)}.bind(this)),this.sandbox.on("husky.datagrid.media-selection-overlay."+this.options.instanceName+".item.deselect",function(a){this.sandbox.emit(k.call(this),a)}.bind(this)),this.sandbox.on("husky.datagrid.media-selection-overlay."+this.options.instanceName+".number.selections",function(a){q.call(this,a)}.bind(this)),this.sandbox.on("husky.data-navigation."+this.options.instanceName+".select",p.bind(this)),this.sandbox.on("husky.dropzone.media-selection-overlay."+this.options.instanceName+".files-added",function(a){this.sandbox.emit("sulu.labels.success.show","labels.success.media-upload-desc","labels.success"),o.call(this,a)}.bind(this)),this.sandbox.on("sulu.toolbar.media-selection-overlay."+this.options.instanceName+".add",function(){this.sandbox.emit("husky.dropzone.media-selection-overlay."+this.options.instanceName+".open-data-source")}.bind(this)),this.sandbox.on("husky.overlay.dropzone-media-selection-overlay."+this.options.instanceName+".opened",function(){this.$el.find(".media-selection-overlay-container").addClass("dropzone-overlay-opened")}.bind(this)),this.sandbox.on("husky.overlay.dropzone-media-selection-overlay."+this.options.instanceName+".closed",function(){this.$el.find(".media-selection-overlay-container").removeClass("dropzone-overlay-opened")}.bind(this)),this.sandbox.on("sulu.toolbar.change.table",function(){d.setMediaListView("table"),d.setMediaListPagination("dropdown"),this.sandbox.emit("husky.datagrid.media-selection-overlay."+this.options.instanceName+".change",1,d.getDropdownPageSize(),"table",[],"dropdown")}.bind(this)),this.sandbox.on("sulu.toolbar.change.masonry",function(){d.setMediaListView("datagrid/decorators/masonry-view"),d.setMediaListPagination("infinite-scroll"),this.sandbox.emit("husky.datagrid.media-selection-overlay."+this.options.instanceName+".change",1,d.getInfinityPageSize(),"datagrid/decorators/masonry-view",null,"infinite-scroll")}.bind(this))},s=function(a){this.uploadCollection=a,this.sandbox.emit("husky.dropzone.media-selection-overlay."+this.options.instanceName+".change-url","/admin/api/media?collection="+a)},t=function(){var b=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,b),this.listView=this.sandbox.sulu.getUserSetting(f.listViewStorageKey)||"thumbnailSmall",this.sandbox.start([{name:"overlay@husky",options:{dragTrigger:".media-selection-overlay-navigation-container",removeOnClose:!1,el:b,container:this.$el,cssClass:"media-selection-overlay-container",instanceName:this.options.instanceName,skin:"wide",supportKeyInput:!1,slides:[{data:this.sandbox.util.template(m.overlayContent,{title:this.sandbox.translate("media-selection.overlay.all-medias")})}]}}]),this.sandbox.once("husky.overlay."+this.options.instanceName+".opened",function(){this.$el.on("click",".media-selection-overlay-close",function(){this.sandbox.emit("husky.overlay."+this.options.instanceName+".close")}.bind(this)),this.sandbox.start([{name:"data-navigation@husky",options:{el:this.$el.find(".media-selection-overlay-navigation-container"),resultKey:"collections",showAddButton:!1,rootUrl:"/admin/api/collections?sortBy=title",url:"/admin/api/collections?sortBy=title",nameKey:"title",instanceName:this.options.instanceName,globalEvents:!1,translates:{noData:this.sandbox.translate("navigation.media.collections.empty"),title:this.sandbox.translate("navigation.media.collections"),addButton:"",search:this.sandbox.translate("navigation.media.collections.search")}}}]);var b=this.sandbox.sulu.buttons.get({add:{options:{id:"add",title:this.sandbox.translate("media-selection.list-toolbar.upload-info"),hidden:!0,callback:function(){this.sandbox.emit("husky.dropzone.media-selection-overlay."+this.options.instanceName+".open-data-source")}.bind(this)}},mediaDecoratorDropdown:{options:{id:"change",dropdownOptions:{markSelected:!0}}}});this.sandbox.sulu.initListToolbarAndList.call(this,"mediaOverlay",[{name:"id",translation:"public.id",disabled:!0,"default":!1,sortable:!0},{name:"thumbnails",translation:"media.media.thumbnails",disabled:!1,"default":!0,sortable:!0,type:"thumbnails"},{name:"title",translation:"public.title",disabled:!1,"default":!1,sortable:!0,type:"title"},{name:"size",translation:"media.media.size",disabled:!1,"default":!0,sortable:!0,type:"bytes"}],{el:this.$el.find(".media-selection-overlay-toolbar-container"),instanceName:"media-selection-overlay."+this.options.instanceName,showTitleAsTooltip:!1,template:b},{el:this.$el.find(".media-selection-overlay-datagrid-container"),url:"/admin/api/media?orderBy=media.changed&orderSort=DESC"+(this.options.types?"&types="+this.options.types:""),view:d.getMediaListView(),pagination:d.getMediaListPagination(),resultKey:"media",instanceName:"media-selection-overlay."+this.options.instanceName,preselected:this.options.preselectedIds,sortable:!1,viewSpacingBottom:180,viewOptions:{table:{actionIconColumn:"name"},"datagrid/decorators/masonry-view":{unselectOnBackgroundClick:!1}},paginationOptions:{"infinite-scroll":{reachedBottomMessage:"public.reached-list-end",scrollContainer:".media-selection-overlay-content-area",scrollOffset:500}}}),this.sandbox.start([{name:"dropzone@husky",options:{el:this.$el.find(".media-selection-overlay-dropzone-container"),maxFilesize:a.get("sulu-media").maxFilesize,url:"/admin/api/media",method:"POST",paramName:"fileVersion",instanceName:"media-selection-overlay."+this.options.instanceName,dropzoneEnabled:!1,cancelUploadOnOverlayClick:!0}}])}.bind(this))};return{initialize:function(){this.options=this.sandbox.util.extend(!0,{},e,this.options),this.collections=new b,this.newCollection=new c,this.collectionArray=null,this.newCollectionId=null,this.uploadCollection=null,r.call(this),t.call(this)}}});