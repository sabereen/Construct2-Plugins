// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.NodeDownloader = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
    var http = "";
    var https = "";
    var fs = "";
	/////////////////////////////////////
	var pluginProto = cr.plugins_.NodeDownloader.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;

		// any other properties you need, e.g...
		// this.myValue = 0;
        this.curTag = "";
        this.progress = 0;
        this.size = {};
        if (typeof require === "function") {
			this.enable = true;
			http = require('http');
			https = require('https');
			fs = require('fs');
			if (typeof https === "undefined" || typeof http === "undefined" || typeof fs === "undefined")
				this.enable = false;
        } else {
			this.enable = false;
        }
	};

	var instanceProto = pluginProto.Instance.prototype;

    instanceProto.startDownload = function (tag, url, path) {
        if (!this.enable) {
            this.curTag = tag;
            this.runtime.trigger(pluginProto.cnds.OnError, this);
            console.log("Platform is not NW.js or Electron");
            return;
        }
	    
	var client = http;
	if (url.toString().indexOf("https") === 0){
            client = https;
	}

        var self = this,        
            file = fs['createWriteStream'](path)
        var req = client.get(url, function (res) {
            self.size[tag] = Number(res['headers']['content-length'])
            res['pipe'](file)
            var received = 0
            res['on']('data', function (chunk) {
                received += chunk.length
                self.curTag = tag
                self.progress = Math.round(100*received/self.size[tag])
                self.runtime.trigger(pluginProto.cnds.OnProgress, self)
            })
            res['on']('end', function () {
                self.curTag = tag
                self.runtime.trigger(pluginProto.cnds.OnFinished, self)
                delete self.size[tag];
            })
            res['on']('error', function (err) {
                self.curTag = tag
                self.runtime.trigger(pluginProto.cnds.OnError, self)
                console.log(err)
            })
        })
        req['on']('error', function (e) {
            self.curTag = tag
            self.runtime.trigger(pluginProto.cnds.OnError, self)
            console.log(e)
        })

    };
    /****/
	// called whenever an instance is created
	instanceProto.onCreate = function ()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
	};

	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};

	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};

	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};

	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function (ctx)
	{
	};

	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.**/
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property

				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};

	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		//if (name === "My property")
		//	this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {}

	// the example condition
	Cnds.prototype.OnError = function (tag)
	{
        return cr.equals_nocase(tag, this.curTag);
	};

    Cnds.prototype.OnProgress = function (tag)
    {
        return cr.equals_nocase(tag, this.curTag);
    }

    Cnds.prototype.OnFinished = function (tag)
    {
        return cr.equals_nocase(tag, this.curTag);
    }

	// ... other conditions here ...

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {}

    Acts.prototype.StartDownload = function (tag, url, path)
	{
		this.startDownload(tag, url, path);
	};

	// ... other actions here ...

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {}

	Exps.prototype.Percent = function (ret)	// 'ret' must always be the first parameter - always return the expression's result through it!
	{
		ret.set_int(this.progress);				// return our value
		// ret.set_float(0.5);			// for returning floats
		// ret.set_string("Hello");		// for ef_return_string
		// ret.set_any("woo");			// for ef_return_any, accepts either a number or string
	};

    Exps.prototype.TotalSize = function (ret, tag) {
        if (this.size.hasOwnProperty(tag)) {
            ret.set_int(this.size[tag]);
        } else {
            ret.set_int(-1);
        }
    }

	// ... other expressions here ...

	pluginProto.exps = new Exps();

}());
