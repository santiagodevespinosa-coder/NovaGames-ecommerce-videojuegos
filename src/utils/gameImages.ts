// src/utils/gameImages.ts

const steamHeader = (appId: number) =>
  `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_hero.jpg`;

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

const TRAILER_ID_MAP: Record<string, string> = {
  'cyberpunk-2077': 'UnA7tepsc7s',
  'minecraft': 'XWb_G-yKkYA',
  'the-witcher-3-wild-hunt': 'hBoCRYX6Vq0',
  'elden-ring': 'K_03kFqWfqs',
  'baldurs-gate-3': '1_hXhnzUaVE',
  'portal-2': 'tax4e4hBBZc',
  'dark-souls-iii': 'QjY99zF3_to',
  'grand-theft-auto-v': 'hvoD7ehZPcM',
  'resident-evil-4-remake': 'jZ_zrFJdCIA',
  'apex-legends': 'vvB2wiDUDdA',
};

function normalizeSlug(texto: string): string {
  return texto
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Resolves a cover image URL for a game using its slug (or title fallback)
 * when the backend `juegos` row has `imagenUrl` set to null.
 */
export function getGameImageUrl(slug?: string, titulo?: string): string | undefined {
  if (slug && SLUG_IMAGE_MAP[slug]) {
    return SLUG_IMAGE_MAP[slug];
  }

  if (titulo) {
    const normalizedSlug = normalizeSlug(titulo);
    if (SLUG_IMAGE_MAP[normalizedSlug]) {
      return SLUG_IMAGE_MAP[normalizedSlug];
    }
  }

  return undefined;
}

/**
 * Resolves an embeddable YouTube trailer URL for a game by title/slug.
 */
export function getGameTrailerUrl(titulo?: string, slug?: string): string | undefined {
  const key = slug && TRAILER_ID_MAP[slug]
    ? slug
    : titulo
      ? normalizeSlug(titulo)
      : undefined;

  if (!key || !TRAILER_ID_MAP[key]) {
    return undefined;
  }

  return `https://www.youtube.com/embed/${TRAILER_ID_MAP[key]}?rel=0`;
}

/**
 * Converts a Steam landscape URL (`library_hero.jpg` / `header.jpg`) into Steam's
 * 600x900 portrait box art (`library_600x900_2x.jpg`) for vertical cards and pillars.
 */
export function getPortraitImageUrl(imagenUrl?: string): string | undefined {
  if (!imagenUrl) return undefined;
  return imagenUrl.replace(
    /\/(library_hero|header)\.jpg(\?.*)?$/,
    '/library_600x900_2x.jpg$2'
  );
}

/**
 * Calculates the final price of a game after applying its discount percentage.
 */
export function calcularPrecioFinal(precioBase: number, descuentoPorcentaje: number): number {
  const descuento = Math.max(0, Math.min(100, descuentoPorcentaje));
  return Number((precioBase * (1 - descuento / 100)).toFixed(2));
}
