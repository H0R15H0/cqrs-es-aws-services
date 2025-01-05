import type { newtype } from "lib/newtype";
import { err, ok, type Result } from "neverthrow";
import { validate } from "uuid";

export type ID = newtype<
	"ID",
	{
		readonly value: string;
	}
>;

export type IDError = "InvalidID";

export const createID = (value: string): Result<ID, IDError> => {
	if (!validate(value)) {
		return err("InvalidID");
	}
	const id = { value } as ID;
	return ok(id);
};
