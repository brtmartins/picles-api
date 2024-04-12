import UpdatePetUseCaseOutput from "./update.pet.usecase.output"

export default class UpdatePetPhotoByIdUseCaseOutput extends UpdatePetUseCaseOutput {

  constructor (data: Partial<UpdatePetPhotoByIdUseCaseOutput>) {
    super(data)
   Object.assign(this, data)
  }
  
}