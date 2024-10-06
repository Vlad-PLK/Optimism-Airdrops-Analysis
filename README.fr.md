# Objectif du projet

Ce projet vise à indexer et agréger les données de plusieurs airdrops sur la blockchain Optimism, en utilisant The Graph comme technologie d'indexation. 

# Contenu du dépôt

Ce dépôt Github contient un sous-graphe regroupant les données des premier, deuxième et quatrième airdrops d'Optimism. Il a été créé à l'aide de Graph CLI et testé sur Subgraph Studio. 

# Outils et ressources

La réalisation de ce projet a été facilitée par des outils tels que Etherscan, la page Optimism Etherscan et les données de Dune Analytics.

# Le sous-graphe et l'entité "Utilisateur"

Ce sous-graphe contient différentes entités, dont la plus importante est l'entité "Utilisateur". Cette entité dispose de trois paramètres :

* `ID` : adresse du wallet receveur
* `claimedAmount` : quantité totale de jetons OP réclamés
* `airdrop2Amount` : quantité de jetons OP reçus lors du deuxième airdrop

# Intégration du deuxième airdrop

L'intégration du deuxième airdrop dans le sous-graphe diffère des autres en raison d'une méthode de distribution différente. En effet, les utilisateurs ont reçu l'airdrop directement d'un contrat qui n'émet pas d'événements. J'ai donc dû indexer directement l'adresse du contrat du jeton OP et filtrer les événements "Transfert" par adresse d'envoi. C'est pourquoi la variable spéciale `airdrop2Amount` est présente dans l'entité "Utilisateur".

# Déploiement du sous-graphe sur Subgraph Studio

Si vous souhaitez déployer ce sous-graphe sur Subgraph Studio, veuillez suivre les étapes suivantes :  (Les étapes de déploiement restent en anglais pour des raisons de clarté technique)
