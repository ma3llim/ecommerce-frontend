import { Button, Card, Input, Label } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { useForm } from 'react-hook-form';
import { adminLoginSchema, type AdminLoginFormData } from '../schemas/adminLogin.schema';
import { zodResolver } from '@hookform/resolvers/zod';

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
                <div className="mb-8 text-center">
                    <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary">Welcome back</h1>
                    <p className="mt-2 text-sm text-text-muted">Sign in to your {APP_NAME} admin account</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <Label htmlFor="email" required>
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="admin@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Label htmlFor="password" required className="mb-0">
                                Password
                            </Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            {...register('password')}
                        />
                    </div>

                    <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
                        Sign in
                    </Button>
                </form>
            </Card>
        </main>
    );
};

export default AdminLoginPage;
