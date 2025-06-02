import request from "supertest";
import { describe, test, expect } from "@jest/globals";
import express from "express";
import { apiRouter } from "../src/routes";
import { Item, ItemModel } from "../src/models";

new ItemModel();
const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(apiRouter());

const SIZE = 20;

describe("Root", () => {
  test("Responds with 200 status code", async () => {
    const response = await request(api).get("/");
    expect(response.status).toEqual(200);
  });

  test("Returns with \'API\' message", async () => {
    const response = await request(api).get("/");
    expect(response.body.message).toMatch(/API/i);
  });
});

describe("GET items", () => {
  const size = SIZE;
  const page = 1;
  let response: request.Response;

  beforeAll(async () => {
    response = await request(api).get("/items").send({ size, page });
  });

  it('Responds with json content" ', () => {
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  it('Responds has items param" ', () => {
    expect(response.body).toHaveProperty("items");
  });

  it("Should be items param legth " + size, () => {
    expect(response.body.items).toHaveLength(size);
  });

  it('Item has id param" ', () => {
    expect(response.body.items[0]).toHaveProperty("id");
  });

  it('Item has content param" ', () => {
    expect(response.body.items[0]).toHaveProperty("content");
  });

  it('Item has mark param" ', () => {
    expect(response.body.items[0]).toHaveProperty("mark");
  });
});

describe("POST item mark", () => {
  const page = 1;
  let firstItem: Item;
  let response: request.Response;

  beforeAll(async () => {
    response = await request(api).get("/items").send({ size: SIZE, page });
    firstItem = response.body.items[0];

    response = await request(api).post("/items/" + firstItem.id + "/mark");
  });

  it("response status is 200", async () => {
    expect(response.status).toEqual(200);
  });

  it("body has id and mark", async () => {
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("mark");
  });

  it("items ids equals", async () => {
    expect(response.body.id).toEqual(firstItem.id);
  });

  it("mark item is changed", async () => {
    expect(response.body.id).toEqual(firstItem.id);
    expect(response.body.mark).not.toEqual(firstItem.mark);
  });
});

describe("POST item sort", () => {
  const page = 1;
  const shift = 5;
  let firstItem: Item;
  let response: request.Response;

  beforeAll(async () => {
    response = await request(api).get("/items").send({ size: SIZE, page });
    firstItem = response.body.items[0];

    response = await request(api)
      .post("/items/" + firstItem.id + "/sort")
      .send({ shift });
  });

  it("response status is 200", async () => {
    expect(response.status).toEqual(200);
  });

  it("body has id", async () => {
    expect(response.body).toHaveProperty("id");
  });

  it("moved item found on new position", async () => {
    const response = await request(api)
      .get("/items")
      .send({ size: SIZE, page });

    const sortedItem = response.body.items[shift];

    expect(sortedItem.id).toEqual(firstItem.id);
  });
});
