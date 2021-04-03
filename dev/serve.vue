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
			text: 'Yoo',
		}
	},
	methods: {
		setText() {
			this.text = this.input
		},
	},
})
</script>

<template>
	<div id="app">
		<glitched-writer :text="text"></glitched-writer>
		<input type="text" v-bind="input" />
		<button @click="setText">Set Text</button>
	</div>
</template>
