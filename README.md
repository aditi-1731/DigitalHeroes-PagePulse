# 🚀 Page Pulse

Page Pulse is a lightweight website audit tool built using FastAPI, HTML, CSS, and JavaScript.

It analyzes any webpage and provides useful SEO and accessibility insights within seconds.

---

## Features

- Website status code
- Response time
- Page title
- Meta description
- H1 tag count
- Images missing ALT attributes
- Word count
- Estimated reading time
- SEO Score
- Download audit report as JSON
- Responsive UI
- Loading indicator
- Error handling

---

## Tech Stack

Backend
- FastAPI
- BeautifulSoup
- HTTPX
- Pydantic

Frontend
- HTML
- CSS
- JavaScript

---

## Project Structure

backend/
- main.py
- parser.py
- models.py
- utils.py

frontend/
- index.html
- style.css
- script.js

---

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

```
/audit?url=https://example.com
```

Returns

```json
{
  "status_code": 200,
  "title": "...",
  "meta_description": "...",
  "h1_count": 1,
  "images_missing_alt": 0,
  "word_count": 400,
  "reading_time_minutes": 2
}
```

---

## Future Improvements

- Lighthouse integration
- SEO suggestions
- PDF report export
- Multi-page crawling
- Performance graphs
