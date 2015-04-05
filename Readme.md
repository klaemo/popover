# Popover Component
Pretty small (7.5kb minified, 2.6kb gzipped), pretty reliable popovers.
Loosely follows Backbone's/Ampersand's [View Conventions](http://ampersandjs.com/learn/view-conventions), but doesn't require to be used with either one.

Take a look at `test/test.html` or the [demo site](https://klaemo.github.io/popover) for examples. Both use the entirely optional themed version, so don't let that fool you ;-).

## Installation

```
npm install --save popover
```
or download `popover.built.js`

## Usage

Get it in your page either by script tag or module loader/browserify.
You'll also need at least `popover.css` or style them yourself.

```javascript
var popover = new Popover({
  button: document.querySelector('#triggering-button'),
  position: 'left|top|right|bottom',
  className: 'optional space-delimited css-classes',
  align: 'left|top|right', // optionally aligns popover relative to button
  template: 'HTMLString|DOMElement' // optional
})
popover.render()
```

## API

- `popover.setButton('String|DOMElement')`: Attaches popover to given element
- `popover.setContent('String|HTMLString|DOMElement')`: Sets the content of the popover
- `popover.render()`: Renders, positions and displays the popover
- `popover.remove()`: Removes the popover from the DOM
- `popover.el`: The popover DOM element

The methods are chainable. So, for example `popover.setContent('foo').setButton('#button').render().el` will work.

## Events

  - `shown` the popover is shown
  - `removed` the popover is removed

## Templates

Standard template:
```html
<div class="popover">
  <div class="popover-arrow"></div>
  <div class="popover-content"></div>
</div>
```

If you're passing in a custom template, at least `.popover-content` has to be present.
The popover comes with minimal styles, feel free to adapt it to your needs. For your convenience
there is a themed version in `popover-theme.css`.

## Contributors

- [fmal](https://github.com/fmal)
- [staygrimm](https://github.com/staygrimm)

## License
ISC
