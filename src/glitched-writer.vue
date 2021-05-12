<script lang="ts">
import { defineComponent, computed, watch, onMounted, ref } from 'vue'
import GlitchedWriter, {
	WriterDataResponse,
	presets,
	glyphs,
	wait,
	ConstructorOptions,
} from '../node_modules/glitched-writer'
import { escapeHtml } from './utils'
export { GlitchedWriter, presets, glyphs, wait }

type WriterCallback = (string: string, data: WriterDataResponse) => void

export default defineComponent({
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
		silent: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { emit, attrs }) {
		const writer = ref((null as unknown) as GlitchedWriter),
			element = ref(null as null | HTMLElement),
			preset = computed(
				// @ts-ignore
				(): ConstructorOptions => presets[props.preset] ?? {},
			)

		/**
		 * Options will react to preset and options props change
		 * And force writer to update them internally
		 */
		const computedOptions = computed(() => ({
			...preset.value,
			...props.options,
		}))
		watch(computedOptions, options => writer.value.setOptions(options))

		/**
		 * Writer state callbacks:
		 */
		const onStep: WriterCallback = (string, data) =>
			emit('step', string, data)
		const callFinish = () => {
			if (props.pause) return
			const { string, writerData } = writer.value
			emit('finish', string, writerData)
		}

		async function write() {
			if (props.pause) return
			await writer.value.write(props.text)
			callFinish()
		}
		watch(() => props.text, write)

		// Pause and Play
		watch(
			() => props.pause,
			async pause => {
				if (pause) writer.value.pause()
				else {
					await writer.value.play()
					callFinish()
				}
			},
		)

		/**
		 * Mounted hook
		 */
		onMounted(() => {
			// Set writer, after DOM is ready
			writer.value = new GlitchedWriter(
				element.value,
				computedOptions.value,
				onStep,
			)

			// Write initial text if props.appear is true
			attrs.appear !== undefined && write()
		})

		/**
		 * Initial text will be displayed as html element's content
		 * but only when appear attribute isn't present
		 * then it will animate initial text instead
		 */
		let initialText: string = ''
		if (attrs.appear === undefined)
			initialText = computedOptions.value.html
				? props.text
				: escapeHtml(props.text)

		return {
			writer,
			element,
			initialText,
		}
	},
})
</script>

<template>
	<span class="glitched-writer" ref="element" v-html="initialText"></span>
</template>
