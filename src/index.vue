<script lang="ts">
import Vue from 'vue'
import GlitchedWriter from 'glitched-writer'

export default /*#__PURE__*/ Vue.extend({
	name: 'GlitchedWriter', // vue component name
	props: {
		text: {
			type: String,
			required: true,
		},
		pause: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			writer: (null as unknown) as GlitchedWriter,
		}
	},
	created() {
		this.writer = new GlitchedWriter(this.$el, this.options)
	},
	mounted() {
		this.$el.textContent = this.text
	},
})
</script>

<template>
	<span class="glitched-writer"></span>
</template>
