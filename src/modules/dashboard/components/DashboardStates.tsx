import {
  Users2,
  FolderKanban,
  Handshake,
  CalendarClock,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

type StatsType = {
  totalClients: number;
  totalProjects: number;
  totalInteractions: number;
  totalReminders: number;
  inProgressCount: number;
  onHoldCount: number;
  completedCount: number;
  canceledCount: number;
};

const statsConfig = [
  {
    label: "Total Clients",
    key: "totalClients",
    icon: Users2,
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-500 dark:text-purple-300",
  },
  {
    label: "Total Projects",
    key: "totalProjects",
    icon: FolderKanban,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-500 dark:text-blue-300",
  },
  {
    label: "Total Interactions",
    key: "totalInteractions",
    icon: Handshake,
    iconBg: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-500 dark:text-green-300",
  },
  {
    label: "Total Reminders",
    key: "totalReminders",
    icon: CalendarClock,
    iconBg: "bg-yellow-100 dark:bg-yellow-900",
    iconColor: "text-yellow-500 dark:text-yellow-300",
  },
  {
    label: "In Progress",
    key: "inProgressCount",
    icon: PlayCircle,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-500 dark:text-blue-300",
  },
  {
    label: "On Hold",
    key: "onHoldCount",
    icon: PauseCircle,
    iconBg: "bg-yellow-100 dark:bg-yellow-900",
    iconColor: "text-yellow-500 dark:text-yellow-300",
  },
  {
    label: "Completed",
    key: "completedCount",
    icon: CheckCircle,
    iconBg: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-500 dark:text-green-300",
  },
  {
    label: "Canceled",
    key: "canceledCount",
    icon: XCircle,
    iconBg: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-500 dark:text-red-300",
  },
];

const DashboardStats = ({
  stats,
  isLoading,
}: {
  stats: StatsType;
  isLoading: boolean;
}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statsConfig.map((item, idx) =>
        isLoading ? (
          <div
            key={idx}
            className="animate-pulse bg-white dark:bg-gray-900 w-full min-h-20 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2 p-5"
          >
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
            <div className="size-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </div>
        ) : (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 w-full min-h-20 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2 p-5"
          >
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {stats[item.key as keyof StatsType]?.toString()?.padStart(4, "0")}
              </h2>
            </div>
            <div
              className={`size-20 ${item.iconBg} ${item.iconColor} flex items-center justify-center rounded-md`}
            >
              <item.icon className="size-12" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DashboardStats;
