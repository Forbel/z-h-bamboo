# A personal package


## Dictionary Library
This library provides an easy-to-use utility for managing dictionaries and key-value pairs in JavaScript. It includes a `Dictionary` class for handling key-value mappings, and a `DictContainer` class for managing multiple dictionaries in a centralized way.

### Features

- Add and retrieve key-value pairs within a dictionary.
- Support for linking dictionaries to other dictionaries (e.g., linking one dictionary's values to another dictionary).
- Centralized management of multiple dictionaries using `DictContainer`.
- Provides utility methods such as checking for keys, values, and converting between data structures.
  
### Installation

You can install this library by including it in your npm project:

```bash
npm install z-h-bamboo
```


### Usage

Importing the Dictionary and DictContainer

```javascript 
import { dictContainer, DictContainer } from 'z-h-bamboo';
```

// Add a new dictionary to the container
dictContainer.addDict('status', { pending: 'PENDING', shipped: 'SHIPPED', delivered: 'DELIVERED' });

// Get the dictionary from the container
const statusDict = dictContainer.getDict('status');

// Access values from the dictionary
console.log(statusDict.getVal('pending')); // Output: 'PENDING'

// Check if a value exists
console.log(statusDict.hasValue('PENDING')); // Output: true

// Get the key from a value
console.log(statusDict.getKey('PENDING')); // Output: 'pending'



// Adding a link map (mapping status to descriptions)
statusDict.addLinkMap('description', { pending: 'Order is pending', shipped: 'Order is shipped', delivered: 'Order is delivered' });

// Access the linked dictionary
const descriptionDict = statusDict.linkDict('description');

// Retrieve values from the linked dictionary
console.log(descriptionDict.getVal('pending')); // Output: 'Order is pending'


