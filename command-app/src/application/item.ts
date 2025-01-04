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
import { err, ok, Result } from "neverthrow";
import { createID, type IDError } from "domain/models/common";

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
	| RegisterItemUnrecoverableError;

type RegisterItemUnrecoverableError = IDError;

export const RegisterItemService = (
	command: RegisterItemCommand,
): Result<boolean, RegisterItemServiceError> => {
	const id = ok(v7()).andThen(createID).andThen(createItemID);
	if (id.isErr()) {
		return err(id.error);
	}
	return ok(command)
		.andThen(validateRegisterItem)
		.andThen((v) => createItem(id.value, v.name, v.price))
		.map(() => true);
};
