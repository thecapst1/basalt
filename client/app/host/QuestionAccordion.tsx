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
        languages: string[] | null;
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
                    className={`mb-1 rounded border px-2.5 ${q.enabled ? '' : 'bg-[#666a] opacity-50'}`}
                >
                    <AccordionTrigger className="flex max-w-full">
                        <p className="w-2/3 truncate">
                            {index + 1}. {q.question}
                        </p>
                        <p>{q.points} pts</p>
                    </AccordionTrigger>
                    <AccordionContent className="px-1.5">
                        <div>
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">{q.description}</p>
                                <Switch
                                    checked={q.enabled}
                                    onCheckedChange={() => handleQuestionSwitch(q.question)}
                                />
                            </div>

                            {q.languages !== null && (
                                <p className="text-sm text-muted-foreground">
                                    <strong>
                                        {q.languages.length > 1 ? 'Languages:' : 'Language:'}
                                    </strong>{' '}
                                    {q.languages.toString().toUpperCase()}
                                </p>
                            )}

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
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default QuestionAccordion;
