import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { PROMPT_TEMPLATES } from '@/data/templates';
import {
  Mail,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Edit,
  Share2,
  ChevronRight,
} from 'lucide-react-native';

const ICON_MAP: Record<string, any> = {
  mail: Mail,
  lightbulb: Lightbulb,
  'book-open': BookOpen,
  'help-circle': HelpCircle,
  edit: Edit,
  'share-2': Share2,
};

export default function CreateTab() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(PROMPT_TEMPLATES.map((t) => t.category))
  );

  const filteredTemplates = selectedCategory
    ? PROMPT_TEMPLATES.filter((t) => t.category === selectedCategory)
    : PROMPT_TEMPLATES;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return Colors.success;
      case 'intermediate':
        return Colors.warning;
      case 'advanced':
        return Colors.error;
      default:
        return Colors.textLight;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Create a Prompt</Text>
            <Text style={styles.subtitle}>
              Choose a template to get started with guided help
            </Text>
          </View>
          <Image
            source={require('@/assets/images/paddle_and_speech_bubble_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryText,
              !selectedCategory && styles.categoryTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredTemplates.map((template) => {
          const IconComponent = ICON_MAP[template.icon] || HelpCircle;
          return (
            <TouchableOpacity
              key={template.id}
              onPress={() =>
                router.push(`/prompt-wizard/${template.id}` as any)
              }
              activeOpacity={0.7}
            >
              <Card style={styles.templateCard}>
                <View style={styles.templateHeader}>
                  <View style={styles.iconContainer}>
                    <IconComponent size={24} color={Colors.primary} />
                  </View>
                  <ChevronRight size={20} color={Colors.textLight} />
                </View>
                <Text style={styles.templateTitle}>{template.name}</Text>
                <Text style={styles.templateDescription}>
                  {template.description}
                </Text>
                <View style={styles.templateFooter}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {template.category}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.difficultyBadge,
                      {
                        backgroundColor:
                          getDifficultyColor(template.difficulty) + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(template.difficulty) },
                      ]}
                    >
                      {template.difficulty}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
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
  logo: {
    width: 56,
    height: 56,
  },
  categoryScroll: {
    flexGrow: 0,
    maxHeight: 50,
    marginBottom: 16,
    backgroundColor: Colors.background,
    zIndex: 10,
  },
  categoryContent: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.textLighter,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  content: {
    padding: 24,
    paddingTop: 0,
    paddingBottom: 100,
  },
  templateCard: {
    padding: 20,
    marginBottom: 16,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  templateTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 8,
  },
  templateDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 16,
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.surfaceGray,
  },
  categoryBadgeText: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    ...Typography.caption,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
