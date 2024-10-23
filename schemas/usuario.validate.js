import yup from 'yup'

export const usuarioSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16)
                .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
                .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
                .matches(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial'),
    passwordConfirm: yup.string().oneOf( [ yup.ref("password") ], "Las contraseñas deben conincidir" ).required(),
    age: yup.number().integer().min(18, "Debes tener al menos 18")
})

export const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16)
                .matches(/[0-9]/, "La contraseña debe tener al menos un numero")
                .matches(/[A-Z]/, "La contraseña debe tener al menos una mayuscula")
                .matches(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial')
}) 