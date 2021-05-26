# Sniperium
### Add, describe, and run JS code snippets.

---

Sniperium allows you to run any JS code snippets.

- You can import npm-modules at the top of the file and use them like:
```javascript
import * as R from 'ramda';

const greet = R.replace('{name}', R.__, 'Hello, {name}!');
greet('Alice'); //=> 'Hello, Alice!'
```
- Code editor windows are connected. You can declare variables
  in one of them and execute in another.
```javascript
// Code editor #1
const p = "Pickle Rick!";
```

```javascript
// Code editor #2
console.log(p); // => 'Pickle Rick!'
```

- Click outside of code editor and press `command+S` - it will automatically format the code.

- Describe your code: create a new markdown editor snippet with `Text +` button at the header.
  Enter your notes and just click outside to save them.

### Release notes:
- **0.1: Current build.** You can import npm-modules on the fly and run any JS code snippets.
Current release targets on Google Chrome browser, so some features
  don't work properly on Safari (like re-executing React snippets).