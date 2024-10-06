import {
  Transfer as TransferEvent,
} from "../generated/TokenContract/TokenContract"
import {
  Transfer,
} from "../generated/schema"
import { User } from "./user-entity"
import { Address, BigInt, log } from "@graphprotocol/graph-ts"

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  if (entity.from.toHex() == "0x2501c477d0a35545a387aa4a3eee4292a9a8b3f0") {
    let newUser = User.load(event.params.to)
    if (newUser == null) {
      newUser = new User(event.params.to)
      newUser.claimedAmount = BigInt.fromI32(0)
      newUser.airdrop2Amount = BigInt.fromI32(0)
    }
    newUser.claimedAmount = newUser.claimedAmount.plus(event.params.value)
    newUser.airdrop2Amount = newUser.airdrop2Amount.plus(event.params.value)
    newUser.save()
  }
  entity.save()
}
