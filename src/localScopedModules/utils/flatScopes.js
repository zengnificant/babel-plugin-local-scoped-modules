export default function(scopes) {
    let flatScopes = []
    scopes.forEach((scope, index) => {
        let { name, alias, dir } = scope
        flatScopes.push({ name, dir })
        if (!alias) return;
        if (Array.isArray(alias)) {
            alias.forEach(name => flatScopes.push({ name, dir }))
        } else {
            flatScopes.push({ name: alias, dir })
        }
    })

    return flatScopes
}