import React, { ReactElement } from "react";
import { ItemBoundary, userBoundery } from "../../interfaces";
import classes from "./item.style.module.scss";
import NewItem from "./new_item/new_item.component";
import { getAllUserItems } from "../../server_api";
import { AxiosResponse } from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import TextFiled from "../ui/textFiled";
import Item from "./new_item/new_item.component";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [text, setText] = React.useState<string>("");

  React.useEffect(() => {
    if (user) {
      getAllUserItems(user.userId.email).then(
        (res: AxiosResponse<Array<ItemBoundary>>) => {
          setItems(res.data);
          console.log(res.data);
        }
      );
    }
  }, [user, setItems]);

  if (!user) {
    return null;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.Page}>
      <div className={classes.Headline}>Manage Courses</div>
      <div className={classes.Tools} >
      <TextFiled
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
        <div className={classes.Pagination}>
      <TablePagination
        component="div"
        count={
          items.filter((course) => course.name.indexOf(text) !== -1)
            .length
        }
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </div>
      <NewItem user={user} addItemToState={addItemToState} />
      </div>
      <div className={classes.Items}>
        {items.length > 0 &&
          items
            .filter((course) => course.name.indexOf(text) !== -1)
            .map((item: ItemBoundary, index: number) => (
              <Item
                item={item}
                key={item.itemId!.id + index}
                user={user}
                addItemToState={addItemToState}
              />
            ))}
      </div>
    </div>
  );
};
export default Items;
