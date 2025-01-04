import type { newtype } from "lib/newtype";
import type { ID } from "domain/models/common";
import { err, ok, type Result } from "neverthrow";

export type ItemID = newtype<
	"ItemID",
	{
		readonly value: ID;
	}
>;

export type ItemVersion = newtype<
	"ItemVersion",
	{
		readonly value: number;
	}
>;

export const createItemVersion = (value: number): ItemVersion =>
	({ value }) as ItemVersion;

export type ItemCreatedAt = newtype<
	"ItemCreatedAt",
	{
		readonly value: Date;
	}
>;

export const createItemCreatedAt = (value: Date): ItemCreatedAt =>
	({ value }) as ItemCreatedAt;

export type ItemName = newtype<
	"ItemName",
	{
		readonly value: string;
	}
>;

export type ItemNameError = "MustNotBeEmpty";

export const createItemName = (
	value: string,
): Result<ItemName, ItemNameError> => {
	if (value.length === 0) {
		err("MustBeNonEmpty");
	}
	const name = { value } as ItemName;
	return ok(name);
};

export type ItemPrice = newtype<
	"ItemPrice",
	{
		readonly value: number;
	}
>;

export type ItemPriceError = "MustBePositive";

export const createItemPrice = (
	value: number,
): Result<ItemPrice, ItemPriceError> => {
	if (value <= 0) {
		err("MustBePositive");
	}
	const price = { value } as ItemPrice;
	return ok(price);
};
