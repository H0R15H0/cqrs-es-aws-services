import type { Repositories } from "domain/repositories/common";

export const createRepositories = (): Repositories => {
	return {
		ItemEvent: () => {
			throw new Error("Not implemented");
		},
	};
};
