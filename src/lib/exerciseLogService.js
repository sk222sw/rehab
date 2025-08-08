import { dateFormatted, today } from "./dates";
import pb from "./pocketbase"

export async function getExerciseLogByDate(date) {
  try {
    const record = await pb.collection('exercise_log').getFirstListItem(
      `date = "${dateFormatted(date)}"`
    );

    return record;
  } catch (error) {
    if (error.status === 404) {
      return null; // No record found for this date
    }
    console.error('Error fetching exercise log:', error);
    throw error;
  }
};

export async function createLogForDate(date) {
  const existingLog = await getExerciseLogByDate(date)

  if (existingLog != null)
    return existingLog

  await pb.collection('exercise_log').create({
    date: today()
  })

  return await getExerciseLogByDate(new Date())
}

export async function createLogForToday() {
  const existingLog = await getExerciseLogByDate(new Date())

  if (existingLog != null)
    return

  pb.collection('exercise_log').create({
    date: today()
  })
}
