import type { Locale } from "@/i18n/routing";

/**
 * Portfolio projects. To add a project:
 *  1. Put an image in /public/placeholders (or /public/projects), ideally 1200×800 .webp
 *  2. Add an entry below. Text is bilingual inline so each project lives in one place.
 */
export type ProjectCategory = "vr" | "ar" | "game" | "simulation";

type Localized = Record<Locale, string>;

export type Project = {
  slug: string;
  category: ProjectCategory;
  image: string;
  title: Localized;
  description: Localized;
  tags: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    slug: "virtual-chemistry-lab",
    category: "vr",
    image: "/placeholders/project-chemistry-lab.webp",
    title: { en: "Virtual Chemistry Lab", ar: "مختبر الكيمياء الافتراضي" },
    description: {
      en: "A safe VR lab where Grade 9–12 students run 20+ curriculum experiments, from titration to flame tests.",
      ar: "مختبر واقع افتراضي آمن يُجري فيه طلبة الصفوف 9–12 أكثر من 20 تجربة منهجية، من المعايرة إلى اختبار اللهب.",
    },
    tags: { en: ["VR", "Science", "Meta Quest"], ar: ["واقع افتراضي", "علوم", "Meta Quest"] },
  },
  {
    slug: "petra-through-time",
    category: "vr",
    image: "/placeholders/project-petra.webp",
    title: { en: "Petra Through Time", ar: "البتراء عبر الزمن" },
    description: {
      en: "A virtual field trip through the Nabataean city, letting students explore Petra as it looked 2,000 years ago.",
      ar: "رحلة ميدانية افتراضية في المدينة النبطية، يستكشف فيها الطلبة البتراء كما كانت قبل 2000 عام.",
    },
    tags: { en: ["VR", "History", "Heritage"], ar: ["واقع افتراضي", "تاريخ", "تراث"] },
  },
  {
    slug: "anatomy-ar",
    category: "ar",
    image: "/placeholders/project-anatomy.webp",
    title: { en: "Anatomy AR", ar: "التشريح بالواقع المعزّز" },
    description: {
      en: "Interactive 3D organs and body systems on a tablet, helping first-year medical students study anatomy layer by layer.",
      ar: "أعضاء وأجهزة جسم تفاعلية ثلاثية الأبعاد على الجهاز اللوحي، تساعد طلبة الطب في سنتهم الأولى على دراسة التشريح طبقة تلو الأخرى.",
    },
    tags: { en: ["AR", "Medicine", "University"], ar: ["واقع معزّز", "طب", "جامعات"] },
  },
  {
    slug: "arabic-letters-quest",
    category: "game",
    image: "/placeholders/project-arabic-letters.webp",
    title: { en: "Arabic Letters Quest", ar: "مغامرة الحروف العربية" },
    description: {
      en: "An adventure game for early graders that builds Arabic reading and phonics skills through play, with a teacher dashboard.",
      ar: "لعبة مغامرات لطلبة الصفوف الأولى تنمّي مهارات القراءة والصوتيات العربية باللعب، مع لوحة متابعة للمعلّم.",
    },
    tags: { en: ["Game", "Literacy", "Web & Mobile"], ar: ["لعبة", "قراءة", "ويب وجوّال"] },
  },
  {
    slug: "fire-safety-simulator",
    category: "simulation",
    image: "/placeholders/project-fire-safety.webp",
    title: { en: "Fire Safety Simulator", ar: "محاكي السلامة من الحرائق" },
    description: {
      en: "A VR training simulation for evacuation drills and extinguisher use, with scenario scoring for safety officers.",
      ar: "محاكاة تدريبية بالواقع الافتراضي لتمارين الإخلاء واستخدام الطفايات، مع تقييم للأداء لضباط السلامة.",
    },
    tags: { en: ["Simulation", "Safety", "Corporate"], ar: ["محاكاة", "سلامة", "شركات"] },
  },
  {
    slug: "solar-system-explorer",
    category: "ar",
    image: "/placeholders/project-solar-system.webp",
    title: { en: "Solar System Explorer", ar: "مستكشف المجموعة الشمسية" },
    description: {
      en: "Place the planets in your classroom with AR and compare their sizes, orbits and seasons in real scale.",
      ar: "ضع الكواكب داخل صفّك بالواقع المعزّز وقارن أحجامها ومداراتها وفصولها بمقياس حقيقي.",
    },
    tags: { en: ["AR", "Science", "Schools"], ar: ["واقع معزّز", "علوم", "مدارس"] },
  },
];
