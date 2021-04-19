import PropTypes from 'prop-types';
import { typeMap } from "utils/healpers";

// Antd
import { Select, Typography } from 'antd';

// Components
import Widget from "components/Widget";
import ButtonIcon from "components/ButtonIcon";


function Block({
  data,
  index,
  isEdit,
  isLast,
  isFirst,
  clipboard,
  copy,
  remove,
  moveUp,
  moveDown,
  addByIndex,
  changeType,
  changeContent
}) {

  const
    {Option} = Select,
    {Text} = Typography,

    element = <> { !isEdit || (
      <>
        <Text className="type" strong>{ typeMap[data.type] }</Text>

        <Select
          className="select"
          defaultValue={ data.type }
          onChange={ value => changeType(index, value) }
        >
          <Option value="text">{ typeMap.text }</Option>
          <Option value="title">{ typeMap.title }</Option>
          <Option value="image">{ typeMap.image }</Option>
        </Select>

        <div className="navigate group">
          <ButtonIcon
            icon="up"
            isHide={ isFirst }
            handleClick={ () => moveUp(index) }
          />

          <ButtonIcon
            icon="down"
            isHide={ isLast }
            handleClick={ () => moveDown(index) }
          />

          <ButtonIcon icon="copy" handleClick={ () => copy(data) }/>

          <ButtonIcon
            icon="remove"
            className="remove-button"
            handleClick={ () => remove(index) }
          />
        </div>
      </>
    ) }

    <Widget
      index={ index }
      data={ data }
      isEdit={ isEdit }
      update={ changeContent }
    />
  </>;

  return (
    <div className="container">

      { isEdit ? (
        <>
          <div className="addition group">
            <ButtonIcon className="add-button" handleClick={ () => addByIndex(index) }/>

            <ButtonIcon
              icon="insert"
              isHide={ !clipboard }
              className="insert-button"
              handleClick={ () => addByIndex(index, {...clipboard}) }
            />
          </div>

          <div className="wrapper">{ element }</div>
        </>
      ) : (element) }
    </div>
  );
}

Block.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  isEdit: PropTypes.bool,
  isLast: PropTypes.bool,
  isFirst: PropTypes.bool,
  clipboard: PropTypes.object,
  copy: PropTypes.func,
  remove: PropTypes.func,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  addByIndex: PropTypes.func,
  changeType: PropTypes.func,
  changeContent: PropTypes.func,
};

export default Block;