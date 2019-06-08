import Plugin from './PluginClass.js'
import methodPairs from './localScopedModules'

export default function({ types: t }) {
    let pluginInstance = new Plugin();
    methodPairs.forEach(method => {
        let { name, fn } = method
        pluginInstance.addMethod(name, fn)
    })
    let visitor = pluginInstance.getVisitor()
    return { visitor }
}