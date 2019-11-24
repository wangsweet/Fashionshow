let _yd;

function yd(_element) {
    this.timer;
    this.hz = 30;
    this.step = function (_css, _time) {
        this.times = _time / this.hz;
        for (var k in _css) {
            if (k !== "left" && k !== "top") {
                _element.style[k] = _css[k];
            } else {
                if (_css.left) {
                    this.hs = (parseInt(_css.left) - _element.offsetLeft) / this.times;
                }
                if (_css.top) {
                    this.vs = (parseInt(_css.left) - _element.offsetTop) / this.times;
                }
            }
        }
    }
    this.move = function (_css, _time, _fx) {
        var me = this;
        var counter = 1;
        this.step(_css, _time);
        this.timer = window.setInterval(function () {
            if (me.hs) {
                _element.style.left = _element.offsetLeft + me.hs + "px";
            }
            if (me.vs) {
                _element.style.top = _element.offsetTop + me.vs + "px";
            }
            if (counter++ > me.times) {
                if (me.hs) {
                    _element.style.left = _css.left;
                }
                if (me.vs) {
                    _element.style.top = _css.top;
                }
                window.clearInterval(me.timer);
                if (typeof _fx === "function") {
                    _fx();
                }
            }
        }, me.hz)

    }
    this.delay = function (_ms, _fx) {
        var _me = this;
        this.timer = window.setTimeout(function () {
            window.clearTimeout(_me.timer);
            _fx();
        }, _ms);
    }
    this.clear = function () {
        window.clearInterval(this.timer);
    }
}

function animation(n) {
    var _container = document.getElementById("demo").children[0];
    _yd = new yd(_container);
    _yd.move({
        left: -1200 * n + "px"
    }, 200, function () {
        _yd.delay(2000, function () {
            if (n >= 5) {
                _container.style.left = 0;
                n = -1;
            }
            animation(n + 1);

        })
    })
    lb(n);
}

function lb(n) {
    let _group = document.getElementById("de");
    for (let i = 0; i < _group.children.length; i++) {
        if (i == n) {
            _group.children[i].style.background = "#999";
        } else {
            _group.children[i].style.background = "rgba(255, 255, 255,0.5)";
        }
        _group.children[i].onclick = function () {
            _yd.clear();
            animation(i);
        }
    }
}
