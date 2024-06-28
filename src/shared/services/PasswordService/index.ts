import isStrongPassword from 'validator/es/lib/isStrongPassword'
//noinspection Duplicates
class PasswordService {

    public securePasswordOptions = {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}

    /** валидация происходит и на клиенте и на сервере */
    public passwordTooltip(): string {
        return 'Пароль должен содержать не менее 8 символов, заглавные и строчные буквы, цифры, пробелы и специальные символы.\n' +
            `Например: ${this.generateSavePassword()}`
    }

    private __generateRandomPassword(
        length = 12,
        characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
    ): string {

        return Array.from(crypto.getRandomValues(new Uint32Array(length)))
            .map(x => characters[x % characters.length])
            .join('')

    }

    public isSecurePassword(password: string): boolean {
        return isStrongPassword(password, this.securePasswordOptions)
    }


    public generateSavePassword(): string {

        let password: string | null = null
        do password = this.__generateRandomPassword()
        while (!this.isSecurePassword(password))
        return password

    }

}

export const passwordService = new PasswordService()