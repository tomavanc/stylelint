// @ts-nocheck

import alphaValueNotation from './alpha-value-notation/index.js';
import atRuleAllowedList from './at-rule-allowed-list/index.js';
import atRuleDisallowedList from './at-rule-disallowed-list/index.js';
import atRuleEmptyLineBefore from './at-rule-empty-line-before/index.js';
import atRuleNameCase from './at-rule-name-case/index.js';
import atRuleNameNewlineAfter from './at-rule-name-newline-after/index.js';
import atRuleSemicolonSpaceBefore from './at-rule-semicolon-space-before/index.js';
import atRuleNameSpaceAfter from './at-rule-name-space-after/index.js';
import atRuleNoUnknown from './at-rule-no-unknown/index.js';
import atRuleNoVendorPrefix from './at-rule-no-vendor-prefix/index.js';
import atRulePropertyRequiredList from './at-rule-property-required-list/index.js';
import atRuleSemicolonNewlineAfter from './at-rule-semicolon-newline-after/index.js';
import blockClosingBraceEmptyLineBefore from './block-closing-brace-empty-line-before/index.js';
import blockClosingBraceNewlineAfter from './block-closing-brace-newline-after/index.js';
import blockClosingBraceNewlineBefore from './block-closing-brace-newline-before/index.js';
import blockClosingBraceSpaceAfter from './block-closing-brace-space-after/index.js';
import blockClosingBraceSpaceBefore from './block-closing-brace-space-before/index.js';
import blockNoEmpty from './block-no-empty/index.js';
import blockOpeningBraceNewlineAfter from './block-opening-brace-newline-after/index.js';
import blockOpeningBraceNewlineBefore from './block-opening-brace-newline-before/index.js';
import blockOpeningBraceSpaceAfter from './block-opening-brace-space-after/index.js';
import blockOpeningBraceSpaceBefore from './block-opening-brace-space-before/index.js';
import colorFunctionNotation from './color-function-notation/index.js';
import colorHexAlpha from './color-hex-alpha/index.js';
import colorHexCase from './color-hex-case/index.js';
import colorHexLength from './color-hex-length/index.js';
import colorNamed from './color-named/index.js';
import colorNoHex from './color-no-hex/index.js';
import colorNoInvalidHex from './color-no-invalid-hex/index.js';
import commentEmptyLineBefore from './comment-empty-line-before/index.js';
import commentNoEmpty from './comment-no-empty/index.js';
import commentPattern from './comment-pattern/index.js';
import commentWhitespaceInside from './comment-whitespace-inside/index.js';
import commentWordDisallowedList from './comment-word-disallowed-list/index.js';
import customMediaPattern from './custom-media-pattern/index.js';
import customPropertyEmptyLineBefore from './custom-property-empty-line-before/index.js';
import customPropertyNoMissingVarFunction from './custom-property-no-missing-var-function/index.js';
import customPropertyPattern from './custom-property-pattern/index.js';
import declarationBangSpaceAfter from './declaration-bang-space-after/index.js';
import declarationBangSpaceBefore from './declaration-bang-space-before/index.js';
import declarationBlockNoDuplicateCustomProperties from './declaration-block-no-duplicate-custom-properties/index.js';
import declarationBlockNoDuplicateProperties from './declaration-block-no-duplicate-properties/index.js';
import declarationBlockNoRedundantLonghandProperties from './declaration-block-no-redundant-longhand-properties/index.js';
import declarationBlockNoShorthandPropertyOverrides from './declaration-block-no-shorthand-property-overrides/index.js';
import declarationBlockSemicolonNewlineAfter from './declaration-block-semicolon-newline-after/index.js';
import declarationBlockSemicolonNewlineBefore from './declaration-block-semicolon-newline-before/index.js';
import declarationBlockSemicolonSpaceAfter from './declaration-block-semicolon-space-after/index.js';
import declarationBlockSemicolonSpaceBefore from './declaration-block-semicolon-space-before/index.js';
import declarationBlockSingleLineMaxDeclarations from './declaration-block-single-line-max-declarations/index.js';
import declarationBlockTrailingSemicolon from './declaration-block-trailing-semicolon/index.js';
import declarationColonNewlineAfter from './declaration-colon-newline-after/index.js';
import declarationColonSpaceAfter from './declaration-colon-space-after/index.js';
import declarationColonSpaceBefore from './declaration-colon-space-before/index.js';
import declarationEmptyLineBefore from './declaration-empty-line-before/index.js';
import declarationNoImportant from './declaration-no-important/index.js';
import declarationPropertyUnitAllowedList from './declaration-property-unit-allowed-list/index.js';
import declarationPropertyUnitDisallowedList from './declaration-property-unit-disallowed-list/index.js';
import declarationPropertyValueAllowedList from './declaration-property-value-allowed-list/index.js';
import declarationPropertyValueDisallowedList from './declaration-property-value-disallowed-list/index.js';
import fontFamilyNoMissingGenericFamilyKeyword from './font-family-no-missing-generic-family-keyword/index.js';
import fontFamilyNameQuotes from './font-family-name-quotes/index.js';
import fontFamilyNoDuplicateNames from './font-family-no-duplicate-names/index.js';
import fontWeightNotation from './font-weight-notation/index.js';
import functionAllowedList from './function-allowed-list/index.js';
import functionCalcNoUnspacedOperator from './function-calc-no-unspaced-operator/index.js';
import functionCommaNewlineAfter from './function-comma-newline-after/index.js';
import functionCommaNewlineBefore from './function-comma-newline-before/index.js';
import functionCommaSpaceAfter from './function-comma-space-after/index.js';
import functionCommaSpaceBefore from './function-comma-space-before/index.js';
import functionDisallowedList from './function-disallowed-list/index.js';
import functionLinearGradientNoNonstandardDirection from './function-linear-gradient-no-nonstandard-direction/index.js';
import functionMaxEmptyLines from './function-max-empty-lines/index.js';
import functionNameCase from './function-name-case/index.js';
import functionParenthesesNewlineInside from './function-parentheses-newline-inside/index.js';
import functionParenthesesSpaceInside from './function-parentheses-space-inside/index.js';
import functionUrlNoSchemeRelative from './function-url-no-scheme-relative/index.js';
import functionUrlQuotes from './function-url-quotes/index.js';
import functionUrlSchemeAllowedList from './function-url-scheme-allowed-list/index.js';
import functionUrlSchemeDisallowedList from './function-url-scheme-disallowed-list/index.js';
import functionWhitespaceAfter from './function-whitespace-after/index.js';
import hueDegreeNotation from './hue-degree-notation/index.js';
import keyframeDeclarationNoImportant from './keyframe-declaration-no-important/index.js';
import keyframesNamePattern from './keyframes-name-pattern/index.js';
import lengthZeroNoUnit from './length-zero-no-unit/index.js';
import linebreaks from './linebreaks/index.js';
import maxEmptyLines from './max-empty-lines/index.js';
import maxLineLength from './max-line-length/index.js';
import maxNestingDepth from './max-nesting-depth/index.js';
import mediaFeatureColonSpaceAfter from './media-feature-colon-space-after/index.js';
import mediaFeatureColonSpaceBefore from './media-feature-colon-space-before/index.js';
import mediaFeatureNameAllowedList from './media-feature-name-allowed-list/index.js';
import mediaFeatureNameCase from './media-feature-name-case/index.js';
import mediaFeatureNameDisallowedList from './media-feature-name-disallowed-list/index.js';
import mediaFeatureNameNoUnknown from './media-feature-name-no-unknown/index.js';
import mediaFeatureNameNoVendorPrefix from './media-feature-name-no-vendor-prefix/index.js';
import mediaFeatureNameValueAllowedList from './media-feature-name-value-allowed-list/index.js';
import mediaFeatureParenthesesSpaceInside from './media-feature-parentheses-space-inside/index.js';
import mediaFeatureRangeOperatorSpaceAfter from './media-feature-range-operator-space-after/index.js';
import mediaFeatureRangeOperatorSpaceBefore from './media-feature-range-operator-space-before/index.js';
import mediaQueryListCommaNewlineAfter from './media-query-list-comma-newline-after/index.js';
import mediaQueryListCommaNewlineBefore from './media-query-list-comma-newline-before/index.js';
import mediaQueryListCommaSpaceAfter from './media-query-list-comma-space-after/index.js';
import mediaQueryListCommaSpaceBefore from './media-query-list-comma-space-before/index.js';
import namedGridAreasNoInvalid from './named-grid-areas-no-invalid/index.js';
import noDescendingSpecificity from './no-descending-specificity/index.js';
import noDuplicateAtImportRules from './no-duplicate-at-import-rules/index.js';
import noDuplicateSelectors from './no-duplicate-selectors/index.js';
import noEmptySource from './no-empty-source/index.js';
import noEmptyFirstLine from './no-empty-first-line/index.js';
import noEolWhitespace from './no-eol-whitespace/index.js';
import noExtraSemicolons from './no-extra-semicolons/index.js';
import noInvalidDoubleSlashComments from './no-invalid-double-slash-comments/index.js';
import noInvalidPositionAtImportRule from './no-invalid-position-at-import-rule/index.js';
import noIrregularWhitespace from './no-irregular-whitespace/index.js';
import noMissingEndOfSourceNewline from './no-missing-end-of-source-newline/index.js';
import noUnknownAnimations from './no-unknown-animations/index.js';
import numberLeadingZero from './number-leading-zero/index.js';
import numberMaxPrecision from './number-max-precision/index.js';
import numberNoTrailingZeros from './number-no-trailing-zeros/index.js';
import propertyAllowedList from './property-allowed-list/index.js';
import propertyCase from './property-case/index.js';
import propertyDisallowedList from './property-disallowed-list/index.js';
import propertyNoUnknown from './property-no-unknown/index.js';
import propertyNoVendorPrefix from './property-no-vendor-prefix/index.js';
import ruleEmptyLineBefore from './rule-empty-line-before/index.js';
import selectorAttributeBracketsSpaceInside from './selector-attribute-brackets-space-inside/index.js';
import selectorAttributeNameDisallowedList from './selector-attribute-name-disallowed-list/index.js';
import selectorAttributeOperatorAllowedList from './selector-attribute-operator-allowed-list/index.js';
import selectorAttributeOperatorDisallowedList from './selector-attribute-operator-disallowed-list/index.js';
import selectorAttributeOperatorSpaceAfter from './selector-attribute-operator-space-after/index.js';
import selectorAttributeOperatorSpaceBefore from './selector-attribute-operator-space-before/index.js';
import selectorAttributeQuotes from './selector-attribute-quotes/index.js';
import selectorClassPattern from './selector-class-pattern/index.js';
import selectorCombinatorAllowedList from './selector-combinator-allowed-list/index.js';
import selectorCombinatorDisallowedList from './selector-combinator-disallowed-list/index.js';
import selectorCombinatorSpaceAfter from './selector-combinator-space-after/index.js';
import selectorCombinatorSpaceBefore from './selector-combinator-space-before/index.js';
import selectorDescendantCombinatorNoNonSpace from './selector-descendant-combinator-no-non-space/index.js';
import selectorDisallowedList from './selector-disallowed-list/index.js';
import selectorIdPattern from './selector-id-pattern/index.js';
import selectorListCommaNewlineAfter from './selector-list-comma-newline-after/index.js';
import selectorListCommaNewlineBefore from './selector-list-comma-newline-before/index.js';
import selectorListCommaSpaceAfter from './selector-list-comma-space-after/index.js';
import selectorListCommaSpaceBefore from './selector-list-comma-space-before/index.js';
import selectorMaxAttribute from './selector-max-attribute/index.js';
import selectorMaxClass from './selector-max-class/index.js';
import selectorMaxCombinators from './selector-max-combinators/index.js';
import selectorMaxCompoundSelectors from './selector-max-compound-selectors/index.js';
import selectorMaxEmptyLines from './selector-max-empty-lines/index.js';
import selectorMaxId from './selector-max-id/index.js';
import selectorMaxPseudoClass from './selector-max-pseudo-class/index.js';
import selectorMaxSpecificity from './selector-max-specificity/index.js';
import selectorMaxType from './selector-max-type/index.js';
import selectorMaxUniversal from './selector-max-universal/index.js';
import selectorNestedPattern from './selector-nested-pattern/index.js';
import selectorNoQualifyingType from './selector-no-qualifying-type/index.js';
import selectorNoVendorPrefix from './selector-no-vendor-prefix/index.js';
import selectorPseudoClassAllowedList from './selector-pseudo-class-allowed-list/index.js';
import selectorPseudoClassCase from './selector-pseudo-class-case/index.js';
import selectorPseudoClassDisallowedList from './selector-pseudo-class-disallowed-list/index.js';
import selectorPseudoClassNoUnknown from './selector-pseudo-class-no-unknown/index.js';
import selectorPseudoClassParenthesesSpaceInside from './selector-pseudo-class-parentheses-space-inside/index.js';
import selectorPseudoElementAllowedList from './selector-pseudo-element-allowed-list/index.js';
import selectorPseudoElementCase from './selector-pseudo-element-case/index.js';
import selectorPseudoElementColonNotation from './selector-pseudo-element-colon-notation/index.js';
import selectorPseudoElementDisallowedList from './selector-pseudo-element-disallowed-list/index.js';
import selectorPseudoElementNoUnknown from './selector-pseudo-element-no-unknown/index.js';
import selectorTypeCase from './selector-type-case/index.js';
// import selectorTypeNoUnknown from './selector-type-no-unknown/index.js';
import shorthandPropertyNoRedundantValues from './shorthand-property-no-redundant-values/index.js';
import stringNoNewline from './string-no-newline/index.js';
import stringQuotes from './string-quotes/index.js';
import timeMinMilliseconds from './time-min-milliseconds/index.js';
import unicodeBom from './unicode-bom/index.js';
import unitAllowedList from './unit-allowed-list/index.js';
import unitCase from './unit-case/index.js';
import unitDisallowedList from './unit-disallowed-list/index.js';
import unitNoUnknown from './unit-no-unknown/index.js';
import valueKeywordCase from './value-keyword-case/index.js';
import valueListCommaNewlineAfter from './value-list-comma-newline-after/index.js';
import valueListCommaNewlineBefore from './value-list-comma-newline-before/index.js';
import valueListCommaSpaceAfter from './value-list-comma-space-after/index.js';
import valueListCommaSpaceBefore from './value-list-comma-space-before/index.js';
import valueListMaxEmptyLines from './value-list-max-empty-lines/index.js';
import valueNoVendorPrefix from './value-no-vendor-prefix/index.js';
import indentation from './indentation/index.js';

