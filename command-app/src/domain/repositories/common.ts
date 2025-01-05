import type { ItemEventRepository } from "./item";

export interface Repositories {
	itemEvent(): ItemEventRepository;
}
