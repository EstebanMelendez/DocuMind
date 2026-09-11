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

def run():
    print("Creando tabla de usuarios...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == "admin@documind.com").first()
        hashed = pwd_context.hash("admin123")
        if not user:
            print("Creando usuario admin...")
            new_user = User(email="admin@documind.com", hashed_password=hashed)
            db.add(new_user)
            db.commit()
            print("Usuario 'admin@documind.com' creado exitosamente con contraseña 'admin123'.")
        else:
            print("Actualizando contraseña del usuario existente...")
            user.hashed_password = hashed
            db.commit()
            print("Contraseña actualizada a 'admin123'.")
    finally:
        db.close()

if __name__ == "__main__":
    run()
