import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Claimed,
  Finalised
} from "../generated/MerkleDistributor/MerkleDistributor"

export function createClaimedEvent(
  index: BigInt,
  account: Address,
  amount: BigInt
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimedEvent
}

export function createFinalisedEvent(
  calledBy: Address,
  timestamp: BigInt,
  unclaimedAmount: BigInt
): Finalised {
  let finalisedEvent = changetype<Finalised>(newMockEvent())

  finalisedEvent.parameters = new Array()

  finalisedEvent.parameters.push(
    new ethereum.EventParam("calledBy", ethereum.Value.fromAddress(calledBy))
  )
  finalisedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  finalisedEvent.parameters.push(
    new ethereum.EventParam(
      "unclaimedAmount",
      ethereum.Value.fromUnsignedBigInt(unclaimedAmount)
    )
  )

  return finalisedEvent
}
