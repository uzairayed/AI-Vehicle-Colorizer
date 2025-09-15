import type { ColorOption } from './types';

export const VEHICLE_COLORS: ColorOption[] = [
  { name: "Cherry Red", hex: "#C21807" },
  { name: "Midnight Black", hex: "#171717" },
  { name: "Electric Lime", hex: "#99f505" },
  { name: "Ocean Blue", hex: "#005f99" },
  { name: "Gunmetal Gray", hex: "#53565A" },
  { name: "Liquid Silver", hex: "#D6D6D6" },
  { name: "Racing Yellow", hex: "#FFD900" },
  { name: "Sunset Orange", hex: "#FD5E53" },
];

export const VEHICLE_FINISHES: { name: string; description: string }[] = [
    { name: 'Glossy', description: 'A shiny, reflective finish.' },
    { name: 'Matte', description: 'A non-reflective, flat finish.' },
    { name: 'Metallic', description: 'Contains small metal particles for a sparkling effect.' },
];
