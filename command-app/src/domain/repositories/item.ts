import type { Item, ItemEvent } from "domain/aggregates/item";
import type { ConflictError } from "lib/errors";
import type { ResultAsync } from "neverthrow";

export type ItemEventRepositoryPersistEventAndSnapshotError =
	| ConflictError
	| ItemEventRepositoryPersistEventAndSnapshotUnrecoverableError;

export type ItemEventRepositoryPersistEventAndSnapshotUnrecoverableError =
	"UnknownError";

export interface ItemEventRepository {
	persistEventAndSnapshot(
		event: ItemEvent,
		snapshot: Item,
	): ResultAsync<undefined, ItemEventRepositoryPersistEventAndSnapshotError>;
}
