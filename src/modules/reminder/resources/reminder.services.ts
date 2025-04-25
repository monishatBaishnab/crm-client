import api from "../../../lib/axios/axios";
import { Queries } from "../../../types/sheared.types";
import { TReminderPayload } from "./reminders.types";

// Fetch all reminders with optional query parameters
export const fetchReminders = async (queries?: Queries) => {
  try {
    const params = new URLSearchParams();
    if (queries?.length) {
      queries.forEach((query) => params.append(query.name, query.value));
    }

    const response = await api.get("/reminders", { params });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Fetch a reminder by its ID
export const fetchReminderById = async (id: string) => {
  try {
    const response = await api.get(`/reminders/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Create a new reminder
export const createReminder = async (data: TReminderPayload) => {
  try {
    const response = await api.post("/reminders", data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Update an existing reminder by ID
export const updateReminder = async (
  id: string,
  data: Partial<TReminderPayload>,
) => {
  try {
    const response = await api.put(`/reminders/${id}`, data);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};

// Delete a reminder by ID
export const deleteReminder = async (id: string) => {
  try {
    const response = await api.delete(`/reminders/${id}`);
    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error(String(err));
  }
};
