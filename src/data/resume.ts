export const profile = {
  name: 'Shawn Salat',
  title: 'Software Engineer',
  email: 'shawn.salat+shawnsalat.com@gmail.com',
  site: 'https://shawnsalat.com',
  github: 'https://github.com/thinksalat',
  linkedin: 'https://www.linkedin.com/in/shawnsalat',
  professionalSummary: 'I’m a T-shaped software engineer focused on React and React Native. My depth is in frontend architecture and product experience, and I’m comfortable working across APIs, data, and deployment when the work calls for it.',
  personalSummary: 'Outside work, I’m usually taking photos with my Sony A7 II, listening to music, or playing video games.',
  summary: 'I’m a T-shaped software engineer focused on React and React Native. My depth is in frontend architecture and product experience, and I’m comfortable working across APIs, data, and deployment when the work calls for it. Outside work, I’m usually taking photos with my Sony A7 II, listening to music, or playing video games.',
};
export const skills = ['React', 'React Native', 'JavaScript', 'TypeScript', 'GraphQL', 'Redux', 'Node.js', 'Ruby on Rails', 'AWS', 'PostgreSQL', 'HTML', 'CSS'];
export const experience = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Duckbill AI',
    dates: 'September 2024 – July 2026',
    bullets: [
      'Led the migration of our calendaring and telephony platforms from Retool to a modern React monorepo, reaching feature parity plus new stakeholder requirements in two weeks and eliminating  ~$75K/year in platform savings.',
      'Designed an agentic development workflow spanning the legacy and new codebases, orchestrating collaborating coding agents to discover requirements, exchange context, and generate nearly the entire implementation.',
      'Rebuilt and redesigned an outdated browser extension using WXT into a core agent workspace, architecting a background-service façade and idempotent messaging layer to synchronize task context, notes, activity telemetry, and API state across ephemeral side panels, tabs, and windows.',
      "Pioneered and helped architect our generative UI system, evolving a text-only AI chat into a dynamic application surface where the model could invoke purpose-built interfaces through a custom DSL and tool calls.",
      "Built the system's first and many subsequent AI-driven experiences—including interactive maps and directions, rich recommendation carousels, contextual forms, artifacts, and UI for human-in-the-loop actions across phone, email, and calendar.",
    ],
  },
  { title: 'React Native Engineer', company: 'Uniform Teeth / Impress', dates: 'February 2022 – November 2022', bullets: ['Lead mobile app development efforts from design to release', 'Implement best practice engineering principles, greatly reducing engineering hours required for development', 'Serve as point of contact regarding mobile app development across departments', 'Interface with backend based on Go, GraphQL, Ruby on Rails, and PostgreSQL'] },
  { title: 'Senior Software Engineer', company: 'Trayt, Inc.', dates: 'October 2018 – November 2021', bullets: ['Architect and engineer front end solutions from ground up for both mobile app (iOS and Android) and desktop using React, React-Native, Redux, Material UI', 'Deploy backend, desktop site, and mobile app using EC2, S3, and CloudFront', 'Integrate frontend with backend, which runs on Node/Express and AWS including DynamoDB and S3'] },
  { title: 'Technical Support Analyst, Level 2', company: 'Pearson, Inc.', dates: 'October 2011 – August 2014', bullets: ['Performed quality assurance testing on new programs, resulting in less congestion during high intensity busy testing periods', 'Created in-depth, comprehensive training plan for new hires, many of which were temporary and went on to be offered full time positions and still work there today', 'Created ticketing system, knowledge base, and timecard tracking applications using Service-Now', 'Often closed most work tickets on team, 2nd point of contact on problem calls'] },
  { title: 'Account Executive', company: 'Yelp, Inc.', dates: 'April 2016 – April 2017', bullets: ['Drove all local advertising efforts for Yelp in assigned territories.', 'Utilized Salesforce extensively, including creating filters and reports, and managing 50+ pipelines of accounts.', 'Continually demonstrated tenacity, self-improvement, and implementation of feedback'] },
];
export const projects = [
  { name: 'Trendr', description: 'A social application built around discovering and sharing trends.', stack: ['React', 'Redux', 'Rails 5', 'PostgreSQL', 'AWS S3'], href: 'https://github.com/thinksalat/trendr' },
  { name: 'Music Link', description: 'A music-discovery project that visualizes and connects listening data.', stack: ['JavaScript', 'D3', 'Node.js', 'Express', 'OAuth 2'], href: 'https://github.com/thinksalat/musiclink' },
];
export const education = [
  { school: 'University of Iowa', credential: 'Bachelor of Science in Computer Science and Music; minor in Psychology', dates: 'August 2006 – May 2010' },
  { school: 'App Academy', credential: 'Full Stack Engineering Bootcamp', dates: 'April 2018 – July 2018' },
];
