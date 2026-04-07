FROM python:3.11-slim
WORKDIR /
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir fastapi uvicorn groq qdrant-client psycopg2-binary==2.9.7 bcrypt python-dotenv "pydantic[email]" google-generativeai openai
COPY . ./app
CMD ["sh", "-c", "python -c 'import os; port=int(os.environ.get(\"PORT\", 8000)); from uvicorn import run; from app.main import app; run(app, host=\"0.0.0.0\", port=port)'"]