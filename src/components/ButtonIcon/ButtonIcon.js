import PropTypes from 'prop-types';

// ant.design
import { Button, Tooltip } from 'antd';
import {
    UpOutlined,
    DownOutlined,
    CopyOutlined,
    PlusOutlined,
    DeleteOutlined,
    PlusSquareOutlined
} from '@ant-design/icons';

function ButtonIcon({ handleClick, icon, className, isHide = false }) {
    const
        iconMap = {
            up:     UpOutlined,
            down:   DownOutlined,
            copy:   CopyOutlined,
            plus:   PlusOutlined,
            insert: PlusSquareOutlined,
            remove: DeleteOutlined
        },

        tooltipMap = {
            up:     'Поднять',
            down:   'Опустить',
            copy:   'Скопировать',
            plus:   'Вставить',
            insert: 'Вставить скопированный блок',
            remove: 'Удалить',
        },

        Icon = iconMap[icon];

    return isHide || (
        <Tooltip title={ tooltipMap[icon] }>
            <Button
                icon={ <Icon /> }
                className={ className }
                onClick={ handleClick }
            />
        </Tooltip>
    );
}

ButtonIcon.defaultProps = {
    icon: 'plus',
    isHide: false,
};

ButtonIcon.propTypes = {
    handleClick: PropTypes.func,
    isHide: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.string,
};

export default ButtonIcon;
