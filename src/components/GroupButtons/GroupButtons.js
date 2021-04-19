import PropTypes from 'prop-types';

// ClassNames
import cn from "classnames";

// Components
import ButtonIcon from "components/ButtonIcon";


function GroupButtons({className, buttons}) {
  return (
    <div className={ cn('group', className) }>
      {
        buttons.map((button, index) => (
          <ButtonIcon
            icon={ button.icon }
            isHide={ button.isHide }
            className={ button.className }
            handleClick={ button.onClick }
            key={ button.icon + '#' + index }
          />
        ))
      }
    </div>
  );
}

GroupButtons.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.array,
};

export default GroupButtons;