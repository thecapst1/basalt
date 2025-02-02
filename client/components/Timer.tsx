'use client';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Pause, Play, Settings } from 'lucide-react';

interface TimerProps {
    isHost: boolean;
}

const Timer: React.FC<TimerProps> = ({ isHost }) => {
    const [time, setTime] = useState(0);
    const [timerIsActive, setTimerIsActive] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTime(4500);
        setTimerIsActive(false);
    }, []);

    const formatTime = (secondsRemaining: number) => {
        const hours = Math.floor(secondsRemaining / 3600);
        const minutes = Math.floor((secondsRemaining % 3600) / 60);
        const seconds = secondsRemaining % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartTimer = async () => {
        setTimerIsActive(true);
        const id = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    clearInterval(id);
                    setTimerIsActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    const handleStopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setTimerIsActive(false);
        }
    };

    return (
        <div className="flex w-full flex-col items-center gap-1 p-1.5">
            <h2 className="text-xl uppercase">
                <strong>Time Remaining</strong>
            </h2>
            <p className={`text-xl ${timerIsActive ? `text-red-500` : `text-gray-500`}`}>
                {formatTime(time)}
            </p>
            {isHost && (
                <span className="flex items-center">
                    {timerIsActive ? (
                        <Button variant={'outline'} onClick={handleStopTimer}>
                            <Pause />
                        </Button>
                    ) : (
                        <Button variant={'outline'} onClick={handleStartTimer}>
                            <Play />
                        </Button>
                    )}
                    <Button variant={'outline'}>
                        <Settings />
                    </Button>
                </span>
            )}
        </div>
    );
};

export default Timer;
