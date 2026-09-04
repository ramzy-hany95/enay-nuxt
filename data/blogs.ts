export type BlogPost = {
  id: string
  category: string
  date: string
  title: string
  excerpt: string
  image: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 'injury-prevention',
    category: 'Injury Prevention',
    date: 'Tuesday - January 24 2026',
    title: 'How Physiotherapy Safely Speeds Up Healing',
    excerpt: 'A guided rehabilitation plan helps the body heal with less strain, better mobility, and fewer setbacks.',
    image: 'background-paint.png',
    content: [
      'Physiotherapy supports recovery by improving circulation, maintaining safe movement, and protecting surrounding tissues during healing.',
      'With the right progression, patients regain strength and confidence without overloading the injured area too early.',
      'A structured plan also reduces the risk of long-term stiffness and recurring pain.'
    ]
  },
  {
    id: 'mobility-recovery',
    category: 'Mobility',
    date: 'Tuesday - January 24 2026',
    title: 'The Path to Recovery: Evidence-Based Approaches in Modern Physiotherapy',
    excerpt: 'Modern mobility work combines assessment, manual care, and progressive exercise to restore functional movement.',
    image: 'Image.png',
    content: [
      'Mobility-focused therapy begins with identifying the real movement restriction, not just the painful symptom.',
      'Treatment can include guided stretching, neuromuscular re-education, and practical home strategies.',
      'The result is better movement quality and a stronger return to daily activity.'
    ]
  },
  {
    id: 'lasting-relief',
    category: 'Strength',
    date: 'Tuesday - January 24 2026',
    title: 'This Pain Is Temporary: Science-Backed Progressions for Lasting Relief',
    excerpt: 'Strength-based rehab builds tolerance, restores capacity, and creates durable improvements over time.',
    image: 'Image1.png',
    content: [
      'Pain relief is more reliable when exercises are progressed intentionally instead of randomly increased.',
      'Targeted strengthening helps patients tolerate daily loads with better control and less fear of movement.',
      'Over time, this improves performance and reduces the chance of reinjury.'
    ]
  }
]