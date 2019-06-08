export default class Plugin {
    constructor() {
        this.cachedMethodNames = []
        this.visitor = {}
    }
    addMethod(name, fn) {
        let methodname = name
        if (name in this.cachedMethodNames) {
            return;
        }
        this.cachedMethodNames.push(name)
        this.visitor[name] = (path, state) => fn(path, state, methodname)
    }
    getVisitor() {
        if (this.cachedMethodNames.length === 0) {
            return {}
        }
        return this.visitor
    }
}