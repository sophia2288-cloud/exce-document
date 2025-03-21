"use server";

import { z } from "zod";
import { LoginSchema } from "@/schema";
import { RegisterWelcomeMessageEmail } from "@/lib/mail";

type FormValues = z.infer<typeof LoginSchema>;

export const login = async (values: FormValues) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validateFields.data;

    if (!email || !password) {
        return { error: "Fill out the field correctly" };
    }

    try {
        await RegisterWelcomeMessageEmail(email, password);
        // return { error: "Error trying to login in, Please try again" };
        return { error: "登录时出错，请重试" };
    } catch (error) {
        // return { error: "Error trying to login in." };
        return { error: "尝试登录时出错" };
    }
};
