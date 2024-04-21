import z from 'zod';

const nameCondition = (value) => {
    const nameRegex = /[^a-zA-Z ]/g;
    return !nameRegex.test(value);
}

let userSchema = z.object({
    user_name: z.string().max(20),
    user_roleId: z.coerce.number().gte(2),
    user_password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[\S]{8,}$/g, { message: 'La contraseña requiere minimo 8 caracteres con al menos un numero, una mayuscula y una minuscula. No usar espacios.' }),
    confirm_password: z.string(),
    email_address: z.string().email({ message: 'El eMail no es valido' }),
    confirm_email: z.string(),
    first_name: z.string().max(30).refine(nameCondition, { message: 'El nombre y apellido solo puede contener caracteres de la\xa0A\xa0a\xa0la\xa0Z.' }),
    last_name: z.string().max(30).refine(nameCondition, { message: 'El nombre y apellido solo puede contener caracteres de la\xa0A\xa0a\xa0la\xa0Z.' })
}).partial();

const refinePassword = (schema) => {
    return schema.refine((data) => data.user_password === data.confirm_password, {
        message: 'La contraseñas no son iguales',
        path: ["confirm_password"],
    });
}

const refineEmail = (schema) => {
    return schema.refine((data) => data.email_address === data.confirm_email, {
        message: 'Los eMail no son iguales',
        path: ["confirm_email"],
    });
}

export const validateAllUser = (object) => {
    let user = userSchema.required();
    user = refinePassword(user);
    user = refineEmail(user);
    return user.safeParse(object);
}

export const validateName = (object) => {
    let user = userSchema.required({
        first_name: true,
        last_name: true,
    });
    return user.safeParse(object);
}

export const validateUserName = (object) => {
    let user = userSchema.required({
        user_name: true,
    });
    return user.safeParse(object);
}

export const validateNewEmail = (object) => {
    let user = userSchema.required({
        email_address: true,
        confirm_email: true,
    });
    user = refineEmail(user);
    return user.safeParse(object);
}

export const validateNewPassword = (object) => {
    let user = userSchema.required({
        user_password: true,
        confirm_password: true,
    });
    user = refinePassword(user);
    return user.safeParse(object);
}
