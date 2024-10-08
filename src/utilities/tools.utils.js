export const truncateAddress = (address) => {
    if (!address) return 'No Account'
    const match = address.match(
        /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    )
    if (!match) return address
    return `${match[1]}…${match[2]}`
}

export const toHex = (num) => {
    const val = Number(num)
    return '0x' + val.toString(16)
}

export const formatDate = (timestamp) => {
    const formatter = new Date(timestamp)
    const date = formatter.toLocaleDateString()
    const time = formatter.toLocaleTimeString()
    return date + ' - ' + time
}