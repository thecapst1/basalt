'use client';
import './host.css';
import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
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
    DropdownMenuShortcut,
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

export default function Host() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [questions, setQuestions] = useState([
        { question: 'Implement a binary search algorithm.', language: 'py', points: '10' },
    ]);
    const [newQuestionText, setNewQuestionText] = useState('');
    const [newQuestionPoints, setNewQuestionPoints] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [isServerOn, setIsServerOn] = useState<boolean | null>(null);
    const [teamList, setTeamList] = useState([
        { name: 'Team1', password: 'password', points: 300, status: 1 },
        { name: 'Team2', password: 'password', points: 100, status: 1 },
        { name: 'Team3', password: 'password', points: 0, status: 0 },
        { name: 'Team4', password: 'password', points: 200, status: 1 },
        { name: 'Team5', password: 'password', points: 0, status: 0 },
        { name: 'Team6', password: 'password', points: 0, status: 0 },
        { name: 'Team7', password: 'password', points: 125, status: 1 },
    ]);
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamPassword, setNewTeamPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsServerOn(true);
    }, []);

    const handleThemeChange = (newTheme : 'light' | 'dark') => {
        setTheme(newTheme);
    }

    const handleNewQuestionClick = () => {
        if (!newQuestionText || !newQuestionPoints || !selectedLanguage) {
            setErrorMessage("Please Fill In All Fields");
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

    const handleAddTeam = () => {
        if (newTeamName.trim() === '') {
            setErrorMessage('Team name cannot be empty!');
            return;
        }
        if (newTeamPassword.trim() === '') {
            setErrorMessage('Password cannot be empty!');
            return;
        }
        if (teamList.some((team) => team.name.toLowerCase() === newTeamName.toLowerCase())) {
            setErrorMessage('Team name must be unique!');
            return;
        }
        setTeamList((prev) => [
            ...prev,
            { name: newTeamName, password: newTeamPassword, points: 0, status: 0 },
        ]);
        setNewTeamName('');
        setNewTeamPassword('');
        setErrorMessage('');
    };

    const disconnectAllTeams = () => {
        const updatedTeams = teamList.map((team) => ({
            ...team,
            status: 0,
        }));
        setTeamList(updatedTeams);
    };

    const handleDisconnectTeam = (teamName: string) => {
        setTeamList((prev) =>
            prev.map((team) => (team.name === teamName ? { ...team, status: 0 } : team))
        );
    };

    const handleRemoveTeam = (teamName: string) => {
        setTeamList((prev) => prev.filter((team) => team.name !== teamName));
    };

    const handleRemoveQuestion = (q : string) => {
        setQuestions((prev) => prev.filter((question) => question.question !== q));
    };

    const handleToggleServer = () => {
        setIsServerOn(prev => (prev === null ? true : !prev));
        disconnectAllTeams();
    };

    return (
        <ResizablePanelGroup direction="horizontal" className="resizeable-panel-group">
            <ResizablePanel className="left-panel" defaultSize={30} minSize={25} maxSize={40}>
                <span className="left-panel-menu">
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
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Team Name"
                                    value={newTeamName}
                                    onChange={(e) => setNewTeamName(e.target.value)}
                                />
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Team Password"
                                    value={newTeamPassword}
                                    onChange={(e) => setNewTeamPassword(e.target.value)}
                                />
                            </div>
                            {errorMessage && (
                                <div
                                    className="error-message"
                                    style={{ color: 'red', marginTop: '10px' }}
                                >
                                    {errorMessage}
                                </div>
                            )}
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddTeam}>
                                    Add
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <p>Teams</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => disconnectAllTeams()}>
                                Disconnect All
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>
                <Separator style={{ marginTop: '10px' }} />
                <div className="team-list">
                    {teamList.map((team, index) => (
                        <span
                            className="team-block"
                            key={index}
                            style={{
                                backgroundColor: team.status === 1 ? 'green' : 'grey',
                            }}
                        >
                            {team.name}
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <CircleEllipsis />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {team.status === 1 ? (
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
                                                Disconnect
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
                <Separator style={{ marginTop: '10px' }} />
                <div className="leaderboard">
                    <p>Leaderboard</p>
                    <div className="team-list">
                        {[...teamList]
                            .filter((team) => team.status === 1)
                            .sort((a, b) => b.points - a.points)
                            .map((team, index) => (
                                <div
                                    className="team-block"
                                    key={index}
                                    style={{ backgroundColor: 'grey', color: 'black' }}
                                >
                                    <span>{team.name}</span>
                                    <span>{team.points} pts</span>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="server-control-panel">
                    <Separator style={{ marginTop: '10px' }} />
                    <p>Server</p>
                    <Button
                        style={{
                            backgroundColor: isServerOn === null ? 'grey' : isServerOn ? 'red' : 'green',
                            color: 'black',
                            textTransform: 'lowercase',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            width: 'fit-content',
                            height: 'fit-content',
                            padding: '15px 20px',
                          }}
                          onClick={handleToggleServer}
                    >
                        {isServerOn === null ? 'loading...' : isServerOn ? 'stop' : 'start'}
                    </Button>
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel className="right-panel" defaultSize={70} minSize={60} maxSize={90}>
                <span className="right-panel-menu">
                    <Dialog>
                        <DialogTrigger
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                variant={'outline'}
                                style={{
                                    marginRight: '5px',
                                }}
                            >
                                <MessageCirclePlus className="menu-icon" />
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
                                {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
                            </DialogHeader>
                            <div>
                                <Label htmlFor="question">Question</Label>
                                <Input
                                    id="question"
                                    placeholder="Enter your question"
                                    value={newQuestionText}
                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                />
                                <Label htmlFor="points">Points</Label>
                                <Input
                                    id="points"
                                    placeholder="Enter points"
                                    value={newQuestionPoints}
                                    onChange={(e) => setNewQuestionPoints(e.target.value)}
                                />
                                <Select 
                                    value={selectedLanguage}
                                    onValueChange={(value) => setSelectedLanguage(value)} 
                                >
                                    <SelectTrigger className="w-[180px]" style={{marginTop:"5px"}}>
                                        <SelectValue placeholder="Select a langauge" />
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
                                    <Import className="menu-icon" />
                                    Import Questions
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <Printer className="menu-icon" />
                                        Print
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Question Packet</MenubarItem>
                                        <MenubarItem>Answer Key</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarItem>
                                    <Settings className="menu-icon" />
                                    Settings
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>View</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Expand className="menu-icon" />
                                    Fullscreen
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>Theme</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarCheckboxItem
                                            checked={theme === 'light'}
                                            onCheckedChange={() => handleThemeChange('light')}
                                        >
                                            Light{' '}
                                            <MenubarShortcut>
                                                <Sun />
                                            </MenubarShortcut>
                                        </MenubarCheckboxItem>
                                        <MenubarCheckboxItem
                                            checked={theme === 'dark'}
                                            onCheckedChange={() => handleThemeChange('dark')}
                                        >
                                            Dark{' '}
                                            <MenubarShortcut>
                                                <Moon />
                                            </MenubarShortcut>
                                        </MenubarCheckboxItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>

                        <MenubarMenu>
                            <MenubarTrigger>Help</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <BookOpen className="menu-icon" />
                                    Usage
                                </MenubarItem>
                                <MenubarItem>
                                    <TriangleAlert className="menu-icon" />
                                    Report Issue
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </span>

                <Separator />

                <div className="question-panel">
                    <ul className="question-list">
                        {questions.map((q, index) => (
                            <li key={index} className="question-block">
                                <span className="question-number">{index + 1}. </span>
                                <span className="question-text">
                                    {q.question.length > 50
                                        ? `${q.question.slice(0, 50)}...`
                                        : q.question}
                                </span>
                                <span className="question-points">({q.points} pts)</span>
                                <span style={{marginLeft:"auto", textTransform:"uppercase", opacity:"65%"}}>{q.language}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger style={{ paddingLeft:"20px" }}>
                                        <Settings />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Pen className="menu-icon" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleRemoveQuestion(q.question)}>
                                            <Trash className="menu-icon" />
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
