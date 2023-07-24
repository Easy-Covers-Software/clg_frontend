import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
export default function RadioList() {
  const [selected, setSelected] = React.useState<number | null>(null);

  const handleToggle = (value: number) => () => {
    if (selected !== value) {
      setSelected(value);
    } else {
      setSelected(null);
    }
  };

  return (
    <List
      sx={{
        width: "94%",
        height: "100%",
        bgcolor: "#fff",
        borderRadius: "4px",
        border: "1px solid #006D4B",
        paddingTop: "0px",
        padding: "0 3%",
      }}
    >
      {[0, 1, 2, 3].map((value) => {
        const labelId = `radio-list-label-${value}`;

        return (
          <ListItem
            key={value}
            style={{
              borderBottom: "1px solid #006D4B",
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <DeleteForeverOutlinedIcon />
              </IconButton>
            }
            disablePadding
            onClick={handleToggle(value)}
            // dense
          >
            <IconButton disableRipple>
              <Radio
                edge="start"
                checked={selected === value}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                style={{
                  color: "#006D4B",
                }}
              />
            </IconButton>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
          </ListItem>
        );
      })}
    </List>
  );
}
