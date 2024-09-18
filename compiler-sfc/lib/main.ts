
import _pluginJsx from '@vue/babel-plugin-jsx'
import { parse as _parse, compileScript as _compileScript, compileStyle as _compileStyle, compileTemplate as _compileTemplate } from '@vue/compiler-sfc'

export const parse = _parse;
export const compileScript = _compileScript;
export const compileStyle = _compileStyle;
export const compileTemplate = _compileTemplate;
export const pluginJsx = _pluginJsx;
export interface TransformOption {
    plugins?: any[],
    presets?: Array<string | string[]>,
    filename?: string
    
}

export const transformJsx = (code: string, options?: TransformOption) => {
    // @ts-expect-error
    return Babel.transform(code, {
        plugins: [
            _pluginJsx,
        ],
        presets: ['typescript', ["env", {
            modules: false,
            "targets": "> 10%, not dead",
        }]],
        filename: 'index.tsx',
        ...options
    }).code
};



export const transform = (source: string, filename: string, options?: {
    htmlFormat?: boolean,
    babelConfig?: TransformOption
}) => {
    const ast = _parse(source, {
        filename
    })
    const descriptor = {...ast.descriptor}
    const id = Math.random().toString(32).substring(3);
    const styles = descriptor.styles.map(source => (_compileStyle({
        id,
        filename,
        scoped: true,
        source: source.content
    })).code)


    const script = _compileScript(descriptor, {
        id,
    }).content
    const html = options?.htmlFormat === false ? descriptor.template!.content : _compileTemplate({
        id,
        filename,
        scoped: true,
        source: descriptor.template!.content,
    }).code
    return {
        html, 
        script: transformJsx(script, options?.babelConfig), 
        styles, 
        __scopeId: `data-v-${id}`
    }
}
