from db.models import engine, Base

Base.metadata.create_all(bind=engine)
