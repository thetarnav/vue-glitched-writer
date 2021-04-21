<script lang="ts">
import { defineComponent } from 'vue'
import GlitchedWriter, { wait } from '@/glitched-writer.vue'
import { ConstructorOptions } from '../glitched-writer'

export default defineComponent({
	name: 'ServeDev',
	components: {
		GlitchedWriter,
	},
	data() {
		return {
			input: '',
			text: 'Okay',
			options: {
				html: true,
				letterize: true,
				steps: [0, 10],
				initialDelay: [500, 2000],
				startFrom: 'erase',
			} as ConstructorOptions,
			pause: false,
			preset: 'default',
			texts: [
				'Hello and Welcome',
				'to the great erase test',
				'will it work here?',
			],
			index: -1,
		}
	},
	methods: {
		setText() {
			this.text = this.input
		},
		log(what: string) {
			console.log(what)
		},
		changeOptions() {
			this.options = {
				html: true,
				steps: [0, 10],
				initialDelay: [500, 2000],
			}
		},
		changePreset() {
			this.preset = 'zalgo'
		},
		async afterFinish() {
			console.log('Yooo')

			await wait(1000)
			this.index++
			if (this.index >= this.texts.length) this.index = 0
			this.text = this.texts[this.index]
		},
	},
})
</script>

<template>
	<div id="app">
		<form>
			<input type="text" v-model="input" />
			<button type="submit" @click.prevent="setText">Set Text</button>
		</form>
		<button @click="changeOptions">Change Options</button>
		<button @click="changePreset">Change Preset</button>
		<br />
		<glitched-writer
			:text="text"
			:options="options"
			:pause="pause"
			:preset="preset"
			appear
			@step="log('STEP')"
			@finish="afterFinish"
		></glitched-writer>
	</div>
</template>
