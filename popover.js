'use strict';

var domify = require('domify')
var offset = require('document-offset')
var fs = require('fs')
var template = fs.readFileSync(__dirname + '/template.html', 'utf8')

module.exports = Popover

function Popover(opts) {
  if (!(this instanceof Popover)) return new Popover(opts)

  this.opts = opts || {}

  this.el = domify(typeof opts.template === 'string' ? opts.template : template)
  
  var classes = this.opts.className ? this.opts.className.split(' ') : []
  classes.forEach(function(c) { this.el.classList.add(c) }, this)

  this.button = opts.button

  var buttonOffset = offset(this.button)

  this.buttonCoords = {
    top: buttonOffset.top,
    left: buttonOffset.left,
    height: this.button.clientHeight,
    width: this.button.clientWidth
  }
}

Popover.prototype.show = Popover.prototype.render = function(className) {
  var self = this
  document.body.appendChild(this.el)
  this.position(this.opts.position || 'right')

  // push to the next render loop, so transition can work
  setTimeout(function() {
    self.el.classList.add(className || 'show')
  }, 0)
  return this
}

Popover.prototype.destroy = Popover.prototype.remove = function() {
  this.button = null
  this.el.parentNode.removeChild(this.el)
}

Popover.prototype.setContent = function(el) {
  el = typeof el === 'string' ? domify(el) : el
  this.el.querySelector('.popover-content').appendChild(el)
  return this
}

Popover.prototype.position = function(pos) {
  var top, left

  if (pos === 'bottom') {
    this.el.classList.add('popover-bottom')
    this.el.style.top = Math.round(this.buttonCoords.top + this.buttonCoords.height) + 'px'

    left = this._getLeft()
    this.el.style.left = left + 'px'

    // position arrow accordingly
    this._positionArrow('left', left)
    return this
  }

  if (pos === 'right') {
    this.el.classList.add('popover-right')
    this.el.style.left = Math.round(this.buttonCoords.left + this.buttonCoords.width) + 'px'

    top = this._getTop()
    this.el.style.top = top + 'px'

    // position arrow accordingly
    this._positionArrow('top', top)
    return this
  }

  if (pos === 'left') {
    this.el.classList.add('popover-left')
    var w = this.el.getBoundingClientRect().width
    this.el.style.left = Math.round(this.buttonCoords.left - w) + 'px'

    top = this._getTop()
    this.el.style.top = top + 'px'

    // position arrow accordingly
    this._positionArrow('top', top)
    return this
  }

  if (pos === 'top') {
    this.el.classList.add('popover-top')
    this.el.style.top = Math.round(this.buttonCoords.top - this.el.getBoundingClientRect().height) + 'px'

    left = this._getLeft()
    this.el.style.left = left + 'px'

    // position arrow accordingly
    this._positionArrow('left', left)
    return this
  }
}

Popover.prototype._positionArrow = function(direction, offset) {
  var arrow = this.el.querySelector('.popover-arrow')
  if (!arrow) return
  var size = direction === 'top' ? 'height' : 'width'
  var pos = (this.buttonCoords[direction] + this.buttonCoords[size] / 2) - offset
  arrow.style[direction] = Math.round(pos) + 'px'
}

Popover.prototype._getTop = function() {
  var height = this.el.getBoundingClientRect().height
  var top = (this.buttonCoords.top + ((this.buttonCoords.height - height) / 2))
  // minimal distance
  top = top < 5 ? 5 : top
  return top
}

Popover.prototype._getLeft = function() {
  var width = this.el.getBoundingClientRect().width
  var left = (this.buttonCoords.left + ((this.buttonCoords.width - width) / 2))
  // minimal distance
  left = left < 5 ? 5 : left
  return left
}
