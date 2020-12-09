import { BigInt } from "@graphprotocol/graph-ts"
import {
  OneSwapToken,
  Transfer,
  AddedBlackLists,
  RemovedBlackLists,
  Approval,
  OwnerChanged,
} from "../generated/OneSwapToken/OneSwapToken"
import {  _Approval, _Transfer } from "../generated/schema"

 export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params.from.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params.from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.value = event.params.value
  entity.from = event.params.from
  entity.to = event.params.to
  entity.count = entity.count + BigInt.fromI32(1)
  entity.save()
}

export function handleApproval(event: Approval): void {
    let entity = _Approval.load(event.params.owner.toHex())

    if (entity == null) {
        entity = new _Approval(event.params.owner.toHex())
        entity.count = BigInt.fromI32(0)
    }

    entity.owner = event.params.owner
    entity.count = entity.count + BigInt.fromI32(1)
    entity.value = event.params.value
    entity.spender = event.params.spender
    entity.save()
}
