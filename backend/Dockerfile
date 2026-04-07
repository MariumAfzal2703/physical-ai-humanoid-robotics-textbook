FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir fastapi uvicorn groq qdrant-client psycopg2-binary bcrypt python-dotenv pydantic[email] google-generativeai openai
COPY . .
CMD uvicorn main:app --host 0.0.0.0 --port $PORT