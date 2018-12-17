git pull

docker build -t io-api .
docker rm -f api
docker run --name api -p 3010:3010 io-api