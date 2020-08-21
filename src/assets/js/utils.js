const utils = {
    getObj: function (id) {
        return document.getElementById(id);
    },

    getInner: function (id) {
        return this.getObj.innerHTML;
    },

    setInner: function (id, inner) {
        this.getObj(id).innerHTML = inner;
    },

    addInner: function (id, inner) {
        let obj = this.getObj(id);
        obj.innerHTML = obj.innerHTML + inner;
    },
  
    getDomain: function (_url) {
      _url = _url.split("://")[1] || _url;
      _url = _url.split("/")[0];
      return _url;
    }
}

const scanners = [];

function setResult (result) {
    for (let scanner of scanners) {
      scanner(result.result);
    }
  }
  
function addScanner(callback) {
    scanners.push(callback);
}