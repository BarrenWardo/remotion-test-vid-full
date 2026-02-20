import { Composition, Series } from "remotion";
import { Scene1_Intro } from "./scenes/Scene1_Intro";
import { Scene2_WhatIsLLM } from "./scenes/Scene2_WhatIsLLM";
import { Scene3_Tokenization } from "./scenes/Scene3_Tokenization";
import { Scene4_Embeddings } from "./scenes/Scene4_Embeddings";
import { Scene5_Transformer } from "./scenes/Scene5_Transformer";
import { Scene6_Attention } from "./scenes/Scene6_Attention";
import { Scene7_Output } from "./scenes/Scene7_Output";
import { Scene8_Conclusion } from "./scenes/Scene8_Conclusion";

const FPS = 30;

export const LLMTutorial = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={5 * FPS}>
        <Scene1_Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={10 * FPS}>
        <Scene2_WhatIsLLM />
      </Series.Sequence>
      <Series.Sequence durationInFrames={12 * FPS}>
        <Scene3_Tokenization />
      </Series.Sequence>
      <Series.Sequence durationInFrames={14 * FPS}>
        <Scene4_Embeddings />
      </Series.Sequence>
      <Series.Sequence durationInFrames={16 * FPS}>
        <Scene5_Transformer />
      </Series.Sequence>
      <Series.Sequence durationInFrames={16 * FPS}>
        <Scene6_Attention />
      </Series.Sequence>
      <Series.Sequence durationInFrames={14 * FPS}>
        <Scene7_Output />
      </Series.Sequence>
      <Series.Sequence durationInFrames={12 * FPS}>
        <Scene8_Conclusion />
      </Series.Sequence>
    </Series>
  );
};

export const Root = () => {
  return (
    <Composition
      id="LLMTutorial"
      component={LLMTutorial}
      durationInFrames={99 * FPS}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
