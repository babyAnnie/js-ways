# :desktop_computer: 工作方法库<span id="top"></span>

[中文](https://github.com/babyAnnie/js-ways/blob/master/README.md) | [English](https://github.com/babyAnnie/js-ways/blob/master/README.en.md)

[![Version](https://runkit.io/bokub/npm-version/branches/master/js-ways?style=flat)](https://www.npmjs.com/package/js-ways)
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/babyAnnie/js-ways/blob/master/LICENSE)
![](https://visitor-badge.glitch.me/badge?page_id=babyAnnie.js-ways)

|     Method name                             | Describe              |
| ------------------------------------------- | --------------------- |
|[chunkArray](#chunkArray)                    |  数组分块              |
|[copyToClipboard](#copyToClipboard)          |  劫持粘贴板            |
|[countChar](#countChar)                      |  字符统计              |
|[curryIt](#curryIt)                          |  函数柯里化            |
|[debounce](#debounce)                        |  防抖                  |
|[downloadData](#downloadData)                |  下载数据成文件到本地   |  
|[exitFullscreen](#exitFullscreen)            |  退出全屏              |
|[flattenArray](#flattenArray)                |  多维数组扁平化        | 
|[formatDate](#formatDate)                    |  处理日期格式函数       |
|[fullscreen](#fullscreen)                    |  使元素全屏            |
|[generateHexColor](#generateHexColor)        |  成随机的十六进制颜色   |
|[generateID](#generateID)                    |  获取随机唯一ID         |
|[getIDCity](#getIDCity)                      |  获取身份证城市         |
|[getScrollCoordinates](#getScrollCoordinates)|  获取滚动的坐标         |
|[getUrlParam](#getUrlParam)                  |  获取地址的参数         |
|[getValueType](#getValueType)                |  获取数据类型           |
|[isAvailableEmail](#isAvailableEmail)        |  验证邮箱格式           |
|[isInViewport](#isInViewport)                |  判断元素是否在视野范围内 |
|[isURL](#isURL)                              |  是否是地址              |
|[monitorFullscreen](#monitorFullscreen)      |  监听全屏状态下的F11键盘事件|
|[oneBecomesTwo](#oneBecomesTwo)              |  时间个位数变两位数     |
|[stopBubble](#stopBubble)                    |  取消冒泡的兼容代码     |
|[throttle](#throttle)                        |  节流                 |
|[unifiedStorage](#unifiedStorage)            |  统一存储数据到浏览器   |

<br/>

## 代码演示

### **chunkArray(arr, size)** <span id="chunkArray"></span> 
 - arr: array
 - size: number
<br/>

:hibiscus: Example:
```js
import { chunkArray } from 'js-ways';

const arr = [1, 2, 3, 4, 5, 6, 7];
const size = 5;
const v = chunkArray(arr, size);
console.log('v', v);
// Output: [[1, 2, 3, 4, 5], [6, 7]]
```
[:top: top](#top)


### **copyToClipboard({ value, callback})** <span id="copyToClipboard"></span> 
 - value: string
 - callback: function
<br/>

:hibiscus: Example:
```js
import { copyToClipboard } from 'js-ways';

copyToClipboard({
  value: 'test copyToClipboard...',
  callback: () => {
    console.log('Copy end.');
  }
})
// Output: Copy end.
// Others: 内容已经设置到粘贴板
```
[:top: top](#top)


### **countChar(str)** <span id="countChar"></span> 
 - str: string 
<br/>

:hibiscus: Example:
```js
import { countChar } from 'js-ways';

const c = countChar('你好 我是燕燕')
console.log('c', c)
// Output: { "你": 1, "好": 1, " ": 1, "我": 1, "是": 1, "燕": 2 }
```
[:top: top](#top)


### **curryIt(fn)** <span id="curryIt"></span>  
 - fn: function
<br/>

:hibiscus: Example:
```js
import { curryIt } from 'js-ways';

function sayHello(name, age, fruit) {
  console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`);
}
const betterShowMsg = curryIt(sayHello);
betterShowMsg('小小', 20, '西瓜');
betterShowMsg('阿棱')(25, '葡萄');
betterShowMsg('明明', 22)('苹果');
betterShowMsg('小红')(28)('牛油果');

/* Output: 
我叫 小小,我 20 岁了, 我喜欢吃 西瓜
我叫 阿棱,我 25 岁了, 我喜欢吃 葡萄
我叫 明明,我 22 岁了, 我喜欢吃 苹果
我叫 小红,我 28 岁了, 我喜欢吃 牛油果
*/
```
[:top: top](#top)


### **debounce({fn, delay})** <span id="debounce"></span> 
 - fn: function
 - delay: number 
<br/>

:hibiscus: Example:
```js
import { debounce } from 'js-ways';

const fn = () => console.log(`❤❤❤❤❤❤❤❤❤❤❤❤${new Date()}❤❤❤❤❤❤❤❤❤❤❤❤`);

debounce({
  fn,
  delay: 3000
})()
// Output: ❤❤❤❤❤❤❤❤❤❤❤❤Tue Jun 21 2022 10:43:34 GMT+0800 (中国标准时间)❤❤❤❤❤❤❤❤❤❤❤❤
```
[:top: top](#top)


### **downloadData({jsonArr, fileName, columnHeader, suffix})** <span id="downloadData"></span> 
 - jsonArr: array
 - fileName: string
 - columnHeader: string
 - suffix: "xlsx"(default)/"csv"/"txt"
<br/>

:hibiscus: Example:
```js
import { downloadData } from 'js-ways';

downloadDataToLocal({
  jsonArr: [
    {
      name: '阿棱',
      age: 20
    },
    {
      name: '明明',
      age: 3
    },
    {
      name: '小红',
      age: 35
    },
  ],
  fileName: '❤',
  columnHeader: '名字,\t年龄',
  suffix: 'txt'
})
// Output: 无
// Others: 文件已下载到本地
// Notice: 注意columnHeader要使用,(英文逗号)!
```
[:top: top](#top)


### **exitFullscreen()**<span id="exitFullscreen"></span> 
 - nothing
<br/>

:hibiscus: Example:
```js
import { exitFullscreen } from 'js-ways';

exitFullscreen()
// Output: 无
// Others: 元素退出全屏
```
[:top: top](#top)


### **flattenArray(arr)** <span id="flattenArray"></span> 
 - arr: array
<br/>

:hibiscus: Example:
```js
import { flattenArray } from 'js-ways';

const a = flattenArray([1, 2, 3, [4, [5, [6], 7]]])
console.log('a', a)
// Output: [ 1, 2, 3, 4, 5, 6, 7 ]
```
[:top: top](#top)


### **formatDate(date,joiner)** <span id="formatDate"></span> 
 - date: Date
 -  joiner: string 
<br/>

:hibiscus: Example:
```js
import { formatDate } from 'js-ways';

const c = formatDate()
console.log('c', c);
// Output: 2022/06/21
```
[:top: top](#top)


### **fullscreen(id)** <span id="fullscreen"></span>  
 - id: string  
<br/>

:hibiscus: Example:
```js
import { fullscreen } from 'js-ways';

fullscreen("elem-id")
// Output: 无
// Others: 元素变成全屏
```
[:top: top](#top)


### **generateHexColor()** <span id="generateHexColor"></span>  
 - nothing
<br/>

:hibiscus: Example:
```js
import { generateHexColor } from 'js-ways';

const r = generateHexColor();
console.log('r', r);
// Output: #d36df4
```
[:top: top](#top)


### **generateID(random)** <span id="generateID"></span>  
 - random: boolean
<br/>

:hibiscus: Example:
```js
import { generateID } from 'js-ways';

const g = generateID()
console.log('g', g);
// Output: l4nl3sx0
```
[:top: top](#top)


### **getIDCity(judgeID)** <span id="getIDCity"></span> 
 - judgeID: string/number
<br/>

:hibiscus: Example:
```js
import { getIDCity } from 'js-ways';

const g4 = getIDCity('440802200005223520')
console.log('g4', g4);
// Output: 广东
```
[:top: top](#top)


### **getScrollCoordinates(el)** <span id="getScrollCoordinates"></span>  
 - el: element
<br/>

:hibiscus: Example:
```js
import { getScrollCoordinates } from 'js-ways';

const g = getScrollCoordinates('scroll-elem-id');
console.log('g', g);
// Output: { x: 0, y: 0 }
```
[:top: top](#top)


### **getUrlParam({url, key})** <span id="getUrlParam"></span>  
 - url: string
 - key: string
 - getObj: boolean
<br/>

:hibiscus: Example:
```js
import { getUrlParam } from 'js-ways';

const g = getUrlParam(
  {
    url: 'https://translate.google.cn/?sl=zh-CN&tl=en&text=%E5%B9%B4%E6%9C%88%E6%97%A5%0A%E6%97%B6%E5%88%86%E7%A7%92&op=translate',
    getObj: true
  }
)
console.log('g,', g);
// Output: { sl: "zh-CN", tl: "en", text: "年月日\n时分秒", op: "translate" }
```
[:top: top](#top)


### **getValueType(v)** <span id="getValueType"></span> 
 - v: any type
<br/>

:hibiscus: Example:
```js
import { getValueType } from 'js-ways';

const g = getValueType([]);
console.log('g', g);
// Output: Array
```
[:top: top](#top)


### **isAvailableEmail(email)** <span id="isAvailableEmail"></span> 
 - email: string
<br/>

:hibiscus: Example:
```js
import { isAvailableEmail } from 'js-ways';

const b = isAvailableEmail('2829139244@qq.com')
console.log('b', b);
// Output: true
```
[:top: top](#top)


### **isInViewport(id)** <span id="isInViewport"></span> 
 - id: string (element id)
<br/>

:hibiscus: Example:
```js
import { isInViewport } from 'js-ways';

const b = isInViewport('elem-id');
console.log('b', b);
// Output: false
```
[:top: top](#top)


### **isURL(url)** <span id="isURL"></span> 
 - url: string 
<br/>

:hibiscus: Example:
```js
import { isURL } from 'js-ways';

const b = isURL('https://baidu.com.cn')
console.log('b', b);
// Output: true
```
[:top: top](#top)


### **monitorFullscreen(fn)** <span id="monitorFullscreen"></span>  
 - fn: function
<br/>

:hibiscus: Example:
```js
import { monitorFullscreen } from 'js-ways';

monitorFullscreen(() => console.log('全屏状态改变时执行的事件...'))
// Output: 全屏状态改变时执行的事件...
```
[:top: top](#top)


### **oneBecomesTwo(num)** <span id="oneBecomesTwo"></span> 
 - num: number | string(number)
<br/>

:hibiscus: Example:
```js
import { oneBecomesTwo } from 'js-ways';

const o = oneBecomesTwo(1);
console.log('o', o);
// Output: 01
```
[:top: top](#top)


### **stopBubble(e)** <span id="stopBubble"></span> 
 - e: event
<br/>

:hibiscus: Example:
```js
import { stopBubble } from 'js-ways';

stopBubble(event);
// Output: 无
// Others: 阻止子元素的事件冒泡到父元素
```
[:top: top](#top)


### **throttle({fn, delay})** <span id="throttle"></span> 
 - fn: function
 - delay: number (ms, 毫秒)
<br/>

:hibiscus: Example:
```js
import { throttle } from 'js-ways';

const fn = () => console.log(`❤❤❤❤❤❤❤❤❤❤❤❤${new Date()}❤❤❤❤❤❤❤❤❤❤❤❤`);
throttle({
  fn,
  delay: 3000
})()
// Output: ❤❤❤❤❤❤❤❤❤❤❤❤Tue Jun 21 2022 11:24:59 GMT+0800 (中国标准时间)❤❤❤❤❤❤❤❤❤❤❤❤
```
[:top: top](#top)


### **unifiedStorage(name)** <span id="unifiedStorage"></span>  
 - name: string 
<br/>

:hibiscus: Example:
```js
import { unifiedStorage } from 'js-ways';

const store = unifiedStorage('school');

store.set({ 'teacher': '阿棱' });
store.set({ 'student': '明明' });
store.set({ 'someone': '小红' });

const s = store.get('teacher');
console.log('s', s)

store.clear('someone');
// Output: 阿棱
// Others: localStorage里存储了 {teacher: "阿棱", student: "明明"}
```
[:top: top](#top)

## 测试结果

使用Jest测试所有方法，全部通过。

![test](https://github.com/babyAnnie/js-ways/blob/master/test.png)
