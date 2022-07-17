import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

export const getValidatedEntity = (
  id: string,
  entityDb: any,
  nameOfEntity: string,
) => {
  if (!uuidValidate(id)) {
    throw new BadRequestException('UUID is not valid');
  }
  console.log(entityDb);
  const entity = entityDb.find((current) => current.id === id);

  if (!entity) {
    throw new NotFoundException(`${nameOfEntity} is not found`);
  }

  return entity;
};
