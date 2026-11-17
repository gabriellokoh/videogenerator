import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from 'remotion';

// --- TEMA ---
const THEME = {
  colors: {
    background: '#0A0A0A',
    red: '#E63946',
    white: '#F8F9FA',
    gold: '#D4AF37',
  },
  fonts: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }
};

// --- COMPONENTES ---
const SpotlightEffect: React.FC<{ color?: string; intensity?: number }> = ({ color = THEME.colors.red, intensity = 0.15 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(Math.sin(frame / 30), [-1, 1], [0.95, 1.05]);
  return (
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 80%, ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`, transform: `scale(${scale})`, pointerEvents: 'none' }} />
  );
};

const KineticTypography: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 8;
        const opacity = interpolate(frame - wordDelay, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
        const y = interpolate(frame - wordDelay, [0, 20], [20, 0], { extrapolateRight: 'clamp' });
        return <span key={i} style={{ fontFamily: THEME.fonts.sans, fontSize: 90, fontWeight: 600, color: THEME.colors.white, opacity, transform: `translateY(${y}px)`, letterSpacing: '-0.02em' }}>{word}</span>;
      })}
    </div>
  );
};

const CinematicTransition: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({ durationInFrames, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30, durationInFrames - 30, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity, width: '100%', height: '100%' }}>{children}</div>;
};

// --- GRAFICOS SVG ---
const ChessPawn: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path d="M50 10 C55 10 60 15 60 20 C60 25 55 30 50 30 C45 30 40 25 40 20 C40 15 45 10 50 10 Z" fill={THEME.colors.gold} />
    <path d="M40 30 L45 50 L35 70 L65 70 L55 50 L60 30 Z" fill={THEME.colors.gold} />
    <path d="M25 85 L75 85 L70 70 L30 70 Z" fill={THEME.colors.gold} />
  </svg>
);

const Silhouette: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <svg width="400" height="500" viewBox="0 0 100 150" fill="none" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
    <path d="M50 20 C58 20 65 28 65 38 C65 48 58 55 50 55 C42 55 35 48 35 38 C35 28 42 20 50 20 Z" fill="#000" />
    <path d="M35 60 L65 60 L80 150 L20 150 Z" fill="#000" />
  </svg>
);

// --- CENAS ---
const Scene1Chess: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 500], [1, 1.15]); 
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}><ChessPawn size={300} /></div>
      <SpotlightEffect intensity={0.2} />
    </AbsoluteFill>
  );
};

const Scene2Diagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineGrow = spring({ frame, fps, config: { damping: 200 }, delay: 40 });
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 150 }}><KineticTypography text="O PODER DA INFLUÊNCIA" delay={20} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 150, marginTop: 100 }}>
        <div style={{ opacity: interpolate(frame, [0, 40], [0, 1]) }}><Silhouette /></div>
        <div style={{ width: 200 * lineGrow, height: 4, backgroundColor: THEME.colors.red, boxShadow: `0 0 25px ${THEME.colors.red}` }}>
           <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', width: 30, height: 30, backgroundColor: THEME.colors.red, opacity: lineGrow, boxShadow: `0 0 30px ${THEME.colors.red}` }} />
        </div>
        <div style={{ opacity: interpolate(frame, [0, 40], [0, 1]) }}><Silhouette flip /></div>
      </div>
    </AbsoluteFill>
  );
};

const Scene3Spotlight: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [40, 120], [0, 1], { extrapolateRight: 'clamp' });
  const vignette = interpolate(frame, [0, 120], [0.5, 0.9]);
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -400, width: 800, height: 1800, background: `linear-gradient(to bottom, ${THEME.colors.red}66, transparent 80%)`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', opacity: reveal, transform: `scaleY(${reveal})`, transformOrigin: 'top', mixBlendMode: 'screen' }} />
      <div style={{ zIndex: 10, marginBottom: 100, opacity: reveal, filter: 'drop-shadow(0 0 30px rgba(0,0,0,1))' }}><Silhouette /></div>
      <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 300px 150px rgba(0,0,0,${vignette})`, pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};

// --- COMPOSIÇÃO PRINCIPAL ---
export const CinematicPilot: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.background }}>
      {/* 
        NOTA DE ÁUDIO: 
        Como o seu render.yml tem --audio-codec, o Remotion precisa de um áudio.
        O seu python prepare_audio.py provavelmente gera um arquivo (ex: audio.mp3) na pasta public.
        Descomente a linha abaixo quando tiver certeza do nome do arquivo.
      */}
      {/* <Audio src={staticFile('audio.mp3')} /> */}

      {/* Cena 1 - 8 segundos (480 frames) */}
      <Sequence from={0} durationInFrames={480}>
        <CinematicTransition durationInFrames={480}><Scene1Chess /></CinematicTransition>
      </Sequence>

      {/* Cena 2 - 10 segundos (600 frames) */}
      <Sequence from={460} durationInFrames={600}>
        <CinematicTransition durationInFrames={600}><Scene2Diagram /></CinematicTransition>
      </Sequence>

      {/* Cena 3 - 12 segundos (720 frames) */}
      <Sequence from={1040} durationInFrames={720}>
        <CinematicTransition durationInFrames={720}><Scene3Spotlight /></CinematicTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
