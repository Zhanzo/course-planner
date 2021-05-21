from django.core.management.base import BaseCommand
from urllib.request import urlopen
from bs4 import BeautifulSoup

from course_plans.models import Course

class Command(BaseCommand):
    help = "Collect courses"

    # define logic of command
    def handle(self, *args, **options):
        self._add_d_line_courses()
        

    def _add_d_line_courses(self):
        # collect html
        html = urlopen('https://liu.se/studieinfo/en/program/6cddd/4971')

        # convert to soup
        soup = BeautifulSoup(html, 'html.parser')

        semesters = soup.findAll('main', class_='accordion__content')
        # Delete the first 6 semesters and the final semester
        del semesters[0:6]
        del semesters[3]

        for semester_nr, semester in enumerate(semesters, start=1):
            specializations = semester.findAll('div', class_='specialization')
            for specialization in specializations:
                # only add courses without specialization
                if specialization['data-specialization'] == '':
                    periods = specialization.findAll('tbody', class_='period')
                    for period_nr, period in enumerate(periods, start=1):
                        courses = period.findAll('tr', class_='main-row')
                        for course in courses:
                            fields = course.findAll('td')
                            code = fields[0].text
                            name = fields[1].text.strip()
                            credits = fields[2].text.replace('*', '')
                            level = fields[3].text
                            module = fields[4].text
                            try:
                                existing_course = Course.objects.get(code=code, semester=semester_nr)
                                # make sure that we do not add courses that already have been added
                                if len(existing_course.module) > 1 or existing_course.period == str(period_nr):
                                    continue
                                existing_course.module += ',' + str(module)
                                existing_course.period += ',' + str(period_nr)
                                existing_course.save()
                            except Course.DoesNotExist:
                                Course.objects.create(code=code, name=name, credits=credits, level=level, module=module, semester=semester_nr, period=period_nr)
