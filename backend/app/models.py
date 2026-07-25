from pydantic import BaseModel


class AuditResponse(BaseModel):
    url: str
    status_code: int
    response_time_ms: float
    title: str
    meta_description: str
    h1_count: int
    images_missing_alt: int
    word_count: int
    reading_time_minutes: float