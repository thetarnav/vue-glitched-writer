<script lang="ts">
import Vue from 'vue'
import GlitchedWriter, {
	WriterDataResponse,
	glitchWrite,
	presets,
	glyphs,
	wait,
	ConstructorOptions,
} from 'glitched-writer'
export { GlitchedWriter, glitchWrite, presets, glyphs, wait }

export default /*#__PURE__*/ Vue.extend({
	name: 'GlitchedWriter',
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
		preset: {
			type: String,
			default: 'default',
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
		basePreset(): ConstructorOptions {
			return presets[this.preset as keyof typeof presets] ?? {}
		},
	},
	watch: {
		text(text: string) {
			this.writer.write(text)
		},
		options() {
			this.setOptions()
		},
		preset() {
			this.setOptions()
		},
		pause(paused: boolean) {
			paused ? this.writer.pause() : this.writer.play()
		},
	},
	methods: {
		setOptions() {
			this.writer.setOptions({
				...this.basePreset,
				...this.options,
			})
		},
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
			this.pause && this.writer.pause()
		}
	},
})
</script>

<template>
	<span class="glitched-writer"></span>
</template>
