# <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" width="50"> Azure Cloud Computing Project
Projet réalisé pour le cours **IR4 S8 FR Introduction au cloud computing**.
<br>Pour aller directement à la partie configuration [cliquer-ici](#configuration).

## 1. Contexte industriel
Une équipe Digital Platforms doit concevoir et déployer une plateforme cloud-native
permettant de diffuser dynamiquement du contenu statique (événements, actualités,
FAQ) à destination :
- D’un site web public,
- D’applications clientes (mobile / frontend),
- De partenaires via API REST.
 
Le contenu est produit par une équipe éditoriale et stocké dans Azure Blob Storage sous
forme de fichiers JSON/YAML.<br>
La plateforme doit être déployée automatiquement, scalable, sécurisée, observable, et
économique, dans un contexte Azure étudiant.<br>
Vous êtes missionnés pour concevoir, implémenter, déployer et justifier cette solution.
À l’issue du projet, vous devrez démontrer votre capacité à :
- Concevoir une architecture cloud cohérente
- Conteneuriser une application (Docker)
- Déployer sur Azure Kubernetes Service (AKS)
- Automatiser via CI/CD (GitHub Actions)
- Gérer la sécurité, la scalabilité et l’observabilité
- Justifier vos choix techniques (coût, performance, contraintes)


## 2. Contraintes techniques imposées
- Compte Azure for Students
- Orchestration: Azure Kubernetes Service (AKS)
- Registry d’images : GitHub Container Registry (GHCR)
- Application backend : Flask
- Stockage des contenus : Azure Blob Storage
- CI/CD : GitHub Actions

## 3. Fonctionnalités attendues
Application Flask
L’application devra :
1. Lire des fichiers JSON et YAML depuis Azure Blob Storage
2. Exposer les endpoints REST suivants :<br>

|  Endpoints  | Méthode | Description                   |
|:-----------:|:-------:|-------------------------------|
| /api/events |   GET   | Retourne les événements       |
|  /api/news  |   GET   | Retourne les actualités       |
|  /api/faq   |   GET   | Retourne la FAQ               |
|   /health   |   GET   | Vérification de vie           |
|   /readyz   |   GET   | Vérification de disponibilité |
3. Implémenter un cache mémoire avec TTL (ex : 60 s)
4. Fournir une interface web minimale pour visualiser les données


## 4. Gestion de version (Git)
- Dépôt GitHub structuré proprement
- README.md complet
- Fichier .gitignore adapté
- Stratégie Git justifiée :
  - Trunk-based ou
  - Git Flow
### Questions à traiter
1. Pourquoi cette stratégie Git ?
    
    Nous avons utilisé la stratégie **Git Flow** pour les features principales et la **Trunk-based** pour les modifications légères. Cela nous a permis d'avoir une traçabilité des features, et également de ne pas *polluer* notre repository avec des branches pour l'ajout d'un simple fichier n'en nécessitant pas.


2. Comment garantir un historique lisible et maintenable ?

    Il est important d'avoir des noms de commits simples et constants (ex: fix & feat).


3. Quels fichiers ne doivent jamais être versionnés ?
    - Les fichers .env avec des informations privées
    - Les dossiers __pycache__ et .idea étant des fichiers de fonctionnement propre à chaque environnement
    - Le venv car cela serait trop lourd et pas forcément adapté à toutes les machines

## 5. Conteneurisation (Docker)
- Dockerfile optimisé :
  - Image slim
  - Utilisateur non-root
  - Pas de dépendances inutiles
- Test local obligatoire
### Questions à traiter
1. Comment réduire la taille de l’image ?
2. Pourquoi l’image Docker est-elle un paquet binaire d’application ?
3. Pourquoi le conteneur doit être stateless ?


## 6. Orchestration Kubernetes (AKS) (Pour [@Volnetiks](https://github.com/Volnetiks))
### Manifests requis
- Namespace
- Deployment
- Service
- Ingress (NGINX recommandé)
- ConfigMap
- Secret (clé Blob ou équivalent)
### Exigences
- requests / limits CPU et mémoire
- Readiness & liveness probes
- Rolling update sans interruption
### Questions à traiter
1. Rôle de chaque ressource Kubernetes ?
2. Différence entre readiness et liveness ?
3. Impact des resources sur la scalabilité ?

## 7. CI/CD avec GitHub Actions
### Pipeline automatisé déclenché à chaque push sur main :
1. Lint et tests
2. Build image Docker
3. Push image vers GHCR
4. Déploiement sur AKS
5. Smoke test post-déploiement
### Questions à traiter
1. Pourquoi GHCR plutôt qu’Azure Container Registry ?
2. Comment gérer les secrets dans le pipeline ?
3. Quelle stratégie de rollback ?

## 8. Surveillance & journalisation (Azure Monitor – simple)
- Monitoring basique :
    - CPU / mémoire
    - Disponibilité du service
- Logs applicatifs niveau INFO
- 1 alerte simple (ex : erreurs 5xx)
### Questions à traiter
1. Quelles métriques sont réellement utiles ?
2. Pourquoi éviter une journalisation excessive ?
3. Comment limiter les coûts Azure Monitor ?


## 9. Sécurité
- Accès Blob sécurisé :
    - Secret Kubernetes (minimum)
    - Bonus : Managed Identity
- Secrets non exposés dans le code 
- Image Docker sécurisée (non-root)
### Questions à traiter
1. Pourquoi ne pas stocker de secrets dans Git ?
2. Avantages Managed Identity vs clé statique ?
3. Risques de fuite dans les logs ?

## 10. Tests et assurance qualité
### Démontrer que l’application :
- Fonctionne correctement de manière automatisée,
- Est reproductible (localement et dans la CI),
- Détecte immédiatement toute régression avant déploiement.

## 10.1 Exigences générales
- Écrire un jeu de tests automatisés pour l’application Flask ;
- Exécuter ces tests localement et dans le pipeline CI ;
- Démontrer le bon fonctionnement des tests lors de la soutenance.
### Les tests doivent être :
- Rapides,
- Indépendants de l’environnement Azure,
- Reproductibles (sans dépendre d’un service externe actif)

## 10.2 Périmètre de test obligatoire
### Les tests devront couvrir au minimum les éléments suivants :
a) Tests de santé (Health checks)

    Endpoint /healthz
    Endpoint /readyz
