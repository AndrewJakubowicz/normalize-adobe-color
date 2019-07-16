# Small Utility to normalize Adobe Animate colors

## Why?

Because when Adobe Animate exports art the colors are not kept as hex.
Instead some colors become `rgba` which our character customization system can't understand.

This script tries to very simply detect if an `rbga` color is a recognized customizable hex. And replaces the `rgba` color with the correct `hex` color.


To install use the following commands:

```bash
$ git clone git@github.com:AndrewJakubowicz/normalize-adobe-color.git
$ cd normalize-adobe-color
$ npm install
$ npm build
```

Run utility on a `.js` file with:

`npm run start -- -f <fileName>`
