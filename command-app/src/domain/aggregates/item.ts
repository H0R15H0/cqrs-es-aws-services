import type { newtype } from "lib/newtype";
import {
	createItemCreatedAt,
	createItemVersion,
	type ItemPrice,
	type ItemCreatedAt,
	type ItemID,
	type ItemName,
	type ItemVersion,
} from "domain/models/item";

export type Item = newtype<
	"Item",
	{
		readonly id: ItemID;
		readonly name: ItemName;
		readonly price: ItemPrice;
	}
>;

export type ItemEvent<Payload> = newtype<
	"ItemEvent",
	{
		readonly id: ItemID;
		readonly version: ItemVersion;
		readonly createdAt: ItemCreatedAt;
		readonly payload: Payload;
	}
>;

export type ItemCreatedEventPayload = newtype<
	"ItemCreatedEventPayload",
	{
		readonly name: ItemName;
		readonly price: ItemPrice;
	}
>;

const createItemCreatedEventPayload = (
	name: ItemName,
	price: ItemPrice,
): ItemCreatedEventPayload => ({ name, price }) as ItemCreatedEventPayload;

export const createItem = (
	id: ItemID,
	name: ItemName,
	price: ItemPrice,
): Result<[Item, ItemEvent<ItemCreatedEventPayload>], never> => {
	const item = { id, name, price } as Item;
	const event = {
		id,
		version: createItemVersion(1),
		createdAt: createItemCreatedAt(new Date()),
		payload: createItemCreatedEventPayload(name, price),
	} as ItemEvent<ItemCreatedEventPayload>;
	return ok([item, event]);
};
