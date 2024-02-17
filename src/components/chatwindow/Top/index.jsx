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
    <div
      className="d-flex justify-between align-items-center "
      style={{ padding: '0', margin: '0' }}
    >
      <h4>
        <Icon
          componentClass={Link}
          icon="page-top"
          size="2x"
          to="/"
          className={
            isMobile
              ? 'd-inline-block  ml-2  link-unstyled focus:no-underline hover:no-underline'
              : 'none ml-2'
          }
          style={!isMobile ? { color: 'white' } : {}}
        />
        <span className="text-disappear text-slate-50  ml-3 capitalize px-4">
          {name}
        </span>
      </h4>
      <div className="mr-2">
        {' '}
        <ButtonToolbar className="ws-nowrap uppercase text-slate-50">
          todo
        </ButtonToolbar>
      </div>
      <div>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};
export default memo(Top);
