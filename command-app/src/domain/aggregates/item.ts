import type { newtype } from "lib/newtype";
import {
	createItemCreatedAt,
	createItemVersion,
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
	}
>;

const createItemCreatedEventPayload = (
	name: ItemName,
): ItemCreatedEventPayload => ({ name }) as ItemCreatedEventPayload;

export const createItem = (
	id: ItemID,
	name: ItemName,
): [Item, ItemEvent<ItemCreatedEventPayload>] => {
	const item = { id, name } as Item;
	const event = {
		id,
		version: createItemVersion(1),
		createdAt: createItemCreatedAt(new Date()),
		payload: createItemCreatedEventPayload(name),
	} as ItemEvent<ItemCreatedEventPayload>;
	return [item, event];
};
