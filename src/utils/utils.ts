import { BadRequestException, NotFoundException } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';

export const checkUuid = (id: string) => {
  if (!uuidValidate(id)) {
    throw new BadRequestException('UUID is not valid');
  }
};

export const getValidatedEntity = (
  id: string,
  entityDb: any,
  nameOfEntity: string,
) => {
  checkUuid(id);
  const entity = entityDb.find((current: { id: string }) => current.id === id);

  if (!entity) {
    throw new NotFoundException(`${nameOfEntity} is not found`);
  }

  return entity;
};

export const removeEntity = (id: string, entityBd: any) =>
  entityBd.filter((entity: { id: string }) => entity.id !== id);

export const removeEntityFav = (id: string, entityBd: any) =>
  entityBd.filter((currId) => currId !== id);

export const removeEntityAFromEntityB = (
  idEntityA: any,
  entityB: any,
  property: string,
) => {
  for (let i = 0; i < entityB.length; i++)
    if (entityB[i][property] === idEntityA) entityB[i][property] = null;
};

export const findById = (id: string, array: any[]) =>
  array.find((current: { id: string }) => current.id === id);
