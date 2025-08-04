import { getExerciseLogByDate } from "./exerciseLogService";
import pb from "./pocketbase";

export async function getExercises() {
  return await pb.collection('exercise').getFullList()
}

export async function createExercise(name) {
  return await pb.collection('exercise').create({
    name
  })
}

export async function toggleExercise(exercise) {
  const date = new Date()
  const log = await getExerciseLogByDate(date)
  const exerciseExists = log.exercises.find(x => x === exercise.id)
  if (exerciseExists) {
    await pb.collection('exercise_log').update(log.id, {
      'exercises-': exercise.id
    })
  } else {


    await pb.collection('exercise_log').update(log.id, {
      'exercises+': exercise.id
    })
  }
}
