from app.database import engine, Base
from app.models import Document, DocumentChunk

from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
    conn.commit()

Base.metadata.create_all(bind=engine)
print("Tablas creadas exitosamente.")
