FROM python:3.11-slim
WORKDIR /
COPY requirements.txt .
RUN pip install --no-cache-dir fastapi uvicorn groq qdrant-client psycopg2-binary bcrypt python-dotenv "pydantic[email]" google-generativeai openai
COPY . ./app
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]