// TODO outdated
export type Person = {
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  role?: Object,
}

export type LineAttributes = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  strokeThickness: number,
};

export type LineAttributesInput = {
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  strokeThickness?: number,
};

export type Data = {
  id: number,
  dataName?: string,
  fieldType?: number,
  affectsSignature?: boolean,
  required?: boolean,
  value?: {
    data: string | Array<string>,
  },
  minLen?: number,
  maxLen?: number,
  createdAt?: Date,
  updatedAt?: Date,
}

export type Field = {
  id: number,
  fieldName?: string,
  positionLock?: boolean,
  deleted?: boolean,
  pageId?: number,
  createdAt?: Date,
  updatedAt?: Date,
};

export type TextField = {
  ...$Exact<Field>,
  assignee?: string,
  dataReference?: ?number,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  color?: string,
  fontSize?: number,
  alignment?: string,
  padding?: number,
  lineHeight?: number,
  dataByDataReference?: Data,
}

export type DateField = {
  ...$Exact<Field>,
  assignee?: string,
  dateFormat: string,
  dataReference?: ?number,
  autoPopulate?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  color?: string,
  fontSize?: number,
  alignment?: string,
  padding?: number,
  lineHeight?: number,
  dataByDataReference?: Data,
}

export type BoolField = {
  ...$Exact<Field>,
  x?: number,
  y?: number,
  height?: number,
  width?: number,
  fieldGroupId?: number,
  dataReference?: ?number,
  color?: string,
  deleted?: boolean,
  assignee?: string,
  dataByDataReference?: Data,
};

export type InitialField = {
  ...$Exact<Field>,
  x?: number,
  y?: number,
  height?: number,
  width?: number,
  color?: string,
  dataReference?: ?number,
  color?: string,
  deleted?: boolean,
  assignee?: string,
  dataByDataReference?: Data,
  stampLookupUrl?: string,
};

export type SignatureField = {
  ...$Exact<Field>,
  x?: number,
  y?: number,
  height?: number,
  width?: number,
  color?: string,
  dataReference?: ?number,
  color?: string,
  deleted?: boolean,
  assignee?: string,
  dataByDataReference?: Data,
  stampLookupUrl?: string,
};

export type LineField = {
  ...$Exact<Field>,
  x1: ?number,
  y1: ?number,
  x2: ?number,
  y2: ?number,
  strokeThickness?: number,
  color?: string,
  deleted?: boolean,
};

export type PageField = TextField | DateField | InitialField | LineField | SignatureField | BoolField;

// types describing the shape of the data as it's used in editor
// merged from Doc & Form types
export type Page = {
  id: number,
  pageNumber?: number,
  width?: number,
  height?: number,
  createdAt?: Date,
  updatedAt?: Date,

  textFields: {
    nodes: Array<?TextField>,
    totalCount: number,
  },

  dateFields: {
    nodes: Array<?DateField>,
    totalCount: number,
  },

  boolFields: {
    nodes: Array<?BoolField>,
    totalCount: number,
  },

  signatureFields: {
    nodes: Array<?SignatureField>,
    totalCount: number,
  },

  initialFields: {
    nodes: Array<?InitialField>,
    totalCount: number,
  },

  lineFields: {
    nodes: Array<?LineField>,
    totalCount: number,
  }
}

// merged from Doc & Form types
export type EditorDocument = {
  id: number,
  name?: string,
  sourceURL?: string,
  pages: {
    nodes: Array<?Page>,
    totalCount: number,
  },

  data: {
    nodes: Array<?Data>,
    totalCount: number,
  }
}

// adapted types describe the way pages and fields are stored in templateEditor state
// We take types returned by BE and add extra fields to them for convenience
// inside of the editor, mainly adapted types are used. Original types are used
// in network queries/mutations

export type AdaptedTextField = {
  ...$Exact<TextField>,
  type: 'text',
  pageIndex: number,
  temporary?: boolean
};

export type AdaptedDateField = {
  ...$Exact<DateField>,
  type: 'date',
  pageNumber: number,
  temporary?: boolean
};

export type AdaptedBoolField = {
  ...$Exact<BoolField>,
  type: 'checkbox',
  pageIndex: number,
  temporary?: boolean
};

export type AdaptedLineField = {
  ...$Exact<LineField>,
  type: 'line',
  pageIndex: number,
  temporary?: boolean
};

export type AdaptedInitialField = {
  ...$Exact<InitialField>,
  type: 'initial',
  pageIndex: number,
  temporary?: boolean
};

export type AdaptedSignatureField = {
  ...$Exact<SignatureField>,
  type: 'signature',
  pageIndex: number,
  temporary?: boolean
};

