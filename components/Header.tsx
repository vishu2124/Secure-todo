import React,{useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/useThemeColor';

type HeaderProps = {
  onShowButtonLeft: () => void;
  onShowButtonRight: () => void;
  onNavigateToSettings: () => void;
  isLeftActive: boolean; // Prop to determine if "Todo" is active
};

export function Header({ onShowButtonLeft, onShowButtonRight, onNavigateToSettings, isLeftActive=true }: HeaderProps) {
  const textColor = '#fff';
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground', 'background');

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.buttonContainer}>
        <TouchableOpacity onPress={onShowButtonLeft} style={[headerStyles.actionButtonLeft, { backgroundColor: buttonBackgroundColor }]}>
          <Text style={[
              headerStyles.buttonText,
              isLeftActive && headerStyles.activeText, // Apply bold if isLeftActive
            ]}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShowButtonRight} style={[headerStyles.actionButtonRight, { backgroundColor: buttonBackgroundColor }]}>
          <Text style={[
              headerStyles.buttonText,
              !isLeftActive && headerStyles.activeText, // Apply bold if isLeftActive
            ]}>Completed</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity onPress={onNavigateToSettings} style={[headerStyles.settings]}>
        <MaterialIcons color={buttonBackgroundColor} size={20} name={'settings'}  />
      </TouchableOpacity>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures buttons are centered and settings aligns to the right
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the button group
    flex: 1, // Takes up available space to center the buttons
  },
  buttonText:{
    color:'#fff'
  },
  actionButtonRight: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    alignItems: 'center',
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
  },
  actionButtonLeft: {
    marginLeft:20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
  },
  settings: {
    paddingHorizontal: 0,
    borderColor:'#000',
    borderWidth:1,
  },
  activeText: {
    fontWeight: '700', // Bold text when active
  },
});
