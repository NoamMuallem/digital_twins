import React, { ReactElement } from "react";
import { userBoundery } from "../../interfaces";
import classes from "./items.style.module.scss";
import NewItem from "./new_item/new_item.component";

export interface ItemsProps {
    user: null | userBoundery;
}

const Items = ({ user }: ItemsProps) => {
    if (!user) {
        return null;
    }

    return (
        <div>
            <NewItem />
        </div>
    );
};
export default Items;