// union type for an adaptedField
export type AdaptedField = AdaptedBoolField | AdaptedInitialField | AdaptedLineField | AdaptedTextField | AdaptedDateField | AdaptedSignatureField;

export type AdaptedPage = {
  id: number,
  pageNumber?: number,
  documentId: number,
  documentName: string,
  width?: number,
  height?: number,
  fields: {
    [number]: AdaptedField,
  },
};

export type FieldResponse = {
  textFields: Array<TextField>,
  dateFields: Array<DateField>,
  boolFields: Array<BoolField>,
  initialFields: Array<InitialField>,
  lineFields: Array<LineField>,
  signatureFields: Array<SignatureField>,
};

// create field input types

type PageFieldInput = {
  fieldName?: string,
  deleted: boolean,
  positionLock: boolean,
  color?: string
}

type Alignments = 'CENTER' | 'LEFT' | 'RIGHT' | 'JUSTIFY';

export type DataInput = {
  dataName?: string,
  affectsSignature: boolean,
  required: boolean,
  minLen?: number,
  maxLen?: number,
}

export type PageFieldTextInput = {|
  ...$Exact<PageFieldInput>,
  fieldGroupId?: number,
  assignee: string,
  autocomplete: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize?: number,
  alignment?: Alignments,
  padding?: number,
  lineHeight?: number,
  dataValue: string,
  dataInput: DataInput,
  dataReference?: ?number,
|}

export type PageFieldDateInput = {|
  ...$Exact<PageFieldInput>,
  assignee: string,
  autoPopulate: boolean,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize?: number,
  alignment?: Alignments,
  padding?: number,
  lineHeight?: number,
  dataValue: string,
  dataInput: DataInput,
|}

export type PageFieldBoolInput = {|
  ...$Exact<PageFieldInput>,
  fieldGroupId?: number,
  assignee: string,
  x: number,
  y: number,
  width: number,
  height: number,
  dataValue: string,
  dataInput: DataInput,
  dataReference?: ?number,
|}

export type PageFieldSignatureInput = {|
  ...$Exact<PageFieldInput>,
  assignee: string,
  x: number,
  y: number,
  width: number,
  height: number,
  dataReference?: ?number,
|}

export type PageFieldInitialInput = {|
  ...$Exact<PageFieldInput>,
  assignee: string,
  x: number,
  y: number,
  width: number,
  height: number,
  dataReference?: ?number,
|}

export type PageFieldLineInput = {|
  ...$Exact<PageFieldInput>,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  strokeThickness: number,
  dataReference?: ?number,
|}

// field template types

export type TextFieldTemplate = {|
  ...$Exact<PageFieldTextInput>,
  type: string,
|}

export type DateFieldTemplate = {|
  ...$Exact<PageFieldDateInput>,
  type: string,
|}

export type BoolFieldTemplate = {|
  ...$Exact<PageFieldBoolInput>,
  type: string,
|}

export type InitialFieldTemplate = {|
  ...$Exact<PageFieldInitialInput>,
  type: string,
|}

export type LineFieldTemplate = {|
  ...$Exact<PageFieldLineInput>,
  type: string,
|}

export type SignatureFieldTemplate = {|
  ...$Exact<PageFieldSignatureInput>,
  type: string,
|}

export type FieldTemplate = TextFieldTemplate | DateFieldTemplate | BoolFieldTemplate |
  InitialFieldTemplate | LineFieldTemplate | SignatureFieldTemplate;

// update field input types

export type UpdatePageFieldInput = {
  id: number,
  fieldName?: string,
  formPageId?: number,
  deleted?: boolean,
  positionLock?: boolean,
  color?: string,
}

export type UpdatePageFieldTextInput = {
  ...$Exact<UpdatePageFieldInput>,
  assignee?: string,
  dataReference?: number,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  fontSize?: number,
  alignment?: Alignments,
  padding?: number,
  lineHeight?: number,
}

export type UpdatePageFieldDateInput = {
  ...$Exact<UpdatePageFieldInput>,
  assignee?: string,
  dataReference?: number,
  autoPopulate?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  fontSize?: number,
  alignment?: Alignments,
  padding?: number,
  lineHeight?: number,
}

export type UpdatePageFieldBoolInput = {
  ...$Exact<UpdatePageFieldInput>,
  assignee?: string,
  dataReference?: number,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export type UpdatePageFieldInitialInput = {
  ...$Exact<UpdatePageFieldInput>,
  assignee?: string,
  dataReference?: number,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export type UpdatePageFieldSignatureInput = {
  ...$Exact<UpdatePageFieldInput>,
  assignee?: string,
  dataReference?: number,
  autocomplete?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export type UpdatePageFieldLineInput = {
  ...$Exact<UpdatePageFieldInput>,
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  strokeThickness?: number,
}
