const Store = {}

export default {
    getStore() {
        return Store
    }
    addItem(name, value) {
        if (name in Store) return
        Store[name] = value
    }
}