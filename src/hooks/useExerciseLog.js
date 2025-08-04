import { useState, useEffect } from 'preact/hooks';
import { getExerciseLogByDate } from '../lib/exerciseLogService.js';

export const useExerciseLog = (date) => {
  const [exerciseLog, setExerciseLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date) return;

    const fetchLog = async () => {
      setLoading(true);
      setError(null);
      try {
        const log = await getExerciseLogByDate(new Date(date));
        setExerciseLog(log);
      } catch (err) {
        setError(err);
        setExerciseLog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, [date]);

  return { exerciseLog, loading, error };
};
