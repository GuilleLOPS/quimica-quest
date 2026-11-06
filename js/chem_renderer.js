/**
 * MOTOR GRÁFICO QUÍMICO 2D (SVG) - QUÍMICA ORGÁNICA UNIZAR
 * Dibuja estructuras semidesarrolladas, anillos bencénicos (Kekulé exactos),
 * cicloalcanos e isómeros geométricos cis/trans con calidad de libro de texto.
 */

window.ChemRenderer = (function () {
    // Formatea subíndices y enlaces especiales para etiquetas SVG
    function formatChemText(str) {
        if (!str) return '';
        // Reemplazar números después de letras o paréntesis por subíndices tspan
        // Pero primero manejamos cargas como Na+ o O-
        let formatted = str
            .replace(/≡/g, '≡')
            .replace(/=/g, '=')
            .replace(/(\d+)/g, '<tspan dy="4" font-size="0.78em">$1</tspan><tspan dy="-4">​</tspan>');
        return formatted;
    }

    /**
     * 1. RENDERIZADOR DE CADENAS CARBONADAS (Lineales y Ramificadas)
     * spec = {
     *   type: 'chain',
     *   nodes: [
     *     { label: 'CH3' },
     *     { label: 'CH', top: 'CH3', bottom: 'Cl', bondNext: '=' },
     *     ...
     *   ]
     * }
     */
    function renderChain(spec) {
        const nodes = spec.nodes || [];
        const n = nodes.length;
        const stepX = n > 6 ? 74 : (n > 5 ? 82 : 90);
        const startX = 55;
        const hasTop = nodes.some(nd => nd.top);
        const hasBottom = nodes.some(nd => nd.bottom);

        const totalWidth = Math.max(320, startX * 2 + (n - 1) * stepX);
        const totalHeight = (hasTop && hasBottom) ? 210 : (hasTop || hasBottom ? 165 : 110);
        const centerY = (hasTop && !hasBottom) ? 115 : (!hasTop && hasBottom ? 55 : Math.round(totalHeight / 2));

        let svg = `<svg viewBox="0 0 ${totalWidth} ${totalHeight}" width="100%" height="100%" class="chem-svg" xmlns="http://www.w3.org/2000/svg">`;

        // Definiciones de estilo
        svg += `
        <style>
            .chem-atom { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 16px; fill: #1e293b; }
            .chem-sub { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-weight: 600; font-size: 14.5px; fill: #0f172a; }
            .chem-fg { fill: #0284c7; font-weight: 800; }
            .chem-bond { stroke: #334155; stroke-width: 2.4; stroke-linecap: round; }
            .chem-bond-hl { stroke: #0284c7; stroke-width: 2.6; stroke-linecap: round; }
        </style>`;

        for (let i = 0; i < n; i++) {
            const nd = nodes[i];
            const x = startX + i * stepX;
            const y = centerY;

            // Determinar si es un grupo funcional destacado
            const isFG = /OH|CHO|COOH|COO|NH|NO2|CN|O\b|Cl|Br|F|I/.test(nd.label);
            const atomClass = isFG ? 'chem-atom chem-fg' : 'chem-atom';

            // Texto del átomo/grupo en la cadena principal
            svg += `<text x="${x}" y="${y + 5}" text-anchor="middle" class="${atomClass}">${formatChemText(nd.label)}</text>`;

            // Enlace hacia el siguiente nodo a la derecha
            if (i < n - 1) {
                const bondType = nd.bond || '-';
                const len1 = (nd.label || '').replace(/[^A-Za-z0-9()]/g, '').length;
                const len2 = (nodes[i + 1].label || '').replace(/[^A-Za-z0-9()]/g, '').length;
                const pad1 = Math.min(28, Math.max(15, len1 * 5.8 + 4));
                const pad2 = Math.min(28, Math.max(15, len2 * 5.8 + 4));

                const x1 = x + pad1;
                const x2 = x + stepX - pad2;

                if (x2 > x1 + 4) {
                    if (bondType === '=') {
                        svg += `<line x1="${x1}" y1="${y - 3.5}" x2="${x2}" y2="${y - 3.5}" class="chem-bond-hl"/>`;
                        svg += `<line x1="${x1}" y1="${y + 3.5}" x2="${x2}" y2="${y + 3.5}" class="chem-bond-hl"/>`;
                    } else if (bondType === '#' || bondType === '≡') {
                        svg += `<line x1="${x1}" y1="${y - 5}" x2="${x2}" y2="${y - 5}" class="chem-bond-hl"/>`;
                        svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="chem-bond-hl"/>`;
                        svg += `<line x1="${x1}" y1="${y + 5}" x2="${x2}" y2="${y + 5}" class="chem-bond-hl"/>`;
                    } else {
                        svg += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="chem-bond"/>`;
                    }
                }
            }

            // Ramificación superior (top)
            if (nd.top) {
                const topBond = nd.topBond || '-';
                const y1 = y - 13;
                const y2 = y - 40;
                if (topBond === '=') {
                    svg += `<line x1="${x - 3}" y1="${y1}" x2="${x - 3}" y2="${y2}" class="chem-bond-hl"/>`;
                    svg += `<line x1="${x + 3}" y1="${y1}" x2="${x + 3}" y2="${y2}" class="chem-bond-hl"/>`;
                } else {
                    svg += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="chem-bond"/>`;
                }
                const isTopFG = /OH|O\b|Cl|Br|F|I|NH|NO2|CN/.test(nd.top);
                svg += `<text x="${x}" y="${y2 - 7}" text-anchor="middle" class="${isTopFG ? 'chem-sub chem-fg' : 'chem-sub'}">${formatChemText(nd.top)}</text>`;
            }

            // Ramificación inferior (bottom)
            if (nd.bottom) {
                const botBond = nd.bottomBond || '-';
                const y1 = y + 13;
                const y2 = y + 40;
                if (botBond === '=') {
                    svg += `<line x1="${x - 3}" y1="${y1}" x2="${x - 3}" y2="${y2}" class="chem-bond-hl"/>`;
                    svg += `<line x1="${x + 3}" y1="${y1}" x2="${x + 3}" y2="${y2}" class="chem-bond-hl"/>`;
                } else {
                    svg += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="chem-bond"/>`;
                }
                const isBotFG = /OH|O\b|Cl|Br|F|I|NH|NO2|CN/.test(nd.bottom);
                svg += `<text x="${x}" y="${y2 + 17}" text-anchor="middle" class="${isBotFG ? 'chem-sub chem-fg' : 'chem-sub'}">${formatChemText(nd.bottom)}</text>`;
            }
        }

        svg += `</svg>`;
        return svg;
    }

    /**
     * 2. RENDERIZADOR DE BENCENOS Y CICLOS (Geometría regular perfecta y bisectrices radiales)
     * spec = {
     *   type: 'benzene' | 'cyclo',
     *   ringSize: 6 | 5 | 4,
     *   subs: { 1: 'CH3', 2: 'CH3', 4: 'Cl' }, // Posiciones 1..ringSize empezando arriba en sentido horario
     *   doubleBonds: [1, 3, 5] // Para benceno por defecto [1, 3, 5]
     * }
     */
    function renderRing(spec) {
        const isBenzene = spec.type === 'benzene';
        const N = spec.ringSize || 6;
        const subs = spec.subs || {};
        const cx = 175;
        const cy = 108;
        const R = N === 5 ? 42 : 46;
        const bondLen = 28;

        let svg = `<svg viewBox="0 0 350 216" width="100%" height="100%" class="chem-svg" xmlns="http://www.w3.org/2000/svg">`;
        svg += `
        <style>
            .chem-atom { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 15px; fill: #1e293b; }
            .chem-fg { fill: #0284c7; font-weight: 800; }
            .ring-edge { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
            .ring-double { stroke: #0284c7; stroke-width: 2.2; stroke-linecap: round; }
            .sub-bond { stroke: #334155; stroke-width: 2.3; stroke-linecap: round; }
        </style>`;

        // Calcular coordenadas de los vértices (Vértice 1 siempre arriba a -90 grados, sentido horario)
        const vertices = [];
        for (let i = 0; i < N; i++) {
            const angleDeg = -90 + (i * 360) / N;
            const angleRad = (angleDeg * Math.PI) / 180;
            vertices.push({
                x: cx + R * Math.cos(angleRad),
                y: cy + R * Math.sin(angleRad),
                angleDeg: angleDeg,
                angleRad: angleRad
            });
        }

        // Dibujar el polígono exterior del anillo
        const pointsStr = vertices.map(v => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(' ');
        svg += `<polygon points="${pointsStr}" fill="#f8fafc" class="ring-edge"/>`;

        // Si es benceno, dibujar los 3 dobles enlaces conjugados interiores tipo Kekulé con precisión matemática
        if (isBenzene && N === 6) {
            const inset = 7.2; // Distancia paralela hacia el interior
            const shrink = 0.16; // Acortamiento en los extremos para estética Kekulé limpia
            const doubleEdges = [0, 2, 4]; // Lados 1-2, 3-4, 5-6

            for (const idx of doubleEdges) {
                const vA = vertices[idx];
                const vB = vertices[(idx + 1) % N];

                // Vector del lado y normal hacia el centro
                const dx = vB.x - vA.x;
                const dy = vB.y - vA.y;

                // Puntos retraídos hacia el centro del anillo (cx, cy)
                const ax = vA.x + dx * shrink + (cx - (vA.x + dx * 0.5)) * (inset / R);
                const ay = vA.y + dy * shrink + (cy - (vA.y + dy * 0.5)) * (inset / R);
                const bx = vB.x - dx * shrink + (cx - (vA.x + dx * 0.5)) * (inset / R);
                const by = vB.y - dy * shrink + (cy - (vA.y + dy * 0.5)) * (inset / R);

                svg += `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" class="ring-double"/>`;
            }
        } else if (spec.doubleBonds && Array.isArray(spec.doubleBonds)) {
            // Para cicloalquenos
            const inset = 6.5;
            const shrink = 0.15;
            for (const edgeNum of spec.doubleBonds) {
                const idx = (edgeNum - 1) % N;
                const vA = vertices[idx];
                const vB = vertices[(idx + 1) % N];
                const dx = vB.x - vA.x;
                const dy = vB.y - vA.y;
                const ax = vA.x + dx * shrink + (cx - (vA.x + dx * 0.5)) * (inset / R);
                const ay = vA.y + dy * shrink + (cy - (vA.y + dy * 0.5)) * (inset / R);
                const bx = vB.x - dx * shrink + (cx - (vA.x + dx * 0.5)) * (inset / R);
                const by = vB.y - dy * shrink + (cy - (vA.y + dy * 0.5)) * (inset / R);
                svg += `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" class="ring-double"/>`;
            }
        }

        // Dibujar sustituyentes radiales en la bisectriz exacta de cada vértice
        for (const [posStr, label] of Object.entries(subs)) {
            const pos = parseInt(posStr, 10) - 1;
            if (pos >= 0 && pos < N && label) {
                const v = vertices[pos];
                const x1 = v.x;
                const y1 = v.y;
                const x2 = cx + (R + bondLen) * Math.cos(v.angleRad);
                const y2 = cy + (R + bondLen) * Math.sin(v.angleRad);

                svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="sub-bond"/>`;

                // Calcular posición y alineación del texto según el ángulo de la bisectriz
                const cosA = Math.cos(v.angleRad);
                const sinA = Math.sin(v.angleRad);

                let textAnchor = 'middle';
                let tx = x2 + cosA * 10;
                let ty = y2 + sinA * 10 + 5;

                if (cosA > 0.25) {
                    textAnchor = 'start';
                    tx = x2 + 5;
                } else if (cosA < -0.25) {
                    textAnchor = 'end';
                    tx = x2 - 5;
                } else if (sinA < -0.5) {
                    // Vértice superior (-90 deg)
                    textAnchor = 'middle';
                    tx = x2;
                    ty = y2 - 6;
                } else if (sinA > 0.5) {
                    // Vértice inferior (+90 deg)
                    textAnchor = 'middle';
                    tx = x2;
                    ty = y2 + 16;
                }

                const isFG = /OH|CHO|COOH|COO|NH|NO2|CN|O\b|Cl|Br|F|I|=/.test(label);
                svg += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${textAnchor}" class="${isFG ? 'chem-atom chem-fg' : 'chem-atom'}">${formatChemText(label)}</text>`;
            }
        }

        svg += `</svg>`;
        return svg;
    }

    /**
     * 3. RENDERIZADOR DE ISÓMEROS GEOMÉTRICOS CIS / TRANS (Alquenos espaciales)
     * spec = {
     *   type: 'cistrans',
     *   tl: 'CH3', bl: 'H',
     *   tr: 'CH2-CH3', br: 'H'
     * }
     */
    function renderCisTrans(spec) {
        const cx = 175;
        const cy = 95;
        const cLeftX = cx - 24;
        const cRightX = cx + 24;

        let svg = `<svg viewBox="0 0 350 190" width="100%" height="100%" class="chem-svg" xmlns="http://www.w3.org/2000/svg">`;
        svg += `
        <style>
            .chem-atom { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 16px; fill: #1e293b; }
            .chem-hl { fill: #0284c7; font-weight: 800; }
            .chem-bond { stroke: #334155; stroke-width: 2.4; stroke-linecap: round; }
            .chem-double { stroke: #0284c7; stroke-width: 2.8; stroke-linecap: round; }
        </style>`;

        // Carbonos centrales del doble enlace
        svg += `<text x="${cLeftX}" y="${cy + 6}" text-anchor="middle" class="chem-atom chem-hl">C</text>`;
        svg += `<text x="${cRightX}" y="${cy + 6}" text-anchor="middle" class="chem-atom chem-hl">C</text>`;

        // Doble enlace central
        svg += `<line x1="${cLeftX + 11}" y1="${cy - 3.5}" x2="${cRightX - 11}" y2="${cy - 3.5}" class="chem-double"/>`;
        svg += `<line x1="${cLeftX + 11}" y1="${cy + 3.5}" x2="${cRightX - 11}" y2="${cy + 3.5}" class="chem-double"/>`;

        // 4 enlaces en ángulo de 120° (arriba-izq, abajo-izq, arriba-der, abajo-der)
        // Arriba-Izquierda (tl)
        svg += `<line x1="${cLeftX - 9}" y1="${cy - 9}" x2="${cLeftX - 38}" y2="${cy - 38}" class="chem-bond"/>`;
        svg += `<text x="${cLeftX - 44}" y="${cy - 40}" text-anchor="end" class="chem-atom ${spec.tl !== 'H' ? 'chem-hl' : ''}">${formatChemText(spec.tl)}</text>`;

        // Abajo-Izquierda (bl)
        svg += `<line x1="${cLeftX - 9}" y1="${cy + 9}" x2="${cLeftX - 38}" y2="${cy + 38}" class="chem-bond"/>`;
        svg += `<text x="${cLeftX - 44}" y="${cy + 50}" text-anchor="end" class="chem-atom ${spec.bl !== 'H' ? 'chem-hl' : ''}">${formatChemText(spec.bl)}</text>`;

        // Arriba-Derecha (tr)
        svg += `<line x1="${cRightX + 9}" y1="${cy - 9}" x2="${cRightX + 38}" y2="${cy - 38}" class="chem-bond"/>`;
        svg += `<text x="${cRightX + 44}" y="${cy - 40}" text-anchor="start" class="chem-atom ${spec.tr !== 'H' ? 'chem-hl' : ''}">${formatChemText(spec.tr)}</text>`;

        // Abajo-Derecha (br)
        svg += `<line x1="${cRightX + 9}" y1="${cy + 9}" x2="${cRightX + 38}" y2="${cy + 38}" class="chem-bond"/>`;
        svg += `<text x="${cRightX + 44}" y="${cy + 50}" text-anchor="start" class="chem-atom ${spec.br !== 'H' ? 'chem-hl' : ''}">${formatChemText(spec.br)}</text>`;

        svg += `</svg>`;
        return svg;
    }

    // Punto de entrada principal
    function render(spec) {
        if (!spec) return '';
        if (spec.type === 'benzene' || spec.type === 'cyclo') {
            return renderRing(spec);
        }
        if (spec.type === 'cistrans') {
            return renderCisTrans(spec);
        }
        return renderChain(spec);
    }

    return {
        render: render,
        formatChemText: formatChemText
    };
})();
