### Information

- This was made by using **HTML**, **CSS** and **JavaScript**.

- The method of creating this artwork, was by creating a **Canvas** element in **HTML**, making it the same width and height of the window, using **CSS**

- Then, to animate the canvas, I created a grid on the canvas, by using **JavaScript**.

- The max amount of pixels that can fit on the canvas are **300x150**, meaning I had a maximum of **45,000 Pixels** to work with.
- I modified the pixels by going along the **X and Y Axis** and setting them to the **RGB** value which is calculated with the formula:

```js
var n = getMillisecondsSinceEpoch() + GridIndex * Math.sin((getMillisecondsSinceEpoch() / 10) * (Math.PI / 180)) / 2

var r = Math.floor(
	Math.sin(
		(
			Math.ceil(
				Math.abs(255 - ((x / 143) * 255)) + n / 3
			) / 255
		) * 360 * (Math.PI / 180)
	) * 255 / 2 + 255 / 2
)
var g = Math.floor(
	Math.cos(
		(
			Math.ceil(
				Math.abs(255 - ((y / 143) * 255)) + n / 4
			) / 255
		) * 360 * (Math.PI / 180)
	) * 255 / 2 + 255 / 2
)
var b = Math.floor(
	Math.cos(
		(
			Math.ceil(
				Math.abs(255 - ((x / 143) * 255)) + n / 5
			) / 255
		) * 360 * (Math.PI / 180)
	) * 255 / 2 + 255 / 2
)
```
- Once I got the **RGB** values, I drew them onto the grid, which when run, this is the result I ended up with.

# Result

![](https://raw.githubusercontent.com/VoncreDev/Portfolio/main/HtmlCanvasAnimation/Example.gif)
