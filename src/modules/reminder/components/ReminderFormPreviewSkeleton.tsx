const ReminderFormPreviewSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full lg:w-96 animate-pulse">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      <div className="p-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <div className="h-8 w-8 bg-blue-300 dark:bg-blue-700 rounded-full" />
            </div>
          </div>

          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-600 rounded mx-auto mb-4" />

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-300 dark:bg-gray-500 rounded" />
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-300 dark:bg-gray-500 rounded" />
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>

            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-300 dark:bg-gray-500 rounded" />
              <div className="h-4 w-36 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
};
export default ReminderFormPreviewSkeleton;
