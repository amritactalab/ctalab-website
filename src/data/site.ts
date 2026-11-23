export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  areaSlug: string;
  tags: string[];
  icon: "shield" | "alert" | "heart" | "scale" | "sparkles" | "mind";
}

export interface CourseItem {
  title: string;
  school: string;
  instructor: string;
  imageKey: "text-analytics" | "biomedical-informatics" | "python-for-biologists";
  description: string;
  topics: string[];
}

export interface JoinTrack {
  title: string;
  audience: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  pi: string;
  institution: string;
  university: string;
  campus: string;
  url: string;
  description: string;
  about: string[];
  pipelineText: string;
  mission: string;
  vision: string;
  pillars: { title: string; body: string }[];
  email: string;
  piEmail: string;
  address: string[];
  mapQuery: string;
  social: {
    scholar?: string;
    orcid?: string;
    github?: string;
    linkedin?: string;
    facultyPage?: string;
  };
  nav: NavItem[];
  projects: ProjectItem[];
  courses: CourseItem[];
  joinTracks: JoinTrack[];
}

export const site: SiteConfig = {
  name: "Amrita Computational Text Analysis Lab",
  shortName: "AmritaCTALab",
  tagline: "Language Intelligence for Social Good",
  pi: "Dr. Anoop V. S.",
  institution: "School of Computing",
  university: "Amrita Vishwa Vidyapeetham",
  campus: "Amritapuri, Kollam, Kerala, India",
  url: "https://amritactalab.github.io/ctalab-website",
  description:
    "An applied research and innovation laboratory dedicated to computational text analysis, natural language processing, and language intelligence for social good — spanning online safety, health information, disaster response, legal accessibility, and Indian languages.",
  about: [
    "Amrita Computational Text Analysis Lab (AmritaCTALab) is an applied research and innovation laboratory at the School of Computing, Amrita Vishwa Vidyapeetham, Amritapuri. We explore how Artificial Intelligence, Natural Language Processing, and computational text analysis can address real-world societal challenges — from online safety and health information to climate change, civic engagement, education, and language accessibility.",
    "We develop datasets, interpretable computational methods, AI models, and intelligent applications that understand, analyze, and generate human language in meaningful ways. Beyond benchmarks and publications, we transform research into working prototypes, collaborate with domain stakeholders, and focus strongly on low-resource, multilingual, and Indian language settings.",
  ],
  pipelineText:
    "Societal Problem → Language Data → Research → Intelligent Systems → Applications → Deployment → Impact",
  mission:
    "To build language technologies that make information more accessible, society more informed, and the voices of communities more visible.",
  vision:
    "To conduct rigorous applied research and develop deployable AI and NLP solutions that address meaningful societal challenges and create measurable social impact.",
  pillars: [
    {
      title: "Research",
      body: "We investigate new computational text methods, datasets, semantic models, and evaluation frameworks in NLP, AI, and Language Intelligence.",
    },
    {
      title: "Build",
      body: "We transform research into prototypes, platforms, open tools, and intelligent applications that address real-world societal challenges.",
    },
    {
      title: "Impact",
      body: "We collaborate with communities, institutions, and global partners to deploy language technologies that create measurable social value.",
    },
  ],
  email: "amritactalab@gmail.com",
  piEmail: "anoopvs@am.amrita.edu",
  address: [
    "Amrita Computational Text Analysis Lab (AmritaCTALab)",
    "Department of Computer Science and Engineering",
    "School of Computing, Amrita Vishwa Vidyapeetham",
    "Amritapuri, Kollam, Kerala 690525, India",
  ],
  mapQuery:
    "Amrita Vishwa Vidyapeetham Amritapuri Campus, Kollam, Kerala, India",
  social: {
    github: "https://github.com/amritactalab",
    scholar: "https://scholar.google.com/citations?user=66ddfXYAAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0001-6673-6932",
    linkedin: "https://www.linkedin.com/in/anoopvs/",
    facultyPage: "https://www.amrita.edu/faculty/anoop-v-s/",
  },
  nav: [
    { label: "People", href: "/people" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Teaching", href: "/teaching" },
    { label: "Contact", href: "/contact" },
  ],
  projects: [
    {
      id: "safe-inclusive-internet",
      title: "Safer & Inclusive Internet",
      tagline: "Language Intelligence for a safer, inclusive internet.",
      description:
        "Detecting online harm, analyzing public discourse, and building multilingual content-understanding systems that foster safer digital spaces across Indian and global languages.",
      areaSlug: "social-nlp",
      tags: ["SocialNLP", "Online Safety", "Multilingual"],
      icon: "shield",
    },
    {
      id: "disaster-response",
      title: "Intelligent Disaster Response",
      tagline: "Intelligent systems for safer disaster response.",
      description:
        "Real-time crisis text mining, situational awareness extraction, and automated decision-support pipelines that turn unstructured social and field reports into actionable emergency intelligence.",
      areaSlug: "social-nlp",
      tags: ["Crisis Informatics", "Real-Time NLP", "Civic AI"],
      icon: "alert",
    },
    {
      id: "healthcare-decisions",
      title: "Healthcare Decision Support",
      tagline: "Language Intelligence to support healthcare decisions.",
      description:
        "Fine-tuned biomedical language models, clinical information extraction (such as OralMedIE), and semantic medical retrieval systems designed to assist clinicians and patients.",
      areaSlug: "health-nlp",
      tags: ["Biomedical NLP", "Clinical IE", "Health AI"],
      icon: "heart",
    },
    {
      id: "legal-intelligence",
      title: "Accessible Legal Intelligence",
      tagline: "Legal Intelligence for accessible and equitable justice.",
      description:
        "Domain-adapted large language models and LoRA fine-tuning for Indian legal corpora to demystify legal documents, assist legal research, and improve access to justice.",
      areaSlug: "legal-responsible-ai",
      tags: ["Legal AI", "Indian Law", "LLM Adaptation"],
      icon: "scale",
    },
    {
      id: "ethical-responsible-ai",
      title: "Ethical & Responsible AI",
      tagline: "Ethical and responsible AI systems.",
      description:
        "Interpretable semantic text kernels, explainable graph-embedding sentiment models, and transparent evaluation frameworks that keep language systems accountable and trustworthy.",
      areaSlug: "legal-responsible-ai",
      tags: ["Interpretability", "Explainable AI", "Trust"],
      icon: "sparkles",
    },
    {
      id: "mental-health-wellbeing",
      title: "Mental Health & Well-being",
      tagline: "Language Intelligence for Mental Health and Well-being.",
      description:
        "Compassionate, privacy-aware NLP methods studying social discourse and linguistic signals to understand mental health trends and support community well-being.",
      areaSlug: "health-nlp",
      tags: ["Mental Health NLP", "Social Discourse", "Well-being"],
      icon: "mind",
    },
  ],
  courses: [
    {
      title: "Text Analytics",
      school: "School of Computing",
      instructor: "Dr. Anoop V. S.",
      imageKey: "text-analytics",
      description:
        "Core computational methods to analyze unstructured text, extract structured insights, and discover latent patterns across modern document collections and social corpora.",
      topics: [
        "Sentiment Analysis",
        "Topic Modeling",
        "Information Extraction",
        "Named Entity Recognition",
        "Text Summarization",
        "Text Classification",
      ],
    },
    {
      title: "Introduction to Biomedical Informatics",
      school: "School of Computing",
      instructor: "Dr. Anoop V. S.",
      imageKey: "biomedical-informatics",
      description:
        "Bridging computing and healthcare through electronic health records, biomedical text and data analytics, clinical decision support, and genomics informatics.",
      topics: [
        "Electronic Health Records (EHR)",
        "Health Data Analytics",
        "Clinical Decision Support",
        "Drug & Treatment Informatics",
        "Bioinformatics & Genomics",
      ],
    },
    {
      title: "Introduction to Python for Biologists",
      school: "School of Biotechnology",
      instructor: "Dr. Anoop V. S.",
      imageKey: "python-for-biologists",
      description:
        "Hands-on Python programming tailored for life-science researchers — covering biological data handling, bioinformatics workflows, visualization, and real biological case studies.",
      topics: [
        "Python Programming Basics",
        "Biological Data Handling",
        "Genomic & Protein Analysis",
        "Ecological & Microscopy Data",
        "Biological Data Visualization",
      ],
    },
  ],
  joinTracks: [
    {
      title: "Research Interns",
      audience: "B.Tech. & M.Tech. Students",
      description:
        "Work directly on active NLP, Indic language, semantic analytics, and applied LLM projects with mentorship toward peer-reviewed publications and open prototypes.",
    },
    {
      title: "Ph.D. Scholars",
      audience: "Doctoral Candidates",
      description:
        "Pursue deep, impactful doctoral research in Computational Text Analysis, SocialNLP, IndicNLP, or Responsible Language Intelligence at Amrita Vishwa Vidyapeetham.",
    },
    {
      title: "Postdocs & Visiting Researchers",
      audience: "Early-Career Scientists",
      description:
        "Co-lead interdisciplinary grants, mentor research interns, and develop deployable language systems alongside international collaborators.",
    },
    {
      title: "Collaborators & Partners",
      audience: "Academia, Industry & Social Sector",
      description:
        "Partner with our lab on joint publications, domain datasets, healthcare/legal/civic pilots, and real-world deployment of language technologies.",
    },
  ],
};
