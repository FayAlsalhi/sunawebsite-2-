export type Project = {
  slug: string;
  tag: string;
  title: string;
  src: string;
  year: string;
  client: string;
  description: string;
  gallery: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "velocity",
    tag: "تصوير مناسبات",
    title: "زواجات",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1400&auto=format&fit=crop",
    year: "2025",
    client: "مناسبات خاصة",
    description:
      "تغطية بصرية كاملة لمناسبات الزواج — من التخطيط للمشهد إلى التصوير والمونتاج — بأسلوب يوثّق اللحظة ويمنحها حضورًا يليق بها.",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "the-perfect-frame",
    tag: "تصوير بورتريه",
    title: "بورتريه",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop",
    year: "2025",
    client: "جلسات شخصية",
    description:
      "جلسات بورتريه احترافية تُبرز شخصية كل وجه، بإضاءة مدروسة ومعالجة لونية تمنح الصورة عمقًا وحضورًا.",
    gallery: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481887328591-3e277f9473dc?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "spreading-the-word",
    tag: "تصوير منتجات",
    title: "منتجات",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop",
    year: "2024",
    client: "علامات تجارية",
    description:
      "تصوير منتجات بأسلوب مصمّم للمنصات الرقمية، يبرز تفاصيل المنتج ويعكس هوية العلامة ويمنح محتواها حضورًا أقوى.",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    slug: "fresh-beginnings",
    tag: "هوية بصرية",
    title: "بدايات جديدة",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    year: "2024",
    client: "مشروع ناشئ",
    description:
      "بناء هوية بصرية متكاملة — من الشعار والألوان إلى التطبيقات — صُمّمت لإطلاق علامة جديدة بثقة وحضور واضح.",
    gallery: [
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1400&auto=format&fit=crop",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
