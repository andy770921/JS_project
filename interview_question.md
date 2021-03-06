# Interview Question

# JS

## Inheritance
```js
// Q: what does the console show?

class A {
  constructor(){
    this.play = () => console.log('A');
  }
}

class B extends A {
  constructor(){
    super();
    this.play = () => console.log('B');
  }
}

class C extends A {
  constructor(){
    super();
  }
}
C.prototype.play = () => console.log('C');

const arr = [new A(), new B(), new C()];

for (let i = 0; i < 3; i ++){
  arr[i].play();
}

// A B A
```

## call, apply, bind

```js
// Q: what does console show?

const a = { elem: 5 };

const b = { 
  elem: 10,
  getElem(num) {
    return this.elem * num;
  }
};

const getElem = b.getElem;
const boundGetElem = getElem.bind(b);

console.log(boundGetElem(10));  // 100
console.log(getElem.call(a, 10));  // 50
console.log(boundGetElem.apply(b, 10));  // TypeError: CreateListFromArrayLike called on non-object

```
## this, expression statement, and comma
- Ref: https://github.com/mqyqingfeng/Blog/issues/7
- Ref2: https://github.com/aszx87410/blog/issues/39?fbclid=IwAR3lBkCCba53zGAKCactSgz3bOeFqVA7XRlA5FJljGWasJO7Ro3C1o08nZc
```js
var value = 1;

var obj = {
    value: 2,

    foo: function () {
        return this.value;
    },
};

console.log(obj.foo()); // 2
console.log((obj.foo)()); // 2
console.log((obj.foo = obj.foo)()); // 1
console.log((false || obj.foo)());  // 1
console.log((obj.foo, obj.foo)());  // 1
```
# Algorithm

## String, Array, Hash Table - check if string is beautiful

- Coding with test: https://codesandbox.io/s/mocha-unit-test-isbeautifulstr-vcer9?file=/src/index.js
- Explain & Example:

```
For inputString = "bbbaacdafe", the output should be isBeautifulString(inputString) = true.

This string contains 3 a, 3 b, 1 c, 1 d, 1 e, and 1 f (and 0 of every other letter), 
so since there aren't any letters that appear more frequently than the previous letter, this string qualifies as beautiful.

For inputString = "aabbb", the output should be isBeautifulString(inputString) = false.

Since there are more bs than as, this string is not beautiful.

For inputString = "bbc", the output should be isBeautifulString(inputString) = false.

Although there are more bs than cs, this string is not beautiful because there are no as, so therefore there are more bs than as.
```

- Input/Output     
    execution time limit: 4 seconds (js)
```
[input] string inputString

A string of lowercase English letters.

Guaranteed constraints:
3 ≤ inputString.length ≤ 50.

[output] boolean

Return true if the string is beautiful, false otherwise.
```

- Q:
```js
function isBeautifulString(inputString) {
  // TODOS
}
```

- A:
```js
// Ans:
function isBeautifulString(inputString) {
    const charTimesHashTable = [...Array(26)].map(() => 0);
    inputString.split("").forEach(char => {
        const charCode = char.charCodeAt();
        if (charCode <= 122 && charCode >= 97) charTimesHashTable[charCode - 97] += 1;
    });
    
    
    for (let i = 0; i < charTimesHashTable.length - 1; i++){
        if(charTimesHashTable[i] < charTimesHashTable[i + 1]) return false;
    }
    return true;
}
```
## Object Oriented Programming - Implement the missing code

- You may not modify the pre-existing code.
- Implement `Tracker` with two methods as follows:
- `allocate(hostType)`: reserves the first available hostname and returns it;
- `deallocate(hostname)`: release that hostname back into the pool.

- Input/Output

```
* [execution time limit] 4 seconds (js)
* [input] array.string queries An array of strings representing queries to the tracker.
    * queries[i] = "A <hostType>" means that you should call tracker.allocate(<hostType>) and return the reserved hostname.
    * queries[i] = "D <hostname>" means that you should call tracker.deallocate(<hostname>) and return nothing.
* It is guaranteed that all host numbers of the deallocating queries won't exceed 999. Guaranteed constraints: 1 ≤ queries.length ≤ 103. 
* [output] array.string An array of responses from the tracker.
```

- Example:
```
>> tracker.allocate('apibox');
"apibox1"

>> tracker.allocate('apibox');
"apibox2"

>> tracker.deallocate('apibox1');

>> tracker.allocate('apibox');
"apibox1"

>> tracker.allocate('sitebox');
"sitebox1"
```

- Q:
```js
// Given
function hostAllocation(queries) {
  const tracker = new Tracker();
  const results = [];
  queries.forEach((query) => {
    const [action, name] = query.split(' ');
    if (action === 'A') {
      results.push(tracker.allocate(name));
    } else if (action === 'D') {
      tracker.deallocate(name);
    }
  });
  return results;
}

class Tracker {
  // TODOS
}

console.log(hostAllocation(['A apibox',
  'A apibox',
  'D apibox1',
  'A apibox',
  'A sitebox']));
// to be: ['apibox1', 'apibox2', 'apibox1', 'sitebox1'] 
```

- A:
```js
// Given
function hostAllocation(queries) {
  const tracker = new Tracker();
  const results = [];
  queries.forEach((query) => {
    const [action, name] = query.split(' ');
    if (action === 'A') {
      results.push(tracker.allocate(name));
    } else if (action === 'D') {
      tracker.deallocate(name);
    }
  });
  return results;
}

class Tracker {
    reservedList = [];
    
      allocate(hostType){
        const sameTypeList = this.reservedList.filter((name) =>
            name.slice(0, hostType.length) === hostType);
        if(sameTypeList.length === 0){
            this.reservedList = [...this.reservedList, hostType + 1];
            return hostType + 1;
        } else {
            const existedNumberList = sameTypeList.map((name) => {
                return parseInt(name.slice(hostType.length, name.length), 10)
            });
            
            const allNumberSeries = [...Array(existedNumberList[existedNumberList.length-1])].map((_, idx) => {
                if(existedNumberList.includes(idx)) return idx;
                return null;
            })
            
            for(let i = 0; i < allNumberSeries.length - 1; i++){
                if(allNumberSeries[i + 1] - allNumberSeries[i] !== 1){
                    this.reservedList = [...this.reservedList, `${hostType}${i + 1}`]; 
                    return `${hostType}${i + 1}`;
                }
            }
            this.reservedList = [...this.reservedList, `${hostType}${allNumberSeries.length + 1}` ];
            return `${hostType}${allNumberSeries.length + 1}`;
        }
    }
    deallocate(hostname) {
        this.reservedList = this.reservedList.filter(name => name !== hostname);
    }
}

console.log(hostAllocation(['A apibox',
  'A apibox',
  'D apibox1',
  'A apibox',
  'A sitebox']));
// to be: ['apibox1', 'apibox2', 'apibox1', 'sitebox1'] 
```
