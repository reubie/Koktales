import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Check, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Fonts from '@/constants/Fonts';
import { RecipeStep } from '@/constants/Cocktails';

type RecipeStepsProps = {
  steps: RecipeStep[];
  onAllStepsComplete: () => void;
};

export default function RecipeSteps({ steps, onAllStepsComplete }: RecipeStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(stepId)) {
      newCompletedSteps.delete(stepId);
    } else {
      newCompletedSteps.add(stepId);
    }
    setCompletedSteps(newCompletedSteps);

    // Check if all steps are completed
    if (newCompletedSteps.size === steps.length) {
      onAllStepsComplete();
    }
  };

  const getActionIcon = (action?: string) => {
    switch (action) {
      case 'shake':
        return '🫗';
      case 'stir':
        return '🥄';
      case 'build':
        return '🏗️';
      case 'garnish':
        return '🌿';
      default:
        return '📝';
    }
  };

  const getActionColor = (action?: string) => {
    switch (action) {
      case 'shake':
        return Colors.primary[600];
      case 'stir':
        return Colors.secondary[500];
      case 'build':
        return Colors.gray[600];
      case 'garnish':
        return Colors.success;
      default:
        return Colors.gray[500];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Steps</Text>
      <Text style={styles.subtitle}>
        Follow along and check off each step as you complete it
      </Text>

      <ScrollView style={styles.stepsContainer} showsVerticalScrollIndicator={false}>
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const actionColor = getActionColor(step.action);

          return (
            <TouchableOpacity
              key={step.id}
              style={[
                styles.stepItem,
                isCompleted && styles.stepItemCompleted,
              ]}
              onPress={() => toggleStep(step.id)}
            >
              <View style={styles.stepHeader}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                
                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepDescription,
                    isCompleted && styles.stepDescriptionCompleted,
                  ]}>
                    {step.description}
                  </Text>
                  
                  <View style={styles.stepMeta}>
                    <Text style={styles.actionIcon}>
                      {getActionIcon(step.action)}
                    </Text>
                    {step.duration && (
                      <View style={styles.durationContainer}>
                        <Clock size={12} color={Colors.gray[500]} />
                        <Text style={styles.durationText}>
                          {step.duration}s
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={[
                  styles.checkbox,
                  isCompleted && styles.checkboxCompleted,
                ]}>
                  {isCompleted && (
                    <Check size={16} color={Colors.white} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {completedSteps.size} of {steps.length} steps completed
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(completedSteps.size / steps.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.lg,
  },
  title: {
    ...Fonts.heading,
    fontSize: 24,
    color: Colors.gray[800],
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.lg,
  },
  stepsContainer: {
    flex: 1,
  },
  stepItem: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepItemCompleted: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[200],
    borderWidth: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  stepNumber: {
    ...Fonts.subheading,
    fontSize: 14,
    color: Colors.primary[700],
  },
  stepContent: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  stepDescription: {
    ...Fonts.body,
    color: Colors.gray[800],
    lineHeight: 20,
    marginBottom: Layout.spacing.xs,
  },
  stepDescriptionCompleted: {
    color: Colors.gray[600],
    textDecorationLine: 'line-through',
  },
  stepMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
    marginRight: Layout.spacing.sm,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    ...Fonts.caption,
    color: Colors.gray[500],
    marginLeft: Layout.spacing.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  progressContainer: {
    marginTop: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  progressText: {
    ...Fonts.body,
    color: Colors.gray[600],
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.gray[200],
    borderRadius: Layout.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: Layout.borderRadius.full,
  },
}); 