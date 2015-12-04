function GetPluginSettings(){return{name:"Node Downloader",id:"NodeDownloader",version:"1.0.0",description:"A plugin for construct 2 to download files to disk (in NW.js or Electron).",author:"Mojtaba Qasemzade Tehrany","help url":"https://github.com/sabereen/Construct2-Plugins/blob/master/nodeDownloader/README.md",category:"Platform specific",type:"object",flags:pf_singleglobal}}function CreateIDEObjectType(){return new IDEObjectType}function IDEObjectType(){assert2(this instanceof arguments.callee,"Constructor called as a function")}function IDEInstance(e,n){assert2(this instanceof arguments.callee,"Constructor called as a function"),this.instance=e,this.type=n,this.properties={};for(var t=0;t<property_list.length;t++)this.properties[property_list[t].name]=property_list[t].initial_value}AddStringParam("Tag","A tag, which can be anything you like, to distinguish between different files."),AddCondition(0,cf_trigger,"On completed","Download","On download <b>{0}</b> finished","On download completed","OnFinished"),AddStringParam("Tag","A tag, which can be anything you like, to distinguish between different files."),AddCondition(1,cf_trigger,"On progress","Download","On chunk data for <b>{0}</b> recieved.","On chunk data recieved","OnProgress"),AddStringParam("Tag","A tag, which can be anything you like, to distinguish between different files."),AddCondition(2,cf_trigger,"On error","Download","On error in <b>{0}</b>","on error ocurs","OnError"),AddStringParam("Tag","A tag, which can be anything you like, to distinguish between different files."),AddStringParam("URL","Enter the URL of file",'"http://"'),AddStringParam("Path","Where to save downloaded file."),AddAction(0,af_none,"Start download a file","Download","Start downloading <b>{0}</b> from url <i>{1}</i> to <i>{2}</i>","Start downloading a file","StartDownload"),AddExpression(0,ef_return_number,"percent","Download","Percent","Percent of download file"),AddStringParam("tag","A tag, which can be anything you like, to distinguish between different files."),AddExpression(1,ef_return_number,"total size","Download","TotalSize","Total size of the file, in bytes."),ACESDone();var property_list=[];IDEObjectType.prototype.CreateInstance=function(e){return new IDEInstance(e)},IDEInstance.prototype.OnInserted=function(){},IDEInstance.prototype.OnDoubleClicked=function(){},IDEInstance.prototype.OnPropertyChanged=function(e){},IDEInstance.prototype.OnRendererInit=function(e){},IDEInstance.prototype.Draw=function(e){},IDEInstance.prototype.OnRendererReleased=function(e){};