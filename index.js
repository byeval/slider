;(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'))
  } else if (typeof define === 'function' && define.amd) {
    define([], factory(window.jQuery))
  } else {
    factory(window.jQuery)
  }
}(function ($) {
  function Slider (elem, options) {
    this.$elem = elem
    this.options = options
    this.total = 0
    this.current = 0
    this.interval = null
    this.$slides = null
    this.$container = null

    this._init()
  }

  Slider.prototype._init = function () {
    var self = this
    this.$container = this.$elem.find('.slider-inner')
    this.$slides = this.$container.children('.item')
    this.total = this.$slides.length

    var prop = 'width'
    if (this.options.direction === 'vertical') {
      prop = 'height'
    }

    // 设置容器尺寸和slide尺寸
    this.$container.css(prop, (this.total * 100) + '%')
    this.$slides.css(prop, (100 / this.total) + '%')

    this.options.autoPlay && this.play()
    this.options.showNav && createNav()
    this.options.showArrow && createArrow()

    function createNav () {
      var $nav = $('<ul class="slider-indicators"></ul>')
      var $li = ''
      for (var i = 0; i < self.total; i++) {
        $li += '<li data-slide-to="' + i + '"></li>'
      }
      self.$navs = $nav.append($li)
      self.$elem.append($nav).on('click', '.slider-indicators li', function (e) {
        e.preventDefault()
        self.slideTo($(this).attr('data-slide-to'))
      })
    }

    function createArrow () {
      var arrow = '<a data-slide-action="prev" class="slider-arrow prev-arrow"><</a><a data-slide-action="next" class="slider-arrow next-arrow">></a>'
      self.$elem.append(arrow).on('click', '.slider-arrow', function (e) {
        e.preventDefault()
        var action = $(this).attr('data-slide-action')
        self[action]()
      })
    }
    return this
  }

  Slider.prototype._setCurrent = function (pos) {
    if (pos < 0) {
      pos = this.total - 1
    }
    this.current = pos
    if (this.options.showNav) {
      this.$navs.find('[data-slide-to="' + pos + '"]').addClass('active').siblings().removeClass('active')
    }
    this.$slides.eq(this.current).addClass('active').siblings().removeClass('active')
    return this
  }

  Slider.prototype.slideTo = function (pos) {
    var self = this
    this._setCurrent(pos)

    if (this.options.autoPlay) {
      this.clear().play()
    }
    var prop = 'left'
    if (this.options.direction === 'vertical') {
      prop = 'top'
    }
    var style = {}
    style[prop] = -(100 * this.current) + '%'

    this.$container.animate(style, this.options.speed, this.options.easing, function () {
      if (self.options.onActive) {
        self.options.onActive.call(self, self.current)
      }
    })
    return this
  }

  Slider.prototype.next = function next () {
    var pos = this.current + 1
    if (pos >= this.total) {
      pos = 0
    }
    return this.slideTo(pos)
  }

  Slider.prototype.prev = function prev () {
    return this.slideTo(this.current - 1)
  }

  Slider.prototype.play = function () {
    var self = this
    this.interval = setTimeout(function () {
      self.next()
    }, self.options.duration)
    return this
  }

  Slider.prototype.clear = function () {
    clearTimeout(this.interval)
    return this
  }

  // 默认配置
  Slider.defaults = {
    speed: 400,
    easing: 'swing', // jQuery animate 方法支持的效果
    duration: 3000,
    direction: 'horizontal',
    autoPlay: true,
    showNav: true,
    showArrow: true,
    onActive: null
  }

  $.fn.Slider = function () {
    var elem, options
    if (this instanceof $) {
      elem = this
      options = arguments[0]
    } else {
      elem = $(arguments[0])
      options = arguments[1]
    }
    var opts = $.extend({}, Slider.defaults, options)
    var slider = new Slider(elem, opts)
    elem.data('slider', slider)
    return slider
  }
}))
