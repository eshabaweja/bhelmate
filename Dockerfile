FROM python:3.9.17-bookworm

WORKDIR /app

COPY requirements.txt .

# ENV FLASK_APP=app.py

RUN apt-get update && apt-get -y install gcc && pip3 install --upgrade pip && pip3 install -r requirements.txt

COPY . .

# Command to start Rasa server `rasa run -m models --enable-api`
# CMD ["rasa", "run", "--port", "5005", "-m", "models", "--enable-api"]
EXPOSE 8000
# Command to start the Flask app (change it based on your Flask app's entry point)
# CMD ["python", "app.py"]
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8000"]
