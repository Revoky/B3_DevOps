# Projet MatchMe

## 👥 Répartition des groupes

- **Groupe 1** *(user, preferences, question/answer, challenge)*
  Fanny Costes-Rossignol & Gaëlle Lanic  
- **Groupe 2** *(authentification, swipe, match, messages)*
  François Gourbal & Matéo Bentoglio

## 📚 Documentation

- 📄 [OpenAPI](./documentation/backend/api/openapi.yaml)  
- ⚙️ [Installation (Docker)](./documentation/installation/docker.md)

## ✅ Validation des compétences

### Analyser les besoins et maquetter une application
- Recueil des besoins utilisateurs
- Réalisation de maquettes d’interfaces

### Définir l’architecture logicielle d’une application
- Architecture en couches: API REST, séparation backend/frontend
- Utilisation d’OpenAPI pour la documentation et la structure de l’API
- Gestion de la sécurité via des schémas d’authentification: JWT en cookie 🍪

### Concevoir et mettre en place une base de données relationnelle
- Modélisation des entités: utilisateurs, questions, réponses, matchs, messages, préférences, swipes
- Création du schéma relationnel et des relations entre tables
- Utilisation de migrations pour la gestion du schéma de base de données

### Développer des composants d’accès aux données SQL
- Implémentation de controllers pour l’accès et la manipulation des données via l’API

### Préparer et exécuter les plans de tests d’une application
- Mise en place de tests Postman pour les endpoints de l’API
- CI/CD pour tester le build frontend et le bon fonctionnement du backend et de la base de données

### Préparer et documenter le déploiement d’une application
- Documentation du processus d’installation et de déploiement (voir section Documentation ci-dessus)
- Utilisation de scripts pour l’automatisation du déploiement en environnement de développement et production

### Contribuer à la mise en production dans une démarche DevOps
- Utilisation de conteneurs Docker pour faciliter le déploiement
- Préparation de fichiers de configuration pour l’intégration continue (CI/CD)
- Suivi et gestion des versions via Git
