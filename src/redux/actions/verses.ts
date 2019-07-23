import { FETCH_VERSES } from '../constants/verses';
import apiClient from '../../apiClient';
import { ChapterId, Paging } from '../../types';
import SettingsShape from '../../shapes/SettingsShape';
import { INITIAL_STATE } from '../reducers/settings';

type Params = {
  translations?: Array<number>;
};

const prepareParams = (params: any, options: any) => {
  if (params.translations && Array.isArray(params.translations)) {
    const translations =
      typeof params.translations === 'string'
        ? params.translations.split(',')
        : params.translations;

    return { translations };
  }

  return { translations: options.translations || INITIAL_STATE.translations };
};

export const fetchVerses = (
  chapterId: ChapterId,
  paging: Paging,
  params: Params,
  settings: SettingsShape
) => {
  const apiOptions = prepareParams(params, settings);

  return {
    type: FETCH_VERSES,
    promise: apiClient.get(`/api/v3/chapters/${chapterId}/verses`, {
      params: {
        ...paging,
        ...apiOptions,
      },
    }),
    meta: {
      chapterId,
    },
  };
};

export type ActionTypes = typeof fetchVerses;
export type FetchVerses = typeof fetchVerses;