/** @typedef {import('stylelint').StylelintRule} StylelintRule */

/** @type {{[k: string]: StylelintRule}} */
const rules = {
	'alpha-value-notation': alphaValueNotation,
	'at-rule-allowed-list': atRuleAllowedList,
	'at-rule-disallowed-list': atRuleDisallowedList,
	'at-rule-empty-line-before': atRuleEmptyLineBefore,
	'at-rule-name-case': atRuleNameCase,
	'at-rule-name-newline-after': atRuleNameNewlineAfter,
	'at-rule-semicolon-space-before': atRuleSemicolonSpaceBefore,
	'at-rule-name-space-after': atRuleNameSpaceAfter,
	'at-rule-no-unknown': atRuleNoUnknown,
	'at-rule-no-vendor-prefix': atRuleNoVendorPrefix,
	'at-rule-property-required-list': atRulePropertyRequiredList,
	'at-rule-semicolon-newline-after': atRuleSemicolonNewlineAfter,
	'block-closing-brace-empty-line-before': blockClosingBraceEmptyLineBefore,
	'block-closing-brace-newline-after': blockClosingBraceNewlineAfter,
	'block-closing-brace-newline-before': blockClosingBraceNewlineBefore,
	'block-closing-brace-space-after': blockClosingBraceSpaceAfter,
	'block-closing-brace-space-before': blockClosingBraceSpaceBefore,
	'block-no-empty': blockNoEmpty,
	'block-opening-brace-newline-after': blockOpeningBraceNewlineAfter,
	'block-opening-brace-newline-before': blockOpeningBraceNewlineBefore,
	'block-opening-brace-space-after': blockOpeningBraceSpaceAfter,
	'block-opening-brace-space-before': blockOpeningBraceSpaceBefore,
	'color-function-notation': colorFunctionNotation,
	'color-hex-alpha': colorHexAlpha,
	'color-hex-case': colorHexCase,
	'color-hex-length': colorHexLength,
	'color-named': colorNamed,
	'color-no-hex': colorNoHex,
	'color-no-invalid-hex': colorNoInvalidHex,
	'comment-empty-line-before': commentEmptyLineBefore,
	'comment-no-empty': commentNoEmpty,
	'comment-pattern': commentPattern,
	'comment-whitespace-inside': commentWhitespaceInside,
	'comment-word-disallowed-list': commentWordDisallowedList,
	'custom-media-pattern': customMediaPattern,
	'custom-property-empty-line-before': customPropertyEmptyLineBefore,
	'custom-property-no-missing-var-function': customPropertyNoMissingVarFunction,
	'custom-property-pattern': customPropertyPattern,
	'declaration-bang-space-after': declarationBangSpaceAfter,
	'declaration-bang-space-before': declarationBangSpaceBefore,
	'declaration-block-no-duplicate-custom-properties': declarationBlockNoDuplicateCustomProperties,
	'declaration-block-no-duplicate-properties': declarationBlockNoDuplicateProperties,
	'declaration-block-no-redundant-longhand-properties':
		declarationBlockNoRedundantLonghandProperties,
	'declaration-block-no-shorthand-property-overrides': declarationBlockNoShorthandPropertyOverrides,
	'declaration-block-semicolon-newline-after': declarationBlockSemicolonNewlineAfter,
	'declaration-block-semicolon-newline-before': declarationBlockSemicolonNewlineBefore,
	'declaration-block-semicolon-space-after': declarationBlockSemicolonSpaceAfter,
	'declaration-block-semicolon-space-before': declarationBlockSemicolonSpaceBefore,
	'declaration-block-single-line-max-declarations': declarationBlockSingleLineMaxDeclarations,
	'declaration-block-trailing-semicolon': declarationBlockTrailingSemicolon,
	'declaration-colon-newline-after': declarationColonNewlineAfter,
	'declaration-colon-space-after': declarationColonSpaceAfter,
	'declaration-colon-space-before': declarationColonSpaceBefore,
	'declaration-empty-line-before': declarationEmptyLineBefore,
	'declaration-no-important': declarationNoImportant,
	'declaration-property-unit-allowed-list': declarationPropertyUnitAllowedList,
	'declaration-property-unit-disallowed-list': declarationPropertyUnitDisallowedList,
	'declaration-property-value-allowed-list': declarationPropertyValueAllowedList,
	'declaration-property-value-disallowed-list': declarationPropertyValueDisallowedList,
	'font-family-no-missing-generic-family-keyword': fontFamilyNoMissingGenericFamilyKeyword,
	'font-family-name-quotes': fontFamilyNameQuotes,
	'font-family-no-duplicate-names': fontFamilyNoDuplicateNames,
	'font-weight-notation': fontWeightNotation,
	'function-allowed-list': functionAllowedList,
	'function-calc-no-unspaced-operator': functionCalcNoUnspacedOperator,
	'function-comma-newline-after': functionCommaNewlineAfter,
	'function-comma-newline-before': functionCommaNewlineBefore,
	'function-comma-space-after': functionCommaSpaceAfter,
	'function-comma-space-before': functionCommaSpaceBefore,
	'function-disallowed-list': functionDisallowedList,
	'function-linear-gradient-no-nonstandard-direction': functionLinearGradientNoNonstandardDirection,
	'function-max-empty-lines': functionMaxEmptyLines,
	'function-name-case': functionNameCase,
	'function-parentheses-newline-inside': functionParenthesesNewlineInside,
	'function-parentheses-space-inside': functionParenthesesSpaceInside,
	'function-url-no-scheme-relative': functionUrlNoSchemeRelative,
	'function-url-quotes': functionUrlQuotes,
	'function-url-scheme-allowed-list': functionUrlSchemeAllowedList,
	'function-url-scheme-disallowed-list': functionUrlSchemeDisallowedList,
	'function-whitespace-after': functionWhitespaceAfter,
	'hue-degree-notation': hueDegreeNotation,
	'keyframe-declaration-no-important': keyframeDeclarationNoImportant,
	'keyframes-name-pattern': keyframesNamePattern,
	'length-zero-no-unit': lengthZeroNoUnit,
	linebreaks,
	'max-empty-lines': maxEmptyLines,
	'max-line-length': maxLineLength,
	'max-nesting-depth': maxNestingDepth,
	'media-feature-colon-space-after': mediaFeatureColonSpaceAfter,
	'media-feature-colon-space-before': mediaFeatureColonSpaceBefore,
	'media-feature-name-allowed-list': mediaFeatureNameAllowedList,
	'media-feature-name-case': mediaFeatureNameCase,
	'media-feature-name-disallowed-list': mediaFeatureNameDisallowedList,
	'media-feature-name-no-unknown': mediaFeatureNameNoUnknown,
	'media-feature-name-no-vendor-prefix': mediaFeatureNameNoVendorPrefix,
	'media-feature-name-value-allowed-list': mediaFeatureNameValueAllowedList,
	'media-feature-parentheses-space-inside': mediaFeatureParenthesesSpaceInside,
	'media-feature-range-operator-space-after': mediaFeatureRangeOperatorSpaceAfter,
	'media-feature-range-operator-space-before': mediaFeatureRangeOperatorSpaceBefore,
	'media-query-list-comma-newline-after': mediaQueryListCommaNewlineAfter,
	'media-query-list-comma-newline-before': mediaQueryListCommaNewlineBefore,
	'media-query-list-comma-space-after': mediaQueryListCommaSpaceAfter,
	'media-query-list-comma-space-before': mediaQueryListCommaSpaceBefore,
	'named-grid-areas-no-invalid': namedGridAreasNoInvalid,
	'no-descending-specificity': noDescendingSpecificity,
	'no-duplicate-at-import-rules': noDuplicateAtImportRules,
	'no-duplicate-selectors': noDuplicateSelectors,
	'no-empty-source': noEmptySource,
	'no-empty-first-line': noEmptyFirstLine,
	'no-eol-whitespace': noEolWhitespace,
	'no-extra-semicolons': noExtraSemicolons,
	'no-invalid-double-slash-comments': noInvalidDoubleSlashComments,
	'no-invalid-position-at-import-rule': noInvalidPositionAtImportRule,
	'no-irregular-whitespace': noIrregularWhitespace,
	'no-missing-end-of-source-newline': noMissingEndOfSourceNewline,
	'no-unknown-animations': noUnknownAnimations,
	'number-leading-zero': numberLeadingZero,
	'number-max-precision': numberMaxPrecision,
	'number-no-trailing-zeros': numberNoTrailingZeros,
	'property-allowed-list': propertyAllowedList,
	'property-case': propertyCase,
	'property-disallowed-list': propertyDisallowedList,
	'property-no-unknown': propertyNoUnknown,
	'property-no-vendor-prefix': propertyNoVendorPrefix,
	'rule-empty-line-before': ruleEmptyLineBefore,
	'selector-attribute-brackets-space-inside': selectorAttributeBracketsSpaceInside,
	'selector-attribute-name-disallowed-list': selectorAttributeNameDisallowedList,
	'selector-attribute-operator-allowed-list': selectorAttributeOperatorAllowedList,
	'selector-attribute-operator-disallowed-list': selectorAttributeOperatorDisallowedList,
	'selector-attribute-operator-space-after': selectorAttributeOperatorSpaceAfter,
	'selector-attribute-operator-space-before': selectorAttributeOperatorSpaceBefore,
	'selector-attribute-quotes': selectorAttributeQuotes,
	'selector-class-pattern': selectorClassPattern,
	'selector-combinator-allowed-list': selectorCombinatorAllowedList,
	'selector-combinator-disallowed-list': selectorCombinatorDisallowedList,
	'selector-combinator-space-after': selectorCombinatorSpaceAfter,
	'selector-combinator-space-before': selectorCombinatorSpaceBefore,
	'selector-descendant-combinator-no-non-space': selectorDescendantCombinatorNoNonSpace,
	'selector-disallowed-list': selectorDisallowedList,
	'selector-id-pattern': selectorIdPattern,
	'selector-list-comma-newline-after': selectorListCommaNewlineAfter,
	'selector-list-comma-newline-before': selectorListCommaNewlineBefore,
	'selector-list-comma-space-after': selectorListCommaSpaceAfter,
	'selector-list-comma-space-before': selectorListCommaSpaceBefore,
	'selector-max-attribute': selectorMaxAttribute,
	'selector-max-class': selectorMaxClass,
	'selector-max-combinators': selectorMaxCombinators,
	'selector-max-compound-selectors': selectorMaxCompoundSelectors,
	'selector-max-empty-lines': selectorMaxEmptyLines,
	'selector-max-id': selectorMaxId,
	'selector-max-pseudo-class': selectorMaxPseudoClass,
	'selector-max-specificity': selectorMaxSpecificity,
	'selector-max-type': selectorMaxType,
	'selector-max-universal': selectorMaxUniversal,
	'selector-nested-pattern': selectorNestedPattern,
	'selector-no-qualifying-type': selectorNoQualifyingType,
	'selector-no-vendor-prefix': selectorNoVendorPrefix,
	'selector-pseudo-class-allowed-list': selectorPseudoClassAllowedList,
	'selector-pseudo-class-case': selectorPseudoClassCase,
	'selector-pseudo-class-disallowed-list': selectorPseudoClassDisallowedList,
	'selector-pseudo-class-no-unknown': selectorPseudoClassNoUnknown,
	'selector-pseudo-class-parentheses-space-inside': selectorPseudoClassParenthesesSpaceInside,
	'selector-pseudo-element-allowed-list': selectorPseudoElementAllowedList,
	'selector-pseudo-element-case': selectorPseudoElementCase,
	'selector-pseudo-element-colon-notation': selectorPseudoElementColonNotation,
	'selector-pseudo-element-disallowed-list': selectorPseudoElementDisallowedList,
	'selector-pseudo-element-no-unknown': selectorPseudoElementNoUnknown,
	'selector-type-case': selectorTypeCase,
	// 'selector-type-no-unknown': selectorTypeNoUnknown,
	'shorthand-property-no-redundant-values': shorthandPropertyNoRedundantValues,
	'string-no-newline': stringNoNewline,
	'string-quotes': stringQuotes,
	'time-min-milliseconds': timeMinMilliseconds,
	'unicode-bom': unicodeBom,
	'unit-allowed-list': unitAllowedList,
	'unit-case': unitCase,
	'unit-disallowed-list': unitDisallowedList,
	'unit-no-unknown': unitNoUnknown,
	'value-keyword-case': valueKeywordCase,
	'value-list-comma-newline-after': valueListCommaNewlineAfter,
	'value-list-comma-newline-before': valueListCommaNewlineBefore,
	'value-list-comma-space-after': valueListCommaSpaceAfter,
	'value-list-comma-space-before': valueListCommaSpaceBefore,
	'value-list-max-empty-lines': valueListMaxEmptyLines,
	'value-no-vendor-prefix': valueNoVendorPrefix,
	indentation,
};

export default rules;
