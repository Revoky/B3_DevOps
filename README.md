Fanny Costes-Rossignol

TP1

3 : Exécuter un serveur web dans un container Docker
    a - "docker pull nginx"

        Using default tag: latest
        latest: Pulling from library/nginx
        405bd2df85b6: Pull complete
        cc80efff8457: Pull complete
        abddc69cb49d: Pull complete
        6c4aa022e8e1: Pull complete
        2b9310b2ee4b: Pull complete
        61320b01ae5e: Pull complete
        670a101d432b: Pull complete
        Digest: sha256:fb39280b7b9eba5727c884a3c7810002e69e8f961cc373b89c92f14961d903a0
        Status: Downloaded newer image for nginx:latest
        docker.io/library/nginx:latest

    b - "docker images"

        REPOSITORY                   TAG       IMAGE ID       CREATED        SIZE
        nginx                        latest    fb39280b7b9e   6 weeks ago    279MB

    c - "mkdir ./html" + "echo "Hello world" > ./html/index.html"

    d - "docker run --name containerDocker -p 80:80 -v C:\Users\fanny\Desktop\"Ynov 24-25"\Cours\devOps\html -d nginx"

    e - "docker rm -f containerDocker"

    f - "docker run --name containerDocker -p 80:80 -d nginx"
        + "docker cp ./html/index.html containerDocker:/usr/share/nginx/html/index.html"

        Successfully copied 2.05kB to containerDocker:/usr/share/nginx/html/index.html