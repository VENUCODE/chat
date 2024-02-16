import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useMediaQuery } from '../../../misc/customhook';
import RoomInfoBtnModal from './RoomInfoBtnModal';

const Top = () => {
  const name = useCurrentRoom(state => state.name);
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <div>
      <div className="d-flex justify-between align-items-center">
        <h4>
          <Icon
            componentClass={Link}
            icon="arrow-circle-left"
            size="2x"
            to="/"
            className={
              isMobile
                ? 'd-inline-block  m-2 text-slate-100 link-unstyled focus:no-underline hover:no-underline p-2'
                : 'd-none'
            }
          />
          <span className="text-disappear text-slate-200 capitalize px-4">
            {name}
          </span>
        </h4>
        <div className="mr-2">
          {' '}
          <ButtonToolbar className="ws-nowrap uppercase text-slate-100">
            todo
          </ButtonToolbar>
        </div>
        <div>
          <RoomInfoBtnModal />
        </div>
      </div>
    </div>
  );
};
export default memo(Top);
