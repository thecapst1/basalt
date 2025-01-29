'use client';
import { Switch } from '@/components/ui/switch';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface QuestionAccordionProps {
    questions: {
        question: string;
        description: string;
        language: string;
        points: string;
        tests: {
            input: string;
            output: string;
        }[];
        enabled: boolean;
    }[];
    handleQuestionSwitch: (question: string) => void;
}

const QuestionAccordion: React.FC<QuestionAccordionProps> = ({
    questions,
    handleQuestionSwitch,
}) => {
    return (
        <Accordion type="single" collapsible className="w-full pl-2 pr-2">
            {questions.map((q, index) => (
                <AccordionItem
                    key={index}
                    value={`question-${index}`}
                    className={`px-2.5} mb-1 rounded border`}
                >
                    <AccordionTrigger
                        className={`flex max-w-full px-1.5 ${q.enabled ? '' : 'bg-[#666a] opacity-50'}`}
                    >
                        <p className="w-2/3 truncate">
                            {index + 1}. {q.question}
                        </p>
                        <p>{q.points} pts</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Description:</strong> {q.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <strong>Language(s):</strong> {q.language.toUpperCase()}
                            </p>
                            <div className="flex flex-col text-sm text-muted-foreground">
                                <Accordion type="single" collapsible>
                                    {q.tests.map((test, testNum) => (
                                        <AccordionItem key={testNum} value={`test-${testNum}`}>
                                            <AccordionTrigger>
                                                <h1>
                                                    <strong>Test Case #{testNum + 1}</strong>
                                                </h1>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <span className="flex w-full flex-row gap-2">
                                                    <div className="w-full">
                                                        <h2>Input</h2>
                                                        <pre className="w-full rounded-sm bg-gray-300 px-4 py-2 font-mono text-black dark:bg-slate-800 dark:text-white">
                                                            {test.input}
                                                        </pre>
                                                    </div>
                                                    <div className="w-full">
                                                        <h2>Output</h2>
                                                        <pre className="w-full rounded-sm bg-gray-300 px-4 py-2 font-mono text-black dark:bg-slate-800 dark:text-white">
                                                            {test.output}
                                                        </pre>
                                                    </div>
                                                </span>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                            <div className="mt-4 flex justify-end px-2">
                                <Switch
                                    checked={q.enabled}
                                    onCheckedChange={() => handleQuestionSwitch(q.question)}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default QuestionAccordion;
