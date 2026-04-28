import { Router } from "express";
import { z } from "zod";

import { createAppointmentNote, getAppointmentCalendar } from "../../lib/helio-repository.js";
import { ok } from "../../lib/respond.js";
import { ApiError } from "../../middleware/error-handler.js";

const appointmentsRouter = Router();
const noteSchema = z.object({
  date: z.string().min(10),
  title: z.string().min(2).max(80),
  content: z.string().min(3).max(400),
  pinned: z.boolean().optional()
});

appointmentsRouter.get("/", async (request, response, next) => {
  try {
    const month = String(request.query.month ?? new Date().toISOString().slice(0, 7));
    const calendar = await getAppointmentCalendar(month);

    response.json(
      ok({
        appointments: calendar.appointments,
        notes: calendar.notes,
        openSlots: calendar.openSlots
      })
    );
  } catch (error) {
    next(error);
  }
});

appointmentsRouter.get("/calendar", async (request, response, next) => {
  try {
    const month = String(request.query.month ?? new Date().toISOString().slice(0, 7));
    const calendar = await getAppointmentCalendar(month);
    response.json(ok(calendar));
  } catch (error) {
    next(error);
  }
});

appointmentsRouter.post("/notes", async (request, response, next) => {
  try {
    const payload = noteSchema.parse(request.body);
    const note = await createAppointmentNote(payload);
    response.status(201).json(ok(note));
  } catch (error) {
    next(new ApiError(error instanceof Error ? error.message : "Invalid appointment note payload", 422));
  }
});

export { appointmentsRouter };
