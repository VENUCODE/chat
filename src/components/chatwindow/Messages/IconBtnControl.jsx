import React from 'react';
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite';
const ConditionalBage = ({ children, condition }) => {
  return condition ? (
    <Badge content={condition}>{children}</Badge>
  ) : (
    { children }
  );
};
const IconBtnControl = ({
  isVisible,
  iconName,
  tootip,
  onClick,
  badgeCount,
  ...props
}) => {
  return (
    <div
      className="ml-1"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <ConditionalBage condition={badgeCount}>
        <Whisper
          placement="top"
          delay={0}
          delayHide={0}
          delayShow={0}
          trigger={'hover'}
          speaker={<Tooltip>{tootip}</Tooltip>}
        >
          <IconButton
            {...props}
            onClick={onClick}
            circle
            size="xs"
            icon={<Icon icon={iconName} />}
          />
        </Whisper>
      </ConditionalBage>
    </div>
  );
};

export default IconBtnControl;
