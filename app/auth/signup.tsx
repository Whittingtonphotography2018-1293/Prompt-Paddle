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
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft } from 'lucide-react-native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signUp } = useAuth();
  const router = useRouter();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

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
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: '' });
              }}
              placeholder="At least 6 characters"
              secureTextEntry
              error={errors.password}
              containerStyle={styles.inputSpacing}
            />

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
              title="Create Account"
              onPress={handleSignUp}
              loading={loading}
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
});
