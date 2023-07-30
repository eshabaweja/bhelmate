FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

# ENV FLASK_APP=app.py

RUN pip3 install -r requirements.txt

COPY . .

# Command to start Rasa server `rasa run -m models --enable-api`
CMD ["rasa", "run", "--port", "5005", "-m", "models", "--enable-api"]

# Command to start the Flask app (change it based on your Flask app's entry point)
# CMD ["python", "app.py"]
