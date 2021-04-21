<script lang="ts">
import Vue from 'vue'
import GlitchedWriter, {
	WriterDataResponse,
	presets,
	ConstructorOptions,
} from 'glitched-writer'

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
		text() {
			this.write()
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
		finish() {
			if (this.pause) return
			const { string, writerData } = this.writer
			this.$emit('finish', string, writerData)
		},
		async write() {
			await this.writer.write(this.text)
			this.finish()
		},
	},
	mounted() {
		this.writer = new GlitchedWriter(this.$el, this.options, this.step)
		this.setTextContent(this.text)

		if (this.appear) {
			this.setTextContent('')
			this.write()
			this.pause && this.writer.pause()
		}
	},
})
</script>

<template>
	<span class="glitched-writer"></span>
</template>
