'use client';
import './home.css';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const LoginFormSchema = z.object({
    username: z.string().min(4, { message: 'Username must be at least 4 characters.' }),
    password: z.string().min(4, { message: 'Password must be at least 4 characters.' }),
});
type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function Home() {
    const [isHostLogin, setIsHostLogin] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const toggleHostLogin = () => {
        setMessage('');
        setIsHostLogin((prev) => !prev);
    };

    const onSubmit = () => {
        if (isHostLogin) {
            setMessage('Host Logged In');
        } else if (!isHostLogin) {
            setMessage('Competitor Logged In');
        } else {
            setMessage('Login Failed');
        }

        form.reset();
    };

    return (
        <div className="login-container">
            <div className="login-page">
                <h1>{isHostLogin ? 'Host Login' : 'Login'}</h1>

                <h2 style={{ marginBottom: '5px' }}>
                    Please enter a username and password to get started!
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button asChild style={{ marginTop: '10px' }}>
                                <Link href={isHostLogin ? '/host' : '/competitor'}>Login</Link>
                            </Button>
                        </div>
                    </form>
                </Form>

                {message && <p>{message}</p>}
                <button className="login-view" onClick={toggleHostLogin}>
                    {isHostLogin ? 'Login As Competitor' : 'Login As Host'}
                </button>
            </div>
        </div>
    );
}
