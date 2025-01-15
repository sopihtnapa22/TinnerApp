import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PasswordValidator = function (minLength: number, maxLength: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
        const password = control.value as string

        if (!password) return { required: true }
        else if (password.length < minLength)
            return { invaLidMinLength: true }
        else if (password.length > maxLength)
            return { invaLidMaxLength: true }
        else if (!/[a-z]/.test(password))
            return { invaLidLowerCase: true }
        else if (!/[A-Z]/.test(password))
            return { invaLidUpperCase: true }
        else if (!/[0-9]/.test(password))
            return { invaLidNumeric: true }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            return { invaLidSpecialChar: true }
        return null
    }
}
