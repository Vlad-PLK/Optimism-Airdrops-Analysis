## Optimism Airdrops Analysis - Subgraph 📊⛓️ ##

[🇬🇧EN VERSION🇬🇧](https://github.com/Vlad-PLK/Optimism-Airdrops-Analysis/blob/main/README.md)

### Objectif du projet

Ce projet vise à indexer et agréger les données de plusieurs airdrops sur la blockchain Optimism, en utilisant The Graph comme technologie d'indexation. 

### Contenu du dépôt

Ce dépôt Github contient un sous-graphe regroupant les données des premier, deuxième et quatrième airdrops d'Optimism. Il a été créé à l'aide de Graph CLI et testé sur Subgraph Studio. 

### Outils et ressources

La réalisation de ce projet a été facilitée par des outils tels que Etherscan, la page Optimism Etherscan et les données de Dune Analytics.

### Le sous-graphe et l'entité "Utilisateur"

Ce sous-graphe contient différentes entités, dont la plus importante est l'entité "Utilisateur". Cette entité dispose de trois paramètres :

* `ID` : adresse du wallet receveur
* `claimedAmount` : quantité totale de jetons OP réclamés
* `airdrop2Amount` : quantité de jetons OP reçus lors du deuxième airdrop

```
type User @entity {
  id: Bytes!
  claimedAmount: BigInt!
  airdrop2Amount: BigInt!
}
```

### Intégration du deuxième airdrop

L'intégration du deuxième airdrop dans le sous-graphe diffère des autres en raison d'une méthode de distribution différente. En effet, les utilisateurs ont reçu l'airdrop directement d'un contrat qui n'émet pas d'événements. J'ai donc dû indexer directement l'adresse du contrat du jeton OP et filtrer les événements "Transfert" par adresse d'envoi. C'est pourquoi la variable spéciale `airdrop2Amount` est présente dans l'entité "Utilisateur".

### Déploiement du sous-graphe sur Subgraph Studio

Si vous souhaitez déployer ce sous-graphe sur Subgraph Studio, veuillez suivre les étapes suivantes :  (Les étapes de déploiement restent en anglais pour des raisons de clarté technique)

1. If you didn't install it yet use the following command to install Graph CLI :
```
npm install -g @graphprotocol/graph-cli
```
or
```
yarn global add @graphprotocol/graph-cli
```
2. Clone this repository to your current working directory
3. Authenticate within the CLI :
```
graph auth --studio <YOUR_DEPLOY_KEY>
```
4. Enter the subgraph
```
cd optimism-airdrop-recipient
```
5. Build the subgraph
```
graph codegen && graph build
```
6. Deploy it to Subgraph Studio
```
graph deploy --studio optimism-airdrop-recipient
```
Une fois entièrement déployé, vous pouvez le tester dans l'espace de jeu ("playground") et afficher tous les utilisateurs triés par claimedAmount par exemple.

Enfin, vous pouvez vérifier le résultat de votre requête en consultant Dune Analytics pour les Airdrops 1, 2 et 4 :
</br>
https://dune.com/queries/3531974
</br>
https://dune.com/salva/op-airdrop-4
</br>

Certains wallets ont reçu des jetons lors du premier, du deuxième et du quatrième airdrop. Par conséquent, le claimedAmount correspondra à la somme de tous les jetons OP reçus.
