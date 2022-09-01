import React from "react";
import {Link} from "react-router-dom";

const veterinarianTerm = (props) => {

    return(
        <tr className="inner-box">
            <th scope="row">
                <div className="event-date">
                    <span>1</span>
                </div>
            </th>
            <td>
                <div className="event-wrap">
                    <h3><a href="#">{props.term.name} {props.term.surname}</a></h3>
                    <div className="meta">
                        <div className="time">
                            <span>{props.term.address.streetName} {props.term.address.houseNumber}, {props.term.address.city} {props.term.address.postalCode}</span>
                        </div>
                        <div className="time">
                            <span>05:35 AM - 08:00 AM 2h 25'</span>
                        </div>
                    </div>
                </div>
            </td>
            <td className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger m-2"}
                   onClick={() => props.onDeleteVeterinarian(props.term.id.id)}>Delete Employee
                </a>
                <Link title={"Edit"} className={"btn btn-danger m-2"} to={`/veterinary/edit/${props.term.id.id}`}
                      onClick={() => props.onEditVeterinarian(props.term.id.id)}>Edit Employee
                </Link>
            </td>
        </tr>
    )
}

export default veterinarianTerm;