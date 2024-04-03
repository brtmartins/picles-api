import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";

export default class GetShelterDetailsUseCase implements IUseCase<null, GetShelterDetailsUseCaseOutput> {
  run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
    return Promise.resolve(new GetShelterDetailsUseCaseOutput({
      shelterName: 'Aumiguinhos',
      shelterEmail: 'aumiguinhos@gmail.com',
      shelterPhone: '19998766768',
      shelterWhatsApp: '19998766768',
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  }
}