import type { ItemEventRepository } from "./item";

export interface Repositories {
	ItemEvent(): ItemEventRepository;
}
