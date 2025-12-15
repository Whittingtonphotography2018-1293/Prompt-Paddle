import { Tutorial, Badge } from '@/types/app';

export const TUTORIALS: Tutorial[] = [
  // Beginner Level: Getting Started with AI
  {
    id: 'what-is-ai',
    title: 'What Is AI?',
    description: 'Understanding artificial intelligence and its everyday uses',
    level: 1,
    duration_minutes: 8,
    content: [
      {
        type: 'text',
        title: 'Understanding AI',
        content: '• Computer systems that perform tasks requiring human intelligence\n• Already part of your daily life through voice assistants and recommendation systems\n• Powers everything from Siri to Netflix suggestions',
      },
      {
        type: 'text',
        title: 'Everyday Examples',
        content: '• Face recognition to unlock your phone\n• Autocomplete suggestions while typing\n• Personalized product recommendations\n• Automating tasks and finding patterns in data\n• Making predictions based on historical information',
      },
      {
        type: 'text',
        title: 'Key Takeaway',
        content: '• AI isn\'t magic or science fiction—it\'s a practical tool\n• Learns from data to help us work smarter and faster\n• Understanding AI empowers you to use it more effectively',
      },
    ],
  },
  {
    id: 'types-of-ai-tools',
    title: 'Types of AI Tools',
    description: 'Chatbots, image generators, voice assistants, and more',
    level: 1,
    duration_minutes: 7,
    content: [
      {
        type: 'text',
        title: 'Chatbots and Language Models',
        content: '• Tools like ChatGPT, Claude, and Gemini understand and generate human-like text\n• Can write emails, answer questions, and code\n• Have conversations on virtually any topic',
      },
      {
        type: 'text',
        title: 'Image and Video Generators',
        content: '• DALL-E, Midjourney, and Stable Diffusion create images from text descriptions\n• Video AI tools edit footage and generate animations\n• Can create realistic avatars and visual content',
      },
      {
        type: 'text',
        title: 'Voice and Audio AI',
        content: '• Voice assistants like Alexa and Google Assistant\n• Transcription tools that convert speech to text\n• Music generators that compose original audio\n• Text-to-speech technology',
      },
      {
        type: 'text',
        title: 'Specialized Tools',
        content: '• Code completion assistants\n• Data analysis platforms\n• Translation services\n• Content moderation systems\n• The AI ecosystem is constantly growing with new applications',
      },
    ],
  },
  {
    id: 'choosing-ai-platform',
    title: 'Choosing the Right AI Platform',
    description: 'How to select the best AI tool for your needs',
    level: 1,
    duration_minutes: 8,
    content: [
      {
        type: 'text',
        title: 'Understanding Your Needs',
        content: '• Different AI platforms excel at different tasks\n• Some are better for writing, others for coding\n• Identify your goals: content creation, problem-solving, research, or creative work',
      },
      {
        type: 'text',
        title: 'Key Factors to Consider',
        content: '• Ease of use and learning curve\n• Features offered and capabilities\n• Cost (free vs. paid tiers)\n• Quality and accuracy of responses\n• Speed and performance\n• Integration with your existing tools',
      },
      {
        type: 'text',
        title: 'All-in-One Solution: Galaxy AI',
        content: '• Comprehensive platform for beginners and experienced users\n• Multiple AI capabilities in one place\n• Intuitive interface with powerful features\n• Great results without managing multiple tools',
      },
      {
        type: 'text',
        title: 'Getting Started',
        content: '• Learning by doing is the best approach\n• Start with a user-friendly platform\n• Experiment with different types of prompts\n• Explore specialized tools as you gain confidence',
      },
      {
        type: 'text',
        title: 'Free vs. Paid Options',
        content: '• Many platforms offer free tiers with usage limitations\n• Paid plans provide faster responses and advanced features\n• Start with free options to learn the basics\n• Upgrade as your needs grow and you understand what matters most',
      },
    ],
  },
  {
    id: 'introduction-to-prompts',
    title: 'Introduction to Prompts',
    description: 'What they are and how they shape AI responses',
    level: 1,
    duration_minutes: 6,
    content: [
      {
        type: 'text',
        title: 'What Is a Prompt?',
        content: '• The instruction or question you give to an AI\n• How you communicate what you want the AI to do\n• Can be a conversation starter, question, or command',
      },
      {
        type: 'text',
        title: 'Why Prompts Matter',
        content: '• Quality of your prompt directly affects quality of response\n• Vague prompts get vague answers\n• Specific, well-crafted prompts get precise, useful results',
      },
      {
        type: 'text',
        title: 'Examples',
        content: '• Weak: "Tell me about dogs"\n• Better: "Explain the top 3 differences between Golden Retrievers and Labrador Retrievers in terms of temperament and care needs"\n• The better prompt provides context and specificity',
      },
      {
        type: 'text',
        title: 'The Foundation',
        content: '• Effective prompts are the foundation of working with AI\n• A skill anyone can learn\n• This app will help you master prompt writing',
      },
    ],
  },
  {
    id: 'common-prompt-mistakes',
    title: 'Common Prompt Mistakes',
    description: 'Avoid these pitfalls when writing prompts',
    level: 1,
    duration_minutes: 7,
    content: [
      {
        type: 'text',
        title: 'Being Too Vague',
        content: '• Mistake: "Write something about technology"\n• AI doesn\'t know what aspect, length, or format you want\n• Be specific about what you need to get useful results',
      },
      {
        type: 'text',
        title: 'Assuming Context',
        content: '• Mistake: Jumping into requests without background\n• Example: "Fix this code" without showing the code\n• Always provide necessary context and information',
      },
      {
        type: 'text',
        title: 'No Format Specification',
        content: '• Mistake: Not specifying how you want the output\n• Do you want a list, paragraph, table, or bullet points?\n• Without guidance, AI makes its own choice',
      },
      {
        type: 'text',
        title: 'Single-Shot Expectations',
        content: '• Mistake: Expecting perfection on the first try\n• Prompting is iterative and requires refinement\n• If the first response isn\'t right, refine and try again\n• Great results often require iteration',
      },
      {
        type: 'text',
        title: 'Ignoring Limitations',
        content: '• Mistake: Asking for real-time data or treating AI as a search engine\n• AI has knowledge cutoffs and limitations\n• Can\'t browse the web without special tools\n• Understand what AI can and cannot do',
      },
    ],
  },
  {
    id: 'prompt-examples-comparison',
    title: 'Prompt Examples: Bad to Good',
    description: 'See real examples of weak vs. strong prompts',
    level: 1,
    duration_minutes: 9,
    content: [
      {
        type: 'text',
        title: 'Example 1: Writing Help',
        content: '• Bad: "Help me write" (too vague—write what?)\n• Good: "Write a 150-word introduction for a blog post about time management tips for remote workers"\n• Clear purpose, audience, and length',
      },
      {
        type: 'text',
        title: 'Example 2: Research',
        content: '• Bad: "Tell me about history" (impossibly broad)\n• Good: "Explain the three main causes of World War I in simple terms, using about 200 words"\n• Specific topic, complexity level, and length',
      },
      {
        type: 'text',
        title: 'Example 3: Business Task',
        content: '• Bad: "Make a marketing plan" (no context or constraints)\n• Good: "Create a 3-month social media marketing plan for a new eco-friendly coffee shop targeting millennials, with weekly posting ideas"\n• Detailed requirements and clear scope',
      },
      {
        type: 'text',
        title: 'Example 4: Creative Work',
        content: '• Bad: "Generate an image" (what kind of image?)\n• Good: "A realistic photo of a golden retriever puppy playing in autumn leaves, soft natural lighting, warm colors"\n• Specific details produce better results',
      },
      {
        type: 'text',
        title: 'Example 5: Learning',
        content: '• Bad: "Explain math" (which math concept?)\n• Good: "Explain the Pythagorean theorem to a 7th grader using a real-world example, like finding the distance across a rectangular park"\n• Clear audience and approach',
      },
      {
        type: 'text',
        title: 'Key Pattern',
        content: '• Good prompts include who (audience)\n• What (specific task)\n• Why (context/purpose)\n• How (format/style)\n• Adding these details transforms vague requests into actionable instructions',
      },
    ],
  },
  {
    id: 'prompt-crafting-basics',
    title: 'Prompt Crafting Basics',
    description: 'Writing clear and effective prompts for better results',
    level: 1,
    duration_minutes: 10,
    content: [
      {
        type: 'text',
        title: 'Be Specific',
        content: '• Instead of "Write about exercise"\n• Try "Write a 200-word guide on how beginners can start a home workout routine with no equipment"\n• Specific prompts eliminate guesswork',
      },
      {
        type: 'text',
        title: 'Provide Context',
        content: '• Tell the AI who you are or what you need\n• Example: "I\'m a small business owner. Suggest 5 ways to improve customer retention"\n• Context helps tailor the response to your situation',
      },
      {
        type: 'text',
        title: 'Set the Format',
        content: '• Want a list, paragraph, table, or bullet points? Say so!\n• "List 3 benefits of meditation in bullet points" vs. "Explain meditation benefits"\n• Format specification produces very different results',
      },
      {
        type: 'text',
        title: 'Iterate and Refine',
        content: '• Don\'t expect perfection on the first try\n• If the response isn\'t quite right, refine your prompt\n• Add more detail or adjust your approach\n• Prompting is an iterative process',
      },
    ],
  },
  {
    id: 'ethics-in-ai',
    title: 'Ethics in AI',
    description: 'Bias, fairness, and responsible use of AI tools',
    level: 1,
    duration_minutes: 9,
    content: [
      {
        type: 'text',
        title: 'Understanding Bias',
        content: '• AI systems learn from human-created data which can contain biases\n• Biased training data may produce unfair or stereotypical results\n• Always review AI outputs critically\n• Be aware of potential bias in recommendations and responses',
      },
      {
        type: 'text',
        title: 'Privacy and Security',
        content: '• Be mindful of what information you share with AI tools\n• Avoid entering sensitive personal data or passwords\n• Don\'t share confidential business information\n• Only trust platforms with strong security practices',
      },
      {
        type: 'text',
        title: 'Transparency and Attribution',
        content: '• Be transparent about using AI-generated content\n• Disclose AI-created work when publishing\n• Give credit to human creators\n• Don\'t misrepresent AI content as entirely your own work',
      },
      {
        type: 'text',
        title: 'Responsible Use',
        content: '• Use AI to enhance your work, not replace critical thinking\n• Always verify facts and information\n• Avoid using AI to deceive\n• Respect intellectual property\n• AI augments human capability, not bypass responsibility',
      },
    ],
  },

  // Intermediate Level: Practical AI Skills
  {
    id: 'ai-for-productivity',
    title: 'AI for Productivity',
    description: 'Using AI to write, brainstorm, summarize, and plan',
    level: 2,
    duration_minutes: 10,
    content: [
      {
        type: 'text',
        title: 'Writing Assistance',
        content: '• Draft emails, reports, and documents\n• "Draft a professional email to reschedule a meeting"\n• "Rewrite this paragraph to be more concise"\n• AI accelerates the writing process',
      },
      {
        type: 'text',
        title: 'Brainstorming Ideas',
        content: '• Use AI as a brainstorming partner when stuck\n• "Generate 10 blog post ideas about sustainable living"\n• "Suggest creative names for a coffee shop"\n• AI can spark creativity and new perspectives',
      },
      {
        type: 'text',
        title: 'Summarizing Content',
        content: '• Save time with AI-powered summaries\n• Summarize long articles, reports, or meeting notes\n• "Summarize this text in 3 bullet points"\n• Quickly extract key information',
      },
      {
        type: 'text',
        title: 'Planning and Organization',
        content: '• Help structure tasks and schedules\n• "Create a weekly study plan for learning Spanish"\n• "Break down this project into actionable steps"\n• Use AI as your personal planner',
      },
    ],
  },
  {
    id: 'creative-applications',
    title: 'Creative Applications',
    description: 'Generating images, music, or stories with AI tools',
    level: 2,
    duration_minutes: 8,
    content: [
      {
        type: 'text',
        title: 'Image Generation',
        content: '• Tools like DALL-E and Midjourney create stunning visuals from text\n• Try detailed prompts: "A cozy cabin in a snowy forest at sunset, watercolor style"\n• Experiment with styles, moods, and details\n• More specific descriptions produce better results',
      },
      {
        type: 'text',
        title: 'Story Writing',
        content: '• Write short stories, plot outlines, or character descriptions\n• Example: "Write a 200-word mystery story set in a Victorian mansion"\n• AI can help overcome writer\'s block\n• Use as a starting point or for brainstorming',
      },
      {
        type: 'text',
        title: 'Music and Audio',
        content: '• AI music generators compose tracks based on mood, genre, or theme\n• Generate background music for videos or podcasts\n• Makes audio production accessible to everyone\n• Customize based on your creative needs',
      },
      {
        type: 'text',
        title: 'Creative Collaboration',
        content: '• Think of AI as a creative partner\n• Explore concepts and iterate on designs\n• Get feedback on your ideas\n• Best creative work combines human vision with AI capabilities',
      },
    ],
  },
  {
    id: 'ai-in-research-and-learning',
    title: 'AI in Research and Learning',
    description: 'How to use AI responsibly for studying or work tasks',
    level: 2,
    duration_minutes: 9,
    content: [
      {
        type: 'text',
        title: 'Research Assistant',
        content: '• Explore topics and find connections\n• Understand complex subjects more easily\n• "Explain quantum physics in simple terms"\n• "What are the main arguments for and against renewable energy?"\n• AI can break down difficult concepts',
      },
      {
        type: 'text',
        title: 'Study Support',
        content: '• Create practice questions and quizzes\n• Explain homework problems step by step\n• Generate study guides and summaries\n• "Create 5 quiz questions on World War II"\n• "Explain this math problem step by step"',
      },
      {
        type: 'text',
        title: 'Fact-Checking and Verification',
        content: '• IMPORTANT: Always verify AI responses with reliable sources\n• AI can make mistakes or provide outdated information\n• Use AI as a starting point\n• Confirm facts through trusted references\n• Cross-reference important information',
      },
      {
        type: 'text',
        title: 'Academic Integrity',
        content: '• Use AI to learn and understand, not to cheat\n• Don\'t submit AI-generated work as your own\n• Use AI to clarify concepts\n• Check your work for accuracy\n• Generate study materials for practice',
      },
    ],
  },
  {
    id: 'working-smarter-with-ai',
    title: 'Working Smarter with AI',
    description: 'Automating workflows and repetitive tasks',
    level: 2,
    duration_minutes: 10,
    content: [
      {
        type: 'text',
        title: 'Identify Repetitive Tasks',
        content: '• Look for tasks you do repeatedly\n• Data entry and formatting documents\n• Responding to common emails\n• Prime candidates for AI automation',
      },
      {
        type: 'text',
        title: 'Email and Communication',
        content: '• Create email templates with AI\n• Automate responses to common questions\n• Categorize and prioritize messages\n• "Draft a template for customer inquiry responses"',
      },
      {
        type: 'text',
        title: 'Document Processing',
        content: '• Extract data from documents\n• Convert between different formats\n• Organize and categorize files\n• Summarize reports and extract key data points\n• Generate standard documents automatically',
      },
      {
        type: 'text',
        title: 'Building Workflows',
        content: '• Chain AI tasks together for efficiency\n• Example workflow: transcribe meeting → summarize key points → create action items → draft follow-up emails\n• Think in workflows, not isolated tasks\n• Automate entire processes',
      },
    ],
  },
  {
    id: 'understanding-ai-limits',
    title: 'Understanding AI Limits',
    description: 'When to trust AI and when to verify results',
    level: 2,
    duration_minutes: 8,
    content: [
      {
        type: 'text',
        title: 'AI Makes Mistakes',
        content: '• AI can generate false information confidently\n• It doesn\'t "know" when it\'s wrong\n• Always fact-check important information\n• Be especially careful with dates, statistics, and technical details',
      },
      {
        type: 'text',
        title: 'Lack of Real-Time Data',
        content: '• Most AI models have a knowledge cutoff date\n• Don\'t access the internet in real-time\n• Can\'t provide current news or live data\n• Recent events require special tools or verification',
      },
      {
        type: 'text',
        title: 'Context and Nuance',
        content: '• AI can struggle with nuanced situations\n• Limited emotional intelligence\n• May miss cultural context\n• Lacks deep domain expertise in specialized fields\n• Use human judgment for sensitive decisions',
      },
      {
        type: 'text',
        title: 'When to Trust AI',
        content: '• Drafting text and content creation\n• Generating ideas and brainstorming\n• Pattern recognition and data analysis\n• Processing large amounts of information\n• Trust AI for assistance, but always verify and apply your judgment',
      },
    ],
  },

  // Advanced Level: Building and Customizing with AI
  {
    id: 'conversational-ai-tools',
    title: 'Conversational AI Tools',
    description: 'Building personal assistants or chatbots',
    level: 3,
    duration_minutes: 12,
    content: [
      {
        type: 'text',
        title: 'What Are Chatbots?',
        content: '• AI programs that simulate conversation\n• Can answer FAQs and provide customer support\n• Assist with various tasks automatically\n• Modern chatbots use large language models to understand context',
      },
      {
        type: 'text',
        title: 'Use Cases',
        content: '• Customer service and support\n• Lead generation and qualification\n• Appointment scheduling\n• Personal assistants that manage calendars\n• Answer questions and control smart home devices',
      },
      {
        type: 'text',
        title: 'Building Basics',
        content: '• Define the chatbot\'s purpose and goals\n• Design conversation flows\n• Train on relevant data\n• No-code platforms like Voiceflow or Chatfuel available\n• Accessible without programming knowledge',
      },
      {
        type: 'text',
        title: 'Best Practices',
        content: '• Design clear conversation paths\n• Provide fallback responses for unexpected inputs\n• Always offer a way to reach a human\n• Test extensively for edge cases\n• Ensure graceful handling of unusual scenarios',
      },
    ],
  },
  {
    id: 'ai-data-and-training',
    title: 'AI Data and Training Concepts',
    description: 'Basics of datasets, fine-tuning, and feedback loops',
    level: 3,
    duration_minutes: 11,
    content: [
      {
        type: 'text',
        title: 'How AI Learns',
        content: '• AI models learn patterns from large datasets\n• Language models read billions of text examples\n• Understand grammar, context, and knowledge\n• Quality of data directly affects performance',
      },
      {
        type: 'text',
        title: 'Training vs. Fine-Tuning',
        content: '• Training creates a model from scratch\n• Requires massive data and computing power\n• Fine-tuning specializes pre-trained models\n• Uses smaller datasets for specific tasks\n• Much faster and more cost-effective',
      },
      {
        type: 'text',
        title: 'Feedback Loops',
        content: '• AI improves through user feedback\n• Users rate responses or correct mistakes\n• System learns from corrections\n• Creates continuous improvement cycle\n• AI gets better over time based on real-world usage',
      },
      {
        type: 'text',
        title: 'Data Quality Matters',
        content: '• Garbage in, garbage out principle\n• Biased or incomplete data produces poor AI\n• Low-quality data leads to unreliable results\n• Curating high-quality training data is critical\n• One of the most important aspects of effective AI systems',
      },
    ],
  },
  {
    id: 'prompt-engineering-masterclass',
    title: 'Prompt Engineering Masterclass',
    description: 'Designing structured prompts for precision and creativity',
    level: 3,
    duration_minutes: 15,
    content: [
      {
        type: 'text',
        title: 'Advanced Techniques',
        content: '• Role-playing: "You are an expert marketing consultant"\n• Provide examples: "Here are 3 good headlines... now create 3 more like these"\n• Set constraints: "Answer in exactly 50 words"\n• Combine multiple techniques for best results',
      },
      {
        type: 'text',
        title: 'Chain-of-Thought Prompting',
        content: '• Ask AI to think step-by-step\n• "Explain your reasoning before answering"\n• "Break this problem into steps"\n• Improves accuracy for complex problems\n• Makes AI responses more transparent',
      },
      {
        type: 'text',
        title: 'Few-Shot Learning',
        content: '• Provide multiple examples of desired output format\n• Example: "Convert: \'I am happy\' -> \'Happy, I am.\' Now convert: \'She likes pizza\'"\n• AI learns the pattern from your examples\n• More examples lead to better results',
      },
      {
        type: 'text',
        title: 'Meta-Prompts',
        content: '• Create prompts that generate prompts\n• "Generate 5 effective prompts for writing product descriptions"\n• "What questions should I ask to get better travel recommendations?"\n• Compounds your prompting power\n• Helps refine your approach',
      },
    ],
  },
  {
    id: 'ai-in-business',
    title: 'AI in Business and Innovation',
    description: 'Integrating AI tools into real-world strategies',
    level: 3,
    duration_minutes: 12,
    content: [
      {
        type: 'text',
        title: 'Business Applications',
        content: '• Customer service automation\n• Predictive analytics for sales\n• Personalized marketing campaigns\n• Inventory optimization\n• Fraud detection and prevention\n• Every industry has AI opportunities',
      },
      {
        type: 'text',
        title: 'Implementation Strategy',
        content: '• Start small with high-impact, low-risk projects\n• Identify bottlenecks or repetitive tasks\n• Pilot AI solutions and measure results\n• Scale successful implementations\n• Build internal AI literacy before major investments',
      },
      {
        type: 'text',
        title: 'ROI and Metrics',
        content: '• Measure success through time saved\n• Track error reduction and cost savings\n• Monitor revenue increase\n• Set clear KPIs before implementation\n• Be willing to pivot or abandon unsuccessful experiments',
      },
      {
        type: 'text',
        title: 'Innovation Mindset',
        content: '• AI creates new business models and opportunities\n• Think beyond automating existing processes\n• How can AI enable entirely new products or services?\n• Stay curious and experimental\n• Embrace continuous learning',
      },
    ],
  },
  {
    id: 'future-of-ai',
    title: 'The Future of AI',
    description: 'Trends, regulations, and opportunities in the next AI wave',
    level: 3,
    duration_minutes: 10,
    content: [
      {
        type: 'text',
        title: 'Emerging Trends',
        content: '• Multimodal AI combining text, image, video, and audio\n• AI agents that take actions autonomously\n• Personalized AI assistants\n• AI embedded in everyday devices\n• The pace of change is accelerating',
      },
      {
        type: 'text',
        title: 'Regulation and Governance',
        content: '• Governments developing AI regulations worldwide\n• Addressing safety, privacy, bias, and transparency\n• EU AI Act and AI Bill of Rights\n• Frameworks will shape AI development and deployment\n• Evolving legal landscape',
      },
      {
        type: 'text',
        title: 'Job Market Impact',
        content: '• AI will automate some jobs and create new ones\n• Focus on skills AI can\'t easily replicate\n• Creativity and emotional intelligence\n• Complex problem-solving and human connection\n• Adapt and upskill continuously',
      },
      {
        type: 'text',
        title: 'Opportunities Ahead',
        content: '• AI democratizes capabilities once limited to experts\n• Anyone can access powerful tools for creation and analysis\n• Enables innovation at all levels\n• The future belongs to those who learn to work alongside AI\n• Embrace the possibilities',
      },
    ],
  },
];

