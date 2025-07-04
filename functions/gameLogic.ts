import { Player, GameState } from '@/types/game';

export const createPlayer = (id: string, name: string, startingLife: number = 20): Player => ({
  id,
  name,
  life: startingLife,
  color: '#FFFFFF',
  isActive: false,
});

export const updatePlayerLife = (players: Player[], playerId: string, newLife: number): Player[] => {
  return players.map(player =>
    player.id === playerId ? { ...player, life: Math.max(0, newLife) } : player
  );
};

export const setActivePlayer = (players: Player[], playerId: string): Player[] => {
  return players.map(player => ({
    ...player,
    isActive: player.id === playerId,
  }));
};

export const resetGame = (playerCount: number, startingLife: number = 20): GameState => {
  const players = Array.from({ length: playerCount }, (_, index) => 
    createPlayer(`player-${index + 1}`, `Player ${index + 1}`, startingLife)
  );

  return {
    players,
    currentTurn: 0,
    gameStartTime: new Date(),
    isGameActive: true,
    gameMode: 'single',
  };
};

export const getWinners = (players: Player[]): Player[] => {
  const alivePlayers = players.filter(player => player.life > 0);
  return alivePlayers.length === 1 ? alivePlayers : [];
};