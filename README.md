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

    f - "docker run --name containerDocker -d -p 80:80 nginx"
        + "docker cp ./html/index.html containerDocker:/usr/share/nginx/html/index.html"

        Successfully copied 2.05kB to containerDocker:/usr/share/nginx/html/index.html

4 : Builder une image

    a - FROM nginx
        COPY html/index.html /usr/share/nginx/html/index.html
        EXPOSE 80

    b - BUILD : "docker build -t nginx ."

        [+] Building 1.4s (8/8) FINISHED

        RUN : "docker run --name containerDocker -d -p 80:80 nginx"

    c - Avec la première solution, la visualisation des modifications locales est instantannée ; solution donc plus adaptée au développement
        Avec le Dockerfile il faut re-build et redémarrer à chaque modification, mais l'image est mieux structurée

5 : Utiliser une base de données dans un container Docker

    a - "docker pull mysql"
        "docker pull phpmyadmin/phpmyadmin"

    b - "docker network create networkTP1"

        MySQL
        docker run --name mysqlTP1 --network networkTP1 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=dbTP1 -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin -d mysql

        PhpMyAdmin
        docker run --name phpmyadminTP1 --network networkTP1 -e PMA_HOST=mysqlTP1 -d -p 8080:80 phpmyadmin/phpmyadmin

        [phpMyAdmin](phpMyAdmin8080.png)

6 : Utilisation de docker-compose.yml

    a - DOCKER RUN

        - Commande manuelle, utile pour lancer un seul conteneur à la fois
        - Chaque service (MySQL, phpMyAdmin) doit être démarré avec une commande séparée

    DOCKER COMPOSE

        - Permet d'écrire plusieurs services dans un seul fichier YAML
        - Crée automatiquement un réseau comun pour les services + gère les dépendances et l'ordre de démarrage + facilite la reconstruction et l'arrêt complet

    b - RUN

        "docker-compose up -d"

    STOP

        "docker-compose down"

    c - [docker-compose.yml](docker-compose.yml)
        [phpMyAdmin](phpMyAdmin8081.png)

