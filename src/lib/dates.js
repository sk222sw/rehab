export function todayFormatted() {
  const today = new Date();
  const day = today.getDate();
  const months = [
    'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
  ];

  const formattedDate = `${day} ${months[today.getMonth()]}`;

  return formattedDate;
}

export function today() {
  return new Date().toISOString().split('T')[0]
}

export function dateFormatted(date) {
  return new Date(date).toISOString().split('T')[0]
}
