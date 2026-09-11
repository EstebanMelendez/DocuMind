import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from app.models import Base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL no configurada en .env")

engine = create_engine(DATABASE_URL)

def migrate():
    print("Creando nuevas tablas...")
    Base.metadata.create_all(bind=engine)
    
    print("Añadiendo columna folder_id a documents (si no existe)...")
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE documents ADD COLUMN folder_id INTEGER;"))
            conn.execute(text("ALTER TABLE documents ADD CONSTRAINT fk_folder FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE SET NULL;"))
            conn.commit()
            print("Columna añadida con éxito.")
        except Exception as e:
            print(f"Nota: {e}")
            
if __name__ == "__main__":
    migrate()
