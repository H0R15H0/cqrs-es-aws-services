import type { newtype } from "lib/newtype";
import type { ID } from "domain/models/common";

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
