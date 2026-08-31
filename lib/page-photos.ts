export type PhotoFocalPoint =
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "center-left"
  | "center-right";

export type PagePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint: PhotoFocalPoint;
  credit?: string;
  sourceUrl?: string;
  license?: string;
};

const photos = {
  aboutCommunity: {
    src: "/images/inner-pages/about-community.jpg",
    alt: "A diverse group sharing a friendly conversation in a bright library.",
    width: 1800,
    height: 1174,
    focalPoint: "center",
  },
  aboutConversation: {
    src: "/images/inner-pages/about-conversation.jpg",
    alt: "People seated in a circle and listening to one another.",
    width: 1800,
    height: 1200,
    focalPoint: "center",
  },
  workCommunity: {
    src: "/images/inner-pages/work-community.jpg",
    alt: "A community group gathered for an informal discussion.",
    width: 1800,
    height: 1011,
    focalPoint: "center",
  },
  workshopSpeaker: {
    src: "/images/inner-pages/workshop-speaker.jpg",
    alt: "A speaker addressing an audience in a learning space.",
    width: 1800,
    height: 1200,
    focalPoint: "center-left",
  },
  workshopAudience: {
    src: "/images/inner-pages/workshop-audience.jpg",
    alt: "An audience listening during a presentation.",
    width: 1800,
    height: 1202,
    focalPoint: "center",
  },
  firstLecturePresenters: {
    src: "/images/events/first-lecture/d4v-first-lecture-presenters.jpg",
    alt: "D4V Bay Area presenters explaining phishing warning signs during a community lecture.",
    width: 2400,
    height: 1800,
    focalPoint: "center-right",
    credit: "D4V Bay Area",
    license: "Used with permission",
  },
  firstLectureAudience: {
    src: "/images/events/first-lecture/d4v-first-lecture-audience.jpg",
    alt: "Older adults listening to a D4V Bay Area presenter discuss tech-support scams.",
    width: 2400,
    height: 1800,
    focalPoint: "center-left",
    credit: "D4V Bay Area",
    license: "Used with permission",
  },
  seniorTablet: {
    src: "/images/inner-pages/senior-tablet.jpg",
    alt: "Two older adults calmly reviewing a tablet together.",
    width: 1800,
    height: 1200,
    focalPoint: "center",
  },
  seniorTabletSolo: {
    src: "/images/inner-pages/senior-tablet-solo.jpg",
    alt: "An older adult using a tablet comfortably at home.",
    width: 1800,
    height: 1200,
    focalPoint: "center",
  },
  seniorPhone: {
    src: "/images/inner-pages/senior-phone.jpg",
    alt: "An older adult looking thoughtfully at a smartphone.",
    width: 1800,
    height: 1200,
    focalPoint: "center",
  },
  involvementCommunity: {
    src: "/images/inner-pages/involvement-community.jpg",
    alt: "A diverse group bringing their hands together outdoors.",
    width: 1800,
    height: 1200,
    focalPoint: "center",
  },
  resourcesReading: {
    src: "/images/inner-pages/resources-reading.jpg",
    alt: "An older adult reading useful information on a tablet.",
    width: 1800,
    height: 1286,
    focalPoint: "center",
  },
} satisfies Record<string, PagePhoto>;

export const pagePhotos = {
  about: {
    primary: photos.aboutCommunity,
    conversation: photos.aboutConversation,
  },
  work: {
    primary: photos.workCommunity,
    workshop: photos.firstLecturePresenters,
    seniorsafe: photos.seniorTablet,
    resources: photos.resourcesReading,
    learning: photos.firstLectureAudience,
    checking: photos.seniorPhone,
    conversation: photos.aboutConversation,
  },
  resources: {
    primary: photos.resourcesReading,
    support: photos.seniorTabletSolo,
  },
  workshops: {
    primary: photos.firstLecturePresenters,
    audience: photos.firstLectureAudience,
  },
  seniorsafe: {
    primary: photos.seniorTablet,
    practice: photos.seniorTabletSolo,
    phone: photos.seniorPhone,
  },
  involvement: {
    primary: photos.involvementCommunity,
    conversation: photos.aboutConversation,
  },
  help: {
    primary: photos.seniorPhone,
    support: photos.seniorTabletSolo,
  },
} as const;
