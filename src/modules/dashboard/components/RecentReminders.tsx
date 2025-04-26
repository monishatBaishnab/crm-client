import { CalendarClock, CheckCircle2, Clock8 } from "lucide-react";
import { TReminder } from "../../reminder";
import { useReminders } from "../../reminder/hook";

type Props = {
  reminder: TReminder;
};

// Function to format the ISO date string
const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

// ReminderCard component
const ReminderCard = ({ reminder }: Props) => {
  const dueDate = formatDate(reminder?.due_at);

  return (
    <div className="w-full rounded-xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-5 flex gap-4 shadow-sm hover:shadow-md transition">
      {/* Status Icon */}
      <div className="flex-shrink-0 mt-1.5">
        {reminder?.is_completed ? (
          <CheckCircle2 className="text-green-500 dark:text-green-400 size-6" />
        ) : (
          <Clock8 className="text-yellow-500 dark:text-yellow-400 size-6" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0">
        {/* Title */}
        <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
          {reminder?.title}
        </h4>

        {/* Project & Client Info */}
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {reminder?.project?.title} &mdash; {reminder?.client?.name} (
          {reminder?.client?.email})
        </p>

        {/* Due Date */}
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <CalendarClock className="size-4 shrink-0" />
          <span className="truncate">Due: {dueDate}</span>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader component for ReminderCard
const ReminderCardSkeleton = () => {
  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 flex items-start gap-4 shadow-sm animate-pulse">
      <div className="mt-1">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      <div className="flex-1">
        <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded-md mt-2"></div>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

// RecentReminders component
const RecentReminders = () => {
  const { data, isLoading, isFetching } = useReminders([
    { name: "dueSoon", value: "true" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Upcoming Reminders
        </h2>
      </div>

      <div className="space-y-5">
        {isLoading || isFetching
          ? // Render skeleton loaders while loading
            Array(3)
              .fill(0)
              .map((_, index) => <ReminderCardSkeleton key={index} />)
          : // Render actual reminder cards once data is loaded
            data?.map((reminder: TReminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
      </div>
    </div>
  );
};

export default RecentReminders;
