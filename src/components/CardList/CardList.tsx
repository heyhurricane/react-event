import { FC } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import CardItem from '../CardItem/CardItem';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import ScrollAndSwipeHandler from '../ScrollAndSwipeHandler/ScrollAndSwipeHandler';

type RequestsProps = {
  helpRequests: HelpRequest[];
  viewMode: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  scrollCooldownDuration: number;
};

const CardList: FC<RequestsProps> = (requests) => {
  const { helpRequests, viewMode, totalPages, currentPage, setCurrentPage, scrollCooldownDuration } = requests;

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      width={'100%'}
    >
      <ScrollAndSwipeHandler
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        helpRequests={helpRequests}
        cooldownDuration={scrollCooldownDuration}
        viewMode={viewMode}
      >
        <Grid
          container
          width={'100%'}
          spacing={viewMode === 'grid' ? 2 : 0}
          direction={viewMode === 'list' ? 'column' : 'row'}
        >
          {helpRequests.map((request) => {
            const keyValue = request.id;
            return (
              <CardItem
                key={keyValue}
                keyValue={keyValue}
                helpRequest={request}
                orientation={viewMode === 'grid' ? 'vertical' : 'horizontal'}
              />
            );
          })}
        </Grid>
      </ScrollAndSwipeHandler>
    </Box>
  );
};

export default CardList;