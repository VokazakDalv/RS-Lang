import { wordDifficult } from './types';
import { Component } from '../components/component';

export interface IRoute {
  name: string;
  component: () => Component;
}

export interface IWord {
  'id'?: 'string',
  'group': 0,
  'page': 0,
  'word': 'string',
  'image': 'string',
  'audio': 'string',
  'audioMeaning': 'string',
  'audioExample': 'string',
  'textMeaning': 'string',
  'textExample': 'string',
  'transcription': 'string',
  'userWord'?: wordDifficult,
  'wordTranslate': 'string',
  'textMeaningTranslate': 'string',
  'textExampleTranslate': 'string',
  '_id'?: 'string'
}