Critères de validation :
- Code HTTP 200,
- Réponse JSON valide,
- Présence d’un champ indiquant l’état du service.

b) Tests fonctionnels des endpoints API
<br>Les endpoints suivants doivent être testés :
    
    /api/events
    /api/news 
    /api/faq
Critères de validation :
- Code HTTP 200,
- Réponse au format JSON,
- Structure stable (exemple : clé items contenant une liste).

## 11. Livrables attendus
Dépôt GitHub
- Code source complet.
- Manifests Kubernetes.
- Workflow CI/CD GitHub Actions.
- Fichier README.md documenté.


## Rapport technique (PDF – 10 à 15 pages)
- Architecture globale (schémas).
- Justification des choix techniques.
- Réponses aux questions posées.
- Répartition du travail au sein du binôme.
- Retour d’expérience (difficultés rencontrées, limites, améliorations possibles).
## Ordre imposé :
1. Architecture & repo [x] [@Nexgear75](https://github.com/Nexgear75)
2. Flask local [x] [@Nexgear75](https://github.com/Nexgear75) & [@Dopamine](https://github.com/NhkI0)
3. Tests Flask [x] [@Dopamine](https://github.com/NhkI0)
4. Docker [x] [@Nexgear75](https://github.com/Nexgear75)
5. CI (sans AKS) [ ] [@Volnetiks](https://github.com/Volnetiks)
6. AKS [ ] [@Volnetiks](https://github.com/Volnetiks)
7. Monitoring & sécurité [ ]
8. Démo & rapport [ ] [@Dopamine](https://github.com/NhkI0)

# Configuration
## 1. Cloner le repository:
````shell
git clone https://github.com/Nexgear75/cloud-computing-project.git
````
ou
````shell
git clone git@github.com:Nexgear75/cloud-computing-project.git
````

## 2. Installer les dépendances
Aller à l'intérieur du dossier cloné.
`````shell
pip install -r ./requirements.txt
`````

## 3. Définir les variables d'environnement
Sur UNIX:
`````shell
mv .env.example .env
`````
Sur Windows Powershell:
`````shell
Rename-Item .env.example .env
`````

Remplacer la clé de connexion dans ``AZURE_STORAGE_CONNECTION_STRING="CONNECTION_STRING"``.

## 4. Lancer l'application flask (dev)
````shell
flask run
````
Pour tester que l'application fonctionne:
````shell
curl http://127.0.0.1:5000/healthz
curl http://127.0.0.1:5000/readyz
````
Pour récupérer les données depuis le blob:
````shell
curl http://127.0.0.1:5000/api/news
curl http://127.0.0.1:5000/api/events
curl http://127.0.0.1:5000/api/faq
````
