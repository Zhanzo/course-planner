cd client/
npm run build
cd ../server
python manage.py collectstatic --noinput
python manage.py runserver
