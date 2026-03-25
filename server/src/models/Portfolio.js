import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true }
  },
  { _id: false }
);

const heroStatSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const aboutHighlightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: Number, min: 1, max: 100, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true }
  },
  { _id: false }
);

const projectMetricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

const projectLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    subtitle: { type: String, required: true },
    summary: { type: String, required: true },
    impact: { type: String, required: true },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    tags: [{ type: String, required: true }],
    metrics: [projectMetricSchema],
    links: [projectLinkSchema]
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    image: { type: String, required: true },
    issuedOn: { type: String, required: true },
    credentialUrl: { type: String, required: true },
    skills: [{ type: String, required: true }]
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    score: { type: String, required: true },
    description: { type: String, required: true }
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true, unique: true },
    hero: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      location: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      tagline: { type: String, required: true },
      availability: { type: String, required: true },
      resumeUrl: { type: String, required: true },
      profileImage: { type: String, required: true },
      socialLinks: [socialLinkSchema],
      stats: [heroStatSchema]
    },
    about: {
      objective: { type: String, required: true },
      intro: { type: String, required: true },
      highlights: [aboutHighlightSchema]
    },
    skills: [skillSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    education: [educationSchema],
    contact: {
      heading: { type: String, required: true },
      subheading: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
