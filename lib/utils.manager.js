const _enumObjectFromKeys = (keys) => {
    const e = {}

    for (const key of keys) {
        e[key] = key
    }

    return e
}

exports.enumObjectFromKeys = _enumObjectFromKeys;