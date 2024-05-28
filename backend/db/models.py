from sqlalchemy import String, Integer, DateTime, Column, create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

conn_str = "sqlite:///" + os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "todos.db"
)
engine = create_engine(conn_str)
session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = session.query_property()


class ToDo(Base):
    __tablename__ = "todo"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)

    def __repr__(self):
        return f"ToDo: {self.title}"
