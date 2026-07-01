import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Persistent likes storage in likes.json in the project root
  const LIKES_FILE = path.join(process.cwd(), "likes.json");

  // Helper to load current likes map
  const getLikes = (): Record<string, number> => {
    try {
      if (fs.existsSync(LIKES_FILE)) {
        return JSON.parse(fs.readFileSync(LIKES_FILE, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading likes.json, returning empty map:", e);
    }
    // Return standard seed values so the library doesn't start with zero likes
    return {
      "secrets-of-game-design-part-1": 24,
      "traveling-faster-than-light": 42,
      "is-gravity-an-illusion": 57,
      "is-our-universe-a-hologram": 19,
      "the-law-that-builds-the-universe-entropy": 38,
      "is-our-universe-really-an-isolated-system": 15
    };
  };

  // Helper to save likes map
  const saveLikes = (likes: Record<string, number>) => {
    try {
      fs.writeFileSync(LIKES_FILE, JSON.stringify(likes, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing to likes.json:", e);
    }
  };

  // Persistent questions storage in questions.json in the project root
  const QUESTIONS_FILE = path.join(process.cwd(), "questions.json");

  // Initial seed questions
  const initialQuestionsList = [
    {
      id: "q_1",
      text: "Does consciousness require quantum processes inside microtubules, or is it purely a macro-level emergent phenomenon of classical neural networks?",
      author: "Penrose Disciple",
      date: "June 26, 2026",
      likesCount: 42,
      commentsCount: 3,
      imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
      comments: [
        { id: "c_1_1", author: "Orch-OR Fan", text: "Microtubules definitely have quantum coherence. Normal synapses are too noisy!", date: "June 26, 2026" },
        { id: "c_1_2", author: "Tegmark", text: "The brain is too warm, wet, and noisy for quantum decoherence times to matter.", date: "June 27, 2026" },
        { id: "c_1_3", author: "Anthropos", text: "Regardless of scale, emergence is the key. Software runs on silicon, but the silicon doesn't know it's a game.", date: "June 28, 2026" }
      ]
    },
    {
      id: "q_2",
      text: "If the holographic principle is correct, does that mean space-time is a secondary construct, and what we perceive as gravity is just entropy in 2D?",
      author: "Holographic Ponderer",
      date: "June 27, 2026",
      likesCount: 31,
      commentsCount: 2,
      imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80",
      comments: [
        { id: "c_2_1", author: "Verlinde", text: "Exactly! Entropic gravity describes general relativity as an emergent thermodynamic property.", date: "June 27, 2026" },
        { id: "c_2_2", author: "Minds_Eye", text: "Does this imply that the observer's screen is the only boundary that is real?", date: "June 28, 2026" }
      ]
    },
    {
      id: "q_3",
      text: "How do we experimentally verify the existence of other domains in Gregory Meholic's Tri-Space model without violating the speed-of-light limit in our own?",
      author: "Sarvesh Kore",
      date: "June 28, 2026",
      likesCount: 56,
      commentsCount: 2,
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      comments: [
        { id: "c_3_1", author: "Joel Mendonca", text: "Maybe by monitoring quantum entanglement states across extreme gravitational fields?", date: "June 28, 2026" },
        { id: "c_3_2", author: "Cosmic Scout", text: "If TEQs cross the membrane, we might detect energy fluctuations in vacuum chambers.", date: "June 29, 2026" }
      ]
    },
    {
      id: "q_4",
      text: "Can game design mechanics be applied to solve the crisis of collective attention, or do the same gamification feedback loops inherently destroy deep focus?",
      author: "Joel Mendonca",
      date: "June 29, 2026",
      likesCount: 48,
      commentsCount: 1,
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
      comments: [
        { id: "c_4_1", author: "FlowState", text: "Designing sandbox tasks that trigger flow states organically without extrinsic point rewards is the way.", date: "June 29, 2026" }
      ]
    },
    {
      id: "q_5",
      text: "If artificial superintelligence is achieved, what is the mathematical probability that its value alignment aligns with the preservation of biological life?",
      author: "Anthropos",
      date: "June 30, 2026",
      likesCount: 29,
      commentsCount: 1,
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      comments: [
        { id: "c_5_1", author: "Bostrom", text: "Without explicit, robust engineering of orthogonal objectives, the probability of safety is dangerously low.", date: "June 30, 2026" }
      ]
    }
  ];

  // Helper to load questions
  const getQuestions = (): any[] => {
    try {
      if (fs.existsSync(QUESTIONS_FILE)) {
        return JSON.parse(fs.readFileSync(QUESTIONS_FILE, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading questions.json, returning empty/seed:", e);
    }
    // Write seeds on first call
    try {
      fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(initialQuestionsList, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing initial questions.json:", e);
    }
    return initialQuestionsList;
  };

  // Helper to save questions
  const saveQuestions = (questions: any[]) => {
    try {
      fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing to questions.json:", e);
    }
  };

  // API endpoints
  app.get("/api/likes", (req, res) => {
    res.json(getLikes());
  });

  app.post("/api/likes/:slug", (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      res.status(400).json({ error: "Slug is required" });
      return;
    }
    const likes = getLikes();
    likes[slug] = (likes[slug] || 0) + 1;
    saveLikes(likes);
    res.json({ slug, likes: likes[slug] });
  });

  // Questions API
  app.get("/api/questions", (req, res) => {
    res.json(getQuestions());
  });

  app.post("/api/questions", (req, res) => {
    const { text, author, imageUrl } = req.body;
    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: "Question text is required" });
      return;
    }

    const questionsList = getQuestions();
    const newQuestion = {
      id: `q_${Date.now()}`,
      text: text.trim(),
      author: author?.trim() || "Anonymous",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      likesCount: 0,
      commentsCount: 0,
      imageUrl: imageUrl || "",
      comments: []
    };

    questionsList.unshift(newQuestion);
    saveQuestions(questionsList);
    res.status(210).json(newQuestion);
  });

  app.post("/api/questions/:id/like", (req, res) => {
    const { id } = req.params;
    const questionsList = getQuestions();
    const qIndex = questionsList.findIndex((q) => q.id === id);
    if (qIndex === -1) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    questionsList[qIndex].likesCount = (questionsList[qIndex].likesCount || 0) + 1;
    saveQuestions(questionsList);
    res.json({ success: true, likesCount: questionsList[qIndex].likesCount });
  });

  app.post("/api/questions/:id/comments", (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: "Comment text is required" });
      return;
    }

    const questionsList = getQuestions();
    const qIndex = questionsList.findIndex((q) => q.id === id);
    if (qIndex === -1) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const newComment = {
      id: `c_${Date.now()}`,
      author: author?.trim() || "Anonymous",
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    };

    questionsList[qIndex].comments = questionsList[qIndex].comments || [];
    questionsList[qIndex].comments.push(newComment);
    questionsList[qIndex].commentsCount = questionsList[qIndex].comments.length;

    saveQuestions(questionsList);
    res.status(210).json(newComment);
  });

  // Vite Integration for development / static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Collegium of Minds server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
