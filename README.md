# 🧪 Química Quest UNIZAR (30004) — Plataforma Web Interactiva

Aplicación web gamificada (estilo *Duolingo* con mapa de 8 Biomas y personaje animado) diseñada a medida para la asignatura **Química (30004)** de los Grados de Ingeniería Industrial de la **Universidad de Zaragoza (UNIZAR)**.

## 🚀 Cómo abrir y usar la Web

1. **En tu ordenador (sin instalar nada):**
   Haz doble clic directamente sobre el archivo [`index.html`](./index.html). Se abrirá en cualquier navegador moderno (Chrome, Edge, Firefox, Safari) y guardará el progreso automáticamente en el navegador (`localStorage`).
2. **Para enviársela a tu alumna:**
   Puedes comprimir la carpeta `web_quimica` en un archivo `.zip` y pasársela por WhatsApp/correo, o subir la carpeta tal cual a **GitHub Pages / Netlify / Vercel** gratis arrastrándola en 10 segundos.

## 📂 Estructura de la Carpeta `web_quimica/`

```text
web_quimica/
├── index.html              # Punto de entrada principal (abrir con doble clic)
├── README.md               # Guía rápida de uso y estructura
├── assets/                 # Ilustraciones estilo videojuego generadas por IA
│   ├── world_map_bg.jpg    # Mapa general de biomas y fondo principal
│   ├── biome_world_1.jpg   # Isla Esmeralda (Alcanos)
│   ├── biome_world_2.jpg   # Cañón Eléctrico (Alquenos/Alquinos)
│   ├── biome_world_3.jpg   # Acrópolis Aromática (Bencenos/Halógenos)
│   ├── biome_world_4.jpg   # Oasis Cristalino (Alcoholes/Fenoles/Éteres)
│   ├── biome_world_5.jpg   # Volcán del Carbonilo (Aldehídos/Cetonas/Ácidos/Ésteres)
│   ├── biome_world_6.jpg   # Santuario Astral (Aminas/Nitrilos/Amidas)
│   ├── biome_world_7.jpg   # Cumbres Glaciares (Prioridad IUPAC Polifuncional)
│   └── biome_world_8.jpg   # Coliseo Dorado (Jefe Final - Nivel Examen)
├── css/
│   └── styles.css          # Diseño visual de los 8 Biomas, tarjetas 3D y responsive
└── js/
    ├── audio.js            # Efectos de sonido sintetizados por Web Audio API (sin archivos externos)
    ├── chem_renderer.js    # Motor gráfico vectorial 2D SVG (cadenas, cis/trans y bencenos de Kekulé a 120°)
    ├── worlds_data.js      # Configuración de los 8 Mundos (Biomas), 26 Niveles y Tabla de Prioridad UNIZAR
    ├── questions_data.js   # Banco de 322 ejercicios bidireccionales (Estructura ↔ Nombre)
    └── app.js              # Lógica de desbloqueo progresivo, movimiento del avatar, vidas y Laboratorio de Errores
```

## 🌍 Los 8 Mundos (Biomas) Incluidos

1. **Mundo 1 (Bosque Esmeralda):** Alcanos lineales/ramificados, radicales (*iso*, *sec*, *terc*) y cicloalcanos.
2. **Mundo 2 (Cañón Turquesa):** Alquenos, alquinos, isomería geométrica (*cis*/*trans*) y eninos.
3. **Mundo 3 (Ciudadela Púrpura):** Bencenos monosustituidos, disustituidos (*orto*, *meta*, *para*), polisustituidos y derivados halogenados.
4. **Mundo 4 (Bahía Zafiro):** Alcoholes, polioles, fenoles y éteres (nomenclatura por radicales y alcoxi).
5. **Mundo 5 (Volcán Ámbar):** Aldehídos (`-al` / `-carbaldehído`), cetonas (`-ona`), ácidos carboxílicos (`-oico`) y ésteres (`-oato de ... -ilo`).
6. **Mundo 6 (Laboratorio Neón):** Aminas ($1^{\text{a}}, 2^{\text{a}}, 3^{\text{a}}$ con localizador $N-$), nitrilos/cianuros, nitroderivados y amidas.
7. **Mundo 7 (Cumbre Estelar):** Compuestos polifuncionales y aplicación de la **Tabla Oficial de Prioridad UNIZAR**.
8. **Mundo 8 (Coliseo Dorado UNIZAR — Nivel Examen):** Simulacro final con todos los bloques mezclados sin pistas temáticas.
