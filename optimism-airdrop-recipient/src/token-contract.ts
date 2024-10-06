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

  entity.save()

  const startAirdropTimestamp = 1675981080;
  const endAirdropTimestamp = 1675985640;
  if (entity.from.toHex() == "0x2501c477D0A35545a387Aa4A3EEe4292A9a8B3F0" && (entity.blockTimestamp.toI32() >= startAirdropTimestamp
    && entity.blockTimestamp.toI32() <= endAirdropTimestamp)) {
    let newUser = User.load(event.params.to)
    if (newUser == null) {
      newUser = new User(event.params.to)
      newUser.airdrop2Amount = BigInt.fromI32(0)
    }
    newUser.claimedAmount = newUser.claimedAmount.plus(event.params.value)
    newUser.airdrop2Amount = newUser.airdrop2Amount.plus(event.params.value)
    newUser.save()
  }
}
