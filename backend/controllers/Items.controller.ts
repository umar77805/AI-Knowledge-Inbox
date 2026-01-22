import type { Request, Response } from "express";
import documentStore from "../services/document-store.ts";

const itemsController = (_req: Request, res: Response) => {
  res.json(documentStore.getAll());
};

export default itemsController;
