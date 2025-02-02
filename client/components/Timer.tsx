'use client';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Pause, Play, Wrench } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
        <div className="flex w-full flex-col items-center gap-1">
            <span className="flex items-center gap-2">
                {isHost && (
                    <div>
                        {timerIsActive ? (
                            <Button variant={'ghost'} onClick={handleStopTimer}>
                                <Pause strokeWidth={0} fill="currentColor" />
                            </Button>
                        ) : (
                            <Button variant={'ghost'} onClick={handleStartTimer}>
                                <Play strokeWidth={0} fill="currentColor" />
                            </Button>
                        )}
                    </div>
                )}
                <p className={`text-3xl ${timerIsActive ? `text-red-500` : `text-gray-500`}`}>
                    {formatTime(time)}
                </p>
                {isHost && (
                    <Button
                        variant={'ghost'}
                        onClick={() => {
                            toast({
                                title: 'Coming Soon',
                                description: 'This feature is coming soon!',
                                variant: 'destructive',
                            });
                        }}
                    >
                        <Wrench strokeWidth={0} fill="currentColor" />
                    </Button>
                )}
            </span>
        </div>
    );
};

export default Timer;
