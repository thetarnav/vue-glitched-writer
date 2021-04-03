import Vue, { PluginFunction, VueConstructor } from 'vue'
import GlitchedWriterClass, {
	ConstructorOptions,
	Callback,
	WriterDataResponse,
} from 'glitched-writer'

declare const GlitchedWriter: VueConstructor<Vue> & {
	install: PluginFunction<any>
}
export default GlitchedWriter

export {
	GlitchedWriterClass as GlitchedWriter,
	ConstructorOptions,
	Callback,
	WriterDataResponse,
}
