// Enhanced MTG-inspired color palette with authentic planeswalker themes
export const colors = {
  // Primary MTG mana colors (WUBRG) - Enhanced for digital use
  white: '#FFFBD5',
  blue: '#0E68AB',
  black: '#150B00',
  red: '#D3202A',
  green: '#00733E',
  
  // Enhanced mana colors for better contrast
  darkBlue: '#0A4A7A',
  darkGreen: '#004A2A',
  darkRed: '#A01A22',
  
  // Planeswalker spark colors
  planeswalkerGold: '#C8AA6E',
  planeswalkerSilver: '#B8B8B8',
  planeswalkerCopper: '#B87333',
  
  // Mystical colors
  ethereal: '#E6E6FA',
  arcane: '#4B0082',
  void: '#1C1C1C',
  
  // Card frame colors (authentic MTG)
  cardFrame: '#C8AA6E',
  cardBorder: '#8B7355',
  cardText: '#2C1810',
  
  // Neutral colors with MTG flavor
  white: '#FFFFFF',
  lightGray: '#E5E5E5',
  gray: '#999999',
  darkGray: '#333333',
  black: '#000000',
  
  // UI colors with planeswalker theme
  background: '#0A0A0A',
  surface: '#1A1A1A',
  overlay: 'rgba(0, 0, 0, 0.8)',
  
  // Enhanced status colors with MTG flavor
  success: '#00733E', // Green mana
  warning: '#FF9800', // Artifact orange
  error: '#D3202A', // Red mana
  info: '#0E68AB', // Blue mana
  
  // Planeswalker loyalty colors
  loyalty: {
    high: '#FFD700',
    medium: '#FFA500',
    low: '#FF6347',
    ultimate: '#9370DB',
  },
  
  // Mana colors (enhanced for UI)
  mana: {
    white: '#FFFBD5',
    blue: '#0E68AB',
    black: '#150B00',
    red: '#D3202A',
    green: '#00733E',
    colorless: '#CAC5C0',
    multicolor: '#FFD700',
  },
  
  // Spell type colors
  spell: {
    instant: '#4169E1',
    sorcery: '#DC143C',
    enchantment: '#9370DB',
    artifact: '#708090',
    creature: '#228B22',
    planeswalker: '#FFD700',
  },
  
  // Rarity colors
  rarity: {
    common: '#1E1E1E',
    uncommon: '#C0C0C0',
    rare: '#FFD700',
    mythic: '#FF8C00',
  },
  
  // Plane colors for backgrounds
  plane: {
    dominaria: '#8B4513',
    ravnica: '#4682B4',
    zendikar: '#32CD32',
    innistrad: '#2F4F4F',
    mirrodin: '#C0C0C0',
    phyrexia: '#8B0000',
  },
} as const;