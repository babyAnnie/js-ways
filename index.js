// @ts-nocheck

// 全屏函数：输入：元素id。无返回。
export const fullscreen = (id) => {
  const elem = document.getElementById(id)
  if (!elem) return
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

// 退出全屏函数：无输入，无返回。
export const exitFullscreen = () => {
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// 监听全屏状态下的F11键盘事件：输入监听时要运行函数，返回一个退出监听函数。
export const monitorFullscreen = (fn = () => { }) => {
  if (document.addEventListener) {
    document.addEventListener('webkitfullscreenchange', fn, false);
    document.addEventListener('mozfullscreenchange', fn, false);
    document.addEventListener('fullscreenchange', fn, false);
    document.addEventListener('MSFullscreenChange', fn, false);
  }
  return () => {
    if (d.removeEventListener) {
      d.removeEventListener('webkitfullscreenchange', fn, false);
      d.removeEventListener('mozfullscreenchange', fn, false);
      d.removeEventListener('fullscreenchange', fn, false);
      d.removeEventListener('MSFullscreenChange', fn, false);
    }
  }
}

// 统一存储数据到浏览器。要求存储的数据为json格式。输入：存储的键值。返回存储对象。
export const unifiedStorage = (name) => {
  return {
    get(key = '') {
      const str = localStorage.getItem(name);
      let obj = {};
      try {
        obj = JSON.parse(str);
      } catch { }
      return key ? (obj?.[key] ?? '') : obj;
    },
    set(saveData = {}) {
      localStorage.setItem(name, JSON.stringify({ ...this.get(), ...saveData }));
    },
    clear(key = '') {
      if (key) {
        const str = localStorage.getItem(name);
        let obj = {};
        try {
          obj = JSON.parse(str);
          if (!obj) return
          delete obj?.[key];
          localStorage.setItem(name, JSON.stringify(obj));
        } catch { }
      } else {
        localStorage.removeItem(name);
      }
    }
  };
}

// 时间个位数变两位数。输入1-2位数，输出2位数的字符串
export const oneBecomesTwo = (num) => {
  if (!num) return ''
  if (typeof num === 'number') {
    return num < 10 ? `0${num}` : `${num}`;
  } else {
    try {
      const newNum = Number(num);
      if (isNaN(newNum)) return num;
      return newNum < 10 ? `0${newNum}` : `${newNum}`;
    } catch { }
  }
}

// 处理日期格式函数。0：处理年月日，1：处理时分秒。
export const formatDate = (obj = {}) => {
  if (typeof obj !== 'object') return '';
  const { date = new Date(), joiner = '/', type = 0 } = obj;
  if (!date) return ''
  let m = date.getMonth() + 1, d = date.getDate(), h = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
  m = oneBecomesTwo(m);
  d = oneBecomesTwo(d);
  h = oneBecomesTwo(h);
  minute = oneBecomesTwo(minute);
  second = oneBecomesTwo(second);
  switch (type) {
    case 1:
    case '1':
      return `${h}${joiner}${minute}${joiner}${second}`;
    default:
      return `${date.getFullYear()}${joiner}${m}${joiner}${d}`;
  }
};

// 生成随机唯一id。输入布尔值，返回字符串ID
export const generateID = (random = false) => {
  if (random) {
    return Math.random().toString(36).slice(2);
  }
  return Date.now().toString(36);
}

// 下载数据到本地（xlsx，csv，txt）：输入数组，无返回。
export const downloadData = (obj = {}) => {
  if (!obj) return
  const { jsonArr = [], fileName = '', columnHeader = '', suffix = 'xls' } = obj;
  let str = `${columnHeader}\n`;
  for (const v of jsonArr) {
    for (const item in v) {
      str += `${v[item]}\t,`;
    }
    str += '\n';
  }
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  let link = document.createElement("a");
  link.href = uri;
  link.download = `${fileName}.${suffix}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// 防抖函数
/**  应用场景:
(1) 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询ajax请求，这样可以有效减少请求次数，节约请求资源；
(2) window的resize、scroll事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次；
 在一定的时间内，多次执行同一个函数，只会触发一次
 * @param {*} fn 需要防抖的函数
 * @param {*} delay 时间
 */
export const debounce = (obj = {}) => {
  if (!obj) return () => { }
  const { fn = () => { }, delay = 1500 } = obj;
  return function (args) {
    //获取函数的作用域和变量
    let that = this
    let _args = args
    //每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
    clearTimeout(fn.id)
    fn.id = setTimeout(function () {
      fn.call(that, _args)
    }, delay)
  }
}


//节流函数
/**
* 应用场景:
(1)鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；
(2)在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次 ajax 请求，而不是在用户停下滚动页面操作时才去请求数据；
(3)监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断；
* 在一定时间内，多次执行同一个函数，只有第一次执行才会触发
* @param {*} fn 需要防抖的函数
* @param {*} delay 时间
*/
export const throttle = (obj = {}) => {
  if (!obj) return () => { }
  const { fn = () => { }, delay = 1500 } = obj;
  return function (args) {
    let that = this;
    let _args = args;
    let now = +new Date();
    if (!fn.last) {
      fn.last = now;
      fn.apply(that, _args);
    } else if (now < fn.last + delay) {
      clearTimeout(fn.deferTimer);
      fn.deferTimer = setTimeout(function () {
        fn.last = now;
        fn.apply(that, _args);
      }, delay)
    } else {
    }
  }
}


// 判断数据类型
export const getValueType = (v) => {
  return Object.prototype.toString.call(v).slice(8, -1)
}

// 取消冒泡的兼容代码
export const stopBubble = (e) => {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
}

// 获取url上的参数
export const getUrlParam = (obj = {}) => {
  if (!obj) return ''
  const { url = '', key = '', getObj = false } = obj;
  if (!url) return ''
  const u = new URL(url),
    searchParams = new URLSearchParams(u.search);
  if (getObj) {
    const p = /(\w+)=/g;
    let result = {},
      keys = url.match(p);
    keys = keys ? Array.from(keys) : []
    for (let elem of keys) {
      const v = elem.slice(0, -1)
      result[v] = searchParams.get(v)
    }
    return result;
  }
  return searchParams.get(key) ?? ''
}


// 验证邮箱的正则表达式
export const isAvailableEmail = (email = '') => {
  const reg = /^([\w+\.])+@\w+([.]\w+)+$/;
  return reg.test(email)
}

// 函数柯里化
//是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术
function currying(fn, ...rest1) {
  return function (...rest2) {
    return fn.apply(null, rest1.concat(rest2))
  }
}
export const curryIt = (obj = {}) => {
  const { fn = () => { }, len = undefined } = obj;
  const length = len ?? fn.length  // 第一遍运行length是函数fn一共需要的参数个数，以后是剩余所需要的参数个数
  return function (...rest) {
    return rest.length >= length    // 检查是否传入了fn所需足够的参数
      ? fn.apply(this, rest)
      : curryIt(currying.apply(this, [fn].concat(rest)), length - rest.length)        // 在通用currying函数基础上
  }
}
// 测试函数柯里化
// function sayHello(name, age, fruit) {
//   console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`)
// }
// const betterShowMsg = curryIt(sayHello)
// betterShowMsg('小衰', 20, '西瓜')      // 我叫 小衰,我 20 岁了, 我喜欢吃 西瓜
// betterShowMsg('小猪')(25, '南瓜')      // 我叫 小猪,我 25 岁了, 我喜欢吃 南瓜
// betterShowMsg('小明', 22)('倭瓜')      // 我叫 小明,我 22 岁了, 我喜欢吃 倭瓜
// betterShowMsg('小拽')(28)('冬瓜')      // 我叫 小拽,我 28 岁了, 我喜欢吃 冬瓜


// 判断china身份证城市
export const getIDCity = (judgeID = '') => {
  if (!judgeID || judgeID?.toString()?.length < 2) return '';
  const aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
  return aCity?.[parseInt(judgeID.slice(0, 2))] ?? ''
}

// 劫持粘贴板
// Document.execCommand()是操作剪贴板的传统方法，各种浏览器都支持。不推荐，已过时。支持复制、剪切和粘贴这三个操作。'copy'：复制，'cut'：剪切，'paste'：粘贴，
// Clipboard 对象提供了四个方法，用来读写剪贴板。它们都是异步方法，返回 Promise 对象。
export const copyToClipboard = (obj = {}) => {
  if (!obj) return;
  const { value = '', callback = () => { } } = obj;
  if (!value) return;
  if (navigator?.clipboard) {
    async function getClipboardContents() {
      try {
        await navigator.clipboard.writeText(value);
        if (callback) {
          callback()
        }
      }
      catch { }
    }
    getClipboardContents()
  } else {
    let textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (callback && successful) {
        callback()
      }
    } catch { }
    document.body.removeChild(textArea);
  }
}


// 判断元素是否在视野范围内
export const isInViewport = (id) => {
  const el = document.getElementById(id);
  if (!el) return false;
  const { top, left, bottom, right } = el.getBoundingClientRect(),
    { innerHeight, innerWidth } = window;
  return (top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth) ?? false;
}

// 获取滚动元素的滚动坐标
export const getScrollCoordinates = (id) => {
  const el = document.getElementById(id) ?? window;
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  }
};


// 判断是否是地址
export const isURL = (url) => {
  return /^http[s]?:\/\/.*/.test(url)
}


// 多维数组扁平化
export const flattenArray = (arr = []) => {
  if (!Array.isArray(arr)) return []
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? flattenArray(cur) : cur),
    []
  )
};


// 数组分块
export const chunkArray = (arr = [], size = 1) => {
  if (!Array.isArray(arr)) return [[]]
  return arr.reduce(
    (res, cur) => (
      res[res.length - 1].length < size
        ? res[res.length - 1].push(cur)
        : res.push([cur]),
      res
    ),
    [[]]
  );
};

// 字符统计
export const countChar = (str = '') => {
  if (typeof str !== 'string') return {}
  str = str.split("");
  return str.reduce((record, c) => {
    record[c] = (record?.[c] ?? 0) + 1;
    return record;
  }, {});
};


// 成随机的十六进制颜色
export const generateHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`;