
if [ "" != "$2" ]; then
    humble exec $2 bash
else
    echo "Please name the service you want to control"
fi
