import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";

const formSchema = z.object({
	email: z.email({
		error: (issue) =>
			issue === undefined
				? "The email is required."
				: "The field should be a valid email.",
	}),
	password: z
		.string({
			error: (issue) =>
				issue === undefined ? "The password is required." : "",
		})
		.min(8, { message: "The password should be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function SignInForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);
	// navigation
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const next = searchParams.get("next") ?? "/dashboard";

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "davidmariolc.dev@gmail.com",
			password: "12345678",
		},
	});

	async function onSubmit(data: FormData) {
		const { email, password } = data;
		await signIn.email(
			{
				email: email,
				password: password,
			},
			{
				onRequest: () => {
					setLoading(true);
					setError(null);
				},

				onSuccess: () => {
					setLoading(false);
					navigate(next, { replace: true });
				},
				onError: (ctx) => {
					setLoading(false);
					setError(ctx.error?.message);
				},
			},
		);
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
							<Input
								{...field}
								id="form-rhf-email"
								aria-invalid={fieldState.invalid}
								placeholder="me@example.com"
								autoComplete="off"
								required={true}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<div className="flex justify-between">
								<FieldLabel htmlFor="form-rhf-password">Password</FieldLabel>
								<a
									href="#link"
									className="ml-auto text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<Input
								{...field}
								type="password"
								id="form-rhf-password"
								aria-invalid={fieldState.invalid}
								placeholder="●●●●●●●●●●●"
								autoComplete="off"
								required={true}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<Field>
					{isLoading ? (
						<Button type="submit" disabled={isLoading}>
							<Spinner data-icon="inline-start" /> Login
						</Button>
					) : (
						<Button type="submit">Login</Button>
					)}
				</Field>
				<FieldSeparator>Or continue with</FieldSeparator>
				<Field>
					<Button variant="outline" type="button">
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								fill="currentColor"
							/>
						</svg>
						Login with GitHub
					</Button>
					<FieldDescription className="text-center">
						Don&apos;t have an account?{" "}
						<Link to="/signup" className="underline underline-offset-4">
							Sign up
						</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
