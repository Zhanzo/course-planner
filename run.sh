cd client/
npm run build
cd ../server
python manage.py collectstatic --noinput
python manage.py runserver_plus --cert-file /tmp/cert.crt
