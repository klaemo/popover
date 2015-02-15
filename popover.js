'use strict';

var domify = require('domify')
var offset = require('document-offset')
var Emitter = require('emitter-component')
var fs = require('fs')
var template = fs.readFileSync(__dirname + '/template.html', 'utf8')

module.exports = Popover

function Popover(opts) {
  if (!(this instanceof Popover)) return new Popover(opts)

  Emitter.call(this)

  this.opts = opts || {}

  this.el = domify(typeof opts.template === 'string' ? opts.template : template)

  var classes = this.opts.className ? this.opts.className.split(' ') : []
  classes.forEach(function(c) { this.el.classList.add(c) }, this)

  this.button = opts.button

  var btnRect = this.button.getBoundingClientRect()
  var btnOffset = offset(this.button)

  this.buttonCoords = {
    top: btnOffset.top,
    left: btnOffset.left,
    height: btnRect.height,
    width: btnRect.width
  }
}

Emitter(Popover.prototype);

Popover.prototype.show = Popover.prototype.render = function(className) {
  var self = this
  document.body.appendChild(this.el)
  this.opts.position = this.opts.position || 'right'
  this.position(this.opts.position)

  // push to the next render loop, so transition can work
  setTimeout(function() {
    self.el.classList.add(className || 'show')
    self.emit('shown')
  }, 0)

  return this
}

Popover.prototype.destroy = Popover.prototype.remove = function() {
  this.button = null
  this.el.parentNode.removeChild(this.el)

  this.emit('removed')
}

Popover.prototype.setContent = function(el) {
  el = typeof el === 'string' ? domify(el) : el
  this.el.querySelector('.popover-content').appendChild(el)
  return this
}

Popover.prototype.position = function(pos) {
  var x, y

  this.el.classList.add('popover-' + pos)
  this._rect = this.el.getBoundingClientRect()

  if (pos === 'top' || pos === 'bottom') {
    x = this._calculateX()
    y = pos === 'top' ? this.buttonCoords.top - this._rect.height : this.buttonCoords.top + this.buttonCoords.height

    this.el.style[this.opts.align || 'left'] = x + 'px'
    this.el.style.top = y + 'px'

    // position arrow accordingly
    this._positionArrow('left', this.el.getBoundingClientRect().left)
  }

  if (pos === 'right' || pos === 'left') {
    x = pos === 'right' ? this.buttonCoords.left + this.buttonCoords.width : this.buttonCoords.left - this._rect.width
    y = this._calculateY()

    this.el.style.left = x + 'px'
    this.el.style.top = y + 'px'

    // position arrow accordingly
    this._positionArrow('top', y)
  }

  return this
}

Popover.prototype._positionArrow = function(direction, offset) {
  var arrow = this.el.querySelector('.popover-arrow')
  if (!arrow) return
  var size = direction === 'top' ? 'height' : 'width'
  var pos = (this.buttonCoords[direction] + this.buttonCoords[size] / 2) - offset
  arrow.style[direction] = Math.round(pos) + 'px'
}

Popover.prototype._calculateY = function() {
  if (!this._rect) this._rect = this.el.getBoundingClientRect()
  var height = this._rect.height

  // center relative to the button
  var top = (this.buttonCoords.top + ((this.buttonCoords.height - height) / 2))

  this._autoAlign(top)

  if (this.opts.align === 'top') top = this.buttonCoords.top
  return top
}

Popover.prototype._calculateX = function() {
  if (!this._rect) this._rect = this.el.getBoundingClientRect()
  var width = this._rect.width

  // center relative to the button
  var x = (this.buttonCoords.left + ((this.buttonCoords.width - width) / 2))

  this._autoAlign(x)

  if (this.opts.align === 'left') x = this.buttonCoords.left
  if (this.opts.align === 'right') {
    x = window.innerWidth - (this.buttonCoords.left + this.buttonCoords.width)
  }
  return x
}

Popover.prototype._autoAlign = function(v) {
  if (!this._rect) this._rect = this.el.getBoundingClientRect()

  var width = this._rect.width
  var pos = this.opts.position
  var isVertical = pos === 'top' || pos === 'bottom'

  if (isVertical && v + width > window.innerWidth) this.opts.align = 'right'
  if (isVertical && v < 0) this.opts.align = 'left'
  if (!isVertical && v < 0) this.opts.align = 'top'
  // this.opts.align = 'bottom'

  return this
}
