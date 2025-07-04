import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface PlayerPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  side: string;
}

export function getPlayerPositions(layoutId: string, playerCount: number): PlayerPosition[] {
  // Use full screen dimensions - no header or controls
  const availableHeight = height;
  
  switch (layoutId) {
    // 2 Players - Perfect as is
    case '2-opposite-long':
      return [
        { x: 0, y: 0, width: width / 2, height: availableHeight, rotation: 90, side: 'left' },
        { x: width / 2, y: 0, width: width / 2, height: availableHeight, rotation: -90, side: 'right' },
      ];
    case '2-opposite-short':
      return [
        { x: 0, y: 0, width: width, height: availableHeight / 2, rotation: 180, side: 'top' },
        { x: 0, y: availableHeight / 2, width: width, height: availableHeight / 2, rotation: 0, side: 'bottom' },
      ];

    // 3 Players - Fixed text rotation for better side visibility
    case '3-balanced':
      return [
        { x: 0, y: 0, width: width, height: availableHeight / 2, rotation: 180, side: 'top' },
        { x: 0, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 90, side: 'bottom-left' },
        { x: width / 2, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: -90, side: 'bottom-right' },
      ];
    case '3-close':
      return [
        { x: 0, y: 0, width: width, height: availableHeight / 2, rotation: 180, side: 'top' },
        { x: 0, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 90, side: 'bottom-left' },
        { x: width / 2, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: -90, side: 'bottom-right' },
      ];

    // 4 Players - Fixed planar square, kept parallel forces
    case '4-square':
      return [
        // Top-left quadrant (180° rotation - player reads from top)
        { x: 0, y: 0, width: width / 2, height: availableHeight / 2, rotation: 180, side: 'top-left' },
        // Top-right quadrant (90° rotation - player on right side)
        { x: width / 2, y: 0, width: width / 2, height: availableHeight / 2, rotation: 90, side: 'top-right' },
        // Bottom-right quadrant (0° rotation - player reads normally)
        { x: width / 2, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 0, side: 'bottom-right' },
        // Bottom-left quadrant (270° rotation - player on left side)
        { x: 0, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 270, side: 'bottom-left' },
      ];
    case '4-long-sides':
      return [
        { x: 0, y: 0, width: width / 2, height: availableHeight / 2, rotation: 90, side: 'left-top' },
        { x: 0, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 90, side: 'left-bottom' },
        { x: width / 2, y: 0, width: width / 2, height: availableHeight / 2, rotation: -90, side: 'right-top' },
        { x: width / 2, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: -90, side: 'right-bottom' },
      ];

    default:
      // Default to square formation for 4 players
      return [
        { x: 0, y: 0, width: width / 2, height: availableHeight / 2, rotation: 180, side: 'top-left' },
        { x: width / 2, y: 0, width: width / 2, height: availableHeight / 2, rotation: 90, side: 'top-right' },
        { x: width / 2, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 0, side: 'bottom-right' },
        { x: 0, y: availableHeight / 2, width: width / 2, height: availableHeight / 2, rotation: 270, side: 'bottom-left' },
      ].slice(0, playerCount);
  }
}