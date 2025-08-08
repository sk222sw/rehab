import { useEffect } from 'preact/hooks';
import { getExerciseLogByDate } from '../lib/exerciseLogService.js';
import { useSignal } from '@preact/signals';

export const useExerciseLog = (date) => {
  const exerciseLog = useSignal(null);
  const loading = useSignal(false);
  const error = useSignal(null);
  const notFound = useSignal(false);

  useEffect(() => {
    if (!date) return;

    const fetchLog = async () => {
      loading.value = true;
      error.value = null;
      try {
        const log = await getExerciseLogByDate(new Date(date));
        exerciseLog.value = log;
      } catch (err) {
        if (err?.status === 404) {
          notFound.value = true;
        }
        error.value = err;
        exerciseLog.value = null;
      } finally {
        loading.value = false;
      }
    };

    fetchLog();
  }, [date]);

  return { exerciseLog, loading, notFound, error };
};
