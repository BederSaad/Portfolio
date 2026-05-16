// src/projects.js
export const projectsData = {
  pizza: {
    title: "La Bella Pizza",
    badge: "💻 Web Design",
    desc: "Site web moderne pour une pizzeria italienne. Menu interactif avec animations fluides, galerie de plats en HD, système de commande en ligne et design responsive premium. Chaque élément pensé pour augmenter les conversions et offrir une expérience mémorable.",
    tech: ["HTML5", "CSS3", "JavaScript", "CSS Animations", "Responsive Design"],
    github: "https://github.com/bedersaad/pizza-website",
    live:   "https://pizza.bedersaad.dev",
    // Replace with your actual screenshots — use placeholder URLs for now
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=900&auto=format&fit=crop",
    ]
  },
  coffee: {
    title: "Café Arôme",
    badge: "💻 Web Design",
    desc: "Site élégant et immersif pour un café artisanal. Design chaleureux avec galerie produits animée, carte des boissons interactive, section réservation et parallax storytelling pour transmettre l'atmosphère unique du lieu.",
    tech: ["HTML5", "CSS3", "JavaScript", "Parallax", "CSS Grid"],
    github: "https://github.com/bedersaad/coffee-website",
    live:   "https://coffee.bedersaad.dev",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&auto=format&fit=crop",
    ]
  },
  // Add your other projects here with same structure
  cti: {
    title: "CTI & SOC Platform",
    badge: "🔐 Cybersécurité",
    desc: "Plateforme CTI & SOC d'envergure entreprise pour le secteur bancaire. Infrastructure multi-zones pfSense, orchestration SIEM/SOAR, moteur hybride Règles+ML pour la priorisation des menaces, dashboard de visualisation et documentation d'audit complète.",
    tech: ["pfSense", "SIEM", "SOAR", "MITRE ATT&CK", "Python", "n8n", "ML"],
    github: "https://github.com/bedersaad/cti-platform",
    live:   "#",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop",
    ]
  }
}
