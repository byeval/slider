# Slider
Just another jQuery slider plugin. [demo](https://xuhong.github.io/slider)

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

### `speed(Number)`
Set slider switch animation duration in millisecond, default 400

### `easing(String)`
Which easing function to use for the transition

### `duration(Number)`
Every single slider display duration

### `direction(String)`
Which direction the slider to scroll, default 'horizontal', can also be set to 'vertical'

### `autoPlay(Boolean)`
Whether auto start

### `showNav(Boolean)`
Whether show slider indicators

### `showArrow(Boolean)`
Whether show prev and next arrows

### `onActive(Function)`
Callback function when slider finish the transition

```
Slider.defaults = {
	speed: 400, 
	easing: 'swing', 
	duration: 3000, 
	direction: 'horizontal', 
	autoPlay: true, 
	showNav: true, 
	showArrow: true,
	onActive: null
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

[https://xuhong.github.io/slider](https://xuhong.github.io/slider)

## Author
[xuhong](https://github.com/xuhong)

## License
MIT