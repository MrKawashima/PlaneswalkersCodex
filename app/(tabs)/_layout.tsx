import { Tabs } from 'expo-router';
import { Hourglass, Heart, Settings, Crown } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { BackButton } from '@/components/BackButton';

export default function TabLayout() {
  return (
    <>
      <BackButton />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.black,
            borderTopColor: colors.darkGray,
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarActiveTintColor: colors.planeswalkerGold,
          tabBarInactiveTintColor: colors.gray,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Arena',
            tabBarIcon: ({ size, color }) => (
              <Crown size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="timer"
          options={{
            title: 'Chronometer',
            tabBarIcon: ({ size, color }) => (
              <Hourglass size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Arcane',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}