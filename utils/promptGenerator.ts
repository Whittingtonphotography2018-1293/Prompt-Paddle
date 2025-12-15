import { PromptTemplate } from '@/types/app';

interface AnswerData {
  answers: Record<string, string>;
  selectedOptions: Record<string, string[]>;
}

export function generatePrompt(
  template: PromptTemplate,
  data: AnswerData
): string {
  const { answers, selectedOptions } = data;

  switch (template.id) {
    case 'professional-email':
      return generateEmailPrompt(answers);

    case 'blog-post':
      return generateBlogPostPrompt(answers);

    case 'social-media':
      return generateSocialMediaPrompt(answers, selectedOptions);

    case 'learn-concept':
      return generateLearningPrompt(answers);

    case 'study-guide':
      return generateStudyGuidePrompt(answers, selectedOptions);

    case 'business-proposal':
      return generateBusinessProposalPrompt(answers, selectedOptions);

    case 'marketing-copy':
      return generateMarketingCopyPrompt(answers);

    case 'creative-story':
      return generateStoryPrompt(answers);

    case 'brainstorm':
      return generateBrainstormPrompt(answers);

    case 'code-help':
      return generateCodeHelpPrompt(answers);

    case 'resume':
      return generateResumePrompt(answers);

    case 'cover-letter':
      return generateCoverLetterPrompt(answers);

    case 'meeting-agenda':
      return generateMeetingAgendaPrompt(answers);

    case 'video-script':
      return generateVideoScriptPrompt(answers);

    case 'data-analysis':
      return generateDataAnalysisPrompt(answers, selectedOptions);

    case 'translation':
      return generateTranslationPrompt(answers);

    default:
      return generateGenericPrompt(template, data);
  }
}

function generateEmailPrompt(answers: Record<string, string>): string {
  const purpose = answers['purpose'] || '';
  const recipient = answers['recipient'] || '';
  const context = answers['context'] || '';
  const tone = answers['tone'] || '';

  return `Write a ${tone.toLowerCase()} email to ${recipient.toLowerCase()} with the purpose of: ${purpose}.

Context and details:
${context}

The email should be clear, concise, and professional. Include an appropriate subject line, greeting, body, and closing.`;
}

function generateBlogPostPrompt(answers: Record<string, string>): string {
  const topic = answers['topic'] || '';
  const audience = answers['audience'] || '';
  const length = answers['length'] || '';
  const style = answers['style'] || '';

  return `Write a ${style.toLowerCase()} blog post about: ${topic}

Target audience: ${audience}
Length: ${length}

The blog post should be engaging, well-structured with clear headings, and include an introduction, main body, and conclusion. Make it informative and valuable for the readers.`;
}

function generateSocialMediaPrompt(
  answers: Record<string, string>,
  selectedOptions: Record<string, string[]>
): string {
  const platform = answers['platform'] || '';
  const message = answers['message'] || '';
  const goal = answers['goal'] || '';
  const elements = selectedOptions['elements'] || [];

  let prompt = `Create an engaging social media post for ${platform} about: ${message}

Goal: ${goal}`;

  if (elements.length > 0) {
    prompt += `\n\nInclude: ${elements.join(', ')}`;
  }

  prompt += `\n\nMake sure the post is optimized for ${platform}, follows best practices, and encourages ${goal.toLowerCase()}.`;

  return prompt;
}

function generateLearningPrompt(answers: Record<string, string>): string {
  const concept = answers['concept'] || '';
  const level = answers['level'] || '';
  const style = answers['style'] || '';
  const depth = answers['depth'] || '';

  return `Explain the concept of ${concept} to someone who is a ${level.toLowerCase()}.

Explanation style: ${style}
Level of detail: ${depth}

Please provide a clear, understandable explanation that matches the requested style and depth. Use analogies or examples where helpful.`;
}

function generateStudyGuidePrompt(
  answers: Record<string, string>,
  selectedOptions: Record<string, string[]>
): string {
  const subject = answers['subject'] || '';
  const format = selectedOptions['format'] || [];
  const focus = answers['focus'] || '';

  let prompt = `Create a comprehensive study guide for: ${subject}

Include the following formats: ${format.join(', ')}`;

  if (focus) {
    prompt += `\n\nSpecial focus on: ${focus}`;
  }

  prompt += `\n\nOrganize the study guide in a clear, logical manner that makes it easy to review and memorize key concepts.`;

  return prompt;
}

function generateBusinessProposalPrompt(
  answers: Record<string, string>,
  selectedOptions: Record<string, string[]>
): string {
  const proposalType = answers['proposal-type'] || '';
  const objective = answers['objective'] || '';
  const audience = answers['audience'] || '';
  const keyPoints = selectedOptions['key-points'] || [];

  return `Write a professional ${proposalType.toLowerCase()} for: ${audience}

Objective: ${objective}

The proposal should cover:
${keyPoints.map(point => `- ${point}`).join('\n')}

Structure the proposal with an executive summary, detailed sections for each key point, and a strong conclusion. Make it persuasive and professional.`;
}

function generateMarketingCopyPrompt(answers: Record<string, string>): string {
  const product = answers['product'] || '';
  const copyType = answers['copy-type'] || '';
  const target = answers['target'] || '';
  const benefits = answers['benefits'] || '';
  const tone = answers['tone'] || '';

  return `Write compelling ${copyType.toLowerCase()} for: ${product}

Target audience: ${target}

Key benefits to highlight:
${benefits}

Tone: ${tone}

The copy should be persuasive, highlight the value proposition clearly, and include a strong call-to-action. Focus on benefits over features.`;
}

