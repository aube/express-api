import { Router } from "express";
import * as handlers from "./handlers";

const apiRouter = () => {
  const router = Router();

  router.post("/items/:id/mark", handlers.POST_items_id_mark);

  router.post("/items/:id/sort", handlers.POST_items_id_sort);

  router.get("/items", handlers.GET_items);

  router.put("/items", handlers.PUT_items);

  router.get("/", handlers.GET_root);

  return router;
};

export { apiRouter };
