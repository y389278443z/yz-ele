
export function formate(date, fmt) {
    let time = date instanceof Date ? date : new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear()+'').slice(-RegExp.$1.length));
    }

    let obj = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds()
    }

    for (let i in obj) {
        if (new RegExp(`(${i})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, obj[i] < 10 ? '0'+ obj[i] : obj[i])
        }
    }
    return fmt;

}


export function getStorage(key) {
    if (!key) return;
    return window.localStorage.getItem(key)
}

export function setStorage(key, val) {
    if (typeof val !== 'string') {
        val = JSON.stringify(val);
    }
    window.localStorage.setItem(key, val)
}


export function removeStorage(key) {
    if (!key) return;
    window.localStorage.removeItem(key);
}

export function getStyle(el, attr, numType = 'int') {
    let result;
    if (attr === 'scrollTop') {
        result = el.scrollTop;
    } else if (el.currentStyle) {
        result = el.currentStyle[attr];
    } else {
        result = document.defaultView.getComputedStyle(el, null)[attr];
    }
    return numType === 'float' ? parseFloat(result) : parseInt(result);
}

export function loadMore(el, promise) {
    let screenHeight = window.screen.height,
        offsetTop,
        marginBottom,
        paddingBottom,
        height,
        isDoing = true;

    function handler() {
        height = el.offsetHeight;
        if (isDoing) {
            marginBottom = getStyle(el, 'marginBottom');
            offsetTop = el.offsetTop;
            paddingBottom = getStyle(el, 'paddingBottom');
            if (document.documentElement.scrollTop + screenHeight >= height + offsetTop + marginBottom + paddingBottom) {
                isDoing = false;
                promise().then((res) => {
                    if (res == 'noMore') {
                        isDoing = false;
                        window.removeEventListener('scroll', handler);
                    } else {
                        isDoing = true;
                    }
                })

            }
        }
    }
    window.addEventListener('scroll', handler);
    return handler;
}
