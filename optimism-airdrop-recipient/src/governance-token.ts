import {
  Claimed as ClaimedEvent,
} from "../generated/GovernanceToken/GovernanceToken"
import { Claimed } from "../generated/schema"
import { User } from "./user-entity"
import { Address, BigInt, log } from "@graphprotocol/graph-ts"

export function handleClaimed(event: ClaimedEvent): void {
  let entity = new Claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.index = event.params.index
  entity.account = event.params.account
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  let newUser = User.load(event.params.account)
  if (newUser == null) {
    newUser = new User(event.params.account)
    newUser.claimedAmount = BigInt.fromI32(0)
  }
  newUser.claimedAmount = newUser.claimedAmount.plus(event.params.amount)
  newUser.save()
}