import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button"
import { PropsWithChildren } from 'react';
import CompetitorNavbar from "@/components/CompetitorNavbar";
import { Textarea } from '@/components/ui/textarea';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

const Code = ({ children }: PropsWithChildren) => {
    return <code className="bg-slate-800 font-mono py-1 px-2 m-1">{children}</code>;
}

// TODO: need to bring in Question Information from host component as am input for this func
const getCurrentQuestion = () => {
    return (
        <div className='flex flex-col gap-[2vh] items-center justify-center'>
            <h1><b>Question Title</b></h1>
            <h1>Sort</h1>
            <div>
                <p>
                    Given an array of integers, sort the array and return it
                </p>

                <div className="flex flex-col gap-2">
                    <div>
                        <strong>Input</strong>
                        <pre className="bg-slate-800 font-mono py-2 px-4">
                            2 11 15 0
                        </pre>
                    </div>
                    <div>
                        <strong>Output</strong>
                        <pre className="bg-slate-800 font-mono py-2 px-4">
                            0 2 11 15
                        </pre>
                    </div>
                    <div>
                        <strong>Explanation</strong>
                        <div>
                            The expected output is
                            <Code>0 2 11 15</Code>
                            because
                            <Code>0 &lt; 2 &lt; 11 &lt; 15</Code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// TODO: need to be able to grab info from the text editor and have this func take it as a param
const runTest = () => {
    return (
        <div className="w-full flex flex-col items-center gap-2 mx-4">
            <Button variant="outline" className="max-w-72 h-12 text-white hover:bg-opacity-90 w-full">
                <b>Test</b>
            </Button>
            <Button variant="outline" className="max-w-72 h-12 text-white hover:bg-opacity-90 w-full">
                <b>Submit</b>
            </Button>
        </div>
    )
}

const testResults = () => {
    return (
        <div className="w-full">
            <Accordion type="single" collapsible>

                <AccordionItem value="item-1">
                    <AccordionTrigger className="justify-between items-center px-8">
                        <h1><b>Test Case 1</b></h1>
                        <h1 className="flex text-green-500 justify-center items-center"><b>PASS</b></h1>
                    </AccordionTrigger>
                    <AccordionContent className="px-8">
                        <Code>0 2 11 15</Code>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="justify-between items-center px-8">
                        <h1><b>Test Case 2</b></h1>
                        <h1 className="flex text-red-700 justify-center items-center"><b>FAIL</b></h1>
                    </AccordionTrigger>
                    <AccordionContent className="px-8">
                        <Code>2 11 15 0</Code>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="justify-between items-center px-8">
                        <h1><b>Test Case 3</b></h1>
                        <h1 className="flex text-red-700 justify-center items-center"><b>FAIL</b></h1>
                    </AccordionTrigger>
                    <AccordionContent className="px-8">
                        <Code>2 15 15 0</Code>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    )
}

export default function Competitor() {
    return (
        <div className='h-full'>
            <CompetitorNavbar />

            <div className='flex h-[95vh] w-full'>
                <ResizablePanelGroup
                    direction="horizontal"
                >
                    <ResizablePanel defaultSize={15}>
                        <ResizablePanelGroup direction="vertical">
                            <div className="flex flex-col justify-between h-full py-8">
                                <div className="flex flex-col p-4 box-border">
                                    {getCurrentQuestion()}
                                </div>
                                <div className="w-full flex flex-row justify-center">
                                    {runTest()}
                                </div>
                            </div>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel >
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={400} >
                                <div className='flex h-full'>
                                    <Textarea />
                                </div>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel defaultSize={100}>
                                <ScrollArea className="h-full w-full">
                                    <div>
                                        {testResults()}
                                    </div>
                                </ScrollArea>
                            </ResizablePanel>

                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}
