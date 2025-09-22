export const formatTimeFromNow = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Teraz';
  if (diffHours < 24) return `${diffHours}h temu`;
  if (diffDays < 7) return `${diffDays}d temu`;
  return date.toLocaleDateString('pl-PL');
};

export const formatReservationDate = (dateStr: string, timeStr: string): { date: string; time: string } => {
  const date = new Date(`${dateStr}T${timeStr}`);
  return {
    date: date.toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: timeStr
  };
};

export type ParsedNotification = {
  topic: string;
  date: string;
  time: string;
  user: string;
  userType: 'Kandydat' | 'Student' | 'Nieznany';
  description: string | null;
};

export const parseNotificationMessage = (message: string): ParsedNotification => {
  const topicMatch = message.match(/Wizyta '([^']+)'/);
  const dateMatch = message.match(/zaplanowana na (\d{4}-\d{2}-\d{2})/);
  const timeMatch = message.match(/o (\d{2}:\d{2})/);
  const userMatch = message.match(/została anulowana przez ([^.]+)/);
  const descMatch = message.match(/Opis: (.+)$/);

  const userInfo = userMatch ? userMatch[1] : 'Nieznany użytkownik';
  const isCandidate = userInfo.includes('kandydata');
  const isStudent = userInfo.includes('studenta');

  return {
    topic: topicMatch ? topicMatch[1] : 'Nieznany temat',
    date: dateMatch ? dateMatch[1] : '',
    time: timeMatch ? timeMatch[1] : '',
    user: userInfo,
    userType: isCandidate ? 'Kandydat' : isStudent ? 'Student' : 'Nieznany',
    description: descMatch ? descMatch[1] : null
  };
};
