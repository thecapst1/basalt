import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Circle, Trophy } from 'lucide-react';

type TestState = 'pass' | 'fail' | 'in-progress' | 'not-attempted';

interface Data {
    rank: number;
    name: string;
    score: number;
    tests: TestState[];
}

const trophyColor = (rank: number) =>
    ['text-yellow-500', 'text-gray-500', 'text-amber-600'][rank - 1];

const resultColor = (result: TestState): string => {
    switch (result) {
        case 'pass':
            return 'bg-green-500';
        case 'fail':
            return 'bg-red-500';
        case 'in-progress':
            return 'bg-blue-500';
        case 'not-attempted':
            return 'bg-gray-500';
        default:
            return '';
    }
};

const TeamRank = () => {
    const data: Data[] = [
        {
            rank: 1,
            name: 'Team 1',
            score: 980,
            tests: ['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass'],
        },
        {
            rank: 2,
            name: 'Team 2',
            score: 870,
            tests: ['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'in-progress'],
        },
        {
            rank: 3,
            name: 'Team 3',
            score: 760,
            tests: ['pass', 'pass', 'pass', 'pass', 'pass', 'fail', 'fail'],
        },
        {
            rank: 4,
            name: 'Team 4',
            score: 650,
            tests: [
                'pass',
                'pass',
                'pass',
                'in-progress',
                'not-attempted',
                'not-attempted',
                'not-attempted',
            ],
        },
        {
            rank: 5,
            name: 'Team 5',
            score: 540,
            tests: [
                'pass',
                'pass',
                'in-progress',
                'not-attempted',
                'not-attempted',
                'not-attempted',
                'not-attempted',
            ],
        },
        {
            rank: 6,
            name: 'Team 6',
            score: 530,
            tests: [
                'pass',
                'pass',
                'in-progress',
                'not-attempted',
                'not-attempted',
                'not-attempted',
                'not-attempted',
            ],
        },
        {
            rank: 7,
            name: 'Team 7',
            score: 520,
            tests: [
                'pass',
                'pass',
                'in-progress',
                'not-attempted',
                'not-attempted',
                'not-attempted',
                'not-attempted',
            ],
        },
        {
            rank: 8,
            name: 'Team 8',
            score: 510,
            tests: [
                'pass',
                'pass',
                'in-progress',
                'not-attempted',
                'not-attempted',
                'not-attempted',
                'not-attempted',
            ],
        },
        {
            rank: 9,
            name: 'Team 9',
            score: 500,
            tests: [
                'pass',
                'pass',
                'in-progress',
                'not-attempted',
                'not-attempted',
                'not-attempted',
                'not-attempted',
            ],
        },
    ];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-6">
            <div className="flex min- w-full flex-row flex-wrap justify-center gap-4 min-w-[1.5rem]">
                {data.map((player) => (
                    <Card key={player.rank} className="w-1/2 h-full rounded-xl shadow-md min-w-[max-content]">
                        <CardHeader className="flex w-full min-w-[max-content] flex-row items-center justify-between gap-4">
                            <div className="flex w-1/3 flex-row items-center gap-2">
                                <b>{player.name}</b>
                                {player.rank <= 3 && (
                                    <span className={trophyColor(player.rank)}>
                                        <Trophy fill="currentColor" />
                                    </span>
                                )}
                            </div>

                            <div className="flex w-1/3 items-center justify-center gap-2">
                                {player.tests.map((testResult, index) => (
                                    <Circle
                                        strokeWidth={0}
                                        key={index}
                                        className={`flex items-center justify-center rounded-full min-w-[1.5rem] aspect-square ${resultColor(testResult)}`}
                                    />
                                ))}
                            </div>

                            <span className="w-1/3 text-end text-lg font-medium">
                                {player.score} pts
                            </span>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default function Leaderboard() {
    return (
        <div className='h-full'>
            <div className='flex w-full justify-center  pt-4'>
                <h2 className="font-oswald text-3xl">Leaderboard</h2>
            </div>
            <TeamRank />
        </div>
    );
}
