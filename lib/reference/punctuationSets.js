const punctuationSets = {};

punctuationSets.mediaFeaturePunctuation = new Set([':', '=', '>', '>=', '<', '<=']);

punctuationSets.nonSpaceCombinators = new Set(['>', '+', '~', '>>>', '/deep/']);

export default punctuationSets;
