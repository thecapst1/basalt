'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
    Settings,
    Printer,
    MessageCirclePlus,
    Import,
    Moon,
    Sun,
    Expand,
    TriangleAlert,
    BookOpen,
    Plus,
    EllipsisVertical,
    CircleEllipsis,
    Trash,
    Pen,
} from 'lucide-react';

const TeamFormSchema = z.object({
    name: z.string().trim().min(1, 'Team name cannot be empty!'),
    password: z.string().trim().min(1, 'Password cannot be empty!'),
});
type TeamFormValues = z.infer<typeof TeamFormSchema>

export default function Host() {
    const { setTheme } = useTheme();
    const [questions, setQuestions] = useState([
        { question: 'Implement a binary search algorithm.', language: 'py', points: '10' },
    ]);
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionPoints, setNewQuestionPoints] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isServerOn, setIsServerOn] = useState<boolean | null>(null);
    const [teamList, setTeamList] = useState([
        { name: 'Team1', password: 'password', points: 300, status: true },
        { name: 'Team2', password: 'password', points: 126, status: true },
        { name: 'Team3', password: 'password', points: 0, status: false },
        { name: 'Team4', password: 'password', points: 299, status: true },
        { name: 'Team5', password: 'password', points: 0, status: true },
        { name: 'Team6', password: 'password', points: 5, status: false },
        { name: 'Team7', password: 'password', points: 125, status: true },        
    ]);
    const [errorMessage, setErrorMessage] = useState('');

    const form = useForm<TeamFormValues>({
        resolver: zodResolver(TeamFormSchema),
        defaultValues: {
            name: '',
            password: '',
        },
    });

    useEffect(() => {
        setIsServerOn(true);
    }, []);

    const handleNewQuestionClick = () => {
        if (!newQuestionText || !newQuestionPoints || !selectedLanguage) {
            setErrorMessage('Please Fill In All Fields');
            return;
        }

        setQuestions((prevQuestions) => [
            ...prevQuestions,
            { question: newQuestionText, language: selectedLanguage, points: newQuestionPoints },
        ]);
        setNewQuestionText('');
        setNewQuestionPoints('');
        setSelectedLanguage('');
        setErrorMessage('');
    };

    const handleAddTeam = (data: TeamFormValues) => {
        if (teamList.some((team) => team.name.toLowerCase() === data.name.toLowerCase())) {
            setErrorMessage('Team name must be unique!');
            return;
        }
        setTeamList((prev) => [
            ...prev,
            { name: data.name, password: data.password, points: 0, status: false },
        ]);
        form.reset();
        setErrorMessage('');
    };

    const disconnectAllTeams = () => {
        const updatedTeams = teamList.map((team) => ({
            ...team,
            status: false,
        }));
        setTeamList(updatedTeams);
    };

    const handleDisconnectTeam = (teamName: string) => {
        setTeamList((prev) =>
            prev.map((team) => (team.name === teamName ? { ...team, status: false } : team))
        );
    };

    const handleRemoveTeam = (teamName: string) => {
        setTeamList((prev) => prev.filter((team) => team.name !== teamName));
    };

    const handleRemoveQuestion = (q: string) => {
        setQuestions((prev) => prev.filter((question) => question.question !== q));
    };

    const handleToggleServer = () => {
        setIsServerOn((prev) => (prev === null ? true : !prev));
        disconnectAllTeams();
    };

    return (
        <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
            <ResizablePanel
                className="flex flex-col p-6 justify-center"
                defaultSize={20}
                minSize={20}
                maxSize={40}
            >
                <span className="flex h-fit w-full items-center justify-evenly">
                    <Dialog>
                        <DialogTrigger>
                            <Plus />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Team</DialogTitle>
                                <DialogDescription>
                                    Enter a name and password for the new team. Remember these as
                                    the team will need them to connect!
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                onSubmit={form.handleSubmit(handleAddTeam)}
                                className="flex flex-col gap-4"
                            >
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Team Name"
                                        {...form.register('name')}
                                    />
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
                                {errorMessage && (
                                    <div className="mt-2 text-red-500">{errorMessage}</div>
                                )}
                                <DialogFooter>
                                    <Button type="submit">Add Team</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <p className="px-14 text-[120%] uppercase">Teams</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => disconnectAllTeams()}>
                                Kick All
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>
                <Separator className="mt-2" />
                <div className="flex h-72 flex-col gap-1.5 overflow-y-auto pt-2.5">
                    {teamList.map((team, index) => (
                        <span
                            className={`flex w-full justify-between p-1.5 ${team.status ? 'bg-green-500' : 'bg-gray-500'}`}
                            key={index}
                        >
                            {team.name}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="pr-0.5">
                                    <CircleEllipsis />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {team.status ? (
                                        <div>
                                            <DropdownMenuItem>Message</DropdownMenuItem>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>
                                                    Edit
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem>Name</DropdownMenuItem>
                                                        <DropdownMenuItem>Points</DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => handleDisconnectTeam(team.name)}
                                            >
                                                Kick
                                            </DropdownMenuItem>
                                        </div>
                                    ) : (
                                        <div>
                                            <DropdownMenuItem
                                                onClick={() => handleRemoveTeam(team.name)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </span>
                    ))}
                </div>
                <Separator className="mt-2" />
                <div>
                    <p className="mx-auto my-2.5 text-center text-[18px] uppercase">
                        Leaderboard
                    </p>
                    <div className="flex h-96 flex-col gap-2 overflow-y-auto pt-2.5">
                        {[...teamList]
                            .filter((team) => team.status === true)
                            .sort((a, b) => b.points - a.points)
                            .map((team, index) => (
                                <div
                                    className="flex w-full justify-between bg-gray-500 p-2 text-black"
                                    key={index}
                                >
                                    <span>{team.name}</span>
                                    <span className="pr-0.5">{team.points} pts</span>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mb-[20px] mt-auto flex flex-col items-center justify-center">
                    <Separator className="mt-2" />
                    <p className="mx-auto my-2.5 text-[18px] uppercase">Server</p>
                    <Button
                        className={`h-fit w-fit p-[10px_25px] text-[24px] font-bold lowercase text-black ${isServerOn === null ? 'bg-gray-500' : isServerOn ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
                        onClick={handleToggleServer}
                    >
                        {isServerOn === null ? 'loading...' : isServerOn ? 'stop' : 'start'}
                    </Button>
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                className="flex h-full min-h-screen w-full flex-col items-center p-6"
                defaultSize={75}
                minSize={60}
                maxSize={80}
            >
                <span className="flex w-full justify-start pb-2.5">
                    <Dialog>
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
                                    Please enter all the required information for your question
                                    below.
                                </DialogDescription>
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            </DialogHeader>
                            <div>
                                <Label htmlFor="question">Question</Label>
                                <Input
                                    type="text"
                                    id="question"
                                    placeholder="Enter your question"
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                />
                                <Label htmlFor="points">Points</Label>
                                <Input
                                    type="number"
                                    id="points"
                                    placeholder="Enter points"
                                    value={newQuestionPoints}
                                    onChange={(e) => setNewQuestionPoints(e.target.value)}
                                />
                                <Select
                                    value={selectedLanguage}
                                    onValueChange={(value) => setSelectedLanguage(value)}
                                >
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
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        handleNewQuestionClick();
                                        setNewQuestionText('');
                                        setNewQuestionPoints('');
                                    }}
                                >
                                    Add Question
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Import className="pr-0.5" />
                                    Import Questions
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <Printer className="pr-0.5" />
                                        Print
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Question Packet</MenubarItem>
                                        <MenubarItem>Answer Key</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarItem>
                                    <Settings className="pr-0.5" />
                                    Settings
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>View</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Expand className="pr-0.5" />
                                    Fullscreen
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>Theme</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={() => setTheme('light')}>
                                            <Sun className="pr-0.5" />
                                            Light
                                        </MenubarItem>
                                        <MenubarItem onClick={() => setTheme('dark')}>
                                            <Moon className="pr-0.5" />
                                            Dark
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>Help</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <BookOpen className="pr-0.5" />
                                    Usage
                                </MenubarItem>
                                <MenubarItem>
                                    <TriangleAlert className="pr-0.5" />
                                    Report Issue
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </span>

                <Separator />

                <div className="flex max-h-full w-full flex-grow flex-col justify-start overflow-y-auto">
                    <ul className="mt-2.5 flex flex-col gap-1.5">
                        {questions.map((q, index) => (
                            <li
                                key={index}
                                className="flex h-fit w-full items-center rounded-2.5 border border-[0.5px] p-[10px_20px]"
                            >
                                <span className="pr-0.5">{index + 1}. </span>
                                <span>
                                    {q.question.length > 60
                                        ? `${q.question.slice(0, 60)}...`
                                        : q.question}
                                </span>
                                <span className="question-points">({q.points} pts)</span>
                                <span className="ml-auto pr-2.5 uppercase opacity-65">
                                    {q.language}
                                </span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Settings />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Pen className="pr-0.5" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => handleRemoveQuestion(q.question)}
                                        >
                                            <Trash className="pr-0.5" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ))}
                    </ul>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
