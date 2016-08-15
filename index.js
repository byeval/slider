(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define([], factory(window.jQuery));
  } else {
    factory(window.jQuery);
  }
} (function ($) {
  function Slider(elem, options) {
    var self = this
    self.$elem = elem
    self.options = options
    self.total = 0
    self.current = 0
    self.interval = null
    self.sliding = false
    self.$slides = null

    // 初始化
    var init = function () {
      self.$container = self.$elem.find('.slider-inner')
      self.$slides = self.$container.children('.item')
      self.total = self.$slides.length

      var prop = 'width'
      if (self.options.direction === 'vertical') {
        prop = 'height'
      }

      // 设置容器尺寸和slide尺寸
      self.$container.css(prop, (self.total * 100) + '%')
      self.$slides.css(prop, (100 / self.total) + '%')

      self.options.autoPlay && self.play()
      self.options.showNav && createNav()
      self.options.showArrow && createArrow()

      return self.slideTo(self.current)
    }

    var createNav = function () {
      var $nav = $('<ul class="slider-indicators"></ul>')
      var $li = ''
      for (var i = 0; i < self.total; i++) {
        $li += '<li data-slide-to="' + i + '"></li>'
      }
      self.$navs = $nav.append($li)
      self.$elem.append($nav).on('click', '.slider-indicators li', function(e){
      	e.preventDefault()
        self.slideTo($(this).attr('data-slide-to'))
      })
    }

    var createArrow = function () {
      var arrow = '<a data-slide-action="prev" class="slider-arrow prev-arrow"><</a><a data-slide-action="next" class="slider-arrow next-arrow">></a>'
      self.$elem.append(arrow).on('click', '.slider-arrow', function(e){
        e.preventDefault()
        var action = $(this).attr('data-slide-action')
        self[action]()
      })
  }

    var setCurrent = function(pos){
      if(pos < 0){
        pos= self.total -1
      }
      self.current = pos
      if(self.options.showNav){
        self.$navs.find('[data-slide-to="' + pos + '"]').addClass('active').siblings().removeClass('active')
      }
      self.$slides.eq(self.current).addClass('active').siblings().removeClass('active')
      return self
    }

    self.slideTo = function (pos) {
      setCurrent(pos)
      
      if (self.options.autoPlay) {
        self.clear().play()
      }
      var prop = 'left'
      if(self.options.direction === 'vertical'){
        prop = 'top'
      }
      var style = {}
      style[prop] = -(100 * pos) + '%'
      
      return self.$container.animate(style, self.options.speed, self.options.easing, function(){
        if(self.options.onActive){
          self.options.onActive.call(this,self.current)
        }
      })
    }

    self.next = function next() {
      var pos = self.current + 1
      if (pos >= self.total) {
        pos = 0
      }
      return self.slideTo(pos)
    }

    self.prev = function prev() {
      return self.slideTo(self.current - 1)
    }

    self.play = function () {
      self.interval = setTimeout(function () {
        self.next()
      }, self.options.duration)
    }

    self.clear = function () {
      clearTimeout(self.interval)
      return self
    }

    return init()
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

  $.fn.Slider = function (options) {
    return this.each(function () {
      var $this = $(this)
      var opts = $.extend({}, Slider.defaults, options)

      if ($this.data('slider')) {
        return $this.data('slider')
      } else {
        return $this.data('slider', new Slider($this, opts))
      }
    })
  }
} ))