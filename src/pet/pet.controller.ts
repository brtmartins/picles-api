import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCase from './usecases/create.pet.usecase';
import PetTokens from './pet.tokens';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetUseCaseInput from './usecases/dtos/update.pet.usecase.input';
import UpdatePetUseCaseOutput from './usecases/dtos/update.pet.usecase.output';
import UpdatePetUseCase from './usecases/update.pet.usecase';
import DeletePetByIdUseCaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './usecases/dtos/delete.pet.by.id.usecase.output';

@Controller('pet')
export class PetController {

  @Inject(PetTokens.createPetUseCase)
  private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

  @Inject(PetTokens.getPetByIdUseCase)
  private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

  @Inject(PetTokens.updatePetUseCase)
  private readonly updatePetUseCase: IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput>
  
  @Inject(PetTokens.deletePetByIdUseCase)
  private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>
  

  @Post()
  async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput>{
    const useCaseInput = new CreatePetUseCaseInput({...input})
    return await this.createPetUseCase.run(useCaseInput)
  }

  @Get(':id')
  async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseOutput>{
    try {
      const useCaseInput = new GetPetByIdUseCaseInput({ id })
      return await this.getPetByIdUseCase.run(useCaseInput)
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message))
    }
  }

  @Put(':id')
  async updatePet(@Body() input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpdatePetUseCaseOutput> {
    try {
      const useCaseInput = new UpdatePetUseCaseInput({
        ...input,
        id
      })
      return await this.updatePetUseCase.run(useCaseInput) 
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message))
    }
  } 

  @Delete(':id')
  async deletePet(@Param('id') id: string) {
    try {
      const useCaseInput = new DeletePetByIdUseCaseInput({ id })
      return await this.deletePetByIdUseCase.run(useCaseInput)
    } catch (error) {
      throw new BadRequestException(JSON.parse(error.message))
    }
  }

}