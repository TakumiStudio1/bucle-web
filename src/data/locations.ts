import type { Location } from "@/types/location";

export const locations: Location[] = [
  {
    id: "alameda-sevilla",
    name: "BUCLE Alameda — Sevilla",
    city: "Sevilla",
    address: "Alameda de Hércules 1 (ubicación de demostración)",
    phone: "+34 900 000 001",
    hoursToday: "Hoy · 09:00–21:30",
    hours: [
      { day: "Lunes a jueves", time: "08:30 – 21:00" },
      { day: "Viernes y sábado", time: "09:00 – 23:00" },
      { day: "Domingo", time: "09:00 – 21:30" },
    ],
    services: ["recogida", "delivery", "terraza", "qr"],
    image: "/images/storefront.jpg",
    isFlagship: true,
  },
  {
    id: "soho-malaga",
    name: "BUCLE Soho — Málaga",
    city: "Málaga",
    address: "Calle Tomás Heredia 8 (ubicación de demostración)",
    phone: "+34 900 000 002",
    hoursToday: "Hoy · 08:30–21:00",
    hours: [
      { day: "Lunes a jueves", time: "08:00 – 20:30" },
      { day: "Viernes y sábado", time: "08:30 – 22:30" },
      { day: "Domingo", time: "09:00 – 20:00" },
    ],
    services: ["recogida", "delivery", "qr"],
    image: "/images/interior.jpg",
  },
  {
    id: "malasana-madrid",
    name: "BUCLE Malasaña — Madrid",
    city: "Madrid",
    address: "Calle del Pez 14 (ubicación de demostración)",
    phone: "+34 900 000 003",
    hoursToday: "Hoy · 08:00–22:00",
    hours: [
      { day: "Lunes a jueves", time: "08:00 – 21:30" },
      { day: "Viernes y sábado", time: "08:00 – 23:30" },
      { day: "Domingo", time: "09:00 – 22:00" },
    ],
    services: ["recogida", "delivery", "terraza"],
    image: "/images/delivery-scooter.jpg",
  },
];
