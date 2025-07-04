import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface TableLayoutPreviewProps {
  layoutId: string;
  playerCount: number;
  isSelected: boolean;
}

export function TableLayoutPreview({ layoutId, playerCount, isSelected }: TableLayoutPreviewProps) {
  const getPlayerPositions = (layoutId: string) => {
    switch (layoutId) {
      // 2 Players
      case '2-opposite-long':
        return [
          { id: 'P1', x: 10, y: 50, rotation: 90, side: 'left' },
          { id: 'P2', x: 90, y: 50, rotation: -90, side: 'right' },
        ];
      case '2-opposite-short':
        return [
          { id: 'P1', x: 50, y: 10, rotation: 180, side: 'top' },
          { id: 'P2', x: 50, y: 90, rotation: 0, side: 'bottom' },
        ];

      // 3 Players - Fixed rotations
      case '3-balanced':
        return [
          { id: 'P1', x: 50, y: 10, rotation: 180, side: 'top' },
          { id: 'P2', x: 10, y: 75, rotation: 90, side: 'bottom-left' },
          { id: 'P3', x: 90, y: 75, rotation: -90, side: 'bottom-right' },
        ];
      case '3-close':
        return [
          { id: 'P1', x: 50, y: 10, rotation: 180, side: 'top' },
          { id: 'P2', x: 25, y: 75, rotation: 90, side: 'bottom-left' },
          { id: 'P3', x: 75, y: 75, rotation: -90, side: 'bottom-right' },
        ];

      // 4 Players - Fixed planar square
      case '4-square':
        return [
          { id: 'P1', x: 25, y: 25, rotation: 180, side: 'top-left' },
          { id: 'P2', x: 75, y: 25, rotation: 90, side: 'top-right' },
          { id: 'P3', x: 75, y: 75, rotation: 0, side: 'bottom-right' },
          { id: 'P4', x: 25, y: 75, rotation: 270, side: 'bottom-left' },
        ];
      case '4-long-sides':
        return [
          { id: 'P1', x: 10, y: 30, rotation: 90, side: 'left' },
          { id: 'P2', x: 10, y: 70, rotation: 90, side: 'left' },
          { id: 'P3', x: 90, y: 30, rotation: -90, side: 'right' },
          { id: 'P4', x: 90, y: 70, rotation: -90, side: 'right' },
        ];

      default:
        return [];
    }
  };

  const positions = getPlayerPositions(layoutId);

  return (
    <View style={setupStyles.phonePreview}>
      {/* Phone Frame */}
      <View style={[
        setupStyles.phoneFrame,
        isSelected && setupStyles.selectedPhoneFrame
      ]}>
        {/* Phone Screen */}
        <View style={[
          setupStyles.phoneScreen,
          isSelected && setupStyles.selectedPhoneScreen
        ]}>
          {/* Game Table Area */}
          <View style={[
            setupStyles.gameTableArea,
            isSelected && setupStyles.selectedGameTableArea
          ]}>
            {/* Player UI Elements */}
            {positions.map((position) => (
              <View
                key={position.id}
                style={[
                  setupStyles.playerUI,
                  {
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: [
                      { translateX: -20 },
                      { translateY: -15 },
                      { rotate: `${position.rotation}deg` }
                    ],
                  },
                  isSelected && setupStyles.selectedPlayerUI
                ]}
              >
                <View style={[
                  setupStyles.playerUIInner,
                  isSelected && setupStyles.selectedPlayerUIInner
                ]}>
                  <Text style={[
                    setupStyles.playerUIText,
                    isSelected && setupStyles.selectedPlayerUIText
                  ]}>
                    {position.id}
                  </Text>
                  <View style={[
                    setupStyles.lifeCounter,
                    isSelected && setupStyles.selectedLifeCounter
                  ]}>
                    <Text style={[
                      setupStyles.lifeCounterText,
                      isSelected && setupStyles.selectedLifeCounterText
                    ]}>
                      20
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            
            {/* Central Game Area */}
            <View style={[
              setupStyles.centralGameArea,
              isSelected && setupStyles.selectedCentralGameArea
            ]}>
              <Text style={[
                setupStyles.centralGameText,
                isSelected && setupStyles.selectedCentralGameText
              ]}>
                🃏
              </Text>
            </View>
          </View>
        </View>
        
        {/* Phone Home Indicator */}
        <View style={[
          setupStyles.phoneHomeIndicator,
          isSelected && setupStyles.selectedPhoneHomeIndicator
        ]} />
      </View>
    </View>
  );
}