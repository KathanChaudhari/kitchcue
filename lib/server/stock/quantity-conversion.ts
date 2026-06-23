const unitGroups = {
  weight: ["kg", "g"],
  volume: ["litre", "ml"],
  count: ["pcs"],
  pack: ["pack"],
  bottle: ["bottle"],
  box: ["box"],
} as const;

export function normalizeUnit(unit: string) {
  const normalized = unit.trim().toLowerCase();

  const aliases: Record<string, string> = {
    kilogram: "kg",
    kilograms: "kg",
    kilo: "kg",
    kilos: "kg",

    gram: "g",
    grams: "g",
    gm: "g",
    gms: "g",

    liter: "litre",
    liters: "litre",
    litre: "litre",
    litres: "litre",
    l: "litre",

    milliliter: "ml",
    milliliters: "ml",
    millilitre: "ml",
    millilitres: "ml",

    piece: "pcs",
    pieces: "pcs",
    pc: "pcs",
    pcs: "pcs",

    packet: "pack",
    packets: "pack",
    packs: "pack",

    bottles: "bottle",
    boxes: "box",
  };

  return aliases[normalized] ?? normalized;
}

function getUnitGroup(unit: string) {
  const normalizedUnit = normalizeUnit(unit);

  for (const [group, units] of Object.entries(unitGroups)) {
    if ((units as readonly string[]).includes(normalizedUnit)) {
      return group;
    }
  }

  return null;
}

export function areUnitsCompatible(existingUnit: string, incomingUnit: string) {
  const normalizedExisting = normalizeUnit(existingUnit);

  const normalizedIncoming = normalizeUnit(incomingUnit);

  if (normalizedExisting === normalizedIncoming) {
    return true;
  }

  const existingGroup = getUnitGroup(normalizedExisting);

  const incomingGroup = getUnitGroup(normalizedIncoming);

  return existingGroup !== null && existingGroup === incomingGroup;
}

export function convertQuantity(
  quantity: number,
  fromUnit: string,
  toUnit: string,
) {
  const from = normalizeUnit(fromUnit);
  const to = normalizeUnit(toUnit);

  if (from === to) {
    return quantity;
  }

  if (from === "g" && to === "kg") {
    return quantity / 1000;
  }

  if (from === "kg" && to === "g") {
    return quantity * 1000;
  }

  if (from === "ml" && to === "litre") {
    return quantity / 1000;
  }

  if (from === "litre" && to === "ml") {
    return quantity * 1000;
  }

  throw new Error(`Cannot convert ${fromUnit} to ${toUnit}.`);
}
