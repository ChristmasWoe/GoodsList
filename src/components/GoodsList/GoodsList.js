import React from 'react';
import './GoodsList.css'
import { connect } from "react-redux";
import { updateOrder, removeGood } from '../../redux/Actions'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GoodCard from './subs/GoodCard/GoodCard'

const mapStateToProps = state => ({
    goods: state.goods,
})

const mapDispatchToProps = dispatch => ({
    updateOrder: updatedGoods => dispatch(updateOrder(updatedGoods)),
    removeGood: id => dispatch(removeGood(id)),
})

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class GoodsList extends React.Component {
    constructor() {
        super();
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.goods,
            result.source.index,
            result.destination.index
        );

        this.props.updateOrder(items)
    }

    render() {
        const { goods } = this.props;
        console.log(goods)
        return (
            <div id="goods-list">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {goods.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <GoodCard
                                                    {...item}
                                                    removeGood={this.props.removeGood}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList);