import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import VeterinarianTerm from "../../Veterinarian/VeterinarianTerm/veterinarianTerm";
import VeterinaryService from "../../../../repository/repositoryVeterinary";

const VeterinaryView = () => {

    const id = useParams().id;

    const [veterinary, setVeterinary] = useState({
        name : "",
        address : {
            streetName : "",
            houseNumber : "",
            city : "",
            postalCode : ""
        },
        veterinarians: []
    })

    const getVeterinary = (id) => {
        VeterinaryService.getVeterinary(id)
            .then((data) => {
                setVeterinary(data.data)
            })
    }

    const deleteVeterinary = (id) => {
        VeterinaryService.deleteVeterinary(id)
            .then(() => {
                getVeterinary(id);
            })
    }

    const deleteVeterinarian = (veterinarianId) => {
        VeterinaryService.deleteVeterinarian(id, veterinarianId)
            .then(() => {
                getVeterinary(id);
            })
    }

    useEffect(() => {
            getVeterinary(id)
            document.body.style.backgroundColor = "#e9ecda";
        }, []
    )

    return(
        <div className="container">
            <div className="tab-content m-5" id="myTabContent">
                <div className="tab-pane fade active show" id="home" role="tabpanel">
                    <div className="row mb-3">
                        <div className="col-sm-12 col-md-12">
                            <h1 className="mt-2 mb-3 link-class">
                                {veterinary.name}
                            </h1>
                            <a href={`/veterinary/${id}/veterinarian`} className="btn btn-block btn-dark add-product-btn roboto-font">Add a veterinarian</a>
                            <a title={"Edit"} className={"btn btn-outline-success m-2 roboto-font"} href={`/veterinary/edit/${id}`}>Edit Veterinary</a>
                            <a title={"Delete"} className={"btn btn-outline-danger m-2 roboto-font"} href={"/veterinary"} onClick={() => deleteVeterinary(id)}>Delete Veterinary</a>

                        </div>
                    </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" className={"roboto-font"}>Veterinarians</th>
                                    <th scope="col"/>
                                </tr>
                            </thead>
                            <tbody>
                            {veterinary.veterinarians.length === 0 ?
                                <h4 className={"m-3 text-black-50"}>No veterinarians.</h4> :
                                veterinary.veterinarians.map((term) => {
                                return (
                                    <VeterinarianTerm term={term} id={id} onDeleteVeterinarian={deleteVeterinarian}/>
                                )
                            })}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default VeterinaryView;