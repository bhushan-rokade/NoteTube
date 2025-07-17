# NoteTube - Turn YouTube Videos into Notes!

NoteTube is a powerful web app that allows you to **generate summarized notes from YouTube videos**. Just paste a video link, and NoteTube will extract the transcript, analyze it using AI, and present you with clear, concise notes. Ideal for students, researchers, and lifelong learners.

---

## 🚀 Features

- 🔗 Paste any YouTube video link and generate notes
- 🧠 AI-powered transcript summarization
- 📝 Custom note description input for more relevant output
- 📥 Download notes as a PDF
- ⚡ Responsive UI

---

## 🛠️ Tech Stack

- **Frontend**: React.js + CSS3
- **Backend**: Node.js + Express.js
- **APIs**:
  - **Google Gemini AI (1.5 Flash)** for note generation
- **PDF Generation**: `jspdf`
- **Styling**: CSS3
- **Other Tools**: Axios, Markdown rendering

---

## 📸 Screenshots

<!-- Add your actual screenshots in the repo and update the paths below -->

| Home Page | Generated Notes |
|----------|-----------------|
| ![Home Page](./screenshots/home.png) | ![Notes Page](./screenshots/notes.png) |

---

## 📦 Installation & Usage

### 🔧 Frontend Setup

```bash
# Clone the repo
git clone https://github.com/bhushan-rokade/NoteTube.git
cd NoteTube/NoteTube-Frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### 🖥 Backend Setup

```bash
cd NoteTube/NoteTube-Backend

# Create a .env file with the following:
# API_KEY=your_gemini_api_key
# PORT=your_port_number

# Install dependencies
npm install

# Start the backend server
node server.js
```

> Make sure to configure your `.env` file for API keys before running the backend.

---

## 🧪 How It Works

1. User pastes a YouTube video URL.
2. Transcript is fetched using an external API.
3. AI (Gemini API) analyzes the transcript and generates notes.
4. Notes are displayed and can be downloaded as a PDF.

---

## 🌐 Live Demo

Deployed using **Render**: [https://notetube-ezcy.onrender.com/](https://notetube-ezcy.onrender.com/)

---

## 📂 Folder Structure

```
notetube/
├── NoteTube-Frontend/             # React frontend
├── NoteTube-Backend/             # Express backend 
└── README.md
```

---

## 📧 Contact

Created with ❤️ by [Bhushan Rokade](mailto:rokadebhushan2005@gmail.com)

- 🐙 GitHub: [@rokadebhushan](https://github.com/rokadebhushan)
- 📱 LinkedIn: [linkedin.com/in/rokadebhushan](https://linkedin.com/in/rokadebhushan)

---

> ⭐ If you like this project, consider giving it a star on GitHub!
