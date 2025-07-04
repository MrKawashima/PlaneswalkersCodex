export interface Player {
  id: string;
  name: string;
  life: number;
  color: string;
  isActive: boolean;
}

export interface GameState {
  players: Player[];
  currentTurn: number;
  gameStartTime: Date | null;
  isGameActive: boolean;
  gameMode: 'single' | 'multiple';
}

export interface TimerState {
  totalTime: number;
  remainingTime: number;
  isRunning: boolean;
  isPaused: boolean;
  turnTime: number;
  currentPlayerTime: number;
}

export type GameMode = 'single' | 'multiple';

export interface GameSettings {
  startingLife: number;
  playerCount: number;
  timerEnabled: boolean;
  turnTimeLimit: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}