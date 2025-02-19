'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Question = {
    question: string;
    description: string;
    input: string;
    output: string;
    status: string;
};

export default function QuestionNavbar({
    setCurrentQuestion,
}: {
    setCurrentQuestion: (question: Question) => void;
}) {
    const [questions] = useState([
        {
            question: 'Sort an Array of Integers',
            description: 'Sort an array of integers in ascending order and return it.',
            input: '2 11 15 0',
            output: '0 2 11 15',
            status: 'complete',
        },
        {
            question: 'Sort an Array of Characters Alphabetically',
            description:
                'Sort an array of characters alphabetically and return them as a single string.',
            input: 'h e l o',
            output: 'e h l o',
            status: 'in-progress',
        },
        {
            question: 'Hexadecimal in Reverse Order',
            description:
                'Convert characters to hexadecimal values and return them in reverse order.',
            input: 'A B C D',
            output: '13 12 11 10',
            status: 'failed',
        },
        {
            question: 'Some of Digits',
            description:
                'Write a function that takes a positive integer as input and returns the sum of its digits.',
            input: '1 2 3 4',
            output: '10',
            status: '',
        },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'complete':
                return 'bg-green-500 hover:bg-green-300';
            case 'in-progress':
                return 'bg-blue-500 hover:bg-blue-300';
            case 'failed':
                return 'bg-red-500 hover:bg-red-300';
            default:
                return 'bg-gray-500 hover:bg-gray-300';
        }
    };

    return (
        <div className="flex flex-row items-center border-t p-1">
            <div className="flex w-full flex-row flex-nowrap gap-1 overflow-x-auto">
                {questions.map((q, index) => (
                    <Button
                        variant="ghost"
                        size="icon"
                        key={index}
                        onClick={() => setCurrentQuestion(q)}
                        className={`rounded-full border p-1 ${getStatusColor(q.status)} size-9`}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>
            <span className="ml-auto">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Programming Language" />
                    </SelectTrigger>
                    <SelectContent className="min-w-20">
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            <SelectItem value="Python">Python</SelectItem>
                            <SelectItem value="Java">Java</SelectItem>
                            <SelectItem value="JavaScript">JavaScript</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </span>
        </div>
    );
}
