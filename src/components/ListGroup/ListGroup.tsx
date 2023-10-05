import { Fragment, useState } from "react";
import './ListGroup.module.css';

interface ListGroupProps {
    items: string [],
    heading: string,
    onSelectItem: (item: string) => void
}

function ListGroup({items, heading, onSelectItem}: ListGroupProps) {
    const [selectedIndex,  setSelectedIndex] = useState(-1);
    
    return (
        <Fragment>
            <h1>{heading}</h1>
            <ul className="list-group">
            {
                items.length ? items.map((item,key)=>
                    <li 
                    className={selectedIndex === key ? 'list-group-item active': 'list-group-item'}
                    key={item+key}
                    onClick={()=> {
                        setSelectedIndex(key)
                        onSelectItem(item)
                    }}
                    >
                     {item}
                    </li>): 
                <p>No items found</p>
            }
            </ul>
        </Fragment>
    )
}
export default ListGroup;