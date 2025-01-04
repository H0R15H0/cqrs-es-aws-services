import { createItem } from "domain/aggregates/item";
import { v7 } from "uuid";
import {
	createItemName,
	type ItemNameError,
	type ItemName,
	type ItemPrice,
	type ItemPriceError,
	createItemPrice,
	createItemID,
} from "domain/models/item";
import { errAsync, ok, Result, type ResultAsync } from "neverthrow";
import { createID, type IDError } from "domain/models/common";
import type { Repositories } from "domain/repositories/common";
import type { ItemEventRepositoryPersistEventAndSnapshotUnrecoverableError } from "domain/repositories/item";
import type { ConflictError } from "lib/errors";

type RegisterItemCommand = {
	name: string;
	price: number;
};

type ValidatedRegisterItem = {
	name: ItemName;
	price: ItemPrice;
};

type RegisterItemValidationError = (ItemNameError | ItemPriceError)[];

const validateRegisterItem = (
	command: RegisterItemCommand,
): Result<ValidatedRegisterItem, RegisterItemValidationError> => {
	const itemName = createItemName(command.name);
	const itemPrice = createItemPrice(command.price);

	const values = Result.combineWithAllErrors([itemName, itemPrice]);

	return values.map(([name, price]) => ({ name, price }));
};

type RegisterItemServiceError =
	| RegisterItemValidationError
	| ConflictError
	| RegisterItemUnrecoverableError;

type RegisterItemUnrecoverableError =
	| IDError
	| ItemEventRepositoryPersistEventAndSnapshotUnrecoverableError;

export const RegisterItemService = (
	command: RegisterItemCommand,
	repositories: Repositories,
): ResultAsync<boolean, RegisterItemServiceError> => {
	const id = ok(v7()).andThen(createID).andThen(createItemID);
	if (id.isErr()) {
		return errAsync(id.error);
	}
	return ok(command)
		.andThen(validateRegisterItem)
		.andThen((v) => createItem(id.value, v.name, v.price))
		.asyncAndThen((v) =>
			repositories.itemEvent().persistEventAndSnapshot(v[0], v[1]),
		)
		.map(() => true);
};
