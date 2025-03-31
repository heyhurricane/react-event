import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

import { IHelpRequest } from '../../types/IHelpRequest';
import CardItem from '../CardItem/CardItem';
import ScrollAndSwipeWrapper from '../ScrollAndSwipeWrapper/ScrollAndSwipeWrapper';

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

  return (
    <Box display={'flex'} justifyContent={'center'} width={'100%'}>
      <ScrollAndSwipeWrapper
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
          marginTop={'20px'}
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
      </ScrollAndSwipeWrapper>
    </Box>
  );
};

export default CardList;
