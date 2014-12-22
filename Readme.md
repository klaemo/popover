# Popover Component
Pretty small (11kb), pretty reliable popovers.
Loosely follows Backbone's/Ampersand's [View Conventions](http://ampersandjs.com/learn/view-conventions),
but doesn't require to be used with either one.

Take a look at `test/test.html` for examples.

## Installation

```
npm install --save popover
```
or download `popover.built.js`

## Usage

Get in your page either by script tag or module loader.

```
var popover = new Popover({
  button: document.querySelector('#triggering-button'),
  position: 'left|top|right|bottom',
  className: 'optional space-delimited css-classes'
})
popover.render()
```

## API

TODO...

## License
ISC