/**
 * MOTOR DE SONIDO SINTETIZADO (WEB AUDIO API)
 * Genera efectos de sonido estilo Duolingo/videojuego en tiempo real
 * sin necesidad de cargar archivos MP3 externos.
 */

window.SoundFX = (function () {
    let ctx = null;
    let muted = false;

    function getContext() {
        if (!ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                ctx = new AudioCtx();
            }
        }
        if (ctx && ctx.state === 'suspended') {
            ctx.resume();
        }
        return ctx;
    }

    function playTone(freq, type, duration, startTimeOffset = 0, volume = 0.18) {
        if (muted) return;
        const audioCtx = getContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime + startTimeOffset;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.02);
    }

    // Sonido al pulsar botones u opciones
    function playClick() {
        playTone(520, 'sine', 0.06, 0, 0.1);
    }

    // Sonido de caminar del personaje por el mapa
    function playStep() {
        playTone(340, 'triangle', 0.07, 0, 0.12);
        playTone(440, 'triangle', 0.07, 0.09, 0.12);
    }

    // ¡Respuesta Correcta! (Acorde alegre estilo Duolingo)
    function playSuccess() {
        playTone(523.25, 'sine', 0.14, 0.00, 0.2);   // C5
        playTone(659.25, 'sine', 0.14, 0.08, 0.2);   // E5
        playTone(783.99, 'sine', 0.16, 0.16, 0.22);  // G5
        playTone(1046.50, 'triangle', 0.32, 0.24, 0.24); // C6
    }

    // Respuesta Incorrecta (Tono suave descendente)
    function playError() {
        playTone(280, 'sawtooth', 0.18, 0.00, 0.12);
        playTone(210, 'sawtooth', 0.28, 0.14, 0.14);
    }

    // Pista del Profe (Bombilla)
    function playHint() {
        playTone(880, 'sine', 0.12, 0.00, 0.14);
        playTone(1174.66, 'sine', 0.22, 0.09, 0.16);
    }

    // ¡Nivel Completado! (Fanfarria de victoria)
    function playLevelUp() {
        const notes = [
            { f: 523.25, t: 0.00, d: 0.14 }, // C5
            { f: 659.25, t: 0.11, d: 0.14 }, // E5
            { f: 783.99, t: 0.22, d: 0.14 }, // G5
            { f: 1046.50, t: 0.33, d: 0.22 }, // C6
            { f: 783.99, t: 0.50, d: 0.14 }, // G5
            { f: 1046.50, t: 0.62, d: 0.45 }  // C6 largo
        ];
        notes.forEach(n => playTone(n.f, 'triangle', n.d, n.t, 0.22));
    }

    function toggleMute() {
        muted = !muted;
        return muted;
    }

    function isMuted() {
        return muted;
    }

    function setMuted(val) {
        muted = !!val;
    }

    return {
        playClick,
        playStep,
        playSuccess,
        playError,
        playHint,
        playLevelUp,
        toggleMute,
        isMuted,
        setMuted
    };
})();
