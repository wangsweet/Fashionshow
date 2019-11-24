function Storage() {
    this.take = function () {
        let _reg=/\bBK1917CART=\[(\{("\w+":"?[\w%\.]+"?,?\s*)+},?\s*)*]/g;
        this.storage = document.cookie;
        if (_reg.test(this.storage)) {
            this.storage = this.storage.match(_reg)[0].replace(/\bBK1917CART=/g, "");
            this.storage = JSON.parse(this.storage);
        } else {
            this.storage = [];
        }
        return this.storage;
    }
    this.save = function () {
        document.cookie = "BK1917CART=" + JSON.stringify(this.storage) + ";path=/;expires=" + new Date(new Date().getTime() + 7 * 24 * 3600000);
    }
}

function Cart() {
    this.push = function (_id, _counter, _comment) {
        let _has = 0;
        this.take();
        if (/^\d+$/g.test(_counter + "")) {
            for (let i = 0; i < this.storage.length; i++) {
                if (this.storage[i].id === _id && encodeURIComponent(_comment) === this.storage[i].comment) {
                    this.storage[i].counter += _counter;
                    _has = 1;
                    break;
                }
            }
            if (_has === 0) {
                this.storage.push({
                    id: _id,
                    counter: _counter,
                    comment: encodeURIComponent(_comment)
                });
            }
            this.save();
        }
    }
    this.remove = function (_id, _comment) {
        this.take();
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_comment)) {
                this.storage.splice(i, 1);
                this.save();
                break;
            }
        }
    }
    this.reduce = function (_id, _counter, _comment) {
        this.take();
        if (/^\d+$/g.test(_counter + '')) {
            for (let i = 0; i < this.storage.length; i++) {
                if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_comment)) {
                    if (this.storage[i].counter > _counter) {
                        this.storage[i].counter -= _counter;
                    } else {
                        this.storage.splice(i,1);
                    }
                    this.save();
                    break;
                }
            }
        }
    }
    this.reset = function (_id, _counter, _comment) {
                this.take();
                if (/^[1-9]\d*$/.test(_counter + "")) {
                    for (var i = 0; i < this.storage.length; i++) {
                        if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_comment)){
                            this.storage[i].counter = _counter;
                            this.save();
                            break;
                        }
                    }
                } else {
                    alert("输入数量有误");
                }
            }
    this.clear = function () {
        this.take();
        this.storage = [];
        this.save();
    }

}
Cart.prototype = new Storage();

function Summary() {
    this.sum = function () {
        let _sum = 0;
        this.take();
        for (let i = 0; i < this.storage.length; i++) {
            _sum += this.storage[i].counter;
        }
        return _sum;
    }
}
Summary.prototype = new Cart();