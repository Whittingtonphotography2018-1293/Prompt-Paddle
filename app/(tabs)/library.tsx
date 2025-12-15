import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import {
  Search,
  Star,
  Trash2,
  Copy,
  Calendar,
  Tag,
  Sparkles,
  ExternalLink,
} from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { AI_PLATFORMS } from '@/data/platforms';

interface SavedPrompt {
  id: string;
  title: string;
  content: string;
  category: string;
  recommended_platform: string | null;
  is_favorite: boolean;
  practice_count: number;
  clarity_score: number;
  created_at: string;
}

export default function LibraryTab() {
  const { user } = useAuth();
  const router = useRouter();
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadPrompts();
  }, [user]);

  useEffect(() => {
    filterPrompts();
  }, [searchQuery, selectedCategory, prompts]);

  const loadPrompts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('prompts_library')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setPrompts(data);
    }
    setLoading(false);
  };

  const filterPrompts = () => {
    let filtered = [...prompts];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredPrompts(filtered);
  };

  const toggleFavorite = async (promptId: string, currentFavorite: boolean) => {
    const { error } = await supabase
      .from('prompts_library')
      .update({ is_favorite: !currentFavorite })
      .eq('id', promptId);

    if (!error) {
      setPrompts(
        prompts.map((p) =>
          p.id === promptId ? { ...p, is_favorite: !currentFavorite } : p
        )
      );
    }
  };

  const deletePrompt = async (promptId: string, title: string) => {
    Alert.alert('Delete Prompt', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('prompts_library')
            .delete()
            .eq('id', promptId);

          if (!error) {
            setPrompts(prompts.filter((p) => p.id !== promptId));
          }
        },
      },
    ]);
  };

  const copyToClipboard = async (content: string, title: string) => {
    await Clipboard.setStringAsync(content);
    Alert.alert('Copied!', `"${title}" copied to clipboard`);
  };

  const categories = Array.from(new Set(prompts.map((p) => p.category)));
  const favoritePrompts = filteredPrompts.filter((p) => p.is_favorite);
  const regularPrompts = filteredPrompts.filter((p) => !p.is_favorite);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Library</Text>
        <Text style={styles.subtitle}>
          {prompts.length} prompt{prompts.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search prompts..."
            placeholderTextColor={Colors.textLighter}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {categories.length > 0 && (
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
      )}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Loading your prompts...</Text>
          </Card>
        ) : filteredPrompts.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Sparkles size={48} color={Colors.textLighter} />
            <Text style={styles.emptyText}>
              {prompts.length === 0
                ? 'No prompts yet'
                : 'No prompts match your search'}
            </Text>
            <Text style={styles.emptySubtext}>
              {prompts.length === 0
                ? 'Create your first prompt to get started!'
                : 'Try a different search term or category'}
            </Text>
          </Card>
        ) : (
          <>
            {favoritePrompts.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Favorites</Text>
                {favoritePrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onToggleFavorite={toggleFavorite}
                    onDelete={deletePrompt}
                    onCopy={copyToClipboard}
                    formatDate={formatDate}
                    router={router}
                  />
                ))}
              </View>
            )}

            {regularPrompts.length > 0 && (
              <View style={styles.section}>
                {favoritePrompts.length > 0 && (
                  <Text style={styles.sectionTitle}>All Prompts</Text>
                )}
                {regularPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onToggleFavorite={toggleFavorite}
                    onDelete={deletePrompt}
                    onCopy={copyToClipboard}
                    formatDate={formatDate}
                    router={router}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function PromptCard({
  prompt,
  onToggleFavorite,
  onDelete,
  onCopy,
  formatDate,
  router,
}: {
  prompt: SavedPrompt;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onDelete: (id: string, title: string) => void;
  onCopy: (content: string, title: string) => void;
  formatDate: (date: string) => string;
  router: any;
}) {
  const handleViewResult = () => {
    if (!prompt.recommended_platform) return;

    const platform = AI_PLATFORMS.find(
      (p) => p.name.toLowerCase() === prompt.recommended_platform?.toLowerCase()
    );

    if (platform) {
      router.push({
        pathname: '/prompt-result',
        params: {
          prompt: prompt.content,
          platformId: platform.id,
          templateName: prompt.title,
          category: prompt.category,
        },
      });
    }
  };
  return (
    <Card style={styles.promptCard}>
      <View style={styles.promptHeader}>
        <Text style={styles.promptTitle}>{prompt.title}</Text>
        <View style={styles.promptActions}>
          <TouchableOpacity
            onPress={() => onToggleFavorite(prompt.id, prompt.is_favorite)}
            style={styles.actionButton}
          >
            <Star
              size={20}
              color={prompt.is_favorite ? Colors.warning : Colors.textLight}
              fill={prompt.is_favorite ? Colors.warning : 'none'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.promptContent} numberOfLines={3}>
        {prompt.content}
      </Text>

      <View style={styles.promptMeta}>
        <View style={styles.metaItem}>
          <Tag size={14} color={Colors.textLight} />
          <Text style={styles.metaText}>{prompt.category}</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={14} color={Colors.textLight} />
          <Text style={styles.metaText}>{formatDate(prompt.created_at)}</Text>
        </View>
      </View>

      {prompt.recommended_platform && (
        <View style={styles.platformBadge}>
          <Text style={styles.platformText}>
            Recommended: {prompt.recommended_platform}
          </Text>
        </View>
      )}

      <View style={styles.promptFooter}>
        {prompt.recommended_platform && (
          <TouchableOpacity
            style={styles.footerButton}
            onPress={handleViewResult}
          >
            <ExternalLink size={16} color={Colors.success} />
            <Text style={[styles.footerButtonText, { color: Colors.success }]}>
              View Result
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => onCopy(prompt.content, prompt.title)}
        >
          <Copy size={16} color={Colors.primary} />
          <Text style={styles.footerButtonText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => onDelete(prompt.id, prompt.title)}
        >
          <Trash2 size={16} color={Colors.error} />
          <Text style={[styles.footerButtonText, { color: Colors.error }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
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
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  categoryScroll: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 8,
  },
  categoryContent: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
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
    color: Colors.surface,
  },
  content: {
    padding: 24,
    paddingTop: 8,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 16,
  },
  promptCard: {
    marginBottom: 16,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  promptTitle: {
    ...Typography.h5,
    color: Colors.text,
    flex: 1,
    marginRight: 12,
  },
  promptActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  promptContent: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: 12,
    lineHeight: 22,
  },
  promptMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  platformBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.primaryLight + '20',
    marginBottom: 12,
  },
  platformText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  promptFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
    gap: 16,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerButtonText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    ...Typography.h5,
    color: Colors.textLight,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textLighter,
    textAlign: 'center',
  },
});
