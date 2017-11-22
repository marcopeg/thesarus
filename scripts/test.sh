HUMBLE_ENV=test humble down

# Services
HUMBLE_ENV=test humble up -d postgres
HUMBLE_ENV=test humble up -d selenium
sleep 10

# Build the app
HUMBLE_ENV=test humble up -d --build server
sleep 10

HUMBLE_ENV=test humble up wdio
