import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Dot } from './Dot';
import { TestingProfilesIteam } from './TestingProfilesIteam';
import { testUsers } from '../../const/const';
import { useSlider } from '../../hooks/useSlider';
import { useSwiper } from './useSwiper';
import { Box, Button } from '@mui/material';
import { useMode } from '../../theme';
export function TestProfilesSlider() {
  const { currentDiv, onHandleClickSlider } = useSlider();
  const { handleTouchStart, handleTouchEnd } = useSwiper({
    cooldownDuration: 50,
    currentItem: currentDiv,
    maxItems: testUsers.length,
    action: onHandleClickSlider,
  });
  const [theme] = useMode();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        sx={{
          marginTop: '9rem',
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            marginTop: '3rem',
          },
        }}
      >
        <Box sx={{ zIndex: 1 }}>
          <Button
            style={{
              padding: 0,
              minWidth: 0,
              width: '30px',
            }}
            disabled={currentDiv === 1}
            onClick={() => {
              onHandleClickSlider('previous');
            }}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </Button>
        </Box>
        <Box sx={{ width: '250px', height: '106px' }}>
          <div style={{ position: 'relative' }}>
            <div 
              id="slider"       
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd} 
              style={{ display: 'flex', gap: '30px', left: '0px', top: '0px', position: 'absolute' }}
            >
              {testUsers.map((user, index) => (
                <Box sx={{ width: '250px' }} key={index} id={`div${index + 1}`}>
                  <TestingProfilesIteam user={user} />
                </Box>
              ))}
            </div>
          </div>
        </Box>
        <Box sx={{ zIndex: 1 }}>
          <Button
            style={{
              padding: 0,
              minWidth: 0,
              width: '30px',
            }}
            disabled={currentDiv === testUsers.length}
            onClick={() => {
              onHandleClickSlider('next');
            }}
          >
            <KeyboardArrowRightOutlinedIcon />
          </Button>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'5px'}>
        {testUsers.map((_, index) => (
          <Dot
            key={index}
            activ={index + 1 === currentDiv ? true : false}
            disabled={currentDiv === index + 1}
            onClick={() =>
              onHandleClickSlider(
                index + 1 > currentDiv ? 'next' : 'previous',
                index + 1 > currentDiv ? index + 1 - currentDiv : currentDiv - index - 1
              )
            }
          />
        ))}
      </Box>
    </Box>
  );
}
