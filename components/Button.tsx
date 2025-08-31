import { StyleSheet, View, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  label: string;
  theme?: 'primary' | 'secondary' | 'danger';
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap; 
  disabled?: boolean;
};

export default function Button({ label, theme = 'secondary', onPress, icon, disabled = false }: Props) {
  const getButtonStyle = () => {
    switch (theme) {
      case 'primary':
        return {
          container: [
            styles.buttonContainer,
            styles.primaryContainer,
            disabled && styles.disabledContainer
          ],
          button: [
            styles.button,
            styles.primaryButton,
            disabled && styles.disabledButton
          ],
          text: [
            styles.buttonLabel,
            styles.primaryText,
            disabled && styles.disabledText
          ]
        };
      case 'danger':
        return {
          container: [
            styles.buttonContainer,
            styles.dangerContainer,
            disabled && styles.disabledContainer
          ],
          button: [
            styles.button,
            styles.dangerButton,
            disabled && styles.disabledButton
          ],
          text: [
            styles.buttonLabel,
            styles.dangerText,
            disabled && styles.disabledText
          ]
        };
      default:
        return {
          container: [
            styles.buttonContainer,
            styles.secondaryContainer,
            disabled && styles.disabledContainer
          ],
          button: [
            styles.button,
            styles.secondaryButton,
            disabled && styles.disabledButton
          ],
          text: [
            styles.buttonLabel,
            styles.secondaryText,
            disabled && styles.disabledText
          ]
        };
    }
  };

  const buttonStyles = getButtonStyle();

  // Get icon color based on theme and disabled state
  const getIconColor = () => {
    if (disabled) return '#9CA3AF';
    if (theme === 'primary') return '#FFFFFF';
    if (theme === 'danger') return '#FFFFFF';
    return '#8B5CF6';
  };

  return (
    <View style={buttonStyles.container}>
      <Pressable
        style={({ pressed }) => [
          ...buttonStyles.button,
          pressed && !disabled && styles.pressed
        ]}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
      >
        {icon && (
          <Ionicons 
            name={icon} 
            size={18} 
            color={getIconColor()} 
            style={styles.buttonIcon} 
          />
        )}
        <Text style={buttonStyles.text}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    borderRadius: 12,
  },
  button: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  // Primary theme
  primaryContainer: {
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  // Secondary theme
  secondaryContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
  },
  secondaryText: {
    color: '#8B5CF6',
  },
  // Danger theme
  dangerContainer: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dangerButton: {
    backgroundColor: '#EF4444',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  // Disabled state
  disabledContainer: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  disabledText: {
    color: '#9CA3AF',
  },
  // Pressed state
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});