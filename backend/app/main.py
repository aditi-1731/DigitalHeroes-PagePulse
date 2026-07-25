from fastapi import FastAPI, HTTPException
import httpx
import time

from app.models import AuditResponse
from app.parser import parse_html
from app.utils import is_valid_url

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Page Pulse",
    description="Analyze any webpage and return SEO and metadata insights.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We'll restrict this after deployment if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Page Pulse API Running"
    }


@app.get("/audit", response_model=AuditResponse)
async def audit_page(url: str):

    if not is_valid_url(url):
        raise HTTPException(
            status_code=400,
            detail="Invalid URL"
        )

    try:
        start = time.perf_counter()

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)

        end = time.perf_counter()

        content_type = response.headers.get(
            "content-type",
            ""
        )

        if "text/html" not in content_type:
            raise HTTPException(
                status_code=400,
                detail="URL does not return HTML"
            )

        response_time = round(
            (end - start) * 1000,
            2
        )

        parsed = parse_html(response.text)

        return {
            "url": url,
            "status_code": response.status_code,
            "response_time_ms": response_time,
            **parsed
        }

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=408,
            detail="Request timed out"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )