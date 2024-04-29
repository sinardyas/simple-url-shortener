import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { z } from "zod";
import { shortener } from "../../../services/shortener";
import type { shortenerSchema } from "./shortener.schema";

const create = async (req: Request, res: Response) => {
  try {
    const input = req.body as z.infer<typeof shortenerSchema>;

    const result = await shortener.create(input);

    return res.json({ data: result });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error?.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const redirect = async (req: Request, res: Response) => {
  const url = await shortener.get(req.params?.id);
  res.redirect(url?.target ?? "");
};

export { create, redirect };
