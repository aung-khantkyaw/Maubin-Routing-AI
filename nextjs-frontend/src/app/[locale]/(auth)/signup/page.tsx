"use client"
import AuthForm from "@/components/login-form";
import { signUpWithCredentials } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";
import { GalleryVerticalEnd } from "lucide-react";


export default function SignupPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Maubin Navigation
                </a>
                <AuthForm type={"SIGN_UP"} schema={signUpSchema} defaultValues={{ email: "", password: "", username: "" }} onSubmit={signUpWithCredentials} />

            </div>
        </div>
    )
}
