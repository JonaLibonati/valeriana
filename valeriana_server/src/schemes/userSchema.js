import z from 'zod';

const nameCondition = (value) => {
    const nameRegex = new RegExp('[^a-zA-Z ]', 'g');
    return !nameRegex.test(value);
}

let userSchema = z.object({
    user_name: z.string(),
    user_roleId: z.coerce.number().gte(2),
    user_password: z.string(),
    confirm_password: z.string(),
    email_address: z.string().email(),
    confirm_email: z.string().email(),
    first_name: z.string().refine(nameCondition, { message: 'Caracteres no permitidos.' }),
    last_name: z.string().refine(nameCondition, { message: 'Caracteres no permitidos.' })
}).partial();

const refinePassword = (schema) => {
    return schema.refine((data) => data.user_password === data.confirm_password, {
        message: 'Passwords are not the same',
        path: ["confirm_password"],
    });
}

const refineEmail = (schema) => {
    return schema.refine((data) => data.email_address === data.confirm_email, {
        message: 'eMail are not the same',
        path: ["confirm_email"],
    });
}


export const validateUser = (object) => {
    let user = userSchema.required();
    user = refinePassword(user);
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