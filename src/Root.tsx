import { Composition } from "remotion";
import { MyVideo } from "./Video";

export const Root = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
