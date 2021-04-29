from django.test import TestCase
from django.contrib.auth.models import User
from course_plans.models import CoursePlan


class UsersManagersTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='normal', password='foo')
        self.assertEqual(user.username, 'normal')
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(ValueError):
            User.objects.create_user(username='')
        with self.assertRaises(ValueError):
            User.objects.create_user(username='', password="foo")
        user2 = User.objects.create_user(username='normal2')
        self.assertEqual(user2.username, 'normal2')

    def test_create_course_plan(self):
        user = User.objects.create_user(username='normal')
        course_plan = CoursePlan.objects.create(owner=user, title="Spring", course_codes={"TDDD27": "Advanced Web"})
        self.assertEqual(course_plan.owner, user)
        self.assertEqual(course_plan.title, "Spring")
        self.assertEqual(course_plan.course_codes, {"TDDD27": "Advanced Web"})
