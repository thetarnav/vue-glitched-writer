<script lang="ts">
import { defineComponent, ref } from 'vue'
// import GlitchedWriter from '@/vue-glitched-writer.vue'
// @ts-ignore
// import * as gw from '../dist/vue-glitched-writer.esm.js'
import GlitchedWriter from '../src/index'

// console.log(gw)

export default defineComponent({
	name: 'HelloWorld',
	components: {
		// GlitchedWriter: gw.default,
		GlitchedWriter,
	},
	setup() {
		const paragraph = `
		For a guide and recipes on how to configure / customize this project, <br/>
      check out the <a href="https://github.com/thetarnav/vue-glitched-writer" target="_blank">vue glitched writer repo</a>.`,
			texts = [
				'First Text Of The Queue.',
				'Second Item of the Queue!',
				'Next up is...',
				'THE LAST ONE',
			]

		const inputText = ref('Welcome to Vue Glitched Writer!')

		return {
			paragraph,
			texts,
			inputText,
		}
	},
})
</script>

<template>
	<div id="app">
		<GlitchedWriter
			tag="h1"
			:text="inputText"
			:options="{ letterize: true }"
			appear
			class="text"
		/>
		<GlitchedWriter
			tag="p"
			:text="paragraph"
			:options="{ html: true }"
			appear
			class="paragraph"
		/>
		<GlitchedWriter
			tag="p"
			:text="texts"
			:queue="{
				loop: true,
			}"
			preset="encrypted"
			:options="{ letterize: true }"
			appear
			class="queue-text"
		/>

		<input class="input" v-model.lazy="inputText" />
	</div>
</template>

<style lang="scss">
#app {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: white;

	> * {
		margin: 20px auto;
	}
}

.paragraph {
	font-family: monospace;
}

.queue-text {
	font-family: monospace;
	will-change: contents, width;
	font-size: 2rem;

	.gw-char:not(.gw-finished) {
		.gw-ghosts {
			opacity: 0.5;
		}
	}
	.gw-glitched {
		opacity: 0.5;
	}
}
</style>
