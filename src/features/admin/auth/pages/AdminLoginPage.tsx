import { APP_NAME } from '@/constants';
import { useForm } from 'react-hook-form';
import { adminLoginSchema, type AdminLoginFormData } from '../schemas/adminLogin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" autoComplete="email" placeholder="admin@example.com" {...register('email')} />
                        error={errors.email?.message}
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Label htmlFor="password" className="mb-0">
                                Password
                            </Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            {...register('password')}
                        />
                        error={errors.password?.message}
                    </div>

                    <Button type="submit" size="lg">
                        Sign in
                    </Button>
                </form>
            </Card>
        </main>
    );
};

export default AdminLoginPage;
