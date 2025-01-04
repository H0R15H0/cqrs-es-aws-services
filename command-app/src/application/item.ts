import {
	createItemName,
	type ItemNameError,
	type ItemName,
	type ItemPrice,
	type ItemPriceError,
	createItemPrice,
} from "domain/models/item";
import { err, ok, Result } from "neverthrow";

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

export type RegisterItemServiceError = RegisterItemValidationError;

export const RegisterItemService = (
	command: RegisterItemCommand,
): Result<boolean, RegisterItemServiceError> => {
	return ok(command)
		.andThen(validateRegisterItem)
		.map(() => true);
};
