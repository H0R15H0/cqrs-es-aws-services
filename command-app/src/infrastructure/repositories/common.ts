import type { Repositories } from "domain/repositories/common";
import type { ItemEventRepository } from "domain/repositories/item";
import { createItemEventRepository } from "./item";

export const createRepositories = (): Repositories => {
	return {
		itemEvent: (): ItemEventRepository => {
			return createItemEventRepository();
		},
	};
};
