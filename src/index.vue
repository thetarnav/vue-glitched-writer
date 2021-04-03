<script lang="ts">
import Vue from 'vue'
import GlitchedWriter, { // <-- GlitchedWriter class
	WriterDataResponse, // <-- Type of response in callbacks
	glitchWrite, // <-- One time write funcion
	presets, // <-- Object with all prepared presets of options
	glyphs, // <-- Same but for glyph charsets
	wait, // <-- Ulitity async function, that can be used to wait some time
} from 'glitched-writer'
export { GlitchedWriter, glitchWrite, presets, glyphs, wait }

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
	computed: {
		appear(): boolean {
			return typeof this.$attrs.appear !== 'undefined'
		},
	},
	watch: {
		text(text: string) {
			this.writer.write(text)
		},
	},
	methods: {
		setTextContent(text: string): void {
			if (this.writer.options.html) this.$el.innerHTML = text
			else this.$el.textContent = text
		},
		step(string: string, writerData?: WriterDataResponse) {
			this.$emit('step', string, writerData)
		},
		finish(string: string, writerData?: WriterDataResponse) {
			this.$emit('finish', string, writerData)
		},
	},
	mounted() {
		this.writer = new GlitchedWriter(
			this.$el,
			this.options,
			this.step,
			this.finish,
		)
		this.setTextContent(this.text)

		if (this.appear) {
			this.setTextContent('')
			this.writer.write(this.text)
		}
	},
})
</script>

<template>
	<span class="glitched-writer"></span>
</template>
