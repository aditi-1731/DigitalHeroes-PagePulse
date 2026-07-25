from bs4 import BeautifulSoup


def parse_html(html: str):
    soup = BeautifulSoup(html, "html.parser")

    title = soup.title.string.strip() if soup.title and soup.title.string else "Not Found"

    meta = soup.find("meta", attrs={"name": "description"})
    meta_description = (
        meta.get("content", "").strip()
        if meta
        else "Not Found"
    )

    h1_count = len(soup.find_all("h1"))

    images = soup.find_all("img")
    images_missing_alt = sum(
        1 for img in images
        if not img.get("alt")
    )

    text = soup.get_text(separator=" ", strip=True)
    word_count = len(text.split())

    reading_time = round(word_count / 200, 1)

    return {
        "title": title,
        "meta_description": meta_description,
        "h1_count": h1_count,
        "images_missing_alt": images_missing_alt,
        "word_count": word_count,
        "reading_time_minutes": reading_time
    }