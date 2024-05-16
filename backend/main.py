from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Database connection
conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)
cursor = conn.cursor()

class Ticket(BaseModel):
    title: str
    description: str

@app.post("/tickets/")
def create_ticket(ticket: Ticket):
    try:
        cursor.execute(
            "INSERT INTO tickets (title, description) VALUES (%s, %s)",
            (ticket.title, ticket.description)
        )
        conn.commit()
        return {"message": "Ticket created successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))
