export const featuredProject = {
  statusText: "Completed",
  titleLines: ["User Management", "System"],
  description:
    "A fully functional full-stack CRUD web application for managing users — built with a Java Spring Boot REST API backend, React frontend, and MySQL database. Supports create, read, update, and delete operations with clean UI and real-time API integration.",
  stackLabel: "Tech Stack",
  tech: ["Java", "Spring Boot", "React", "MySQL", "REST API", "Postman", "Git"],
  githubUrl: "https://github.com/hasheel18/FullStack-Application.git",

  // visual/mock content (kept same as your HTML)
  mock: {
    urlText: "localhost:3000/users",
    appTitle: "User Management App",
    addBtnText: "+ Add User",
    tableHead: ["Name", "Username", "Email", "Status"],
    rows: [
      {
        name: "Alex Chen",
        username: "alex_c",
        email: "alex@dev.io",
        status: "Active",
        avatarGradient: "linear-gradient(135deg,#6c63ff,#00e5ff)",
      },
      {
        name: "Sam Rivera",
        username: "sam_r",
        email: "sam@dev.io",
        status: "Active",
        avatarGradient: "linear-gradient(135deg,#ff4d8d,#ff9800)",
      },
      {
        name: "Morgan Lee",
        username: "morgan_l",
        email: "morgan@dev.io",
        status: "Active",
        avatarGradient: "linear-gradient(135deg,#39ff14,#00e5ff)",
      },
    ],
  },
};

export const inProgressProjects = [
  {
    statusText: "In Progress",
    number: "02",
    title: "Flight Radar Application ✈️",
    description: "Building a real-time Flight Radar app using an API for live aircraft tracking. Stay tuned.",
    progressPercent: 50,
    tags: ["JavaScript"],
    isPlaceholder: false,
  },
  {
    isPlaceholder: true,
    placeholderText: "Coming Soon...\nStay Tuned!",
  },
];