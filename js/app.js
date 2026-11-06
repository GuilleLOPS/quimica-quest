/**
 * QUÍMICA QUEST UNIZAR (30004) - MOTOR DE LA APLICACIÓN (app.js)
 * Mapa de 8 Biomas con Avatar animado, Desbloqueo tipo Duolingo,
 * Ejercicios Bidireccionales, Laboratorio de Errores y Mochila de Apuntes.
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'quimica_unizar_state_v1';

  const DEFAULT_STATE = {
    playerName: '',
    avatarId: 'scientista',
    xp: 0,
    unlockedLevels: ['1-1'],
    completedLevels: {}, // { '1-1': { stars: 3, bestPct: 100 } }
    currentNodeId: '1-1',
    failedQuestions: [], // lista de objetos pregunta para repaso
    teacherMode: false,
    preferredInputMode: 'options' // 'options' | 'write'
  };

  let state = loadState();
  let activeQuiz = null; // estado de la partida en curso
  let activeModal = null; // null | 'notes' | 'profile'

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
      const parsed = JSON.parse(raw);
      const merged = Object.assign({}, JSON.parse(JSON.stringify(DEFAULT_STATE)), parsed);
      // Garantizar que el nivel 1-1 siempre esté desbloqueado y migrar IDs viejos
      if (!Array.isArray(merged.unlockedLevels) || !merged.unlockedLevels.includes('1-1')) {
        merged.unlockedLevels = ['1-1', ...(Array.isArray(merged.unlockedLevels) ? merged.unlockedLevels.filter(x => x !== 'w1_l1') : [])];
      }
      if (!merged.currentNodeId || merged.currentNodeId === 'w1_l1') {
        merged.currentNodeId = '1-1';
      }
      return merged;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignorar errores de cuota
    }
  }

  function getAvatarObj(avatarId) {
    const list = global.WorldsData.avatars;
    return list.find(a => a.id === avatarId) || list[0];
  }

  function getAllLevelsOrdered() {
    const list = [];
    global.WorldsData.worlds.forEach(w => {
      w.levels.forEach(l => {
        list.push({ world: w, level: l });
      });
    });
    return list;
  }

  function isLevelUnlocked(levelId) {
    // El nivel 1-1 SIEMPRE está desbloqueado por defecto para cualquier alumna
    if (levelId === '1-1') return true;
    if (state.teacherMode) return true;
    return Boolean(state.unlockedLevels && state.unlockedLevels.includes(levelId));
  }

  function isWorldUnlocked(world) {
    // El Mundo 1 SIEMPRE está desbloqueado
    if (world.id === 1) return true;
    if (state.teacherMode) return true;
    return world.levels.some(l => isLevelUnlocked(l.id));
  }

  function getTotalStars() {
    return Object.values(state.completedLevels).reduce((acc, item) => acc + (item.stars || 0), 0);
  }

  function getMaxStars() {
    return getAllLevelsOrdered().length * 3;
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  /* ==========================================================================
     GENERACIÓN DE PAISAJES SVG COLORIDOS PARA CADA UNO DE LOS 8 BIOMAS
     ========================================================================== */
  function renderBiomeScenerySVG(world) {
    const th = world.theme;
    let decor = '';

    if (world.id === 1) {
      // Isla Esmeralda: colinas verdes y pinos
      decor = `
        <path d="M0,190 Q220,120 480,185 T980,165 L1000,260 L0,260 Z" fill="#a7f3d0" opacity="0.65"/>
        <path d="M0,215 Q320,155 660,205 T1000,195 L1000,260 L0,260 Z" fill="#6ee7b7" opacity="0.75"/>
        <g fill="#047857" opacity="0.35">
          <polygon points="90,135 65,195 115,195"/><polygon points="90,110 70,160 110,160"/>
          <polygon points="440,125 415,185 465,185"/><polygon points="820,130 795,190 845,190"/>
        </g>`;
    } else if (world.id === 2) {
      // Cañón Eléctrico: cristales geométricos y mesetas dobles/triples
      decor = `
        <polygon points="0,260 0,175 180,135 340,190 540,130 760,185 1000,140 1000,260" fill="#c7d2fe" opacity="0.6"/>
        <g fill="#4338ca" opacity="0.28">
          <polygon points="260,195 278,125 296,195"/>
          <polygon points="288,195 302,145 316,195"/>
          <polygon points="690,190 710,115 730,190"/>
        </g>`;
    } else if (world.id === 3) {
      // Acrópolis Aromática: hexágonos resonantes flotantes
      decor = `
        <path d="M0,200 Q260,150 520,195 T1000,175 L1000,260 L0,260 Z" fill="#fde68a" opacity="0.65"/>
        <g stroke="#b45309" stroke-width="3" fill="none" opacity="0.28">
          <polygon points="150,70 180,87 180,122 150,140 120,122 120,87"/>
          <circle cx="150" cy="105" r="18"/>
          <polygon points="520,55 550,72 550,107 520,125 490,107 490,72"/>
          <circle cx="520" cy="90" r="18"/>
          <polygon points="860,75 890,92 890,127 860,145 830,127 830,92"/>
        </g>`;
    } else if (world.id === 4) {
      // Oasis Cristalino: olas suaves e islas
      decor = `
        <path d="M0,175 Q160,140 320,175 T640,175 T960,175 L1000,260 L0,260 Z" fill="#bae6fd" opacity="0.7"/>
        <path d="M0,205 Q160,180 320,205 T640,205 T960,205 L1000,260 L0,260 Z" fill="#7dd3fc" opacity="0.65"/>
        <circle cx="880" cy="70" r="32" fill="#fde047" opacity="0.45"/>`;
    } else if (world.id === 5) {
      // Volcán del Carbonilo: picos volcánicos y brasas
      decor = `
        <polygon points="0,260 140,120 310,210 530,105 730,205 890,125 1000,200 1000,260" fill="#fecaca" opacity="0.7"/>
        <circle cx="530" cy="95" r="22" fill="#f97316" opacity="0.3"/>
        <circle cx="140" cy="110" r="16" fill="#ef4444" opacity="0.25"/>`;
    } else if (world.id === 6) {
      // Templo Astral del Nitrógeno: retícula cósmica
      decor = `
        <path d="M0,185 L1000,185 L1000,260 L0,260 Z" fill="#e9d5ff" opacity="0.55"/>
        <g stroke="#9333ea" stroke-width="2" opacity="0.22" fill="none">
          <line x1="0" y1="60" x2="1000" y2="60"/>
          <line x1="0" y1="120" x2="1000" y2="120"/>
          <line x1="200" y1="0" x2="200" y2="260"/>
          <line x1="500" y1="0" x2="500" y2="260"/>
          <line x1="800" y1="0" x2="800" y2="260"/>
        </g>`;
    } else if (world.id === 7) {
      // Cumbres de la Prioridad IUPAC: montañas estelares y auroras
      decor = `
        <path d="M0,90 Q280,20 540,85 T1000,55" fill="none" stroke="#38bdf8" stroke-width="14" opacity="0.25"/>
        <polygon points="0,260 190,115 390,210 620,95 840,195 1000,130 1000,260" fill="#cbd5e1" opacity="0.65"/>`;
    } else {
      // Mundo 8: Castillo del Jefe Final UNIZAR
      decor = `
        <path d="M0,195 Q500,135 1000,195 L1000,260 L0,260 Z" fill="#fde68a" opacity="0.75"/>
        <g fill="#d97706" opacity="0.22">
          <rect x="80" y="60" width="26" height="140" rx="4"/>
          <rect x="140" y="60" width="26" height="140" rx="4"/>
          <rect x="830" y="60" width="26" height="140" rx="4"/>
          <rect x="890" y="60" width="26" height="140" rx="4"/>
        </g>`;
    }

    return `
      <svg class="biome-scenery-svg" viewBox="0 0 1000 250" preserveAspectRatio="none">
        <rect width="1000" height="250" fill="${th.cardBg}"/>
        ${decor}
      </svg>
    `;
  }

  function renderBiomePathSVG(world) {
    const levels = world.levels;
    if (!levels || levels.length < 2) return '';
    let d = '';
    for (let i = 0; i < levels.length; i++) {
      const pt = levels[i];
      const x = pt.x * 10; // viewBox 0..1000
      const y = pt.y * 2.5; // viewBox 0..250
      if (i === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prev = levels[i - 1];
        const px = prev.x * 10;
        const py = prev.y * 2.5;
        const cx1 = px + (x - px) * 0.5;
        const cy1 = py;
        const cx2 = px + (x - px) * 0.5;
        const cy2 = y;
        d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;
      }
    }

    return `
      <svg class="biome-path-svg" viewBox="0 0 1000 250" preserveAspectRatio="none">
        <path d="${d}" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="18" stroke-linecap="round"/>
        <path d="${d}" fill="none" stroke="${world.theme.borderColor}" stroke-width="8" stroke-dasharray="16 12" stroke-linecap="round"/>
      </svg>
    `;
  }

  /* ==========================================================================
     RENDERIZADO PRINCIPAL DE LA INTERFAZ
     ========================================================================== */
  function renderApp() {
    const root = document.getElementById('app-root');
    if (!root) return;

    if (!state.playerName) {
      root.innerHTML = renderWelcomeScreen();
      bindWelcomeEvents();
      return;
    }

    let mainContent = '';
    if (activeQuiz) {
      mainContent = renderQuizScreen();
    } else {
      mainContent = renderWorldMapScreen();
    }

    const modalHTML = activeModal === 'notes' ? renderNotesModal() : (activeModal === 'profile' ? renderProfileModal() : '');

    root.innerHTML = `
      ${renderTopHUD()}
      ${mainContent}
      ${modalHTML}
    `;

    bindGlobalEvents();
    if (activeQuiz) {
      bindQuizEvents();
    } else {
      bindWorldMapEvents();
    }
  }

  function renderTopHUD() {
    const avatar = getAvatarObj(state.avatarId);
    const totalStars = getTotalStars();
    const maxStars = getMaxStars();
    const isMuted = global.SoundFX && global.SoundFX.isMuted();
    const errorCount = state.failedQuestions.length;

    return `
      <header class="top-hud">
        <div class="hud-brand" id="btn-go-home" title="Volver al Mapa de Mundos">
          <div class="hud-logo">⚗️</div>
          <div class="hud-title">
            <h1>Química Quest UNIZAR</h1>
            <span>Formulación Orgánica · Cód. 30004</span>
          </div>
        </div>

        <div class="hud-stats">
          <div class="stat-pill player-pill" id="btn-open-profile" title="Cambiar personaje o nombre">
            <span>${avatar.emoji}</span>
            <span>${escapeHtml(state.playerName)}</span>
          </div>
          <div class="stat-pill xp-pill" title="Puntos de experiencia acumulados">
            <span>⚡</span>
            <span>${state.xp} XP</span>
          </div>
          <div class="stat-pill stars-pill" title="Estrellas conseguidas en los niveles">
            <span>⭐</span>
            <span>${totalStars} / ${maxStars}</span>
          </div>
        </div>

        <div class="hud-actions">
          <button class="btn-3d btn-amber" id="btn-open-notes" title="Ver Tabla Oficial de Prioridad UNIZAR y Apuntes">
            📖 Mochila de Apuntes
          </button>
          <button class="btn-3d ${errorCount > 0 ? 'btn-red' : 'btn-ghost'}" id="btn-error-lab" title="Practicar los compuestos que has fallado">
            🔄 Lab. Errores (${errorCount})
          </button>
          <button class="btn-3d ${state.teacherMode ? 'btn-teacher-active' : 'btn-ghost'}" id="btn-toggle-teacher" title="Modo Profesor (Requiere PIN): Desbloquea todos los mundos y niveles para clase">
            ${state.teacherMode ? '🔓 Modo Profe: ACTIVO' : '🔒 Modo Profe (PIN)'}
          </button>
          <button class="btn-3d btn-ghost" id="btn-toggle-sound" title="Activar/Silenciar efectos de sonido">
            ${isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>
    `;
  }

  /* ==========================================================================
     PANTALLA DE BIENVENIDA Y SELECCIÓN DE AVATAR
     ========================================================================== */
  function renderWelcomeScreen() {
    const avatars = global.WorldsData.avatars;
    return `
      <section class="welcome-overlay">
        <div class="welcome-card">
          <div style="border-radius:18px; overflow:hidden; margin-bottom:20px; border:2.5px solid #cbd5e1; max-height:190px; box-shadow:0 10px 24px rgba(15,23,42,0.12);">
            <img src="assets/world_map_bg.jpg" alt="Mapa de Biomas Química Quest" style="width:100%; height:190px; object-fit:cover; display:block;" />
          </div>

          <span class="welcome-badge">Universidad de Zaragoza · Química (30004)</span>
          <h2>¡Bienvenida a Química Quest! 🧪</h2>
          <p>Domina la Nomenclatura y Formulación Orgánica viajando por los 7 Biomas del temario oficial hasta el Castillo del Examen Final.</p>

          <div class="welcome-form-group">
            <label for="input-player-name">1. ¿Cómo te llamas?</label>
            <input type="text" id="input-player-name" class="welcome-input" placeholder="Escribe tu nombre aquí..." maxlength="28" value="${escapeHtml(state.playerName || '')}" autofocus />
          </div>

          <div class="welcome-form-group">
            <label>2. Elige tu personaje explorador:</label>
            <div class="avatar-grid">
              ${avatars.map(a => `
                <div class="avatar-option ${state.avatarId === a.id ? 'selected' : ''}" data-avatar="${a.id}">
                  <span class="avatar-emoji">${a.emoji}</span>
                  <span class="avatar-name">${escapeHtml(a.name)}</span>
                  <span class="avatar-desc">${escapeHtml(a.desc)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <button class="btn-3d btn-green" id="btn-start-adventure" style="width:100%; padding:15px; font-size:1.12rem;">
            🚀 ¡Comenzar Aventura en el Mundo 1!
          </button>
        </div>
      </section>
    `;
  }

  function bindWelcomeEvents() {
    const avatarCards = document.querySelectorAll('.avatar-option');
    avatarCards.forEach(card => {
      card.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playClick();
        state.avatarId = card.getAttribute('data-avatar');
        avatarCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    const startBtn = document.getElementById('btn-start-adventure');
    const nameInput = document.getElementById('input-player-name');
    if (startBtn && nameInput) {
      const submitWelcome = () => {
        const val = nameInput.value.trim();
        state.playerName = val || 'Alumna UNIZAR';
        saveState();
        if (global.SoundFX) global.SoundFX.playLevelUp();
        renderApp();
      };
      startBtn.addEventListener('click', submitWelcome);
      nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') submitWelcome();
      });
    }
  }

  /* ==========================================================================
     MAPA DE LOS 8 MUNDOS (BIOMAS) CON PERSONAJE EN RUTA
     ========================================================================== */
  function renderWorldMapScreen() {
    const worlds = global.WorldsData.worlds;
    const allLevels = getAllLevelsOrdered();
    const completedCount = Object.keys(state.completedLevels).length;
    const pct = Math.round((completedCount / allLevels.length) * 100);
    const avatar = getAvatarObj(state.avatarId);

    return `
      <main class="world-map-container">
        <div class="map-hero-banner">
          <div class="map-hero-info">
            <h2>🗺️ Mapa de Biomas Orgánicos</h2>
            <p>Haz clic en cualquier nivel desbloqueado para mover a <strong>${escapeHtml(state.playerName)}</strong> (${avatar.emoji}) e iniciar los ejercicios bidireccionales (Estructura ↔ Nombre).</p>
          </div>
          <div class="overall-progress-box">
            <div class="prog-label">
              <span>Progreso de la Aventura</span>
              <span>${completedCount} / ${allLevels.length} niveles (${pct}%)</span>
            </div>
            <div class="overall-progress-bar">
              <div class="overall-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        </div>

        ${worlds.map(world => renderBiomeCard(world, avatar)).join('')}
      </main>
    `;
  }

  function renderBiomeCard(world, avatar) {
    const worldUnlocked = isWorldUnlocked(world);
    const completedInWorld = world.levels.filter(l => state.completedLevels[l.id]).length;
    const avatarOnThisWorld = world.levels.find(l => l.id === state.currentNodeId);

    return `
      <section class="biome-card ${worldUnlocked ? '' : 'biome-locked'}" id="biome-w${world.id}">
        <div class="biome-header" style="background:${world.theme.bgGradient}">
          <div class="biome-header-left">
            <div class="biome-icon-badge">${world.biomeIcon}</div>
            <div class="biome-titles">
              <span class="biome-tag">${escapeHtml(world.biomeName)} · ${escapeHtml(world.tutorialRef)}</span>
              <h3>${escapeHtml(world.title)}</h3>
              <p>${escapeHtml(world.subtitle)}</p>
            </div>
          </div>
          <div class="biome-header-right">
            <span class="stat-pill" style="background:rgba(255,255,255,0.2); color:#fff; border-color:rgba(255,255,255,0.4);">
              ${worldUnlocked ? `✅ ${completedInWorld}/${world.levels.length} niveles` : '🔒 Mundo Bloqueado'}
            </span>
          </div>
        </div>

        <div class="biome-stage" style="background-image: linear-gradient(to bottom, rgba(15, 23, 42, 0.28), rgba(15, 23, 42, 0.42)), url('assets/biome_world_${world.id}.jpg');">
          ${renderBiomePathSVG(world)}

          ${world.levels.map(lvl => {
            const unlocked = isLevelUnlocked(lvl.id);
            const comp = state.completedLevels[lvl.id];
            const stars = comp ? comp.stars : 0;
            const isTarget = unlocked && !comp;
            const stateClass = comp ? 'completed' : (unlocked ? 'unlocked' : 'locked');
            const starStr = comp
              ? '⭐'.repeat(stars) + '☆'.repeat(3 - stars)
              : (unlocked ? '☆☆☆' : '🔒');

            return `
              <div class="level-node ${stateClass} ${isTarget ? 'current-target' : ''}"
                   style="left:${lvl.x}%; top:${lvl.y}%; --node-color:${world.theme.borderColor}; --node-shadow:${world.theme.accentColor};"
                   data-level-id="${lvl.id}"
                   data-world-id="${world.id}">
                <div class="level-node-circle">
                  <span class="level-num-badge">${lvl.id}</span>
                  <span class="level-stars-row">${starStr}</span>
                </div>
                <div class="level-label-card">
                  ${escapeHtml(lvl.title)}
                  <span class="level-label-sub">${escapeHtml(lvl.sub)}</span>
                </div>
              </div>
            `;
          }).join('')}

          ${avatarOnThisWorld ? `
            <div class="map-avatar-token" id="map-avatar-token" style="left:${avatarOnThisWorld.x}%; top:${avatarOnThisWorld.y}%;">
              <div class="map-avatar-bubble">${avatar.emoji}</div>
              <span class="map-avatar-name">${escapeHtml(state.playerName)}</span>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  function bindWorldMapEvents() {
    const nodes = document.querySelectorAll('.level-node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const levelId = node.getAttribute('data-level-id');
        if (!isLevelUnlocked(levelId)) {
          if (global.SoundFX) global.SoundFX.playError();
          alert('🔒 Este nivel está bloqueado. ¡Supera primero el nivel anterior (o activa el Modo Profe arriba a la derecha)!');
          return;
        }

        // Mover personaje al nodo seleccionado y lanzar el nivel tras animación
        if (global.SoundFX) global.SoundFX.playStep();
        const prevNode = state.currentNodeId;
        state.currentNodeId = levelId;
        saveState();

        const token = document.getElementById('map-avatar-token');
        const targetInfo = findLevelById(levelId);
        if (token && targetInfo && findLevelById(prevNode)?.world.id === targetInfo.world.id) {
          token.style.left = targetInfo.level.x + '%';
          token.style.top = targetInfo.level.y + '%';
          setTimeout(() => startLevelQuiz(levelId), 420);
        } else {
          renderApp();
          setTimeout(() => startLevelQuiz(levelId), 260);
        }
      });
    });
  }

  function findLevelById(levelId) {
    for (const w of global.WorldsData.worlds) {
      for (const l of w.levels) {
        if (l.id === levelId) return { world: w, level: l };
      }
    }
    return null;
  }

  /* ==========================================================================
     INICIO Y LÓGICA DE PARTIDA (EJERCICIOS BIDIRECCIONALES)
     ========================================================================== */
  function startLevelQuiz(levelId) {
    const info = findLevelById(levelId);
    if (!info) return;

    const generatedQuestions = global.QuestionsData.buildLevelQuestions(levelId);
    if (!generatedQuestions || !generatedQuestions.length) {
      alert('No se encontraron ejercicios para este nivel.');
      return;
    }

    const maxCount = info.world.id === 8 ? 16 : 12;
    const selected = generatedQuestions.slice(0, Math.min(maxCount, generatedQuestions.length));

    activeQuiz = {
      isErrorLab: false,
      levelId: levelId,
      world: info.world,
      level: info.level,
      questions: selected,
      currentIndex: 0,
      hearts: 3,
      maxHearts: 3,
      correctCount: 0,
      selectedAnswer: null,
      typedAnswer: '',
      showHint: false,
      feedback: null,
      finished: false,
      failedOut: false
    };

    if (global.SoundFX) global.SoundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  }

  function startErrorLabQuiz() {
    if (!state.failedQuestions.length) {
      alert('🎉 ¡Tienes el Laboratorio de Errores limpio! No tienes moléculas pendientes de repaso.');
      return;
    }

    const selected = shuffleArray(state.failedQuestions).slice(0, 12);

    activeQuiz = {
      isErrorLab: true,
      levelId: 'error_lab',
      world: { id: 0, title: 'Laboratorio de Errores', biomeIcon: '🔄', theme: { accentColor: '#ef4444' } },
      level: { id: 'Repaso', num: '🔄', title: 'Repaso Inteligente', sub: 'Supera las moléculas que fallaste anteriormente' },
      questions: selected,
      currentIndex: 0,
      hearts: 3,
      maxHearts: 3,
      correctCount: 0,
      selectedAnswer: null,
      typedAnswer: '',
      showHint: false,
      feedback: null,
      finished: false,
      failedOut: false
    };

    if (global.SoundFX) global.SoundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  }

  function renderQuizScreen() {
    if (activeQuiz.finished) {
      return renderQuizSummaryScreen();
    }

    const q = activeQuiz.questions[activeQuiz.currentIndex];
    const total = activeQuiz.questions.length;
    const progressPct = Math.round((activeQuiz.currentIndex / total) * 100);

    let heartsHTML = '';
    for (let i = 0; i < activeQuiz.maxHearts; i++) {
      const lost = i >= activeQuiz.hearts;
      heartsHTML += `<span class="heart-icon ${lost ? 'lost' : ''}">❤️</span>`;
    }

    const isStructToName = q.mode === 'struct_to_name' || q.mode === 'write_name';

    return `
      <main class="quiz-wrapper">
        <div class="quiz-biome-banner" style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.82) 0%, rgba(15, 23, 42, 0.52) 100%), url('assets/biome_world_${activeQuiz.world.id || 1}.jpg') center/cover; border-radius: 20px; padding: 16px 22px; color: #fff; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; border: 2.5px solid rgba(255,255,255,0.4); box-shadow: 0 10px 25px rgba(0,0,0,0.12); flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.9;">
              ${escapeHtml(activeQuiz.world.biomeName || activeQuiz.world.title)}
            </span>
            <h3 style="font-size: 1.25rem; font-weight: 900; margin-top: 2px;">
              ${activeQuiz.world.biomeIcon || '🧪'} Nivel ${escapeHtml(activeQuiz.level.id)}: ${escapeHtml(activeQuiz.level.title)}
            </h3>
          </div>
          <span class="stat-pill" style="background: rgba(255,255,255,0.22); color: #fff; border-color: rgba(255,255,255,0.45); font-size: 0.82rem;">
            ${escapeHtml(activeQuiz.level.sub || '')}
          </span>
        </div>

        <div class="quiz-topbar">
          <button class="btn-3d btn-ghost" id="btn-quit-quiz">⬅ Salir al Mapa</button>
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
          </div>
          <div style="font-weight:800; font-size:0.88rem; color:var(--text-muted);">
            ${activeQuiz.currentIndex + 1} / ${total}
          </div>
          <div class="hearts-box" title="Vidas restantes en este intento">
            ${heartsHTML}
          </div>
        </div>

        <div class="question-card">
          <div class="question-meta-bar">
            <span class="question-mode-badge ${isStructToName ? '' : 'mode-reverse'}">
              ${isStructToName ? '🔬 ESTRUCTURA ➔ NOMBRE' : '✍️ NOMBRE ➔ ESTRUCTURA'}
            </span>
            <button class="btn-3d btn-amber" id="btn-show-hint" style="padding:6px 12px; font-size:0.82rem;">
              💡 Pista del Profe
            </button>
          </div>

          <h2 class="question-prompt">${escapeHtml(q.prompt)}</h2>

          ${activeQuiz.showHint ? `
            <div class="hint-drawer">
              <span>💡</span>
              <div><strong>Pista UNIZAR:</strong> ${escapeHtml(q.hint)}</div>
            </div>
          ` : ''}

          ${isStructToName ? renderStructToNameBody(q) : renderNameToStructBody(q)}

          ${activeQuiz.feedback ? renderFeedbackBanner() : `
            <div style="display:flex; justify-content:flex-end; margin-top:14px;">
              <button class="btn-3d btn-green" id="btn-check-answer" style="padding:13px 28px; font-size:1.05rem;">
                ✅ Comprobar Respuesta
              </button>
            </div>
          `}
        </div>
      </main>
    `;
  }

  function renderStructToNameBody(q) {
    const svgDiagram = global.ChemRenderer.render(q.spec);
    const mode = state.preferredInputMode; // 'options' | 'write'
    const locked = Boolean(activeQuiz.feedback);

    return `
      <div class="molecule-stage">
        ${svgDiagram}
      </div>

      <div class="answer-input-section">
        <div class="input-mode-tabs">
          <button class="tab-chip ${mode === 'options' ? 'active' : ''}" data-input-mode="options" ${locked ? 'disabled' : ''}>
            🎯 Elegir entre 4 opciones
          </button>
          <button class="tab-chip ${mode === 'write' ? 'active' : ''}" data-input-mode="write" ${locked ? 'disabled' : ''}>
            ⌨️ Escribir el nombre IUPAC
          </button>
        </div>

        ${mode === 'write' ? `
          <div>
            <input type="text" id="chem-write-input" class="chem-text-input"
                   placeholder="Escribe el nombre del compuesto (ej: ácido 3-metilbutanoico)..."
                   value="${escapeHtml(activeQuiz.typedAnswer)}"
                   ${locked ? 'disabled' : ''} autofocus />
            <p style="font-size:0.78rem; color:var(--text-muted); margin-top:6px;">
              💡 Se aceptan tanto el nombre sistemático IUPAC como los nombres admitidos por UNIZAR (con o sin tildes).
            </p>
          </div>
        ` : `
          <div class="options-text-grid">
            ${(q.options || []).map((opt, idx) => {
              const isSelected = activeQuiz.selectedAnswer === opt;
              let stateClass = isSelected ? 'selected' : '';
              if (locked) {
                const isAccepted = global.QuestionsData.checkWrittenAnswer(opt, q.acceptedNames);
                if (isAccepted) stateClass = 'correct';
                else if (isSelected) stateClass = 'wrong';
              }
              return `
                <button class="option-text-btn ${stateClass}" data-option-val="${escapeHtml(opt)}" ${locked ? 'disabled' : ''}>
                  <span class="opt-key-badge">${idx + 1}</span>
                  <span>${escapeHtml(opt)}</span>
                </button>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  }

  function renderNameToStructBody(q) {
    const locked = Boolean(activeQuiz.feedback);
    const letters = ['A', 'B', 'C', 'D'];
    const altText = q.acceptedNames && q.acceptedNames.length > 1
      ? `También admitido en UNIZAR: ${q.acceptedNames.slice(1).join(' / ')}`
      : 'Identifica la cadena principal, el grupo prioritario y sus localizadores';

    return `
      <div class="target-name-banner">
        <div class="name-main">${escapeHtml(q.targetName)}</div>
        <div class="name-sub">${escapeHtml(altText)}</div>
      </div>

      <div class="options-svg-grid">
        ${(q.structOptions || []).map((item, idx) => {
          const isSelected = activeQuiz.selectedAnswer === idx;
          let stateClass = isSelected ? 'selected' : '';
          if (locked) {
            if (item.isCorrect) stateClass = 'correct';
            else if (isSelected) stateClass = 'wrong';
          }
          return `
            <div class="option-svg-card ${stateClass}" data-struct-idx="${idx}">
              <span class="card-letter">${letters[idx]}</span>
              ${global.ChemRenderer.render(item.spec)}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderFeedbackBanner() {
    const fb = activeQuiz.feedback;
    return `
      <div class="feedback-banner ${fb.correct ? 'is-correct' : 'is-wrong'}">
        <div class="feedback-content">
          <h4>${fb.title}</h4>
          <p>${escapeHtml(fb.message)}</p>
        </div>
        <button class="btn-3d ${fb.correct ? 'btn-green' : 'btn-red'}" id="btn-next-question" style="padding:12px 24px;">
          Continuar ➔
        </button>
      </div>
    `;
  }

  function renderQuizSummaryScreen() {
    const total = activeQuiz.questions.length;
    const pct = Math.round((activeQuiz.correctCount / total) * 100);
    const passed = !activeQuiz.failedOut && pct >= 60;
    const starsEarned = passed ? (pct >= 90 ? 3 : (pct >= 75 ? 2 : 1)) : 0;

    return `
      <main class="quiz-wrapper">
        <div class="question-card" style="text-align:center; padding:40px 28px;">
          <div style="font-size:4rem; margin-bottom:10px;">
            ${passed ? (starsEarned === 3 ? '🏆' : '🎉') : '💔'}
          </div>
          <h2 style="font-size:2rem; font-weight:900; margin-bottom:8px;">
            ${passed ? `¡Nivel ${escapeHtml(activeQuiz.level.id)} Superado!` : '¡Intento incompleto!'}
          </h2>
          <p style="color:var(--text-muted); font-size:1.05rem; margin-bottom:20px;">
            ${passed
              ? `Has acertado ${activeQuiz.correctCount} de ${total} ejercicios (${pct}%).`
              : 'Has agotado las 3 vidas en este nivel. ¡Revisa la Mochila de Apuntes y vuelve a intentarlo!'}
          </p>

          ${passed ? `
            <div style="font-size:2.4rem; letter-spacing:8px; margin-bottom:22px;">
              ${'⭐'.repeat(starsEarned)}${'☆'.repeat(3 - starsEarned)}
            </div>
          ` : ''}

          <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
            <button class="btn-3d btn-ghost" id="btn-summary-retry" style="padding:13px 22px;">
              🔄 Repetir Nivel
            </button>
            <button class="btn-3d btn-green" id="btn-summary-map" style="padding:13px 26px;">
              🗺️ Volver al Mapa de Biomas
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindQuizEvents() {
    const quitBtn = document.getElementById('btn-quit-quiz');
    if (quitBtn) {
      quitBtn.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playClick();
        activeQuiz = null;
        renderApp();
      });
    }

    if (activeQuiz.finished) {
      const retryBtn = document.getElementById('btn-summary-retry');
      const mapBtn = document.getElementById('btn-summary-map');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          if (activeQuiz.isErrorLab) startErrorLabQuiz();
          else startLevelQuiz(activeQuiz.levelId);
        });
      }
      if (mapBtn) {
        mapBtn.addEventListener('click', () => {
          if (global.SoundFX) global.SoundFX.playClick();
          activeQuiz = null;
          renderApp();
        });
      }
      return;
    }

    const hintBtn = document.getElementById('btn-show-hint');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playHint();
        activeQuiz.showHint = !activeQuiz.showHint;
        renderApp();
      });
    }

    // Cambio entre modo opciones y modo escribir
    const modeTabs = document.querySelectorAll('[data-input-mode]');
    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (activeQuiz.feedback) return;
        if (global.SoundFX) global.SoundFX.playClick();
        state.preferredInputMode = tab.getAttribute('data-input-mode');
        saveState();
        renderApp();
      });
    });

    // Input de texto para escribir nombre
    const writeInput = document.getElementById('chem-write-input');
    if (writeInput) {
      writeInput.addEventListener('input', e => {
        activeQuiz.typedAnswer = e.target.value;
      });
      writeInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !activeQuiz.feedback) {
          evaluateCurrentQuestion();
        }
      });
    }

    // Botones de opción de texto (Estructura -> Nombre)
    const textBtns = document.querySelectorAll('.option-text-btn');
    textBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (activeQuiz.feedback) return;
        if (global.SoundFX) global.SoundFX.playClick();
        activeQuiz.selectedAnswer = btn.getAttribute('data-option-val');
        renderApp();
      });
    });

    // Tarjetas de estructura SVG (Nombre -> Estructura)
    const svgCards = document.querySelectorAll('.option-svg-card');
    svgCards.forEach(card => {
      card.addEventListener('click', () => {
        if (activeQuiz.feedback) return;
        if (global.SoundFX) global.SoundFX.playClick();
        activeQuiz.selectedAnswer = parseInt(card.getAttribute('data-struct-idx'), 10);
        renderApp();
      });
    });

    const checkBtn = document.getElementById('btn-check-answer');
    if (checkBtn) {
      checkBtn.addEventListener('click', evaluateCurrentQuestion);
    }

    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', advanceQuestion);
    }
  }

  function evaluateCurrentQuestion() {
    const q = activeQuiz.questions[activeQuiz.currentIndex];
    const isStructToName = q.mode === 'struct_to_name' || q.mode === 'write_name';
    let isCorrect = false;

    if (isStructToName) {
      const userRaw = state.preferredInputMode === 'write'
        ? activeQuiz.typedAnswer
        : activeQuiz.selectedAnswer;

      if (!userRaw || !String(userRaw).trim()) {
        alert('Por favor, selecciona o escribe una respuesta antes de comprobar.');
        return;
      }

      isCorrect = global.QuestionsData.checkWrittenAnswer(userRaw, q.acceptedNames);
    } else {
      if (activeQuiz.selectedAnswer === null || activeQuiz.selectedAnswer === undefined) {
        alert('Por favor, haz clic en una de las 4 estructuras químicas.');
        return;
      }
      const chosen = q.structOptions[activeQuiz.selectedAnswer];
      isCorrect = Boolean(chosen && chosen.isCorrect);
    }

    const validStr = (q.acceptedNames || []).join(' / ');
    const expText = q.explanation || q.hint || '';

    if (isCorrect) {
      if (global.SoundFX) global.SoundFX.playSuccess();
      activeQuiz.correctCount += 1;
      state.xp += 15;

      // Si estaba en el Laboratorio de Errores, eliminar de pendientes
      const errIdx = state.failedQuestions.findIndex(item => item.qId === q.qId);
      if (errIdx !== -1) {
        state.failedQuestions.splice(errIdx, 1);
      }

      activeQuiz.feedback = {
        correct: true,
        title: '¡Excelente! Respuesta correcta (+15 XP) ✨',
        message: `Nombre oficial UNIZAR: ${validStr}. ${expText}`
      };
    } else {
      if (global.SoundFX) global.SoundFX.playError();
      activeQuiz.hearts -= 1;

      // Guardar en el Laboratorio de Errores si no estaba ya
      if (!state.failedQuestions.some(item => item.qId === q.qId)) {
        state.failedQuestions.push(JSON.parse(JSON.stringify(q)));
      }

      activeQuiz.feedback = {
        correct: false,
        title: '¡Cuidado! Respuesta incorrecta (-1 ❤️)',
        message: `La respuesta correcta es: ${validStr}. ${expText}`
      };
    }

    saveState();
    renderApp();
  }

  function advanceQuestion() {
    if (global.SoundFX) global.SoundFX.playClick();

    if (activeQuiz.hearts <= 0) {
      activeQuiz.failedOut = true;
      activeQuiz.finished = true;
      renderApp();
      return;
    }

    if (activeQuiz.currentIndex + 1 >= activeQuiz.questions.length) {
      finishLevelSuccess();
      return;
    }

    activeQuiz.currentIndex += 1;
    activeQuiz.selectedAnswer = null;
    activeQuiz.typedAnswer = '';
    activeQuiz.showHint = false;
    activeQuiz.feedback = null;
    renderApp();
  }

  function finishLevelSuccess() {
    activeQuiz.finished = true;
    const total = activeQuiz.questions.length;
    const pct = Math.round((activeQuiz.correctCount / total) * 100);

    if (!activeQuiz.isErrorLab && pct >= 60) {
      const stars = pct >= 90 ? 3 : (pct >= 75 ? 2 : 1);
      const prev = state.completedLevels[activeQuiz.levelId];
      state.completedLevels[activeQuiz.levelId] = {
        stars: Math.max(stars, prev ? prev.stars : 0),
        bestPct: Math.max(pct, prev ? prev.bestPct : 0)
      };

      // Desbloquear el siguiente nivel en orden y mover el personaje allí
      const ordered = getAllLevelsOrdered();
      const idx = ordered.findIndex(item => item.level.id === activeQuiz.levelId);
      if (idx !== -1 && idx + 1 < ordered.length) {
        const nextLevelId = ordered[idx + 1].level.id;
        if (!state.unlockedLevels.includes(nextLevelId)) {
          state.unlockedLevels.push(nextLevelId);
        }
        state.currentNodeId = nextLevelId;
      }
      state.xp += 50;
      saveState();
    }

    if (global.SoundFX) global.SoundFX.playLevelUp();
    renderApp();
  }

  /* ==========================================================================
     MODAL MOCHILA DE APUNTES Y TABLA DE PRIORIDAD UNIZAR
     ========================================================================== */
  function renderNotesModal() {
    const rows = global.WorldsData.priorityTable;
    const worlds = global.WorldsData.worlds.slice(0, 7);

    return `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-window">
          <div class="modal-header">
            <h3>📖 Mochila de Apuntes · Tabla Oficial UNIZAR (30004)</h3>
            <button class="btn-3d btn-ghost" id="btn-close-modal">✖ Cerrar</button>
          </div>

          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:10px;">
            Cuando una molécula tiene varios grupos funcionales, el de <strong>mayor prioridad (arriba)</strong> lleva el <strong>sufijo principal</strong> y numera la cadena. Los demás actúan como sustituyentes (<strong>prefijo</strong>).
          </p>

          <table class="priority-table">
            <thead>
              <tr>
                <th>Prioridad</th>
                <th>Familia</th>
                <th>Fórmula</th>
                <th>Sufijo (Principal)</th>
                <th>Prefijo (Sustituyente)</th>
                <th>Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <td><strong>#${r.rank}</strong></td>
                  <td><strong>${escapeHtml(r.group)}</strong></td>
                  <td><code>${escapeHtml(r.formula)}</code></td>
                  <td style="color:#047857; font-weight:800;">${escapeHtml(r.suffix)}</td>
                  <td style="color:#1d4ed8; font-weight:700;">${escapeHtml(r.prefix)}</td>
                  <td>${escapeHtml(r.example)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h4 style="margin-top:22px; margin-bottom:10px; font-size:1.1rem;">📌 Resumen Rápido por Mundos</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
            ${worlds.map(w => `
              <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:12px; padding:12px;">
                <div style="font-weight:900; margin-bottom:6px;">${w.biomeIcon} ${escapeHtml(w.title)}</div>
                <p style="font-size:0.8rem; color:#0f172a; font-weight:700; margin-bottom:6px;">${escapeHtml(w.notes.summary)}</p>
                <ul style="padding-left:18px; font-size:0.8rem; color:#334155;">
                  ${(w.notes.rules || []).map(n => `<li>${escapeHtml(n)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderProfileModal() {
    const avatars = global.WorldsData.avatars;
    return `
      <div class="modal-backdrop" id="modal-backdrop">
        <div class="modal-window" style="max-width:560px;">
          <div class="modal-header">
            <h3>👩‍🔬 Perfil de Jugadora</h3>
            <button class="btn-3d btn-ghost" id="btn-close-modal">✖ Cerrar</button>
          </div>
          <div class="welcome-form-group">
            <label for="modal-player-name">Nombre:</label>
            <input type="text" id="modal-player-name" class="welcome-input" value="${escapeHtml(state.playerName)}" maxlength="28" />
          </div>
          <div class="welcome-form-group">
            <label>Cambiar Personaje:</label>
            <div class="avatar-grid">
              ${avatars.map(a => `
                <div class="avatar-option ${state.avatarId === a.id ? 'selected' : ''}" data-modal-avatar="${a.id}">
                  <span class="avatar-emoji">${a.emoji}</span>
                  <span class="avatar-name">${escapeHtml(a.name)}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; gap:12px; margin-top:18px;">
            <button class="btn-3d btn-red" id="btn-reset-progress">🗑️ Reiniciar Progreso</button>
            <button class="btn-3d btn-green" id="btn-save-profile">💾 Guardar Cambios</button>
          </div>
        </div>
      </div>
    `;
  }

  function bindGlobalEvents() {
    const homeBtn = document.getElementById('btn-go-home');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playClick();
        activeQuiz = null;
        renderApp();
      });
    }

    const notesBtn = document.getElementById('btn-open-notes');
    if (notesBtn) {
      notesBtn.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playClick();
        activeModal = 'notes';
        renderApp();
      });
    }

    const profileBtn = document.getElementById('btn-open-profile');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playClick();
        activeModal = 'profile';
        renderApp();
      });
    }

    const errorLabBtn = document.getElementById('btn-error-lab');
    if (errorLabBtn) {
      errorLabBtn.addEventListener('click', startErrorLabQuiz);
    }

    const teacherBtn = document.getElementById('btn-toggle-teacher');
    if (teacherBtn) {
      teacherBtn.addEventListener('click', () => {
        if (global.SoundFX) global.SoundFX.playClick();
        if (!state.teacherMode) {
          const pin = window.prompt('🔒 Acceso exclusivo para el Profesor.\nIntroduce la clave para desbloquear todos los mundos (clave: 1234 o unizar):');
          if (pin === null) return; // Pulsó cancelar
          const cleanPin = pin.trim().toLowerCase();
          if (cleanPin === '1234' || cleanPin === 'unizar') {
            state.teacherMode = true;
            saveState();
            if (global.SoundFX) global.SoundFX.playSuccess();
            alert('🔓 ¡Modo Profesor ACTIVADO!\nTodos los mundos y niveles están ahora desbloqueados para explicar en clase.');
          } else {
            if (global.SoundFX) global.SoundFX.playError();
            alert('❌ Clave incorrecta. Esta función está protegida para que solo el profesor pueda activarla.');
            return;
          }
        } else {
          state.teacherMode = false;
          saveState();
          alert('🔒 Modo Profesor DESACTIVADO. Vuelves al progreso normal guiado de la alumna.');
        }
        renderApp();
      });
    }

    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (global.SoundFX) {
          global.SoundFX.toggleMute();
          global.SoundFX.playClick();
        }
        renderApp();
      });
    }

    const closeModalBtn = document.getElementById('btn-close-modal');
    const backdrop = document.getElementById('modal-backdrop');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        activeModal = null;
        renderApp();
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) {
          activeModal = null;
          renderApp();
        }
      });
    }

    const modalAvatars = document.querySelectorAll('[data-modal-avatar]');
    modalAvatars.forEach(card => {
      card.addEventListener('click', () => {
        state.avatarId = card.getAttribute('data-modal-avatar');
        modalAvatars.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    const saveProfileBtn = document.getElementById('btn-save-profile');
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener('click', () => {
        const inp = document.getElementById('modal-player-name');
        if (inp && inp.value.trim()) {
          state.playerName = inp.value.trim();
        }
        saveState();
        activeModal = null;
        renderApp();
      });
    }

    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('¿Seguro que quieres reiniciar todo el progreso de niveles y estrellas?')) {
          localStorage.removeItem(STORAGE_KEY);
          state = loadState();
          activeModal = null;
          activeQuiz = null;
          renderApp();
        }
      });
    }
  }

  function escapeHtml(str) {
    return String(str === undefined || str === null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  document.addEventListener('DOMContentLoaded', renderApp);

  global.QuimicaApp = {
    renderApp: renderApp,
    getState: () => state
  };
})(window);
