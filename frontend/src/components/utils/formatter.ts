export function getFancyDateString(date: string | undefined, locale: string) {
  if (!date) {
    return ""
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit'
  };


  const d = new Date(date);
  return `${d.toLocaleDateString(locale, options)}`;
}

