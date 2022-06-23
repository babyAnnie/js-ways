/** @jest-environment jsdom */

/*
1️⃣
npm i --dev jest babel-jest @babel/core @babel/preset-env jest-environment-jsdom
2️⃣
.babelrc (new file)
```
{
  "presets": ["@babel/preset-env"]
}
```
3️⃣
babel.config.js (new file)
```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```
*/


import {
  fullscreen,
  exitFullscreen,
  monitorFullscreen,
  unifiedStorage,
  oneBecomesTwo,
  formatDate,
  generateID,
  downloadData,
  debounce,
  throttle,
  getValueType,
  stopBubble,
  getUrlParam,
  isAvailableEmail,
  curryIt,
  getIDCity,
  copyToClipboard,
  isInViewport,
  getScrollCoordinates,
  isURL,
  flattenArray,
  chunkArray,
  countChar,
  generateHexColor,
} from './ways'


const arr = [1, 2, 3, 4, 5, 6, 7];
test('test chunkArray', () => {
  expect(chunkArray(arr, 5)).toStrictEqual([[1, 2, 3, 4, 5], [6, 7]]);
  expect(chunkArray(arr, 2)).toStrictEqual([[1, 2], [3, 4], [5, 6], [7]]);
  expect(chunkArray(arr, 1)).toStrictEqual([[1], [2], [3], [4], [5], [6], [7]]);
  expect(chunkArray(arr, 10)).toStrictEqual([[1, 2, 3, 4, 5, 6, 7]]);
});


test('test copyToClipboard', () => {
  expect(copyToClipboard({
    value: 'test copyToClipboard...',
    callback: () => {
      console.log('Copy end.');
    }
  })).toBeUndefined()
  expect(copyToClipboard()).toBeUndefined()
})
// Others: 内容已经设置到粘贴板


test('test countChar', () => {
  expect(countChar('你好 我是燕燕')).toStrictEqual({ "你": 1, "好": 1, " ": 1, "我": 1, "是": 1, "燕": 2 })
  expect(countChar('hello world')).toStrictEqual({ "h": 1, "e": 1, "l": 3, "o": 2, " ": 1, "w": 1, "r": 1, "d": 1 })
  expect(countChar('天天好心情')).toStrictEqual({ "天": 2, "好": 1, "心": 1, "情": 1 })
})


function sayHello(name, age, fruit) {
  return `我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`
}
const betterShowMsg = curryIt(sayHello)
test('test curryIt', () => {
  expect(betterShowMsg('阿棱')(25, '苹果')).toBe('我叫 阿棱,我 25 岁了, 我喜欢吃 苹果')
  expect(curryIt(() => { })()).toBeUndefined()
})


const debounceFn = () => console.log(`❤❤❤❤❤❤❤❤❤❤❤❤${new Date()}❤❤❤❤❤❤❤❤❤❤❤`);
test('test debounce', () => {
  expect(debounce({
    fn: debounceFn,
    delay: 3000
  })()).toBeUndefined()
})


test('test downloadData', () => {
  expect(downloadData({
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
  })).toBeUndefined()
})


test('test exitFullscreen', () => {
  expect(exitFullscreen()).toBeUndefined()
})


test('test flattenArray', () => {
  expect(flattenArray([1, 2, 3, [4, [5, [6], 7]]])).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  expect(flattenArray([[1, 2], [3, 4], [5, 6], [7]])).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
})


test('test formatDate', () => {
  expect(formatDate()).toMatch(/\d{4}\/\d{2}\/\d{2}/);
})


test('test fullscreen', () => {
  expect(fullscreen('id')).toBeUndefined();
})

test('test generateHexColor', () => {
  expect(generateHexColor()).toMatch(/#[A-F|\d]{6}/i);
})


test('test generateID', () => {
  expect(generateID()).toMatch(/\w{8}/);
})


test('test getIDCity', () => {
  expect(getIDCity(44)).toBe('广东');
  expect(getIDCity(45)).toBe('广西');
  expect(getIDCity()).toBe('');
  expect(getIDCity(1.2)).toBe('');
  expect(getIDCity(NaN)).toBe('');
})


test('test getScrollCoordinates', () => {
  expect(getScrollCoordinates()).toStrictEqual({ x: 0, y: 0 })
})


const url = 'https://translate.google.cn/?sl=zh-CN&tl=en&text=%E5%B9%B4%E6%9C%88%E6%97%A5&op=translate';
test('test getUrlParam', () => {
  expect(getUrlParam({
    url,
    isObj: true
  })).toHaveProperty("sl", "zh-CN");
  expect(getUrlParam({
    url,
    isObj: true
  })).toHaveProperty("text", "年月日");
  expect(getUrlParam({
    url,
    key: 'op'
  })).toBe('translate')
})


test('test getValueType', () => {
  expect(getValueType(() => { })).toBe('Function');
  expect(getValueType([])).toBe('Array');
  expect(getValueType('')).toBe('String');
  expect(getValueType({})).toBe('Object');
  expect(getValueType(9)).toBe('Number');
  expect(getValueType(true)).toBe('Boolean');
  expect(getValueType(Symbol())).toBe('Symbol');
  expect(getValueType(undefined)).toBe('Undefined');
  expect(getValueType(null)).toBe('Null');
})


test('test isAvailableEmail', () => {
  expect(isAvailableEmail('2829139244@qq.com')).not.toBeFalsy();
  expect(isAvailableEmail('2829139244@qq')).toBeFalsy();
  expect(isAvailableEmail('@qq.com')).toBeFalsy();
  expect(isAvailableEmail()).toBeFalsy();
})


test('test isInViewport', () => {
  expect(isInViewport('id')).toBeFalsy();
  expect(isInViewport()).toBeFalsy();
})


test('test isURL', () => {
  expect(isURL()).toBeFalsy()
  expect(isURL('')).toBeFalsy()
  expect(isURL('http')).toBeFalsy()
  expect(isURL('https://translate.google.cn')).not.toBeFalsy();
})


const myObj = { monitorFullscreen };
test('test monitorFullscreen', () => {
  const somethingSpy = jest.spyOn(myObj, 'monitorFullscreen');
  myObj.monitorFullscreen();
  expect(somethingSpy).toBeCalled();
});


test('test oneBecomesTwo', () => {
  expect(oneBecomesTwo()).toBe('')
  expect(oneBecomesTwo(5)).toBe('05')
  expect(oneBecomesTwo(4)).toBe('04')
  expect(oneBecomesTwo(9)).toBe('09')
  expect(oneBecomesTwo(10)).toBe('10')
})


test('test stopBubble', () => {
  expect(stopBubble()).toBeUndefined();
})


const throttleFn = () => `❤❤❤❤❤❤❤❤❤❤❤❤${new Date()}❤❤❤❤❤❤❤❤❤❤❤❤`;
test('test throttle', () => {
  expect(throttle({ fn: throttleFn, delay: 3000 })()).toBeUndefined()
})


test('test unifiedStorage', () => {
  const store = unifiedStorage('school');
  expect(store).toHaveProperty('set');
  expect(store).toHaveProperty('get');
  expect(store).toHaveProperty('clear');
  store.set({ 'teacher': '阿棱' });
  store.set({ 'student': '明明' });
  store.set({ 'someone': '小红' });
  store.clear('someone');
  expect(store.get('teacher')).toBe('阿棱');
  expect(store.get('student')).toBe('明明');
  expect(store.get('someone')).toBe('');
})