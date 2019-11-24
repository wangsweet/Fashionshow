function Ajax(){
    this.create=function(){
        try{
            // throw "error";
            return new XMLHttpRequest();//不兼容低版本浏览器
        }catch(e){
            try{
                // throw "error";
                return new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                if(window.confirm("浏览器版本太LOW,下载最近版浏览器?")){
                    window.location.href="https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B8C926CC4-87C9-B771-C5FD-72891514CE07%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe";
                }
                return null;
            }
        }
    };
    this.format=function(_data){
        var _result="";
        if(typeof _data==="object"){
            for(var k in _data){
                _result+=k+"="+_data[k]+"&";
            }
            _result=/&$/g.test(_result)?_result.replace(/&$/g,""):_result;
        }else{
            _result=_data;
        }
        return _result;
    };
    this.request=function(_config){
        var _s=null;
        var _ajax=this.create();
        if(_ajax){
            _config.data=this.format(_config.data);
            _ajax.onreadystatechange=function(){
                if(_ajax.readyState===4 && _ajax.status===200){
                    _config.success(_ajax.responseText);
                }
            };
            _config.method=(_config.method && _config.method.toUpperCase()==="GET")?"GET":"POST";
            if(_config.method.toUpperCase()==="GET" && _config.data){
                _config.url+="?"+_config.data;
            }
            if(_config.method.toUpperCase()==="POST" && _config.data){
                _s=_config.data;
            }
            _ajax.open(_config.method,_config.url,_config.async===false?false:true);
            _ajax.setRequestHeader("Content-Type","Application/x-www-form-urlencoded;charset=utf-8;");
            _ajax.send(_s);
        }
    };
}