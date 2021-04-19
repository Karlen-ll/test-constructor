import PropTypes from 'prop-types';

// ClassNames
import cn from "classnames";

// Components
import ButtonIcon from "components/ButtonIcon";


function GroupButtons({classNames, buttons}) {
  return (
    <div className={ cn('group', classNames) }>
      {
        buttons.map((button, index) => (
          <ButtonIcon
            icon={ button.icon }
            isHide={ button.isHide }
            className={ button.className }
            handleClick={ () => button.onClick }
          />
        ))
      }
    </div>
  );
}

GroupButtons.propTypes = {
  classNames: PropTypes.string,
  buttons: PropTypes.array,
};

export default GroupButtons;