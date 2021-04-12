# Functional and technological specification

## Functional specification

Our idea is a course planner where you can insert courses that you are interested in. Then the website gives the user information,
such as if the courses collide (same block, same period) or if the user will not reach the required amount of credits. The course planner will also tell the user if it has selected two similar courses that cannot be included in the degree.

The user can sign in to the website using for instance Facebook/Google and then it will see its list of course plans (if it has any).
The left side of the course planner has a list of courses and a course can then be dragged to a "box" on the right side of the screen to select the course. Above this box is information presented that shows the amount of credits.
If two courses collide or if they have the same content but different course codes, then they will be marked red and some information about this will be displayed.

Here is an example of the structure of the application (color choice and similar are not set in stone):
![](assets/CoursePlannerExample.png)

## Technological specification

The client framework that we are going to use is Angluar, and the server/backend framework is Django. We are also going to use Jenkins and Selenium for testing and deploying the application to Heroku.
