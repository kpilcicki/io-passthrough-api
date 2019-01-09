docker build -t vote-manager/api:master .
docker rm -f vote_api
docker run -p 3010:3010 --env-file api.env --name vote_api vote-manager/api:master