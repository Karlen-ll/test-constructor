import { useState } from 'react';
import {getArrayFromLocalStorage, setLocalStorageItem} from "utils/localStorage";
import { addByIndex, changeArrayValue, moveArrayItem, removeArrayItem } from "utils/stateArray";

// antd
import { Switch, Select, Typography, notification } from 'antd';

import cn from "classnames";

// components
import Widget from "components/Widget";
import ButtonIcon from "components/ButtonIcon";


function Constructor() {
    function openNotification(message, description = '', type = 'info') {
        notification[type]({ message: message, description: description, duration: 3 });
    }

    function saveFromLocalStorage(arr = blocks) {
        setLocalStorageItem(LocalStorageKey, arr)
    }

    function setAndSaveBlocks(arr) {
        setBlocks(arr);
        saveFromLocalStorage(arr)
    }

    function addBlock(value = defaultBlock) {
        setAndSaveBlocks([...blocks, value] );
    }

    function addBlockByIndex(index, value = defaultBlock) {
        if (index === 0) setAndSaveBlocks([value, ...blocks] );
        else setAndSaveBlocks( addByIndex(blocks, value, index) );
    }

    function changeBlockType(index, newType) {
        setAndSaveBlocks( changeArrayValue(blocks, 'type', newType, index, {content: ''}) );
    }

    function changeBlockContent(index, value) {
        console.log(value)
        setAndSaveBlocks( changeArrayValue(blocks, 'content', value, index) );
    }

    function moveBlock(from, to) { setAndSaveBlocks( moveArrayItem(blocks, from, to) ); }

    function removeBlock(index) {
        const objectType = typeMap[blocks[index].type];
        setAndSaveBlocks( removeArrayItem(blocks, index) );
        openNotification(
            objectType + (objectType === typeMap.image ? ' удалено' : ' удалён'),
            '',
            'error'
        );
    }

    function copyBlock(object) {
        const objectType = typeMap[object.type];
        setClipboard( object );
        openNotification( objectType + (objectType === typeMap.image ? ' скопировано' : ' скопирован'));
    }

    const
        LocalStorageKey = 'arrayOfBlocks',

        initialBlocks = getArrayFromLocalStorage(LocalStorageKey, [
            {type: 'title', content: 'Добро пожаловать'},
            {type: 'text',  content: 'Включите режим "редактора" и внесите необходимые правки'}
        ]),

        defaultBlock = {type: 'title', content: 'Заголовок'},

        typeMap = {
            text: 'Текст',
            title: 'Заголовок',
            image: 'Изображение',
        },

        { Option } = Select,
        { Text, Title } = Typography,

        [blocks, setBlocks] = useState(initialBlocks),
        [isEditMode, setMode] = useState(false),
        [clipboard, setClipboard] = useState(null);

    const Page = (block, i) => <>
        {!isEditMode || (
            <>
                <Text className="type" strong>{ typeMap[block.type] }</Text>

                <Select
                    className="select"
                    defaultValue={ block.type }
                    onChange={value => changeBlockType(i, value)}
                >
                    <Option value="text">Text</Option>
                    <Option value="title">Title</Option>
                    <Option value="image">Image</Option>
                </Select>

                <div className="navigate group">
                    <ButtonIcon
                        icon="up"
                        isHide={i === 0}
                        handleClick={() => moveBlock(i, --i)}
                    />

                    <ButtonIcon
                        icon="down"
                        isHide={i === blocks.length - 1}
                        handleClick={() => moveBlock(i, ++i)}
                    />

                    <ButtonIcon icon="copy" handleClick={() => copyBlock( block )}/>

                    <ButtonIcon
                        icon="remove"
                        className="remove-button"
                        handleClick={() => removeBlock(i)}
                    />
                </div>
            </>
        )}

        <Widget
            index={ i }
            data={ block }
            isEdit={ isEditMode }
            update={ changeBlockContent }
        />
    </>

    return (
        <>
            <header>
                <Title className="logo" level={ 2 } onClick={() => setMode(false)}>Конструктор</Title>

                <Switch checked={ isEditMode } onClick={ checked => setMode(checked) } />
            </header>

            <main className={ cn({ 'editMode': isEditMode })}>
                {
                    blocks.map((block, i) => (
                        <div className="container" key={ block.type +'_block#' + i }>

                            {isEditMode ? (
                                <>
                                    <div className="addition group">
                                        <ButtonIcon className="add-button" handleClick={() => addBlockByIndex(i)}/>

                                        <ButtonIcon
                                            icon="insert"
                                            isHide={!clipboard}
                                            className="insert-button"
                                            handleClick={() => addBlockByIndex(i, {...clipboard})}
                                        />
                                    </div>

                                    <div className="wrapper">{ Page(block, i) }</div>
                                </>
                            ) : (
                                Page(block, i)
                            )}
                        </div>
                    ))
                }

                {!isEditMode || (
                    <div className="addition group">
                        <ButtonIcon handleClick={() => addBlock()}/>

                        <ButtonIcon
                            icon="insert"
                            isHide={!clipboard}
                            className="insert-button"
                            handleClick={() => addBlock({...clipboard})}
                        />
                    </div>
                )}
            </main>

            <footer>
                <Title className="author" level={ 5 }>Pireverdiev Karlen</Title>

                { !isEditMode || (<Text className="debug" type="secondary">Элементов на странице: { blocks.length }</Text>) }
            </footer>
        </>
    );
}

export default Constructor;