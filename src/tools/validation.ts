import * as EmailValidator from 'email-validator'
import passwordValidator from 'password-validator'

export interface ValidationError {
    type: 'email' | 'passwordRules' | 'passwordMatch'
    info: string[]
}
export const validateEmail = (email: string) => {
    if (!EmailValidator.validate(email)) {
        const e: ValidationError = {
            type: 'email',
            info: ['E - postadressen ser inte ut att stämma'],
        }
        return e
    }
    return null
}

const schema = new passwordValidator()
schema
    .is()
    .min(6) // Minimum length 8
    .is()
    .max(30) // Maximum length 100
    //.has()
    //.uppercase() // Must have uppercase letters
    //.has()
    //.lowercase() // Must have lowercase letters
    //.has()
    //.digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']) // Blacklist these values

export const validatePassword = (password: string) => {
    const passwordValidation: any = schema.validate(password, { details: true })
    if (passwordValidation?.length > 0) {
        return {
            type: 'passwordRules',
            info: passwordValidation?.map((o: any) => o.message),
        } as ValidationError
    }
    return null
}

export const validateEmailAndPasswords = (
    email: string,
    password1: string,
    password2: string
): ValidationError[] | null => {
    const errors = [
        validateEmail(email),
        validatePassword(password1),
        password1 !== password2
            ? {
                  type: 'passwordMatch',
                  info: ['Lösenordet matchar inte'],
              }
            : null,
    ].filter((e) => !!e) as ValidationError[]
    return errors.length > 0 ? errors : null
}
