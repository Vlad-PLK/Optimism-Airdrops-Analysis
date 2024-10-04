# Optimism Airdrops Analysis - Subgraph #

The following repository contains a subgraph of Optimism first and fourth airdrops.
It was made with Graph CLI, and tested on Subgraph Studio

This Subgraph contains 3 entities : 
- User
- Claimed
- MerkleDistributorClaimed

User entity is made of an ID and claimedAmount parameters which are respectively the wallet address and the total claimed amount of OP tokens received during
first and fourth airdrops

Claimed and MerkleDistributorClaimed represent the first and the fourth airdrop respectively.

To deploy the following subgraph to Subgraph Studio first of all :
1. If you didn't install it yet use the following command to install Graph CLI :
npm install -g @graphprotocol/graph-cli
or
yarn global add @graphprotocol/graph-cli
2. Clone this repository to your current working directory
3. Authenticate within the CLI :
graph auth --studio <YOUR_DEPLOY_KEY>
4. Enter the subgraph
cd optimism-airdrop-recipient
5. Build the subgraph
graph codegen && graph build
6. Deploy it to Subgraph Studio
graph deploy --studio optimism-airdrop-recipient
