import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { PROMPT_TEMPLATES } from '@/data/templates';
import { matchPlatform } from '@/utils/platformMatcher';
import { generatePrompt } from '@/utils/promptGenerator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, HelpCircle, CheckCircle } from 'lucide-react-native';

export default function PromptWizard() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const template = PROMPT_TEMPLATES.find((t) => t.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  if (!template) {
    return null;
  }

  const step = template.steps[currentStep];
  const isLastStep = currentStep === template.steps.length - 1;
  const canProceed = answers[step.id] || selectedOptions[step.id]?.length > 0;

  const handleNext = async () => {
    if (isLastStep) {
      await handleComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    const promptContent = generatePrompt(template, { answers, selectedOptions });

    const { data: profileData } = await supabase
      .from('profiles')
      .select('comfort_level')
      .eq('id', user?.id)
      .maybeSingle();

    const recommendation = matchPlatform({
      category: template.category,
      comfortLevel: profileData?.comfort_level || 3,
    });

    if (user) {
      const { data: savedPrompt } = await supabase
        .from('prompts_library')
        .insert({
          user_id: user.id,
          title: template.name,
          content: promptContent,
          category: template.category,
          recommended_platform: recommendation.platform.name,
          clarity_score: 85,
        })
        .select()
        .single();

      const { error: rpcError } = await supabase.rpc('increment', {
        table_name: 'user_progress',
        column_name: 'prompts_created',
        user_id: user.id,
      });

      if (rpcError) {
        await supabase
          .from('user_progress')
          .update({ prompts_created: 1 })
          .eq('user_id', user.id);
      }
    }

    router.push({
      pathname: '/prompt-result',
      params: {
        prompt: promptContent,
        platformId: recommendation.platform.id,
        templateName: template.name,
        category: template.category,
      },
    } as any);

    setLoading(false);
  };

  const handleMultiSelect = (option: string) => {
    const current = selectedOptions[step.id] || [];
    const newSelection = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setSelectedOptions({ ...selectedOptions, [step.id]: newSelection });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.progress}>
          <Text style={styles.progressText}>
            Step {currentStep + 1} of {template.steps.length}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>

        {step.helpText && (
          <Card style={styles.helpCard}>
            <View style={styles.helpHeader}>
              <HelpCircle size={20} color={Colors.primary} />
              <Text style={styles.helpTitle}>Tip</Text>
            </View>
            <Text style={styles.helpText}>{step.helpText}</Text>
          </Card>
        )}

        {step.inputType === 'text' && (
          <TextInput
            style={styles.textInput}
            value={answers[step.id] || ''}
            onChangeText={(text) =>
              setAnswers({ ...answers, [step.id]: text })
            }
            placeholder={step.placeholder}
            placeholderTextColor={Colors.textLighter}
            multiline={false}
          />
        )}

        {step.inputType === 'textarea' && (
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={answers[step.id] || ''}
            onChangeText={(text) =>
              setAnswers({ ...answers, [step.id]: text })
            }
            placeholder={step.placeholder}
            placeholderTextColor={Colors.textLighter}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        )}

        {step.inputType === 'select' && step.options && (
          <View style={styles.options}>
            {step.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  answers[step.id] === option && styles.optionSelected,
                ]}
                onPress={() => setAnswers({ ...answers, [step.id]: option })}
              >
                <Text
                  style={[
                    styles.optionText,
                    answers[step.id] === option && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {answers[step.id] === option && (
                  <CheckCircle size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step.inputType === 'multiselect' && step.options && (
          <View style={styles.options}>
            {step.options.map((option) => {
              const isSelected = selectedOptions[step.id]?.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                  ]}
                  onPress={() => handleMultiSelect(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                  {isSelected && (
                    <CheckCircle size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button
            title="Back"
            onPress={() => setCurrentStep(currentStep - 1)}
            variant="outline"
            size="large"
          />
        )}
        <Button
          title={isLastStep ? 'Complete' : 'Next'}
          onPress={handleNext}
          disabled={!canProceed}
          loading={loading}
          size="large"
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  progress: {
    flex: 1,
  },
  progressText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    fontWeight: '600',
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: 24,
  },
  helpCard: {
    backgroundColor: Colors.primaryLight + '10',
    marginBottom: 24,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  helpTitle: {
    ...Typography.h5,
    color: Colors.primary,
  },
  helpText: {
    ...Typography.bodySmall,
    color: Colors.text,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Typography.body,
    color: Colors.text,
    minHeight: 48,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  options: {
    gap: 12,
  },
  option: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '10',
  },
  optionText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    flexDirection: 'row',
    gap: 12,
  },
  nextButton: {
    flex: 1,
  },
});
