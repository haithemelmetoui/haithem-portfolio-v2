// Single source of truth for portfolio content.
// Everything here is taken from Haithem's CVs (EN/FR), LinkedIn profile and public GitHub repos.

const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Haithem El-Metoui",
  role: "Software Engineer · Java Backend Developer",
  headline: "Java & Spring Boot engineer building backend systems for banks.",
  intro:
    "4+ years delivering microservices for corporate and retail banking platforms in Tunisia, integrating Backbase, Keycloak, T24 core banking and ActiveMQ. Certified Kubernetes Administrator.",
  location: "Tunis, Tunisia",
  availability: "Open to remote roles and international relocation",
  email: "elmetoui.haithem@gmail.com",
  linkedin: "https://www.linkedin.com/in/haithem-el-metoui-1ab068224/",
  github: "https://github.com/haithemelmetoui",
  cv: {
    en: `${base}cv/Haithem-El-Metoui-CV-EN.pdf`,
    fr: `${base}cv/Haithem-El-Metoui-CV-FR.pdf`,
  },
  focus: ["Java", "Spring Boot", "Microservices", "Backbase", "Keycloak", "Banking & Fintech", "Kubernetes"],
};

export const about = [
  "I'm a backend-focused Java engineer working on enterprise banking software used by corporate clients. Most of my day is Spring Boot microservices: designing APIs, wiring services together in a distributed architecture, and integrating the systems a bank actually runs on: Keycloak for identity, T24 for core banking and Backbase for digital banking.",
  "I care about reliability and secure integrations. At Value Digital Services I built asynchronous notification flows on ActiveMQ for the MyBIAT Corporate platform; before that I worked on Zitouna Bank's trade-finance and digital-onboarding (KYC) applications.",
  "On the DevOps side I'm a Certified Kubernetes Administrator (91/100) and contribute to CI/CD pipelines with Jenkins, GitLab and OpenShift. I'm now looking for an international role where I can keep building high-impact backend systems.",
];

export const stats = [
  { value: "4+", label: "years building Java backends" },
  { value: "2", label: "banks served: BIAT and Zitouna" },
  { value: "91/100", label: "CKA exam score" },
];

export const experience = [
  {
    company: "Value Digital Services",
    role: "Full Stack Java Developer, backend focus",
    period: "Dec 2023 — Present",
    place: "Tunis, Tunisia · Hybrid",
    client: "BIAT · MyBIAT Corporate",
    summary:
      "Backend services for MyBIAT Corporate, BIAT's corporate banking platform serving enterprise clients.",
    points: [
      "Develop and maintain backend APIs in a microservices architecture with Spring Boot.",
      "Designed and implemented asynchronous notification systems on ActiveMQ for reliable, real-time alerts to enterprise users.",
      "Integrate enterprise systems: Keycloak (authentication), T24 (core banking) and Backbase.",
      "Ensure reliable communication between microservices in a distributed architecture.",
      "Contribute to CI/CD pipelines and deployments with Jenkins and OpenShift; Agile/Scrum with bi-weekly sprints and client demos.",
    ],
    note: "Part of the team behind MyBIAT, named Product of the Year 2026 (digital banking app category).",
    stack: ["Spring Boot", "Backbase", "Keycloak", "T24", "ActiveMQ", "Angular", "Jenkins", "OpenShift", "Docker", "Kubernetes", "SonarQube", "Nexus", "Bitbucket"],
  },
  {
    company: "Majda Smart Solutions",
    role: "Full Stack Java Developer",
    period: "Jun 2022 — Dec 2023",
    place: "Tunis, Tunisia",
    client: "Zitouna Bank · TRADE & E-KYC",
    summary:
      "Two banking applications for Zitouna Bank: trade finance (TRADE) and digital client onboarding (KYC).",
    points: [
      "TRADE: money transfers, domiciliation and management of ongoing commercial transactions.",
      "Integrated ActiveMQ and T24 core banking APIs with the applications.",
      "KYC: implemented the prospect journey through to becoming a Zitouna client, with authentication and authorization on Spring Security.",
      "Integrated certification and electronic signature with SIRAT Shadoc Tunisia.",
      "Contributed to build and deployment with GitLab CI/CD in two-week Scrum sprints.",
    ],
    stack: ["Spring Boot", "Spring Security", "Angular", "PostgreSQL", "MongoDB", "T24", "ActiveMQ", "Docker", "Kubernetes", "SonarQube", "GitLab"],
  },
  {
    company: "IPACT Consult",
    role: "End-of-study intern, Full Stack Java Developer",
    period: "Nov 2021 — Jun 2022",
    place: "Tunis, Tunisia",
    summary: "Microservices-based e-learning platform.",
    points: [
      "Built authentication, cart, online payment and course modules.",
      "Configured the API Gateway and Eureka service discovery.",
      "Secured services with JWT and OAuth2.",
      "Set up Jenkins pipelines (Groovy) to build and publish Docker images.",
    ],
    stack: ["Spring Boot", "Spring Security", "JWT", "OAuth2", "Eureka", "Angular", "MongoDB", "Docker", "Jenkins", "Nexus"],
  },
  {
    company: "Computer Center of the Ministry of Finance (CIMF)",
    role: "Engineering intern, Full Stack Java Developer",
    period: "Jul 2021 — Sep 2021",
    place: "Tunis, Tunisia",
    summary: "Centralized management of public companies' financial documents.",
    points: [
      "Built the application from scratch with Spring Boot and Angular.",
      "Secured it with Spring Security and JWT; built dashboards for data visualization.",
    ],
    stack: ["Spring Boot", "Spring Security", "JWT", "Angular", "MySQL"],
  },
];

