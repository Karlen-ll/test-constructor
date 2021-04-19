import PropTypes from 'prop-types';
import { typeMap } from "utils/healpers";

// Antd
import { Select, Typography } from 'antd';

// Components
import Widget from "components/Widget";
import GroupButtons from "components/GroupButtons";


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

        <GroupButtons
          className="navigate"
          buttons={ [{
            icon: 'up',
            isHide: isFirst,
            className: 'move-button',
            onClick: () => moveUp(index)
          },{
            icon: 'down',
            isHide: isLast,
            className: 'move-button',
            onClick: () => moveDown(index)
          },{
            icon: 'copy',
            className: 'copy-button',
            onClick: () => copy(data)
          },{
            icon: 'remove',
            className: 'remove-button',
            onClick: () => remove(index)
          }] }
        />
      </>
    ) }

    <Widget
      data={ data }
      index={ index }
      isEdit={ isEdit }
      update={ changeContent }
    />
  </>;

  return (
    <div className="container">

      { isEdit ? (
        <>
          <GroupButtons
            className="addition"
            buttons={ [{
              className: 'add-button',
              onClick: () => addByIndex(index)
            },{
              icon: 'insert',
              isHide: !clipboard,
              className: 'insert-button',
              onClick: () => addByIndex(index, {...clipboard})
            }] }
          />

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