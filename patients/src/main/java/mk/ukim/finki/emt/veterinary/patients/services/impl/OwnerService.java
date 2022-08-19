package mk.ukim.finki.emt.veterinary.patients.services.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.emt.veterinary.patients.domain.exceptions.AnimalNotExistsException;
import mk.ukim.finki.emt.veterinary.patients.domain.exceptions.OwnerNotExistsException;
import mk.ukim.finki.emt.veterinary.patients.domain.models.Owner;
import mk.ukim.finki.emt.veterinary.patients.domain.models.id.AnimalId;
import mk.ukim.finki.emt.veterinary.patients.domain.models.id.OwnerId;
import mk.ukim.finki.emt.veterinary.patients.domain.repository.OwnerRepository;
import mk.ukim.finki.emt.veterinary.patients.services.IOwnerService;
import mk.ukim.finki.emt.veterinary.patients.services.forms.AnimalForm;
import mk.ukim.finki.emt.veterinary.patients.services.forms.OwnerForm;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class OwnerService implements IOwnerService {

    private final OwnerRepository ownerRepository;
    private final Validator validator;

    @Override
    public List<Owner> findAll() {
        return ownerRepository.findAll();
    }

    @Override
    public Optional<Owner> findById(OwnerId ownerId) {
        return ownerRepository.findById(ownerId);
    }

    @Override
    public OwnerId saveOwner(OwnerForm ownerForm) {
        Objects.requireNonNull(ownerForm, "Owner must not be null");
        var constraintViolations = validator.validate(ownerForm);
        if(constraintViolations.size() > 0){
            throw new ConstraintViolationException("The owner form is not valid", constraintViolations);
        }

        var ownerToSave = toDomainObject(ownerForm);
        var newOwner = ownerRepository.saveAndFlush(ownerToSave);
        return newOwner.getId();
    }

    private Owner toDomainObject(OwnerForm ownerForm){
        var owner = Owner.build(ownerForm.getName(),
                ownerForm.getSurname(),
                ownerForm.getPhone(),
                ownerForm.getEmail(),
                ownerForm.getAddress()
        );

        ownerForm.getAnimalsList()
                .forEach(animal -> owner.addAnimal(
                        animal.getName(),
                        animal.getBirthDate(),
                        animal.getAnimalSpecie(),
                        animal.getBreed(),
                        animal.getMicrochip(),
                        animal.getWeight(),
                        animal.getGender()
                ));

      return owner;
    }

    @Override
    public void deleteOwner(OwnerId ownerId) throws OwnerNotExistsException {
        if(findById(ownerId).isPresent()) {
            ownerRepository.deleteById(ownerId);
        } else{
            throw new OwnerNotExistsException();
        }

    }

    @Override
    public void addAnimal(OwnerId ownerId, AnimalForm animalForm) throws OwnerNotExistsException {
        Owner owner = findById(ownerId).orElseThrow(OwnerNotExistsException::new);
        owner.addAnimal(
                animalForm.getName(),
                animalForm.getBirthDate(),
                animalForm.getAnimalSpecie(),
                animalForm.getBreed(),
                animalForm.getMicrochip(),
                animalForm.getWeight(),
                animalForm.getGender()
        );

        ownerRepository.saveAndFlush(owner);
    }

    @Override
    public void deleteAnimal(OwnerId ownerId, AnimalId animalId) throws OwnerNotExistsException, AnimalNotExistsException {
        Owner owner = findById(ownerId).orElseThrow(OwnerNotExistsException::new);
        owner.removeAnimal(animalId);

        ownerRepository.saveAndFlush(owner);
    }

}
