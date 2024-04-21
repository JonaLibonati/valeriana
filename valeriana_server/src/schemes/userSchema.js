import z from 'zod';

const nameCondition = (value) => {
    const nameRegex = new RegExp('[^a-zA-Z ]', 'g');
    return !nameRegex.test(value);
}

let userSchema = z.object({
    user_name: z.string().max(20),
    user_roleId: z.coerce.number().gte(2),
    user_password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[\S]{8,}$/g, { message: 'Invalid Regex' }),
    confirm_password: z.string(),
    email_address: z.string().email(),
    confirm_email: z.string().email(),
    first_name: z.string().max(30).refine(nameCondition, { message: 'Invalid Regex' }),
    last_name: z.string().max(30).refine(nameCondition, { message: 'Invalid Regex' })
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

export const validateLogin = (object) => {
    let user = userSchema.required({
        email_address: true,
        user_password: true
    });
    return user.safeParse(object);
}