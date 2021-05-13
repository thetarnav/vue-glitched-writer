<script lang="ts">
import { defineComponent, computed, watch, onMounted, ref } from 'vue'
import GlitchedWriter, {
	WriterDataResponse,
	presets,
	ConstructorOptions,
} from '../node_modules/glitched-writer'
import { escapeHtml } from './utils'

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
		tag: {
			type: String,
			default: 'span',
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
				emit('step', string, data),
			onFinish: WriterCallback = (string, data) =>
				emit('finish', string, data)

		function write() {
			if (props.pause) return
			writer.value.write(props.text)
		}
		watch(() => props.text, write)

		// Pause and Play
		watch(
			() => props.pause,
			pause => (pause ? writer.value.pause() : writer.value.play()),
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
				onFinish,
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
	<component
		:is="tag"
		ref="element"
		v-html="initialText"
		class="glitched-writer"
		:class="{ 'gw-paused': pause }"
	></component>
</template>
