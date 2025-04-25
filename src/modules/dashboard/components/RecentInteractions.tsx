import React from "react";
import {
  Calendar,
  User,
  FolderKanban,
  Phone,
  Mail,
  Handshake,
} from "lucide-react";
import { TInteraction } from "../../interaction";
import { useInteractions } from "../../interaction/hook";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const getTypeIcon = (type: string) => {
  switch (type.toUpperCase()) {
    case "CALL":
      return <Phone className="text-blue-600 dark:text-blue-400" size={20} />;
    case "EMAIL":
      return (
        <Mail className="text-emerald-600 dark:text-emerald-400" size={20} />
      );
    case "MEETING":
      return (
        <Handshake className="text-purple-600 dark:text-purple-400" size={20} />
      );
    default:
      return (
        <Calendar className="text-gray-600 dark:text-gray-400" size={20} />
      );
  }
};

// InteractionCard component
const InteractionCard: React.FC<{ interaction: TInteraction }> = ({
  interaction,
}) => {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {getTypeIcon(interaction.type)}
          <span className="uppercase tracking-wide">{interaction.type}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-1">
          <Calendar size={16} />
          <span>{formatDate(interaction.occurred_at)}</span>
        </div>
      </div>

      <div>
        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
          {interaction.notes.length > 110
            ? `${interaction.notes.slice(0, 110)}...`
            : interaction.notes}
        </p>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <User size={16} />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {interaction.client.name}
            </p>
            <p className="text-xs text-gray-500">
              {interaction.client.email.length > 20
                ? `${interaction.client.email.slice(0, 20)}...`
                : interaction.client.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FolderKanban size={16} />
          <p>{interaction.project.title}</p>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader for InteractionCard
const InteractionCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow p-5 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-1">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>

      <div className="w-full h-16 bg-gray-300 dark:bg-gray-600 rounded-md"></div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

// RecentInteractions component
const RecentInteractions = () => {
  const { data, isLoading, isFetching } = useInteractions([
    { name: "limit", value: "4" },
  ]);

  return (
    <section className="md:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Interactions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading || isFetching
          ? // Show skeleton loaders while loading
            [...Array(4)].map((_, idx) => <InteractionCardSkeleton key={idx} />)
          : // Show actual interaction cards when data is available
            data?.map((interaction: TInteraction) => (
              <InteractionCard key={interaction.id} interaction={interaction} />
            ))}
      </div>
    </section>
  );
};

export default RecentInteractions;
