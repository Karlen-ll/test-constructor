import PropTypes from 'prop-types';

// antd
import { Switch, Typography } from 'antd';

function Header({ isEdit, changeMode }) {
    const { Title } = Typography;

    return (
        <header>
            <Title className="logo" level={ 2 } onClick={() => changeMode(false)}>Конструктор</Title>

            <Switch checked={ isEdit } onClick={ checked => changeMode(checked) } />
        </header>
    );
}

Header.propTypes = {
    isEdit: PropTypes.bool,
    changeMode: PropTypes.func,
};

export default Header;