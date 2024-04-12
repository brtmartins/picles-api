import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetUseCaseInput from "./dtos/update.pet.usecase.input";
import UpdatePetUseCaseOutput from "./dtos/update.pet.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Pet } from "../schemas/pet.schema";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import AppTokens from "src/app.tokens";
import IFileService from "src/interfaces/file.service.interface";

@Injectable()
export default class UpdatePetUseCase implements IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput> {
  constructor(
    @Inject(PetTokens.petRepository)
    private readonly petRepository: IPetRepository,

    @Inject(AppTokens.fileService)
    private readonly fileService: IFileService
  ) {}

  
  async run(input: UpdatePetUseCaseInput): Promise<UpdatePetUseCaseOutput> {
    
    let pet = await this.getPetById(input.id)

    if(!pet) {
      throw new PetNotFoundError()
    }

    await this.petRepository.updateById({
      ...input,
      _id: input.id
    })

    pet = await this.getPetById(input.id);

    const petPhoto = !!pet.photo ? (await this.fileService.readFile(pet.photo)).toString('base64') : null;

    return new UpdatePetUseCaseOutput ({
      id: pet._id,
      name: pet.name,
      type: pet.type,
      size: pet.size,
      gender: pet.gender,
      bio: pet.bio,
      photo: petPhoto,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt
    })

  }

  private async getPetById(id: string): Promise<Pet> {
    try {
      return await this.petRepository.getById(id)
    } catch (error) {
      return null
    }
  }
}