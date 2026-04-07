FROM python:3.11-slim
WORKDIR /code
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir fastapi uvicorn groq qdrant-client \
    psycopg2-binary==2.9.7 bcrypt python-dotenv "pydantic[email]" \
    google-generativeai openai
COPY . ./backend
EXPOSE 8000
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]