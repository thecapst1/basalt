'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import QuestionAccordion from './QuestionAccordion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
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
import { Ellipsis, Moon, Sun, SunMoon, Copy } from 'lucide-react';
import HeaderMenu from './HeaderMenu';

export default function Host() {
    const { setTheme } = useTheme();
    const [questions, setQuestions] = useState([
        {
            question:
                'Create a function that takes an array of numbers as inputs and returns it order from least to greatest.',
            language: 'py',
            points: '10',
        },
        {
            question:
                'Develop a simple number guessing game where the computer picks a random number, and the user tries to guess it.',
            language: 'java',
            points: '15',
        },
        {
            question: 'Create a basic to-do list app where users can add and remove tasks.',
            language: 'rs',
            points: '25',
        },
    ]);
    const [serverStatus, setServerStatus] = useState<'loading' | 'stop' | 'start'>('loading');
    const [teamList, setTeamList] = useState([
        { name: 'Team1', password: 'password1', points: 300, status: true },
        { name: 'Team2', password: 'password2', points: 126, status: true },
        { name: 'Team3', password: 'password3', points: 0, status: false },
        { name: 'Team4', password: 'password4', points: 299, status: true },
        { name: 'Team5', password: 'password5', points: 0, status: true },
        { name: 'Team6', password: 'password6', points: 5, status: false },
        { name: 'Team7', password: 'password7handleCopyPassword', points: 125, status: true },
    ]);

    useEffect(() => {
        setServerStatus('stop');
    }, []);

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

    const handleRemoveQuestion = (questionToRemove: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.filter((q) => q.question !== questionToRemove)
        );
    };

    const handleToggleServer = () => {
        setServerStatus((prev) => (prev === 'start' ? 'stop' : 'start'));
        disconnectAllTeams();
    };

    return (
        <ResizablePanelGroup direction="horizontal" className="flex max-h-screen flex-grow">
            <ResizablePanel className="flex flex-col justify-center" defaultSize={30} maxSize={50}>
                <div className="flex h-fit items-center justify-between p-2">
                    <div></div>
                    <p className="text-2xl uppercase">Teams</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => disconnectAllTeams()}>
                                Kick All
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Separator className="mt-2mt-2" />
                <div className="flex flex-col gap-1.5 overflow-y-auto p-2.5">
                    {teamList
                        .sort((a, b) => b.points - a.points)
                        .map((team, index) => (
                            <span
                                className={`flex w-full justify-between p-1.5 ${team.status ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-500'}`}
                                key={index}
                            >
                                <p className="w-1/2 truncate">{team.name}</p>
                                <p>{team.points} pts</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="pr-0.5">
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {team.status ? (
                                            <div>
                                                <DropdownMenuItem>Message</DropdownMenuItem>
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>
                                                        Info
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(
                                                                        team.password
                                                                    );
                                                                }}
                                                            >
                                                                <Copy />
                                                                Password
                                                            </DropdownMenuItem>
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
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(
                                                            team.password
                                                        );
                                                    }}
                                                >
                                                    <Copy />
                                                    Password
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
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

                <div className="mb-5 mt-auto flex flex-col items-center justify-center">
                    <Separator className="mt-2" />
                    <p className="mx-auto my-2.5 text-2xl uppercase">Server</p>
                    <Button
                        className={`h-fit w-fit px-5 py-3 text-2xl font-bold uppercase text-black ${serverStatus === 'loading' ? 'bg-gray-500' : serverStatus === 'stop' ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
                        onClick={handleToggleServer}
                    >
                        {serverStatus}
                    </Button>
                    <p
                        className={`mt-1 text-xl ${serverStatus === 'loading' || serverStatus === 'start' ? 'text-gray-400' : 'text-green-500'}`}
                    >
                        00:00:00
                    </p>
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                className="flex h-full min-h-screen w-full flex-col items-center"
                defaultSize={70}
            >
                <span className="flex w-full justify-start p-1.5">
                    <HeaderMenu />
                    <div className="ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'outline'}>
                                    <SunMoon />
                                    Theme
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setTheme('light')}>
                                    <Sun className="pr-0.5" />
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('dark')}>
                                    <Moon className="pr-0.5" />
                                    Dark
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </span>

                <Separator />

                <div className="flex max-h-full w-full flex-grow flex-col justify-start overflow-y-auto">
                    <ul className="mt-2.5 flex flex-col">
                        <QuestionAccordion
                            questions={questions}
                            onRemoveQuestion={handleRemoveQuestion}
                        />
                    </ul>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
