eval $(minikube docker-env)
echo "\033[32mChange Docker-Image Registry\033[0m => \033[34mMinikube\033[0m"
if [ docker images | grep nestkubetestapp ]
then
    echo "Delete previous image."
    docker rmi -f nestkubetestapp
fi
docker build -t nestkubetestapp .