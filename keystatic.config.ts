import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: 'json',
      schema: {
        title: fields.slug({ name: { label: 'Project Name' } }),
        tagline: fields.text({ label: 'Plain English Summary (What it does, zero buzzwords)' }),
        role: fields.text({ label: 'Your Role (e.g. Solo Developer, Full-Stack Lead)' }),
        timeframe: fields.text({ label: 'Timeframe / Duration (e.g. 3 weeks, March 2025)' }),
        featured: fields.checkbox({ label: 'Feature on Homepage', defaultValue: true }),
        liveUrl: fields.url({ label: 'Live Link', validation: { isRequired: false } }),
        repoUrl: fields.url({ label: 'GitHub / Source Repository', validation: { isRequired: false } }),
        technologies: fields.array(fields.text({ label: 'Tech Stack' }), {
          label: 'Technologies Used',
          itemLabel: props => props.value,
        }),
        whatWentWrong: fields.text({
          label: 'The Messy Middle (What broke, architectural trade-offs, or dead ends?)',
          multiline: true,
        }),
        content: fields.document({
          label: 'Full Case Study & Narrative',
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
        }),
      },
    }),

    writing: collection({
      label: 'Writing & Notes',
      slugField: 'title',
      path: 'src/content/writing/*',
      format: 'json',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedAt: fields.date({ label: 'Date Published', defaultValue: { kind: 'today' } }),
        readingTime: fields.text({ label: 'Reading Time (e.g. 4 min read)' }),
        summary: fields.text({ label: 'Teaser / Intro', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: props => props.value,
        }),
        content: fields.document({
          label: 'Article Body',
          formatting: true,
          links: true,
          tables: true,
          dividers: true,
        }),
      },
    }),
  },

  singletons: {
    profile: singleton({
      label: 'Personal Profile & Bio',
      path: 'src/content/singletons/profile',
      format: 'json',
      schema: {
        name: fields.text({ label: 'Your Name' }),
        roleTitle: fields.text({ label: 'What You Do (Human language, no "visionary" fluff)' }),
        location: fields.text({ label: 'Location & Timezone' }),
        availabilityStatus: fields.text({ label: 'Status Badge (e.g. Available for contract / Building side projects)' }),
        bio: fields.text({ label: 'First-Person Bio (Coffee-chat tone)', multiline: true }),
        email: fields.text({ label: 'Contact Email' }),
        githubUrl: fields.url({ label: 'GitHub Profile', validation: { isRequired: false } }),
        linkedinUrl: fields.url({ label: 'LinkedIn Profile', validation: { isRequired: false } }),
        twitterUrl: fields.url({ label: 'Twitter / X Profile', validation: { isRequired: false } }),
      },
    }),

    now: singleton({
      label: 'Now Page (/now)',
      path: 'src/content/singletons/now',
      format: 'json',
      schema: {
        lastUpdated: fields.date({ label: 'Last Updated Date', defaultValue: { kind: 'today' } }),
        currentFocus: fields.text({ label: 'What are you building or tackling right now?', multiline: true }),
        readingList: fields.text({ label: 'What are you reading / researching?', multiline: true }),
        listeningTo: fields.text({ label: 'Music / Audio track on repeat?', multiline: true }),
        experiments: fields.text({ label: 'Side experiments / tinkerings', multiline: true }),
        content: fields.document({ label: 'Additional Thoughts / Log' }),
      },
    }),
  },
});
