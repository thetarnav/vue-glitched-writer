# Glitched Writer Vue Component

[![npm](https://img.shields.io/npm/v/vue-glitched-writer)](https://www.npmjs.com/package/vue-glitched-writer) [![npm type definitions](https://img.shields.io/npm/types/vue-glitched-writer)](https://www.npmjs.com/package/vue-glitched-writer) [![](https://data.jsdelivr.com/v1/package/npm/vue-glitched-writer/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue-glitched-writer) [![NPM](https://img.shields.io/npm/l/vue-glitched-writer)](https://www.npmjs.com/package/vue-glitched-writer)

[![glitched-writer-preview](https://user-images.githubusercontent.com/24491503/67164275-06ab6900-f379-11e9-81ac-cab76dbc8dcd.gif)](https://codepen.io/thetarnav/pen/MWWyPzY)

### What is [Glitched Writer](https://www.npmjs.com/package/glitched-writer):

> **A lightweight, glitched, text writing module. Highly customizable settings. Decoding, decrypting, scrambling, and simply spelling out text.**

### Vue component

> This is a **Vue.js component**, working as a simple wrapper for [**Glitched Writer**](https://www.npmjs.com/package/glitched-writer) to simplify it's usage in Vue.

---

### >>> [CODEPEN DEMOS](https://codepen.io/collection/XWVEEa) <<< | >>> [NPM](https://www.npmjs.com/package/vue-glitched-writer) <<< | >>> [JS Version](https://www.npmjs.com/package/glitched-writer) <<<

---

## Installation

Download and install with npm.

```bash
npm i vue-glitched-writer
```

```js
import GlitchedWriter from 'vue-glitched-writer'
```

Or use [Skypack](https://www.skypack.dev/view/vue-glitched-writer) to import without need to install the package.

```js
import GlitchedWriter from 'https://cdn.skypack.dev/vue-glitched-writer'
```

## Usage:

### Declare component

```html
<script>
	export default {
		components: {
			GlitchedWriter,
		},
	}
</script>
```

### Animate text instantly after load

Will animate blank -> passed text property

```html
<glitched-writer text="Your Content" appear />
```

### Write text dynamically

Previous text -> new text

```html
<glitched-writer :text="text" />
```

```js
{
   data() {
      return {
         text: 'Your dynamic text.'
      }
   },
   mounted() {
      setTimeout(() => {
         this.text = 'Something new!'
         // Glitched Writer will animate this text change
      }, 3000)
   }
}
```

### Custom Options

See [Glitched Writer's Option List](https://github.com/thetarnav/glitched-writer#customizing-behavior).

#### **Passing options object to component.**

```js
{
   data() {
      return {
         text: 'Your Text',
         options: {
            html: true,
            letterize: true,
            steps: [0, 10],
            initialDelay: [500, 2000],
            glyphs: 'QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()1234567890'
         },
      }
   },
}
```

```html
<glitched-writer :text="text" :options="options" />
```

#### **Changing options later**

When changing options object (passed to the component), you need to remember to reassign the object property, instead of modifying it.

```js
{
   methods: {
      changeOprions(){
         // RIGHT
         this.options = {
            steps: [2, 15],
            html: false
         }

         // WRONG: this.options.steps = [2, 15]
      }
   }
}
```

### Pausing the animation

The "pause" boolean property is responsible for programatic pausing.
Simply set "pause" property to true if you want the animation to stop.

```js
{
   data() {
      return {
         pause: true
      }
   },
}
```

```html
<glitched-writer :text="text" :pause="pause" />
```

### Component Events

Glitched Writer emits event on every **step** and writing **finish**.

```html
<glitched-writer :text="text" @step="method" @finish="method" />
```

```ts
{
   methods: {
      method(currentString: string, writerData: WriterDataResponse){
         console.log(currentString, writerData.options)
      }
   }
}

// WriterDataResponse: {
// 	string: string
// 	writer: GlitchedWriter
// 	options: Options
// 	state: State
// 	status?: 'ERROR' | 'SUCCESS'
// 	message?: string
// 	error?: any
// }
```

### Available Imports

```ts
import GlitchedWriter, { // <-- Vue component
	GlitchedWriter, // <-- GlitchedWriter class
	ConstructorOptions, // <-- Options type
	Callback, // <-- Callback type
	WriterDataResponse, // <-- Type of response in callbacks
	glitchWrite, // <-- One time write funcion
	presets, // <-- Object with all prepared presets of options
	glyphs, // <-- Same but for glyph charsets
	wait, // <-- Ulitity async function, that can be used to wait some time
} from 'vue-glitched-writer'
```

## More Information

> If you are curious about further customization of animation effect and behavior, then please visit the original [Glitched Writer Readme](https://github.com/thetarnav/glitched-writer#table-of-contents). There you'll find description of every option and some use cases.
