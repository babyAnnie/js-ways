# :desktop_computer: Working method library <span id="top"></span>

[中文](https://github.com/babyAnnie/js-ways/blob/master/README.md) | [English](https://github.com/babyAnnie/js-ways/blob/master/README.en.md)

[![Version](https://runkit.io/bokub/npm-version/branches/master/js-ways?style=flat)](https://www.npmjs.com/package/js-ways)
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://github.com/babyAnnie/js-ways/blob/master/LICENSE)
![](https://visitor-badge.glitch.me/badge?page_id=babyAnnie.js-ways)

| Method name                                  | Describe |
| :------------------------------------------: | --------------------- |
|[chunkArray](#chunkArray)                     | Array chunking |
|[copyToClipboard](#copyToClipboard)           | Hijack the clipboard |
|[countChar](#countChar)                       | Character statistics |
|[curryIt](#curryIt)                           | function currying |
|[debounce](#debounce)                         | Debounce |
|[downloadData](#downloadData)                 | Download data to local file|
|[exitFullscreen](#exitFullscreen)             | Exit fullscreen|
|[flattenArray](#flattenArray)                 | Multidimensional array flattening |
|[formatDate](#formatDate)                     | Handling date format functions |
|[fullscreen](#fullscreen)                     | Make the element fullscreen |
|[generateHexColor](#generateHexColor)         | into a random hexadecimal color |
|[generateID](#generateID)                     | Get a random unique ID |
|[getIDCity](#getIDCity)                       | Get ID City |
|[getScrollCoordinates](#getScrollCoordinates) | Get the scroll coordinates |
|[getUrlParam](#getUrlParam)                   | Get address parameters|
|[getValueType](#getValueType)                 | Get data type |
|[isAvailableEmail](#isAvailableEmail)         | Verify Email Format |
|[isInViewport](#isInViewport)                 | Determine if the element is in the field of view |
|[isURL](#isURL)                               | Is it an address |
|[monitorFullscreen](#monitorFullscreen)       | Monitor F11 keyboard events in full screen state |
|[oneBecomesTwo](#oneBecomesTwo)               | One-digit time change to two-digit|
|[stopBubble](#stopBubble)                     | Compatibility code to cancel bubbling |
|[throttle](#throttle)                         | Throttle |
|[unifiedStorage](#unifiedStorage)             | Unified storage data to browser |

<br/>


## **chunkArray(arr, size)** <span id="chunkArray"></span>
 - arr: array
 - size: number
<br/>

:hibiscus: Example:
````js
import { arrayChunk } from 'js-ways';

const arr = [1, 2, 3, 4, 5, 6, 7];
const size = 5;
const v = arrayChunk(arr, size);
console.log('v', v);
// Output: [[1, 2, 3, 4, 5], [6, 7]]
````
[:top:top](#top)


## **copyToClipboard({ value, callback})** <span id="copyToClipboard"></span>
 - value: string
 - callback: function
<br/>

:hibiscus: Example:
````js
import { copyTextToClipboard } from 'js-ways';

copyTextToClipboard({
  value: 'test copyToClipboard...',
  callback: () => {
    console.log('Copy end.');
  }
})
// Output: Copy end.
// Others: the content has been set to the pasteboard
````
[:top:top](#top)


## **countChar(str)** <span id="countChar"></span>
 - str: string
<br/>

:hibiscus: Example:
````js
import { countChar } from 'js-ways';

const c = countChar('Hello, I'm Yanyan')
console.log('c', c)
// Output: { "you": 1, "good": 1, " ": 1, "me": 1, "yes": 1, "yan": 2 }
````
[:top:top](#top)


## **curryIt(fn)** <span id="curryIt"></span>
 - fn: function
<br/>

:hibiscus: Example:
````js
import { curryIt } from 'js-ways';

function sayHello(name, age, fruit) {
  console.log(`My name is ${name}, I am ${age} old, I like to eat ${fruit}`);
}
const betterShowMsg = curryIt(sayHello);
betterShowMsg('Little', 20, 'Watermelon');
betterShowMsg('Aleng')(25, 'Grape');
betterShowMsg('Mingming', 22)('Apple');
betterShowMsg('Xiaohong')(28)('Avocado');

/* Output:
My name is Xiaoxiao, I am 20 years old, I like to eat watermelon
My name is Aleng, I am 25 years old, I like to eat grapes
My name is Mingming, I am 22 years old, I like to eat apples
My name is Xiaohong, I am 28 years old, I like to eat avocado
*/
````
[:top:top](#top)


## **debounce({fn, delay})** <span id="debounce"></span>
 - fn: function
 - delay: number
<br/>

:hibiscus: Example:
````js
import { debounce } from 'js-ways';

const fn = () => console.log(`❤❤❤❤❤❤❤❤❤❤❤❤${new Date()}❤❤❤❤❤❤❤❤❤❤❤`);

debounce({
  fn,
  delay: 3000
})()
// Output: ❤❤❤❤❤❤❤❤❤❤❤Tue Jun 21 2022 10:43:34 GMT+0800 (China Standard Time)❤❤❤❤❤❤❤❤❤❤❤
````
[:top:top](#top)


## **downloadData({jsonArr, fileName, columnHeader, suffix})** <span id="downloadData"></span>
 - jsonArr: array
 - fileName: string
 -columnHeader: string
 - suffix: "xlsx"(default)/"csv"/"txt"
<br/>

:hibiscus: Example:
````js
import { downloadData } from 'js-ways';

downloadDataToLocal({
  jsonArr: [
    {
      name: 'Aleng',
      age: 20
    },
    {
      name: 'Mingming',
      age: 3
    },
    {
      name: 'Xiaohong',
      age: 35
    },
  ],
  fileName: '❤',
  columnHeader: 'name,\tage',
  suffix: 'txt'
})
// Output: none
// Others: The file has been downloaded locally
// Notice: Note that columnHeader should be used, (English comma)!
````
[:top:top](#top)


## **exitFullscreen()**<span id="exitFullscreen"></span>
 - nothing
<br/>

:hibiscus: Example:
````js
import { exitFullscreen } from 'js-ways';

exitFullscreen()
// Output: none
// Others: element exits fullscreen
````
[:top:top](#top)


## **flattenArray(arr)** <span id="flattenArray"></span>
 - arr: array
<br/>

:hibiscus: Example:
````js
import { flattenArray } from 'js-ways';

const a = arrayFlatten([1, 2, 3, [4, [5, [6], 7]]])
console.log('a', a)
// Output: [ 1, 2, 3, 4, 5, 6, 7 ]
````
[:top:top](#top)


## **formatDate(date,joiner)** <span id="formatDate"></span>
 - date: Date
 - joiner: string
<br/>

:hibiscus: Example:
````js
import { formatDate } from 'js-ways';

const c = formatDate()
console.log('c', c);
// Output: 2022/06/21
````
[:top:top](#top)


## **fullscreen(id)** <span id="fullscreen"></span>
 - id: string
<br/>

:hibiscus: Example:
````js
import { fullscreen } from 'js-ways';

becomeFullscreen("elem-id")
// Output: none
// Others: element becomes full screen
````
[:top:top](#top)


## **generateHexColor()** <span id="generateHexColor"></span>
 - nothing
<br/>

:hibiscus: Example:
````js
import { generateHexColor } from 'js-ways';

const r = randomHexColor();
console.log('r', r);
// Output: #d36df4
````
[:top:top](#top)


## **generateID(random)** <span id="generateID"></span>
 - random: boolean
<br/>

:hibiscus: Example:
````js
import { generateID } from 'js-ways';

const g = generateUniqueID()
console.log('g', g);
// Output: l4nl3sx0
````
[:top:top](#top)


## **getIDCity(judgeID)** <span id="getIDCity"></span>
 - judgeID: string/number
<br/>

:hibiscus: Example:
````js
import { getIDCity } from 'js-ways';

const g4 = getIDCity('440802200005223520')
console.log('g4', g4);
// Output: Guangdong
````
[:top:top](#top)


## **getScrollCoordinates(el)** <span id="getScrollCoordinates"></span>
 - el: element
<br/>

:hibiscus: Example:
````js
import { getScrollCoordinates } from 'js-ways';

const g = getScrollPosition('scroll-elem-id');
console.log('g', g);
// Output: { x: 0, y: 0 }
````
[:top:top](#top)


## **getUrlParam({url, key})** <span id="getUrlParam"></span>
 - url: string
 - key: string
 - getObj: boolean
<br/>

:hibiscus: Example:
````js
import { getUrlParam } from 'js-ways';

const g = getUrlParam(
  {
    url: 'https://translate.google.cn/?sl=zh-CN&tl=en&text=%E5%B9%B4%E6%9C%88%E6%97%A5%0A%E6%97%B6%E5 %88%86%E7%A7%92&op=translate',
    getObj: true
  }
)
console.log('g,', g);
// Output: { sl: "zh-CN", tl: "en", text: "year month day\nhour minute second", op: "translate" }
````
[:top:top](#top)


##**getValueType(v)** <span id="getValueType"></span>
 - v: any type
<br/>

:hibiscus: Example:
````js
import { getValueType } from 'js-ways';

const g = getDataType([]);
console.log('g', g);
// Output: Array
````
[:top:top](#top)


## **isAvailableEmail(email)** <span id="isAvailableEmail"></span>
 - email: string
<br/>

:hibiscus: Example:
````js
import { isAvailableEmail } from 'js-ways';

const b = isAvailableEmail('2829139244@qq.com')
console.log('b', b);
// Output: true
````
[:top:top](#top)


## **isInViewport(id)** <span id="isInViewport"></span>
 - id: string (element id)
<br/>

:hibiscus: Example:
````js
import { isInViewport } from 'js-ways';

const b = isInViewport('elem-id');
console.log('b', b);
// Output: false
````
[:top:top](#top)


## **isURL(url)** <span id="isURL"></span>
 - url: string
<br/>

:hibiscus: Example:
````js
import { isURL } from 'js-ways';

const b = isURL('https://baidu.com.cn')
console.log('b', b);
// Output: true
````
[:top:top](#top)


## **monitorFullscreen(fn)** <span id="monitorFullscreen"></span>
 - fn: function
<br/>

:hibiscus: Example:
````js
import { monitorFullscreen } from 'js-ways';

monitorFullscreen(() => console.log('Events executed when the fullscreen state changes...'))
// Output: Event executed when the fullscreen state changes...
````
[:top:top](#top)


## **oneBecomesTwo(num)** <span id="oneBecomesTwo"></span>
 - num: number | string(number)
<br/>

:hibiscus: Example:
````js
import { oneBecomesTwo } from 'js-ways';

const o = oneBecomesTwo(1);
console.log('o', o);
// Output: 01
````
[:top:top](#top)


## **stopBubble(e)** <span id="stopBubble"></span>
 - e: event
<br/>

:hibiscus: Example:
````js
import { stopBubble } from 'js-ways';

stopBubble(event);
// Output: none
// Others: Prevent child element's events from bubbling to parent element
````
[:top:top](#top)


## **throttle({fn, delay})** <span id="throttle"></span>
 - fn: function
 - delay: number (ms, milliseconds)
<br/>

:hibiscus: Example:
````js
import { throttle } from 'js-ways';

const fn = () => console.log(`❤❤❤❤❤❤❤❤❤❤❤❤${new Date()}❤❤❤❤❤❤❤❤❤❤❤`);
throttle({
  fn,
  delay: 3000
})()
// Output: ❤❤❤❤❤❤❤❤❤❤❤Tue Jun 21 2022 11:24:59 GMT+0800 (China Standard Time)❤❤❤❤❤❤❤❤❤❤❤
````
[:top:top](#top)


## **unifiedStorage(name)** <span id="unifiedStorage"></span>
 - name: string
<br/>

:hibiscus: Example:
````js
import { unifiedStorage } from 'js-ways';

const store = unifiedStorage('school');

store.set({ 'teacher': 'Aleng' });
store.set({ 'student': 'Mingming' });
store.set({ 'someone': 'Xiaohong' });

const s = store.get('teacher');
console.log('s', s)

store.clear('someone');
// Output: Aleng
// Others: {teacher: "Aleng", student: "Mingming"} is stored in localStorage
````
[:top:top](#top)