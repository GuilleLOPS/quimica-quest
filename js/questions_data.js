/**
 * BANCO COMPLETO DE COMPUESTOS Y GENERADOR BIDIRECCIONAL DE EJERCICIOS
 * Genera en cada nivel entre 10 y 14 preguntas combinando:
 * 1. De Estructura a Nombre (Selección con trampas)
 * 2. De Nombre a Estructura (Elección entre 4 moléculas dibujadas en 2D)
 * 3. Reto de Escritura (Escribir el nombre IUPAC o común con corrector inteligente)
 */

window.QuestionsData = (function () {
    const rawLevels = {
    "1-1": [
        {
            "id": "1-1-1",
            "names": [
                "propano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cuenta los carbonos: tiene 3 átomos de carbono unidos por enlaces sencillos.",
            "exp": "El prefijo para 3 carbonos es 'prop-' y al ser un alcano saturado termina en '-ano': propano.",
            "distractors": [
                "etano",
                "butano",
                "propeno"
            ]
        },
        {
            "id": "1-1-2",
            "names": [
                "butano",
                "n-butano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Es una cadena lineal sin ramificaciones de 4 átomos de carbono.",
            "exp": "4 carbonos en cadena lineal corresponden al prefijo 'but-' + terminación '-ano': butano.",
            "distractors": [
                "propano",
                "pentano",
                "2-metilpropano"
            ]
        },
        {
            "id": "1-1-3",
            "names": [
                "2-metilpropano",
                "metilpropano",
                "isobutano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "La cadena horizontal tiene 3 carbonos y del carbono central (C2) cuelga un metilo.",
            "exp": "Cadena principal de 3 C (propano) con un radical metilo (-CH3) en el carbono 2: 2-metilpropano (o isobutano).",
            "distractors": [
                "butano",
                "2-metilbutano",
                "2,2-dimetilpropano"
            ]
        },
        {
            "id": "1-1-4",
            "names": [
                "2-metilbutano",
                "metilbutano",
                "isopentano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Se empieza a numerar por la izquierda para que el metilo lleve el localizador más bajo (2 en vez de 3).",
            "exp": "Cadena de 4 carbonos (butano) numerada desde la izquierda: el metilo está en el C2 -> 2-metilbutano.",
            "distractors": [
                "3-metilbutano",
                "2-metilpentano",
                "2-etilpropano"
            ]
        },
        {
            "id": "1-1-5",
            "names": [
                "3-metilpentano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cadena de 5 carbonos simétrica con un radical metilo justo en el centro.",
            "exp": "La cadena principal tiene 5 C (pentano) y tanto por la izquierda como por la derecha el metilo cae en la posición 3: 3-metilpentano.",
            "distractors": [
                "2-metilpentano",
                "3-etilpentano",
                "3-metilhexano"
            ]
        },
        {
            "id": "1-1-6",
            "names": [
                "3-etilhexano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "CH2-CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "La cadena principal tiene 6 carbonos y en el C3 hay un radical de 2 carbonos (-CH2-CH3).",
            "exp": "6 carbonos en la línea principal (hexano) y un grupo etilo en la posición 3 (numerando por la izquierda): 3-etilhexano.",
            "distractors": [
                "4-etilhexano",
                "3-metilhexano",
                "2-etilpentano"
            ]
        }
    ],
    "1-2": [
        {
            "id": "1-2-1",
            "names": [
                "2,2-dimetilbutano",
                "neohexano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "C",
                        "top": "CH3",
                        "bottom": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Aunque los dos metilos estén en el mismo carbono, debes repetir el número localizador (2,2-) y usar el prefijo 'di-'.",
            "exp": "Dos grupos metilo sobre el carbono 2 de una cadena de 4 carbonos: 2,2-dimetilbutano.",
            "distractors": [
                "2-dimetilbutano",
                "3,3-dimetilbutano",
                "2,2-dimetilpentano"
            ]
        },
        {
            "id": "1-2-2",
            "names": [
                "2,3-dimetilpentano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH",
                        "bottom": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Numera desde la izquierda para obtener los localizadores (2,3) en lugar de (3,4).",
            "exp": "Cadena de 5 carbonos (pentano) con dos metilos en C2 y C3: 2,3-dimetilpentano.",
            "distractors": [
                "3,4-dimetilpentano",
                "2,3-dimetilbutano",
                "2-etil-3-metilbutano"
            ]
        },
        {
            "id": "1-2-3",
            "names": [
                "2,2,4-trimetilpentano",
                "isooctano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "C",
                        "top": "CH3",
                        "bottom": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Por la izquierda tienes dos metilos en C2 (2,2,4) y por la derecha solo uno (2,4,4). ¡Gana (2,2,4)!",
            "exp": "Famoso como 'isooctano' de la gasolina: cadena de 5 C con tres metilos en las posiciones 2, 2 y 4 -> 2,2,4-trimetilpentano.",
            "distractors": [
                "2,4,4-trimetilpentano",
                "2,2,4-trimetilhexano",
                "2,4-dimetilpentano"
            ]
        },
        {
            "id": "1-2-4",
            "names": [
                "3-etil-2-metilhexano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH",
                        "bottom": "CH2-CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Alfabéticamente la 'e' de etil va antes que la 'm' de metil al escribir el nombre.",
            "exp": "Se numera por la izquierda (posiciones 2 y 3). Se escribe en orden alfabético: 3-etil-2-metilhexano.",
            "distractors": [
                "2-metil-3-etilhexano",
                "4-etil-5-metilhexano",
                "3-etil-2-metilpentano"
            ]
        },
        {
            "id": "1-2-5",
            "names": [
                "4-isopropilheptano",
                "4-(1-metiletil)heptano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "CH(CH3)2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "El grupo -CH(CH3)2 en forma de 'Y' se llama radical isopropilo.",
            "exp": "Cadena de 7 carbonos (heptano) con un grupo isopropilo en el carbono central (C4): 4-isopropilheptano.",
            "distractors": [
                "4-propilheptano",
                "4-isobutilheptano",
                "3-isopropilhexano"
            ]
        },
        {
            "id": "1-2-6",
            "names": [
                "4-terc-butilheptano",
                "4-(1,1-dimetiletil)heptano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "C(CH3)3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "El radical -C(CH3)3 con tres metilos unidos al mismo carbono es el terc-butilo.",
            "exp": "Cadena de 7 carbonos con un grupo terc-butilo (-C(CH3)3) en la posición 4: 4-terc-butilheptano.",
            "distractors": [
                "4-isobutilheptano",
                "4-butilheptano",
                "4-isopropilheptano"
            ]
        }
    ],
    "1-3": [
        {
            "id": "1-3-1",
            "names": [
                "ciclopentano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 5,
                "subs": {}
            },
            "hint": "Es un anillo cerrado de 5 vértices (pentágono) con solo enlaces sencillos.",
            "exp": "Hidrocarburo cíclico saturado de 5 átomos de carbono: ciclopentano.",
            "distractors": [
                "ciclohexano",
                "pentano",
                "ciclopenteno"
            ]
        },
        {
            "id": "1-3-2",
            "names": [
                "ciclohexano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 6,
                "subs": {}
            },
            "hint": "Cuidado: no tiene dobles enlaces dentro, así que NO es benceno. Es un ciclo saturado de 6 carbonos.",
            "exp": "Anillo hexagonal sin dobles enlaces: ciclohexano.",
            "distractors": [
                "benceno",
                "ciclopentano",
                "hexano"
            ]
        },
        {
            "id": "1-3-3",
            "names": [
                "metilciclopentano",
                "1-metilciclopentano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 5,
                "subs": {
                    "1": "CH3"
                }
            },
            "hint": "Cuando solo hay un sustituyente en un ciclo, no hace falta poner el número 1.",
            "exp": "Anillo de ciclopentano con un radical metilo: metilciclopentano.",
            "distractors": [
                "metilciclohexano",
                "etilciclopentano",
                "tolueno"
            ]
        },
        {
            "id": "1-3-4",
            "names": [
                "etilciclohexano",
                "1-etilciclohexano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 6,
                "subs": {
                    "1": "CH2-CH3"
                }
            },
            "hint": "Anillo saturado de 6 carbonos con un radical etilo (-CH2-CH3).",
            "exp": "Ciclohexano monosustituido con un grupo etilo: etilciclohexano.",
            "distractors": [
                "etilbenceno",
                "metilciclohexano",
                "propilciclohexano"
            ]
        },
        {
            "id": "1-3-5",
            "names": [
                "isopropilciclopentano",
                "1-isopropilciclopentano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 5,
                "subs": {
                    "1": "CH(CH3)2"
                }
            },
            "hint": "Sale directamente en los ejercicios del PDF: anillo de 5 C con el grupo isopropilo.",
            "exp": "Anillo de 5 carbonos (ciclopentano) unido a un radical isopropilo: isopropilciclopentano.",
            "distractors": [
                "propilciclopentano",
                "isopropilciclohexano",
                "isopropilbenceno"
            ]
        },
        {
            "id": "1-3-6",
            "names": [
                "1-etil-3-metilciclohexano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 6,
                "subs": {
                    "1": "CH2-CH3",
                    "3": "CH3"
                }
            },
            "hint": "El número 1 se le da al 'etil' por prioridad alfabética, y se numera hacia el metilo por el camino más corto (1,3).",
            "exp": "Ciclohexano disustituido en posiciones 1 y 3, citando primero el etilo: 1-etil-3-metilciclohexano.",
            "distractors": [
                "1-metil-3-etilciclohexano",
                "1-etil-4-metilciclohexano",
                "1-etil-2-metilciclohexano"
            ]
        }
    ],
    "2-1": [
        {
            "id": "2-1-1",
            "names": [
                "eteno",
                "etileno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH2"
                    }
                ]
            },
            "hint": "El alqueno más sencillo de 2 carbonos. Su nombre común aceptado es etileno.",
            "exp": "Dos carbonos unidos por doble enlace: eteno (o etileno).",
            "distractors": [
                "etano",
                "etino",
                "propeno"
            ]
        },
        {
            "id": "2-1-2",
            "names": [
                "propeno",
                "propileno",
                "1-propeno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH2"
                    }
                ]
            },
            "hint": "Alqueno de 3 carbonos.",
            "exp": "Tres carbonos con un doble enlace: propeno.",
            "distractors": [
                "propano",
                "propino",
                "1-buteno"
            ]
        },
        {
            "id": "2-1-3",
            "names": [
                "1-buteno",
                "but-1-eno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH2"
                    }
                ]
            },
            "hint": "Se numera empezando por la derecha para que el doble enlace lleve el localizador 1.",
            "exp": "Cadena de 4 carbonos con el doble enlace en el extremo derecho (C1): 1-buteno.",
            "distractors": [
                "3-buteno",
                "2-buteno",
                "1-penteno"
            ]
        },
        {
            "id": "2-1-4",
            "names": [
                "4-metil-2-penteno",
                "4-metilpent-2-eno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "¡El doble enlace MANDA sobre los radicales! Numera por la izquierda para que el doble enlace sea el 2.",
            "exp": "El doble enlace tiene prioridad sobre el metilo al numerar: empieza por la izquierda (C2=C3) y el metilo queda en C4 -> 4-metil-2-penteno.",
            "distractors": [
                "2-metil-3-penteno",
                "2-metil-2-penteno",
                "4-metil-1-penteno"
            ]
        },
        {
            "id": "2-1-5",
            "names": [
                "1,3-pentadieno",
                "penta-1,3-dieno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH2"
                    }
                ]
            },
            "hint": "Tiene dos dobles enlaces ('-dieno'). Numera desde la derecha para obtener (1,3) en lugar de (2,4).",
            "exp": "5 carbonos con dos dobles enlaces en posiciones 1 y 3 (contando desde la derecha): 1,3-pentadieno.",
            "distractors": [
                "2,4-pentadieno",
                "1,4-pentadieno",
                "1,3-butadieno"
            ]
        },
        {
            "id": "2-1-6",
            "names": [
                "2-metil-2-penteno",
                "2-metilpent-2-eno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "C",
                        "top": "CH3",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Tanto el doble enlace como el metilo están en el carbono 2 contando por la izquierda.",
            "exp": "Cadena de 5 carbonos con doble enlace en C2 y metilo en C2: 2-metil-2-penteno.",
            "distractors": [
                "4-metil-3-penteno",
                "2-metil-3-penteno",
                "3-metil-2-penteno"
            ]
        }
    ],
    "2-2": [
        {
            "id": "2-2-1",
            "names": [
                "etino",
                "acetileno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "HC",
                        "bond": "≡"
                    },
                    {
                        "label": "CH"
                    }
                ]
            },
            "hint": "El alquino más sencillo (2 carbonos con triple enlace). Su nombre común de soldadura es acetileno.",
            "exp": "Dos carbonos unidos por triple enlace: etino (o acetileno).",
            "distractors": [
                "eteno",
                "propino",
                "etano"
            ]
        },
        {
            "id": "2-2-2",
            "names": [
                "1-butino",
                "but-1-ino",
                "etilacetileno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "HC",
                        "bond": "≡"
                    },
                    {
                        "label": "C"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Alquino de 4 carbonos con el triple enlace en el carbono 1.",
            "exp": "4 carbonos con triple enlace terminal en C1: 1-butino.",
            "distractors": [
                "2-butino",
                "1-buteno",
                "1-pentino"
            ]
        },
        {
            "id": "2-2-3",
            "names": [
                "3-metil-1-hexino",
                "3-metilhex-1-ino"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "HC",
                        "bond": "≡"
                    },
                    {
                        "label": "C"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "El triple enlace en la izquierda obliga a empezar a contar por ahí (C1).",
            "exp": "Cadena de 6 carbonos (hexino) con triple enlace en C1 y metilo en C3: 3-metil-1-hexino.",
            "distractors": [
                "4-metil-5-hexino",
                "3-metil-1-pentino",
                "3-metil-2-hexino"
            ]
        },
        {
            "id": "2-2-4",
            "names": [
                "1-penten-4-ino",
                "pent-1-en-4-ino"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "CH"
                    }
                ]
            },
            "hint": "¡EMPATE en los extremos! Cuando el doble y el triple enlace empatan en posición (1 y 4), el DOBLE enlace gana el 1.",
            "exp": "En caso de empate en los localizadores de los extremos, se da preferencia al doble enlace (C1) sobre el triple (C4): 1-penten-4-ino.",
            "distractors": [
                "4-penten-1-ino",
                "1-pentin-4-eno",
                "2-penten-4-ino"
            ]
        },
        {
            "id": "2-2-5",
            "names": [
                "3-penten-1-ino",
                "pent-3-en-1-ino"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "HC",
                        "bond": "≡"
                    },
                    {
                        "label": "C"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Aquí NO hay empate: por la izquierda tienes (1,3) y por la derecha (2,4). ¡Gana (1,3) aunque el 1 sea el triple enlace!",
            "exp": "La combinación de localizadores más baja es (1,3) empezando por el triple enlace en la izquierda: 3-penten-1-ino.",
            "distractors": [
                "2-penten-4-ino",
                "1-penten-3-ino",
                "3-pentin-1-eno"
            ]
        },
        {
            "id": "2-2-6",
            "names": [
                "5-octen-2-ino",
                "oct-5-en-2-ino"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "C"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Por la izquierda las insaturaciones están en (2,5) y por la derecha en (3,6). Manda (2,5).",
            "exp": "Cadena de 8 carbonos (oct-): numerando por la izquierda el triple enlace está en C2 y el doble en C5 -> 5-octen-2-ino.",
            "distractors": [
                "3-octen-6-ino",
                "2-octen-5-ino",
                "5-octin-2-eno"
            ]
        }
    ],
    "2-3": [
        {
            "id": "2-3-1",
            "names": [
                "cis-2-buteno",
                "cis-but-2-eno",
                "(Z)-2-buteno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH3",
                "bl": "H",
                "tr": "CH3",
                "br": "H"
            },
            "hint": "Fíjate dónde están los dos grupos -CH3: ambos están arriba (en el mismo lado del doble enlace).",
            "exp": "Como los dos grupos metilo están en el mismo lado del plano del doble enlace (ambos arriba), es el isómero cis: cis-2-buteno.",
            "distractors": [
                "trans-2-buteno",
                "cis-1-buteno",
                "cis-2-penteno"
            ]
        },
        {
            "id": "2-3-2",
            "names": [
                "trans-2-buteno",
                "trans-but-2-eno",
                "(E)-2-buteno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH3",
                "bl": "H",
                "tr": "H",
                "br": "CH3"
            },
            "hint": "Un grupo -CH3 está arriba a la izquierda y el otro está abajo a la derecha (en diagonal / lados opuestos).",
            "exp": "Los dos grupos metilo se encuentran en lados opuestos del doble enlace, por tanto es el isómero trans: trans-2-buteno.",
            "distractors": [
                "cis-2-buteno",
                "trans-2-penteno",
                "trans-1-buteno"
            ]
        },
        {
            "id": "2-3-3",
            "names": [
                "cis-2-penteno",
                "cis-pent-2-eno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH3",
                "bl": "H",
                "tr": "CH2-CH3",
                "br": "H"
            },
            "hint": "Suma todos los carbonos de la cadena: 1 (izq) + 2 (centrales) + 2 (der) = 5 carbonos totales. Ambos grupos carbonados están arriba.",
            "exp": "Cadena total de 5 carbonos con el doble enlace en C2 y ambos radicales alquilo hacia el mismo lado (arriba): cis-2-penteno.",
            "distractors": [
                "trans-2-penteno",
                "cis-2-buteno",
                "cis-3-hexeno"
            ]
        },
        {
            "id": "2-3-4",
            "names": [
                "trans-2-penteno",
                "trans-pent-2-eno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH3",
                "bl": "H",
                "tr": "H",
                "br": "CH2-CH3"
            },
            "hint": "El metilo (-CH3) y el etilo (-CH2-CH3) están en lados contrarios del doble enlace.",
            "exp": "Cadena de 5 carbonos con los grupos alquilo en posiciones opuestas respecto al doble enlace: trans-2-penteno.",
            "distractors": [
                "cis-2-penteno",
                "trans-3-hexeno",
                "trans-2-buteno"
            ]
        },
        {
            "id": "2-3-5",
            "names": [
                "cis-3-hexeno",
                "cis-hex-3-eno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH2-CH3",
                "bl": "H",
                "tr": "CH2-CH3",
                "br": "H"
            },
            "hint": "2 carbonos a la izquierda + 2 centrales + 2 a la derecha = 6 carbonos (3-hexeno). Ambos etilos están arriba.",
            "exp": "Alqueno simétrico de 6 carbonos con el doble enlace en C3 y ambos grupos etilo del mismo lado: cis-3-hexeno.",
            "distractors": [
                "trans-3-hexeno",
                "cis-2-hexeno",
                "cis-2-penteno"
            ]
        },
        {
            "id": "2-3-6",
            "names": [
                "trans-1,2-dicloroeteno",
                "trans-1,2-dicloroetileno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "Cl",
                "bl": "H",
                "tr": "H",
                "br": "Cl"
            },
            "hint": "Los dos átomos de cloro están cruzados en lados opuestos del doble enlace C=C.",
            "exp": "Eteno con un cloro en cada carbono en disposición trans (lados opuestos): trans-1,2-dicloroeteno.",
            "distractors": [
                "cis-1,2-dicloroeteno",
                "1,1-dicloroeteno",
                "trans-1,2-dicloroetano"
            ]
        }
    ],
    "3-1": [
        {
            "id": "3-1-1",
            "names": [
                "tolueno",
                "metilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3"
                }
            },
            "hint": "Anillo de benceno con un único grupo metilo (-CH3). Su nombre común es indispensable.",
            "exp": "El metilbenceno se conoce universalmente por su nombre común aceptado por la IUPAC: tolueno.",
            "distractors": [
                "estireno",
                "xileno",
                "fenol"
            ]
        },
        {
            "id": "3-1-2",
            "names": [
                "etilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH2-CH3"
                }
            },
            "hint": "Anillo de benceno unido a un radical etilo (-CH2-CH3).",
            "exp": "Se nombra el radical alquilo seguido de la palabra benceno: etilbenceno.",
            "distractors": [
                "tolueno",
                "propilbenceno",
                "estireno"
            ]
        },
        {
            "id": "3-1-3",
            "names": [
                "estireno",
                "vinilbenceno",
                "etenilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH=CH2"
                }
            },
            "hint": "Benceno con un grupo vinilo (-CH=CH2). Es el monómero del famoso plástico poliestireno.",
            "exp": "El vinilbenceno (o etenilbenceno) tiene el nombre común oficial de estireno.",
            "distractors": [
                "tolueno",
                "etilbenceno",
                "cumeno"
            ]
        },
        {
            "id": "3-1-4",
            "names": [
                "isopropilbenceno",
                "cumeno",
                "2-fenilpropano"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH(CH3)2"
                }
            },
            "hint": "Anillo de benceno unido a un radical isopropilo (-CH(CH3)2).",
            "exp": "Benceno sustituido con un grupo isopropilo: isopropilbenceno (también llamado cumeno o 2-fenilpropano).",
            "distractors": [
                "propilbenceno",
                "etilbenceno",
                "estireno"
            ]
        },
        {
            "id": "3-1-5",
            "names": [
                "propilbenceno",
                "1-fenilpropano"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH2-CH2-CH3"
                }
            },
            "hint": "Anillo de benceno con una cadena lineal de 3 carbonos (-CH2-CH2-CH3).",
            "exp": "Radical propilo lineal unido al anillo aromático: propilbenceno.",
            "distractors": [
                "isopropilbenceno",
                "etilbenceno",
                "butilbenceno"
            ]
        },
        {
            "id": "3-1-6",
            "names": [
                "benceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {}
            },
            "hint": "El hidrocarburo aromático base de fórmula C6H6 sin ningún sustituyente.",
            "exp": "Anillo aromático hexagonal de 6 carbonos con tres dobles enlaces conjugados: benceno.",
            "distractors": [
                "ciclohexano",
                "tolueno",
                "fenol"
            ]
        }
    ],
    "3-2": [
        {
            "id": "3-2-1",
            "names": [
                "o-xileno",
                "orto-xileno",
                "1,2-dimetilbenceno",
                "o-dimetilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3",
                    "2": "CH3"
                }
            },
            "hint": "Dos grupos metilo en vértices contiguos (posiciones 1 y 2 = orto).",
            "exp": "Los dimetilbencenos se llaman xilenos. Al estar en posiciones vecinas (1,2) es el o-xileno (1,2-dimetilbenceno).",
            "distractors": [
                "m-xileno (1,3-dimetilbenceno)",
                "p-xileno (1,4-dimetilbenceno)",
                "etilbenceno"
            ]
        },
        {
            "id": "3-2-2",
            "names": [
                "m-xileno",
                "meta-xileno",
                "1,3-dimetilbenceno",
                "m-dimetilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3",
                    "3": "CH3"
                }
            },
            "hint": "Dos grupos metilo separados por un vértice vacío (posiciones 1 y 3 = meta).",
            "exp": "Posiciones 1 y 3 en el benceno corresponden al prefijo 'meta-': m-xileno o 1,3-dimetilbenceno.",
            "distractors": [
                "o-xileno (1,2-dimetilbenceno)",
                "p-xileno (1,4-dimetilbenceno)",
                "tolueno"
            ]
        },
        {
            "id": "3-2-3",
            "names": [
                "p-xileno",
                "para-xileno",
                "1,4-dimetilbenceno",
                "p-dimetilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3",
                    "4": "CH3"
                }
            },
            "hint": "Dos grupos metilo enfrentados en extremos opuestos del hexágono (posiciones 1 y 4 = para).",
            "exp": "Posiciones opuestas 1 y 4 corresponden al prefijo 'para-': p-xileno o 1,4-dimetilbenceno.",
            "distractors": [
                "m-xileno (1,3-dimetilbenceno)",
                "o-xileno (1,2-dimetilbenceno)",
                "1,4-dietilbenceno"
            ]
        },
        {
            "id": "3-2-4",
            "names": [
                "1-etil-3-metilbenceno",
                "m-etilmetilbenceno",
                "m-etiltolueno",
                "3-etiltolueno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH2-CH3",
                    "3": "CH3"
                }
            },
            "hint": "Un etilo y un metilo en posiciones 1 y 3 (meta). Alfabéticamente 'etil' va antes que 'metil'.",
            "exp": "Benceno disustituido en 1,3 (meta) con un etilo y un metilo: 1-etil-3-metilbenceno.",
            "distractors": [
                "1-etil-2-metilbenceno",
                "1-etil-4-metilbenceno",
                "m-xileno"
            ]
        },
        {
            "id": "3-2-5",
            "names": [
                "1-bromo-3-clorobenceno",
                "m-bromoclorobenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "Br",
                    "3": "Cl"
                }
            },
            "hint": "Bromo en C1 y Cloro en C3 (posición meta). 'bromo' va antes que 'cloro' alfabéticamente.",
            "exp": "Derivado aromático halogenado en posiciones 1 y 3: 1-bromo-3-clorobenceno (o m-bromoclorobenceno).",
            "distractors": [
                "1-bromo-2-clorobenceno",
                "1-bromo-4-clorobenceno",
                "1-cloro-3-bromobenceno"
            ]
        },
        {
            "id": "3-2-6",
            "names": [
                "1,4-dipropilbenceno",
                "p-dipropilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH2-CH2-CH3",
                    "4": "CH2-CH2-CH3"
                }
            },
            "hint": "Dos radicales propilo en posiciones opuestas 1 y 4 (para) del anillo de benceno.",
            "exp": "Benceno con dos cadenas de propilo en posiciones 1 y 4: 1,4-dipropilbenceno (p-dipropilbenceno).",
            "distractors": [
                "1,3-dipropilbenceno",
                "1,4-diisopropilbenceno",
                "p-dietilbenceno"
            ]
        }
    ],
    "3-3": [
        {
            "id": "3-3-1",
            "names": [
                "cloroformo",
                "triclorometano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH",
                        "top": "Cl",
                        "bottom": "Cl"
                    },
                    {
                        "label": "Cl"
                    }
                ]
            },
            "hint": "Molécula de 1 solo carbono (metano) con 3 átomos de cloro (CHCl3).",
            "exp": "El triclorometano (CHCl3) es un disolvente clásico cuyo nombre común aceptado es cloroformo.",
            "distractors": [
                "bromoformo",
                "diclorometano",
                "tetracloruro de carbono"
            ]
        },
        {
            "id": "3-3-2",
            "names": [
                "bromoformo",
                "tribromometano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH",
                        "top": "Br",
                        "bottom": "Br"
                    },
                    {
                        "label": "Br"
                    }
                ]
            },
            "hint": "Análogo al cloroformo pero con 3 átomos de bromo (CHBr3).",
            "exp": "CHBr3 es el tribromometano o bromoformo.",
            "distractors": [
                "cloroformo",
                "dibromometano",
                "1,1,1-tribromoetano"
            ]
        },
        {
            "id": "3-3-3",
            "names": [
                "cloruro de vinilo",
                "cloroeteno",
                "cloroetileno"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH",
                        "top": "Cl"
                    }
                ]
            },
            "hint": "Eteno con un átomo de cloro. Es el monómero con el que se fabrica el PVC.",
            "exp": "El cloroeteno se conoce industrialmente y en la IUPAC como cloruro de vinilo.",
            "distractors": [
                "cloroetano",
                "1,2-dicloroeteno",
                "clorobenceno"
            ]
        },
        {
            "id": "3-3-4",
            "names": [
                "1,2-dicloropropano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "top": "Cl"
                    },
                    {
                        "label": "CH",
                        "top": "Cl"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cadena de 3 carbonos con átomos de cloro en los carbonos 1 y 2.",
            "exp": "Se numera desde la izquierda para que los cloros lleven los números 1 y 2: 1,2-dicloropropano.",
            "distractors": [
                "2,3-dicloropropano",
                "1,3-dicloropropano",
                "1,2-diclorobutano"
            ]
        },
        {
            "id": "3-3-5",
            "names": [
                "2,3-diclorobutano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "Cl"
                    },
                    {
                        "label": "CH",
                        "bottom": "Cl"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cadena de 4 carbonos con un cloro en C2 y otro en C3.",
            "exp": "Butano con dos sustituyentes cloro en los carbonos centrales 2 y 3: 2,3-diclorobutano.",
            "distractors": [
                "1,2-diclorobutano",
                "2,2-diclorobutano",
                "2,3-dicloropropano"
            ]
        },
        {
            "id": "3-3-6",
            "names": [
                "2-bromo-3-clorobutano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "Br"
                    },
                    {
                        "label": "CH",
                        "bottom": "Cl"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Hay empate (2,3) por ambos lados: el Bromo gana el número 2 por orden alfabético frente al Cloro.",
            "exp": "Ante igualdad de localizadores desde los extremos, se da el número más bajo al primer sustituyente por orden alfabético ('b' de bromo antes que 'c' de cloro): 2-bromo-3-clorobutano.",
            "distractors": [
                "3-bromo-2-clorobutano",
                "2-cloro-3-bromobutano",
                "1-bromo-2-cloropropano"
            ]
        }
    ],
    "4-1": [
        {
            "id": "4-1-1",
            "names": [
                "metanol",
                "alcohol metílico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "OH"
                    }
                ]
            },
            "hint": "Alcohol de 1 solo átomo de carbono.",
            "exp": "1 carbono (met-) con grupo alcohol (-ol): metanol.",
            "distractors": [
                "etanol",
                "metanal",
                "ácido metanoico"
            ]
        },
        {
            "id": "4-1-2",
            "names": [
                "etanol",
                "alcohol etílico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "OH"
                    }
                ]
            },
            "hint": "Alcohol de 2 átomos de carbono.",
            "exp": "2 carbonos (et-) con grupo -OH: etanol (o alcohol etílico).",
            "distractors": [
                "metanol",
                "1-propanol",
                "etanal"
            ]
        },
        {
            "id": "4-1-3",
            "names": [
                "1-butanol",
                "butan-1-ol",
                "alcohol butílico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "OH"
                    }
                ]
            },
            "hint": "Cadena de 4 carbonos con el grupo -OH en el carbono 1 (extremo derecho).",
            "exp": "El carbono unido al -OH es el C1. Al tener 4 carbonos: 1-butanol.",
            "distractors": [
                "2-butanol",
                "1-propanol",
                "4-butanol"
            ]
        },
        {
            "id": "4-1-4",
            "names": [
                "2-propanol",
                "propan-2-ol",
                "isopropanol",
                "alcohol isopropílico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cadena de 3 carbonos con el grupo alcohol (-OH) en el carbono central (C2).",
            "exp": "Alcohol secundario de 3 carbonos: 2-propanol (o alcohol isopropílico).",
            "distractors": [
                "1-propanol",
                "2-butanol",
                "propanona"
            ]
        },
        {
            "id": "4-1-5",
            "names": [
                "1,2-etanodiol",
                "etilenglicol",
                "etan-1,2-diol"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "top": "OH"
                    },
                    {
                        "label": "CH2",
                        "top": "OH"
                    }
                ]
            },
            "hint": "Dos carbonos y cada uno tiene un grupo -OH. Es el anticongelante de los coches (etilenglicol).",
            "exp": "Diol de 2 carbonos con grupos hidroxilo en C1 y C2: 1,2-etanodiol o etilenglicol.",
            "distractors": [
                "glicerina (1,2,3-propanotriol)",
                "etanol",
                "1,2-propanodiol"
            ]
        },
        {
            "id": "4-1-6",
            "names": [
                "1,2,3-propanotriol",
                "glicerina",
                "glicerol",
                "propan-1,2,3-triol"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "top": "OH"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "CH2",
                        "top": "OH"
                    }
                ]
            },
            "hint": "Tres carbonos y tres grupos -OH. Su nombre clásico es glicerina o glicerol.",
            "exp": "Triol de 3 carbonos (1,2,3-propanotriol), universalmente conocido como glicerina o glicerol.",
            "distractors": [
                "etilenglicol (1,2-etanodiol)",
                "2-propanol",
                "1,3-propanodiol"
            ]
        }
    ],
    "4-2": [
        {
            "id": "4-2-1",
            "names": [
                "fenol",
                "hidroxibenceno",
                "bencenol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH"
                }
            },
            "hint": "Anillo de benceno unido directamente a un grupo -OH.",
            "exp": "El compuesto aromático con un grupo -OH se denomina fenol.",
            "distractors": [
                "ciclohexanol",
                "tolueno",
                "anilina"
            ]
        },
        {
            "id": "4-2-2",
            "names": [
                "2-metilfenol",
                "o-metilfenol",
                "o-cresol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH",
                    "2": "CH3"
                }
            },
            "hint": "El carbono del -OH manda y es el C1. El metilo está justo al lado en C2 (orto).",
            "exp": "Fenol con un metilo en posición 2 (orto): 2-metilfenol (u o-metilfenol).",
            "distractors": [
                "3-metilfenol",
                "4-metilfenol",
                "o-xileno"
            ]
        },
        {
            "id": "4-2-3",
            "names": [
                "3-metilfenol",
                "m-metilfenol",
                "m-cresol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH",
                    "3": "CH3"
                }
            },
            "hint": "Grupo -OH en C1 y grupo metilo en posición 3 (meta).",
            "exp": "Fenol con un metilo en posición 3 (meta): 3-metilfenol.",
            "distractors": [
                "2-metilfenol",
                "4-metilfenol",
                "m-xileno"
            ]
        },
        {
            "id": "4-2-4",
            "names": [
                "2,5-dimetilfenol",
                "2,5-xilenol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH",
                    "2": "CH3",
                    "5": "CH3"
                }
            },
            "hint": "Sale en los ejercicios de UNIZAR: -OH es C1, numeramos hacia el metilo más cercano (C2) y el otro queda en C5.",
            "exp": "El -OH define el C1. Numerando en sentido horario encontramos metilos en C2 y C5: 2,5-dimetilfenol.",
            "distractors": [
                "3,5-dimetilfenol",
                "2,4-dimetilfenol",
                "1,4-dimetilfenol"
            ]
        },
        {
            "id": "4-2-5",
            "names": [
                "3,5-dimetilfenol",
                "3,5-xilenol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH",
                    "3": "CH3",
                    "5": "CH3"
                }
            },
            "hint": "Ejemplo directo de la página 21 del PDF: -OH en C1 y dos metilos simétricos en 3 y 5.",
            "exp": "Fenol con dos grupos metilo en las posiciones 3 y 5: 3,5-dimetilfenol (o 3,5-xilenol).",
            "distractors": [
                "2,5-dimetilfenol",
                "2,6-dimetilfenol",
                "m-xileno"
            ]
        },
        {
            "id": "4-2-6",
            "names": [
                "4-clorofenol",
                "p-clorofenol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH",
                    "4": "Cl"
                }
            },
            "hint": "Fenol (-OH en C1) con un átomo de cloro en el extremo opuesto (C4 = para).",
            "exp": "Fenol sustituido en posición 4 (para) con cloro: 4-clorofenol (o p-clorofenol).",
            "distractors": [
                "2-clorofenol",
                "3-clorofenol",
                "clorobenceno"
            ]
        }
    ],
    "4-3": [
        {
            "id": "4-3-1",
            "names": [
                "dietiléter",
                "etoxietano",
                "éter dietílico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Oxígeno puente (-O-) con dos cadenas de etilo a cada lado.",
            "exp": "Dos radicales etilo unidos a un oxígeno: dietiléter (por radicales) o etoxietano (sustitutiva).",
            "distractors": [
                "dimetiléter",
                "etil metil éter",
                "butanona"
            ]
        },
        {
            "id": "4-3-2",
            "names": [
                "etil metil éter",
                "metoxietano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "A un lado del oxígeno hay un metilo (1 C) y al otro un etilo (2 C). Cítalos en orden alfabético.",
            "exp": "Radicales etil y metil en orden alfabético: etil metil éter (o metoxietano).",
            "distractors": [
                "dietiléter",
                "metil propil éter",
                "dimetiléter"
            ]
        },
        {
            "id": "4-3-3",
            "names": [
                "metil propil éter",
                "1-metoxipropano",
                "metoxipropano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Un metilo (1 C) a la izquierda del oxígeno y un propilo (3 C) a la derecha.",
            "exp": "Éter formado por metilo y propilo: metil propil éter (o 1-metoxipropano).",
            "distractors": [
                "etil propil éter",
                "etil metil éter",
                "dipropiléter"
            ]
        },
        {
            "id": "4-3-4",
            "names": [
                "fenil metil éter",
                "metoxibenceno",
                "anisol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "O-CH3"
                }
            },
            "hint": "Oxígeno unido por un lado al anillo de benceno (fenil) y por el otro a un metilo.",
            "exp": "Ejemplo de la página 21 del PDF: fenil metil éter o metoxibenceno (también llamado anisol).",
            "distractors": [
                "fenol",
                "tolueno",
                "bencil metil éter"
            ]
        },
        {
            "id": "4-3-5",
            "names": [
                "etil isopropil éter",
                "2-etoxipropano",
                "isopropil etil éter"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "A la izquierda del -O- hay un etilo y a la derecha un isopropilo (-CH(CH3)2).",
            "exp": "Éter con radical etilo e isopropilo: etil isopropil éter (o 2-etoxipropano).",
            "distractors": [
                "etil propil éter",
                "dietiléter",
                "metil isopropil éter"
            ]
        },
        {
            "id": "4-3-6",
            "names": [
                "dimetiléter",
                "metoximetano",
                "éter dimetílico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "El éter más pequeño posible: dos grupos metilo unidos al oxígeno.",
            "exp": "Dos metilos unidos al puente de oxígeno: dimetiléter o metoximetano.",
            "distractors": [
                "dietiléter",
                "etanol",
                "propanona"
            ]
        }
    ],
    "5-1": [
        {
            "id": "5-1-1",
            "names": [
                "metanal",
                "formaldehído",
                "formaldehido"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Aldehído de 1 solo carbono (H-CHO). En disolución acuosa es el famoso formol.",
            "exp": "Aldehído de 1 carbono: metanal. Su nombre común aceptado por la IUPAC es formaldehído.",
            "distractors": [
                "etanal (acetaldehído)",
                "metanol",
                "ácido fórmico"
            ]
        },
        {
            "id": "5-1-2",
            "names": [
                "etanal",
                "acetaldehído",
                "acetaldehido"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Aldehído de 2 átomos de carbono (CH3-CHO).",
            "exp": "2 carbonos con grupo aldehído (-CHO): etanal o acetaldehído.",
            "distractors": [
                "metanal (formaldehído)",
                "propanal",
                "etanol"
            ]
        },
        {
            "id": "5-1-3",
            "names": [
                "propanal",
                "propionaldehído"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Cuenta TODOS los carbonos incluyendo el del grupo -CHO: son 3 carbonos en total.",
            "exp": "Cadena de 3 carbonos terminada en -CHO: propanal.",
            "distractors": [
                "etanal",
                "butanal",
                "propanona"
            ]
        },
        {
            "id": "5-1-4",
            "names": [
                "butanal",
                "butiraldehído"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Aldehído lineal de 4 átomos de carbono totales.",
            "exp": "4 carbonos con grupo carbonilo en el extremo: butanal.",
            "distractors": [
                "propanal",
                "pentanal",
                "butanona"
            ]
        },
        {
            "id": "5-1-5",
            "names": [
                "benzaldehído",
                "benzaldehido",
                "bencenocarbaldehído"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CHO"
                }
            },
            "hint": "Grupo aldehído (-CHO) unido directamente a un anillo de benceno.",
            "exp": "Aldehído aromático cuyo nombre oficial IUPAC es benzaldehído.",
            "distractors": [
                "ácido benzoico",
                "fenol",
                "acetofenona"
            ]
        },
        {
            "id": "5-1-6",
            "names": [
                "2-metilbutanal"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "¡El carbono del -CHO SIEMPRE es el número 1! Por tanto el metilo de al lado está en C2.",
            "exp": "Numerando desde el carbono del aldehído (C1), la cadena principal tiene 4 C y un metilo en C2: 2-metilbutanal.",
            "distractors": [
                "3-metilbutanal",
                "2-metilpropanal",
                "pentanal"
            ]
        }
    ],
    "5-2": [
        {
            "id": "5-2-1",
            "names": [
                "propanona",
                "acetona",
                "dimetilcetona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "La cetona más sencilla de 3 carbonos. Sus 3 nombres (propanona, acetona, dimetilcetona) entran en UNIZAR.",
            "exp": "Cetona de 3 carbonos: propanona, dimetilcetona o acetona.",
            "distractors": [
                "propanal",
                "butanona",
                "2-propanol"
            ]
        },
        {
            "id": "5-2-2",
            "names": [
                "butanona",
                "etil metil cetona",
                "2-butanona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cetona de 4 carbonos (o un etilo y un metilo unidos al grupo -CO-).",
            "exp": "Cetona de 4 carbonos: butanona (o etil metil cetona).",
            "distractors": [
                "propanona",
                "butanal",
                "2-pentanona"
            ]
        },
        {
            "id": "5-2-3",
            "names": [
                "2-pentanona",
                "pentan-2-ona",
                "metil propil cetona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "5 carbonos y el grupo -CO- está en el carbono 2 (empezando por la izquierda).",
            "exp": "Cadena de 5 carbonos con el grupo carbonilo en C2: 2-pentanona (o metil propil cetona).",
            "distractors": [
                "3-pentanona",
                "4-pentanona",
                "2-hexanona"
            ]
        },
        {
            "id": "5-2-4",
            "names": [
                "3-pentanona",
                "pentan-3-ona",
                "dietilcetona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "5 carbonos con el grupo -CO- justo en el centro (C3), dejando dos etilos a los lados.",
            "exp": "Cetona simétrica de 5 carbonos con carbonilo en C3: 3-pentanona o dietilcetona.",
            "distractors": [
                "2-pentanona",
                "butanona",
                "dietiléter"
            ]
        },
        {
            "id": "5-2-5",
            "names": [
                "2,4-pentanodiona",
                "pentano-2,4-diona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Ejemplo directo de la página 22 del PDF: tiene DOS grupos cetona (-CO-) en las posiciones 2 y 4.",
            "exp": "Dicetona de 5 carbonos con grupos carbonilo en C2 y C4: 2,4-pentanodiona.",
            "distractors": [
                "2-pentanona",
                "1,5-pentanodiona",
                "2,3-butanodiona"
            ]
        },
        {
            "id": "5-2-6",
            "names": [
                "2-hexanona",
                "hexan-2-ona",
                "butil metil cetona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cadena de 6 carbonos con el carbonilo en la posición 2.",
            "exp": "Cetona de 6 carbonos con el grupo -CO- en C2: 2-hexanona.",
            "distractors": [
                "3-hexanona",
                "2-pentanona",
                "hexanal"
            ]
        }
    ],
    "5-3": [
        {
            "id": "5-3-1",
            "names": [
                "ácido metanoico",
                "acido metanoico",
                "ácido fórmico",
                "acido formico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ácido carboxílico de 1 solo carbono (H-COOH). Nombre común: ácido fórmico (de las hormigas).",
            "exp": "1 carbono con grupo carboxilo: ácido metanoico o ácido fórmico.",
            "distractors": [
                "ácido etanoico (acético)",
                "metanal (formaldehído)",
                "metanol"
            ]
        },
        {
            "id": "5-3-2",
            "names": [
                "ácido etanoico",
                "acido etanoico",
                "ácido acético",
                "acido acetico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "El ácido del vinagre (2 átomos de carbono totales).",
            "exp": "Ácido carboxílico de 2 carbonos: ácido etanoico, universalmente llamado ácido acético.",
            "distractors": [
                "ácido metanoico (fórmico)",
                "ácido propanoico",
                "etanal"
            ]
        },
        {
            "id": "5-3-3",
            "names": [
                "ácido propenoico",
                "acido propenoico",
                "ácido acrílico",
                "acido acrilico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ácido de 3 carbonos con un doble enlace (página 22 del PDF: ácido acrílico).",
            "exp": "Ácido insaturado de 3 carbonos: ácido propenoico o ácido acrílico.",
            "distractors": [
                "ácido propanoico",
                "ácido butenoico",
                "propenal"
            ]
        },
        {
            "id": "5-3-4",
            "names": [
                "ácido butanoico",
                "acido butanoico",
                "ácido butírico",
                "acido butirico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ácido carboxílico lineal de 4 átomos de carbono totales.",
            "exp": "4 carbonos con grupo -COOH: ácido butanoico (o ácido butírico).",
            "distractors": [
                "ácido propanoico",
                "ácido pentanoico",
                "butanal"
            ]
        },
        {
            "id": "5-3-5",
            "names": [
                "ácido benzoico",
                "acido benzoico",
                "ácido bencenocarboxílico"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "COOH"
                }
            },
            "hint": "Grupo ácido carboxílico (-COOH) unido directamente al anillo de benceno.",
            "exp": "El ácido aromático por excelencia: ácido benzoico.",
            "distractors": [
                "benzaldehído",
                "fenol",
                "benzoato de sodio"
            ]
        },
        {
            "id": "5-3-6",
            "names": [
                "etanoato de sodio",
                "acetato de sodio"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "COONa"
                    }
                ]
            },
            "hint": "Sal orgánica del ácido acético donde el H se ha sustituido por Sodio (Na).",
            "exp": "Se cambia la terminación '-oico' por '-ato de sodio': etanoato de sodio o acetato de sodio.",
            "distractors": [
                "ácido acético",
                "metanoato de sodio",
                "benzoato de sodio"
            ]
        }
    ],
    "5-4": [
        {
            "id": "5-4-1",
            "names": [
                "metanoato de etilo",
                "formiato de etilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "La parte del ácido (izquierda, con el C del COO) tiene 1 carbono (metanoato) y el radical unido al O tiene 2 C (etilo).",
            "exp": "Derivado del ácido metanoico (1 C) con un radical etilo (2 C): metanoato de etilo (o formiato de etilo).",
            "distractors": [
                "etanoato de metilo",
                "etanoato de etilo",
                "ácido propanoico"
            ]
        },
        {
            "id": "5-4-2",
            "names": [
                "etanoato de metilo",
                "acetato de metilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "¡No lo confundas con el anterior! Aquí la parte ácida tiene 2 C (CH3-COO = etanoato) y el radical derecho tiene 1 C (metilo).",
            "exp": "Parte ácida de 2 carbonos (etanoato/acetato) y radical de 1 carbono (metilo): etanoato de metilo.",
            "distractors": [
                "metanoato de etilo",
                "propanoato de metilo",
                "dimetilcetona"
            ]
        },
        {
            "id": "5-4-3",
            "names": [
                "propanoato de metilo",
                "propionato de metilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "A la izquierda (incluyendo el C del COO) hay 3 carbonos (propanoato) y a la derecha 1 carbono (metilo).",
            "exp": "Éster de 3 carbonos en el ácido y 1 en el alcohol: propanoato de metilo.",
            "distractors": [
                "etanoato de etilo",
                "metanoato de propilo",
                "butanoato de metilo"
            ]
        },
        {
            "id": "5-4-4",
            "names": [
                "butanoato de etilo",
                "butirato de etilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Ejemplo directo de la página 23 del PDF: 4 C en la cadena del ácido (butanoato) y 2 C tras el oxígeno (etilo).",
            "exp": "Cadena ácida de 4 C (butanoato) + radical de 2 C (etilo): butanoato de etilo (aroma de piña).",
            "distractors": [
                "etanoato de butilo",
                "propanoato de etilo",
                "butanoato de metilo"
            ]
        },
        {
            "id": "5-4-5",
            "names": [
                "metanoato de isopropilo",
                "formiato de isopropilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Sale en el ejercicio 14 l) del PDF: H-COO- unido a un grupo isopropilo (-CH(CH3)2).",
            "exp": "Ácido de 1 carbono (metanoato) esterificado con un radical isopropilo: metanoato de isopropilo.",
            "distractors": [
                "etanoato de isopropilo",
                "metanoato de propilo",
                "isopropanoato de metilo"
            ]
        },
        {
            "id": "5-4-6",
            "names": [
                "benzoato de sodio"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "COONa"
                }
            },
            "hint": "Sal sódica del ácido benzoico (ejercicio 13 b) del PDF).",
            "exp": "Anillo de benceno con grupo carboxilato de sodio (-COONa): benzoato de sodio.",
            "distractors": [
                "ácido benzoico",
                "acetato de sodio",
                "benzaldehído"
            ]
        }
    ],
    "6-1": [
        {
            "id": "6-1-1",
            "names": [
                "propilamina",
                "1-propanamina",
                "propan-1-amina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "NH2"
                    }
                ]
            },
            "hint": "Amina primaria con una cadena lineal de 3 átomos de carbono.",
            "exp": "Radical propilo unido al grupo amino (-NH2): propilamina.",
            "distractors": [
                "etilamina",
                "isopropilamina",
                "propanamida"
            ]
        },
        {
            "id": "6-1-2",
            "names": [
                "isopropilamina",
                "2-propanamina",
                "propan-2-amina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "NH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Ejercicio 16 j) del PDF: el grupo -NH2 cuelga del carbono central de una cadena de 3 C.",
            "exp": "Amina unida al carbono secundario del propano: isopropilamina o 2-propanamina.",
            "distractors": [
                "propilamina",
                "trimetilamina",
                "etilmetilamina"
            ]
        },
        {
            "id": "6-1-3",
            "names": [
                "dietilamina",
                "N-etiletanamina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "NH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Amina secundaria simétrica con dos grupos etilo unidos al -NH-.",
            "exp": "Dos radicales etilo unidos al nitrógeno: dietilamina.",
            "distractors": [
                "trietilamina",
                "etilamina",
                "dimetilamina"
            ]
        },
        {
            "id": "6-1-4",
            "names": [
                "trimetilamina",
                "N,N-dimetilmetanamina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "N",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Amina terciaria con tres grupos metilo unidos al átomo de nitrógeno.",
            "exp": "Tres radicales metilo sustituyendo los hidrógenos del amoniaco: trimetilamina.",
            "distractors": [
                "dimetilamina",
                "trietilamina",
                "propilamina"
            ]
        },
        {
            "id": "6-1-5",
            "names": [
                "N-metilpropilamina",
                "N-metil-1-propanamina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "NH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Amina secundaria asimétrica: la cadena larga es de 3 C (propilamina) y en el nitrógeno hay un metilo (N-metil).",
            "exp": "Se toma el radical más largo como principal (propilamina) y el otro se nombra con localizador N-: N-metilpropilamina.",
            "distractors": [
                "dietilamina",
                "butilamina",
                "N-etilmetilamina"
            ]
        },
        {
            "id": "6-1-6",
            "names": [
                "anilina",
                "fenilamina",
                "bencenamina"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "NH2"
                }
            },
            "hint": "Grupo amino (-NH2) unido directamente al anillo de benceno. Su nombre común es obligatorio.",
            "exp": "La fenilamina se conoce universalmente como anilina.",
            "distractors": [
                "fenol",
                "nitrobenceno",
                "benzamida"
            ]
        }
    ],
    "6-2": [
        {
            "id": "6-2-1",
            "names": [
                "etanonitrilo",
                "acetonitrilo",
                "cianuro de metilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "2 carbonos totales (etanonitrilo) o un grupo cianuro unido a un metilo (cianuro de metilo).",
            "exp": "CH3-CN tiene 3 nombres admitidos en la página 25 del PDF: etanonitrilo, cianuro de metilo o acetonitrilo.",
            "distractors": [
                "propanonitrilo",
                "metanonitrilo",
                "etanamina"
            ]
        },
        {
            "id": "6-2-2",
            "names": [
                "propanonitrilo",
                "cianuro de etilo",
                "propionitrilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "¡Ojo! Si dices '-nitrilo' cuentas el carbono del CN (3 C = propanonitrilo). Si dices 'cianuro de', solo cuentas el radical (etilo).",
            "exp": "3 carbonos totales incluyendo el carbono del grupo funcional: propanonitrilo (o cianuro de etilo).",
            "distractors": [
                "etanonitrilo",
                "butanonitrilo",
                "cianuro de propilo"
            ]
        },
        {
            "id": "6-2-3",
            "names": [
                "butanonitrilo",
                "cianuro de propilo",
                "butironitrilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "4 átomos de carbono en total (3 del propilo + 1 del grupo nitrilo).",
            "exp": "Cadena de 4 carbonos con grupo -C≡N terminal: butanonitrilo o cianuro de propilo.",
            "distractors": [
                "propanonitrilo",
                "pentanonitrilo",
                "butanamida"
            ]
        },
        {
            "id": "6-2-4",
            "names": [
                "benzonitrilo",
                "cianuro de fenilo",
                "bencenocarbonitrilo"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "C≡N"
                }
            },
            "hint": "Anillo de benceno unido a un grupo -C≡N (página 25 y ejercicio 15 b) del PDF).",
            "exp": "Cianuro aromático: cianuro de fenilo o benzonitrilo.",
            "distractors": [
                "nitrobenceno",
                "anilina",
                "benzamida"
            ]
        },
        {
            "id": "6-2-5",
            "names": [
                "2-metilpropanonitrilo",
                "cianuro de isopropilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "El carbono del grupo -C≡N es el C1. En el C2 hay un metilo.",
            "exp": "Cadena principal de 3 C (con C1 en el nitrilo) y un metilo en C2: 2-metilpropanonitrilo (o cianuro de isopropilo).",
            "distractors": [
                "butanonitrilo",
                "2-metilbutanonitrilo",
                "isopropilamina"
            ]
        },
        {
            "id": "6-2-6",
            "names": [
                "propenonitrilo",
                "acrilonitrilo",
                "cianuro de vinilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "Doble enlace C=C unido al grupo -C≡N.",
            "exp": "Nitrilo insaturado de 3 carbonos: propenonitrilo, acrilonitrilo o cianuro de vinilo.",
            "distractors": [
                "propanonitrilo",
                "cloruro de vinilo",
                "ácido acrílico"
            ]
        }
    ],
    "6-3": [
        {
            "id": "6-3-1",
            "names": [
                "nitrometano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "NO2"
                    }
                ]
            },
            "hint": "1 carbono (metano) con el grupo nitro (-NO2).",
            "exp": "El grupo -NO2 se nombra siempre con el prefijo 'nitro-': nitrometano.",
            "distractors": [
                "metilamina",
                "nitroetano",
                "etanonitrilo"
            ]
        },
        {
            "id": "6-3-2",
            "names": [
                "1-nitropropano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "NO2"
                    }
                ]
            },
            "hint": "Ejercicio 16 i) del PDF: cadena de 3 carbonos con el grupo -NO2 en el extremo (C1).",
            "exp": "Cadena de 3 carbonos con grupo nitro en la posición 1: 1-nitropropano.",
            "distractors": [
                "2-nitropropano",
                "propilamina",
                "propanonitrilo"
            ]
        },
        {
            "id": "6-3-3",
            "names": [
                "2-nitropropano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "NO2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "El grupo -NO2 cuelga del carbono central (C2) del propano.",
            "exp": "Propano con sustituyente nitro en el carbono 2: 2-nitropropano.",
            "distractors": [
                "1-nitropropano",
                "isopropilamina",
                "2-nitrobutano"
            ]
        },
        {
            "id": "6-3-4",
            "names": [
                "nitrobenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "NO2"
                }
            },
            "hint": "Anillo de benceno con un grupo -NO2.",
            "exp": "Derivado nitrado del benceno: nitrobenceno.",
            "distractors": [
                "anilina",
                "benzonitrilo",
                "ácido benzoico"
            ]
        },
        {
            "id": "6-3-5",
            "names": [
                "1,3-dinitrobenceno",
                "m-dinitrobenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "NO2",
                    "3": "NO2"
                }
            },
            "hint": "Ejercicio 15 c) del PDF: dos grupos -NO2 en posiciones 1 y 3 (meta) del benceno.",
            "exp": "Benceno con dos grupos nitro en posición meta (1,3): 1,3-dinitrobenceno.",
            "distractors": [
                "1,2-dinitrobenceno",
                "1,4-dinitrobenceno",
                "nitrobenceno"
            ]
        },
        {
            "id": "6-3-6",
            "names": [
                "2,4,6-trinitrotolueno",
                "TNT",
                "1-metil-2,4,6-trinitrobenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3",
                    "2": "NO2",
                    "4": "NO2",
                    "6": "NO2"
                }
            },
            "hint": "Ejemplo clásico de la página 25 del PDF: un tolueno (-CH3 en C1) con tres grupos nitro en 2, 4 y 6.",
            "exp": "El famoso explosivo TNT es el 2,4,6-trinitrotolueno.",
            "distractors": [
                "1,3,5-trinitrobenceno",
                "1,3-dinitrobenceno",
                "p-nitrotolueno"
            ]
        }
    ],
    "6-4": [
        {
            "id": "6-4-1",
            "names": [
                "etanamida",
                "acetamida"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CONH2"
                    }
                ]
            },
            "hint": "Amida primaria de 2 átomos de carbono derivada del ácido acético (etanoico).",
            "exp": "Se cambia '-oico' por '-amida': etanamida o acetamida.",
            "distractors": [
                "metanamida",
                "propanamida",
                "etilamina"
            ]
        },
        {
            "id": "6-4-2",
            "names": [
                "propanamida",
                "propionamida"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CONH2"
                    }
                ]
            },
            "hint": "Ejercicio 15 d) del PDF: amida primaria de 3 carbonos totales.",
            "exp": "3 carbonos totales con grupo amida (-CONH2): propanamida.",
            "distractors": [
                "etanamida",
                "butanamida",
                "propilamina"
            ]
        },
        {
            "id": "6-4-3",
            "names": [
                "butanamida",
                "butiramida"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CONH2"
                    }
                ]
            },
            "hint": "Ejemplo de la página 25 del PDF: amida de 4 átomos de carbono.",
            "exp": "Derivada del ácido butanoico (o butírico): butanamida o butiramida.",
            "distractors": [
                "propanamida",
                "pentanamida",
                "butilamina"
            ]
        },
        {
            "id": "6-4-4",
            "names": [
                "benzamida",
                "bencenocarboxamida"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CONH2"
                }
            },
            "hint": "Ejercicio 16 l) del PDF: anillo de benceno con grupo amida (-CONH2).",
            "exp": "Amida derivada del ácido benzoico: benzamida.",
            "distractors": [
                "anilina",
                "ácido benzoico",
                "benzonitrilo"
            ]
        },
        {
            "id": "6-4-5",
            "names": [
                "metanamida",
                "formamida"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "CONH2"
                    }
                ]
            },
            "hint": "La amida más sencilla de 1 solo átomo de carbono (derivada del ácido fórmico).",
            "exp": "1 carbono con grupo -CONH2: metanamida o formamida.",
            "distractors": [
                "etanamida",
                "metilamina",
                "metanal"
            ]
        },
        {
            "id": "6-4-6",
            "names": [
                "2-metilpropanamida",
                "isobutiramida"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CONH2"
                    }
                ]
            },
            "hint": "El carbono del -CONH2 es siempre el C1. En el C2 lleva un metilo.",
            "exp": "Cadena principal de 3 carbonos (propanamida) con un metilo en posición 2: 2-metilpropanamida.",
            "distractors": [
                "butanamida",
                "3-metilbutanamida",
                "isopropilamina"
            ]
        }
    ],
    "7-1": [
        {
            "id": "7-1-1",
            "names": [
                "ácido 3-hidroxibutanoico",
                "acido 3-hidroxibutanoico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ejemplo de la página 23 del PDF: hay un ácido (-COOH) y un alcohol (-OH). ¡El ácido MANDA (C1) y el alcohol pasa a ser 'hidroxi'!",
            "exp": "Por la tabla de prioridad, el ácido carboxílico es la función principal (C1 a la derecha) y el -OH en C3 se nombra como prefijo: ácido 3-hidroxibutanoico.",
            "distractors": [
                "ácido 2-hidroxibutanoico",
                "4-hidroxibutanal",
                "3-carboxi-2-butanol"
            ]
        },
        {
            "id": "7-1-2",
            "names": [
                "ácido 4-hidroxihexanoico",
                "acido 4-hidroxihexanoico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ejemplo de la página 20 del PDF: cadena de 6 carbonos contando desde el -COOH (C1). El -OH cae en el C4.",
            "exp": "Cadena de 6 C con grupo ácido en C1 y grupo alcohol subordinado en C4: ácido 4-hidroxihexanoico.",
            "distractors": [
                "ácido 3-hidroxihexanoico",
                "ácido 4-hidroxipentanoico",
                "hexano-1,4-diol"
            ]
        },
        {
            "id": "7-1-3",
            "names": [
                "ácido 2-hidroxipropanoico",
                "acido 2-hidroxipropanoico",
                "ácido láctico",
                "acido lactico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ácido de 3 carbonos con un grupo -OH en el carbono 2 (es el famoso ácido láctico).",
            "exp": "El -COOH es C1 y en C2 hay un grupo hidroxi: ácido 2-hidroxipropanoico (ácido láctico).",
            "distractors": [
                "ácido 3-hidroxipropanoico",
                "ácido propanoico",
                "2-hidroxipropanal"
            ]
        },
        {
            "id": "7-1-4",
            "names": [
                "ácido 3-oxobutanoico",
                "acido 3-oxobutanoico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Compiten ácido (-COOH) y cetona (-CO-). Gana el ácido (C1) y la cetona en C3 se nombra con el prefijo 'oxo-'.",
            "exp": "El ácido manda sobre la cetona; el carbonilo en C3 pasa a ser sustituyente 'oxo': ácido 3-oxobutanoico.",
            "distractors": [
                "ácido 2-oxobutanoico",
                "3-oxobutanal",
                "2,4-butanodiona"
            ]
        },
        {
            "id": "7-1-5",
            "names": [
                "ácido 4-oxopentanoico",
                "acido 4-oxopentanoico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "5 carbonos totales empezando por el -COOH (C1). El grupo cetona (-CO-) está en el carbono 4.",
            "exp": "Ácido carboxílico de 5 C con un grupo oxo en posición 4: ácido 4-oxopentanoico.",
            "distractors": [
                "ácido 2-oxopentanoico",
                "ácido 3-oxopentanoico",
                "4-oxopentanal"
            ]
        },
        {
            "id": "7-1-6",
            "names": [
                "ácido 2-hidroxibenzoico",
                "acido 2-hidroxibenzoico",
                "ácido o-hidroxibenzoico",
                "ácido salicílico"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "COOH",
                    "2": "OH"
                }
            },
            "hint": "En el anillo de benceno hay un -COOH (prioridad 1) y un -OH al lado (C2).",
            "exp": "El ácido benzoico manda (C1) y el fenol en C2 se nombra como hidroxi: ácido 2-hidroxibenzoico (ácido salicílico).",
            "distractors": [
                "ácido 3-hidroxibenzoico",
                "2-carboxifenol",
                "ácido benzoico"
            ]
        }
    ],
    "7-2": [
        {
            "id": "7-2-1",
            "names": [
                "3-butenal",
                "but-3-enal"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "El aldehído (-CHO) tiene mucha más prioridad que el doble enlace, así que el -CHO es el C1.",
            "exp": "Numerando desde el -CHO (C1), el doble enlace empieza en el C3: 3-butenal.",
            "distractors": [
                "1-buten-4-al",
                "2-butenal",
                "3-buten-1-ol"
            ]
        },
        {
            "id": "7-2-2",
            "names": [
                "3-clorobutanal"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "Cl"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Aldehído en C1 (derecha) y un átomo de cloro en el carbono 3.",
            "exp": "El grupo -CHO define el C1. El cloro queda en la posición 3: 3-clorobutanal.",
            "distractors": [
                "2-clorobutanal",
                "3-clorobutanona",
                "2-clorobutano"
            ]
        },
        {
            "id": "7-2-3",
            "names": [
                "4-metoxibutanal"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Hay un aldehído (-CHO) y un éter (CH3-O-). El aldehído manda (C1) y el éter en C4 se nombra como 'metoxi'.",
            "exp": "Cadena principal de 4 C con aldehído en C1 y grupo metoxi (CH3-O-) unido al C4: 4-metoxibutanal.",
            "distractors": [
                "1-metoxibutanal",
                "3-metoxipropanal",
                "metil butanal éter"
            ]
        },
        {
            "id": "7-2-4",
            "names": [
                "2-cloropropanoato de metilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "Cl"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Es un éster (-COO-CH3) cuya cadena ácida tiene 3 carbonos y lleva un cloro en el C2.",
            "exp": "El carbono del grupo -COO- es el C1 del ácido; en C2 lleva un cloro: 2-cloropropanoato de metilo.",
            "distractors": [
                "3-cloropropanoato de metilo",
                "2-cloroetanoato de metilo",
                "ácido 2-cloropropanoico"
            ]
        },
        {
            "id": "7-2-5",
            "names": [
                "4-oxopentanoato de metilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Compiten éster (-COO-CH3, prioridad 2) y cetona (-CO-, prioridad 6). ¡Manda el éster!",
            "exp": "El éster es la función principal (pentanoato de metilo, C1 en el COO) y la cetona en C4 es 'oxo': 4-oxopentanoato de metilo.",
            "distractors": [
                "2-oxopentanoato de metilo",
                "ácido 4-oxopentanoico",
                "2,5-hexanodiona"
            ]
        },
        {
            "id": "7-2-6",
            "names": [
                "ácido 2-butenoico",
                "acido 2-butenoico",
                "ácido but-2-enoico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ácido carboxílico de 4 carbonos con un doble enlace entre el C2 y el C3.",
            "exp": "El carbono del -COOH es el C1 y el doble enlace está en C2: ácido 2-butenoico.",
            "distractors": [
                "ácido 3-butenoico",
                "ácido butanoico",
                "2-butenal"
            ]
        }
    ],
    "7-3": [
        {
            "id": "7-3-1",
            "names": [
                "ácido 2-aminopropanoico",
                "acido 2-aminopropanoico",
                "alanina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "NH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Compiten ácido (-COOH) y amina (-NH2). El ácido manda (C1) y la amina pasa a ser prefijo 'amino-' en C2.",
            "exp": "Aminoácido natural (alanina): el ácido es la función principal y el grupo -NH2 en C2 es 'amino' -> ácido 2-aminopropanoico.",
            "distractors": [
                "2-карboxietilamina",
                "ácido 3-aminopropanoico",
                "2-hidroxipropanamida"
            ]
        },
        {
            "id": "7-3-2",
            "names": [
                "2-aminoetanol",
                "etanolamina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H2N"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "OH"
                    }
                ]
            },
            "hint": "Mira la tabla de prioridad: Alcohol (puesto 7) > Amina (puesto 8). ¡El alcohol manda y lleva el C1!",
            "exp": "El alcohol (-OH) tiene prioridad sobre la amina (-NH2), por lo que es un etanol (C1 en el OH) con un grupo amino en C2: 2-aminoetanol.",
            "distractors": [
                "2-hidroxietilamina",
                "1-aminoetanol",
                "etanamida"
            ]
        },
        {
            "id": "7-3-3",
            "names": [
                "3-oxobutanonitrilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "En la tabla de prioridad: Nitrilo (puesto 4) > Cetona (puesto 6). El carbono del -C≡N es el C1.",
            "exp": "El nitrilo manda sobre la cetona. Contando desde el carbono del -CN (C1), hay 4 carbonos y un grupo 'oxo' en C3: 3-oxobutanonitrilo.",
            "distractors": [
                "2-oxobutanonitrilo",
                "1-ciano-2-propanona",
                "3-oxobutanamida"
            ]
        },
        {
            "id": "7-3-4",
            "names": [
                "3-hidroxibutanal"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CHO"
                    }
                ]
            },
            "hint": "Compiten aldehído (-CHO, puesto 5) y alcohol (-OH, puesto 7). ¡Manda el aldehído!",
            "exp": "El aldehído es el grupo principal (C1 en el -CHO) y el alcohol en C3 se nombra como 'hidroxi': 3-hidroxibutanal.",
            "distractors": [
                "2-hidroxibutanal",
                "4-oxobutanol",
                "ácido 3-hidroxibutanoico"
            ]
        },
        {
            "id": "7-3-5",
            "names": [
                "4-hidroxi-2-butanona",
                "4-hidroxibutan-2-ona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "HO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Cetona (puesto 6) > Alcohol (puesto 7). Numera desde la derecha para que la cetona sea el C2.",
            "exp": "La cetona manda sobre el alcohol: numerando desde la derecha, la cetona está en C2 y el grupo hidroxi en C4 -> 4-hidroxi-2-butanona.",
            "distractors": [
                "1-hidroxi-3-butanona",
                "3-oxo-1-butanol",
                "4-hidroxibutanal"
            ]
        },
        {
            "id": "7-3-6",
            "names": [
                "ácido 4-aminobenzoico",
                "acido 4-aminobenzoico",
                "ácido p-aminobenzoico"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "COOH",
                    "4": "NH2"
                }
            },
            "hint": "Benceno con -COOH en C1 y un grupo -NH2 en el extremo opuesto (C4 = para).",
            "exp": "El ácido benzoico manda (C1) y la amina en posición 4 (para) es un sustituyente 'amino': ácido 4-aminobenzoico.",
            "distractors": [
                "4-carboxianilina",
                "ácido 2-aminobenzoico",
                "p-aminobenzamida"
            ]
        }
    ],
    "8-1": [
        {
            "id": "1-2-3",
            "names": [
                "2,2,4-trimetilpentano",
                "isooctano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "C",
                        "top": "CH3",
                        "bottom": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Por la izquierda tienes dos metilos en C2 (2,2,4) y por la derecha solo uno (2,4,4). ¡Gana (2,2,4)!",
            "exp": "Famoso como 'isooctano' de la gasolina: cadena de 5 C con tres metilos en las posiciones 2, 2 y 4 -> 2,2,4-trimetilpentano.",
            "distractors": [
                "2,4,4-trimetilpentano",
                "2,2,4-trimetilhexano",
                "2,4-dimetilpentano"
            ]
        },
        {
            "id": "2-3-3",
            "names": [
                "cis-2-penteno",
                "cis-pent-2-eno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH3",
                "bl": "H",
                "tr": "CH2-CH3",
                "br": "H"
            },
            "hint": "Suma todos los carbonos de la cadena: 1 (izq) + 2 (centrales) + 2 (der) = 5 carbonos totales. Ambos grupos carbonados están arriba.",
            "exp": "Cadena total de 5 carbonos con el doble enlace en C2 y ambos radicales alquilo hacia el mismo lado (arriba): cis-2-penteno.",
            "distractors": [
                "trans-2-penteno",
                "cis-2-buteno",
                "cis-3-hexeno"
            ]
        },
        {
            "id": "3-2-2",
            "names": [
                "m-xileno",
                "meta-xileno",
                "1,3-dimetilbenceno",
                "m-dimetilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3",
                    "3": "CH3"
                }
            },
            "hint": "Dos grupos metilo separados por un vértice vacío (posiciones 1 y 3 = meta).",
            "exp": "Posiciones 1 y 3 en el benceno corresponden al prefijo 'meta-': m-xileno o 1,3-dimetilbenceno.",
            "distractors": [
                "o-xileno (1,2-dimetilbenceno)",
                "p-xileno (1,4-dimetilbenceno)",
                "tolueno"
            ]
        },
        {
            "id": "4-3-3",
            "names": [
                "metil propil éter",
                "1-metoxipropano",
                "metoxipropano"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "O"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Un metilo (1 C) a la izquierda del oxígeno y un propilo (3 C) a la derecha.",
            "exp": "Éter formado por metilo y propilo: metil propil éter (o 1-metoxipropano).",
            "distractors": [
                "etil propil éter",
                "etil metil éter",
                "dipropiléter"
            ]
        },
        {
            "id": "5-4-1",
            "names": [
                "metanoato de etilo",
                "formiato de etilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "La parte del ácido (izquierda, con el C del COO) tiene 1 carbono (metanoato) y el radical unido al O tiene 2 C (etilo).",
            "exp": "Derivado del ácido metanoico (1 C) con un radical etilo (2 C): metanoato de etilo (o formiato de etilo).",
            "distractors": [
                "etanoato de metilo",
                "etanoato de etilo",
                "ácido propanoico"
            ]
        },
        {
            "id": "6-1-5",
            "names": [
                "N-metilpropilamina",
                "N-metil-1-propanamina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "NH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Amina secundaria asimétrica: la cadena larga es de 3 C (propilamina) y en el nitrógeno hay un metilo (N-metil).",
            "exp": "Se toma el radical más largo como principal (propilamina) y el otro se nombra con localizador N-: N-metilpropilamina.",
            "distractors": [
                "dietilamina",
                "butilamina",
                "N-etilmetilamina"
            ]
        },
        {
            "id": "7-1-1",
            "names": [
                "ácido 3-hidroxibutanoico",
                "acido 3-hidroxibutanoico"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "OH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Ejemplo de la página 23 del PDF: hay un ácido (-COOH) y un alcohol (-OH). ¡El ácido MANDA (C1) y el alcohol pasa a ser 'hidroxi'!",
            "exp": "Por la tabla de prioridad, el ácido carboxílico es la función principal (C1 a la derecha) y el -OH en C3 se nombra como prefijo: ácido 3-hidroxibutanoico.",
            "distractors": [
                "ácido 2-hidroxibutanoico",
                "4-hidroxibutanal",
                "3-carboxi-2-butanol"
            ]
        }
    ],
    "8-2": [
        {
            "id": "2-2-4",
            "names": [
                "1-penten-4-ino",
                "pent-1-en-4-ino"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH2",
                        "bond": "="
                    },
                    {
                        "label": "CH"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "CH"
                    }
                ]
            },
            "hint": "¡EMPATE en los extremos! Cuando el doble y el triple enlace empatan en posición (1 y 4), el DOBLE enlace gana el 1.",
            "exp": "En caso de empate en los localizadores de los extremos, se da preferencia al doble enlace (C1) sobre el triple (C4): 1-penten-4-ino.",
            "distractors": [
                "4-penten-1-ino",
                "1-pentin-4-eno",
                "2-penten-4-ino"
            ]
        },
        {
            "id": "3-1-3",
            "names": [
                "estireno",
                "vinilbenceno",
                "etenilbenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH=CH2"
                }
            },
            "hint": "Benceno con un grupo vinilo (-CH=CH2). Es el monómero del famoso plástico poliestireno.",
            "exp": "El vinilbenceno (o etenilbenceno) tiene el nombre común oficial de estireno.",
            "distractors": [
                "tolueno",
                "etilbenceno",
                "cumeno"
            ]
        },
        {
            "id": "4-2-5",
            "names": [
                "3,5-dimetilfenol",
                "3,5-xilenol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "OH",
                    "3": "CH3",
                    "5": "CH3"
                }
            },
            "hint": "Ejemplo directo de la página 21 del PDF: -OH en C1 y dos metilos simétricos en 3 y 5.",
            "exp": "Fenol con dos grupos metilo en las posiciones 3 y 5: 3,5-dimetilfenol (o 3,5-xilenol).",
            "distractors": [
                "2,5-dimetilfenol",
                "2,6-dimetilfenol",
                "m-xileno"
            ]
        },
        {
            "id": "5-2-5",
            "names": [
                "2,4-pentanodiona",
                "pentano-2,4-diona"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Ejemplo directo de la página 22 del PDF: tiene DOS grupos cetona (-CO-) en las posiciones 2 y 4.",
            "exp": "Dicetona de 5 carbonos con grupos carbonilo en C2 y C4: 2,4-pentanodiona.",
            "distractors": [
                "2-pentanona",
                "1,5-pentanodiona",
                "2,3-butanodiona"
            ]
        },
        {
            "id": "5-4-4",
            "names": [
                "butanoato de etilo",
                "butirato de etilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Ejemplo directo de la página 23 del PDF: 4 C en la cadena del ácido (butanoato) y 2 C tras el oxígeno (etilo).",
            "exp": "Cadena ácida de 4 C (butanoato) + radical de 2 C (etilo): butanoato de etilo (aroma de piña).",
            "distractors": [
                "etanoato de butilo",
                "propanoato de etilo",
                "butanoato de metilo"
            ]
        },
        {
            "id": "6-2-4",
            "names": [
                "benzonitrilo",
                "cianuro de fenilo",
                "bencenocarbonitrilo"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "C≡N"
                }
            },
            "hint": "Anillo de benceno unido a un grupo -C≡N (página 25 y ejercicio 15 b) del PDF).",
            "exp": "Cianuro aromático: cianuro de fenilo o benzonitrilo.",
            "distractors": [
                "nitrobenceno",
                "anilina",
                "benzamida"
            ]
        },
        {
            "id": "7-2-5",
            "names": [
                "4-oxopentanoato de metilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Compiten éster (-COO-CH3, prioridad 2) y cetona (-CO-, prioridad 6). ¡Manda el éster!",
            "exp": "El éster es la función principal (pentanoato de metilo, C1 en el COO) y la cetona en C4 es 'oxo': 4-oxopentanoato de metilo.",
            "distractors": [
                "2-oxopentanoato de metilo",
                "ácido 4-oxopentanoico",
                "2,5-hexanodiona"
            ]
        }
    ],
    "8-3": [
        {
            "id": "1-3-5",
            "names": [
                "isopropilciclopentano",
                "1-isopropilciclopentano"
            ],
            "spec": {
                "type": "cyclo",
                "ringSize": 5,
                "subs": {
                    "1": "CH(CH3)2"
                }
            },
            "hint": "Sale directamente en los ejercicios del PDF: anillo de 5 C con el grupo isopropilo.",
            "exp": "Anillo de 5 carbonos (ciclopentano) unido a un radical isopropilo: isopropilciclopentano.",
            "distractors": [
                "propilciclopentano",
                "isopropilciclohexano",
                "isopropilbenceno"
            ]
        },
        {
            "id": "2-3-2",
            "names": [
                "trans-2-buteno",
                "trans-but-2-eno",
                "(E)-2-buteno"
            ],
            "spec": {
                "type": "cistrans",
                "tl": "CH3",
                "bl": "H",
                "tr": "H",
                "br": "CH3"
            },
            "hint": "Un grupo -CH3 está arriba a la izquierda y el otro está abajo a la derecha (en diagonal / lados opuestos).",
            "exp": "Los dos grupos metilo se encuentran en lados opuestos del doble enlace, por tanto es el isómero trans: trans-2-buteno.",
            "distractors": [
                "cis-2-buteno",
                "trans-2-penteno",
                "trans-1-buteno"
            ]
        },
        {
            "id": "3-2-5",
            "names": [
                "1-bromo-3-clorobenceno",
                "m-bromoclorobenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "Br",
                    "3": "Cl"
                }
            },
            "hint": "Bromo en C1 y Cloro en C3 (posición meta). 'bromo' va antes que 'cloro' alfabéticamente.",
            "exp": "Derivado aromático halogenado en posiciones 1 y 3: 1-bromo-3-clorobenceno (o m-bromoclorobenceno).",
            "distractors": [
                "1-bromo-2-clorobenceno",
                "1-bromo-4-clorobenceno",
                "1-cloro-3-bromobenceno"
            ]
        },
        {
            "id": "4-3-4",
            "names": [
                "fenil metil éter",
                "metoxibenceno",
                "anisol"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "O-CH3"
                }
            },
            "hint": "Oxígeno unido por un lado al anillo de benceno (fenil) y por el otro a un metilo.",
            "exp": "Ejemplo de la página 21 del PDF: fenil metil éter o metoxibenceno (también llamado anisol).",
            "distractors": [
                "fenol",
                "tolueno",
                "bencil metil éter"
            ]
        },
        {
            "id": "5-4-5",
            "names": [
                "metanoato de isopropilo",
                "formiato de isopropilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "H"
                    },
                    {
                        "label": "COO"
                    },
                    {
                        "label": "CH",
                        "top": "CH3"
                    },
                    {
                        "label": "CH3"
                    }
                ]
            },
            "hint": "Sale en el ejercicio 14 l) del PDF: H-COO- unido a un grupo isopropilo (-CH(CH3)2).",
            "exp": "Ácido de 1 carbono (metanoato) esterificado con un radical isopropilo: metanoato de isopropilo.",
            "distractors": [
                "etanoato de isopropilo",
                "metanoato de propilo",
                "isopropanoato de metilo"
            ]
        },
        {
            "id": "6-3-6",
            "names": [
                "2,4,6-trinitrotolueno",
                "TNT",
                "1-metil-2,4,6-trinitrobenceno"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CH3",
                    "2": "NO2",
                    "4": "NO2",
                    "6": "NO2"
                }
            },
            "hint": "Ejemplo clásico de la página 25 del PDF: un tolueno (-CH3 en C1) con tres grupos nitro en 2, 4 y 6.",
            "exp": "El famoso explosivo TNT es el 2,4,6-trinitrotolueno.",
            "distractors": [
                "1,3,5-trinitrobenceno",
                "1,3-dinitrobenceno",
                "p-nitrotolueno"
            ]
        },
        {
            "id": "6-4-4",
            "names": [
                "benzamida",
                "bencenocarboxamida"
            ],
            "spec": {
                "type": "benzene",
                "subs": {
                    "1": "CONH2"
                }
            },
            "hint": "Ejercicio 16 l) del PDF: anillo de benceno con grupo amida (-CONH2).",
            "exp": "Amida derivada del ácido benzoico: benzamida.",
            "distractors": [
                "anilina",
                "ácido benzoico",
                "benzonitrilo"
            ]
        },
        {
            "id": "7-3-1",
            "names": [
                "ácido 2-aminopropanoico",
                "acido 2-aminopropanoico",
                "alanina"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CH",
                        "top": "NH2"
                    },
                    {
                        "label": "COOH"
                    }
                ]
            },
            "hint": "Compiten ácido (-COOH) y amina (-NH2). El ácido manda (C1) y la amina pasa a ser prefijo 'amino-' en C2.",
            "exp": "Aminoácido natural (alanina): el ácido es la función principal y el grupo -NH2 en C2 es 'amino' -> ácido 2-aminopropanoico.",
            "distractors": [
                "2-карboxietilamina",
                "ácido 3-aminopropanoico",
                "2-hidroxipropanamida"
            ]
        },
        {
            "id": "7-3-3",
            "names": [
                "3-oxobutanonitrilo"
            ],
            "spec": {
                "type": "chain",
                "nodes": [
                    {
                        "label": "CH3"
                    },
                    {
                        "label": "CO"
                    },
                    {
                        "label": "CH2"
                    },
                    {
                        "label": "C",
                        "bond": "≡"
                    },
                    {
                        "label": "N"
                    }
                ]
            },
            "hint": "En la tabla de prioridad: Nitrilo (puesto 4) > Cetona (puesto 6). El carbono del -C≡N es el C1.",
            "exp": "El nitrilo manda sobre la cetona. Contando desde el carbono del -CN (C1), hay 4 carbonos y un grupo 'oxo' en C3: 3-oxobutanonitrilo.",
            "distractors": [
                "2-oxobutanonitrilo",
                "1-ciano-2-propanona",
                "3-oxobutanamida"
            ]
        }
    ]
};

    // Normaliza texto químico para comparar respuestas escritas con flexibilidad inteligente
    function normalizeChemName(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar tildes (ácido -> acido)
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\s*-\s*/g, '-')
            .replace(/^orto-/, 'o-')
            .replace(/^meta-/, 'm-')
            .replace(/^para-/, 'p-');
    }

    function checkWrittenAnswer(userInput, acceptedNames) {
        const cleanUser = normalizeChemName(userInput);
        if (!cleanUser) return false;
        const cleanUserNoSpaces = cleanUser.replace(/[\s-]/g, '');
        for (const name of acceptedNames) {
            const cleanTarget = normalizeChemName(name);
            if (cleanUser === cleanTarget) return true;
            if (cleanUserNoSpaces === cleanTarget.replace(/[\s-]/g, '')) return true;
        }
        return false;
    }

    function shuffle(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // Construye una partida completa de 12 preguntas bidireccionales para el nivel indicado
    function buildLevelQuestions(levelId) {
        const items = rawLevels[levelId] || rawLevels['1-1'];
        const allPool = Object.values(rawLevels).flat();
        const questions = [];

        // 1. Para cada compuesto del nivel, creamos:
        //    a) Una pregunta de Estructura -> Nombre (Opción múltiple o Escritura)
        //    b) Una pregunta de Nombre -> Estructura (4 dibujos 2D para elegir la estructura correcta)
        items.forEach((item, idx) => {
            // A) ESTRUCTURA -> NOMBRE
            const isWriteQuestion = (idx % 3 === 2); // Cada 3 preguntas, 1 es de escribir el nombre directamente
            const optionsText = shuffle([item.names[0], ...item.distractors.slice(0, 3)]);

            questions.push({
                qId: `${item.id}-s2n`,
                compoundId: item.id,
                mode: isWriteQuestion ? 'write_name' : 'struct_to_name',
                prompt: isWriteQuestion
                    ? 'Escribe el nombre IUPAC (o común aceptado) de esta estructura:'
                    : '¿Cuál es el nombre correcto de la siguiente estructura molecular?',
                spec: item.spec,
                acceptedNames: item.names,
                correctAnswer: item.names[0],
                options: optionsText,
                hint: item.hint,
                explanation: item.explanation
            });

            // B) NOMBRE -> ESTRUCTURA (Elegir el dibujo 2D correcto entre 4 moléculas)
            // Elegimos otros 3 compuestos del mismo nivel (o niveles cercanos) como distractores visuales
            let otherItems = items.filter(x => x.id !== item.id);
            if (otherItems.length < 3) {
                const extras = allPool.filter(x => x.id !== item.id);
                otherItems = [...otherItems, ...shuffle(extras)];
            }
            const pickedDistractors = shuffle(otherItems).slice(0, 3);
            const structOptions = shuffle([
                { id: item.id, spec: item.spec, isCorrect: true, label: item.names[0] },
                ...pickedDistractors.map(d => ({ id: d.id, spec: d.spec, isCorrect: false, label: d.names[0] }))
            ]);

            questions.push({
                qId: `${item.id}-n2s`,
                compoundId: item.id,
                mode: 'name_to_struct',
                prompt: 'Selecciona la estructura química que corresponde a:',
                targetName: item.names[0],
                acceptedNames: item.names,
                structOptions: structOptions,
                hint: item.hint,
                explanation: item.explanation
            });
        });

        return shuffle(questions);
    }

    function getCompoundById(compoundId) {
        const all = Object.values(rawLevels).flat();
        return all.find(x => x.id === compoundId) || null;
    }

    return {
        rawLevels,
        buildLevelQuestions,
        checkWrittenAnswer,
        getCompoundById
    };
})();
