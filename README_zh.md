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

// 获取所有的值（返回一个 Iterator）
console.log(statusDict.values()); // Output: [Iterator]
console.log([...statusDict.values()]); // Output: [110010, 110020, 110030]

// 获取所有的键（返回一个 Iterator）
console.log(statusDict.keys()); // Output: [Iterator]
console.log([...statusDict.keys()]); // Output: ['pending', 'shipped', 'delivered']

// 获取原始字典对象
console.log(statusDict.value); // Output: { pending: 110010, shipped: 110020, delivered: 110030 }

// 添加关联字典
statusDict.addLinkMap('tips', {
  [statusDict.getVal('pending')]: '订单正在等待处理',
  [statusDict.getVal('shipped')]: '订单已发货',
  [statusDict.getVal('delivered')]: '订单已送达'
});

// 获取关联字典
statusDict.linkOf('tips'); // Output: Map(3) { 110010 => '订单正在等待处理', 110020 => '订单已发货', 110030 => '订单已送达' }

// 获取关联字典的值
statusDict.getLinkVal('tips', statusDict.getVal('pending')); // Output: '订单正在等待处理'

```



### DictContainer 类

```js
// 向容器添加一个新字典
dictContainer.addDict('status', { pending: 'PENDING', shipped: 'SHIPPED', delivered: 'DELIVERED' });

// 从容器获取字典
const statusDict = dictContainer.getDict('status');

// 访问链接的字典
const descriptionDict = statusDict.linkDict('description');

// 从链接的字典中检索值
console.log(descriptionDict.getVal('pending')); // Output: 'Order is pending'

```
