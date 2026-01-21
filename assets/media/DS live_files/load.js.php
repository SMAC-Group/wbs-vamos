//Determine lang
var rrp_lang="en";
var rrp_allScripts=document.getElementsByTagName('script');
var rrp_script;
for(var i in rrp_allScripts) {
    rrp_script=rrp_allScripts[i];
    if(!rrp_script.src || rrp_script.src.indexOf("RRPublish/load.")<0) continue;
    var rrp_qs=rrp_script.src.split("?")[1].split("&");
    for(var i=0;i<rrp_qs.length;i++)
    {
        var q=rrp_qs[i].split("=");
        if(q[0]==="lang") rrp_lang=q[1];
    }
    break;
}

//Load scripts/css
var rrp_server="";
if(window.location.href.indexOf("my.raceresult.com")<0) rrp_server="https://my.raceresult.com";

var rrp_css=document.createElement("link");
rrp_css.rel="stylesheet";
rrp_css.type="text/css";
rrp_css.href=rrp_server+"/RRPublish/style.css?v=v1.0.565";
rrp_script.parentNode.insertBefore(rrp_css, rrp_script);

rrp_subscript=document.createElement("script");
rrp_subscript.type="text/javascript";
rrp_subscript.src=rrp_server+"/RRPublish/lang.js?lang="+rrp_lang+"&v=v1.0.565";
rrp_script.parentNode.appendChild(rrp_subscript);

rrp_subscript=document.createElement("script");
rrp_subscript.type="text/javascript";
rrp_subscript.src=rrp_server+"/RRPublish/RRPublish.js?v=v1.0.565";
rrp_script.parentNode.appendChild(rrp_subscript);

function RRPublish(parent, eventid, page, listToShow, contestToShow) {
	this.ShowInfoText=false;
	this.ShowTimerLogo=false;
	var me=this;
	window.addEventListener("load", function() {
		rrp=new RRPublish2(parent, eventid, page, listToShow, contestToShow);
		rrp.ShowInfoText=me.ShowInfoText;
		rrp.ShowTimerLogo=me.ShowTimerLogo;
	});
}