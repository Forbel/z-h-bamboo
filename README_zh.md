# 一个自用代码包


## 字典库
该库提供了一个易于使用的工具，用于管理 JavaScript 中的字典和键值对。它包含一个 `Dictionary` 类，用于处理键值映射，以及一个 `DictContainer` 类，用于集中管理多个字典。

### 特性

- 在字典中添加和检索键值对。
- 支持将字典链接到其他字典（例如，将一个字典的值链接到另一个字典）。
- 使用 `DictContainer` 进行多个字典的集中管理。
- 提供常用方法，例如检查键、值，以及在数据结构之间转换。
  
### 安装

您可以通过以下命令在您的 npm 项目中安装此库：

```bash
npm install z-h-bamboo
```


### 用法

### 导入：

```js 
import { Dictionary, DictContainer, dictContainer } from 'z-h-bamboo';
```

### 示例：

### Dictionary 类

```js
// 创建一个新的字典
// 构造函数参数接受 3 种类型：1：对象；2：Map 实例；3：可生成 Map 的二维数组；
const statusDict = new Dictionary({ pending: 110010, shipped: 110020, delivered: 110030 })
const statusDict = new Dictionary(new Map([['pending', 110010], ['shipped', 110020], ['delivered', 110030]]))
const statusDict = new Dictionary([['pending', 110010], ['shipped', 110020], ['delivered', 110030]])

// 通过键名访问值
console.log(statusDict.getVal('pending')); // Output: 110010

// 检查值是否存在
console.log(statusDict.hasValue(110010)); // Output: true

// 通过值获取键名
console.log(statusDict.getKey(110010)); // Output: 'pending'

// 获取所有的值
console.log(statusDict.values()); // Output: [110010, 110020, 110030]

// 获取所有的键
console.log(statusDict.keys()); // Output: ['pending', 'shipped', 'delivered']

// 获取原始字典对象 (返回创建时传入的构造函数参数)
console.log(statusDict.getRaw()); // Output: { pending: 110010, shipped: 110020, delivered: 110030 }

// 添加关联字典
statusDict.addLink('tips', {
  [statusDict.getVal('pending')]: '订单正在等待处理',
  [statusDict.getVal('shipped')]: '订单已发货',
  [statusDict.getVal('delivered')]: '订单已送达'
});

// 获取关联字典
statusDict.getLink('tips'); // Output: Map(3) { 110010 => '订单正在等待处理', 110020 => '订单已发货', 110030 => '订单已送达' }

// 获取关联字典的值
statusDict.getLinkVal('tips', statusDict.getVal('pending')); // Output: '订单正在等待处理'

```



### DictContainer 类

字典容器类，用于管理多个字典。

```js
// 创建一个字典容器
const dictContainer = new DictContainer();

// 向容器添加一个新字典
dictContainer.addDict('status', { pending: 110010, shipped: 110020, delivered: 110030 });

// 从容器获取字典
const statusDict = dictContainer.getDict('status'); // Output: Map(3) {pending => 110010, shipped => 110020, delivered => 110030}

```

### dictContainer

一个默认生成的字典容器，当不需要维护复杂字典时，可以直接使用。

```js
// 向默认容器中添加字典
dictContainer.addDict('status', { pending: 110010, shipped: 110020, delivered: 110030 });

// 从默认容器中获取字典
const statusDict = dictContainer.getDict('status');

```


## 页面状态

用于判断当前页面属于新增、编辑、查看等状态。

## 导入
```js
import { PageStatus } from 'z-h-bamboo';
```

## 使用

```js
/**
 * 创建页面状态对象
 * @param {string} status - 当前页面状态（可选）'ADD', 'EDIT', 'VIEW'
 */
const pageStatus = new PageStatus(status);

// 改变当前页面状态
pageStatus.changeStatus('EDIT');

// 判断当前页面状态
pageStatus.isStatus('EDIT');

// 判断当前页面状态是否属于某几个状态
pageStatus.fetchStatus(['ADD', 'EDIT']);

// 获取当前页面状态
pageStatus.status;

// 判断当前页面状态是否为新增
pageStatus.isAdd;

// 判断当前页面状态是否为编辑
pageStatus.isEdit;

// 判断当前页面状态是否为查看
pageStatus.isView;

```