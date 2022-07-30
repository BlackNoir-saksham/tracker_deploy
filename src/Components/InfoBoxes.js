import React from "react";
import "./InfoBoxes.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBoxes(props) {
  return (
    <>
      <Card className="infobox">
        <CardContent>
          {/* {title} */}
          <Typography color="textSecondary" className="infobox__title">{props.title}</Typography>

          {/* {number of cases} */}
          <h2 className="infobox__cases">{props.cases} <small>Today</small></h2>

          {/* {total} */}
          <Typography color="textSecondary" className="infobox__total">{props.total} Total</Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default InfoBoxes;
