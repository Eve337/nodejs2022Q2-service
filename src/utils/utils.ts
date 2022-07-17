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
  const entity = entityDb.find((current: { id: string }) => current.id === id);

  if (!entity) {
    throw new NotFoundException(`${nameOfEntity} is not found`);
  }

  return entity;
};

export const removeEntity = (id: string, entityBd: any) =>
  entityBd.filter((entity: { id: string }) => entity.id !== id);
