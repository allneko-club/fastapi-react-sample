import factory

from app.tests.conftest import Session
from app.user.models import User
from app.user.password import get_password_hash


class UserFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = User
        sqlalchemy_session = Session
        sqlalchemy_session_persistence = 'commit'

    name = factory.Sequence(lambda n: "User_%d" % n)
    email = factory.Sequence(lambda n: "test%d@example.com" % n)
    hashed_password = get_password_hash('password')


class SuperUserFactory(UserFactory):
    is_superuser = True
