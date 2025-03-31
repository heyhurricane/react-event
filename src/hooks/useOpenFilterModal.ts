import { useState } from 'react';

function useOpenFilterModal() {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };
  return { openFilterModal, handleOpenFilterModal, handleCloseFilterModal };
}
export default useOpenFilterModal;
