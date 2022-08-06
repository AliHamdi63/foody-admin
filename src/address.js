export function getAddress(address){
    if(!address) return 'empty'
    return `${address?.BuildingNumber} ${address?.street} st. ${address?.area}, ${address?.city}`
}