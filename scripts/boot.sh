
# Forces production build
if [ "--prod" == "$2" ]; then
    HUMBLE_ENV=production humble build --no-cache
    HUMBLE_ENV=production humble boot

# Spins up a single service as defined in .env
elif [ "" != "$2" ]; then
    echo "BOOT: $2"
    humble stop $2
    humble rm -f $2
    humble up -d $2
    humble logs -f $2

# Spins up the .env environment
else
    humble info
    humble down
    humble up -d
    humble logs -f
fi
