'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MessageCirclePlus } from 'lucide-react';

const QuestionFormSchema = z.object({
    question: z.string().trim().min(1, 'Question cannot be empty!'),
    points: z.string().trim().min(1, 'Please enter desired points!'),
    language: z.string().trim().min(1, 'Please select a langauge'),
});
type QuestionFormValues = z.infer<typeof QuestionFormSchema>;
interface AddQuestionDialogProps {
    onAddQuestion: (data: QuestionFormValues) => boolean;
}

const AddQuestionDialog: React.FC<AddQuestionDialogProps> = ({ onAddQuestion }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm<QuestionFormValues>({
        resolver: zodResolver(QuestionFormSchema),
        defaultValues: {
            question: '',
            points: '',
            language: '',
        },
    });

    useEffect(() => {
        if (!isOpen) {
            form.reset();
        }
    }, [isOpen, form]);

    const handleAddQuestion: SubmitHandler<QuestionFormValues> = (data) => {
        const isUnique = onAddQuestion(data);
        if (!isUnique) {
            setErrorMessage('Question must be unique!');
        } else {
            form.reset();
            setErrorMessage('');
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="flex items-center" asChild>
                <Button variant={'outline'} className="mr-1.5">
                    <MessageCirclePlus className="pr-0.5" />
                    Add Question
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Question</DialogTitle>
                    <DialogDescription>
                        Please enter all the required information for your question below.
                    </DialogDescription>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </DialogHeader>
                <div>
                    <Label htmlFor="question">Question</Label>
                    <Input
                        type="text"
                        id="question"
                        placeholder="Enter your question"
                        {...form.register('question')}
                    />
                    {form.formState.errors.question && (
                        <p className="text-red-500">{form.formState.errors.question.message}</p>
                    )}
                    <Label htmlFor="points">Points</Label>
                    <Input
                        type="number"
                        id="points"
                        placeholder="Enter points"
                        {...form.register('points')}
                    />
                    {form.formState.errors.points && (
                        <p className="text-red-500">{form.formState.errors.points.message}</p>
                    )}
                    <Select onValueChange={(value) => form.setValue('language', value)}>
                        <SelectTrigger className="mr-1.5 mt-2 w-44">
                            <SelectValue placeholder="Select a langauge ..." />
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rs">Rust</SelectItem>
                                    <SelectItem value="py">Python</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="js">JavaScript</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </SelectTrigger>
                    </Select>
                    {form.formState.errors.language && (
                        <p className="text-red-500">{form.formState.errors.language.message}</p>
                    )}
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={form.handleSubmit(handleAddQuestion)}>
                        Add Question
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddQuestionDialog;
