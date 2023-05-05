interface ConvertedDate {
  dayOfWeek: string;
  month: string;
  day: string;
  year: number;
  time_with: string;
  time_without: number;
}

export default function convertDate(dateStr: string): ConvertedDate {
  // Преобразуем строку в объект Date
  const dateObj = new Date(dateStr);

  // Получаем день недели и месяц на английском языке
  const dayOfWeek = dateObj.toLocaleString('en-US', { weekday: 'long' });
  const month = dateObj.toLocaleString('en-US', { month: 'long' });

  // Получаем число в формате "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"
  const day = dateObj.toLocaleString('en-US', { day: 'numeric' });
  let daySuffix = 'th';
  if (day.endsWith('1') && day !== '11') {
    daySuffix = 'st';
  } else if (day.endsWith('2') && day !== '12') {
    daySuffix = 'nd';
  } else if (day.endsWith('3') && day !== '13') {
    daySuffix = 'rd';
  }

  // Получаем год
  const year = dateObj.getFullYear();

  // Получаем время в формате "HH:MM"
  const time_with = dateObj
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    .replace(/^0/, '');

  const time_without = dateObj.getHours();

  // Возвращаем объект с отдельными свойствами
  return {
    dayOfWeek,
    month,
    day: `${day}${daySuffix}`,
    year,
    time_with,
    time_without,
  };
}
