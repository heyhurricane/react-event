import { FC } from 'react';

import { IHelpRequest } from '../../types/IHelpRequest';
import VerticalCard from '../VerticalCard/VerticalCard';
import HorizontalCard from '../HorizontalCard/HorizontalCard';

interface ICardItemProps {
  helpRequest: IHelpRequest;
  orientation: string;
  keyValue: string;
}

const CardItem: FC<ICardItemProps> = (props) => {
  console.log('<CardItem /> Render');
  const { helpRequest, orientation } = props;

  return orientation !== 'horizontal' ? (
    <VerticalCard helpRequest={helpRequest} />
  ) : (
    <HorizontalCard helpRequest={helpRequest} />
  );
};

export default CardItem;
