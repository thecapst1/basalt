'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const TeamFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Team name cannot be empty!')
        .max(15, 'Team name cannot be more than 15 characters!'),
    password: z.string().trim().min(1, 'Password cannot be empty!'),
});
type TeamFormValues = z.infer<typeof TeamFormSchema>;
interface AddTeamDialogProps {
    onAddTeam: (data: TeamFormValues) => boolean;
}

const AddTeamDialog: React.FC<AddTeamDialogProps> = ({ onAddTeam }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const form = useForm<TeamFormValues>({
        resolver: zodResolver(TeamFormSchema),
        defaultValues: {
            name: '',
            password: '',
        },
    });

    const handleAddTeam: SubmitHandler<TeamFormValues> = (data) => {
        const isUnique = onAddTeam(data);
        if (!isUnique) {
            setErrorMessage('Team name must be unique!');
        } else {
            form.reset();
            setErrorMessage('');
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)}>
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Team</DialogTitle>
                    <DialogDescription>
                        Enter a name and password for the new team. Remember these as the team will
                        need them to connect!
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(handleAddTeam)} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Team Name" {...form.register('name')} />
                        {form.formState.errors.name && (
                            <p className="text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Team Password"
                            {...form.register('password')}
                        />
                        {form.formState.errors.password && (
                            <p className="text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>
                    {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
                    <DialogFooter>
                        <Button type="submit">Add Team</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTeamDialog;
