# 🎬 How LLMs Work - Production Grade Explainer Video

A professional-grade animated explainer video about how Large Language Models work, built with [Remotion](https://www.remotion.dev/).

![Video Preview](https://img.shields.io/badge/Duration-99s-blue) ![Resolution-1920x1080-green) ![Platform-Linux-purple)

## 📺 Video Preview

https://github.com/user-attachments/assets/video.mp4

## 🎨 Features

- **8 Production Scenes** covering the complete LLM pipeline
- **Cyberpunk Aesthetic** with neon cyan/purple/pink color scheme
- **Advanced Animations:**
  - Animated backgrounds with grid, particles, gradient orbs
  - Glitch text effects with chromatic aberration
  - Neural network visualizations with pulse waves
  - Attention mechanism heat maps
  - 3D flip card animations
  - Spring physics-based transitions

## 🛠️ Built With

- [Remotion](https://www.remotion.dev/) - Programmatic video creation
- TypeScript
- React

## 🚀 Getting Started

```bash
# Install dependencies
cd llm-video
npm install

# Start development server
npm start

# Build video
npm run build
```

## 📁 Project Structure

```
llm-video/
├── src/
│   ├── Root.tsx                 # Main composition
│   ├── components/
│   │   ├── GlowText.tsx        # Neon glow text
│   │   ├── GridBackground.tsx  # Animated background
│   │   ├── NeonCard.tsx        # Glowing cards
│   │   ├── NeuralNetwork.tsx   # Neural viz
│   │   └── ParticleStream.tsx  # Particle effects
│   ├── scenes/
│   │   ├── Scene1_Intro.tsx
│   │   ├── Scene2_WhatIsLLM.tsx
│   │   ├── Scene3_Tokenization.tsx
│   │   ├── Scene4_Embeddings.tsx
│   │   ├── Scene5_Transformer.tsx
│   │   ├── Scene6_Attention.tsx
│   │   ├── Scene7_Output.tsx
│   │   └── Scene8_Conclusion.tsx
│   └── styles/
│       └── colors.ts            # Color palette
├── remotion.config.tsx
└── package.json
```

## 📖 What You'll Learn

1. **Tokenization** - How text is split into tokens
2. **Embeddings** - Converting tokens to numerical vectors
3. **Transformer Architecture** - The core neural network design
4. **Attention Mechanism** - How models understand word relationships
5. **Output Prediction** - How LLMs predict the next word

## 🎬 Watch the Video

The rendered video is available at: `llm-video/out/video.mp4`

To re-render:
```bash
cd llm-video
npm run build
```

## 📄 License

MIT

---

Made with ❤️ using Remotion
