# Personal Code Package

## Dictionary Library
This library provides an easy-to-use tool for managing dictionaries and key-value pairs in JavaScript. It includes a `Dictionary` class for handling key-value mappings and a `DictContainer` class for centrally managing multiple dictionaries.

### Features

- Add and retrieve key-value pairs within a dictionary.
- Support linking dictionaries to other dictionaries (e.g., linking the values of one dictionary to another dictionary).
- Centralized management of multiple dictionaries using `DictContainer`.
- Provides common methods such as checking keys, values, and converting between data structures.

### Installation

You can install this library in your npm project using the following command:

```bash
npm install @forbel/simple-wheels
```

## Usage

### Import:

```js
import { Dictionary, DictContainer, dictContainer } from '@forbel/simple-wheels';
```

## Examples:

### Dictionary Class

```js
// Create a new dictionary
// The constructor accepts 3 types of parameters: 1. an object; 2. a Map instance; 3. a 2D array that can generate a Map.
const statusDict = new Dictionary({ pending: 110010, shipped: 110020, delivered: 110030 });
const statusDict = new Dictionary(new Map([['pending', 110010], ['shipped', 110020], ['delivered', 110030]]));
const statusDict = new Dictionary([['pending', 110010], ['shipped', 110020], ['delivered', 110030]]);

// Access a value by key
console.log(statusDict.getVal('pending')); // Output: 110010

// Check if a value exists
console.log(statusDict.hasValue(110010)); // Output: true

// Get the key from a value
console.log(statusDict.getKey(110010)); // Output: 'pending'

// Get all values
console.log(statusDict.values()); // Output: [110010, 110020, 110030]

// Get all keys
console.log(statusDict.keys()); // Output: ['pending', 'shipped', 'delivered']

// Get the original dictionary object (returns the parameter passed to the constructor)
console.log(statusDict.getRaw()); // Output: { pending: 110010, shipped: 110020, delivered: 110030 }

// Add a linked dictionary
statusDict.addLink('tips', {
  [statusDict.getVal('pending')]: 'Order is pending',
  [statusDict.getVal('shipped')]: 'Order has been shipped',
  [statusDict.getVal('delivered')]: 'Order has been delivered'
});

// Get the linked dictionary
statusDict.getLink('tips'); // Output: Map(3) { 110010 => 'Order is pending', 110020 => 'Order has been shipped', 110030 => 'Order has been delivered' }

// Get a value from the linked dictionary
statusDict.getLinkVal('tips', statusDict.getVal('pending')); // Output: 'Order is pending'

```

### DictContainer Class

The DictContainer class is used to manage multiple dictionaries.

```js
// Create a dictionary container
const dictContainer = new DictContainer();

// Add a new dictionary to the container
dictContainer.addDict('status', { pending: 110010, shipped: 110020, delivered: 110030 });

// Retrieve a dictionary from the container
const statusDict = dictContainer.getDict('status'); // Output: Map(3) { pending => 110010, shipped => 110020, delivered => 110030 }

```

### dictContainer

A default dictionary container that can be used directly when complex dictionary management is not needed.

```js
// Add a dictionary to the default container
dictContainer.addDict('status', { pending: 110010, shipped: 110020, delivered: 110030 });

// Retrieve a dictionary from the default container
const statusDict = dictContainer.getDict('status');

```


## Page Status

Used to determine whether the current page is in "Add", "Edit", or "View" status.

### Import

```js
import { PageStatus } from '@forbel/simple-wheels';
```

### Usage

```js
/**
 * Create a page status object
 * @param {string} status - The current page status (optional) 'ADD', 'EDIT', 'VIEW'
 */
const pageStatus = new PageStatus(status);

// Change the current page status
pageStatus.changeStatus('EDIT');

// Check if the current page status matches a specific status
pageStatus.isStatus('EDIT');

// Check if the current page status matches any of the provided statuses
pageStatus.fetchStatus(['ADD', 'EDIT']);

// Get the current page status
pageStatus.status;

// Check if the current page status is "Add"
pageStatus.isAdd;

// Check if the current page status is "Edit"
pageStatus.isEdit;

// Check if the current page status is "View"
pageStatus.isView;

```
