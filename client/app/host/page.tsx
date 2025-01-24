'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import AddTeamDialog from '@/app/host/NewTeamDialog';
import AddQuestionDialog from './NewQuestionDialog';
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
import { Ellipsis, Settings, Moon, Sun, SunMoon, Trash, Pen } from 'lucide-react';

export default function Host() {
    const { setTheme } = useTheme();
    const [questions, setQuestions] = useState([
        { question: 'Implement a binary search algorithm.', language: 'py', points: '10' },
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
        { name: 'Team1', password: 'password', points: 300, status: true },
        { name: 'Team2', password: 'password', points: 126, status: true },
        { name: 'Team3', password: 'password', points: 0, status: false },
        { name: 'Team4', password: 'password', points: 299, status: true },
        { name: 'Team5', password: 'password', points: 0, status: true },
        { name: 'Team6', password: 'password', points: 5, status: false },
        { name: 'Team7', password: 'password', points: 125, status: true },
    ]);

    useEffect(() => {
        setServerStatus('stop');
    }, []);

    const handleNewQuestionClick = (data: {
        question: string;
        points: string;
        language: string;
    }) => {
        setQuestions((prevQuestions) => {
            const isDuplicate = prevQuestions.some(
                (q) =>
                    q.question.toLowerCase() === data.question.toLowerCase() &&
                    q.language.toLowerCase() === data.language.toLowerCase()
            );
            if (isDuplicate) {
                return prevQuestions;
            }
            return [
                ...prevQuestions,
                { question: data.question, language: data.language, points: data.points },
            ];
        });

        return !questions.some(
            (q) =>
                q.question.toLowerCase() === data.question.toLowerCase() &&
                q.language.toLowerCase() === data.language.toLowerCase()
        );
    };

    const handleAddTeam = (data: { name: string; password: string }): boolean => {
        const isUnique = !teamList.some(
            (team) => team.name.toLowerCase() === data.name.toLowerCase()
        );

        if (isUnique) {
            setTeamList((prevTeams) => [
                ...prevTeams,
                { name: data.name, password: data.password, points: 0, status: false },
            ]);
        }
        return isUnique;
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
        setServerStatus((prev) => (prev === 'start' ? 'stop' : 'start'));
        disconnectAllTeams();
    };

    return (
        <ResizablePanelGroup direction="horizontal" className="flex max-h-screen flex-grow">
            <ResizablePanel className="flex flex-col justify-center" defaultSize={30} maxSize={50}>
                <div className="flex h-fit justify-between pl-3 pr-3 pt-4">
                    <AddTeamDialog onAddTeam={handleAddTeam} />
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
                <Separator className="mt-2" />
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
                                                        Edit
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem>
                                                                Name
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Password
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Points
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
                className="flex h-full min-h-screen w-full flex-col items-center p-6"
                defaultSize={70}
            >
                <span className="flex w-full justify-start pb-2.5">
                    <AddQuestionDialog onAddQuestion={handleNewQuestionClick} />
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
                    <ul className="mt-2.5 flex flex-col gap-1.5">
                        {questions.map((q, index) => (
                            <li
                                key={index}
                                className="border-0.5 flex h-fit w-full items-center rounded border px-3 py-2.5"
                            >
                                <span className="pr-0.5">{index + 1}. </span>
                                <span className="w-2/3 truncate">{q.question}</span>
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
