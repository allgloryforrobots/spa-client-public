export async function copyToBuffer(stringText: string) {
    await navigator.clipboard.writeText(stringText)
}