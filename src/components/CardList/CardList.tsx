import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

import { IHelpRequest } from '../../types/IHelpRequest';
import CardItem from '../CardItem/CardItem';
import ScrollAndSwipeHandler from '../ScrollAndSwipeWrapper/ScrollAndSwipeWrapper';

interface IRequestsProps {
  helpRequests: IHelpRequest[];
  viewMode: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  scrollCooldownDuration: number;
}

const CardList: FC<IRequestsProps> = (requests) => {
  const { helpRequests, viewMode, totalPages, currentPage, setCurrentPage, scrollCooldownDuration } = requests;
  console.log('<CardList /> Render');
  return (
    <Box display={'flex'} justifyContent={'center'} width={'100%'}>
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
