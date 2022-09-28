import factory

from app.item.models import Item
from app.tests.conftest import Session
from app.tests.factories import UserFactory


class ItemFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = Item
        sqlalchemy_session = Session
        sqlalchemy_session_persistence = 'commit'

    owner = factory.SubFactory(UserFactory)
    title = factory.Sequence(lambda n: "Item_%d" % n)
    description = 'sample description'
