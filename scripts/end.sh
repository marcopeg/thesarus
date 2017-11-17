
if [ "" != "$2" ]; then
    echo "END SERVICE: $2"
    humble stop $2
    humble rm -f $2
else
    humble info
    humble down
fi
