<script lang="ts">
import Vue from 'vue'
import GlitchedWriter from '@/index.vue'

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
				step: [0, 10],
				initialDelay: [500, 2000],
			},
		}
	},
	methods: {
		setText() {
			this.text = this.input
		},
		log(what: string) {
			console.log(what)
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
		<br />
		<glitched-writer
			:text="text"
			:options="options"
			appear
			@step="log('STEP')"
			@finish="log('FINISH')"
		></glitched-writer>
	</div>
</template>
