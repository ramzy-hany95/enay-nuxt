export type ServiceItem = {
  id: string
  title: string
  shortDescription: string
  image: string
  overview: string[]
  audience: string[]
  outcomes: string[]
  duration: string
  durationNote: string
}

export const serviceItems: ServiceItem[] = [
  {
    id: 'neuro-rehabilitation-therapy',
    title: 'Neuro-rehabilitation therapy',
    shortDescription: 'Joint pain, arthritis, and musculoskeletal injuries treated with precision care.',
    image: 'background-paint.png',
    overview: [
      'Our neuro-rehabilitation programs focus on restoring communication between the nervous system and the body through guided clinical care.',
      'Treatment blends targeted movement, functional training, and patient-specific progression to improve control and daily performance.',
      'Each program is adapted to the individual diagnosis, symptom profile, and long-term recovery goals.'
    ],
    audience: [
      'Chronic back and neck pain sufferers',
      'Individuals with complex regional pain',
      'Fibromyalgia patients',
      'Post-COVID fatigue and pain'
    ],
    outcomes: [
      'Significant reduction in pain levels',
      'Improved daily function and quality of life',
      'Reduced medication dependency',
      'Empowered self-management strategies'
    ],
    duration: '6 - 24 sessions depending on injury severity',
    durationNote: 'Duration estimates are based on average patient outcomes. Your clinical team will provide an individualized timeline following your initial evaluation.'
  },
  {
    id: 'robotic-exoskeleton-rehabilitation',
    title: 'Robotic exoskeleton rehabilitation',
    shortDescription: 'Elite-level injury recovery and movement optimization for competitive athletes.',
    image: 'Container.png',
    overview: [
      'This service uses advanced rehabilitation systems to support movement repetition, gait confidence, and structured progression.',
      'It is especially helpful for patients who need precise assistance during mobility retraining and high-support therapy sessions.'
    ],
    audience: ['Post-surgical mobility cases', 'Neurological rehabilitation cases', 'Athletes rebuilding mechanics', 'Patients needing gait assistance'],
    outcomes: ['Better movement consistency', 'Improved walking mechanics', 'Higher therapy confidence', 'Measurable functional gains'],
    duration: '8 - 20 sessions based on progression rate',
    durationNote: 'The frequency depends on the level of support required and how quickly the patient tolerates increased workload.'
  },
  {
    id: 'occupational-therapy',
    title: 'Occupational Therapy',
    shortDescription: 'Accelerated healing and functional restoration following orthopaedic procedures.',
    image: 'WithFallback.png',
    overview: [
      'Occupational therapy focuses on restoring independence in daily activities, work-related tasks, and practical movement needs.',
      'Sessions target function first, with structured strategies that help patients safely return to real life demands.'
    ],
    audience: ['Post-operative patients', 'Upper limb recovery cases', 'Adults returning to work', 'Patients rebuilding fine motor control'],
    outcomes: ['Improved task performance', 'Better upper limb function', 'Higher daily independence', 'Safer return to work'],
    duration: '6 - 16 sessions depending on goals',
    durationNote: 'Programs are shaped around the patient’s environment, responsibilities, and pace of recovery.'
  },
  {
    id: 'orthopaedic-and-spine-rehabilitation',
    title: 'Orthopaedic and spine rehabilitation',
    shortDescription: 'Intervention for persistent pain conditions through neurological reconditioning.',
    image: 'Headenglish.png',
    overview: [
      'We use structured strengthening, posture correction, and mobility restoration to improve spinal and joint mechanics.',
      'This service is designed for both persistent discomfort and post-injury recovery.'
    ],
    audience: ['Neck pain patients', 'Low back pain patients', 'Posture-related dysfunction', 'Disc and spine recovery'],
    outcomes: ['Less stiffness and pain', 'Improved posture control', 'Better load tolerance', 'More stable movement patterns'],
    duration: '6 - 18 sessions depending on presentation',
    durationNote: 'Your plan is adjusted as pain sensitivity, tolerance, and movement quality improve.'
  },
  {
    id: 'women-health-care',
    title: 'Women health care',
    shortDescription: 'Specialized movement therapy for women, pelvic health, and neurological conditions.',
    image: 'photo.png',
    overview: [
      'Women-focused care combines strength, mobility, and restorative therapy with privacy and individualized clinical attention.',
      'Programs are designed around specific life stages, health history, and comfort needs.'
    ],
    audience: ['Pelvic health patients', 'Pre and post-natal support', 'Postural fatigue cases', 'Women seeking strength recovery'],
    outcomes: ['Better pelvic support', 'Less discomfort in daily activity', 'Improved core control', 'More confidence in movement'],
    duration: '5 - 14 sessions depending on symptoms',
    durationNote: 'Treatment frequency is matched to symptom severity and response to exercise progression.'
  },
  {
    id: 'pediatric-rehabilitation',
    title: 'Pediatric rehabilitation',
    shortDescription: 'Discrete, specialized care for pediatric floor dysfunction and women’s health.',
    image: 'Section1.png',
    overview: [
      'Pediatric rehabilitation supports development, balance, coordination, and functional movement in a child-friendly environment.',
      'Care plans are built with the child and family together to encourage steady progress and confidence.'
    ],
    audience: ['Children with coordination challenges', 'Balance and movement delay cases', 'Neuromotor development support', 'Family-centered recovery plans'],
    outcomes: ['Stronger balance and control', 'Better movement confidence', 'Functional developmental progress', 'Improved participation in daily life'],
    duration: '6 - 20 sessions depending on age and goals',
    durationNote: 'Your clinician adjusts the timeline according to engagement, tolerance, and developmental targets.'
  },
  {
    id: 'sensory-integration',
    title: 'Sensory integration',
    shortDescription: 'Supportive therapy programs that improve response, coordination, and body awareness.',
    image: 'Image.png',
    overview: [
      'Sensory integration therapy helps children better process movement, touch, balance, and environmental input.',
      'Sessions are designed to improve confidence, coordination, and comfort with everyday activity.'
    ],
    audience: ['Children with sensory sensitivity', 'Balance response challenges', 'Attention and coordination issues', 'Developmental support cases'],
    outcomes: ['Improved regulation', 'Better movement planning', 'Higher participation confidence', 'More organized motor responses'],
    duration: '8 - 18 sessions depending on assessment',
    durationNote: 'Frequency is based on the child’s sensory profile, family goals, and response to structured therapy.'
  },
  {
    id: 'communication-and-skill-development',
    title: 'Communication and skill development',
    shortDescription: 'Programs that strengthen interaction, confidence, and functional learning routines.',
    image: 'Image1.png',
    overview: [
      'This service supports practical development through guided interaction, therapist-led exercises, and parent-informed strategies.',
      'The goal is to improve participation, communication, and confidence within daily environments.'
    ],
    audience: ['Developmental support cases', 'Children needing interaction skills', 'Family-guided learning support', 'Functional communication development'],
    outcomes: ['More confident engagement', 'Better communication routines', 'Improved social participation', 'Stronger everyday skill carryover'],
    duration: '6 - 16 sessions depending on focus area',
    durationNote: 'Programs are reviewed regularly to keep goals aligned with practical progress.'
  },
  {
    id: 'behavior-modification',
    title: 'Behavior modification',
    shortDescription: 'Supportive, structured plans that improve consistency, emotional regulation, and daily routines.',
    image: 'Container.png',
    overview: [
      'Behavior modification plans are designed to create healthier routines, clearer responses, and better self-regulation.',
      'The service is collaborative, practical, and adapted to home and school demands where relevant.'
    ],
    audience: ['Routine regulation challenges', 'Children needing behavioral structure', 'Family-guided support plans', 'Goal-based developmental care'],
    outcomes: ['Clearer daily routines', 'Improved self-regulation', 'Better consistency in behavior', 'Stronger parent confidence'],
    duration: '5 - 14 sessions based on goals',
    durationNote: 'Timelines vary according to environmental factors, carryover, and the consistency of practice.'
  },
  {
    id: 'clinical-and-sports-nutrition',
    title: 'Clinical and sports Nutrition',
    shortDescription: 'Nutrition strategies to support recovery, performance, tissue repair, and long-term wellness.',
    image: 'background-paint.png',
    overview: [
      'Our nutrition service helps patients and athletes align recovery goals with evidence-based food and supplementation strategies.',
      'Plans are designed to improve energy, healing, training output, and long-term sustainability.'
    ],
    audience: ['Athletes in recovery', 'Patients needing healing support', 'Weight and performance cases', 'Long-term wellness planning'],
    outcomes: ['Better recovery support', 'Improved energy consistency', 'Smarter performance fueling', 'More sustainable nutrition habits'],
    duration: '3 - 10 consultations depending on goals',
    durationNote: 'Your plan may include short follow-ups or longer-term monitoring depending on the target outcome.'
  }
]