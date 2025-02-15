'use client';
import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginFormSchema = z.object({
    username: z.string().min(4, { message: 'Username must be at least 4 characters.' }),
    password: z.string().min(4, { message: 'Password must be at least 4 characters.' }),
});
type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function Home() {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = () => {
        const { username } = form.getValues();
        const users: Record<string, string> = {
            host: '/host',
            team1: '/competitor',
        };

        if (users[username]) {
            router.push(users[username]);
        } else {
            setMessage('Invalid username or password.');
        }

        form.reset();
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="flex flex-col flex-wrap items-center">
                <h1 className="mb-1 text-6xl font-bold">Login</h1>
                <h2 className="mb-1.5">Please enter a username and password to get started!</h2>

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

                        <div className="flex justify-center">
                            <Button className="mt-2 w-full">Login</Button>
                        </div>
                    </form>
                </Form>

                {message && <p>{message}</p>}
            </div>

            <div className="height-20 flex items-center justify-center">
                <Button asChild variant="link">
                    <Link href="/leaderboard">Leaderboard</Link>
                </Button>
            </div>
        </div>
    );
}
