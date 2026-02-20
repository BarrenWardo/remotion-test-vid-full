# 🎬 How LLMs Work - Production Grade Explainer Video

A professional-grade animated explainer video about how Large Language Models work, built with [Remotion](https://www.remotion.dev/).

![Video Preview](https://img.shields.io/badge/Duration-99s-blue) ![Resolution-1920x1080-green) ![Platform-Linux-purple)

## 📺 Video Preview

Download and watch: `llm-video/out/video.mp4`

Or view on GitHub: [llm-video/out/video.mp4](llm-video/out/video.mp4)

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
```

## 💻 Development

### Development Server
Start the Remotion Studio for live preview:

```bash
cd llm-video
npm start
```

This opens a web interface at `http://localhost:3000` where you can:
- Preview all scenes in the browser
- Scrub through the timeline
- Make real-time edits to your compositions

### Hot Reload
Changes to the source code will automatically rebuild and refresh in the browser.

## 🎬 Render Video

### Local Rendering
Render the final video locally:

```bash
cd llm-video
npm run build
```

This outputs the video to: `out/video.mp4`

### Render Options

```bash
# Render a specific composition
npx remotion render remotion.config.tsx LLMTutorial out/video.mp4

# Render with custom settings
npx remotion render remotion.config.tsx LLMTutorial out/video.mp4 \
  --codec=h264 \
  --crf=23 \
  --scale=1
```

### Available CLI Options:
| Flag | Description | Default |
|------|-------------|---------|
| `--codec` | Video codec (h264, vp9) | h264 |
| `--crf` | Quality (0-51, lower = better) | 18 |
| `--scale` | Resolution scale (1 = 1080p, 0.5 = 540p) | 1 |
| `--fps` | Frames per second | 30 |
| `--duration` | Max duration in seconds | auto |

## ☁️ Deployment

### Deploy to Vercel (Recommended)
Deploy as a Remotion Studio on Vercel:

```bash
cd llm-video
npx remotion deploy
```

Or use the [Remotion Studio](https://remotion.dev/studio) for cloud rendering.

### Deploy as Static Video
1. Render the video locally (`npm run build`)
2. Upload `out/video.mp4` to any hosting:
   - **GitHub Releases**: Upload as release asset
   - **YouTube**: Upload as unlisted or public video
   - **Cloudinary/Cloudflare Stream**: For streaming with adaptive bitrate

### Deploy as Web App
You can deploy the Remotion Studio itself:

```bash
# Deploy to Vercel
npx remotion deploy

# Or build a static preview
npx remotion build remotion.config.tsx
```

## 🎛️ Configuration

Edit `remotion.config.tsx` to customize:

```typescript
import { Config } from "@remotion/cli";

Config.setVideoCodec("h264");
Config.setFPS(30);
Config.setQuality(80);
```

## 🛠️ Troubleshooting

```bash
# Clear cache
rm -rf node_modules/.cache

# Check for issues
npx remotion doctor

# Preview a specific frame
npx remotion still remotion.config.tsx LLMTutorial 150 out/frame.jpg
```

## 📖 What You'll Learn

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

## 📦 Rendered Output

The final video is at: `llm-video/out/video.mp4`

- **Format**: MP4 (H.264)
- **Duration**: ~99 seconds
- **Resolution**: 1920x1080 (16:9)
- **Size**: ~50MB

## 📄 License

MIT

---

Made with ❤️ using Remotion
