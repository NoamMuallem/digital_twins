import React, { ReactElement } from "react";
import { ItemBoundary, userBoundery } from "../../interfaces";
import classes from "./item.style.module.scss";
import NewItem from "./new_item/new_item.component";
import { getAllUserItems } from "../../server_api";
import { AxiosResponse } from "axios";

export interface ItemsProps {
    user: null | userBoundery;
    items: Array<ItemBoundary>;
    setItems: (items: Array<ItemBoundary>) => void;
    addItemToState: (item: ItemBoundary) => void;
}

const Items = ({
    user,
    items,
    setItems,
    addItemToState,
}: ItemsProps) => {
    React.useEffect(() => {
        if (user) {
            getAllUserItems(user.userId.email).then(
                (res: AxiosResponse<Array<ItemBoundary>>) => {
                    setItems(res.data);
                }
            );
        }
    }, [user, setItems]);

    if (!user) {
        return null;
    }

    return (
        <div className={classes.Page}>
            <NewItem user={user} addItemToState={addItemToState} />
            <div className={classes.Items}>
                {items.length > 0 &&
                    items.map((item: ItemBoundary) => (
                        <div
                            className={classes.Item}
                            key={item.itemId!.id}
                        >
                            <span>{item.name}</span>
                            <span>{item.type}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default Items;
