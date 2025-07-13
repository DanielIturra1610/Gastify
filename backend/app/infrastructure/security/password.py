from passlib.context import CryptContext

# Configuración del contexto de encriptación para contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica que una contraseña coincida con su hash."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Genera un hash para una contraseña."""
    return pwd_context.hash(password)