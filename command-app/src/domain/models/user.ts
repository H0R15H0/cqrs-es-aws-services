import { type ID } from 'domain/models/common'
import { type newtype } from 'lib/newtype'

export type Item = newtype<'Item', {
  readonly id: ID
  readonly name: ItemName
}>

export type ItemName = newtype<'ItemName', string>
