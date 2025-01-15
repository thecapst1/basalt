import './competitor.css';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button"
import { PropsWithChildren } from 'react';
import Nav from '@/components/Nav';
import { Textarea } from '@/components/ui/textarea';


var showTestResults: boolean = false;

function Code({ children }: PropsWithChildren) {
    return <code className="bg-slate-800 font-mono py-1 px-2 m-1">{children}</code>;
}

// TODO: need to bring in Question Information from host component as am input for this func
function getCurrentQuestion() {
    return (
        <div className='question-title'>
            <h1>
                <b>
                    Question Title
                </b>
            </h1>
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
function runTest() {
    return (
        <div className="w-full flex flex-col items-center gap-2 mx-4">
            <Button className="max-w-72 h-12 bg-blue-700 text-white hover:bg-opacity-90 w-full">
                <b>Test</b>
            </Button>
            <Button className="max-w-72 h-12 bg-green-500 text-white hover:bg-opacity-90 w-full">
                <b>Submit</b>
            </Button>
        </div>
    )
}

function testResults() {
    return (
        <div>

        </div>
    )
}

export default function Competitor() {
    return (
        <div>
            <Nav/>

            <div className='panel-container'>
                <ResizablePanelGroup
                    direction="horizontal"
                >
                    <ResizablePanel defaultSize={15}>
                        <ResizablePanelGroup direction="vertical">
                            <div className="flex flex-col justify-between h-full py-8">
                                <div className="side-panel">
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
                                <div className='flex h-full overflow-hidden'>
                                    <Textarea />
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={100}>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
}
