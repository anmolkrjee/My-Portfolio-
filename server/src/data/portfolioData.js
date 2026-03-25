export const portfolioData = {
  owner: "anmol-kumar",
  hero: {
    name: "Anmol Kumar",
    role: "Data Analyst and MERN Developer",
    location: "Supaul, Bihar",
    email: "anmolkrjee1@gmail.com",
    phone: "9508542782",
    tagline:
      "I build data-driven applications, dashboards, and intelligent systems using Python, Power BI, and full-stack technologies to solve real-world problems.",
    availability: "Open to internships, freelance work, and collaborative student projects.",
    resumeUrl: "/assets/Anmol_Updated_CV.pdf",
    profileImage: "/assets/Anmol_111.jpeg",
    socialLinks: [
      {
        label: "GitHub",
        url: "https://github.com/anmolkrjee",
        icon: "github"
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/anmol100/",
        icon: "linkedin"
      },
      {
        label: "Resume",
        url: "/assets/Anmol_Updated_CV.pdf",
        icon: "file"
      }
    ],
    stats: [
      { label: "Projects Built", value: "4" },
      { label: "Certificates", value: "5" },
      { label: "Skill Set", value: "14+" }
    ]
  },
  about: {
    objective:
      "Results-driven Data Analyst with practical knowledge of Power BI, Advanced Excel, and Python for data analysis, visualization, and reporting. Possess basic front-end development skills using HTML, CSS, and JavaScript to support interactive data presentations. Seeking opportunities to gain industry exposure and contribute to data-driven decision-making processes.",
    intro:
      "My focus is on combining data thinking with product thinking. I enjoy taking a raw idea, shaping the data behind it, and presenting it through an interface that feels clear, interactive, and useful.",
    highlights: [
      {
        title: "Data-first mindset",
        description:
          "I use Python, Power BI, and Excel to analyze data, surface patterns, and communicate results."
      },
      {
        title: "Full-stack execution",
        description:
          "I can design React frontends, build Express APIs, and structure MongoDB collections for dynamic apps."
      },
      {
        title: "Practical learning",
        description:
          "Most of my projects come from solving real workflow and student productivity problems."
      },
      {
        title: "Interactive presentation",
        description:
          "I like turning technical work into portfolio experiences, dashboards, and interfaces that are easier to explore."
      }
    ]
  },
  skills: [
    {
      name: "JavaScript",
      category: "Frontend",
      level: 86,
      icon: "javascript",
      description: "ES6+, DOM work, async flows, and component-driven UI logic."
    },
    {
      name: "React",
      category: "Frontend",
      level: 84,
      icon: "react",
      description: "Interactive interfaces, reusable components, and API-driven state."
    },
    {
      name: "HTML5",
      category: "Frontend",
      level: 90,
      icon: "html5",
      description: "Semantic layout, accessibility basics, and content structure."
    },
    {
      name: "CSS3",
      category: "Frontend",
      level: 88,
      icon: "css3",
      description: "Responsive layouts, gradients, animations, and polished UI systems."
    },
    {
      name: "Node.js",
      category: "Backend",
      level: 78,
      icon: "node",
      description: "REST APIs, server-side logic, and app orchestration."
    },
    {
      name: "Express",
      category: "Backend",
      level: 80,
      icon: "server",
      description: "Middleware, route structure, and clean API organization."
    },
    {
      name: "MongoDB",
      category: "Backend",
      level: 76,
      icon: "database",
      description: "Flexible schemas, document modeling, and content-driven apps."
    },
    {
      name: "Python",
      category: "Data",
      level: 87,
      icon: "python",
      description: "Data analysis, ML experimentation, and automation."
    },
    {
      name: "Jupyter Notebook",
      category: "Data",
      level: 84,
      icon: "python",
      description: "Notebook-based data analysis, experimentation, and visualization."
    },
    {
      name: "Google Colab",
      category: "Data",
      level: 81,
      icon: "python",
      description: "Cloud-based Python notebook workflows for quick experiments and demos."
    },
    {
      name: "Spyder",
      category: "Data",
      level: 78,
      icon: "python",
      description: "Python IDE for data analysis, scripting, and debugging analytical code."
    },
    {
      name: "Power BI",
      category: "Data",
      level: 82,
      icon: "chart",
      description: "Dashboards, storytelling, and business-friendly reporting."
    },
    {
      name: "Excel",
      category: "Data",
      level: 85,
      icon: "sheet",
      description: "Data cleanup, lookup logic, summaries, and reporting workflows."
    },
    {
      name: "Java",
      category: "Programming",
      level: 79,
      icon: "java",
      description: "OOP fundamentals, DSA practice, and application development."
    },
    {
      name: "Git & GitHub",
      category: "Tools",
      level: 83,
      icon: "git",
      description: "Version control, branching, and project collaboration."
    },
    {
      name: "VS Code",
      category: "Tools",
      level: 86,
      icon: "git",
      description: "Primary code editor for frontend, backend, and data project workflows."
    },
    {
      name: "Cursor",
      category: "Tools",
      level: 76,
      icon: "git",
      description: "AI-assisted development workflow for faster prototyping and iteration."
    }
  ],
  projects: [
    {
      title: "Obesity Prediction Using Machine Learning",
      category: "ML",
      subtitle: "Prediction workflow with dashboard-oriented analysis",
      summary:
        "A machine learning system that predicts obesity levels using eating habits, physical activity, and lifestyle inputs, with a dashboard to compare model performance.",
      impact:
        "The project shows how predictive analytics and thoughtful presentation can make health-related insights easier to interpret.",
      image: "/assets/Obesity.png",
      featured: true,
      tags: [
        "Python",
        "Pandas",
        "NumPy",
        "Seaborn",
        "Scikit-learn",
        "Tkinter"
      ],
      metrics: [
        { label: "Focus", value: "Classification" },
        { label: "Interface", value: "Desktop Dashboard" },
        { label: "Outcome", value: "Risk Prediction" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/anmolkrjee/Obesity-prediction-using-ML",
          type: "code"
        }
      ]
    },
    {
      title: "Event Reminder System",
      category: "DSA",
      subtitle: "Desktop productivity tool for planned reminders",
      summary:
        "A Java-based event reminder system for scheduling birthdays, meetings, and recurring reminders with a friendly desktop interface.",
      impact:
        "This project focuses on practical usability, allowing users to organize important moments and avoid missed events.",
      image: "/assets/event.png",
      featured: false,
      tags: ["Java", "JavaFX", "Productivity", "Desktop App"],
      metrics: [
        { label: "Stack", value: "JavaFX" },
        { label: "Type", value: "Desktop Tool" },
        { label: "Use Case", value: "Personal Planning" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/anmolkrjee/Event-Reminder-System",
          type: "code"
        }
      ]
    },
    {
      title: "Task Management System",
      category: "MERN",
      subtitle: "Full-stack productivity dashboard for tracking daily work",
      summary:
        "A MERN-based task management system with authentication, task creation, deadline tracking, priority selection, and dashboard-based progress monitoring.",
      impact:
        "This project turns task planning into a cleaner workflow by helping users create, organize, and monitor tasks through a single responsive dashboard.",
      image: "/assets/Task-Management-system.png",
      featured: true,
      tags: ["MongoDB", "Express", "React", "Node.js", "Dashboard", "Authentication"],
      metrics: [
        { label: "Stack", value: "MERN" },
        { label: "Interface", value: "Task Dashboard" },
        { label: "Live Demo", value: "Vercel" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/MERN-PEP-2026/mern-test-anmolkrjee",
          type: "code"
        },
        {
          label: "Live Demo",
          url: "https://taskmanagement-eight-psi.vercel.app/",
          type: "demo"
        }
      ]
    },
    {
      title: "StreamTube",
      category: "MERN",
      subtitle: "React-based video browsing app powered by Google Cloud API data",
      summary:
        "A YouTube-style streaming interface built with React that fetches and displays video content using a Google Cloud API integration, with search, navigation, and responsive content cards.",
      impact:
        "This project demonstrates frontend-focused product building with real API-driven content, giving users a familiar streaming dashboard experience with live fetched video data.",
      image: "/assets/StreamTube.png",
      featured: false,
      tags: ["React", "Google Cloud API", "Search", "Streaming UI", "Responsive Design"],
      metrics: [
        { label: "Frontend", value: "React" },
        { label: "Data Source", value: "Google API" },
        { label: "Live Demo", value: "Vercel" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/anmolkrjee/Youtube-Clone",
          type: "code"
        },
        {
          label: "Live Demo",
          url: "https://youtube-clone-alpha-topaz.vercel.app/",
          type: "demo"
        }
      ]
    }
  ],
  certifications: [
    {
      title: "Programming in Java",
      issuer: "iamneo",
      image: "/assets/Java.png",
      issuedOn: "2025",
      credentialUrl:
        "https://www.linkedin.com/posts/anmol100_java-dataanalytics-certification-activity-7376217122198253568-XpOd?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEcU96sBXU91KfLF6zFrDv-f-9PUvrxeBZc",
      skills: ["Java"]
    },
    {
      title: "DSA using Java",
      issuer: "Gokboru",
      image: "/assets/DSA.png",
      issuedOn: "2025",
      credentialUrl:
        "https://www.linkedin.com/posts/anmol100_dataanalytics-dsa-java-activity-7376221909597949952-HtsR?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEcU96sBXU91KfLF6zFrDv-f-9PUvrxeBZc",
      skills: ["Java", "Data Structures", "Algorithms", "Problem Solving"]
    },
    {
      title: "Cloud Computing",
      issuer: "NPTEL",
      image: "/assets/Neptel.png",
      issuedOn: "2025",
      credentialUrl:
        "https://www.linkedin.com/posts/anmol100_proud-to-share-my-achievement-i-have-successfully-activity-7400600357258715136-N7MC?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEcU96sBXU91KfLF6zFrDv-f-9PUvrxeBZc",
      skills: ["Distributed Systems", "IaaS", "PaaS", "SaaS"]
    },
    {
      title: "Frontend Web Development",
      issuer: "FreeCodeCamp",
      image: "/assets/Web design.png",
      issuedOn: "2024",
      credentialUrl:
        "https://www.linkedin.com/posts/anmol100_freecodecamp-responsivewebdesign-webdevelopment-activity-7157062406353936384-e248?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEcU96sBXU91KfLF6zFrDv-f-9PUvrxeBZc",
      skills: ["HTML", "CSS"]
    },
    {
      title: "Python for Data Science",
      issuer: "Board Infinity",
      image: "/assets/Python.png",
      issuedOn: "2024",
      credentialUrl:
        "https://www.linkedin.com/posts/anmol100_1000-free-courses-with-free-certificates-activity-7157054400144764928-QeGf?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEcU96sBXU91KfLF6zFrDv-f-9PUvrxeBZc",
      skills: ["Python", "NumPy", "Pandas", "Data Visualization"]
    }
  ],
  education: [
    {
      title: "B.Tech in Computer Science",
      institution: "Lovely Professional University",
      period: "Aug 2023 - Present",
      score: "CGPA: 7.91",
      description:
        "Strengthening core skills in software development, programming, and data-driven problem solving.",
      coursework: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Object-Oriented Programming"
      ]
    },
    {
      title: "Intermediate",
      institution: "Jawahar Navodaya Vidyalaya, Gopalganj",
      period: "Apr 2021 - Mar 2022",
      score: "76.2%",
      description:
        "Built a solid academic base while sharpening analytical thinking and problem-solving skills."
    },
    {
      title: "Matric",
      institution: "Sanskar Bharti Global School, Madhubani",
      period: "Apr 2019 - Mar 2020",
      score: "92.8%",
      description:
        "Developed strong learning discipline and consistent academic performance across core subjects."
    }
  ],
  contact: {
    heading: "Let us build something useful",
    subheading:
      "Have an idea, internship opportunity, or collaboration in mind? Let’s build something meaningful together. Feel free to send me a message and I’ll get back to you soon.",
  }
};
