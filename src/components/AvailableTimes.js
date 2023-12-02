import { getTutorSessionsByDate } from "../api/session.api";

export async function getAvailableTimes(tutor_id, date) {

  const tutorSessions = await getTutorSessionsByDate(tutor_id, date);

  // Define time slot intervals
  const startTime = new Date(`${date}T07:00:00`);
  const endTime = new Date(`${date}T23:30:01`);
  const timeInterval = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Create a Set to store unavailable time slots
  const unavailableTimeSlots = new Set();

  // Calculate unavailable time slots based on existing sessions
  for (const session of tutorSessions.data) {
    const sessionStartTime = new Date(session.date);
    const sessionEndTime = new Date(
      sessionStartTime.getTime() + session.duration * 60 * 1000
    );

    // Iterate through time slots and mark as unavailable
    let currentTime = startTime.getTime();
    while (currentTime < endTime.getTime()) {
      const currentTimeFormatted = new Date(currentTime)
      .toTimeString().substring(0, 5);
      if (sessionStartTime <= currentTime && currentTime < sessionEndTime) {
        unavailableTimeSlots.add(currentTimeFormatted);
      }
      currentTime += timeInterval;
    }
  }

  // Generate available time slot options for the form select input
  const availableTimeSlots = [];
  let currentTime = startTime.getTime();
  while (currentTime < endTime.getTime()) {
    const currentTimeFormatted = new Date(currentTime)
    .toTimeString().substring(0, 5);
    if (!unavailableTimeSlots.has(currentTimeFormatted)) {
      availableTimeSlots.push(currentTimeFormatted);
    }
    currentTime += timeInterval;
  }

  return availableTimeSlots;
}
