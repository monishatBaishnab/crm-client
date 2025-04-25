// project.constants.ts
export const PROJECT_COLUMNS = [
  {
    label: "Title",
    key: "title",
  },
  {
    label: "Client",
    key: "clientName",
  },
  {
    label: "Budget",
    key: "budget",
  },
  {
    label: "Deadline",
    key: "deadline",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Created",
    key: "created_at",
  },
];

export const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Canceled", value: "CANCELED" },
];
