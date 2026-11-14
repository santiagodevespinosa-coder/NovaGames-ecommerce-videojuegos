// src/components/juegos/RequisitosSistema.tsx

export function RequisitosSistema() {
  return (
    <div className="bg-bg-tarjeta p-[30px] rounded-2xl border border-borde">
      <h3 className="m-0 mb-4 text-lg text-texto-principal border-b border-borde pb-2.5">
        Requerimientos del Sistema (PC)
      </h3>
      <div className="grid grid-cols-2 gap-5 text-[13px] text-texto-secundario leading-relaxed">
        <div>
          <strong className="text-texto-principal block mb-1.5">Mínimos:</strong>
          • SO: Windows 10 de 64 bits<br />
          • Procesador: Core i5-3570K o FX-8310<br />
          • Memoria RAM: 8 GB<br />
          • Gráficos: GTX 780 o RX 470<br />
          • Almacenamiento: 70 GB disponibles
        </div>
        <div>
          <strong className="text-texto-principal block mb-1.5">Recomendados:</strong>
          • SO: Windows 10/11 de 64 bits<br />
          • Procesador: Core i7-4790 o Ryzen 3 3200G<br />
          • Memoria RAM: 12 GB<br />
          • Gráficos: GTX 1060 o R9 Fury<br />
          • Almacenamiento: 70 GB SSD
        </div>
      </div>
    </div>
  );
}
