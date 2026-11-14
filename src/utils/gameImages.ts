// src/utils/gameImages.ts

const steamHeader = (appId: number) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`;

const SLUG_IMAGE_MAP: Record<string, string> = {
  'cyberpunk-2077': '/images/imagenes-juegos/imagen_cyberpunk_2077.webp',
  'minecraft': '/images/imagenes-juegos/imagen_minecraft.webp',
  'the-witcher-3-wild-hunt': '/images/imagenes-juegos/imagen_the_witcher_3_wild_hunt.webp',
  'half-life-2': steamHeader(220),
  'elden-ring': steamHeader(1245620),
  'baldurs-gate-3': steamHeader(1086940),
  'portal-2': steamHeader(620),
  'dark-souls-iii': steamHeader(374320),
  'grand-theft-auto-v': steamHeader(271590),
  'resident-evil-4-remake': steamHeader(2050650),
  'apex-legends': steamHeader(1172470),
};

/**
 * Resolves a cover image URL for a game using its slug (or title fallback)
 * when the backend `juegos` row has `imagenUrl` set to null.
 */
export function getGameImageUrl(slug?: string, titulo?: string): string | undefined {
  if (slug && SLUG_IMAGE_MAP[slug]) {
    return SLUG_IMAGE_MAP[slug];
  }

  if (titulo) {
    const normalizedSlug = titulo
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    if (SLUG_IMAGE_MAP[normalizedSlug]) {
      return SLUG_IMAGE_MAP[normalizedSlug];
    }
  }

  return undefined;
}

/**
 * Calculates the final price of a game after applying its discount percentage.
 */
export function calcularPrecioFinal(precioBase: number, descuentoPorcentaje: number): number {
  const descuento = Math.max(0, Math.min(100, descuentoPorcentaje));
  return Number((precioBase * (1 - descuento / 100)).toFixed(2));
}
