import CreatePetUseCaseInput from "./create.pet.usecase.input";

export default class UpdatePetUseCaseInput extends CreatePetUseCaseInput {
  id: string

  constructor (data: Partial<UpdatePetUseCaseInput>) {
    super (data)
    Object.assign(this, data)
  }
}