import React from 'react';
import { Formik } from 'formik';
import { DocumentPickerC } from '../../src/shared/documentPicker/documentPicker';

describe('Document Picker', () => {
  const props = {
    classes: {},
  };

  it('renders', () => {
    const wrapper = shallow(<DocumentPickerC {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('adds form to the state on formPick', () => {
    const wrapper = mount(<Formik
      initialValues={{ formPick: [] }}
      onSubmit={f => f}
      render={({ values, errors }) => <DocumentPickerC values={values} errors={errors} {...props} />}
    />);
    const checkbox = wrapper.find('input[type="checkbox"]').first();
    // initially empty array of form values
    expect(wrapper.state().values.formPick.length).toEqual(0);
    checkbox.simulate('change', { target: { checked: true } });
    expect(wrapper.state().values.formPick.length).toEqual(1);
  });
});
