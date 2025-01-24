'use client';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';

interface QuestionAccordionProps {
    questions: {
        question: string;
        language: string;
        points: string;
    }[];
    onRemoveQuestion: (question: string) => void;
}

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({ questions, onRemoveQuestion }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {questions.map((q, index) => (
                <AccordionItem
                    key={index}
                    value={`question-${index}`}
                    className="mb-1 rounded border px-2.5"
                >
                    <AccordionTrigger className="flex max-w-full">
                        <p className="w-2/3 truncate">
                            {index + 1}. {q.question}
                        </p>
                        <p>{q.points} pts</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Question:</strong> {q.question}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <strong>Language:</strong> {q.language.toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <strong>Points:</strong> {q.points}
                            </p>
                            <div className="mt-2 flex">
                                <AlertDialog>
                                    <AlertDialogTrigger className="ml-auto" asChild>
                                        <Button variant={'destructive'}>
                                            <Trash />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are You Sure You Want To Delete This Question?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Once you delete the question, you will be unable to
                                                undo this action...
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => onRemoveQuestion(q.question)}
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default QuestionAccordion;
