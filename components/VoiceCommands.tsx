import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { Mic, MicOff } from 'lucide-react-native';

type Command = {
  id: string;
  text: string;
  action: () => void;
};

export default function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const commands: Command[] = [
    {
      id: '1',
      text: 'Show me mojito recipe',
      action: () => console.log('Navigate to mojito recipe'),
    },
    {
      id: '2',
      text: 'Add to favorites',
      action: () => console.log('Add current recipe to favorites'),
    },
    {
      id: '3',
      text: 'Start shopping list',
      action: () => console.log('Navigate to shopping list'),
    },
  ];

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const handleStartListening = () => {
    // TODO: Implement actual voice recognition
    setIsListening(true);
    setRecognizedText('');
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Commands</Text>
        <Text style={styles.subtitle}>
          Try saying: "Show me mojito recipe"
        </Text>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.micContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPress={isListening ? handleStopListening : handleStartListening}
          >
            {isListening ? (
              <MicOff size={32} color={Colors.white} />
            ) : (
              <Mic size={32} color={Colors.white} />
            )}
          </TouchableOpacity>
        </Animated.View>

        {recognizedText ? (
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        ) : (
          <Text style={styles.placeholderText}>
            {isListening ? 'Listening...' : 'Tap the mic to start'}
          </Text>
        )}
      </View>

      <View style={styles.commandsList}>
        <Text style={styles.commandsTitle}>Available Commands:</Text>
        {commands.map((command) => (
          <TouchableOpacity
            key={command.id}
            style={styles.commandItem}
            onPress={command.action}
          >
            <Text style={styles.commandText}>{command.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
    padding: Layout.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.white,
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  micContainer: {
    marginBottom: Layout.spacing.xl,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: Colors.error,
  },
  recognizedText: {
    ...Fonts.body,
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
  },
  placeholderText: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.gray[400],
    textAlign: 'center',
    marginTop: Layout.spacing.lg,
  },
  commandsList: {
    marginTop: Layout.spacing.xl,
  },
  commandsTitle: {
    ...Fonts.subheading,
    fontSize: 18,
    color: Colors.white,
    marginBottom: Layout.spacing.md,
  },
  commandItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
  },
  commandText: {
    ...Fonts.body,
    fontSize: 16,
    color: Colors.white,
  },
}); 