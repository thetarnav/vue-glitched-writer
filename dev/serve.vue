<script lang="ts">
import Vue from 'vue'
import GlitchedWriter from '@/index.vue'
import { ConstructorOptions } from 'vue-glitched-writer'

export default Vue.extend({
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
			} as ConstructorOptions,
			pause: false,
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
				html: false,
				letterize: true,
				steps: [0, 10],
				initialDelay: [500, 2000],
			}
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
		<br />
		<glitched-writer
			:text="text"
			:options="options"
			:pause="pause"
			appear
			@step="log('STEP')"
			@finish="log('FINISH')"
		></glitched-writer>
	</div>
</template>
