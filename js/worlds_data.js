/**
 * DATOS DE LOS MUNDOS (BIOMAS), NIVELES, AVATARES Y APUNTES DE LA MOCHILA
 * 100% adaptado al temario de Química (30004) - Ingeniería Industrial UNIZAR
 */

window.WorldsData = (function () {

    const avatars = [
        {
            id: 'scientista',
            name: 'Dra. Sofía',
            role: 'Química Analítica',
            emoji: '👩‍🔬',
            color: '#0284c7',
            bg: '#e0f2fe',
            desc: 'Especialista en cadenas carbonadas y anillos aromáticos.'
        },
        {
            id: 'cat',
            name: 'Michi Dalton',
            role: 'Gato Alquimista',
            emoji: '🐱‍👓',
            color: '#d97706',
            bg: '#fef3c7',
            desc: 'Tiene 7 vidas y un olfato infalible para los ésteres.'
        },
        {
            id: 'robot',
            name: 'QuimiBot 3000',
            role: 'IA de Laboratorio',
            emoji: '🤖',
            color: '#4f46e5',
            bg: '#e0e7ff',
            desc: 'Calcula localizadores IUPAC a velocidad cuántica.'
        },
        {
            id: 'explorer',
            name: 'Elena Benceno',
            role: 'Exploradora de Biomas',
            emoji: '🦊',
            color: '#059669',
            bg: '#d1fae5',
            desc: 'Domina todos los biomas orgánicos sin perder ni una vida.'
        },
        {
            id: 'wizard',
            name: 'Merlín Covalente',
            role: 'Mago de Enlaces',
            emoji: '🧙‍♂️',
            color: '#9333ea',
            bg: '#f3e8ff',
            desc: 'Transforma alcoholes en éteres y ácidos en amidas.'
        },
        {
            id: 'dragon',
            name: 'Pyro Carboxilo',
            role: 'Guardián de Prioridad',
            emoji: '🐲',
            color: '#e11d48',
            bg: '#ffe4e6',
            desc: 'El ácido carboxílico siempre es su número 1.'
        }
    ];

    const priorityTable = [
        { rank: 1, group: 'Ácidos Carboxílicos', formula: '-COOH', suffix: 'ácido ...-oico', prefix: 'carboxi-', example: 'ácido propanoico' },
        { rank: 2, group: 'Ésteres', formula: '-COO-R', suffix: '...-oato de ...-ilo', prefix: 'alcoxicarbonil-', example: 'etanoato de metilo' },
        { rank: 3, group: 'Amidas Primarias', formula: '-CONH2', suffix: '...-amida', prefix: 'carbamoil-', example: 'etanamida (acetamida)' },
        { rank: 4, group: 'Nitrilos / Cianuros', formula: '-C≡N', suffix: '...-nitrilo / cianuro de ...', prefix: 'ciano-', example: 'propanonitrilo' },
        { rank: 5, group: 'Aldehídos', formula: '-CHO', suffix: '...-al', prefix: 'oxo- / formil-', example: 'butanal' },
        { rank: 6, group: 'Cetonas', formula: '-CO-', suffix: '...-ona', prefix: 'oxo-', example: '2-pentanona' },
        { rank: 7, group: 'Alcoholes y Fenoles', formula: '-OH', suffix: '...-ol', prefix: 'hidroxi-', example: '2-butanol / fenol' },
        { rank: 8, group: 'Aminas', formula: '-NH2 / -NHR', suffix: '...-amina', prefix: 'amino-', example: 'propilamina / N-metil...' },
        { rank: 9, group: 'Éteres', formula: '-O-', suffix: '... ... éter / alcoxi-...', prefix: 'alcoxi- (metoxi, etoxi)', example: 'dietiléter / etoxietano' },
        { rank: 10, group: 'Alquenos y Alquinos', formula: 'C=C / C≡C', suffix: '...-eno / ...-ino', prefix: 'alquenil / alquinil', example: '1-penten-4-ino' },
        { rank: 11, group: 'Halógenos y Nitro', formula: '-F, -Cl, -Br, -I, -NO2', suffix: '(Siempre prefijos)', prefix: 'cloro-, bromo-, nitro-', example: '2-clorobutano / nitrobenceno' },
        { rank: 12, group: 'Alcanos y Radicales', formula: '-R (C-C)', suffix: '...-ano', prefix: 'metil-, etil-, isopropil-', example: '3-metilheptano' }
    ];

    const worlds = [
        {
            id: 1,
            title: 'Mundo 1: Isla Tropical de los Alcanos',
            subtitle: 'Hidrocarburos Saturados y Cicloalcanos',
            biomeName: 'Isla Esmeralda',
            biomeIcon: '🌴',
            theme: {
                bgGradient: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)',
                cardBg: '#ecfdf5',
                borderColor: '#10b981',
                accentColor: '#047857',
                pathColor: '#fbbf24',
                decorations: ['🌴', '🏝️', '🦜', '🌺', '🐚']
            },
            tutorialRef: 'Tutorial 2 de Orgánica (Págs. 14–16 PDF)',
            notes: {
                summary: 'Los alcanos solo contienen enlaces sencillos carbono-carbono (C–C) y terminan en "-ano".',
                rules: [
                    'Busca siempre la cadena continua de carbonos MÁS LARGA.',
                    'Numera por el extremo que dé los números (localizadores) más bajos a las ramificaciones.',
                    'Nombra los radicales por ORDEN ALFABÉTICO (etil antes que metil).',
                    'Los prefijos multiplicadores (di-, tri-, tetra-) NO cuentan para el orden alfabético, pero "iso-" y "ciclo-" SÍ cuentan.',
                    'Radicales clave: isopropil (-CH(CH3)2), isobutil (-CH2-CH(CH3)2) y terc-butil (-C(CH3)3).'
                ]
            },
            levels: [
                { id: '1-1', num: 1, title: 'Alcanos Lineales y Ramificados I', sub: 'Metil, etil y propil', x: 22, y: 72 },
                { id: '1-2', num: 2, title: 'Radicales Especiales II', sub: 'Isopropil, isobutil y terc-butil', x: 50, y: 48 },
                { id: '1-3', num: 3, title: 'Cicloalcanos de la Isla', sub: 'Ciclopentano y ciclohexano', x: 78, y: 28 }
            ]
        },
        {
            id: 2,
            title: 'Mundo 2: Cañón Eléctrico Insaturado',
            subtitle: 'Alquenos, Alquinos, Dienos e Isomería cis/trans',
            biomeName: 'Cañón de Neón',
            biomeIcon: '⚡',
            theme: {
                bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 55%, #06b6d4 100%)',
                cardBg: '#eef2ff',
                borderColor: '#6366f1',
                accentColor: '#3730a3',
                pathColor: '#22d3ee',
                decorations: ['⚡', '🔮', '💎', '🌩️', '✨']
            },
            tutorialRef: 'Tutorial 3 de Orgánica (Págs. 16–17 PDF)',
            notes: {
                summary: 'Los alquenos tienen doble enlace (=, sufijo "-eno") y los alquinos triple enlace (≡, sufijo "-ino").',
                rules: [
                    'La cadena principal DEBE contener todos los dobles y triples enlaces posibles, aunque no sea la más larga.',
                    'Se empieza a numerar por el extremo que dé los localizadores más bajos a los enlaces múltiples.',
                    'Si una molécula tiene doble y triple enlace (en-ino) y hay EMPATE en los extremos, el DOBLE enlace tiene prioridad para llevar el número 1.',
                    'Isomería geométrica: "cis-" cuando los dos grupos principales están al MISMO lado del plano del doble enlace; "trans-" cuando están en lados OPUESTOS.'
                ]
            },
            levels: [
                { id: '2-1', num: 1, title: 'Alquenos y Polienos', sub: 'Dobles enlaces y dienos', x: 25, y: 70 },
                { id: '2-2', num: 2, title: 'Alquinos y Duelo En-ino', sub: 'Triples enlaces y empates', x: 52, y: 46 },
                { id: '2-3', num: 3, title: 'El Espejo Cis / Trans', sub: 'Isomería geométrica espacial', x: 78, y: 25 }
            ]
        },
        {
            id: 3,
            title: 'Mundo 3: Acrópolis Aromática y Halógenos',
            subtitle: 'Bencenos, Orto/Meta/Para y Derivados Halogenados',
            biomeName: 'Templo Hexagonal',
            biomeIcon: '🏛️',
            theme: {
                bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 55%, #f59e0b 100%)',
                cardBg: '#fffbeb',
                borderColor: '#f59e0b',
                accentColor: '#92400e',
                pathColor: '#fde68a',
                decorations: ['🏛️', '🏺', '☀️', 'オリーブ', '🛡️']
            },
            tutorialRef: 'Tutorial 4 de Orgánica (Págs. 18–19 PDF)',
            notes: {
                summary: 'El benceno (C6H6) es un anillo hexagonal con tres dobles enlaces conjugados alternados.',
                rules: [
                    'Nombres propios obligatorios en UNIZAR: tolueno (metilbenceno), estireno (vinilbenceno), xilenos (dimetilbencenos) y cumeno (isopropilbenceno).',
                    'En bencenos con 2 sustituyentes (disustituidos): posiciones 1,2 = orto (o-); posiciones 1,3 = meta (m-); posiciones 1,4 = para (p-).',
                    'Cuando el benceno actúa como radical colgando de una cadena larga se llama "fenil" (-C6H5).',
                    'Los halógenos (-F, -Cl, -Br, -I) se nombran como sustituyentes en orden alfabético. Recuerda: CHCl3 = cloroformo; CHBr3 = bromoformo.'
                ]
            },
            levels: [
                { id: '3-1', num: 1, title: 'Guardianes del Benceno', sub: 'Tolueno, estireno y fenilo', x: 22, y: 72 },
                { id: '3-2', num: 2, title: 'El Laberinto Orto, Meta y Para', sub: 'Xilenos y disustituidos', x: 50, y: 48 },
                { id: '3-3', num: 3, title: 'Escuadrón Halógeno', sub: 'Cloroformo y haluros de alquilo', x: 78, y: 26 }
            ]
        },
        {
            id: 4,
            title: 'Mundo 4: Oasis Cristalino Oxigenado I',
            subtitle: 'Alcoholes, Fenoles y Éteres',
            biomeName: 'Laguna de Cristal',
            biomeIcon: '🌊',
            theme: {
                bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #38bdf8 100%)',
                cardBg: '#f0f9ff',
                borderColor: '#0ea5e9',
                accentColor: '#0369a1',
                pathColor: '#e0f2fe',
                decorations: ['🌊', '💧', '珊瑚', '🐬', '💎']
            },
            tutorialRef: 'Tutorial 5 de Orgánica (Págs. 20–21 PDF)',
            notes: {
                summary: 'Funciones con oxígeno unido mediante enlaces sencillos: alcoholes (-OH), fenoles (Ar-OH) y éteres (R-O-R\').',
                rules: [
                    'Alcoholes (-OH): terminación "-ol". Tienen PRIORIDAD sobre alquenos, alquinos y halógenos al numerar la cadena.',
                    'Nombres comunes clave de polialcoholes: etilenglicol (1,2-etanodiol) y glicerina/glicerol (1,2,3-propanotriol).',
                    'Si hay un grupo más importante (ej. un ácido), el alcohol pasa a nombrarse con el prefijo "hidroxi-".',
                    'Fenoles: grupo -OH unido al benceno. El carbono del -OH es siempre el C1 (ej. 3,5-dimetilfenol o 3,5-xilenol).',
                    'ÉTERES (R-O-R\'): 2 métodos válidos: 1) Radicales en orden alfabético + éter (etil metil éter, dietiléter); 2) Prefijo "-oxi" unido al hidrocarburo más largo (metoxietano, etoxietano).'
                ]
            },
            levels: [
                { id: '4-1', num: 1, title: 'Manantial de Alcoholes', sub: 'Alcoholes, dioles y glicerina', x: 24, y: 72 },
                { id: '4-2', num: 2, title: 'Jardín de los Fenoles', sub: 'Fenol y derivados aromáticos', x: 50, y: 48 },
                { id: '4-3', num: 3, title: 'El Puente de los Éteres', sub: 'Nomenclatura radical y alcoxi', x: 76, y: 24 }
            ]
        },
        {
            id: 5,
            title: 'Mundo 5: Volcán del Carbonilo y Ésteres',
            subtitle: 'Aldehídos, Cetonas, Ácidos Carboxílicos y Ésteres',
            biomeName: 'Forja de Magma',
            biomeIcon: '🌋',
            theme: {
                bgGradient: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 55%, #f97316 100%)',
                cardBg: '#fef2f2',
                borderColor: '#ef4444',
                accentColor: '#b91c1c',
                pathColor: '#fed7aa',
                decorations: ['🌋', '🔥', '☄️', '⚒️', '🐉']
            },
            tutorialRef: 'Tutorial 6 de Orgánica (Págs. 21–23 PDF)',
            notes: {
                summary: 'Compuestos con doble enlace carbono-oxígeno (C=O): aldehídos, cetonas, ácidos y ésteres.',
                rules: [
                    'Aldehídos (-CHO en el extremo): sufijo "-al". Su carbono es el C1. Comunes: formaldehído (metanal), acetaldehído (etanal) y benzaldehído.',
                    'Cetonas (-CO- en el interior): sufijo "-ona" indicando posición (2-pentanona, 2,4-pentanodiona) o por radicales (dimetilcetona, etil metil cetona). Común: acetona (propanona).',
                    'Ácidos Carboxílicos (-COOH): MÁXIMA PRIORIDAD. Sufijo "ácido ...-oico". Comunes: ácido fórmico (metanoico), ácido acético (etanoico), ácido acrílico (propenoico), ácido butírico (butanoico) y ácido benzoico.',
                    'ÉSTERES (R-COO-R\'): el H del ácido se sustituye por un radical R\'. Se cambia "-oico" por "-oato de [radical]" (ej. etanoato de metilo, butanoato de etilo).'
                ]
            },
            levels: [
                { id: '5-1', num: 1, title: 'Fuego de Aldehídos', sub: 'Grupo -CHO terminal y benzaldehído', x: 18, y: 76 },
                { id: '5-2', num: 2, title: 'Cráter de las Cetonas', sub: 'Grupo -CO- intermedio y dionas', x: 40, y: 56 },
                { id: '5-3', num: 3, title: 'Trono de los Ácidos', sub: 'Ácidos carboxílicos y sales', x: 62, y: 38 },
                { id: '5-4', num: 4, title: 'La Forja de los Ésteres', sub: 'Alcanoato de alquilo (-COO-)', x: 82, y: 20 }
            ]
        },
        {
            id: 6,
            title: 'Mundo 6: Templo Astral del Nitrógeno',
            subtitle: 'Aminas, Nitrilos, Nitroderivados y Amidas',
            biomeName: 'Santuario Cósmico',
            biomeIcon: '🌌',
            theme: {
                bgGradient: 'linear-gradient(135deg, #3b0764 0%, #7e22ce 55%, #c084fc 100%)',
                cardBg: '#faf5ff',
                borderColor: '#a855f7',
                accentColor: '#6b21a8',
                pathColor: '#e9d5ff',
                decorations: ['🌌', '🪐', '🔮', '⭐', '🌙']
            },
            tutorialRef: 'Tutorial 7 de Orgánica (Págs. 24–25 PDF)',
            notes: {
                summary: 'Compuestos que contienen átomos de Nitrógeno: aminas, nitrilos, nitroderivados y amidas.',
                rules: [
                    'Aminas (derivadas del NH3): sufijo "-amina" (etilamina, trietilamina). Si es asimétrica, la cadena más compleja es la principal y los demás radicales unidos al nitrógeno llevan el localizador "N-" (ej. N-metilpropilamina). Común aromática: anilina (fenilamina).',
                    'Nitrilos (R-C≡N): 3 nombres aceptados: 1) sufijo "-nitrilo" contando el C del CN (etanonitrilo); 2) "cianuro de [radical]" sin contar el C del CN (cianuro de metilo); 3) derivado del ácido común (acetonitrilo, benzonitrilo).',
                    'Nitroderivados (-NO2): SIEMPRE actúan como sustituyente con el prefijo "nitro-" (nitrometano, nitrobenceno, 2,4,6-trinitrotolueno).',
                    'Amidas Primarias (R-CONH2): derivan de cambiar el -OH del ácido por -NH2. Sufijo "-amida" (etanamida o acetamida, propanamida, benzamida).'
                ]
            },
            levels: [
                { id: '6-1', num: 1, title: 'Constelación de Aminas', sub: 'Aminas 1ª, 2ª, 3ª y localizador N-', x: 18, y: 76 },
                { id: '6-2', num: 2, title: 'Rayo de Nitrilos y Cianuros', sub: 'Grupo -C≡N y sus 3 nombres', x: 40, y: 56 },
                { id: '6-3', num: 3, title: 'Supernova Nitro (-NO2)', sub: 'Nitrobenceno y trinitrotolueno', x: 62, y: 38 },
                { id: '6-4', num: 4, title: 'Altar de las Amidas', sub: 'Grupo -CONH2 (acetamida, benzamida)', x: 82, y: 20 }
            ]
        },
        {
            id: 7,
            title: 'Mundo 7: Cumbres de la Prioridad IUPAC',
            subtitle: 'Compuestos Polifuncionales y Jerarquía Oficial',
            biomeName: 'Cima Glaciar',
            biomeIcon: '🏔️',
            theme: {
                bgGradient: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #38bdf8 100%)',
                cardBg: '#f8fafc',
                borderColor: '#475569',
                accentColor: '#1e293b',
                pathColor: '#7dd3fc',
                decorations: ['🏔️', '❄️', '🦅', '🧭', '🚩']
            },
            tutorialRef: 'Tutorial 1 y Pág. 26 del PDF (Orden de Preferencia)',
            notes: {
                summary: 'Cuando una molécula tiene 2 o más grupos funcionales distintos, SOLO UNO es el grupo principal (sufijo) y los demás pasan a ser prefijos.',
                rules: [
                    'Orden estricto UNIZAR: 1. Ácidos > 2. Ésteres/Amidas > 3. Nitrilos > 4. Aldehídos > 5. Cetonas > 6. Alcoholes/Fenoles > 7. Aminas > 8. Éteres.',
                    'Prefijos cuando un grupo actúa como subordinado: Alcohol (-OH) = "hidroxi-"; Cetona/Aldehído (=O) = "oxo-"; Amina (-NH2) = "amino-"; Éter (-OR) = "metoxi- / etoxi-".',
                    'El grupo principal SIEMPRE determina por dónde se empieza a numerar la cadena.'
                ]
            },
            levels: [
                { id: '7-1', num: 1, title: 'Hidroxiácidos y Cetoácidos', sub: 'Ácidos con -OH y =O subordinados', x: 24, y: 72 },
                { id: '7-2', num: 2, title: 'Carbonilos e Insaturaciones', sub: 'Aldehídos y ésteres con dobles enlaces', x: 50, y: 48 },
                { id: '7-3', num: 3, title: 'Cumbre Polifuncional', sub: 'Dominio total de la tabla de prioridad', x: 76, y: 24 }
            ]
        },
        {
            id: 8,
            title: 'MUNDO 8: CASTILLO DEL JEFE FINAL UNIZAR',
            subtitle: 'Simulacro Oficial de Examen — ¡TODO MEZCLADO!',
            biomeName: 'Ciudadela Dorada',
            biomeIcon: '👑',
            theme: {
                bgGradient: 'linear-gradient(135deg, #450a0a 0%, #991b1b 45%, #d97706 100%)',
                cardBg: '#fffbeb',
                borderColor: '#f59e0b',
                accentColor: '#b45309',
                pathColor: '#fef08a',
                decorations: ['👑', '🏰', '⚔️', '🏆', '🔥']
            },
            tutorialRef: 'Simulacro Integral de Examen (Sin pistas temáticas)',
            notes: {
                summary: '¡El examen real no avisa de qué tema es cada molécula! Aquí se mezclan todos los bloques anteriores.',
                rules: [
                    'Paso 1: Mira toda la molécula e identifica el grupo funcional de mayor prioridad.',
                    'Paso 2: Elige la cadena principal que contenga ese grupo (y las insaturaciones si las hay).',
                    'Paso 3: Numera desde el extremo más cercano al grupo principal.',
                    'Paso 4: Nombra todos los sustituyentes en orden alfabético y remata con el sufijo principal.'
                ]
            },
            levels: [
                { id: '8-1', num: 1, title: 'Asalto al Examen I', sub: 'Mezcla total de familias orgánicas', x: 24, y: 72 },
                { id: '8-2', num: 2, title: 'Asalto al Examen II', sub: 'Aromáticos, ésteres, éteres y aminas', x: 50, y: 48 },
                { id: '8-3', num: 3, title: 'GRAN JEFE FINAL UNIZAR', sub: 'El reto definitivo de Química 30004', x: 76, y: 24 }
            ]
        }
    ];

    return {
        avatars,
        priorityTable,
        worlds
    };
})();
