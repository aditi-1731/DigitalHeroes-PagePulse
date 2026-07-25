# 🚀 Page Pulse

A lightweight full-stack website auditing tool that analyzes SEO and accessibility metrics using FastAPI and a responsive JavaScript dashboard.

---

## ✨ Features

- 🚀 Analyze any webpage in seconds
- 📄 Extract page title and meta description
- 🏷️ Count H1 headings
- 🖼️ Detect images missing ALT attributes
- ⚡ Measure response time
- 📚 Calculate word count and estimated reading time
- 📊 Generate an SEO score
- 📥 Download audit reports as JSON
- 📱 Responsive dashboard
- ❌ Graceful error handling

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|--------------|
| Backend | FastAPI, HTTPX, BeautifulSoup, Pydantic |
| Frontend | HTML5, CSS3, JavaScript |
| API Docs | Swagger UI |

---

## Project Structure

DigitalHeroes-PagePulse/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── parser.py
│   │   ├── models.py
│   │   └── utils.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
└── AI_USAGE.md
---

## Prerequisites

- Python 3.10+
- Git
- VS Code (recommended)
- Live Server extension


## Installation

Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r app/requirements.txt

uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

### Frontend

Open

```
frontend/index.html
```

using Live Server.

---

## API

GET

### Endpoint

```http
GET /audit
```

### Query Parameter

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string | Website URL to analyze |

Example

```
GET /audit?url=https://example.com
```
Returns

```json
{
  "url": "https://example.com",
  "status_code": 200,
  "response_time_ms": 312.4,
  "title": "Example Domain",
  "meta_description": "Not Found",
  "h1_count": 1,
  "images_missing_alt": 0,
  "word_count": 21,
  "reading_time_minutes": 0.1
}
```

---

## 🚀 Future Improvements

- PDF report export
- Multi-page website crawling
- SEO recommendations
- Accessibility score
- Performance charts
- Dark mode

## AI Assistance

AI was used to assist with brainstorming, debugging, UI refinement, and documentation. The application architecture, implementation, testing, and final integration were completed manually.

## Author

**Aditi Tripathi** 
