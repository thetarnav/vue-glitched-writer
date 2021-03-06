import { defineComponent, computed, watch, onMounted, ref, h } from 'vue-demi'
import GlitchedWriterClass, { presets, CustomOptions, Callback, create } from 'glitched-writer'
import { escapeHtml } from './utils'

const component = defineComponent({
	name: 'GlitchedWriter',
	props: {
		text: {
			type: [String, Array],
			required: true,
		},
		pause: {
			type: Boolean,
			default: false,
		},
		preset: {
			type: String,
			default: 'default',
		},
		options: {
			type: Object,
			default: () => {},
		},
		queue: {
			type: Object,
			default: () => {},
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
		const writer = ref<GlitchedWriterClass>(),
			element = ref<HTMLElement>(),
			preset = computed(
				// @ts-ignore
				(): CustomOptions => presets[props.preset] ?? {},
			),
			writeOnAppear =
				attrs.appear !== undefined || (typeof props.text === 'object' && props.text.length > 0),
			queueInterval = computed(() =>
				typeof props.queue?.interval === 'number' ? props.queue.interval : undefined,
			),
			queueLoop = computed(() =>
				['number', 'boolean', 'function'].includes(typeof props.queue?.loop)
					? (props.queue.loop as Callback | boolean | number)
					: undefined,
			)
		const classes = computed(() => ('glitched-writer' + props.pause ? ' gw-paused' : ''))

		/**
		 * Options will react to preset and options props change
		 * And force writer to update them internally
		 */
		const computedOptions = computed(() => ({
			...preset.value,
			...props.options,
		}))
		watch(computedOptions, options => writer.value?.options.set(options))

		/**
		 * WRITE function
		 */
		function write() {
			if (props.pause) return

			// For string text prop: simply write
			if (typeof props.text === 'string') writer.value?.write(props.text)
			// For Array text prop:
			// parse array items into strings
			// and queue write that
			else {
				const texts = props.text.map(item => String(item))
				writer.value?.queueWrite(texts, queueInterval.value, queueLoop.value)
			}
		}
		watch(() => props.text, write)

		// Pause and Play
		watch(
			() => props.pause,
			pause => (pause ? writer.value?.pause() : writer.value?.play()),
		)

		/**
		 * Mounted hook
		 */
		onMounted(() => {
			// Set writer, after DOM is ready
			writer.value = create(element.value, computedOptions.value)

			writer.value.addCallback('step', (string, data) => emit('step', string, data))
			writer.value.addCallback('start', (string, data) => emit('start', string, data))
			writer.value.addCallback('finish', (string, data) => emit('finish', string, data))

			// Write initial text if props.appear is true
			writeOnAppear && write()
		})

		/**
		 * Initial text will be displayed as html element's content
		 * but only when appear attribute isn't present
		 * then it will animate initial text instead
		 */
		let initialText: string = ''
		if (attrs.appear === undefined) {
			const text = typeof props.text === 'string' ? props.text : String(props.text[0] ?? '')
			initialText = computedOptions.value.html ? text : escapeHtml(text)
		}

		return {
			writer,
			element,
			initialText,
			classes,
		}
	},
	render() {
		return h(
			this.tag,
			{
				class: this.classes,
				ref: 'element',
			},
			this.initialText,
		)
	},
})

export default component
