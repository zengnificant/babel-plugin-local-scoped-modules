const Store = { resolve: {}, eject: {} }
const ejectValue = '__THE_ITEM_WAS_EJECTED__'

const { resolve, eject } = Store
const resolveItem = (name, value) => {
    if (name in resolve) return
    resolve[name] = value
}
const ejectItem = (name) => {
    if (name in eject) return
    eject[name] = ejectValue
}
export {
    resolve,
    eject,
    resolveItem,
    ejectItem
}