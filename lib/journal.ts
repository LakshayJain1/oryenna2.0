export type JournalPost = {
    slug: string;
    title: string;
    category: string;
    readTime: string;
    excerpt: string;
    image: string;
    volume?: string;
    seo?: {
        title?: string;
        description?: string;
    };
};

export const journalPosts: JournalPost[] = [
    {
        slug: "the-art-of-slowing-down",
        title: "The Art of Slowing Down: Why Scent Reclaims Our Sense of Time",
        category: "Rituals of Stillness",
        readTime: "8 min read",
        excerpt:
            "In an era governed by urgency and relentless screens, the quiet ignition of an unhurried flame establishes a deliberate boundary between outer noise and inner sanctuary.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAAXNj-EsF4NPyIxAI9kVASakhnDKYevtuO0nN-LOoRLvVaccMQCJUGH1sH-NvxE9IWH_i7Gf78M_aECJnP4vNXZklaoiHwcudHTdW6Fw8AemBtKGQ3rhahkuLRRjxgltrKcJqHSiPJ_HDtFyaTeNTDLvuF2VI419_kblI0WXwqlfTT08JrucBvTltO9FSaD0jBRghlJCJ1dL72ZwDMSpdgxhJdTcpgm7KAtQ-djcnVU-Y2GDsvbLQhgQ",
        volume: "Volume IX",
    },
    {
        slug: "how-scent-shapes-atmospheric-memory",
        title: "How Scent Shapes Atmospheric Memory",
        category: "Olfactory Architecture",
        readTime: "6 min read",
        excerpt:
            "Macreating botanical absolutes for 28 days yields top notes that linger softly rather than assault the senses.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDNKaqsFBSppN7ckPYixJgUJF-FyGyJwHBMmLM5rFUaSceB4RK9daq5gugJGIGsvGMY7lk30qD3lW49aztDPC7rMDhwVc-vBMh8mN1s9kypECTRGiiU5Zjl8wios77WT4lAe2-resmVna9IKDuLEsYNna_nUceGPe1VRPZjOVTnKbAq6AHEH3b85afghpNfZkhSgCAz708WQhfNqg6bzuIn0Hr1ZzDrq-QP8YF1WzCZGLTH6qmCC6cAag",
    },
    {
        slug: "geometry-of-honed-travertine",
        title: "The Geometry of Honed Travertine & Mouth-Blown Glass",
        category: "Atelier Craft",
        readTime: "5 min read",
        excerpt:
            "Every vessel is designed to be repurposed as an art object long after the final pool of botanical wax has settled.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDmr_nYNl3lslOx1Ejnr0eDO6ZHCeihKjb4fTOsRsF1WCNW9OHm9E6JKXyS6AFC04OJr0ni8a6VQCEmf0RIwZ5BKZQMPBiV2Wjwk2GRPXHEm6zV1uZtGRMw2bzKYcbF9xSDXlImcBSS6yuGlM8Skbt6c6RpeRM35tvetNhZmmtHzgeffFJ2LzEhl2Tx42c6PvAnx43RWi7JAV87namWrVQZ5vS_emxiw0c2lDx3vjjEUi4g7Gedih-1Yg",
    },
    {
        slug: "evening-extinction",
        title: "The Evening Extinction: Turning Down The World",
        category: "Rituals of Stillness",
        readTime: "7 min read",
        excerpt:
            "Why extinguishing a candle with a solid brass snuffer rather than blowing it preserves the sacred calm.",
        image:
            "https://lh3.googleusercontent.com/aida/AEtjO1UOUT85bjpk1jljwtXmFWw-jh3MU0cLkOhMitEuxvjKO-2jPce04-awQ6LP01mM-gzZ91krxeqZDjhhWSi_7vXH9ZE56sfqNdE650K1bGPPqbqYWEWeaMPhmncMmwgKpKWsca30IDR8Oha4Bgz2xe-prey07GdDKMolL2fJMXs-TQLE3MiPVx-un7zSi3W75iLYe2uZphVoQtxUUmYnKa5Kz_NrmEEqn2-v3a2DbGsScHYxC_yJs7nAeeCv",
    },
];

export const getPostBySlug = (slug: string) =>
    journalPosts.find((p) => p.slug === slug);