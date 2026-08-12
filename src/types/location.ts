export interface Location {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hoursToday: string;
  hours: { day: string; time: string }[];
  services: ("recogida" | "delivery" | "terraza" | "qr")[];
  image: string;
  isFlagship?: boolean;
}
