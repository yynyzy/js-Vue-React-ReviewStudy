# TS
typescript在编译阶段进行类型检查，当类型不合符预期结果的时候则会出现错误提示

## typescript 的数据类型主要有如下：
· boolean（布尔类型）
· number（数字类型）
· string（字符串类型）
· array（数组类型）
· tuple（元组类型）
· enum（枚举类型）
· any（任意类型）
· null 和 undefined 类型
· void 类型
· never 类型
· object 对象类型

## 1.boolean
布尔类型
```js
let flag:boolean = true;
// flag = 123; // 错误
flag = false;  //正确
```

## 2.number
数字类型，和javascript一样，typescript的数值类型都是浮点数，可支持二进制、八进制、十进制和十六进制
```js
let num:number = 123;
// num = '456'; // 错误
num = 456;  //正确
进制表示：
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
```

## 3.string
字符串类型，和JavaScript一样，可以使用双引号（"）或单引号（'）表示字符串
```
let str:string = 'this is ts';
str = 'test';
作为超集，当然也可以使用模版字符串``进行包裹，通过 ${} 嵌入变量

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }`
```

## 4.array
数组类型，跟javascript一致，通过[]进行包裹，有两种写法：
```js
方式一：元素类型后面接上 []

 let arr:string[] = ['12', '23'];
 arr = ['45', '56'];
方式二：使用数组泛型，Array<元素类型>：

let arr:Array<number> = [1, 2];
arr = ['45', '56'];
```

## 5.tuple
元祖类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
```js
let tupleArr:[number, string, boolean]; 
tupleArr = [12, '34', true]; //ok
typleArr = [12, '34'] // no ok
赋值的类型、位置、个数需要和定义（声明）的类型、位置、个数一致
```

## 6.enum
enum类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

## 7.any
可以指定任何类型的值，在编程阶段还不清楚类型的变量指定一个类型，不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查，这时候可以使用any类型

使用any类型允许被赋值为任意类型，甚至可以调用其属性、方法
```js
let num:any = 123;
num = 'str';
num = true;
定义存储各种类型数据的数组时，示例代码如下：
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

## 8.null 和 undefined
在JavaScript 中 null表示 "什么都没有"，是一个只有一个值的特殊类型，表示一个空对象引用，而undefined表示一个没有设置值的变量

默认情况下null和undefined是所有类型的子类型， 就是说你可以把 null和 undefined赋值给 number类型的变量
```js
let num:number | undefined; // 数值类型 或者 undefined
console.log(num); // 正确
num = 123;
console.log(num); // 正确
但是ts配置了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
```

## 9.void
用于标识方法返回值的类型，表示该方法没有返回值。
```js
function hello(): void {
    alert("Hello Runoob");
}
```

## 10.never
never是其他类型 （包括null和 undefined）的子类型，可以赋值给任何类型，代表从不会出现的值
但是没有类型是 never 的子类型，这意味着声明 never 的变量只能被 never 类型所赋值。
never 类型一般用来指定那些总是会抛出异常、无限循环
```js
let a:never;
a = 123; // 错误的写法

a = (() => { // 正确的写法
  throw new Error('错误');
})()

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

## 11.object
对象类型，非原始类型，常见的形式通过{}进行包裹
```js
let obj:object;
obj = {name: 'Wang', age: 25};
```

## 12.泛型的使用(泛型在函数使用时才给定类型，声明函数时不需要用<T>代替,(字母可以换))
    ```js
    function getArr<T>(arr: T[]) {
      return arr;
    }
    
    getArr<number>([1, 2, 3]) //指定了number，那我的数组必须每一项也是number，如果不是就报错
    getArr<string>(['g', 'q', 'f']) 
    
    ```
    
```js
    function getVal<T>(obj: T, k: keyof T){
      return obj[k];
    }
    
    interface Person {
      name: string;
      age: number;
    }
    
    getVal<Person>({
      name: 'gqf',
      age: 29
    }, 'age') // 这里的key值只能传name或者age，否则就会报错，这个就是泛型的力量
    
