/**
 * Configurable brand identity. Change these values to re-skin the whole
 * site for a different brand name, taglines or color story without
 * touching component code.
 */
export const brand = {
  name: "BUCLE",
  descriptor: "DONUTS + COFFEE",
  tagline: "ENTRA EN EL BUCLE.",
  taglineShort: "Entra en el bucle.",
  slogans: [
    "Uno lleva a otro.",
    "Entra en el bucle.",
    "Gira. Muerde. Repite.",
    "No salgas del bucle.",
  ],
  mascotName: "Cero",
  colors: {
    grape: "#35134F",
    lime: "#CBFF3D",
    cream: "#FFF3DD",
    strawberry: "#FF586B",
    cocoa: "#22130F",
  },
  studioCredit: "Diseñado por Takumi Studio",
  studioUrl: "https://www.takumistudio.es",
  projectLabel: "Proyecto conceptual",
} as const;
