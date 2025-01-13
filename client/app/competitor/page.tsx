import './competitor.css';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

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
            </div>
        )
    }

    // TODO: need to be able to grab info from the text editor and have this func take it as a param
    function runTest() {
        return (
            <div className='test-button'>

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
                                <span>Test Suite</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
