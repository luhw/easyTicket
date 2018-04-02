
export const autoSize = (size) => {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    return size * 320 / 320 / 20 + 'rem'
  }
  return size + 'px'
}


export const getParam = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}


export const formatParams = (function() {
    var Type = {}

    for (var i = 0, type; type = ['Array', 'Object'][i++];) {
        (function(type) {
            Type['is' + type] = function(obj) {
                return Object.prototype.toString.call(obj) == '[object ' + type + ']'
            }
        }(type))
    }

    return function format(params) {
	    var store = {}
		
        for (var key in params) {
            if (Type.isObject(params[key]) || Type.isArray(params[key])) {
                for (var innerKey in params[key]) {
                    if (params[key].hasOwnProperty(innerKey)) {
		                store[key + '[' + innerKey + ']'] = params[key][innerKey]
		            }
                }
            } else {
                store[key] = params[key]
            }
        }

        function check() {
            for (var key in store) {
                if (store.hasOwnProperty(key)) {
                    if (Type.isObject(store[key]) || Type.isArray(store[key])) {
                        return format(store)
                    }
                }
            }

            return store
        }

        return check()
    }
}())