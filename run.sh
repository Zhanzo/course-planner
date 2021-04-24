cd client/
npm run build
cd ../server
python manage.py collectstatic --noinput
cd ..
heroku local