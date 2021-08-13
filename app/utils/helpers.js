export default function getDateAndTime(epochTime) {
    const date = new Date(epochTime * 1000)
    return `${date.toLocaleDateString('en-US')}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
}