```
   ### 使用多个泛型
    ```js
    function manyTest<K, V>(a: K, b: V) {
        return `${a} ${b}`
    }
    
    manyTest<number, string>(1, '2') //泛型指定了第一个参数是数字，第二个参数是字符串
    ```
   ### 在类中使用泛型-泛型继承接口了
    ```js
    interface Skill {
        name: string;
        age: number;
    }
    
    // 规定了数组每一项的Skill技能，要遵循接口的格式，有name和age字段
    class DesignHero<T extends Skill> { 
      constructor(private skills: T[]){}
    
      getSkillName (index: number) {
        console.log(this.skills[index].name)
        return this.skills[index].name;
      }
    }
    ```

## 总结
和javascript基本一致，也分成：
基本类型
引用类型
在基础类型上，typescript增添了void、any、emum等原始类型

# 13道 Typescript 项目常用语法练习
1. 常用类型
```ts
/* 常用类型*/

// 1. string 字符串类型
export const str: string = "helloworld";
str.substr(3);

// 2. number 数字类型
let num: number = 100;
num++;

// 3. boolean 布尔类型
const bool: boolean = true;

// 4. 数组类型
const numArr: number[] = [1, 2, 3];
numArr.map((num) => ++num);

// 5. 对象类型
type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};
const user: User = {
  name: "xiaoming",
  age: 18,
  isAdmin: false
};
const { name, age, isAdmin } = user;

// 6. 函数类型
type Fn = (n: number) => number;
const fn: Fn = (num) => ++num;
fn(1);
```

2. React 组件 Props
```ts
/* React 组件 Props */

interface Props {
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ onClick, disabled, children, style }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

export default Button;
```

3. 联合类型 Union
```ts
/* 联合类型 Union */

// id 可为字符串或数字类型
export function printId(id: string | number) {
  console.log(id);
}

printId(101); // OK
printId('202'); // OK
```

4. 类型判断
```ts
/* 类型判断 */

export function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

printId(101); // OK
printId('202'); // OK
```

5. 类型断言
```ts
/* 类型断言 */

export type Position = 'left' | 'right' | 'top' | 'bottom';
const setPos = (pos: Position) => {
  //...
};

const handleChange = (value: string) => {
  setPos(value as Position);
};

handleChange('left');
```

6. 属性名不确定的对象
```ts
/* 属性名不确定的对象 */

export type Paths = {
  [key: string]: string;
};

// 等同于
// export type Paths = Record<string, string>;

const paths: Paths = {};

paths.home = '/home'; //OK
paths.settings = '/settings'; //OK
paths.somePath = '/somePath'; //OK
```

7. 对象的 key 值
```ts
/* 对象的 key 值 */

export const ErrorMessage = {
  0: "success",
  7: "Permission denied",
  9: "Invalid parameters"
  //...
};

export type ErrorCode = keyof typeof ErrorMessage;

export const logErrMsg = (code: ErrorCode) => {
  console.log(ErrorMessage[code]);
};
```

8. 泛型 generics
```ts
/* 泛型 generics */

type UseState = <T>(v: T) => [T, (v: T) => void];

const useState: UseState = (v) => {
  return [
    v,
    (v) => {
      //...
    }
  ];
};

export const Component = () => {
  const [num, setNum] = useState(0); // OK
  const [str, setStr] = useState(""); // OK
  const [list, setList] = useState([1, 2, 3]); // OK

  // test
  const newNum = num + 1;
  setNum(newNum);

  const newStr = str.toUpperCase();
  setStr(newStr);

  const newList = list.slice(1);
  setList(newList);
};
```

9. 部分对象 Partial
```ts
/* 部分对象 Partial */

interface User {
  name: string;
  age: number;
  occupation: string;
}

export const users: User[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep"
  },
  {
    name: "Wilson",
    age: 23,
    occupation: "Ball"
  }
];

type Criteria = {
  [Property in keyof User]?: User[Property];
};

// 等同于
// type Criteria = Partial<User>;

export const filterUsers = (users: User[], criteria: Criteria): User[] =>
  users.filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof Criteria)[];
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName];
    });
  });

