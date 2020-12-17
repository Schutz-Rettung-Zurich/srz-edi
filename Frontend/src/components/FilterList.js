import React from "react";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DeleteFilters from "./DeleteFilters";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

export function FilterList(
    props,
) {
    return (
        <div className="filterList">
            {
                props.filters.map((filter) => (
                    <div key={filter.properties.name} className={"filter " + (props.isRealesed ? "realese" : "")}>
                        <Button as={Link} to={"/overview"} onClick={() => props.onClick(filter, props.isRealesed)}>
                            {filter.properties.name}
                        </Button>
                        <Button className="edit" onClick={() => props.onClick(filter, props.isRealesed)} as={Link}
                                to={"/filter"}>
                            {props.isRealesed ?
                                <VisibilityOutlinedIcon fontSize="small"/> :
                                <EditOutlinedIcon fontSize="small"/>}
                        </Button>
                        {props.isRealesed ? null : <DeleteFilters filter={filter}
                                                                  content={<DeleteOutlineOutlinedIcon
                                                                      fontSize="small"/>}/>}
                    </div>
                ))}
        </div>
    );
}
