export const projects = [
  {
    title: "AR-SCO",
    tag: "Agentic AI · Supply Chain",
    desc: "A multi-agent RAG framework that rewrites its own planning objective mid-disruption — cost, speed, or resilience — and re-optimizes a simulated 40-node network in real time.",
    metrics: ["SRT ↓57%", "OTIF +21.7pp", "ICBAI 2025"],
    repo: "https://github.com/Prithwi13/AR-SCO",
  },
  {
    title: "EdgeAuth",
    tag: "Computer Vision · On-Device",
    desc: "A two-stage CNN–ViT cascade that flags AI-generated images on-phone instead of in the cloud, LoRA-tuned to touch under 1% of its own weights.",
    metrics: ["97.4% accuracy", "AUC 0.978", "WACV 2026 (submitted)"],
    repo: "https://github.com/Prithwi13/EdgeAuth",
  },
  {
    title: "Predictive Maintenance",
    tag: "Industrial ML",
    desc: "An XGBoost failure-risk model on AI4I sensor data, wired into a live dashboard so maintenance teams get a real-time score instead of a fixed inspection schedule.",
    metrics: ["F1 0.625", "Precision 68.6%", "AUC 0.949"],
    repo: "https://github.com/Prithwi13/Predictive-maintenance-",
  },
  {
    title: "Optimizer & LR Schedule",
    tag: "Deep RL Lab · GRA Research",
    desc: "A 144-configuration factorial study across 60,000+ gene features and 33 cancer types, isolating how much the optimizer — not the architecture — decides the outcome.",
    metrics: ["L-BFGS 20x faster", "optimizer worth +5pp accuracy"],
    repo: "https://github.com/Prithwi13/Optimizer-Learning-Rate-Schedule",
  },
  {
    title: "Smart Home Bio-Analytics",
    tag: "Sensors · Privacy-First",
    desc: "Room occupancy inferred from temperature and humidity alone — no camera, no motion sensor — used to forecast household energy load. Built with Fahad Ullah Syed.",
    metrics: ["RMSE 51.2 Wh vs 78.6 Wh baseline"],
    repo: "https://github.com/Prithwi13/Smart-Home-Bio-Analytics",
  },
  {
    title: "alpha-signal",
    tag: "Quant · NLP",
    desc: "A pre-market signal engine designed to stay silent most days on purpose — LightGBM plus FinBERT news sentiment, firing only on statistically significant setups.",
    metrics: ["LightGBM + FinBERT", "time-based CV"],
    repo: "https://github.com/Prithwi13/alpha-signal",
  },
  {
    title: "Equity-AI",
    tag: "Agentic AI · Finance",
    desc: "An agentic research pipeline pairing FinBERT sentiment scoring with a price-direction model to draft its own equity research notes.",
    metrics: ["FinBERT + price-direction model"],
    repo: "https://github.com/Prithwi13/Equity-AI",
  },
  {
    title: "Memora",
    tag: "GenAI · Video",
    desc: "Hand it a topic — it retrieves, scripts, and narrates a short-form video, powered by a Gemini + retrieval-augmented pipeline underneath.",
    metrics: ["Gemini", "RAG pipeline"],
    repo: "https://github.com/Prithwi13/Memora",
  },
  {
    title: "Piston-Ring SPC",
    tag: "Six Sigma · Manufacturing",
    desc: "Classic X-bar/R control charts on piston-ring diameters — caught a process shift three subgroups before any part would have breached spec.",
    metrics: ["Cp 1.70", "Cpk 1.66"],
    repo: "https://github.com/Prithwi13/DMAIC",
  },
];

export const timeline = [
  {
    date: "May 2026 — Present",
    org: "The University of Texas at Arlington",
    role: "Graduate Research Assistant — Optimization & Computer Vision Research (Deep RL Lab)",
    desc: "144-configuration factorial study on cancer genomics data; leads applied ML research across GIS, computer vision and robotics for university collaborators.",
  },
  {
    date: "Jan 2025 — Apr 2026",
    org: "UT Arlington · Applied Statistics & Data Science Dept.",
    role: "Research Associate",
    desc: "Designed AR-SCO and the AI4I predictive-maintenance pipeline; presented findings at ICBAI 2025.",
  },
  {
    date: "Nov 2023 — Aug 2024",
    org: "Milieux Institute, Concordia University · Montreal",
    role: "Research Assistant",
    desc: "Diffusion models and computer vision for immersive installations — Kinect motion capture, PDE-driven simulation, real-time TouchDesigner pipelines.",
  },
  {
    date: "Feb 2023 — Aug 2023",
    org: "Code Clouds",
    role: "Software Engineer",
    desc: "Automated backend delivery in Node.js/TypeScript — release cycles cut by 3+ days, server load down 68%, response times up 40%.",
  },
];

export const timelineMore = [
  { role: "Junior Web Developer", org: "CodeClouds", date: "Sep 2022 – Feb 2023" },
  { role: "Software Engineer Intern", org: "Codelattice", date: "Apr 2022 – Aug 2022" },
  { role: "Research Assistant (NLP)", org: "Indian Institute of Technology, Delhi", date: "Aug 2021 – Jul 2022" },
  { role: "Software Engineer Intern", org: "FreshToHome", date: "Jan 2022 – Apr 2022" },
  { role: "Summer Intern", org: "Indian Institute of Technology, Madras", date: "May 2021 – Aug 2021" },
  { role: "Design Intern — thrust-bearing shafts", org: "WPIL", date: "May 2019 – Jul 2019" },
  { role: "Intern — crankshaft design", org: "Tata Motors", date: "May 2018 – Jul 2018" },
];

export const skills = [
  { group: "Statistical & ML", items: ["Regression", "XGBoost", "LightGBM", "PyTorch", "CNN / ViT", "LoRA / QLoRA", "SHAP", "SMOTE", "Time-Series"] },
  { group: "Agentic AI & LLM", items: ["LangGraph", "LangChain", "RAG", "FAISS / ChromaDB / Pinecone", "HF Transformers", "FinBERT"] },
  { group: "Data & Analytics", items: ["Python", "R", "SQL", "SAS", "Power BI", "GeoPandas / GIS"] },
  { group: "MLOps & Cloud", items: ["AWS", "Azure AI Foundry", "MLflow", "Docker", "FastAPI / Plumber", "CI/CD"] },
  { group: "Engineering", items: ["AutoCAD", "SolidWorks", "ANSYS", "Six Sigma DMAIC", "SPC", "GD&T"] },
];
