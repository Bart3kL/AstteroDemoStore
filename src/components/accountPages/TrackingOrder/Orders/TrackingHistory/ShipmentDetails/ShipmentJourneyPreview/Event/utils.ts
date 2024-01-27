export function formatHours(inputTime: string) {
  const date = new Date(inputTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const formattedMinutes = String(minutes).padStart(2, '0');

  const formattedTime = `${formattedHours}.${formattedMinutes} ${ampm}`;

  return formattedTime;
}
