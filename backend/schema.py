import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from db.models import session, ToDo


class ToDoType(SQLAlchemyObjectType):
    class Meta:
        model = ToDo


class UpdateToDo(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String(required=True)
        description = graphene.String(required=True)

    todo = graphene.Field(lambda: ToDoType)

    def mutate(self, info, id, title, description):
        todo = session.query(ToDo).filter_by(id=id).first()

        todo.title = title
        todo.description = description
        session.commit()
        return UpdateToDo(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = UpdateToDo.Field()


class Query(graphene.ObjectType):
    todo = graphene.Field(ToDoType, id=graphene.Int(required=True))
    all_todos = graphene.List(ToDoType)

    def resolve_all_todos(self, info):
        return session.query(ToDo).all()

    def resolve_todo(self, info, id):
        return session.query(ToDo).filter_by(id=id).first()


schema = graphene.Schema(query=Query, mutation=Mutation)
