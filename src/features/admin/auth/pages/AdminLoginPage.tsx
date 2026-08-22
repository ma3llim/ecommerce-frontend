import { APP_NAME } from '@/constants';
import { useForm } from 'react-hook-form';
import { adminLoginSchema, type AdminLoginFormData } from '../schemas/adminLogin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';

const AdminLoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AdminLoginFormData>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: AdminLoginFormData) => {
        console.log('Login Data', data);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md p-8">
                <div className="mb-8 space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>

                    <p className="text-sm text-muted-foreground">Sign in to your {APP_NAME} admin account</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email address</FieldLabel>

                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="admin@example.com"
                                {...register('email')}
                                aria-invalid={!!errors.email}
                            />

                            {errors.email && <FieldError>{errors.email.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>

                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                {...register('password')}
                                aria-invalid={!!errors.password}
                            />

                            {errors.password && <FieldError>{errors.password.message}</FieldError>}
                        </Field>

                        <Button type="submit" size="lg" className="w-full">
                            Sign in
                        </Button>
                    </FieldGroup>
                </form>
            </Card>
        </main>
    );
};

export default AdminLoginPage;
