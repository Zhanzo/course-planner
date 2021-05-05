from django.contrib.auth.models import User
from django.test import TestCase

from course_plans.models import CoursePlan, Course


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

    def test_create_course(self):
        course = Course.objects.create(code="TDDB44", name="Compiler Construction", credits=6,
                                       semester="HT2", level="A1X", module="1")
        self.assertEqual(course.code, "TDDB44")
        self.assertEqual(course.name, 'Compiler Construction')
        self.assertEqual(course.credits, 6)
        self.assertEqual(course.semester, "HT2")
        self.assertEqual(course.level, "A1X")
        self.assertEqual(course.module, "1")

    def test_create_course_plan(self):
        user = User.objects.create_user(username='normal')
        course = Course.objects.create(code="TDDB44", name="Compiler Construction", credits=6,
                                       semester="HT2", level="A1X", module="1")
        course_plan = CoursePlan.objects.create(owner=user, title="Spring")
        course_plan.courses.add(course)
        self.assertEqual(course_plan.courses.get(id=course.id), course)
        self.assertEqual(course_plan.owner, user)
        self.assertEqual(course_plan.title, "Spring")