export const BADGES: Badge[] = [
  {
    type: 'first_steps',
    name: 'First Steps',
    description: 'Created your first prompt',
    icon: 'footprints',
    requirement: 'Create 1 prompt',
    points: 10,
  },
  {
    type: 'prompt_explorer',
    name: 'Prompt Explorer',
    description: 'Getting comfortable with prompt crafting',
    icon: 'compass',
    requirement: 'Create 5 prompts',
    points: 25,
  },
  {
    type: 'prompt_artisan',
    name: 'Prompt Artisan',
    description: 'Building expertise in AI communication',
    icon: 'wrench',
    requirement: 'Create 10 prompts',
    points: 50,
  },
  {
    type: 'prompt_master',
    name: 'Prompt Master',
    description: 'Mastered the art of AI prompting',
    icon: 'crown',
    requirement: 'Create 25 prompts',
    points: 100,
  },
  {
    type: 'prompt_legend',
    name: 'Prompt Legend',
    description: 'Elite level prompt engineering skills',
    icon: 'star',
    requirement: 'Create 50 prompts',
    points: 200,
  },
  {
    type: 'curious_learner',
    name: 'Curious Learner',
    description: 'Completed your first tutorial',
    icon: 'book-open',
    requirement: 'Complete 1 tutorial',
    points: 15,
  },
  {
    type: 'beginner_graduate',
    name: 'Beginner Graduate',
    description: 'Completed all beginner level tutorials',
    icon: 'graduation-cap',
    requirement: 'Complete all Level 1 tutorials',
    points: 75,
  },
  {
    type: 'intermediate_scholar',
    name: 'Intermediate Scholar',
    description: 'Completed all intermediate level tutorials',
    icon: 'book',
    requirement: 'Complete all Level 2 tutorials',
    points: 100,
  },
  {
    type: 'advanced_expert',
    name: 'Advanced Expert',
    description: 'Completed all advanced level tutorials',
    icon: 'medal',
    requirement: 'Complete all Level 3 tutorials',
    points: 150,
  },
  {
    type: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 10 tutorials total',
    icon: 'lightbulb',
    requirement: 'Complete 10 tutorials',
    points: 50,
  },
  {
    type: 'streak_starter',
    name: 'Streak Starter',
    description: 'Stayed consistent for 3 days',
    icon: 'flame',
    requirement: 'Achieve a 3-day streak',
    points: 30,
  },
  {
    type: 'week_warrior',
    name: 'Week Warrior',
    description: 'A full week of dedication',
    icon: 'zap',
    requirement: 'Achieve a 7-day streak',
    points: 75,
  },
  {
    type: 'month_champion',
    name: 'Month Champion',
    description: 'Incredible 30-day commitment',
    icon: 'trophy',
    requirement: 'Achieve a 30-day streak',
    points: 250,
  },
  {
    type: 'ai_apprentice',
    name: 'AI Apprentice',
    description: 'Completed onboarding and comfort assessment',
    icon: 'user',
    requirement: 'Complete onboarding',
    points: 5,
  },
  {
    type: 'complete_collection',
    name: 'Complete Collection',
    description: 'Completed every single tutorial',
    icon: 'check-circle',
    requirement: 'Complete all 18 tutorials',
    points: 300,
  },
];
