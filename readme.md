# Slider
Just another jQuery slider plugin.

## Usage
```
<script src="cdn.jquery.js"></script>
<script src="slider.js"></script>
<script>
	$(document).ready(function(){
		var slider = $('.slider').Slider(options)
		// or use constructor function
		var slider = new $.fn.Slider('.slider', options)
	})
</script>
```

## Options
```
Slider.defaults = {
	speed: 400, // speed the slider switch
	easing: 'swing', // which easing function to use for the transition
	duration: 3000, // 
	direction: 'horizontal', // which direction the slider scroll, support 'horizontal' and 'vertical'
	autoPlay: true, // wether auto start scroll
	showNav: true, // wether show slider indicators
	showArrow: true, // wether show arrow
	onActive: null // callback function when slider finish the transition
}
```

## Method

### `.prev()`
slide to previous slider.

### `.next()`
slide to next slider.

### `.slideTo(index:number)`
slide to a specify index slider.


## Demo
See in [jsfidder](https://jsfiddle.net/p8L1oynh/7/)

## Author
[xuhong](https://github.com/xuhong)

## License
MIT