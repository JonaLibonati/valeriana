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
    first_name: z.string().refine(nameCondition, {message: 'Caracteres no permitidos.'}),
    last_name: z.string().refine(nameCondition, {message: 'Caracteres no permitidos.'})
}).required();

userSchema = userSchema.refine( (data) => data.user_password === data.confirm_password, {
    message: 'Passwords are not the same',
    path: ["confirm_password"],
});
userSchema = userSchema.refine( (data) => data.email_address === data.confirm_email, {
    message: 'eMail are not the same',
    path: ["confirm_email"],
});

export const validateUser = (object) => {
    return userSchema.spa(object);
}

