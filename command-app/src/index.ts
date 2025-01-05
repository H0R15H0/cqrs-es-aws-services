import { serve } from "@hono/node-server";
import { RegisterItemService } from "application/item";
import { Hono } from "hono";
import { createRepositories } from "infrastructure/repositories/common";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.post("/createItem", async (c) => {
	const body = await c.req.json();
	const command = { name: body.name, price: body.price };
	const result = await RegisterItemService(command, createRepositories());
	if (result.isErr()) {
		return c.json({ error: result.error });
	}
	return c.json({ success: true });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