export const skills = [
  {
    group: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "Microservices", "JWT", "OAuth2 / OpenID Connect", "API Gateway", "Eureka", "Maven"],
  },
  {
    group: "Banking platforms & integration",
    items: ["Backbase", "Keycloak (IAM)", "T24 core banking", "ActiveMQ messaging", "Asynchronous notifications", "SIRAT Shadoc e-signature"],
  },
  {
    group: "DevOps & cloud",
    items: ["Kubernetes (CKA)", "Docker", "OpenShift", "Jenkins", "GitLab CI/CD", "SonarQube", "Nexus"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "MSSQL"],
  },
  {
    group: "Frontend",
    items: ["Angular", "TypeScript", "React"],
  },
  {
    group: "Testing & tools",
    items: ["JUnit", "Mockito", "Postman", "Git", "Bitbucket", "Jira", "Confluence", "Linux", "Shell"],
  },
];

export const projects = [
  {
    name: "MyBIAT Corporate",
    org: "BIAT · via Value Digital Services",
    image: `${base}projects/mybiat.webp`,
    text: "Corporate banking platform for BIAT's enterprise clients. I work on backend microservices, ActiveMQ-based notifications and integrations with Keycloak, T24 and Backbase.",
    tags: ["Spring Boot", "Backbase", "Keycloak", "T24", "ActiveMQ", "OpenShift"],
  },
  {
    name: "TRADE",
    org: "Zitouna Bank · via Majda Smart Solutions",
    image: `${base}projects/trade.webp`,
    text: "Trade-finance application for money transfers, domiciliation and tracking ongoing commercial transactions, integrated with T24 and ActiveMQ.",
    tags: ["Spring Boot", "Angular", "T24", "ActiveMQ", "GitLab CI"],
  },
  {
    name: "E-KYC",
    org: "Zitouna Bank · via Majda Smart Solutions",
    image: `${base}projects/ekyc.webp`,
    text: "Digital onboarding: the prospect journey to becoming a client, Spring Security authentication, T24 APIs and electronic signature with SIRAT Shadoc.",
    tags: ["Spring Boot", "Spring Security", "PostgreSQL", "T24", "E-signature"],
  },
  {
    name: "basestack",
    org: "Open source",
    link: "https://github.com/haithemelmetoui/basestack",
    text: "Spring Boot 3 / Java 21 resource server secured by Keycloak: JWT validation against a realm's JWKS and a custom converter mapping Keycloak client roles to Spring authorities.",
    tags: ["Java 21", "Spring Boot 3", "OAuth2 Resource Server", "Keycloak"],
  },
  {
    name: "E-learning microservices",
    org: "IPACT Consult · internship",
    text: "Microservices platform with authentication, cart, payment and course services behind an API Gateway with Eureka discovery and Jenkins-built Docker images.",
    tags: ["Spring Cloud", "JWT", "OAuth2", "Docker", "Jenkins"],
  },
  {
    name: "AI-Summarize",
    org: "Side project",
    link: "https://github.com/haithemelmetoui/AI-Summarize",
    text: "React app that summarizes articles from a URL through a summarization API, with Redux Toolkit Query caching and history.",
    tags: ["React", "Vite", "Tailwind", "RTK Query"],
  },
];

export const certifications = [
  {
    name: "CKA: Certified Kubernetes Administrator",
    issuer: "The Linux Foundation",
    date: "2023",
    detail: "Score 91/100 · Credential ID LF-l87yz1tqcu",
  },
  {
    name: "Keycloak certification",
    issuer: "Sponsored by Value Digital Services",
    date: "Dec 2025",
    detail: "Identity & access management, OAuth2 / OpenID Connect",
  },
  {
    name: "Master Java Unit Testing with Spring Boot and Mockito",
    issuer: "Packt · Coursera",
    date: "Dec 2025",
    detail: "JUnit, Mockito and Spring Boot testing",
  },
];

export const education = [
  {
    degree: "Engineering degree in Computer Engineering",
    school: "ESPRIT, Private Higher School of Engineering and Technology",
    place: "Tunis, Tunisia",
    period: "2019 — 2022",
    detail: "Graduated with honors · EUR-ACE accredited program",
  },
  {
    degree: "Applied License in Networks and Telecommunications",
    school: "ISTIC, Higher Institute of Information and Communication Technologies of Borj Cedria",
    place: "Tunis, Tunisia",
    period: "2016 — 2019",
    detail: "Graduated with honors",
  },
];

export const languages = [
  { name: "Arabic", level: "Native", value: 1 },
  { name: "French", level: "Fluent, professional", value: 0.9 },
  { name: "English", level: "Professional", value: 0.8 },
];

// Shown in the "stack.yml" terminal (Technology stack section)
export const stackYaml = [
  ["language", ["Java 21", "TypeScript"]],
  ["framework", ["Spring Boot", "Spring Security", "Spring Cloud (Gateway, Eureka)", "Angular"]],
  ["banking", ["Backbase", "T24", "Keycloak"]],
  ["messaging", ["ActiveMQ"]],
  ["data", ["PostgreSQL", "MongoDB", "MySQL", "MSSQL"]],
  ["platform", ["Kubernetes", "OpenShift", "Docker"]],
  ["ci_cd", ["Jenkins", "GitLab CI", "SonarQube", "Nexus"]],
  ["testing", ["JUnit", "Mockito", "Postman"]],
];

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
