import { Body, Controller, Inject, Post } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCase from './usecases/create.pet.usecase';
import PetTokens from './pet.tokens';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';

@Controller('pet')
export class PetController {

  @Inject(PetTokens.createPetUseCase)
  private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>
  
  @Post()
  async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput>{
    const useCaseInput = new CreatePetUseCaseInput({...input})
    return await this.createPetUseCase.run(useCaseInput)
  }

}