const usersOfAge23 = filterUsers(users, {
  age: 23
});
```

10. 函数中 this 的使用
```ts
/* 函数中 this 的使用 */
// 参考 https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function

export const debounce = <F extends (...args: any[]) => void>(
  fn: F,
  delay = 200
) => {
  let timeout = 0;
  return function (this: any, ...args: any[]) {
    timeout && clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as F;
};
```

11. 类型编程-从基础类型构造新类型
```ts
/* 类型编程-从基础类型构造新类型 */

export type CustomObject<K extends string | number, T> = { [key in K]: T };

// 1. 示例
// ObjectOfStringValue 对象的值只能为字符串类型
type ObjectOfStringValue = CustomObject<string, string>;
const objOfStringValue: ObjectOfStringValue = {
  h: "hello", // OK
  w: "world" // OK
};

// 2. ObjectOfStringValue
// ObjectOfStringValue 对象的值只能为数字类型
type ObjectOfNumberValue = CustomObject<string, number>;
const objOfNumberValue: ObjectOfNumberValue = {
  a: 100, // OK
  b: 100 // OK
};
const a = objOfNumberValue.a;

// 3. ObjectOfUserValue
type User = {
  username: string;
  age: number;
};

// ObjectOfUserValue 对象的值只能为User类型
type ObjectOfUserValue = CustomObject<string, User>;

const objOfUserValue: ObjectOfUserValue = {
  u1: {
    username: "xiaoming",
    age: 18
  }
};
const { username } = objOfUserValue.u1;
```

12. 对象类型的继承
```ts
/* 对象类型的继承 */

export interface Response {
  data: any;
  status: number;
  statusText: string;
}

// 1. 在 Response 类型的基础上添加 config 属性
export interface ResponseWithConfig extends Response {
  config: any;
}
const responseWithConfig: ResponseWithConfig = {
  data: 100,
  status: 0,
  statusText: "success",
  config: {}
};

// 2. 在 Response 类型的基础上改写 data 属性类型
export interface StringResponse extends Response {
  data: string;
}
const stringResponse: StringResponse = {
  data: "100",
  status: 0,
  statusText: "success"
};
```

13. 对象类型的修改
```ts
/* 对象类型的修改 */
/* extends可以继承对象类型，但不可与原类型冲突，此时可以先使用 Omit 去除需要修改的属性 */

export interface TreeNode {
  id: number;
  value: number;
  children?: TreeNode[];
}

// 1. 去除 TreeNode 的 id 属性同时修改 children 属性的类型
export interface NodeWithoutId extends Omit<TreeNode, "id" | "children"> {
  children?: NodeWithoutId[];
}

// OK
const nodeWithoutId: NodeWithoutId = {
  value: 1,
  children: [
    {
      value: 2
    }
  ]
};
```

14. 类型编程-条件判断
```ts
/* 类型编程-条件判断 */

export declare type Person<T extends "User" | "Admin"> = T extends "User"
  ? {
      username: string;
    }
  : {
      username: string;
      role: string;
    };

const user: Person<"User"> = { username: "xiaoming" }; // OK

const admin: Person<"Admin"> = { username: "xiaofang", role: "manager" }; // OK
```

15. React 组件 Props 范型
```ts
/* React 组件 Props 范型 */

import { useState } from "react";

// value 可为字符串或数字
type Value = number | string;
interface Props<T extends Value> {
  value?: T;
  onChange?: (v: T) => void;
  type?: "number" | "text";
}

const Input = <T extends Value>({
  value,
  onChange,
  type = "text"
}: Props<T>) => {
  return (
    <input
      value={value}
      onChange={(e) => {
        const { value } = e.target;
        onChange?.((type === "number" ? parseInt(value, 10) : value) as T);
      }}
      type={type}
    />
  );
};

// test
const Test = () => {
  const [num, setNum] = useState(0);
  const [str, setStr] = useState("");

  return (
    <div>
      <Input value={num} onChange={(v) => setNum(v)} type="number" />
      <Input value={str} onChange={(v) => setStr(v)} />
    </div>
  );
};

export default Input;
```