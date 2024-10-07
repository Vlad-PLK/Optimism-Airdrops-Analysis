import { ValueKind, Value, Entity, Bytes, BigInt, store } from "@graphprotocol/graph-ts"

export class User extends Entity {
	constructor(id: Bytes) {
	  super();
	  this.set("id", Value.fromBytes(id));
	}
  
	save(): void {
	  let id = this.get("id");
	  assert(id != null, "Cannot save User entity without an ID");
	  if (id) {
		assert(
		  id.kind == ValueKind.BYTES,
		  `Entities of type User must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`,
		);
		store.set("User", id.toBytes().toHexString(), this);
	  }
	}
  
	static load(id: Bytes): User | null {
	  return changetype<User | null>(store.get("User", id.toHexString()));
	}
  
	get id(): Bytes {
	  let value = this.get("id");
	  if (!value || value.kind == ValueKind.NULL) {
		throw new Error("Cannot return null for a required field.");
	  } else {
		return value.toBytes();
	  }
	}
  
	set id(value: Bytes) {
	  this.set("id", Value.fromBytes(value));
	}
  
	get claimedAmount(): BigInt {
	  let value = this.get("claimedAmount");
	  if (!value || value.kind == ValueKind.NULL) {
		throw new Error("Cannot return null for a required field.");
	  } else {
		return value.toBigInt();
	  }
	}
  
	set claimedAmount(value: BigInt) {
	  this.set("claimedAmount", Value.fromBigInt(value));
	}

	get airdrop2Amount(): BigInt {
		let value = this.get("airdrop2Amount");
		if (!value || value.kind == ValueKind.NULL) {
		  return(BigInt.fromI32(0));
		} else {
		  return value.toBigInt();
		}
	  }
	
	  set airdrop2Amount(value: BigInt) {
		this.set("airdrop2Amount", Value.fromBigInt(value));
	  }
  }