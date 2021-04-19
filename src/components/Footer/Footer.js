import PropTypes from 'prop-types';

// antd
import { Typography } from 'antd';

function Footer({ isEdit, count }) {
    const { Text, Title } = Typography;

    return (
        <footer>
            <Title className="author" level={ 5 }>Pireverdiev Karlen</Title>

            { !isEdit || (<Text className="debug" type="secondary">Элементов на странице: { count }</Text>) }
        </footer>
    );
}

Footer.propTypes = {
    isEdit: PropTypes.bool,
    count: PropTypes.number,
};

export default Footer;