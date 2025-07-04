import { useState, useEffect, useRef } from 'react';

interface TimerSettings {
  timerType: 'none' | 'global' | 'individual';
  globalDuration: number; // in seconds
  individualDuration: number; // in seconds
  decayFactor: number;
  onTimeUp: (isGlobal: boolean) => void;
}

export function useGameTimer({
  timerType,
  globalDuration,
  individualDuration,
  decayFactor,
  onTimeUp,
}: TimerSettings) {
  const [globalTimeRemaining, setGlobalTimeRemaining] = useState(globalDuration);
  const [currentPlayerTime, setCurrentPlayerTime] = useState(individualDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [turnNumber, setTurnNumber] = useState(1);

  const globalIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const individualIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate exponential decay time for individual turns
  const calculateTurnTime = (turn: number): number => {
    const baseTime = individualDuration;
    const maxTime = 1200; // 20 minutes cap
    const range = maxTime - baseTime;
    
    const timeInSeconds = Math.round(baseTime + (range * (1 - Math.exp(-decayFactor * (turn - 1)))));
    return Math.min(timeInSeconds, maxTime);
  };

  // Start timer
  const startTimer = () => {
    if (timerType === 'none') return;
    
    setIsTimerRunning(true);
    setIsPaused(false);

    if (timerType === 'global') {
      globalIntervalRef.current = setInterval(() => {
        setGlobalTimeRemaining(prev => {
          if (prev <= 1) {
            onTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerType === 'individual') {
      const turnTime = calculateTurnTime(turnNumber);
      setCurrentPlayerTime(turnTime);
      
      individualIntervalRef.current = setInterval(() => {
        setCurrentPlayerTime(prev => {
          if (prev <= 1) {
            onTimeUp(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Pause timer
  const pauseTimer = () => {
    setIsPaused(true);
    setIsTimerRunning(false);
    
    if (globalIntervalRef.current) {
      clearInterval(globalIntervalRef.current);
      globalIntervalRef.current = null;
    }
    
    if (individualIntervalRef.current) {
      clearInterval(individualIntervalRef.current);
      individualIntervalRef.current = null;
    }
  };

  // Resume timer
  const resumeTimer = () => {
    if (timerType === 'none') return;
    
    setIsPaused(false);
    setIsTimerRunning(true);

    if (timerType === 'global') {
      globalIntervalRef.current = setInterval(() => {
        setGlobalTimeRemaining(prev => {
          if (prev <= 1) {
            onTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerType === 'individual') {
      individualIntervalRef.current = setInterval(() => {
        setCurrentPlayerTime(prev => {
          if (prev <= 1) {
            onTimeUp(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Reset timer
  const resetTimer = () => {
    pauseTimer();
    setGlobalTimeRemaining(globalDuration);
    setCurrentPlayerTime(individualDuration);
    setTurnNumber(1);
  };

  // Next turn (for individual timer)
  const nextTurn = () => {
    if (timerType === 'individual') {
      const nextTurnNumber = turnNumber + 1;
      setTurnNumber(nextTurnNumber);
      
      const newTurnTime = calculateTurnTime(nextTurnNumber);
      setCurrentPlayerTime(newTurnTime);
      
      // Restart individual timer
      if (individualIntervalRef.current) {
        clearInterval(individualIntervalRef.current);
      }
      
      if (isTimerRunning && !isPaused) {
        individualIntervalRef.current = setInterval(() => {
          setCurrentPlayerTime(prev => {
            if (prev <= 1) {
              onTimeUp(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (globalIntervalRef.current) {
        clearInterval(globalIntervalRef.current);
      }
      if (individualIntervalRef.current) {
        clearInterval(individualIntervalRef.current);
      }
    };
  }, []);

  return {
    globalTimeRemaining,
    currentPlayerTime,
    isTimerRunning,
    isPaused,
    turnNumber,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    nextTurn,
  };
}