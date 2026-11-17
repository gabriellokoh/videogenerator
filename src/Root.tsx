import { Composition } from 'remotion';
import { CinematicPilot } from './Video';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyVideo" // <--- ID EXATO que o seu render.yml procura
        component={CinematicPilot}
        durationInFrames={1800} // 30 segundos a 60fps (bate com o limite do seu modo "teste")
        fps={60}
        width={2560} // 1440p
        height={1440} // 1440p
      />
    </>
  );
};
