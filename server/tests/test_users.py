from django.test import TestCase
from users.models import User
from django.core.exceptions import ObjectDoesNotExist


class MyTestCase(TestCase):
    email1 = 'a@b.c'
    email2 = "b@b.c"
    token1 = "1234"
    token2 = "abcdef"

    def setUp(self) -> None:
        User.objects.create(email=self.email1, token=self.token1)
        User.objects.create(email=self.email2, token=self.token2)

    def test_can_get_user(self):
        user1 = User.objects.get(email=self.email1)
        user2 = User.objects.get(email=self.email2)

        self.assertEqual(user1.email, self.email1)
        self.assertEqual(user1.token, self.token1)
        self.assertEqual(user2.email, self.email2)
        self.assertEqual(user2.token, self.token2)

    def test_can_remove_user(self) -> None:
        user1 = User.objects.get(email=self.email1)
        user1.delete()
        with self.assertRaises(ObjectDoesNotExist):
            User.objects.get(email=self.email1)

    def test_can_remove_all_users(self):
        count = User.objects.all().delete()
        self.assertEqual(count[0], 2)
        with self.assertRaises(ObjectDoesNotExist):
            User.objects.get(email=self.email1)
        with self.assertRaises(ObjectDoesNotExist):
            User.objects.get(email=self.email2)

    def tearDown(self):
        User.objects.all().delete()
