const ReminderFormSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="grid grid-cols-1 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default ReminderFormSkeleton;
