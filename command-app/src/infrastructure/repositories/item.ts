import type { Item, ItemEvent } from "domain/aggregates/item";
import type {
	ItemEventRepository,
	ItemEventRepositoryPersistEventAndSnapshotError,
} from "domain/repositories/item";
import type { ResultAsync } from "neverthrow";

export const createItemEventRepository = (): ItemEventRepository => {
	return {
		PersistEventAndSnapshot(
			event: ItemEvent,
			snapshot: Item,
		): ResultAsync<undefined, ItemEventRepositoryPersistEventAndSnapshotError> {
			throw new Error("Not implemented");
		},
	};
};
