import React, { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

interface ICalendarProps {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const Calendar: FC<ICalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const [cleared, setCleared] = React.useState<boolean>(false);
  console.log('<Calendar /> Render');
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      if (formattedDate != 'Invalid Date') {
        setSelectedDate(formattedDate);
      }
    } else {
      setSelectedDate(null);
    }
  };

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  dayjs.extend(updateLocale);
  dayjs.locale('ru');

  return (
    <LocalizationProvider
      localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
      dateAdapter={AdapterDayjs}
      adapterLocale='ru'
    >
      <Box
        sx={{
          width: '100%',
          padding: '0',
        }}
      >
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={handleDateChange}
          yearsOrder='desc'
          label='Выберете дату'
          format='DD - MM - YYYY'
          slotProps={{
            field: {
              clearable: true,
              onClear: () => setCleared(true),
              sx: {
                width: '100%',
                '& .MuiInputBase-input': {
                  height: '2rem',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1.6rem',
                },
              },
            },
            popper: {
              sx: {
                '& .MuiTypography-root': {
                  fontSize: '1.6rem',
                  fontWeight: '500',
                },
                '& .MuiPickersDay-root': {
                  fontSize: '1.4rem',
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
