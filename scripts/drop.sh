
# Drops production environment
if [ "--prod" == "$2" ]; then
    HUMBLE_ENV=production humble down

# Drops a single service as defined in .env
elif [ "" != "$2" ]; then
    echo "END SERVICE: $2"
    humble stop $2
    humble rm -f $2

# Drops the .env environment
else
    humble info
    humble down
fi
