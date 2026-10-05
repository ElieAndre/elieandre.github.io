// Public content only. Add verified outcomes and source links before publishing them.
// Add future writing as {title, date: "YYYY-MM-DD", summary, href} to PORTFOLIO_WRITING.
const PORTFOLIO_PROJECTS = [
  {
    id: "quant", category: "platform", number: "01", kind: "PRIVATE PLATFORM · IN DEVELOPMENT", title: "Quant",
    summary: "A quantitative research platform connecting market data, strategy experiments, portfolio analysis and risk controls.",
    tags: ["Quantitative research", "Backtesting", "System design"], visual: "quant",
    context: "A long-running personal project moving beyond isolated trading scripts towards a modular research and trading system.",
    contribution: "Developing the platform end to end, with a focus on architecture, research workflows, iterative implementation and verification.",
    approach: "Separate research from execution, compare strategies through portfolio-level walk-forward testing, and treat reproducibility and explicit risk rules as core design concerns.",
    limitation: "Private project in development. Source code, repository details, strategy parameters and trading results are not shared. This description does not claim profitable live trading.",
    source: "Private project; public overview only.", href: null
  },
  {
    id: "leapmind-os", category: "platform", number: "02", kind: "BUSINESS OPERATIONS PLATFORM", title: "Leapmind OS",
    summary: "An internal CRM and operations platform bringing prospect management, outreach, follow-ups and calendar workflows together.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker"], visual: "operations",
    context: "An internal operating system for iStaffRota business operations, rather than a clinical or care-recipient system.",
    contribution: "End-to-end platform development spanning the interface, backend APIs, database workflows and deployment, supported by automated testing and iterative review.",
    approach: "Connect CRM records to communication history and calendar events; use role-based permissions, contact safety controls and server-side pagination. AI-assisted email drafts remain distinct from permission to send.",
    limitation: "An internal platform, not a public demo. Private records, infrastructure configuration and code are not exposed here; no adoption or business-impact figures are claimed.",
    source: "Project build and handover notes.", href: null
  },
  {
    id: "llm-evaluation", category: "llm", number: "04", kind: "RESEARCH INTERNSHIP", title: "Evaluating language models",
    summary: "Reproducible comparisons of model outputs, with attention to factuality, relevance and fluency.",
    tags: ["Python", "OpenAI API", "Evaluation"], visual: "language",
    context: "At The Alan Turing Institute, I worked on comparing language-model outputs and making evaluation workflows repeatable.",
    contribution: "Built automated evaluation workflows, investigated prompting approaches and worked with structured metrics for comparing outputs.",
    approach: "Use consistent tasks and prompts, preserve outputs and compare results using defined criteria rather than judging a single impressive response.",
    limitation: "This is a description of research experience. No private code, unpublished results or numerical performance claims are presented here.",
    source: "Internship experience, June–December 2024.", href: null
  },
  {
    id: "food-classifier", category: "vision", number: "05", kind: "RESEARCH PROTOTYPE", title: "From an image to a prediction",
    summary: "A small food / non-food image classifier served through a Flask endpoint, developed as part of my Cavendish project.",
    tags: ["TensorFlow", "OpenCV", "Flask"], visual: "vision",
    context: "An image-classification prototype exploring the step between a trained model and an application that accepts an image.",
    contribution: "Implemented an upload endpoint that decodes an image, resizes it to 256 × 256, normalises its pixels and passes it to a saved Keras model.",
    approach: "The endpoint returns a food / non-food prediction as JSON using a 0.5 decision threshold. The implementation makes the preprocessing and inference path explicit.",
    limitation: "A local prototype, not an established food-waste measurement system. Accuracy, calibration and robustness are not reported without a verified evaluation.",
    source: "Local Cavendish project implementation.", href: null
  },
  {
    id: "car-classifier", category: "vision", number: "06", kind: "PERSONAL PROJECT", title: "German car classifier",
    summary: "An image-classification experiment with a training notebook and a small application for trying predictions.",
    tags: ["Python", "fastai", "Computer vision"], visual: "classifier",
    context: "A personal project applying image classification to German car brands.",
    contribution: "The public repository contains the training notebook, an application, sample images and an exported model.",
    approach: "Use the notebook to inspect the training workflow and the application to try images against the exported classifier.",
    limitation: "An experimental project. The repository documentation is inconsistent about the exact class set and serving framework, so those details are not claimed here. No live deployment or accuracy figure is asserted.",
    source: "Public project repository.", href: "https://github.com/ElieAndre/german-car-classifier"
  }
];
const PORTFOLIO_WRITING = [
  {title: "A Beginner’s Guide to Git: Mastering Version Control", date: "2024-11-19", summary: "An introduction to version control and collaboration with Git.", href: "https://medium.com/@elieandre/a-beginners-guide-to-git-mastering-version-control-63649d9c4f6c"},
  {title: "Getting Started with AI: Building an Image Classifier Using Fastai", date: "2024-08-05", summary: "A practical introduction to building an image classifier with fastai.", href: "https://medium.com/@elieandre/getting-started-with-ai-building-an-image-classifier-using-fastai-17f975eb1296"},
  {title: "Navigating the Bash Terminal: A Beginner’s Guide", date: "2024-08-05", summary: "Getting comfortable with the Bash terminal as a beginner.", href: "https://medium.com/@elieandre/navigating-the-bash-terminal-a-beginners-guide-06610fd5a5c6"},
  {title: "A Beginner’s Guide to AI: Getting Started with Python", date: "2024-07-25", summary: "Starting an AI learning journey with Python.", href: "https://medium.com/@elieandre/a-beginners-guide-to-ai-getting-started-with-python-e7a31847df0d"}
];
