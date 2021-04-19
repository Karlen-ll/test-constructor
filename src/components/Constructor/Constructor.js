import { useState } from 'react';
import { addByIndex, changeArrayValue, moveArrayItem, removeArrayItem } from "utils/stateArray";

// antd
import { Switch, Select, Typography } from 'antd';

// components
import Widget from "components/Widget";
import ButtonIcon from "components/ButtonIcon";


function Constructor() {
    function addBlock(value = defaultBlock) {
        setBlocks([...blocks, value] );
    }

    function addBlockByIndex(index, value = defaultBlock) {
        if (index === 0) setBlocks([value, ...blocks] );
        else setBlocks( addByIndex(blocks, value, index) );
    }

    function changeBlockType(index, newType) {
        setBlocks( changeArrayValue(blocks, 'type', newType, index) );
    }

    function moveBlock(from, to) { setBlocks( moveArrayItem(blocks, from, to) ); }

    function removeBlock(index) { setBlocks( removeArrayItem(blocks, index) ); }

    const
        initialBlocks = [
            {type: 'title', content: 'Добро пожаловать'},
            {type: 'text',  content: 'Включите режим "редактора" и внесите необходимые правки'}
        ],

        defaultBlock = {type: 'title', content: 'Заголовок'},

        { Text, Title } = Typography,

        [blocks, setBlocks] = useState(initialBlocks),
        [isEditMode, setMode] = useState(false),
        [clipboard, setClipboard] = useState(null);

    const { Option } = Select;

    return (
        <>
            <header className="header">
                <Title level={2}>h2. Ant Design</Title>
                <span className="author">Pireverdiev Karlen</span>

                <Switch checked={ isEditMode } onClick={ checked => setMode(checked) } />
            </header>

            {
                blocks.map((block, i) => (
                    <div className="container" key={ block.type +'_block#' + i }>

                        {!isEditMode || (
                            <>
                                <div className="navigate">
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

                                    <ButtonIcon icon="copy" handleClick={() => setClipboard(block)}/>
                                </div>

                                <ButtonIcon handleClick={() => addBlockByIndex(i)}/>

                                <ButtonIcon
                                    icon="insert" isHide={!clipboard}
                                    handleClick={() => addBlockByIndex(i, clipboard)}
                                />

                                <ButtonIcon icon="remove" handleClick={() => removeBlock(i)}/>

                                <Select
                                    defaultValue={ block.type }
                                    style={{ width: 100 }}
                                    onChange={value => changeBlockType(i, value)}
                                >
                                    <Option value="text">Text</Option>
                                    <Option value="title">Title</Option>
                                    <Option value="image">Image</Option>
                                </Select>
                            </>
                        )}

                        <Widget
                            data={ block }
                            isEdit={ isEditMode }
                            className="container"
                        />
                    </div>
                ))
            }

            {!isEditMode || (
                <>
                    <ButtonIcon icon="insert" isHide={!clipboard} handleClick={() => addBlock({...clipboard})}/>
                    <ButtonIcon handleClick={() => addBlock()}/>
                </>
            )}
        </>
    );
}

export default Constructor;