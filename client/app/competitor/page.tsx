import './competitor.css';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button"

export default function ResizableDemo() {

    // TODO: need to bring in Question Information from host component as am input for this func
    function getCurrentQuestion() {
        return (
            <div className='question-title'>
                <h1>
                    <b>
                        Question Title
                    </b>
                </h1>
                <h1 className='question-title-body'>
                    <b>
                        Two Sum
                    </b>
                </h1>
                <div className='question-content'>
                    <p>
                        Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to the target.
                        You may assume that each input would have exactly one solution, and you may not use the same element twice.
                        You can return the answer in any order.
                    </p>

                    <p>
                        <b>
                            Example 1:
                        </b>
                        <p>
                            Input:

                            nums = [2, 7, 11, 15], target = 9

                            Output:

                            [0, 1]
                        </p>

                    </p>

                    <p>
                        <b>
                            Explanation:
                        </b>
                        <p>
                            nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].
                        </p>
                    </p>
                </div>
            </div>
        )
    }

    // TODO: need to be able to grab info from the text editor and have this func take it as a param
    function runTest() {
        return (
            <div className='button-container'>
                <Button className="w-32 h-12 bg-[hsl(224.3,76.3%,48%)] text-white hover:bg-opacity-90">
                    <b>Test</b>
                </Button>
                <Button className="w-32 h-12 bg-[hsl(142.4,71.8%,29.2%)] text-white hover:bg-opacity-90">
                    <b>Submit</b>
                </Button>

            </div>
        )
    }

    function testResults() {
        return(
            <div>
                
            </div>
        )
    }

    return (
        <div className='panel-container'>
            <ResizablePanelGroup
                direction="horizontal"
            >
                <ResizablePanel defaultSize={15}>
                    <div className="side-panel">
                        {getCurrentQuestion()}
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel >
                    <ResizablePanelGroup direction="vertical">

                        <ResizablePanel defaultSize={400} className="side-panel">
                            <div>
                                <span>Editor</span>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={100} className="side-panel">
                            <div>
                                {runTest()}
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
