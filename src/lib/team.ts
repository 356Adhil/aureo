export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Founding Team",
    role: "Direction & Strategy",
    bio: "A small team of designers, engineers and marketers obsessed with craft.",
  },
  {
    name: "Design",
    role: "Identity & Interface",
    bio: "Typography-first thinking, systems that scale, details that sing.",
  },
  {
    name: "Engineering",
    role: "Web, App & Software",
    bio: "Next.js, React Native, Node — built for performance and evolution.",
  },
  {
    name: "Motion & Video",
    role: "Film & After Effects",
    bio: "Frame-perfect edits and brand films with intent.",
  },
];
