FROM mongo:latest

COPY init-db/01-dbinit.js /docker-entrypoint-initdb.d/
COPY init-db/02-init.sh /docker-entrypoint-initdb.d/
COPY init-db/data/users.json /tmp/data/

RUN mongo < /docker-entrypoint-initdb.d/01-dbinit.js