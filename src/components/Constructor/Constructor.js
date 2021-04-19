import { useState } from 'react';
import { blockContent, keyOfLocalStorage, modalConfig, typeMap } from "utils/healpers";
import { getArrayFromLocalStorage, setLocalStorageItem } from "utils/localStorage";
import { addByIndex, changeArrayValue, moveArrayItem, removeArrayItem } from "utils/stateArray";

// Antd
import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// ClassNames
import cn from "classnames";

// Components
import Block from "components/Block";
import Header from "components/Header";
import Footer from "components/Footer";
import ButtonIcon from "components/ButtonIcon";


function Constructor() {
  function openNotification(message, description = '', type = 'info') {
    notification[type]({message: message, description: description, duration: 3});
  }

  function saveFromLocalStorage(arr = blocks) { setLocalStorageItem(keyOfLocalStorage, arr) }

  function setAndSaveBlocks(arr) {
    setBlocks(arr);
    saveFromLocalStorage(arr)
  }

  function addBlock(value = blockContent.default) {
    setAndSaveBlocks([...blocks, value]);
  }

  function addBlockByIndex(index, value = blockContent.default) {
    if (index === 0) setAndSaveBlocks([value, ...blocks]);
    else setAndSaveBlocks(addByIndex(blocks, value, index));
  }

  function changeBlockType(index, value) {
    setAndSaveBlocks(changeArrayValue(blocks, 'type', value, index, {content: ''}));
  }

  function changeBlockContent(index, value) {
    setAndSaveBlocks(changeArrayValue(blocks, 'content', value, index));
  }

  function moveBlock(from, to) { setAndSaveBlocks(moveArrayItem(blocks, from, to)); }

  function moveUpBlock(index)   { moveBlock(index, --index); }
  function moveDownBlock(index) { moveBlock(index, ++index); }

  function removeBlock(index) {
    confirm({
      ...modalConfig.remove,

      icon: <ExclamationCircleOutlined/>,

      onOk: () => {
        const objectType = typeMap[blocks[index].type];
        setAndSaveBlocks(removeArrayItem(blocks, index));
        openNotification(
          objectType + (objectType === typeMap.image ? ' удалено' : ' удалён'),
          '',
          'error'
        );
      },
    });
  }

  function copyBlock(object) {
    const objectType = typeMap[object.type];
    setClipboard(object);
    openNotification(objectType + (objectType === typeMap.image ? ' скопировано' : ' скопирован'));
  }

  const
    {confirm} = Modal,

    [blocks, setBlocks] = useState(getArrayFromLocalStorage(keyOfLocalStorage, blockContent.initial)),
    [isEditMode, setMode] = useState(false),
    [clipboard, setClipboard] = useState(null);

  return (
    <>
      <Header isEdit={ isEditMode } changeMode={ setMode }/>

      <main className={ cn({'editMode': isEditMode}) }>
        {
          blocks.map((block, index) => (
            <Block
              key={ block.type + '#' + index }
              data={ block }
              index={ index }
              isEdit={ isEditMode }
              isFirst={ index <= 0 }
              isLast={ index >= blocks.length }
              clipboard={ clipboard }
              copy={ copyBlock }
              remove={ removeBlock }
              moveUp={ moveUpBlock }
              moveDown={ moveDownBlock }
              addByIndex={ addBlockByIndex }
              changeType={ changeBlockType }
              changeContent={ changeBlockContent }
            />
          ))
        }

        { !isEditMode || (
          <div className="addition group">
            <ButtonIcon handleClick={ () => addBlock() }/>

            <ButtonIcon
              icon="insert"
              isHide={ !clipboard }
              className="insert-button"
              handleClick={ () => addBlock({...clipboard}) }
            />
          </div>
        ) }
      </main>

      <Footer count={ blocks.length } isEdit={ isEditMode }/>
    </>
  );
}

export default Constructor;