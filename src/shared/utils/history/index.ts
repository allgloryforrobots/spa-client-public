// можно вызывать не из React компонентов
// вызов redux
// history.navigate(from)

import {NavigateFunction, Location} from 'react-router-dom'

class History {
    navigate?: NavigateFunction
    location?: Location

    go(path: string) {
        if (!this.navigate || !this.location) {
            throw new Error('Запишите в historyClass navigate и location в App.ts')
        }

        if (this.navigate) {
            this.navigate(path)
        }
    }
}

const historyClass = new History()
export default historyClass



