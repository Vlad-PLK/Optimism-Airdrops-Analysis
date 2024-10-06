## Optimism Airdrops Analysis - Subgraph 📊⛓️ ##

The goal of this project was to index and aggregate the data of an airdrop on the Optimism blockchain, using The Graph as the indexing technology.
So the following repository contains a subgraph of Optimism first, second and fourth airdrops.
It was made with the Graph CLI, and tested on Subgraph Studio.
This work was also made possible thanks to tools such as Etherscan, Optimism Etherscan page and data from Dune Analytics

This Subgraph contains various entities but the most important one is "User" entity : 

ID, claimedAmount, airdrop2_amount -> those parameters are respectively the receiver wallet address, the total claimed amount of OP tokens received and the amount received from the second airdrop.
```
type User @entity {
  id: Bytes!
  claimedAmount: BigInt!
  airdrop2Amount: BigInt!
}
```

The implementation of the second airdrop into the subgraph is apart from others because the distribution method was different.
Indeed, users received the airdrop directly from a contract that doesn't emit events, so I had to index the OP token contract address directly and I've filtered the 'Transfer' events by sending address. That's also why there is the special variable airdrop2Amount inside the user entity.

If you want to deploy the following subgraph to Subgraph Studio follow to next steps :
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
Once fully deployed you can test it in the playground and show all users sorted by claimedAmount for exemple.
Finally you can verify the result of your query by checking on Dune Analytics for Airdrop 1, 2 and 4 :
</br>
https://dune.com/queries/3531974
</br>
https://dune.com/salva/op-airdrop-4
</br>
Some wallets received first, second and fourth aidrops so the claimedAmount will be the sum of all received OP tokens.
