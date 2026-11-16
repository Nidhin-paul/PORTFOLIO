export const portfolioData = {
  personal: {
    name: "Nidhin Paulson",
    shortName: "NP",
    role: "MERN STACK",
    title: "Developer",
    bio: "I build modern, scalable and user-focused web applications using the MERN stack.",
    aboutHeading: "Turning ideas into real-world solutions.",
    aboutBio: "I'm Nidhin Paulson, a MERN Stack Developer based in Palakkad, Kerala. I enjoy building full-stack web applications that are fast, scalable and user-friendly. I'm always excited to learn new technologies and work on meaningful projects.",
    stats: [
      { value: "2+", label: "Projects Completed" },
      { value: "6+", label: "Months Experience" },
      { value: "100%", label: "Commitment" }
    ],
    email: "nidhinpaulsonv@gmail.com",
    linkedin: "https://www.linkedin.com/in/nidhin-paulson/",
    linkedinDisplay: "linkedin.com/in/nidhin-paulson",
    github: "https://github.com/nidhin-paul",
    githubDisplay: "github.com/nidhin-paul",
    location: "Palakkad, Kerala",
    profilePic: "/images/about.jpg",
    openToWork: true,
    statusText: "Open to new opportunities",
    quote: "Build Learn Create Repeat",
    passionTag: "Passionate Developer"
  },
  
  skills: [
    {
      id: "react",
      name: "React.js",
      category: "Frontend",
      color: "#00D8FE",
      bgLight: "rgba(0, 216, 254, 0.08)",
      level: "Advanced",
      experience: "1+ Years",
      iconType: "react"
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "Backend",
      color: "#22C55E",
      bgLight: "rgba(34, 197, 94, 0.08)",
      level: "Proficient",
      experience: "1+ Years",
      iconType: "node"
    },
    {
      id: "express",
      name: "Express.js",
      category: "Backend",
      color: "#1F2937",
      bgLight: "rgba(31, 41, 55, 0.08)",
      level: "Proficient",
      experience: "1+ Years",
      iconType: "express"
    },
    {
      id: "mongodb",
      name: "MongoDB",
      category: "Database",
      color: "#13AA52",
      bgLight: "rgba(19, 170, 82, 0.08)",
      level: "Proficient",
      experience: "1+ Years",
      iconType: "mongodb"
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Language",
      color: "#F7DF1E",
      bgLight: "rgba(247, 223, 30, 0.12)",
      level: "Advanced",
      experience: "2+ Years",
      iconType: "javascript"
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "Styling",
      color: "#38BDF8",
      bgLight: "rgba(56, 189, 248, 0.08)",
      level: "Advanced",
      experience: "1+ Years",
      iconType: "tailwind"
    },
    {
      id: "git",
      name: "Git & GitHub",
      category: "Version Control",
      color: "#F05032",
      bgLight: "rgba(240, 80, 50, 0.08)",
      level: "Proficient",
      experience: "2+ Years",
      iconType: "git"
    },
    {
      id: "postman",
      name: "Postman",
      category: "API Testing",
      color: "#FF6C37",
      bgLight: "rgba(255, 108, 55, 0.08)",
      level: "Proficient",
      experience: "1+ Years",
      iconType: "postman"
    }
  ],

  extendedSkills: [
    { name: "Redux Toolkit", category: "State Management", proficiency: "85%" },
    { name: "TypeScript", category: "Language", proficiency: "80%" },
    { name: "RESTful APIs", category: "Architecture", proficiency: "92%" },
    { name: "JWT & OAuth", category: "Security", proficiency: "88%" },
    { name: "Mongoose ODM", category: "Database", proficiency: "90%" },
    { name: "HTML5 & CSS3", category: "Frontend", proficiency: "95%" },
    { name: "Docker Basics", category: "DevOps", proficiency: "70%" },
    { name: "Vercel / Render", category: "Deployment", proficiency: "85%" }
  ],

  experience: [
    {
      id: "exp-1",
      period: "Apr 2026 - Present",
      company: "Dcoode",
      initial: "D",
      location: "Ottapalam, Kerala",
      role: "Full Stack Developer",
      isCurrent: true,
      badge: "Currently Working",
      link: "https://dcoode.com",
      points: [
        "Working on web applications using the MERN stack.",
        "Developing and maintaining scalable front-end and back-end features.",
        "Collaborating with the team to deliver client projects.",
        "Involved in requirement analysis, development, testing and deployment."
      ]
    },
    {
      id: "exp-2",
      period: "May 2025 - Mar 2026",
      company: "Softronics",
      initial: "S",
      location: "Palakkad, Kerala",
      role: "MERN Stack Developer Intern",
      isCurrent: false,
      badge: null,
      link: "https://softronics.in",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      points: [
        "Developed and maintained full-stack web applications using React.js, Node.js, Express.js and MongoDB.",
        "Worked on RESTful APIs and database integration.",
        "Built dynamic and responsive user interfaces.",
        "Collaborated with the team to deliver real-world projects."
      ]
    },
    {
      id: "exp-3",
      period: "Apr 2024 - Apr 2024",
      company: "Softroniics",
      initial: "S",
      location: "Palakkad, Kerala, India",
      role: "Summer Internship (Python)",
      isCurrent: false,
      originBadge: "ORIGIN POINT",
      badge: "Internship",
      link: "https://softroniics.in",
      skills: ["Python", "HTML5", "CSS3", "JavaScript", "Git"],
      points: [
        "Completed an intensive summer program focusing on full-stack Python web development.",
        "Built web application prototypes and interactive interfaces using Python, HTML, and CSS.",
        "Gained practical exposure to Git version control, documentation standards, and collaborative workflows."
      ]
    }
  ],

  projects: [
    {
      id: "emergency-contact-hub",
      number: "01",
      title: "Emergency Contact Hub",
      tagline: "A full-stack platform for emergency contact management with admin dashboard.",
      description: "A mission-critical contact and dispatch directory system designed for rapid access during emergencies. Features secure authentication, real-time alert broadcasting, role-based admin controls, and location-aware directory lookups.",
      tags: ["React", "Node.js", "MongoDB", "Express.js"],
      image: "/images/project-emergency.jpg",
      github: "https://github.com/nidhin-paul/emergency-contact-hub",
      demo: "https://emergency-hub.example.com",
      highlights: [
        "Role-based access control (Admin, Officer, Dispatcher)",
        "Instant broadcast system with SMS/Push alerts",
        "Optimized MongoDB indexing for low-latency queries",
        "Responsive emergency call panel designed for high stress usability"
      ]
    },
    {
      id: "expense-tracker",
      number: "02",
      title: "Expense Tracker",
      tagline: "Track income, expenses and get insights with charts and analytics.",
      description: "A smart personal finance and expenditure management application that helps users monitor spending habits, set monthly budgets, and visualize financial growth with interactive graphs.",
      tags: ["React", "Node.js", "MongoDB", "Chart.js"],
      image: "/images/project-expense.jpg",
      github: "https://github.com/nidhin-paul/expense-tracker-mern",
      demo: "https://expensetracker.example.com",
      highlights: [
        "Interactive monthly cash flow breakdown and category distribution",
        "Budget threshold warnings and anomaly spending alerts",
        "Exportable PDF and CSV financial summaries",
        "JWT-secured session management with persistent cookies"
      ]
    },
    {
      id: "vehicle-service-booking",
      number: "03",
      title: "Vehicle Service Booking",
      tagline: "Online vehicle service booking platform with user and admin panels.",
      description: "An intuitive automotive workshop booking management portal. Enables vehicle owners to choose customized maintenance packages, pick real-time calendar slots, and track workshop service statuses.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      image: "/images/project-vehicle.jpg",
      github: "https://github.com/nidhin-paul/vehicle-service-booking",
      demo: "https://vehicleservice.example.com",
      highlights: [
        "Real-time calendar slot availability and instant booking confirmation",
        "Automated service progress tracker (Inspection, Repair, Wash, Ready)",
        "Admin control panel for bay assignment and mechanic scheduling",
        "Mobile-first responsive design for quick on-the-go reservations"
      ]
    }
  ]
};
