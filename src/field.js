const fieldProtoFactory = function createFieldProto() {
  let _length;
  let _min;
  let _max;
  let _referTo;

  const fieldProto = {
    optional: true,
    get length() {
      return this.type === 'string' ? _length : undefined;
    },
    set length(newLength) {
      _length = newLength;
    },
    get min() {
      return this.type === 'number' ? _min : undefined;
    },
    set min(newMin) {
      _min = newMin;
    },
    get max() {
      return this.type === 'number' ? _max : undefined;
    },
    set max(newMax) {
      _max = newMax;
    },
    get referTo() {
      return this.type === 'foreignKey' ? _referTo : undefined;
    },
    set referTo(newReferTo) {
      _referTo = newReferTo;
    },
  };

  return fieldProto;
};


const createDefaultField = function createDefaultFieldDescription(option) {
  const fieldProto = fieldProtoFactory();
  const fieldDescription = Object.create(fieldProto);
  Object.assign(fieldDescription, option);
  return fieldDescription;
};


const string = function stringField(option) {
  const fieldDescription = createDefaultField(option);
  fieldDescription.constructor = String;
  fieldDescription.type = 'string';

  return fieldDescription;
};

const boolean = function booleanField(option) {
  const fieldDescription = createDefaultField(option);
  fieldDescription.constructor = Boolean;
  fieldDescription.type = 'boolean';

  return fieldDescription;
};

const number = function numberField(option) {
  const fieldDescription = createDefaultField(option);
  fieldDescription.constructor = Number;
  fieldDescription.type = 'number';

  return fieldDescription;
};

const foreignKey = function foreignKeyField(option) {
  if (!option.to) throw new Error('\'to\' option should be given to field.foreignKey().');

  const fieldDescription = createDefaultField(option);
  fieldDescription.constructor = String;
  fieldDescription.type = 'foreignKey';

  return fieldDescription;
};


const field = {
  string,
  boolean,
  number,
  foreignKey,
};

export default field;
