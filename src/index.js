// @flow weak
import {basename, extname} from 'path';

export default function reactElementInfo({types: t}) {
  const defaultPrefix = 'data-qa';
  let prefix;
  let filenameAttr;
  let nodeNameAttr;

  const visitor = {
    Program(path, state) {
      if (state.opts.prefix) {
        prefix = `data-${state.opts.prefix}`;
      } else {
        prefix = defaultPrefix;
      }
      filenameAttr = `${prefix}-file`;
      nodeNameAttr = `${prefix}-node`;
    },

    JSXOpeningElement(path, state) {
      const openingElement = path.container.openingElement;
      const attributes = openingElement.attributes;

      const newAttributes = [];

      const elementName = (openingElement.name && openingElement.name.name) ||
        (openingElement.name.property && openingElement.name.property.name);

      if (elementName === 'Fragment') {
        return;
      }

      newAttributes.push(t.jSXAttribute(
        t.jSXIdentifier(nodeNameAttr),
        t.stringLiteral(elementName),
      ));

      let name;
      if (state.file && state.file.opts) {
        if (state.file.opts.basename) {
          name = state.file.opts.basename;
        } else if (state.file.opts.filename) {
          name = basename(state.file.opts.filename, extname(state.file.opts.filename));
        }
      }

      if (name) {
        newAttributes.push(t.jSXAttribute(
          t.jSXIdentifier(filenameAttr),
          t.stringLiteral(name)
        ));
      }

      attributes.push(...newAttributes);
    },
  };

  return {
    visitor,
  };
}
