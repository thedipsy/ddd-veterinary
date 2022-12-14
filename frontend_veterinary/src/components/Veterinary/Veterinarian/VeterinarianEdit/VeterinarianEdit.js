import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import VeterinaryService from "../../../../repository/repositoryVeterinary";

const VeterinarianEdit = () => {

    const history = useHistory();
    const id = useParams().id;
    const veterinarianId = useParams().veterinarianId;

    const [veterinarian, setVeterinarian] = useState({
        name : "",
        surname : "",
        username : "",
        phone : "",
        dateOfEmployment: "",
        address : {
            streetName : "",
            houseNumber : "",
            city : "",
            postalCode : ""
        }})

    const [veterinary, setVeterinary] = useState({
        name : "",
        address : {
            streetName : "",
            houseNumber : "",
            city : "",
            postalCode : ""
        }})

    const [formData, updateFormData] = useState({
        name : "",
        surname : "",
        email : "",
        phone : "",
        streetName : "",
        houseNumber : "",
        city : "",
        postalCode : "",
        dateOfEmployment: ""
    });

    const getVeterinary = (id) => {
        VeterinaryService.getVeterinary(id)
            .then(data => setVeterinary(data.data))
    }

    const getVeterinarian = () => {
        VeterinaryService.getVeterinarian(id, veterinarianId)
            .then(data => setVeterinarian(data.data))
    }

    const editVeterinarian = (id, veterinarianId, name, surname, email, phone, streetName, houseNumber, city, postalCode, dateOfEmployment) => {
        VeterinaryService.editVeterinarian(id, veterinarianId, name, surname, email, phone, streetName, houseNumber, city, postalCode, dateOfEmployment)
            .then( () =>
                history.push(`/veterinary/${id}`)
            )
    }

    useEffect(() => {
            getVeterinary(id)
            getVeterinarian(id, veterinarianId)
            document.body.style.backgroundColor = "#e9ecda";
        }, []
    )

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        const name = formData.name !== "" ? formData.name : veterinarian.name;
        const surname = formData.surname !== "" ? formData.surname : veterinarian.surname;
        const email = formData.email !== "" ? formData.email : veterinarian.username;
        const phone = formData.phone !== "" ? formData.phone : veterinarian.phone;
        const houseNumber = formData.houseNumber !== "" ? formData.houseNumber : veterinarian.address.houseNumber;
        const streetName = formData.streetName !== "" ? formData.streetName : veterinarian.address.streetName;
        const city = formData.city !== "" ? formData.city : veterinarian.address.city;
        const postalCode = formData.postalCode !== "" ? formData.postalCode : veterinarian.address.postalCode;
        const dateOfEmployment = formData.dateOfEmployment !== "" ? formData.dateOfEmployment : veterinarian.dateOfEmployment;

        editVeterinarian(id, veterinarian.id.id, name, surname, email, phone, streetName, houseNumber, city, postalCode, dateOfEmployment);
    }

    return (

        <div className="container w-50">

            <div className={"row mb-3 mt-5"}>
                <h1 className="mt-2 mb-2 link-class text-center">
                    {veterinary.name}
                </h1>
                <h5 className="margin-bottom-md green-text mt-2 text-center">
                    Edit Veterinarian info
                </h5>
            </div>

            <form onSubmit={onFormSubmit} className={"roboto-font"}>

                <div className="row mb-3">
                    <div className="col">
                        <label className={"ms-1"}>Name:</label>
                        <input className="form-control" placeholder={veterinarian.name}
                               name="name"
                               onChange={handleChange}/>
                    </div>

                    <div className="col">
                        <label className={"ms-1"}>Surname:</label>
                        <input className="form-control" placeholder={veterinarian.surname}
                               name="surname"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className={"ms-1"}>Email:</label>
                        <input className="form-control" placeholder={veterinarian.username}
                               name="email"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className={"ms-1"}>Phone:</label>
                        <input className="form-control" placeholder={veterinarian.phone}
                               name="phone"
                               onChange={handleChange}/>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col">
                        <label className={"ms-1"}>Street Name:</label>
                        <input className="form-control" placeholder={veterinarian.address.streetName}
                               name="streetName"
                               onChange={handleChange}/>
                    </div>

                    <div className="col">
                        <label className={"ms-1"}>Building Number:</label>
                        <input className="form-control" placeholder={veterinarian.address.houseNumber}
                               name="houseNumber"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className={"ms-1"}>City:</label>
                        <input className="form-control" placeholder={veterinarian.address.city}
                               name="city"
                               onChange={handleChange}/>
                    </div>

                    <div className="col">
                        <label className={"ms-1"}>Postal Code:</label>
                        <input className="form-control" placeholder={veterinarian.address.postalCode}
                               name="postalCode"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className={"ms-1"}>Date of Employment:</label>
                        <input className="form-control" type={"date"}
                               name="dateOfEmployment"
                               onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-3 mt-4">
                    <div className="col">
                        <button type="submit" className="btn btn-success btn-lg btn-block w-100">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default VeterinarianEdit;