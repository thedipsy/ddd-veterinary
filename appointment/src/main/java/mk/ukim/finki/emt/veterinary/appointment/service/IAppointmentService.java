package mk.ukim.finki.emt.veterinary.appointment.service;

import mk.ukim.finki.emt.veterinary.appointment.domain.exceptions.AppointmentIdNotExistsException;
import mk.ukim.finki.emt.veterinary.appointment.domain.exceptions.TreatmentIdNotExistsException;
import mk.ukim.finki.emt.veterinary.appointment.domain.models.Appointment;
import mk.ukim.finki.emt.veterinary.appointment.domain.models.id.AppointmentId;
import mk.ukim.finki.emt.veterinary.appointment.domain.models.id.TreatmentId;
import mk.ukim.finki.emt.veterinary.appointment.service.forms.AppointmentForm;
import mk.ukim.finki.emt.veterinary.appointment.service.forms.TreatmentForm;

import java.util.List;
import java.util.Optional;

public interface IAppointmentService {

    List<Appointment> findAll();
    Optional<Appointment> findById(AppointmentId appointmentId);
    void addItem(AppointmentId appointmentId, TreatmentForm treatmentForm) throws AppointmentIdNotExistsException;
    void deleteItem(AppointmentId appointmentId, TreatmentId treatmentId) throws AppointmentIdNotExistsException, TreatmentIdNotExistsException;

    AppointmentId saveAppointment(AppointmentForm appointmentForm);


}
