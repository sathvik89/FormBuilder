export const FIELD_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  EMAIL: "email",
  PHONE: "phone",
  DROPDOWN: "dropdown",
  CHECKBOX: "checkbox",
  DATE: "date",
  NUMBER: "number",
};

export const DEFAULT_FIELDS = [
  {
    type: FIELD_TYPES.TEXT,
    label: "Text Input",
    icon: "📝",
    defaultProps: {
      label: "Text Field",
      placeholder: "Enter text...",
      required: false,
      minLength: "",
      maxLength: "",
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.EMAIL,
    label: "Email",
    icon: "📧",
    defaultProps: {
      label: "Email Address",
      placeholder: "Enter your email...",
      required: false,
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.PHONE,
    label: "Phone",
    icon: "📞",
    defaultProps: {
      label: "Phone Number",
      placeholder: "Enter phone number...",
      required: false,
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.TEXTAREA,
    label: "Textarea",
    icon: "📄",
    defaultProps: {
      label: "Message",
      placeholder: "Enter your message...",
      required: false,
      rows: 4,
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.DROPDOWN,
    label: "Dropdown",
    icon: "📋",
    defaultProps: {
      label: "Select Option",
      required: false,
      options: ["Option 1", "Option 2", "Option 3"],
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.CHECKBOX,
    label: "Checkbox",
    icon: "☑️",
    defaultProps: {
      label: "Checkbox",
      required: false,
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.DATE,
    label: "Date Picker",
    icon: "📅",
    defaultProps: {
      label: "Date",
      required: false,
      helpText: "",
    },
  },
  {
    type: FIELD_TYPES.NUMBER,
    label: "Number",
    icon: "🔢",
    defaultProps: {
      label: "Number",
      placeholder: "Enter number...",
      required: false,
      min: "",
      max: "",
      helpText: "",
    },
  },
];

export const FORM_TEMPLATES = [
  {
    id: "contact-us",
    name: "Contact Us Form",
    description: "Basic contact form with name, email, and message",
    steps: [
      {
        id: "step-1",
        title: "Personal Information",
        fields: [
          {
            id: "1",
            type: FIELD_TYPES.TEXT,
            label: "Full Name",
            placeholder: "Enter your full name",
            required: true,
          },
          {
            id: "2",
            type: FIELD_TYPES.EMAIL,
            label: "Email Address",
            placeholder: "Enter your email",
            required: true,
          },
          {
            id: "3",
            type: FIELD_TYPES.PHONE,
            label: "Phone Number",
            placeholder: "Enter your phone number",
            required: false,
          },
        ],
      },
      {
        id: "step-2",
        title: "Your Message",
        fields: [
          {
            id: "4",
            type: FIELD_TYPES.TEXTAREA,
            label: "Message",
            placeholder: "Enter your message",
            required: true,
            rows: 5,
          },
        ],
      },
    ],
  },
  {
    id: "survey",
    name: "Customer Survey",
    description: "Multi-step customer feedback survey",
    steps: [
      {
        id: "step-1",
        title: "Basic Information",
        fields: [
          {
            id: "1",
            type: FIELD_TYPES.TEXT,
            label: "Your Name",
            placeholder: "Enter your name",
            required: true,
          },
          {
            id: "2",
            type: FIELD_TYPES.DROPDOWN,
            label: "How did you hear about us?",
            required: true,
            options: [
              "Social Media",
              "Google Search",
              "Friend Referral",
              "Advertisement",
              "Other",
            ],
          },
        ],
      },
      {
        id: "step-2",
        title: "Feedback",
        fields: [
          {
            id: "3",
            type: FIELD_TYPES.DROPDOWN,
            label: "Rate our service",
            required: true,
            options: ["Excellent", "Good", "Average", "Poor"],
          },
          {
            id: "4",
            type: FIELD_TYPES.TEXTAREA,
            label: "Additional Comments",
            placeholder: "Share your feedback...",
            required: false,
            rows: 4,
          },
        ],
      },
    ],
  },
];
