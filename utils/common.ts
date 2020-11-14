export function coalesce<T>(getter: () => T, value: T): T {
    try {
        const res = getter()
        return res === undefined ? value : res || value
    } catch (e) {
        return value
    }
}
