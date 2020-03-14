/**
 * Based on script in react-intl 'nested' example.
 * Merges 'lang-defaults' folder into language folders under assets/lang
 * run using `yarn langbuild` (requires babel-cli installed globally)
 */
import * as fs from 'fs';
import * as p from 'path';
import { sync as globSync } from 'glob';
import { sync as mkdirpSync } from 'mkdirp';

const MESSAGES_PATTERN = './lang-defaults/**/*.json';
const LANG_DIR = './src/lang/';

const namespacedMessages = globSync(MESSAGES_PATTERN)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((col, descriptors) => {
    const collections = { ...col };
    descriptors.forEach(({ id, defaultMessage }) => {
      if (Object.prototype.hasOwnProperty.call(collections, id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }

      collections[id] = defaultMessage;
    });
    return collections;
  }, {});

// Create default english language file.
const filename = p.join(LANG_DIR, 'en.json');
mkdirpSync(p.dirname(filename));
fs.writeFileSync(filename, JSON.stringify(namespacedMessages, null, 2));

/**
 * TODO: Auto-Population to alternative language files from default eng. file
 * Check if alternative language files for missing fields compared with default english file.
 * The english files in lang-defaults will be updated when new FormattedMessage
 * components are added, and en.json file will be updated when groupMessages function above is run
 * If fields are missing in alternative language files, add placeholders.
 * Place delete tag on fields not found in default file (in the case of renamed fields).
 * This would occur if UI changes and fields are no longer present in en.json, but
 * you may not want to delete the alternative language version entirely.
 * May want to simply rename key. eg. "buttonlabel": "text" -> "buttonlabelDEL": "text"
 */
