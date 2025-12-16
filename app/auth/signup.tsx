import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';
import { checkPasswordCompromised, validatePasswordStrength } from '@/utils/passwordSecurity';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordWarnings, setPasswordWarnings] = useState<string[]>([]);

  const { signUp } = useAuth();
  const router = useRouter();

  const validate = async () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const strengthCheck = validatePasswordStrength(password);
      if (!strengthCheck.isValid) {
        newErrors.password = strengthCheck.errors[0];
      }
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    setCheckingPassword(true);
    const isCompromised = await checkPasswordCompromised(password);
    setCheckingPassword(false);

    if (isCompromised) {
      newErrors.password = 'This password has been exposed in a data breach. Please choose a different password.';
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    const isValid = await validate();
    if (!isValid) return;

    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      Alert.alert(
        'Sign Up Error',
        error.message || 'Something went wrong. Please try again.'
      );
    } else {
      router.replace('/onboarding/comfort-assessment');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErrors({ ...errors, password: '' });

    const strengthCheck = validatePasswordStrength(text);
    setPasswordWarnings(strengthCheck.errors);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Join thousands learning to use AI confidently
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: '' });
              }}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="At least 8 characters with uppercase, lowercase, number, and special character"
              secureTextEntry
              error={errors.password}
              containerStyle={styles.inputSpacing}
            />
            {passwordWarnings.length > 0 && !errors.password && (
              <View style={styles.warningContainer}>
                {passwordWarnings.map((warning, index) => (
                  <View key={index} style={styles.warningItem}>
                    <AlertTriangle size={14} color={Colors.warning} />
                    <Text style={styles.warningText}>{warning}</Text>
                  </View>
                ))}
              </View>
            )}

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors({ ...errors, confirmPassword: '' });
              }}
              placeholder="Re-enter your password"
              secureTextEntry
              error={errors.confirmPassword}
              containerStyle={styles.inputSpacing}
            />

            <Button
              title={checkingPassword ? 'Checking Password Security...' : 'Create Account'}
              onPress={handleSignUp}
              loading={loading || checkingPassword}
              size="large"
              style={styles.submitButton}
            />

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.push('/auth/signin')}
            >
              <Text style={styles.linkText}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  form: {
    gap: 8,
  },
  inputSpacing: {
    marginTop: 16,
  },
  submitButton: {
    marginTop: 24,
  },
  linkButton: {
    alignItems: 'center',
    padding: 12,
  },
  linkText: {
    ...Typography.body,
    color: Colors.primary,
  },
  warningContainer: {
    marginTop: 8,
    gap: 6,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warningText: {
    ...Typography.caption,
    color: Colors.warning,
    flex: 1,
  },
});
