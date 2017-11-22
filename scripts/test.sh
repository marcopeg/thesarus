HUMBLE_ENV=test humble down

# Services
HUMBLE_ENV=test humble up -d postgres
HUMBLE_ENV=test humble up -d selenium

# Build the app
if [ "--build" == "$2" ]; then
    HUMBLE_ENV=test humble up -d --build server
else
    sleep 5
    HUMBLE_ENV=test humble up -d server
    sleep 10
fi

HUMBLE_ENV=test humble up wdio
HUMBLE_ENV=test humble down
