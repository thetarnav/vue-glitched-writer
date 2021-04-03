import Vue, { PluginFunction, VueConstructor } from 'vue';

declare const GlitchedWriter: VueConstructor<Vue> & { install: PluginFunction<any>; };
export default GlitchedWriter;
