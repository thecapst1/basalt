'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Pause, Play, Wrench } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TimerProps {
    isHost: boolean;
    startingTime: number;
    isActive?: boolean;
}

const Timer: React.FC<TimerProps> = ({ isHost = false, startingTime, isActive = false }) => {
    const hasInitialized = useRef(false);
    const [time, setTime] = useState(startingTime);
    const [timerIsActive, setTimerIsActive] = useState(isActive);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const formatTime = (secondsRemaining: number) => {
        const hours = Math.floor(secondsRemaining / 3600);
        const minutes = Math.floor((secondsRemaining % 3600) / 60);
        const seconds = secondsRemaining % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isActive && !hasInitialized.current) {
            hasInitialized.current = true;
            handleStartTimer();
        }
    });

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
                        <Button
                            variant={'ghost'}
                            size="icon"
                            onClick={timerIsActive ? handleStopTimer : handleStartTimer}
                        >
                            {timerIsActive ? (
                                <Pause strokeWidth={0} fill="currentColor" />
                            ) : (
                                <Play strokeWidth={0} fill="currentColor" />
                            )}
                        </Button>
                    </div>
                )}
                <p
                    className={`my-2 text-[8vmin] font-thin ${timerIsActive ? `` : `text-muted-foreground`}`}
                >
                    {formatTime(time)}
                </p>
                {isHost && (
                    <Button
                        variant={'ghost'}
                        size="icon"
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
