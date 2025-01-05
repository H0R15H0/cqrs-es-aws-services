import {
	payload2Bytes,
	type Item,
	type ItemEvent,
} from "domain/aggregates/item";
import type {
	ItemEventRepository,
	ItemEventRepositoryPersistEventAndSnapshotError,
} from "domain/repositories/item";
import { errAsync, ok, okAsync, ResultAsync } from "neverthrow";
import {
	ConditionalCheckFailedException,
	DynamoDBClient,
	PutItemCommand,
	type PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const createItemEventRepository = (): ItemEventRepository => {
	return {
		persistEventAndSnapshot,
	};
};

const persistEventAndSnapshot = (
	event: ItemEvent,
	snapshot: Item,
): ResultAsync<undefined, ItemEventRepositoryPersistEventAndSnapshotError> => {
	// dynamodb transactionを使って保存すると安全だがスキップ
	return ok(event)
		.map(eventToParams)
		.asyncAndThen(putItem)
		.map(() => snapshot)
		.map(snapshotToParams)
		.andThen(putItem);
};

const eventToParams = (event: ItemEvent): PutItemCommandInput => {
	return {
		TableName: "item_events",
		Item: {
			id: { S: event.id.value.value },
			version: { N: String(event.version.value) },
			event_name: { S: event.eventName },
			created_at: { S: event.createdAt.value.toISOString() },
			payload: { B: payload2Bytes(event.payload) },
		},
		ConditionExpression:
			"attribute_not_exists(id) AND attribute_not_exists(version)",
	};
};

const snapshotToParams = (snapshot: Item): PutItemCommandInput => {
	return {
		TableName: "items",
		Item: {
			id: { S: snapshot.id.value.value },
			version: { N: snapshot.version.value.toString() },
			name: { S: snapshot.name.value },
			price: { N: snapshot.price.value.toString() },
		},
	};
};

const putItem = (
	params: PutItemCommandInput,
): ResultAsync<undefined, ItemEventRepositoryPersistEventAndSnapshotError> => {
	return ResultAsync.fromPromise(
		client.send(new PutItemCommand(params)),
		(err) => {
			if (err instanceof ConditionalCheckFailedException) {
				return "Conflict";
			}
			//TODO: インフラエラー、詳細を返したい
			return "UnknownError";
		},
	).map(() => undefined);
};
