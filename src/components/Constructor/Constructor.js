import { useState } from 'react';

// antd
import { Switch, Select } from 'antd';

import Widget from "../Widget";
import ButtonIcon from "../ButtonIcon";

function Constructor() {
    function addBlock(value = defaultBlock) {
        setBlocks([...blocks, value] );
    }

    function addBlockByIndex(index, value = defaultBlock) {
        if (index === 0) setBlocks([value, ...blocks] );
        else {
            let arr = [...blocks];
            arr.splice(index, 0, value);
            setBlocks( arr );
        }
    }

    function changeBlockType(index, newType) {
        let arr = [...blocks];
        arr[index].type = newType
        setBlocks( arr );
    }

    function moveBlock(from, to) {
        let arr = [...blocks];
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        setBlocks( arr );
    }

    function removeBlock(index) {
        let arr = [...blocks];
        arr.splice(index, 1);
        setBlocks( arr );
    }

    const
        initialBlocks = [
            {type: 'title', content: 'Добро пожаловать'},
            {type: 'text',  content: 'Включите режим "редактора" и внесите необходимые правки'}
        ],

        defaultBlock = {type: 'title', content: 'Заголовок'},

        [blocks, setBlocks] = useState(initialBlocks),
        [isEditMode, setMode] = useState(false),
        [clipboard, setClipboard] = useState(null);

    const { Option } = Select;

    return (
        <>
            <Switch checked={ isEditMode } onClick={ checked => setMode(checked) } />

            {
                blocks.map((block, i) => (
                    <div className="container" key={ block.type +'_block#' + i }>

                        {!isEditMode || (
                            <>
                                <div className="navigate">
                                    <ButtonIcon
                                        icon="up"
                                        isHide={i === 0}
                                        handleClick={() => moveBlock(i, i - 1)}
                                    />

                                    <ButtonIcon
                                        icon="down"
                                        isHide={i === blocks.length - 1}
                                        handleClick={() => moveBlock(i, i + 1)}
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
