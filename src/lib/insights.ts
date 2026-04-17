export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "what-makes-a-site-feel-refined",
    title: "What makes a website feel refined",
    excerpt:
      "A meditation on texture, motion and the tiny details that separate good from unforgettable.",
    date: "2026-03-12",
    readingTime: "4 min",
    body: [
      "Great websites don't shout. They unfold. There is a rhythm to the way type enters, to the way a hero breathes, to the way a cursor finds its partner on the page.",
      "At Aureo, we chase that rhythm. We believe the best digital work feels inevitable — as if the screen were always meant to look and move this way.",
      "This post is a short field guide: the principles we use when we ask ourselves, does this feel refined yet?",
    ],
  },
  {
    slug: "the-case-for-immersive-marketing-sites",
    title: "The case for immersive marketing sites",
    excerpt:
      "Why the modern brand story demands more than a static landing page.",
    date: "2026-02-02",
    readingTime: "6 min",
    body: [
      "A marketing site is no longer a brochure. It is the first product experience — and often the most important one.",
      "Immersive sites don't mean heavy sites. With WebGL, modern animation libraries and careful engineering, we can build experiences that are both lightweight and unforgettable.",
    ],
  },
];