function generateStoryPrompt(answers: Record<string, string>): string {
  const genre = answers['genre'] || '';
  const elements = answers['elements'] || '';
  const length = answers['length'] || '';
  const style = answers['style'] || '';

  return `Write a ${genre.toLowerCase()} story with the following elements:

${elements}

Length: ${length}
Narrative style: ${style}

Create an engaging story with compelling characters, vivid descriptions, and a satisfying narrative arc.`;
}

function generateBrainstormPrompt(answers: Record<string, string>): string {
  const topic = answers['topic'] || '';
  const constraints = answers['constraints'] || '';
  const quantity = answers['quantity'] || '';
  const creativity = answers['creativity'] || '';

  let prompt = `Generate ${quantity.toLowerCase()} for: ${topic}`;

  if (constraints) {
    prompt += `\n\nConstraints to consider:\n${constraints}`;
  }

  prompt += `\n\nCreativity level: ${creativity}`;
  prompt += `\n\nProvide diverse, well-thought-out ideas with brief explanations for each.`;

  return prompt;
}

function generateCodeHelpPrompt(answers: Record<string, string>): string {
  const language = answers['language'] || '';
  const helpType = answers['help-type'] || '';
  const description = answers['description'] || '';
  const context = answers['context'] || '';

  let prompt = `${helpType} in ${language}:

Task: ${description}`;

  if (context) {
    prompt += `\n\nAdditional context:\n${context}`;
  }

  prompt += `\n\nProvide clean, well-commented code with explanations. Follow best practices and coding standards for ${language}.`;

  return prompt;
}

function generateResumePrompt(answers: Record<string, string>): string {
  const section = answers['section'] || '';
  const jobTarget = answers['job-target'] || '';
  const content = answers['content'] || '';
  const focus = answers['focus'] || '';

  return `Improve the following resume ${section.toLowerCase()} for a ${jobTarget} position:

Current content:
${content}

Areas to emphasize: ${focus}

Rewrite this section to be more impactful, using strong action verbs and quantifiable achievements where possible. Make it ATS-friendly and compelling to recruiters.`;
}

function generateCoverLetterPrompt(answers: Record<string, string>): string {
  const company = answers['company'] || '';
  const position = answers['position'] || '';
  const background = answers['background'] || '';
  const why = answers['why'] || '';
  const highlights = answers['highlights'] || '';

  return `Write a compelling cover letter for the ${position} position at ${company}.

My background:
${background}

Why I'm interested in this role:
${why}

Key achievements to highlight:
${highlights}

The cover letter should be professional, enthusiastic, and demonstrate how my experience aligns with the role. Keep it concise (around 3-4 paragraphs) and include specific examples.`;
}

function generateMeetingAgendaPrompt(answers: Record<string, string>): string {
  const meetingType = answers['meeting-type'] || '';
  const duration = answers['duration'] || '';
  const topics = answers['topics'] || '';
  const attendees = answers['attendees'] || '';

  return `Create a structured agenda for a ${meetingType.toLowerCase()} that is ${duration} long.

Attendees: ${attendees}

Topics to cover:
${topics}

Format the agenda with time allocations for each topic, clear objectives, and action items. Make it professional and easy to follow.`;
}

function generateVideoScriptPrompt(answers: Record<string, string>): string {
  const videoType = answers['video-type'] || '';
  const topic = answers['topic'] || '';
  const length = answers['length'] || '';
  const keyPoints = answers['key-points'] || '';
  const style = answers['style'] || '';

  return `Write a ${style.toLowerCase()} video script for a ${videoType.toLowerCase()} about: ${topic}

Target length: ${length}

Key points to cover:
${keyPoints}

Include a strong hook at the beginning, clear transitions between sections, and a compelling call-to-action at the end. Write in a conversational, engaging tone suitable for video.`;
}

function generateDataAnalysisPrompt(
  answers: Record<string, string>,
  selectedOptions: Record<string, string[]>
): string {
  const dataType = answers['data-type'] || '';
  const dataDescription = answers['data-description'] || '';
  const goal = answers['goal'] || '';
  const output = selectedOptions['output'] || [];

  return `Analyze the following ${dataType.toLowerCase()}:

${dataDescription}

Analysis goal: ${goal}

Please provide:
${output.map(item => `- ${item}`).join('\n')}

Present the analysis in a clear, structured format with actionable insights and supporting evidence.`;
}

function generateTranslationPrompt(answers: Record<string, string>): string {
  const fromLanguage = answers['from-language'] || '';
  const toLanguage = answers['to-language'] || '';
  const text = answers['text'] || '';
  const style = answers['style'] || '';

  return `Translate the following text from ${fromLanguage} to ${toLanguage}.

Translation style: ${style}

Text to translate:
${text}

Provide an accurate translation that maintains the meaning and appropriate tone for the target language.`;
}

function generateGenericPrompt(
  template: PromptTemplate,
  data: AnswerData
): string {
  const { answers, selectedOptions } = data;
  let prompt = `Help me with: ${template.name}\n\n`;

  template.steps.forEach((step) => {
    if (answers[step.id]) {
      prompt += `${step.title}: ${answers[step.id]}\n\n`;
    } else if (selectedOptions[step.id]?.length) {
      prompt += `${step.title}: ${selectedOptions[step.id].join(', ')}\n\n`;
    }
  });

  return prompt.trim();
}
