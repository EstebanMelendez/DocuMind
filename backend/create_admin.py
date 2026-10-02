import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
from app.models import Base, User
from passlib.context import CryptContext
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL no configurada")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from sqlalchemy import text

def run():
    print("Creando tabla de usuarios...")
    with engine.connect() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
        conn.commit()
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        users_data = [
            {"email": "indicio.admin@gmail.com", "password": "admin123", "name": "admin"},
            {"email": "indicio.auditor@gmail.com", "password": "auditor123", "name": "auditor"}
        ]
        
        for u_data in users_data:
            user = db.query(User).filter(User.email == u_data["email"]).first()
            hashed = pwd_context.hash(u_data["password"])
            if not user:
                print(f"Creando usuario {u_data['name']}...")
                new_user = User(email=u_data["email"], hashed_password=hashed)
                db.add(new_user)
                db.commit()
                print(f"Usuario '{u_data['email']}' creado exitosamente.")
            else:
                print(f"Actualizando contraseña del usuario existente {u_data['email']}...")
                user.hashed_password = hashed
                db.commit()
                print(f"Contraseña actualizada a '{u_data['password']}'.")
    finally:
        db.close()

if __name__ == "__main__":
    run()
