import { Composition, registerRoot } from "remotion";
import { MyVideo } from "./Video";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
