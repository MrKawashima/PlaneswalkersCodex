import { useState, useEffect } from 'react';

interface Player {
  id: string;
  name: string;
  life: number;
  color: string;
  isActive: boolean;
}

export function useGameLogic(playerCount: number, startingLife: number) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [isGameActive, setIsGameActive] = useState(true);
  const [winners, setWinners] = useState<Player[]>([]);

  // Initialize players
  useEffect(() => {
    const initialPlayers = Array.from({ length: playerCount }, (_, index) => ({
      id: `player-${index + 1}`,
      name: `Player ${index + 1}`,
      life: startingLife,
      color: '#FFFFFF',
      isActive: index === 0,
    }));
    
    setPlayers(initialPlayers);
    setCurrentPlayerIndex(0);
    setGameStartTime(new Date());
    setIsGameActive(true);
    setWinners([]);
  }, [playerCount, startingLife]);

  // Check for victory conditions
  useEffect(() => {
    const alivePlayers = players.filter(player => player.life > 0);
    
    if (alivePlayers.length <= 1 && players.length > 0) {
      setWinners(alivePlayers);
      setIsGameActive(false);
    }
  }, [players]);

  const updatePlayerLife = (playerId: string, newLife: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId ? { ...player, life: Math.max(0, newLife) } : player
      )
    );
  };

  const setActivePlayer = (playerIndex: number) => {
    setCurrentPlayerIndex(playerIndex);
    setPlayers(prevPlayers =>
      prevPlayers.map((player, index) => ({
        ...player,
        isActive: index === playerIndex,
      }))
    );
  };

  const resetGame = () => {
    const resetPlayers = players.map(player => ({
      ...player,
      life: startingLife,
      isActive: false,
    }));
    
    resetPlayers[0].isActive = true;
    
    setPlayers(resetPlayers);
    setCurrentPlayerIndex(0);
    setGameStartTime(new Date());
    setIsGameActive(true);
    setWinners([]);
  };

  const endGame = () => {
    setIsGameActive(false);
  };

  return {
    players,
    currentPlayerIndex,
    gameStartTime,
    isGameActive,
    winners,
    updatePlayerLife,
    setActivePlayer,
    resetGame,
    endGame,
  };
}