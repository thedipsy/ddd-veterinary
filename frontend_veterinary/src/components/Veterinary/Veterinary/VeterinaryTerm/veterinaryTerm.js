import React from "react";
import {Link} from "react-router-dom";

const veterinaryTerm = (props) => {

    return(
            <tr className="inner-box">
                <td>
                    <div className="event-wrap">
                        <h3><b><a title={"Veterinary"} className={"link-class"} href={`/veterinary/${props.term.id.id}`}>{props.term.name}</a></b></h3>
                        <div className="meta">
                            <div className="time ms-3">
                                <span><b>{props.term.address.streetName} {props.term.address.houseNumber}, {props.term.address.city} {props.term.address.postalCode}</b></span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={"text-right"}>
                    <a title={"Veterinary"} className={"btn btn-outline-success m-2"} href={`/veterinary/${props.term.id.id}`}>View</a>
                    <a title={"Add Veterinarian"} className={"btn btn-outline-success m-2"} href={`/veterinary/${props.term.id.id}/veterinarian`}>Add Veterinarian</a>
                    <a title={"Edit"} className={"btn btn-outline-success m-2"} href={`/veterinary/edit/${props.term.id.id}`}>Edit</a>
                    <a title={"Delete"} className={"btn btn-outline-danger m-2"} onClick={() => props.onDelete(props.term.id.id)}>Delete</a>
                </td>
            </tr>
    )
}

export default veterinaryTerm;