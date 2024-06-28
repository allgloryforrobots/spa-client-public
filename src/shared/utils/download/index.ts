class ClientDownload {

    public txt(fileName: string, text: string) {
        const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
        this.__downloadFile(fileName, href)
    }

    private __downloadFile(fileName: string, href: string): void {

        const element = document.createElement('a')
        element.setAttribute('href', href)
        element.setAttribute('download', fileName)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)

    }

}

export const clientDownload = new ClientDownload()