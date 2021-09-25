const PhoneNumberValidation = {
  checkPhoneNumberFormat(phoneNumberInput) {
    const tenDigit = /^\(?([0-9]{10})\)?$/;
    const twelveDigit = /^\(?([0-9]{12})\)?$/;

    if (phoneNumberInput.match(tenDigit) || phoneNumberInput.match(twelveDigit)) {
      return true;
    }

    return false;
  },
};

export default PhoneNumberValidation;
